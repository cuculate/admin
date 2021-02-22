<template>
    <div class="row">
        <div class="col-md-4 offset-4">
            <form @submit.prevent="login">
                <h1>Đăng nhập</h1>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Email:
                                <span class="text-danger">*</span>
                            </label>
                            <input type="text"
                                   required
                                   class="form-control"
                                   v-model.trim="admin.email"
                                   :class="{'is-invalid' : errors}">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Mật khẩu:
                                <span class="text-danger">*</span>
                            </label>
                            <input type="password"
                                   required
                                   class="form-control"
                                   v-model.trim="admin.password">
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary">Đăng nhập</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex';

    export default {
        computed: {...mapMutations(['auth_error'])},
        data() {
            return {
                admin: {},
                errors: null,
            }
        },
        methods: {
            login() {
                const vm = this;
                vm.$store.dispatch('auth', vm.admin)
                    .then(response => {
                        if (response.data.code !== 200) {
                            vm.$snotify.error(response.data.errors);
                            return;
                        }
                        vm.$router.push('/');
                        vm.$snotify.success(response.data.data.msg);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            },
        }
    }
</script>
