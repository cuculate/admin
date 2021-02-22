<template>
    <div class="main">
        <h1 class="mb-5">Thống kê</h1>

        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header border-0">
                        <h3 class="card-title">Sản phẩm</h3>
                    </div>
                    <div class="card-body table-responsive p-0">
                        <table class="table table-striped table-valign-middle">
                            <thead>
                            <tr>
                                <th><span class="badge bg-primary">Tổng</span></th>
                                <th><span class="badge bg-success">Hoạt động</span></th>
                                <th><span class="badge bg-success">Mới</span></th>
                                <th><span class="badge bg-success">Khuyến mãi</span></th>
                                <th><span class="badge bg-danger">Khóa</span></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{{ statistic.productActive + statistic.productBlock }}</td>
                                <td>{{ statistic.productActive }}</td>
                                <td>{{ statistic.productNew }}</td>
                                <td>{{ statistic.productSale }}</td>
                                <td>{{ statistic.productBlock }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header border-0">
                        <h3 class="card-title">Tài Khoản</h3>
                    </div>
                    <div class="card-body table-responsive p-0">
                        <table class="table table-striped table-valign-middle">
                            <thead>
                            <tr>
                                <th><span class="badge bg-info">Nhóm</span></th>
                                <th><span class="badge bg-primary">Tổng</span></th>
                                <th><span class="badge bg-success">Hoạt động</span></th>
                                <th><span class="badge bg-danger">Khóa</span></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <img src="dist/img/default-150x150.png"
                                         alt="Product 1"
                                         class="img-circle img-size-32 mr-2">
                                    Admin
                                </td>
                                <td>{{ statistic.adminActive + statistic.adminBlock }}</td>
                                <td>{{ statistic.adminActive }}</td>
                                <td>{{ statistic.adminBlock }}</td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="dist/img/default-150x150.png"
                                         alt="Product 1"
                                         class="img-circle img-size-32 mr-2">
                                    Khách hàng
                                </td>
                                <td>{{ statistic.customerActive + statistic.customerBlock }}</td>
                                <td>{{ statistic.customerActive }}</td>
                                <td>{{ statistic.customerBlock }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header border-0">
                        <h3 class="card-title">Đơn đặt hàng</h3>
                    </div>
                    <div class="card-body table-responsive p-0">
                        <table class="table table-striped table-valign-middle">
                            <thead>
                            <tr>
                                <th><span class="badge bg-primary">Tổng</span></th>
                                <th><span class="badge bg-warning">Chờ duyệt</span></th>
                                <th><span class="badge bg-fuchsia">Đang xử lý</span></th>
                                <th><span class="badge bg-info">Đang chuyển hàng</span></th>
                                <th><span class="badge bg-success">Đã hoàn thành</span></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{{ statistic.orderWait + statistic.orderProcess + statistic.orderTransport +
                                    statistic.orderDone }}
                                </td>
                                <td>{{ statistic.orderWait }}</td>
                                <td>{{ statistic.orderProcess }}</td>
                                <td>{{ statistic.orderTransport }}</td>
                                <td>{{ statistic.orderDone }}</td>
                            </tr>
                            </tbody>
                        </table>

                        <table class="table table-striped table-valign-middle">
                            <thead>
                            <tr>
                                <th><span class="badge bg-primary">Ngày đặt</span></th>
                                <th><span class="badge bg-warning">Khách hàng</span></th>
                                <th><span class="badge bg-fuchsia">Tỉnh</span></th>
                                <th><span class="badge bg-info">Số điện thoại</span></th>
                                <th><span class="badge bg-info">Tổng tiền</span></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for=" order in statistic['listOrderWaits']" :key="order['id']">
                                <td>{{ order['created_at'] }}</td>
                                <td>
                                    <router-link :to="{name: 'order-show', params: { id: order['id'] }}">
                                        {{ order['name'] }}
                                    </router-link>
                                </td>
                                <td>{{ order.area['name'] }}</td>
                                <td>{{ order['phone'] }}</td>
                                <td>{{ order['total_price'] | numFormat}} VNĐ</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header border-0">
                        <h3 class="card-title">Thông tin khác</h3>
                    </div>
                    <div class="card-body table-responsive p-0">
                        <table class="table table-striped table-valign-middle">
                            <thead>
                            <tr>
                                <th><span class="badge bg-info">Nhóm</span></th>
                                <th><span class="badge bg-primary">Tổng</span></th>
                                <th><span class="badge bg-success">Hoạt động</span></th>
                                <th><span class="badge bg-danger">Khóa</span></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <img src="dist/img/default-150x150.png"
                                         alt="Product 1"
                                         class="img-circle img-size-32 mr-2">
                                    Hãng
                                </td>
                                <td>{{ statistic.brandActive + statistic.brandBlock }}</td>
                                <td>{{ statistic.brandActive }}</td>
                                <td>{{ statistic.brandBlock }}</td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="dist/img/default-150x150.png"
                                         alt="Product 1"
                                         class="img-circle img-size-32 mr-2">
                                    Danh mục
                                </td>
                                <td>{{ statistic.categoryActive + statistic.categoryBlock }}</td>
                                <td>{{ statistic.categoryActive }}</td>
                                <td>{{ statistic.categoryBlock }}</td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="dist/img/default-150x150.png"
                                         alt="Product 1"
                                         class="img-circle img-size-32 mr-2">
                                    Bình luận
                                </td>
                                <td>{{ statistic.feedbackActive + statistic.feedbackDelete }}</td>
                                <td>{{ statistic.feedbackActive }}</td>
                                <td>{{ statistic.feedbackDelete }}</td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="dist/img/default-150x150.png"
                                         alt="Product 1"
                                         class="img-circle img-size-32 mr-2">
                                    Thanh toán
                                </td>
                                <td>{{ statistic.paymentActive + statistic.paymentBlock }}</td>
                                <td>{{ statistic.paymentActive }}</td>
                                <td>{{ statistic.paymentBlock }}</td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="dist/img/default-150x150.png"
                                         alt="Product 1"
                                         class="img-circle img-size-32 mr-2">
                                    Tuổi
                                </td>
                                <td>{{ statistic.ageActive + statistic.ageBlock }}</td>
                                <td>{{ statistic.ageActive }}</td>
                                <td>{{ statistic.ageBlock }}</td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="dist/img/default-150x150.png"
                                         alt="Product 1"
                                         class="img-circle img-size-32 mr-2">
                                    Tỉnh
                                </td>
                                <td>{{ statistic.areaActive + statistic.areaBlock }}</td>
                                <td>{{ statistic.areaActive }}</td>
                                <td>{{ statistic.areaBlock }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                statistic: []
            }
        },
        computed: {
            ...mapState(['token'])
        },
        created() {
            let uri = 'http://localhost:8000/admin/statistic';
            let token = {headers: {Authorization: 'Bearer ' + this.$store.state.token}}
            this.axios.get(uri, token).then(response => {
                this.statistic = response.data.data;
            });
        }
    }
</script>
<style scoped>
    .main {
        margin: 20px 20px 20px 20px;
    }
</style>
