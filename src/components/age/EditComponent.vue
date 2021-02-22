<template>
    <div class="container-fluid row p15">
        <h3 class="col-md-12">Sửa nhóm tuổi</h3>
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <button class="btn btn-primary btn-flat btn-control" @click="updateAge">Lưu</button>
                    </div>
                    <div class="card-tools mr-0">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link :to="{ name: 'age'}">Danh sách nhóm tuổi</router-link>
                            </li>
                            <li class="breadcrumb-item active">Sửa nhóm tuổi</li>
                        </ol>
                    </div>
                </div>
                <div class="card-body p15">
                    <form @submit.prevent="updateAge" enctype="multipart/form-data">
                        <div class="row">
                            <div class="form-group col-md-6 offset-3">
                                <label>Tên nhóm tuổi <code>*</code></label>
                                <input type="text" maxlength="150" class="form-control"
                                       v-model.trim="age['name']"
                                       :class="{'is-invalid' : errors && errors['name']}">
                                <div class="invalid-feedback">
                                    <span class="error"
                                          v-if="errors && errors['name']">{{errors['name'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-6 offset-3">
                                <label>Tháng <code>*</code></label>
                                <input type="text" maxlength="150" class="form-control"
                                       v-model.trim="age['month']"
                                       :class="{'is-invalid' : errors && errors['month']}">
                                <div class="invalid-feedback">
                                    <span class="error"
                                          v-if="errors && errors['month']">{{errors['month'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-6 offset-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="active"
                                           id="active"
                                           value="1"
                                           v-model="age['status']">
                                    <label class="form-check-label" for="active">Hoạt động</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="block"
                                           id="block"
                                           value="2"
                                           v-model="age['status']">
                                    <label class="form-check-label" for="block">Khóa</label>
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
    import {mapState} from 'vuex';

    export default {
        data() {
            return {
                age: {},
                errors: [],
            }
        },
        computed: {...mapState(['token'])},
        methods: {
            updateAge() {
                let vm = this;
                let uri = `http://localhost:8000/admin/age/update/${vm.$route.params.id}`;
                let token = {headers: {Authorization: 'Bearer ' + vm.$store.state.token}}
                vm.axios.put(uri, vm.age, token).then((response) => {
                    if (response.data.code === 200) {
                        vm.$router.push({name: 'age'});
                        vm.$snotify.success(response.data.data.msg);
                    } else {
                        vm.errors = response.data.errors;
                    }
                });
            }
        },

        created() {
            let vm = this;
            let uri = `http://localhost:8000/admin/age/edit/${vm.$route.params.id}`;
            let token = {headers: {Authorization: 'Bearer ' + vm.$store.state.token}}
            vm.axios.get(uri, token).then((response) => {
                if (response.data.code === 404) {
                    vm.$router.push({name: 'category'});
                    vm.$snotify.error(response.data.errors)
                } else {
                    vm.age = response.data.data.age;
                }
            });
        },
    }
</script>
