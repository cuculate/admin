<template>
    <div class="container-fluid row p15">
        <h3 class="col-md-12">Đơn hàng</h3>
        <div class="col-md-2">
            <form @submit.prevent="searchOrder">
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
                        <h3 class="card-title font-weight-bold">Tài khoản</h3>
                    </div>
                    <div class="card-body p15">
                        <div class="chkbox checkbox-success" v-for="(customer, index) in customers" :key="index">
                            <input :id="`Account-${customer['id']}`" type="checkbox" :value="customer['id']"
                                   v-model="search['customers']">
                            <label :for="`Account-${customer['id']}`" class="font-weight-light">
                                {{customer['name']}}
                            </label>
                        </div>
                    </div>
                </div>

                <div class="card card-default">
                    <div class="card-header">
                        <h3 class="card-title font-weight-bold">Kiểu thanh toán</h3>
                    </div>
                    <div class="card-body p15">
                        <div class="chkbox checkbox-success" v-for="(payment, index) in payments" :key="index">
                            <input :id="`Payment-${payment['id']}`" type="checkbox" :value="payment['id']"
                                   v-model="search['payments']">
                            <label :for="`Payment-${payment['id']}`" class="font-weight-light">
                                {{payment['name']}}
                            </label>
                        </div>
                    </div>
                </div>

                <div class="card card-default">
                    <div class="card-header">
                        <h3 class="card-title font-weight-bold">Trạng thái</h3>
                    </div>
                    <div class="card-body p15">
                        <div class="chkbox checkbox-warning">
                            <input id="StatusWait" type="checkbox" value="0" v-model="search['status']">
                            <label for="StatusWait" class="font-weight-light">
                                Chờ duyệt
                            </label>
                        </div>
                        <div class="chkbox checkbox-info">
                            <input id="StatusProcess" type="checkbox" value="1" v-model="search['status']">
                            <label for="StatusProcess" class="font-weight-light">
                                Chuẩn bị
                            </label>
                        </div>
                        <div class="chkbox checkbox-primary">
                            <input id="StatusTransport" type="checkbox" value="2" v-model="search['status']">
                            <label for="StatusTransport" class="font-weight-light">
                                Vận chuyển
                            </label>
                        </div>
                        <div class="chkbox checkbox-success">
                            <input id="StatusDone" type="checkbox" value="4" v-model="search['status']">
                            <label for="StatusDone" class="font-weight-light">
                                Đã giao hàng
                            </label>
                        </div>
                        <div class="chkbox checkbox-danger">
                            <input id="StatusCancel" type="checkbox" value="5" v-model="search['status']">
                            <label for="StatusCancel" class="font-weight-light">
                                Hoàn trả
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
                        <button class="btn btn-primary btn-control btn-flat" @click="searchOrder">Tìm kiếm</button>
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
                    <table-form :orders="orders"></table-form>
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
                orders: [],
                payments: [],
                customers: [],
                search: {
                    keyword: '',
                    status: [0, 1, 2, 4, 5],
                    customers: [],
                    payments: [1, 2]
                },
                prev: [],
                next: [],
            }
        },
        methods: {
            searchOrder() {
                let vm = this;
                let query = vm.getQuery();
                let uri = query.length ? `http://localhost:8000/admin/order?${query}` : `http://localhost:8000/admin/order`;
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
                    this.orders = response.data.data.order.data;
                    this.payments = response.data.data.payment;
                    this.customers = response.data.data.customer;
                    this.prev = response.data.data.order.prev_page_url;
                    this.next = response.data.data.order.next_page_url;
                }
            }
        },
        created() {
            this.searchOrder();
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
        width: 50px;
    }
</style>
