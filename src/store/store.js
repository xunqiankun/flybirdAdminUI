/**
 * Created by superman on 17/2/16.
 */
import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: {},
        authtoken: localStorage.authtoken, //用户权限令牌
        title: '',
        loginstatus: ''//登录状态
    },
    mutations: {
        [types.LOGIN]: (state, data) => {
            localStorage.authtoken = data;
            state.authtoken = data;
            state.loginstatus = '登录成功';
        },
        [types.LOGOUT]: (state) => {
            localStorage.removeItem('authtoken');
            state.authtoken = null
            state.loginstatus = '登出成功';
        },
        LOGERR : (state) => {
            localStorage.removeItem('authtoken');
            state.authtoken = null
            state.loginstatus = '登录错误';
        },
        [types.TITLE]: (state, data) => {
            state.title = data;
        }
    }
})