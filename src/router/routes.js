import HomeComponent from "../components/HomeComponent";

import ProductCreateComponent from "../components/product/CreateComponent";
import ProductEditComponent from "../components/product/EditComponent";
import ProductIndexComponent from "../components/product/IndexComponent";

import CustomerEditComponent from "../components/customer/EditComponent";
import CustomerIndexComponent from "../components/customer/IndexComponent";

import AdminEditComponent from "../components/admin/EditComponent";
import AdminCreateComponent from "../components/admin/CreateComponent";
import AdminIndexComponent from "../components/admin/IndexComponent";

import FeedbackIndexComponent from "../components/feedback/IndexComponent";

import OrderIndexComponent from "../components/order/IndexComponent";
import OrderShowComponent from "../components/order/ShowComponent";

import BrandCreateComponent from "../components/brand/CreateComponent";
import BrandEditComponent from "../components/brand/EditComponent";
import BrandIndexComponent from "../components/brand/IndexComponent";

import AgeCreateComponent from "../components/age/CreateComponent";
import AgeEditComponent from "../components/age/EditComponent";
import AgeIndexComponent from "../components/age/IndexComponent";

import AreaCreateComponent from "../components/area/CreateComponent";
import AreaEditComponent from "../components/area/EditComponent";
import AreaIndexComponent from "../components/area/IndexComponent";

import PaymentCreateComponent from "../components/payment/CreateComponent";
import PaymentEditComponent from "../components/payment/EditComponent";
import PaymentIndexComponent from "../components/payment/IndexComponent";

import CategoryCreateComponent from "../components/category/CreateComponent";
import CategoryEditComponent from "../components/category/EditComponent";
import CategoryIndexComponent from "../components/category/IndexComponent";

import ContactIndexComponent from "../components/contact/IndexComponent";

import LoginComponent from "../components/login/LoginComponent";

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
    {
        name: 'home',
        path: '/',
        component: HomeComponent,
        meta: {
            requiresAuth: true
        }
    },

    {
        name: 'product-create',
        path: '/admin/product/create',
        component: ProductCreateComponent,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'product-edit',
        path: '/admin/product/edit/:id',
        component: ProductEditComponent,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'product',
        path: '/admin/product',
        component: ProductIndexComponent,
        meta: {
            requiresAuth: true
        }
    },

    {
        name: 'customer-edit',
        path: '/admin/customer/edit/:id',
        component: CustomerEditComponent,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'customer',
        path: '/admin/customer',
        component: CustomerIndexComponent,
        meta: {
            requiresAuth: true
        }
    },

    {
        name: 'admin-create',
        path: '/admin/admin/create',
        component: AdminCreateComponent,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'admin-edit',
        path: '/admin/admin/edit/:id',
        component: AdminEditComponent,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'admin',
        path: '/admin/admin',
        component: AdminIndexComponent,
        meta: {
            requiresAuth: true
        }
    },

    {
        name: 'feedback',
        path: '/admin/feedback',
        component: FeedbackIndexComponent,
        meta: {
            requiresAuth: true
        }
    },

    {
        name: 'order',
        path: '/admin/order',
        component: OrderIndexComponent,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'order-show',
        path: '/admin/order/show/:id',
        component: OrderShowComponent,
        meta: {
            requiresAuth: true
        }
    },

    {
        name: 'brand-create',
        path: '/admin/brand/create',
        component: BrandCreateComponent,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'brand-edit',
        path: '/admin/brand/edit/:id',
        component: BrandEditComponent,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'brand',
        path: '/admin/brand',
        component: BrandIndexComponent,
        meta: {
            requiresAuth: true
        }
    },

    {
        name: 'age-create',
        path: '/admin/age/create',
        component: AgeCreateComponent,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'age-edit',
        path: '/admin/age/edit/:id',
        component: AgeEditComponent,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'age',
        path: '/admin/age',
        component: AgeIndexComponent,
        meta: {
            requiresAuth: true
        }
    },

    {
        name: 'area-create',
        path: '/admin/area/create',
        component: AreaCreateComponent,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'area-edit',
        path: '/admin/area/edit/:id',
        component: AreaEditComponent,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'area',
        path: '/admin/area',
        component: AreaIndexComponent,
        meta: {
            requiresAuth: true
        }
    },

    {
        name: 'payment-create',
        path: '/admin/payment/create',
        component: PaymentCreateComponent,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'payment-edit',
        path: '/admin/payment/edit/:id',
        component: PaymentEditComponent,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'payment',
        path: '/admin/payment',
        component: PaymentIndexComponent,
        meta: {
            requiresAuth: true
        }
    },

    {
        name: 'category-create',
        path: '/admin/category/create',
        component: CategoryCreateComponent,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'category-edit',
        path: '/admin/category/edit/:id',
        component: CategoryEditComponent,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'category',
        path: '/admin/category',
        component: CategoryIndexComponent,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'contact',
        path: '/admin/contact',
        component: ContactIndexComponent,
        meta: {
            requiresAuth: true
        }
    },

    {
        name: 'login',
        path: '/login',
        component: LoginComponent
    }
];

export default routes;

