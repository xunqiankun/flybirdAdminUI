import Vue from 'vue';
import iView from 'iview';
import axios from './libs/http'
import store from './store/store'
import VueRouter from 'vue-router';
import Routers from './router';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import api from './constant/api'

Vue.use(VueRouter);
Vue.use(iView);

// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.axios = axios;
Vue.prototype.api = api;

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
	if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
		console.log('store.state.authtoken'+store.state.authtoken);
        if (store.state.authtoken) {  // 通过vuex state获取当前的token是否存在
          iView.LoadingBar.start();
          Util.title(to.meta.title);
          next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        iView.LoadingBar.start();
        Util.title(to.meta.title);
        next();
    }
    
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

export default new Vue({
    el: '#app',
	axios,
    router: router,
	store,
    render: h => h(App)
});

 