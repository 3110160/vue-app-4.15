import Vue from 'vue'
import VueScroller from 'vue-scroller'
import App from './App'
import store from './store'
import router from './router'
import Http from './http'
import './main.less'

//scroller组件
Vue.use(VueScroller)

Vue.config.productionTip = false;

//vux 全局组件注册
import  { ToastPlugin,LoadingPlugin } from 'vux'
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

//解决移动端 300ms延迟
const FastClick = require('fastclick')
FastClick.attach(document.body)

//rem
import './assets/js/rem'
window.document.addEventListener('touchstart', function (event) {
  /* 解决 active兼容处理 即 伪类 :active 失效  */
}, false);

//axios 配置
Vue.prototype.$http = Http;

router.push({path:'/home/addOrder',replace:true})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
