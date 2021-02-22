<template>
    <div class="container-fluid row p15">
        <h3 class="col-md-12">Sửa thông tin đồ chơi</h3>
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <button class="btn btn-primary btn-flat btn-control" @click="updateProduct">Lưu</button>
                    </div>
                    <div class="card-tools mr-0">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link :to="{ name: 'product'}">Danh sách đồ chơi</router-link>
                            </li>
                            <li class="breadcrumb-item active">Sửa thông tin đồ chơi</li>
                        </ol>
                    </div>
                </div>
                <div class="card-body p15">
                    <form @submit.prevent="updateProduct" enctype="multipart/form-data">
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
                                    <span class="error"
                                          v-if="errors && errors['brand_id']">{{errors['brand_id'][0]}}</span>
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
                                <p class="form-control" v-if="!showPreview">{{ product['image'] }}</p>
                                <p class="form-control" v-if="showPreview">{{ product['image'].name }}</p>
                            </div>

                            <div class="form-group col-md-6">
                                <img class="m-3" v-bind:src="imagePreview" width="100" height="100"
                                     v-show="showPreview"/>
                                <img class="m-3" v-show="!showPreview" :src="'/images/sanpham/' + product['image']"
                                     :alt="product['name']"
                                     width="100" height="100">
                            </div>

                            <div class="form-group col-md-4">
                                <input class="m-3 mt-4"
                                       type="checkbox"
                                       id="new"
                                       v-model.trim="product['new']">
                                <label for="new">Mới</label>
                                <input class="m-3"
                                       type="checkbox"
                                       id="sale"
                                       v-model="product['sale']">
                                <label for="sale">Giảm giá</label>
                            </div>

                            <div class="form-group col-md-4" v-if="product['sale'] == 1">
                                <div class="form-group">
                                    <label>Giá Gốc <code>*</code></label>
                                    <input type="text"
                                           class="form-control"
                                           v-model.trim="product['old_price']">
                                    <div class="invalid-feedback">
                                        <span class="error" v-if="errors && errors['old_price']">{{errors['old_price'][0]}}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group col-md-4">
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
                                    <span class="error"
                                          v-if="errors && errors['made_in']">{{errors['made_in'][0]}}</span>
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

                            <div class="form-group col-md-3">
                                <label>Dài</label>
                                <input type="text" class="form-control" v-model.trim="product['length']"
                                       :class="{'is-invalid' : errors && errors['length']}">
                                <div class="invalid-feedback">
                                    <span class="error" v-if="errors && errors['length']">{{errors['length'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-3">
                                <label>Rộng</label>
                                <input type="text" class="form-control" v-model.trim="product['width']"
                                       :class="{'is-invalid' : errors && errors['width']}">
                                <div class="invalid-feedback">
                                    <span class="error" v-if="errors && errors['width']">{{errors['width'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-3">
                                <label>Cao</label>
                                <input type="text" class="form-control" v-model.trim="product['height']"
                                       :class="{'is-invalid' : errors && errors['height']}">
                                <div class="invalid-feedback">
                                    <span class="error" v-if="errors && errors['height']">{{errors['height'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-3 mt-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="active"
                                           id="active"
                                           value="1"
                                           v-model.trim="product['status']">
                                    <label class="form-check-label" for="active">Hoạt động</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="block"
                                           id="block"
                                           value="2"
                                           v-model.trim="product['status']">
                                    <label class="form-check-label" for="block">Khóa</label>
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

    Vue.use(CKEditor);

    export default {
        components: {Treeselect},
        computed: {
            ...mapState(['token']),
        },
        data() {
            return {
                editor: ClassicEditor,
                product: {},
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
                vm.product['old_image'] = vm.product['image']
                vm.product['image'] = event.target.files[0];

                let reader = new FileReader();

                reader.addEventListener("load", function () {
                    vm.showPreview = true;
                    vm.imagePreview = reader.result;
                }.bind(vm), false);

                if (vm.product['image'] && /\.(jpe?g|png|gif)$/i.test(vm.product['image'].name)) {
                    reader.readAsDataURL(vm.product['image']);
                }
            },
            updateProduct() {
                let vm = this;
                let uri = `http://localhost:8000/admin/product/update/${vm.$route.params.id}`;
                let config = {
                    headers: {
                        Authorization: 'Bearer ' + vm.$store.state.token,
                        'Content-Type': 'multipart/form-data',
                        Accept: 'application/json',
                    }
                }

                let form = new FormData();
                for (let key in vm.product) {
                    form.append(key, vm.product[key]);
                }

                vm.axios.post(uri, form, config).then(response => {
                    if (response.data.code === 200) {
                        vm.$router.push({name: 'product-edit', params: { id: response.data.data.product['id'] }});
                        vm.$snotify.success(response.data.data.msg);
                    } else {
                        vm.errors = response.data.errors;
                    }
                });
            },
        },

        created() {
            let vm = this;
            let uri = `http://localhost:8000/admin/product/edit/${vm.$route.params.id}`;
            let token = {headers: {Authorization: 'Bearer ' + vm.$store.state.token}}
            this.axios.get(uri, token).then((response) => {
                vm.product = response.data.data.product;
                vm.categories = response.data.data.category;
                vm.brands = response.data.data.brand;
                vm.ages = response.data.data.age;
            });
        },
    }
</script>

