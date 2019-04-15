import Vue from 'vue';
import $ from 'webpack-zepto';
import VueRouter from 'vue-router';
import filters from './filters';
import routes from './routers';
import Alert from './libs/alert';
import { get, post, apiPaths } from './libs/api';
import store from './vuex/user';
import FastClick from 'fastclick';
import axios from 'axios';

Vue.use(VueRouter);
Vue.use(Alert);

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.timeout = 10000;

Vue.prototype.$apiPaths = apiPaths;
Vue.prototype.$get = get;
Vue.prototype.$post = post;

$.ajaxSettings.crossDomain = true;

// 实例化Vue的filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

// 实例化VueRouter
const router = new VueRouter({
    mode: 'history',
    routes
});
FastClick.attach(document.body);

// 处理刷新的时候vuex被清空但是用户已经登录的情况
if (window.sessionStorage.user) {
    store.dispatch('setUserInfo', JSON.parse(window.sessionStorage.user));
}

// 登录中间验证，页面需要登录而没有登录的情况直接跳转登录
router.beforeEach((to, from, next) => {
    // 处理左侧滚动不影响右边
    // $('html, body, #page').removeClass('scroll-hide');
    $('body').css('overflow', 'auto');
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.state.userInfo.userId) {
            next();
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });
        }
    } else {
        next();
    }
});

new Vue({
    router,
    store
}).$mount('#app');
