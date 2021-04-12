<template>
    <table class="table">
        <thead>
        <tr>
            <th></th>
            <th class="text-center w35">TT</th>
            <th>Đồ chơi</th>
            <th class="text-center">Khách hàng</th>
            <th class="text-center">Tiêu đề</th>
            <th class="text-center">Đánh giá</th>
            <th class="text-right">Nội dung</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="feedback in feedbacks" :key="feedback['id']">
            <td>
                <input class="chkbox checkbox-success"
                       type="checkbox"
                       @change="selection"
                       :id="feedback['id']"
                       :value="feedback['id']"
                       v-model="checkedFeedbacks">
            </td>
            <td class="text-center">
                <span v-if="parseInt(feedback['status']) === 1" class="badge badge-success">H</span>
                <span v-if="parseInt(feedback['status']) === 3" class="badge badge-danger">X</span>
            </td>
            <td>
                <router-link :to="{name: 'product-edit', params: { id: feedback.product['id'] }}">
                    {{ feedback.product['name'] }}
                </router-link>
            </td>
            <td class="text-center">{{ feedback['name'] }}</td>
            <td class="text-center">{{ feedback['title'] }}</td>
            <td class="text-center" style="width: 100px">{{ feedback['star'] }} <i class="fas fa-star"></i></td>
            <td class="text-right">{{ feedback['content'] }}</td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        props: ['feedbacks'],
        data() {
            return {
                checkedFeedbacks: []
            }
        },
        methods: {
            selection() {
                var ids = [];
                ids = this.checkedFeedbacks;
                this.$emit('checkedFeedbacks', ids);
            }
        }
    }
</script>