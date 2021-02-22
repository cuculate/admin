<template>
    <table class="table">
        <thead>
        <tr>
            <th class="text-center w35">TT</th>
            <th>Danh mục</th>
            <th class="text-center">Danh mục cha</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="category in categories" :key="category['id']">
            <td>
                <input class="chkbox checkbox-success"
                       type="checkbox"
                       @change="selection"
                       :id="category['id']"
                       :value="category['id']"
                       v-model="checkedCategories">
            </td>
            <td class="text-center">
                <span v-if="parseInt(category['status']) === 1" class="badge badge-success">H</span>
                <span v-if="parseInt(category['status']) === 2" class="badge badge-warning">K</span>
            </td>
            <td>
                <router-link :to="{name: 'category-edit', params: { id: category['id'] }}">
                    {{ category['name'] }}
                </router-link>
            </td>
            <td class="text-center text-bold" v-if="category['parent_id'] !== null">
                --
                <router-link :to="{name: 'category-edit', params: { id: category['parent_id'] }}"
                             class="btn btn-default btn-sm">{{ category.categories['name']}}
                </router-link>
            </td>
            <td class="text-center text-bold" v-else> -</td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        props: ['categories'],
        data() {
            return {
                checkedCategories: []
            }
        },
        methods: {
            selection() {
                var ids = [];
                ids = this.checkedCategories;
                this.$emit('checkedCategories', ids);
            }
        }
    }
</script>