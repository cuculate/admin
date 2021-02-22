<template>
    <div class="container-fluid row p15">
        <h3 class="col-md-12">Hãng</h3>
        <div class="col-md-2">
            <form @submit.prevent="searchBrand">
                <div class="card card-default">
                    <div class="card-header">
                        <h3 class="card-title font-weight-bold">Từ khóa</h3>
                    </div>
                    <div class="card-body p15">
                        <input id="keyword" type="text"
                               class="form-control"
                               v-model="search['keyword']"
                               placeholder="Từ khóa">
                    </div>
                </div>

                <div class="card card-default">
                    <div class="card-header">
                        <h3 class="card-title font-weight-bold">Trạng thái</h3>
                    </div>
                    <div class="card-body p15">
                        <div class="chkbox checkbox-success">
                            <input id="StatusSuccess" type="checkbox" value="1" v-model="search['status']">
                            <label for="StatusSuccess" class="font-weight-light">
                                Hoạt động
                            </label>
                        </div>
                        <div class="chkbox checkbox-warning">
                            <input id="StatusWarning" type="checkbox" value="2" v-model="search['status']">
                            <label for="StatusWarning" class="font-weight-light">
                                Khóa
                            </label>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="col-md-10">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <button class="btn btn-primary btn-control btn-flat" @click="searchBrand">Tìm kiếm</button>
                        <router-link :to="{ name: 'brand-create' }"
                                     class="btn btn-primary btn-control btn-flat ml-1">Thêm hãng
                        </router-link>
                        <button v-if="listIds.length"
                                class="btn btn-danger btn-control btn-flat"
                                data-toggle="modal"
                                :data-target="'#delete'">Xóa
                        </button>
                        <div class="modal fade"
                             :id="'delete'"
                             tabindex="-1"
                             role="dialog"
                             aria-labelledby="exampleModalLabel"
                             aria-hidden="true">
                            <div class="modal-dialog"
                                 role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title"
                                            id="exampleModalLabel">Xóa dữ liệu đã chọn</h5>
                                        <button type="button"
                                                class="close"
                                                data-dismiss="modal"
                                                aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        Bạn có chắc chắn muốn xóa
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button"
                                                class="btn btn-secondary"
                                                data-dismiss="modal">Hủy
                                        </button>
                                        <button type="button"
                                                @click.prevent="deleteBrands()"
                                                class="btn btn-danger">Xóa
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card-tools mr-0">
                        <button class="btn btn-default btn-flat btn-control" :disabled="prev == null"
                                @click="changePage(prev)"> Trước
                        </button>
                        <button class="btn btn-default btn-flat btn-control" :disabled="next == null"
                                @click="changePage(next)"> Sau
                        </button>
                    </div>
                </div>

                <div class="card-body p-0">
                    <table-form :brands="brands" @checkedBrands ="checkedBrands"></table-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import TableForm from './index/Table';
    import IndexMixin from '../../mixins/index';

    export default {
        mixins: [IndexMixin],
        components: {TableForm},
        computed: {...mapState(['token'])},
        data() {
            return {
                brands: [],
                listIds: [],
                search: {
                    keyword: '',
                    status: [1, 2]
                },
                prev: [],
                next: [],
            }
        },
        created() {
            let vm = this;
            let uri = 'http://localhost:8000/admin/brand';
            let token = {headers: {Authorization: 'Bearer ' + vm.$store.state.token}}
            vm.axios.get(uri, token).then(response => {
                vm.brands = response.data.data.brand.data
                vm.prev = response.data.data.brand.prev_page_url
                vm.next = response.data.data.brand.next_page_url
            });
        },
        methods: {
            searchBrand() {
                let vm = this;
                let query = vm.getQuery();
                let uri = query.length ? `http://localhost:8000/admin/brand?${query}` : `http://localhost:8000/admin/brand`;
                let token = {headers: {Authorization: 'Bearer ' + vm.$store.state.token}}
                vm.axios.get(uri, token).then(response => {
                    vm.setData(response);
                    let msg = response.data.data.msg;
                    if (msg !== undefined && msg !== null && msg !== '') {
                        vm.$snotify.success(msg);
                    }
                });
            },
            setData(response) {
                if (response !== undefined && response !== null) {
                    this.brands = response.data.data.brand.data;
                    this.prev = response.data.data.brand.prev_page_url;
                    this.next = response.data.data.brand.next_page_url;
                }
            },

            checkedBrands(ids) {
                this.listIds = ids;
            },

            deleteBrands() {
                let vm = this;
                let uri = `http://localhost:8000/admin/brand/delete/${vm.listIds}`;
                let token = {headers: {Authorization: 'Bearer ' + vm.$store.state.token}}
                this.axios.delete(uri, token).then(response => {
                    if (response.data.code === 200) {
                        vm.$router.push({name: 'brand'});
                        vm.$snotify.success(response.data.data.msg);
                    } else {
                        vm.$snotify.error(response.data.errors);
                    }
                });

            },
        }
    }
</script>

<style scoped>
    th:first-child {
        width: 80px;
        height: 60px;
    }

    th:nth-child(2) {
        width: 40px;
    }

    th:nth-child(3) {
        width: 120px;
    }

    th:nth-child(4) {
        width: 120px;
    }

    th:nth-child(5) {
        width: 120px;
    }
</style>
