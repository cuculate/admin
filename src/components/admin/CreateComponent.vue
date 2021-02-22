<template>
    <div class="container-fluid row p15">
        <h3 class="col-md-12">Thêm tài khoản</h3>
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <button class="btn btn-primary btn-flat btn-control" @click="addAdmin">Thêm mới</button>
                    </div>
                    <div class="card-tools mr-0">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link :to="{ name: 'admin'}">Danh sách Admin</router-link>
                            </li>
                            <li class="breadcrumb-item active">Thêm tài khoản</li>
                        </ol>
                    </div>
                </div>
                <div class="card-body p15">
                    <form @submit.prevent="addAdmin" enctype="multipart/form-data">
                        <div class="row">
                            <div class="form-group col-md-6 offset-3">
                                <label> Tài khoản <code>*</code></label>
                                <input type="text" maxlength="150" class="form-control"
                                       v-model.trim="admin['account']"
                                       :class="{'is-invalid' : errors && errors['account']}">
                                <div class="invalid-feedback">
                                    <span class="error"
                                          v-if="errors && errors['account']">{{errors['account'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-6 offset-3">
                                <label> Email <code>*</code></label>
                                <input type="email" maxlength="150" class="form-control"
                                       v-model.trim="admin['email']"
                                       :class="{'is-invalid' : errors && errors['email']}">
                                <div class="invalid-feedback">
                                    <span class="error" v-if="errors && errors['email']">{{errors['email'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-6 offset-3">
                                <label> Mật khẩu <code>*</code></label>
                                <input type="password" maxlength="150" class="form-control"
                                       v-model.trim="admin['password']"
                                       :class="{'is-invalid' : errors && errors['password']}">
                                <div class="invalid-feedback">
                                    <span class="error"
                                          v-if="errors && errors['password']">{{errors['password'][0]}}</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        computed: {
            ...mapState(['token']),
        },

        data() {
            return {
                admin: {},
                errors: [],
            }
        },
        methods: {
            addAdmin() {
                let vm = this;
                let uri = 'http://localhost:8000/admin/admin/store';
                let token = {headers: {Authorization: 'Bearer ' + vm.$store.state.token}}
                this.axios.post(uri, vm.admin, token).then(response => {
                    if (response.data.code === 200) {
                        vm.$router.push({name: 'admin'});
                        vm.$snotify.success(response.data.data.msg);
                    } else {
                        vm.errors = response.data.errors;
                    }
                });
            }
        }
    }
</script>
