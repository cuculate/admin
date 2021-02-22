<template>
    <div class="container-fluid row p15">
        <h3 class="col-md-12">Thêm danh mục</h3>
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <button class="btn btn-primary btn-flat btn-control" @click="addCategory">Thêm mới</button>
                    </div>
                    <div class="card-tools mr-0">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link :to="{ name: 'category'}">Danh sách danh mục</router-link>
                            </li>
                            <li class="breadcrumb-item active">Thêm danh mục</li>
                        </ol>
                    </div>
                </div>
                <div class="card-body p15">
                    <form @submit.prevent="addCategory" enctype="multipart/form-data">
                        <div class="row">
                            <div class="form-group col-md-6 offset-3">
                                <label>Danh mục <code>*</code></label>
                                <input type="text" maxlength="150" class="form-control"
                                       v-model.trim="category['name']"
                                       :class="{'is-invalid' : errors && errors['name']}">
                                <div class="invalid-feedback">
                                    <span class="error" v-if="errors && errors['name']">{{errors['name'][0]}}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-6 offset-3">
                                <label>Danh mục cha <code>*</code></label>
                                <treeselect :class="{'is-invalid' : errors && errors['id']}"
                                            :options="parents.map(({id, name}) => ({id: id, label: name}))"
                                            placeholder="Danh mục"
                                            v-model.trim="category['parent_id']"
                                            :multiple="false"/>
                                <div class="invalid-feedback">
                                    <span class="error" v-if="errors && errors['id']">{{errors['id'][0]}}</span>
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
            addCategory() {
                let vm = this;
                let uri = 'http://localhost:8000/admin/category/store';
                let token = {headers: {Authorization: 'Bearer ' + vm.$store.state.token}}
                vm.axios.post(uri, vm.category, token).then(response => {
                    if (response.data.code === 200) {
                        vm.$router.push({name: 'category'});
                        vm.$snotify.success(response.data.data.msg);
                    } else {
                        vm.errors = response.data.errors;
                    }
                });
            }
        },
        created() {
            let vm = this;
            let uri = 'http://localhost:8000/admin/category/create';
            let token = {headers: {Authorization: 'Bearer ' + vm.$store.state.token}}
            vm.axios.get(uri, token).then(response => {
                vm.parents = response.data.data.parent;
            });
        },
    }
</script>
