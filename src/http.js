import axios from 'axios'
import Vue from 'vue'
import router from './router'
//axios 配置
const http = axios.create({
    baseURL: 'http://10.0.0.181:9400',
    //baseURL: 'http://10.0.0.241:9600',
    //baseURL: 'http://repairbkd.onccc.com',
    //baseURL: 'http://testbkd.ranqichina.com',
    timeout: 10000,
    withCredentials: true,
    headers: { 'content-type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' }
});
// 添加响应拦截器
http.interceptors.response.use(res => {
    //console.log('res',res)
    Vue.$vux.loading.hide();
    if (res.data.code === '0') {
        return Promise.resolve(res.data)
    } else {
        return Promise.reject(res.data.description || "出错了～")
    }
}, e => {
    //console.log('e',e.response)
    Vue.$vux.loading.hide();
    if (e.response.status === 800) {
        router.push({ path: '/login', replace: true })
            //return Promise.reject('请重新登录')
    } else if (e.response.status === 401) {
        return Promise.reject("暂无权限")
    }
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