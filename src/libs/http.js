/**
 * Created by superman on 17/2/16.
 * http配置
 */

import axios from 'axios'
import store from '../store/store'
import * as types from '../store/types'
import main from '../main'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://localhost:8081';
//axios.defaults.headers.X-Requested-With = 'XMLHttpRequest';
axios.defaults.headers.responseType = 'json';

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.authtoken) {
            config.headers.Authorization = `${store.state.authtoken}`;//自动添加token
			config.headers.contentType = 'application/json; charset=utf-8';
			config.headers.dataType = 'json';
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    main.$router.push({
                        path: '/login',
						params: {loginerrinfo:'认证失败，请重新登录'},
						meta:{title :'eeeee'}
                    })
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response.data)
    });

export default axios;