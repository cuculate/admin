<template>
    <table class="table">
        <thead>
        <tr>
            <th></th>
            <th class="text-center w35">TT</th>
            <th>Tuổi</th>
            <th class="text-right">Tháng</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="age in ages" :key="age['id']">
            <td>
                <input class="chkbox checkbox-success"
                       type="checkbox"
                       @change="selection"
                       :id="age['id']"
                       :value="age['id']"
                       v-model="checkedAges">
            </td>
            <td class="text-center">
                <span v-if="parseInt(age['status']) === 1" class="badge badge-success">H</span>
                <span v-if="parseInt(age['status']) === 2" class="badge badge-warning">K</span>
            </td>
            <td>
                <router-link :to="{name: 'age-edit', params: { id: age['id'] }}">{{ age['name'] }}</router-link>
            </td>
            <td class="text-right">{{ age['month'] }}</td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        props: ['ages'],
        data() {
            return {
                checkedAges: []
            }
        },
        methods: {
            selection() {
                var ids = [];
                ids = this.checkedAges;
                this.$emit('checkedAges', ids);
            }
        }
    }
</script>