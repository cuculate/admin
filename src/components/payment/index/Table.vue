<template>
    <table class="table">
        <thead>
        <tr>
            <th></th>
            <th class="text-center w35">TT</th>
            <th>Thanh toán</th>
            <th class="text-right">Thông tin</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="payment in payments" :key="payment['id']">
            <td>
                <input class="chkbox checkbox-success"
                       type="checkbox"
                       @change="selection"
                       :id="payment['id']"
                       :value="payment['id']"
                       v-model="checkedPayments">
            </td>
            <td class="text-center">
                <span v-if="parseInt(payment['status']) === 1" class="badge badge-success">H</span>
                <span v-if="parseInt(payment['status']) === 2" class="badge badge-warning">K</span>
            </td>
            <td>
                <router-link :to="{name: 'payment-edit', params: { id: payment['id'] }}">
                    {{ payment['name'] }}
                </router-link>
            </td>
            <td class="text-right">{{ payment['information'] }}</td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        props: ['payments'],
        data() {
            return {
                checkedPayments: []
            }
        },
        methods: {
            selection() {
                var ids = [];
                ids = this.checkedPayments;
                this.$emit('checkedPayments', ids);
            }
        }
    }
</script>