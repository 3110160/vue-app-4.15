import axios from 'axios'
import Vue from 'vue'
import router from './router'
//axios 配置
const http = axios.create({
    //baseURL: 'http://10.0.0.181:9400',
    baseURL: 'http://10.0.0.244:9500',
    //baseURL: 'http://10.0.0.60:9500',
    timeout: 6000,
    withCredentials: true,
    headers: { 'content-type': 'application/json' }
});
// 添加响应拦截器
http.interceptors.response.use(res => {
    Vue.$vux.loading.hide();
    if (res.data.code === '0') {
        return Promise.resolve(res.data)
    }else if(res.data.code === '800') {
        router.push({ path: '/login', replace: true })
        return Promise.reject('会话失效')
    } else {
        return Promise.reject(res.data.description)
    }
}, e => {
    Vue.$vux.loading.hide();
    return Promise.reject('网络异常')
});

// 添加请求拦截器
http.interceptors.request.use(config => {
    Vue.$vux.loading.show('请求中...');
    return config;
}, error => {
    Vue.$vux.loading.show('请求中...');
    return Promise.reject(error);
});


export default http;