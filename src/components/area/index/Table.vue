<template>
    <table class="table table-hover">
        <thead>
        <tr>
            <th></th>
            <th class="text-center w35">TT</th>
            <th>Tỉnh, Thành phố</th>
            <th class="text-right">Mô tả</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="area in areas" :key="area['id']">
            <td>
                <input class="chkbox checkbox-success"
                       type="checkbox"
                       @change="selection"
                       :id="area['id']"
                       :value="area['id']"
                       v-model="checkedAreas">
            </td>
            <td class="text-center">
                <span v-if="parseInt(area['status']) === 1" class="badge badge-success">H</span>
                <span v-if="parseInt(area['status']) === 2" class="badge badge-warning">K</span>
            </td>
            <td>
                <router-link :to="{name: 'area-edit', params: { id: area['id'] }}">{{ area['name'] }}</router-link>
            </td>
            <td class="text-right">{{ area['information']}}</td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        props: ['areas'],
        data() {
            return {
                checkedAreas: []
            }
        },
        methods: {
            selection() {
                var ids = [];
                ids = this.checkedAreas;
                this.$emit('checkedAreas', ids);
            }
        }
    }
</script>