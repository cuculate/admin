<template>
    <div class="container-fluid row p15">
        <h3 class="col-md-12">Sửa danh mục</h3>
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <button class="btn btn-primary btn-flat btn-control" @click="updateCategory">lưu</button>
                    </div>
                    <div class="card-tools mr-0">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link :to="{ name: 'category'}">Danh sách danh mục</router-link>
                            </li>
                            <li class="breadcrumb-item active">Sửa danh mục</li>
                        </ol>
                    </div>
                </div>
                <div class="card-body p15">
                    <form @submit.prevent="updateCategory" enctype="multipart/form-data">
                        <div class="row">
                            <div class="form-group col-md-6 offset-3">
                                <label>Danh mục <code>*</code></label>
                                <input type="text" maxlength="150" class="form-control"
                                       v-model.trim="category['name']"
                                       :class="{'is-invalid' : errors && errors['name']}">
                                <div class="invalid-feedback">
                                    <span class="error"
                                          v-if="errors && errors['name']">{{errors['name'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-6 offset-3">
                                <label>Danh mục cha <code>*</code></label>
                                <treeselect :class="{'is-invalid' : errors && errors['id']}"
                                            :options="parents.map(({id, name}) => ({id: id, label: name}))"
                                            v-model.trim="category['parent_id']"
                                            placeholder="Danh mục"
                                            :multiple="false"/>
                                <div class="invalid-feedback">
                                    <span class="error" v-if="errors && errors['id']">{{errors['id'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-6 offset-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="active"
                                           id="active"
                                           value="1"
                                           v-model="category['status']">
                                    <label class="form-check-label" for="active">Hoạt động</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="block"
                                           id="block"
                                           value="2"
                                           v-model="category['status']">
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
    import '@riophae/vue-treeselect/dist/vue-treeselect.css';
    import Treeselect from "@riophae/vue-treeselect";

    export default {
        components: {Treeselect},
        computed: {
            ...mapState(['token']),
        },
        data() {
            return {
                category: {},
                errors: [],
                parents: []
            }
        },
        methods: {
            updateCategory() {
                let vm = this;
                let uri = `http://localhost:8000/admin/category/update/${vm.$route.params.id}`;
                let token = {headers: {Authorization: 'Bearer ' + vm.$store.state.token}}
                vm.axios.put(uri, vm.category, token).then((response) => {
                    if (response.data.code === 200) {
                        vm.$router.push({name: 'category'});
                        vm.$snotify.success(response.data.data.msg);
                    } else {
                        vm.errors = response.data.errors;
                    }
                });
            },
            setData(response) {

            }
        },
        created() {
            let vm = this;
            let uri = `http://localhost:8000/admin/category/edit/${vm.$route.params.id}`;
            let token = {headers: {Authorization: 'Bearer ' + vm.$store.state.token}}
            vm.axios.get(uri, token).then((response) => {
                if (response.data.code === 404) {
                    vm.$router.push({name: 'category'})
                    vm.$snotify.error(response.data.errors)
                } else {
                    vm.category = response.data.data.category
                    vm.parents = response.data.data.parent
                }
            });
        },
    }
</script>

<style scoped>

</style>

