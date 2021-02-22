<template>
    <div class="container-fluid row p15">
        <h3 class="col-md-12">Thêm đồ chơi</h3>
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <button class="btn btn-primary btn-flat btn-control" @click="addProduct">Thêm mới</button>
                    </div>
                    <div class="card-tools mr-0">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link :to="{ name: 'product'}">Danh sách đồ chơi</router-link>
                            </li>
                            <li class="breadcrumb-item active">Thêm đồ chơi</li>
                        </ol>
                    </div>
                </div>
                <div class="card-body p15">
                    <form @submit.prevent="addProduct" enctype="multipart/form-data">
                        <div class="row">
                            <div class="form-group col-md-6">
                                <label>Tên đồ chơi <code>*</code></label>
                                <input type="text" maxlength="150" class="form-control"
                                       v-model.trim="product['name']"
                                       :class="{'is-invalid' : errors && errors['name']}">
                                <div class="invalid-feedback">
                                    <span class="error" v-if="errors && errors['name']">{{errors['name'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-6">
                                <label>Danh mục <code>*</code></label>
                                <treeselect :class="{'is-invalid' : errors && errors['category_id']}"
                                            :options="categories.map(({id, name}) => ({id: id, label: name}))"
                                            v-model.trim="product['category_id']"
                                            placeholder="Danh mục"
                                            :multiple="false"/>
                                <div class="invalid-feedback">
                                    <span class="error" v-if="errors && errors['category_id']">{{errors['category_id'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-6">
                                <label>Hãng <code>*</code></label>
                                <treeselect :class="{'is-invalid' : errors && errors['brand_id']}"
                                            :options="brands.map(({id, name}) => ({id: id, label: name}))"
                                            v-model.trim="product['brand_id']"
                                            placeholder="Hãng"
                                            :multiple="false"/>
                                <div class="invalid-feedback">
                                    <span class="error" v-if="errors && errors['brand_id']">{{errors['brand_id'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-6">
                                <label>Nhóm tuổi <code>*</code></label>
                                <treeselect :class="{'is-invalid' : errors && errors['age_id']}"
                                            :options="ages.map(({id, name}) => ({id: id, label: name}))"
                                            v-model.trim="product['age_id']"
                                            placeholder="Nhóm tuổi"
                                            :multiple="false"/>
                                <div class="invalid-feedback">
                                    <span class="error" v-if="errors && errors['age_id']">{{errors['age_id'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-6">
                                <label for="picture">Ảnh</label>
                                <div class="input-group">
                                    <div class="custom-file">
                                        <input type="file" name="picture" class="form-control form-control-file"
                                               id="picture"
                                               @change="onFileChange">
                                        <label class="custom-file-label" for="picture">Chọn ảnh</label>
                                    </div>
                                </div>

                                <img class="m-3" v-bind:src="imagePreview" width="100"
                                     v-show="showPreview"/>
                            </div>

                            <div class="form-group col-md-6">
                                <label>Giá <code>*</code></label>
                                <input type="text" class="form-control" v-model.trim="product['price']"
                                       :class="{'is-invalid' : errors && errors['price']}">
                                <div class="invalid-feedback">
                                    <span class="error" v-if="errors && errors['price']">{{errors['price'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-6">
                                <label>Số lượng</label>
                                <input type="text" class="form-control" v-model.trim="product['stocked']"
                                       :class="{'is-invalid' : errors && errors['stocked']}">
                                <div class="invalid-feedback">
                                    <span class="error"
                                          v-if="errors && errors['stocked']">{{errors['stocked'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-6">
                                <label>Nơi sản xuất</label>
                                <input type="text" class="form-control" v-model.trim="product['made_in']"
                                       :class="{'is-invalid' : errors && errors['made_in']}">
                                <div class="invalid-feedback">
                                    <span class="error" v-if="errors && errors['made_in']">{{errors['made_in'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-6">
                                <label>Chất liệu</label>
                                <input type="text" class="form-control" v-model.trim="product['material']"
                                       :class="{'is-invalid' : errors && errors['material']}">
                                <div class="invalid-feedback">
                                    <span class="error"
                                          v-if="errors && errors['material']">{{errors['material'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-6">
                                <label>Dài</label>
                                <input type="text" class="form-control" v-model.trim="product['length']"
                                       :class="{'is-invalid' : errors && errors['length']}">
                                <div class="invalid-feedback">
                                    <span class="error" v-if="errors && errors['length']">{{errors['length'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-6">
                                <label>Rộng</label>
                                <input type="text" class="form-control" v-model.trim="product['width']"
                                       :class="{'is-invalid' : errors && errors['width']}">
                                <div class="invalid-feedback">
                                    <span class="error" v-if="errors && errors['width']">{{errors['width'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-6">
                                <label>Cao</label>
                                <input type="text" class="form-control" v-model.trim="product['height']"
                                       :class="{'is-invalid' : errors && errors['height']}">
                                <div class="invalid-feedback">
                                    <span class="error" v-if="errors && errors['height']">{{errors['height'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-6">
                                <label>Màu sắc</label>
                                <input type="text" class="form-control" v-model.trim="product['color']"
                                       :class="{'is-invalid' : errors && errors['color']}">
                                <div class="invalid-feedback">
                                    <span class="error" v-if="errors && errors['color']">{{errors['color'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-12">
                                <label>Thông tin</label>
                                <ckeditor :editor="editor" v-model.trim="product['information']"></ckeditor>
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
    import Treeselect from '@riophae/vue-treeselect';
    import '@riophae/vue-treeselect/dist/vue-treeselect.css';
    import Vue from 'vue';
    import CKEditor from '@ckeditor/ckeditor5-vue2';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

    Vue.use( CKEditor );

    export default {
        components: {Treeselect},
        computed: {
            ...mapState(['token']),
        },
        data() {
            return {
                editor: ClassicEditor,
                product: {
                    category_id: null,
                    brand_id: null,
                    age_id: null,
                    image: null,
                },
                errors: [],
                categories: [],
                brands: [],
                ages: [],
                imagePreview: null,
                showPreview: false,
            }
        },

        methods: {
            onFileChange(event) {
                let vm = this;
                vm.product['image'] = event.target.files[0];

                let reader = new FileReader();

                reader.addEventListener("load", function () {
                    vm.showPreview = true;
                    vm.imagePreview = reader.result;
                }.bind(this), false);

                if (vm.product['image'] && /\.(jpe?g|png|gif)$/i.test(vm.product['image'].name)) {
                    reader.readAsDataURL(vm.product.image);
                }
            },

            addProduct() {
                let vm = this;
                let uri = 'http://localhost:8000/admin/product/store';
                let token = {headers: {Authorization: 'Bearer ' + vm.$store.state.token}}

                let form = new FormData();
                for (let key in vm.product) {
                    form.append(key, vm.product[key]);
                }

                vm.axios.post(uri, form, token).then(response => {
                    if (response.data.code === 200) {
                        vm.$router.push({name: 'product-edit', params: { id: response.data.data.product['id'] }});
                        vm.$snotify.success(response.data.data.msg);
                    } else {
                        vm.errors = response.data.errors;
                        console.log(vm.errors);
                    }
                });
            },
        },

        created() {
            let vm = this;
            let uri = 'http://localhost:8000/admin/product/create';
            let token = {headers: {Authorization: 'Bearer ' + this.$store.state.token}}
            this.axios.get(uri, token).then(response => {
                vm.categories = response.data.data.category;
                vm.brands = response.data.data.brand;
                vm.ages = response.data.data.age;
            });
        },
    }
</script>