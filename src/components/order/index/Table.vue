<template>
    <table class="table">
        <thead>
        <tr>
            <th class="text-center w35">TT</th>
            <th>Nguời nhận</th>
            <th class="text-center w150">Ngày đặt</th>
            <th class="text-center w150">Ngày xử lý</th>
            <th class="text-center">Thanh toán</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="order in orders" :key="order['id']">
            <td class="text-center">
                <span v-if="parseInt(order['status']) === 0" class="badge badge-warning">Chờ duyệt</span>
                <span v-if="parseInt(order['status']) === 1" class="badge badge-info">Đang xủ lý</span>
                <span v-if="parseInt(order['status']) === 2" class="badge badge-primary">Đang vận chuyển</span>
                <span v-if="parseInt(order['status']) === 4" class="badge badge-success ">Đã giao hàng</span>
                <span v-if="parseInt(order['status']) === 5" class="badge badge-danger ">Hoàn trả</span>
            </td>
            <td>
                <router-link :to="{name: 'order-show', params: { id: order['id'] }}">
                    {{ order.customer['account'] }}
                </router-link>
            </td>
            <td class="text-center">{{ order['created_at'] }}</td>
            <td class="text-center">{{ order['updated_at'] }}</td>
            <td class="text-center">{{ order.payment['name'] }}</td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        props: ['orders'],
    }
</script>