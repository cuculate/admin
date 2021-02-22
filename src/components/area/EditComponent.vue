<template>
<!--    <div class="container-fluid">-->
<!--        <div class="row">-->
<!--            <div class="col-md-2"></div>-->
<!--            <div class="col-md-9">-->
<!--                <h1 class="mt-5 mb-4">Sửa thông tin: {{ areas.tentinh }}</h1>-->
<!--                <form @submit.prevent="updateArea">-->
<!--                    <div class="row">-->
<!--                        <div class="col-md-6">-->
<!--                            <div class="form-group">-->
<!--                                <label>Tên tỉnh, thành phố:</label>-->
<!--                                <input maxlength="30"-->
<!--                                       type="text"-->
<!--                                       class="form-control"-->
<!--                                       v-model.trim="$v.areas.tentinh.$model"-->
<!--                                       :class="{ 'is-invalid': $v.areas.tentinh.$error, 'is-valid' : !$v.areas.tentinh.$invalid}">-->
<!--                                <div class="invalid-feedback">-->
<!--                                    <span class="text-danger"-->
<!--                                          v-if="!$v.areas.tentinh.required">Tên tỉnh, thành phố không được để trống.</span>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="row">-->
<!--                        <div class="col-md-6">-->
<!--                            <div class="form-group">-->
<!--                                <label>Thời gian:</label>-->
<!--                                <input type="text"-->
<!--                                       class="form-control"-->
<!--                                       v-model.trim="$v.areas.mota.$model"-->
<!--                                       :class="{ 'is-invalid': $v.areas.mota.$error, 'is-valid' : !$v.areas.mota.$invalid}">-->
<!--                                <div class="invalid-feedback">-->
<!--                                <span class="text-danger"-->
<!--                                      v-if="!$v.areas.mota.required">Thời gian không được để trống.</span>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="row">-->
<!--                        <div class="col-md-6">-->
<!--                            <div class="form-group">-->
<!--                                <input type="radio"-->
<!--                                       id="active"-->
<!--                                       value="1"-->
<!--                                       v-model="areas.trangthai">-->
<!--                                <label for="active">Hoạt động</label><br>-->
<!--                                <input type="radio"-->
<!--                                       id="block"-->
<!--                                       value="2"-->
<!--                                       v-model="areas.trangthai">-->
<!--                                <label for="block">Khóa</label><br>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="form-group">-->
<!--                        <button class="btn btn-primary">Sửa</button>-->
<!--                    </div>-->
<!--                </form>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->


    <div class="container-fluid row p15">
        <h3 class="col-md-12">Sửa tỉnh, thành phố</h3>
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <button class="btn btn-primary btn-flat btn-control" @click="updateArea">Lưu</button>
                    </div>
                    <div class="card-tools mr-0">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link :to="{ name: 'area'}">Danh sách tỉnh, thành phố</router-link>
                            </li>
                            <li class="breadcrumb-item active">Sửa tỉnh, thành phố</li>
                        </ol>
                    </div>
                </div>
                <div class="card-body p15">
                    <form @submit.prevent="updateArea" enctype="multipart/form-data">
                        <div class="row">
                            <div class="form-group col-md-6 offset-3">
                                <label>Tên tỉnh, thành phố <code>*</code></label>
                                <input type="text" maxlength="150" class="form-control"
                                       v-model.trim="area['name']"
                                       :class="{'is-invalid' : errors && errors['name']}">
                                <div class="invalid-feedback">
                                    <span class="error" v-if="errors && errors['name']">{{errors['name'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-6 offset-3">
                                <label>Mô tả <code>*</code></label>
                                <input type="text" maxlength="150" class="form-control"
                                       v-model.trim="area['information']"
                                       :class="{'is-invalid' : errors && errors['information']}">
                                <div class="invalid-feedback">
                                    <span class="error" v-if="errors && errors['information']">{{errors['information'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-6 offset-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="active"
                                           id="active"
                                           value="1"
                                           v-model="area['status']">
                                    <label class="form-check-label" for="active">Hoạt động</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="block"
                                           id="block"
                                           value="2"
                                           v-model="area['status']">
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
                area: {},
                errors: [],
            }
        },
        computed: {
            ...mapState(['token'])
        },
        methods: {
            updateArea() {
                let vm = this;
                let uri = `http://localhost:8000/admin/area/update/${vm.$route.params.id}`;
                let token = {headers: {Authorization: 'Bearer ' + vm.$store.state.token}}
                vm.axios.put(uri, vm.area, token).then((response) => {
                    if (response.data.code === 200) {
                        vm.$router.push({name: 'area'});
                        vm.$snotify.success(response.data.data.msg);
                    } else {
                        vm.errors = response.data.errors;
                    }
                });
            }
        },

        created() {
            let vm = this;
            let uri = `http://localhost:8000/admin/area/edit/${vm.$route.params.id}`;
            let token = {headers: {Authorization: 'Bearer ' + vm.$store.state.token}}
            vm.axios.get(uri, token).then((response) => {
                if (response.data.code === 404) {
                    vm.$router.push({name: 'area'});
                    vm.$snotify.error(response.data.errors)
                } else {
                    vm.area = response.data.data.area;
                }
            });
        },
    }
</script>

<style scoped>

</style>

