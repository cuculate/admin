<template>
    <div class="container-fluid row p15">
        <h3 class="col-md-12">Góp ý</h3>
        <div class="col-md-2">
            <form @submit.prevent="searchContact">
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
            </form>
        </div>

        <div class="col-md-10">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <button class="btn btn-primary btn-control btn-flat" @click="searchContact">Tìm kiếm</button>
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
                                                @click.prevent="deleteContacts()"
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
                    <table-form :contacts="contacts" @checkedContacts="checkedContacts"></table-form>
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
        data() {
            return {
                contacts: [],
                listIds: [],
                search: {
                    keyword: '',
                },
                prev: [],
                next: [],
            }
        },
        computed: {
            ...mapState(['token'])
        },
        methods: {
            searchContact() {
                let vm = this;
                let query = vm.getQuery();
                let uri = query.length ? `http://localhost:8000/admin/contact?${query}` : `http://localhost:8000/admin/contact`;
                let token = {headers: {Authorization: 'Bearer ' + vm.$store.state.token}}
                vm.axios.get(uri, token).then(response => {
                    vm.setData(response);
                });
            },

            setData(response) {
                if (response !== undefined && response !== null) {
                    this.contacts = response.data.data.contact.data;
                    this.prev = response.data.data.contact.prev_page_url;
                    this.next = response.data.data.contact.next_page_url;
                    let msg = response.data.data.msg;
                    if (msg !== undefined && msg !== null && msg !== '') {
                        this.$snotify.success(msg);
                    }
                }
            },

            checkedContacts(ids) {
                this.listIds = ids;
            },

            deleteContacts() {
                let vm = this;
                let uri = `http://localhost:8000/admin/contact/delete/${vm.listIds}`;
                let token = {headers: {Authorization: 'Bearer ' + vm.$store.state.token}}
                this.axios.delete(uri, token).then(response => {
                    if (response.data.code === 200) {
                        vm.$router.push({name: 'contact'});
                        vm.$snotify.success(response.data.data.msg);
                    } else {
                        vm.$snotify.error(response.data.errors);
                    }
                });

            },
        },

        created() {
            this.searchContact();
        },
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
</style>
