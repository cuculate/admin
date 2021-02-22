<template>
    <div class="container-fluid row p15">
        <h3 class="col-md-12">Thêm hãng</h3>
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <button class="btn btn-primary btn-flat btn-control" @click="addBrand">Thêm mới</button>
                    </div>
                    <div class="card-tools mr-0">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link :to="{ name: 'brand'}">Danh sách hãng</router-link>
                            </li>
                            <li class="breadcrumb-item active">Thêm hãng</li>
                        </ol>
                    </div>
                </div>
                <div class="card-body p15">
                    <form @submit.prevent="addBrand" enctype="multipart/form-data">
                        <div class="row">
                            <div class="form-group col-md-6">
                                <label>Tên hãng <code>*</code></label>
                                <input type="text" maxlength="150" class="form-control"
                                       v-model.trim="brand['name']"
                                       :class="{'is-invalid' : errors && errors['name']}">
                                <div class="invalid-feedback">
                                    <span class="error" v-if="errors && errors['name']">{{errors['name'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-6">
                                <label>Số điện thoại <code>*</code></label>
                                <input type="text" maxlength="150" class="form-control"
                                       v-model.trim="brand['phone']"
                                       :class="{'is-invalid' : errors && errors['phone']}">
                                <div class="invalid-feedback">
                                    <span class="error" v-if="errors && errors['phone']">{{errors['phone'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-6">
                                <label>Địa chỉ <code>*</code></label>
                                <input type="text" maxlength="150" class="form-control"
                                       v-model.trim="brand['address']"
                                       :class="{'is-invalid' : errors && errors['address']}">
                                <div class="invalid-feedback">
                                    <span class="error"
                                          v-if="errors && errors['address']">{{errors['address'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-6">
                                <label>Website <code>*</code></label>
                                <input type="text" maxlength="150" class="form-control"
                                       v-model.trim="brand['website']"
                                       :class="{'is-invalid' : errors && errors['website']}">
                                <div class="invalid-feedback">
                                    <span class="error" v-if="errors && errors['website']">{{errors['website'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-6">
                                <label>Email <code>*</code></label>
                                <input type="email" maxlength="150" class="form-control"
                                       v-model.trim="brand['email']"
                                       :class="{'is-invalid' : errors && errors['email']}">
                                <div class="invalid-feedback">
                                    <span class="error" v-if="errors && errors['email']">{{errors['email'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-12">
                                <label>Thông tin</label>
                                <ckeditor :editor="editor" v-model="brand['information']"></ckeditor>
                                <div class="invalid-feedback">
                                    <span class="error" v-if="errors && errors['information']">{{errors['information'][0]}}</span>
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
    import Vue from 'vue';
    import CKEditor from '@ckeditor/ckeditor5-vue2';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

    Vue.use(CKEditor);

    export default {
        computed: {
            ...mapState(['token']),
        },
        data() {
            return {
                editor: ClassicEditor,
                brand: {},
                errors: [],
            }
        },
        methods: {
            addBrand() {
                let vm = this;
                let uri = 'http://localhost:8000/admin/brand/store';
                let token = {headers: {Authorization: 'Bearer ' + vm.$store.state.token}}
                vm.axios.post(uri, vm.brand, token).then(response => {
                    if (response.data.code === 200) {
                        vm.$router.push({name: 'brand'});
                        vm.$snotify.success(response.data.data.msg);
                    } else {
                        vm.errors = response.data.errors;
                    }
                });
            }
        }
    }
</script>
