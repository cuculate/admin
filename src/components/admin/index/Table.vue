<template>
    <table class="table">
        <thead>
        <tr>
            <th></th>
            <th class="text-center w35">TT</th>
            <th>Tài khoản</th>
            <th class="text-center">Email</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="admin in admins" :key="admin['id']">
            <td>
                <input class="chkbox checkbox-success"
                        type="checkbox"
                       @change="selection"
                       :id="admin['id']"
                       :value="admin['id']"
                       v-model="checkedAdmins">
            </td>
            <td class="text-center">
                <span v-if="parseInt(admin['status']) === 1" class="badge badge-success">H</span>
                <span v-if="parseInt(admin['status']) === 2" class="badge badge-warning">K</span>
            </td>
            <td>
                <router-link :to="{name: 'admin-edit', params: { id: admin['id'] }}">
                    {{ admin['account'] }}
                </router-link>
            </td>
            <td class="text-center">{{ admin['email'] }}</td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        props: ['admins'],
        data() {
            return {
                checkedAdmins: []
            }
        },
        methods: {
            selection() {
                var ids = [];
                ids = this.checkedAdmins;
                this.$emit('checkedAdmins', ids);
            }
        }
    }
</script>