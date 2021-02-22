<template>
    <div class="container-fluid row p15">
        <h3 class="col-md-12">Đơn hàng #{{orders.hdID }}</h3>
        <div class="col-md-12 mt-20">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <button class="btn btn-primary btn-flat btn-control" @click="updateOrder">Duyệt</button>
                    </div>
                </div>
                <div class="card-body p15">
                    <div class="row">
                        <div class="form-group col-md-4">
                            <label>Tài khoản</label>
                            <input type="text" class="form-control" :value="customer['account']" disabled>
                        </div>
                        <div class="form-group col-md-4">
                            <label>Ngày tạo</label>
                            <input type="text" class="form-control" :value="orders['created_at']" disabled>
                        </div>
                        <div class="form-group col-md-4">
                            <label>Ngày xử lý</label>
                            <input type="text" class="form-control" :value="orders['updated_at']" disabled>
                        </div>
                        <div class="form-group col-md-4">
                            <label>Tên người nhận</label>
                            <input type="text" class="form-control" :value="orders['name']" disabled>
                        </div>
                        <div class="form-group col-md-4">
                            <label>Số điện thoại</label>
                            <input type="text" class="form-control" :value="orders['phone']" disabled>
                        </div>
                        <div class="form-group col-md-4">
                            <label>Tỉnh</label>
                            <input type="text" class="form-control" :value="area['name']" disabled>
                        </div>
                        <div class="form-group col-md-4">
                            <label>Trạng thái</label>
                            <select class="form-control"
                                    v-model="orders['status']"
                                    :disabled=block>
                                <option :value="0"> Chờ duyệt </option>
                                <option :value="1"> Đang xủ lý </option>
                                <option :value="2"> Đang vận chuyển </option>
                                <option :value="4"> Đã giao hàng </option>
                                <option :value="5"> Hoàn trả </option>
                            </select>
                        </div>
                        <div class="form-group col-md-8">
                            <label>Địa chỉ</label>
                            <input type="text" class="form-control" :value="orders['address']" disabled>
                        </div>
                    </div>
                </div>
            </div>
            <hr>

            <div class="card">
                <div class="card-body p-0">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên</th>
                            <th>Giá</th>
                            <th>Ảnh</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="detail in details"
                            :key="detail['id']">
                            <td>{{ detail['id'] }}</td>
                            <td>{{ detail['name'] }}</td>
                            <td>{{ detail['price'] | numFormat }} VND</td>
                            <td>
                                <img :src="'/images/sanpham/' + detail['image']"
                                     alt="detail.name"
                                     style="height: 50px">
                            </td>
                            <td>{{ detail.pivot['quantity'] }}</td>
                            <td>{{ detail.pivot['total_price'] | numFormat }} VND</td>
                        </tr>
                        <tr class="bg-secondary">
                            <td colspan="5"
                                class="text-center">Tổng tiền
                            </td>
                            <td>{{ totalPrice | numFormat }} VND</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        data() {
            return {
                orders: {},
                area: {},
                customer: {},
                details: [],
                errors: [],
            }
        },
        computed: {
            totalPrice() {
                return this.details.reduce((acc, cur) => acc + Number(cur.pivot['total_price']), 0);
            },
            block() {
                return this.orders['status'] === 4 || this.orders['status'] === 5;
            },
            ...mapState(['token']),
        },
        created() {
            let uri = `http://localhost:8000/admin/order/${this.$route.params.id}`;
            let token = {headers: {Authorization: 'Bearer ' + this.$store.state.token}};
            this.axios.get(uri, token).then((response) => {
                if (response.data.code === 200) {
                    this.orders = response.data.data.order;
                    this.customer = response.data.data.order.customer;
                    this.area = response.data.data.order.area;
                    this.details = response.data.data.order.order_detail;
                } else {
                    this.$router.push({name: 'order'});
                    this.$snotify.error(response.data.errors);
                }
            });
        },
        methods: {
            updateOrder() {
                let uri = `http://localhost:8000/admin/order/update/${this.$route.params.id}`;
                let token = {headers: {Authorization: 'Bearer ' + this.$store.state.token}};
                this.axios.put(uri, this.orders, token).then((response) => {
                    if (response.data.code === 200) {
                        this.$router.push({name: 'order-show'});
                        this.$snotify.success(response.data.data.msg);
                    } else {
                        this.$snotify.error(response.data.errors);
                    }
                });
            }
        },
    }
</script>

