import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: localStorage.getItem('user') || ''
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token, user) {
            state.status = 'success'
            state.token = token
            state.user = user
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
        },
    },
    actions: {
        auth({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({url: 'http://localhost:8000/admin/check-login', data: user, method: 'POST'})
                    .then(response => {
                        if ( response.data.code === 200 ) {
                            const token = response.data.data.access_token;
                            const user = response.data.data.user.account;
                            localStorage.setItem('token', token);
                            localStorage.setItem('user', user);
                            axios.defaults.headers.common['Authorization'] = token;
                            commit('auth_success', token, user);
                        }
                        resolve(response);
                    }).catch(error => {
                        commit('auth_error');
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        reject(error);
                    })
            })
        },
        logout({commit}) {
            return new Promise((resolve, reject) => {
                commit('logout')
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    },
    if(token = localStorage.getItem('user-token')) {
        axios.defaults.headers.common['Authorization'] = token
    }
})