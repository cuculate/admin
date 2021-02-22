<template>
    <div class="container-fluid wrapper">
        <!-- Navbar -->
        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
            <!-- Left navbar links -->
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
                </li>
                <li class="nav-item d-none d-sm-inline-block">
                    <a href="/" class="nav-link">Home</a>
                </li>
            </ul>

        </nav>
        <!-- /.navbar -->

        <!-- Main Sidebar Container -->
        <aside class="main-sidebar sidebar-dark-primary elevation-4">
            <!-- Brand Logo -->
            <a href="/" class="brand-link text-center">
                <img :src="'/images/site/logo.png'" alt="AdminLTE Logo">
            </a>

            <!-- Sidebar -->
            <div class="sidebar">
                <div class="user-panel mt-3 pb-3 mb-3 d-flex " v-if="isLoggedIn">
                    <div class="image">
                        <img src="/dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
                    </div>
                    <div class="info">
                        <span class="text-white" id="user">{{this.$store.state.user}}</span>
                        <a class="d-block" @click="logout">Logout</a>
                    </div>
                </div>
                <!-- Sidebar Menu -->
                <nav>
                    <ul v-if="isLoggedIn"
                        class="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false">
                        <!-- Add icons to the links using the .nav-icon class
                             with font-awesome or any other icon font library -->
                        <li class="nav-item active">
                            <router-link :to="{ name: 'home'}" class="nav-link">Home</router-link>
                        </li>

                        <li class="nav-item has-treeview">
                            <a href="#" class="nav-link">
                                <i class="nav-icon fas fa-user-circle"></i>
                                <p>
                                    Tài Khoản
                                    <i class="right fas fa-angle-left"></i>
                                </p>
                            </a>
                            <ul class="nav nav-treeview">
                                <li class="nav-item">
                                    <router-link :to="{ name: 'admin'}" class="nav-link"> Admin
                                    </router-link>
                                </li>
                            </ul>
                            <ul class="nav nav-treeview">
                                <li class="nav-item">
                                    <router-link :to="{ name: 'customer'}" class="nav-link"> Khách hàng
                                    </router-link>
                                </li>
                            </ul>
                        </li>

                        <li class="nav-item has-treeview">
                            <a href="#" class="nav-link">
                                <i class="nav-icon fas fa-shopping-cart"></i>
                                <p>
                                    Đơn hàng
                                    <i class="right fas fa-angle-left"></i>
                                </p>
                            </a>
                            <ul class="nav nav-treeview">
                                <li class="nav-item">
                                    <router-link :to="{ name: 'order'}" class="nav-link"> Đơn hàng
                                    </router-link>
                                </li>
                            </ul>
                        </li>

                        <li class="nav-item has-treeview">
                            <a href="#" class="nav-link">
                                <i class="nav-icon fas fa-bus"></i>
                                <p>
                                    Đồ chơi
                                    <i class="right fas fa-angle-left"></i>
                                </p>
                            </a>
                            <ul class="nav nav-treeview">
                                <li class="nav-item">
                                    <router-link :to="{ name: 'product'}" class="nav-link"> Danh sách đồ chơi
                                    </router-link>
                                </li>
                            </ul>
                            <ul class="nav nav-treeview">
                                <li class="nav-item">
                                    <router-link :to="{ name: 'product-create'}" class="nav-link">Thêm đồ chơi
                                    </router-link>
                                </li>
                            </ul>
                            <ul class="nav nav-treeview">
                                <li class="nav-item">
                                    <router-link :to="{ name: 'brand'}" class="nav-link">Hãng
                                    </router-link>
                                </li>
                            </ul>
                            <ul class="nav nav-treeview">
                                <li class="nav-item">
                                    <router-link :to="{ name: 'feedback'}" class="nav-link">Bình luận
                                    </router-link>
                                </li>
                            </ul>
                        </li>

                        <li class="nav-item has-treeview">
                            <a href="#" class="nav-link">
                                <i class="nav-icon far fa-plus-square"></i>
                                <p>
                                    Thông tin khác
                                    <i class="right fas fa-angle-left"></i>
                                </p>
                            </a>
                            <ul class="nav nav-treeview">
                                <li class="nav-item">
                                    <router-link :to="{ name: 'payment'}" class="nav-link"> Phương thức thanh toán
                                    </router-link>
                                </li>
                            </ul>
                            <ul class="nav nav-treeview">
                                <li class="nav-item">
                                    <router-link :to="{ name: 'category'}" class="nav-link">Danh mục
                                    </router-link>
                                </li>
                            </ul>
                            <ul class="nav nav-treeview">
                                <li class="nav-item">
                                    <router-link :to="{ name: 'contact'}" class="nav-link">Góp ý
                                    </router-link>
                                </li>
                            </ul>
                            <ul class="nav nav-treeview">
                                <li class="nav-item">
                                    <router-link :to="{ name: 'area'}" class="nav-link">Tỉnh, thành phố
                                    </router-link>
                                </li>
                            </ul>
                            <ul class="nav nav-treeview">
                                <li class="nav-item">
                                    <router-link :to="{ name: 'age'}" class="nav-link">Nhóm tuổi
                                    </router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                <!-- /.sidebar-menu -->
            </div>
            <!-- /.sidebar -->
        </aside>

        <!-- Content Wrapper. Contains page content -->

        <div class="content-wrapper" id="app">
            <transition class="content-header" name="app">
                <router-view></router-view>
            </transition>
            <vue-snotify></vue-snotify>
        </div>


        <!-- /.content-wrapper -->
        <footer class="main-footer">
            <strong>Copyright &copy; 2014-2019 <a href="http://adminlte.io">AdminLTE.io</a>.</strong>
            All rights reserved.
            <div class="float-right d-none d-sm-inline-block">
                <b>Version</b> 3.0.5
            </div>
        </footer>

    </div>
    <!-- ./wrapper -->

</template>

<script>
    import {mapState} from 'vuex';
    import {loadProgressBar} from 'axios-progress-bar';
    import "@/assets/plugins/nprogress/index.css";

    export default {
        name: 'App',
        computed: {
            ...mapState(['user']),
            isLoggedIn: function () {
                return this.$store.getters.isLoggedIn
            }
        },
        methods: {
            logout: function () {
                this.$store.dispatch('logout')
                    .then(() => {
                        this.$router.push('/login')
                    })
            },
        },
        created: function () {
            const vm = this;
            vm.$http.interceptors.response.use(undefined, function (err) {
                return new Promise(function (resolve, reject) {
                    if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
                        vm.$store.dispatch('logout')
                    }
                    vm.user = vm.$store.state.user;
                    throw err;
                });
            });
        },
        mounted() {
            loadProgressBar();
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin-top: 15px;
        min-height: 90vh;
    }

    .main-sidebar {
        position: fixed !important;
    }

    select > option {
        margin: 5px;
    }

    .nav-link > i {
        width: 40px !important;
    }

</style>
