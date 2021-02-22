<template>
    <table class="table">
        <thead>
        <tr>
            <th></th>
            <th class="text-center w35">TT</th>
            <th>Tài khoản</th>
            <th class="text-center">Tên khách hàng</th>
            <th class="text-center">Số điện thoại</th>
            <th class="text-center">Email</th>
            <th class="text-center">Địa chỉ</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="customer in customers" :key="customer['id']">
            <td>
                <input class="chkbox checkbox-success"
                       type="checkbox"
                       @change="selection"
                       :id="customer['id']"
                       :value="customer['id']"
                       v-model="checkedCustomers">
            </td>
            <td class="text-center">
                <span v-if="parseInt(customer['status']) === 1" class="badge badge-success">H</span>
                <span v-if="parseInt(customer['status']) === 2" class="badge badge-warning">K</span>
            </td>
            <td>
                <router-link :to="{name: 'customer-edit', params: { id: customer['id'] }}">
                    {{ customer['account'] }}
                </router-link>
            </td>
            <td class="text-center">{{ customer['name'] }}</td>
            <td class="text-center">{{ customer['phone'] }}</td>
            <td class="text-right">{{ customer['email'] }}</td>
            <td class="text-right">{{ customer['address'] }}</td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        props: ['customers'],
        data() {
            return {
                checkedCustomers: []
            }
        },
        methods: {
            selection() {
                var ids = [];
                ids = this.checkedCustomers;
                this.$emit('checkedCustomers', ids);
            }
        }
    }
</script>