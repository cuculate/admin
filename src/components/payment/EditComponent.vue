<template>
    <div class="container-fluid row p15">
        <h3 class="col-md-12">Sửa phương thức thanh toán</h3>
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <button class="btn btn-primary btn-flat btn-control" @click="updatePayment">Lưu</button>
                    </div>
                    <div class="card-tools mr-0">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link :to="{ name: 'payment'}">Danh sách phương thức thanh toán</router-link>
                            </li>
                            <li class="breadcrumb-item active">Sửa phương thức thanh toán</li>
                        </ol>
                    </div>
                </div>
                <div class="card-body p15">
                    <form @submit.prevent="updatePayment" enctype="multipart/form-data">
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
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="active"
                                           id="active"
                                           value="1"
                                           v-model="payment['status']">
                                    <label class="form-check-label" for="active">Hoạt động</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="block"
                                           id="block"
                                           value="2"
                                           v-model="payment['status']">
                                    <label class="form-check-label" for="block">Khóa</label>
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
            updatePayment() {
                let uri = `http://localhost:8000/admin/payment/update/${this.$route.params.id}`;
                let token = {headers: {Authorization: 'Bearer ' + this.$store.state.token}}
                this.axios.put(uri, this.payment, token).then((response) => {
                    this.$router.push({name: 'payment'})
                    this.$snotify.success('Thao tác thành công')
                });
            }
        },
        created() {
            let uri = `http://localhost:8000/admin/payment/edit/${this.$route.params.id}`;
            let token = {headers: {Authorization: 'Bearer ' + this.$store.state.token}}
            this.axios.get(uri, token).then((response) => {
                if (response.data.code === 200) {
                    this.payment = response.data.data.payment
                } else {
                    this.$router.push({name: 'payment'})
                    this.$snotify.error(response.data.errors)
                }
            });
        },
    }
</script>

<style scoped>

</style>

