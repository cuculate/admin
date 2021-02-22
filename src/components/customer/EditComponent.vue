account<template>
    <div class="container-fluid row p15">
        <h3 class="col-md-12">Sửa thông tin tài khoản</h3>
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <button class="btn btn-primary btn-flat btn-control" @click="updateCustomer">Lưu</button>
                    </div>
                    <div class="card-tools mr-0">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link :to="{ name: 'customer'}">Danh sách khách hàng</router-link>
                            </li>
                            <li class="breadcrumb-item active">Sửa thông tin tài khoản</li>
                        </ol>
                    </div>
                </div>
                <div class="card-body p15">
                    <form @submit.prevent="updateCustomer" enctype="multipart/form-data">
                        <div class="row">
                            <div class="form-group col-md-6">
                                <label>Tài khoản <code>*</code></label>
                                <input type="text" maxlength="150" class="form-control"
                                       v-model.trim="customer['account']"
                                       :class="{'is-invalid' : errors && errors['account']}">
                                <div class="invalid-feedback">
                                    <span class="error" v-if="errors && errors['account']">{{errors['account'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-6">
                                <label>Tên khách hàng <code>*</code></label>
                                <input type="text" maxlength="150" class="form-control"
                                       v-model.trim="customer['name']"
                                       :class="{'is-invalid' : errors && errors['name']}">
                                <div class="invalid-feedback">
                                    <span class="error" v-if="errors && errors['name']">{{errors['name'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-6">
                                <label>Email <code>*</code></label>
                                <input type="email" maxlength="150" class="form-control"
                                       v-model.trim="customer['email']"
                                       :class="{'is-invalid' : errors && errors['email']}">
                                <div class="invalid-feedback">
                                    <span class="error" v-if="errors && errors['email']">{{errors['email'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-6">
                                <label>Mật khẩu <code>*</code></label>
                                <input type="password" maxlength="150" class="form-control"
                                       v-model.trim="customer['password']"
                                       :class="{'is-invalid' : errors && errors['password']}">
                                <div class="invalid-feedback">
                                    <span class="error" v-if="errors && errors['password']">{{errors['password'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-6">
                                <label>Số điện thoại <code>*</code></label>
                                <input type="number" maxlength="150" class="form-control"
                                       v-model.trim="customer['phone']"
                                       :class="{'is-invalid' : errors && errors['phone']}">
                                <div class="invalid-feedback">
                                    <span class="error" v-if="errors && errors['phone']">{{errors['phone'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-6">
                                <label>Địa chỉ <code>*</code></label>
                                <input type="text" maxlength="150" class="form-control"
                                       v-model.trim="customer['address']"
                                       :class="{'is-invalid' : errors && errors['address']}">
                                <div class="invalid-feedback">
                                    <span class="error" v-if="errors && errors['address']">{{errors['address'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-6">
                                <input type="radio"
                                       id="nam"
                                       value="4"
                                       v-model="customer['gender']">
                                <label for="nam">Nam</label><br>
                                <input type="radio"
                                       id="nu"
                                       value="5"
                                       v-model="customer['gender']">
                                <label for="nu">Nữ</label><br>
                            </div>

                            <div class="form-group col-md-6">
                                <input type="radio"
                                       id="active"
                                       value="1"
                                       v-model="customer['status']">
                                <label for="active">Hoạt động</label><br>
                                <input type="radio"
                                       id="block"
                                       value="2"
                                       v-model="customer['status']">
                                <label for="block">Khóa</label><br>
                            </div>

                            <div class="form-group col-md-6">
                                <label>Tỉnh <code>*</code></label>
                                <treeselect :class="{'is-invalid' : errors && errors['area_id']}"
                                            :options="areas.map(({id, name}) => ({id: id, label: name}))"
                                            v-model="customer['area_id']"
                                            placeholder="Hãng"
                                            :multiple="false"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import Treeselect from '@riophae/vue-treeselect';
    import '@riophae/vue-treeselect/dist/vue-treeselect.css';
    import Vue from 'vue';
    import CKEditor from '@ckeditor/ckeditor5-vue2';

    Vue.use( CKEditor );

    export default {
        components: {Treeselect},
        computed: {
            ...mapState(['token']),
        },
        data() {
            return {
                customer: {},
                errors: [],
                areas: []
            }
        },
        methods: {
            updateCustomer() {
                let vm = this;
                let uri = `http://localhost:8000/admin/customer/update/${vm.$route.params.id}`;
                let token = {headers: {Authorization: 'Bearer ' + vm.$store.state.token}}
                vm.axios.put(uri, vm.customer, token).then((response) => {
                    if (response.data.code === 200) {
                        vm.$router.push({name: 'customer'})
                        vm.$snotify.success(response.data.data.msg)
                    } else {
                        vm.errors = response.data.errors;
                    }
                });
            }
        },

        created() {
            let vm = this;
            let uri = `http://localhost:8000/admin/customer/edit/${vm.$route.params.id}`;
            let token = {headers: {Authorization: 'Bearer ' + this.$store.state.token}}
            vm.axios.get(uri, token).then((response) => {
                vm.customer = response.data.data.customer
                vm.areas = response.data.data.area
            });
        },
    }
</script>

<style scoped>

</style>

