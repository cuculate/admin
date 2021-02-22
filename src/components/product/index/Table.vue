<template>
    <table class="table">
        <thead>
        <tr>
            <th></th>
            <th class="text-center w35">TT</th>
            <th>Đồ chơi</th>
            <th class="text-center">Ảnh</th>
            <th class="text-center">Giá</th>
            <th class="text-center">Loại</th>
            <th class="text-center">Tồn Kho</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="product in products" :key="product['id']">
            <td>
                <input type="checkbox"
                       @change="selection"
                       :id="product['id']"
                       :value="product['id']"
                       v-model="checkedProducts">
            </td>
            <td class="text-center">
                <span v-if="parseInt(product['status']) === 1" class="badge badge-success">H</span>
                <span v-if="parseInt(product['status']) === 2" class="badge badge-warning">K</span>
            </td>
            <td>
                <router-link :to="{name: 'product-edit', params: { id: product['id'] }}">
                    {{ product['name'] }}
                </router-link>
            </td>
            <td class="text-center">
                <img :src="`/images/sanpham/${product['image']}`"
                     :alt="product['name']"
                     style="height: 80px">
            </td>
            <td class="text-right text-bold">{{ product['price'] | numFormat }} đ</td>
            <td class="text-center">
                <span v-if="parseInt(product['sale']) === 1" class="badge badge-success">Khuyến mãi</span>
                <span v-if="parseInt(product['new']) === 1" class="badge badge-danger">Mới</span>
            </td>
            <td class="text-center">{{ product['stocked'] }}</td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        props: ['products'],
        data() {
            return {
                checkedProducts: []
            }
        },
        methods: {
            selection() {
                var ids = [];
                ids = this.checkedProducts;
                this.$emit('checkedProducts', ids);
            }
        }
    }
</script>