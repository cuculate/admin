<template>
    <div class="container-fluid row p15">
        <h3 class="col-md-12">Thêm tỉnh, thành phố</h3>
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <button class="btn btn-primary btn-flat btn-control" @click="addArea">Thêm mới</button>
                    </div>
                    <div class="card-tools mr-0">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link :to="{ name: 'area'}">Danh sách tỉnh, thành phố</router-link>
                            </li>
                            <li class="breadcrumb-item active">Thêm tỉnh, thành phố</li>
                        </ol>
                    </div>
                </div>
                <div class="card-body p15">
                    <form @submit.prevent="addArea" enctype="multipart/form-data">
                        <div class="row">
                            <div class="form-group col-md-6 offset-3">
                                <label>Tên tỉnh, thành phố <code>*</code></label>
                                <input type="text" maxlength="150" class="form-control"
                                       v-model.trim="area['name']"
                                       :class="{'is-invalid' : errors && errors['name']}">
                                <div class="invalid-feedback">
                                    <span class="error"
                                          v-if="errors && errors['name']">{{errors['name'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-6 offset-3">
                                <label>Mô tả <code>*</code></label>
                                <input type="text" maxlength="150" class="form-control"
                                       v-model.trim="area['information']"
                                       :class="{'is-invalid' : errors && errors['information']}">
                                <div class="invalid-feedback">
                                    <span class="error"
                                          v-if="errors && errors['information']">{{errors['information'][0]}}</span>
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
                area: { },
                errors: [],
            }
        },
        computed: {...mapState(['token'])},
        methods: {
            addArea() {
                let vm = this;
                let uri = 'http://localhost:8000/admin/area/store';
                let token = {headers: {Authorization: 'Bearer ' + vm.$store.state.token}}

                vm.axios.post(uri, vm.area, token).then(response => {
                    if (response.data.code === 200) {
                        vm.$router.push({name: 'age-create'});
                        vm.$snotify.success(response.data.data.msg);
                    } else {
                        vm.errors = response.data.errors;
                    }
                });
            }
        }
    }
</script>
