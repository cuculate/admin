<template>
    <div class="container-fluid row">
        <h3 class="col-md-12">Đồ chơi</h3>
        <div class="col-md-2">
            <form @submit.prevent="searchProduct">
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
                        <h3 class="card-title font-weight-bold">Danh sách</h3>
                    </div>
                    <div class="card-body p15">
                        <div class="form-group">
                            <treeselect v-model="search['categories']"
                                        :multiple="true"
                                        placeholder="Danh mục"
                                        :options="categories.map(({id, name}) => ({id: id, label: name}))"/>
                        </div>

                        <treeselect v-model="search['brands']"
                                    :multiple="true"
                                    placeholder="Hãng"
                                    :options="brands.map(({id, name}) => ({id: id, label: name}))"/>
                    </div>
                </div>

                <div class="card card-default">
                    <div class="card-header">
                        <h3 class="card-title font-weight-bold">Nhóm tuổi</h3>
                    </div>
                    <div class="card-body p15">
                        <div class="chkbox checkbox-success" v-for="(age, index) in ages" :key="index">
                            <input :id="`Age-${age['id']}`" type="checkbox" :value="age['id']" v-model="search['ages']">
                            <label :for="`Age-${age['id']}`" class="font-weight-light">
                                {{age['name']}}
                            </label>
                        </div>
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
                        <button class="btn btn-primary btn-control btn-flat" @click="searchProduct">Tìm kiếm</button>
                        <router-link :to="{ name: 'product-create' }"
                                     class="btn btn-primary btn-control btn-flat ml-1">Thêm đồ chơi
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
                                                @click.prevent="deleteProducts()"
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
                    <table-form :products="products" @checkedProducts="checkedProducts"></table-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import Treeselect from '@riophae/vue-treeselect';
    import '@riophae/vue-treeselect/dist/vue-treeselect.css';
    import TableForm from './index/Table';
    import IndexMixin from '../../mixins/index';

    export default {
        mixins: [IndexMixin],
        components: {Treeselect, TableForm},
        computed: {...mapState(['token'])},
        data() {
            return {
                products: [],
                categories: [],
                brands: [],
                ages: [],
                listIds: [],
                search: {
                    keyword: '',
                    status: [1, 2],
                    categories: [],
                    brands: [],
                    ages: [],
                },
                prev: [],
                next: [],
            }
        },
        methods: {
            searchProduct() {
                let vm = this;
                let query = vm.getQuery();
                let uri = query.length ? `http://localhost:8000/admin/product?${query}` : `http://localhost:8000/admin/product`;
                let token = {headers: {Authorization: 'Bearer ' + vm.$store.state.token}}
                vm.axios.get(uri, token).then(response => {
                    vm.setData(response);
                });
            },

            setData(response) {
                if (response !== undefined && response !== null) {
                    this.products = response.data.data.products.data;
                    this.categories = response.data.data.category;
                    this.brands = response.data.data.brand;
                    this.ages = response.data.data.age;
                    this.prev = response.data.data.products.prev_page_url;
                    this.next = response.data.data.products.next_page_url;
                    let msg = response.data.data.msg;
                    if (msg !== undefined && msg !== null && msg !== '') {
                        this.$snotify.success(msg);
                    }
                }
            },

            checkedProducts(ids) {
                this.listIds = ids;
            },

            deleteProducts() {
                let vm = this;
                let uri = `http://localhost:8000/admin/product/delete/${vm.listIds}`;
                let token = {headers: {Authorization: 'Bearer ' + vm.$store.state.token}}
                this.axios.delete(uri, token).then(response => {
                    if (response.data.code === 200) {
                        vm.$router.push({name: 'product'});
                        vm.$snotify.success(response.data.data.msg);
                    } else {
                        vm.$snotify.error(response.data.errors);
                    }
                });

            },
        },

        created() {
            this.searchProduct();
        },
    }
</script>
