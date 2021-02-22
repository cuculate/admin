<template>
    <table class="table">
        <thead>
        <tr>
            <th></th>
            <th class="text-center w35">TT</th>
            <th>Hãng</th>
            <th class="text-center">Số điện thoại</th>
            <th class="text-center">Địa chỉ</th>
            <th class="text-right">Website</th>
            <th class="text-right">Email</th>
            <th class="text-right">Thông tin</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="brand in brands" :key="brand['id']">
            <td>
                <input class="chkbox checkbox-success"
                       type="checkbox"
                       @change="selection"
                       :id="brand['id']"
                       :value="brand['id']"
                       v-model="checkedBrands">
            </td>
            <td class="text-center">
                <span v-if="parseInt(brand['status']) === 1" class="badge badge-success">H</span>
                <span v-if="parseInt(brand['status']) === 2" class="badge badge-warning">K</span>
            </td>
            <td>
                <router-link :to="{name: 'brand-edit', params: { id: brand['id'] }}">
                    {{ brand['name'] }}
                </router-link>
            </td>
            <td class="text-center">{{ brand['phone'] }}</td>
            <td class="text-center">{{ brand['address'] }}</td>
            <td class="text-right">{{ brand['website'] }}</td>
            <td class="text-right">{{ brand['email'] }}</td>
            <td class="text-right" v-html="brand['information']"></td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        props: ['brands'],
        data() {
            return {
                checkedBrands: []
            }
        },
        methods: {
            selection() {
                var ids = [];
                ids = this.checkedBrands;
                this.$emit('checkedBrands', ids);
            }
        }
    }
</script>