<template>
    <table class="table">
        <thead>
        <tr>
            <th></th>
            <th>Tên</th>
            <th>Email</th>
            <th class="text-center w100">SĐT</th>
            <th class="text-right">Địa chỉ</th>
            <th class="text-right">Nội dung</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="contact in contacts" :key="contact['id']">
            <td>
                <input class="chkbox checkbox-success"
                       type="checkbox"
                       @change="selection"
                       :id="contact['id']"
                       :value="contact['id']"
                       v-model="checkedContacts">
            </td>
            <td>{{ contact['name'] }}</td>
            <td>{{ contact['email'] }}</td>
            <td class="text-center">{{ contact['phone'] }}</td>
            <td class="text-right">{{ contact['address'] }}</td>
            <td class="text-right">{{ contact['content'] }}</td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        props: ['contacts'],
        data() {
            return {
                checkedContacts: []
            }
        },
        methods: {
            selection() {
                var ids = [];
                ids = this.checkedContacts;
                this.$emit('checkedContacts', ids);
            }
        }
    }
</script>