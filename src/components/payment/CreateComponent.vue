<template>
    <div class="container-fluid row p15">
        <h3 class="col-md-12">Thêm phương thức thanh toán</h3>
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <button class="btn btn-primary btn-flat btn-control" @click="addPayment">Thêm mới</button>
                    </div>
                    <div class="card-tools mr-0">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link :to="{ name: 'payment'}">Danh sách phương thức thanh toán</router-link>
                            </li>
                            <li class="breadcrumb-item active">Thêm phương thức thanh toán</li>
                        </ol>
                    </div>
                </div>
                <div class="card-body p15">
                    <form @submit.prevent="addPayment" enctype="multipart/form-data">
                        <div class="row">
                            <div class="form-group col-md-6 offset-3">
                                <label>Phương thức thanh toán <code>*</code></label>
                                <input type="text" maxlength="150" class="form-control"
                                       v-model.trim="payment['name']"
                                       :class="{'is-invalid' : errors && errors['name']}">
                                <div class="invalid-feedback">
                                    <span class="error" v-if="errors && errors['name']">{{errors['name'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-6 offset-3">
                                <label>Thông tin</label>
                                <ckeditor :editor="editor" v-model="payment['information']"></ckeditor>
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

    Vue.use( CKEditor );

    export default {
        computed: {
            ...mapState(['token']),
        },
        data() {
            return {
                editor: ClassicEditor,
                payment: {},
                errors: [],
            }
        },
        methods: {
            addPayment() {
                let vm = this;
                let uri = 'http://localhost:8000/admin/payment/store';
                let token = {headers: {Authorization: 'Bearer ' + vm.$store.state.token}}
                vm.axios.post(uri, vm.payment, token).then(response => {
                    if (response.data.code === 200) {
                        vm.$router.push({name: 'payment'});
                        vm.$snotify.success('Thao tác thành công');
                    } else {
                        vm.errors = response.data.errors;
                        console.log(vm.errors);
                    }
                });
            }
        }
    }
</script>
