import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Home from '@/components/home'
import AddOrder from '@/components/addOrder'
import OrderList from '@/components/orderList'
import AddOrderOuter from '@/components/addOrderOuter'
import ServiceList from '@/components/serviceList'
import Me from '@/components/me'
import CheckRoom from '@/components/checkRoom'
import PasswardChange from '@/components/passwardChange'
import ServiceEnd from '@/components/serviceEnd'
import ServiceEvaluation from '@/components/serviceEvaluation'
import OrderDetail from '@/components/orderDetail'
import Blank from '@/components/blank'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登陆'
      }
    }, {
      path: '/blank',
      name: 'blank',
      component: Blank
    },{
      path: '/addOrderOuter',
      name: 'addOrderOuter',
      component: AddOrderOuter,
      meta: {
        title: '填写报修单'
      }
    }, {
      path: '/orderDetail',
      name: 'orderDetail',
      component: OrderDetail,
      meta: {
        title: '维修详情',
        keepAlive: true
      }
    }, {
      path: '/serviceEnd',
      name: 'serviceEnd',
      component: ServiceEnd,
      meta: {
        title: '上传结果',
        keepAlive: true
      }
    }, {
      path: '/serviceEvaluation',
      name: 'serviceEvaluation',
      component: ServiceEvaluation,
      meta: {
        title: '用户评价',
        keepAlive: true
      }
    }, {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        title: '首页',
        keepAlive: true
      }
    },{
      path: '/addOrder',
      name: 'addOrder',
      component: AddOrder,
      meta: {
        title: '填写报修单'
      }
    },{
      path: '/orderList',
      name: 'orderList',
      component: OrderList,
      meta: {
        title: '报修单列表',
        keepAlive: true
      }
    },{
      path: '/serviceList',
      name: 'serviceList',
      component: ServiceList,
      meta: {
        title: '维修单列表',
        keepAlive: true
      }
    },{
      path: '/me',
      name: 'me',
      component: Me,
      meta: {
        title: '个人中心',
        keepAlive: true
      }
    },{
      path: '/passwardChange',
      name: 'passwardChange',
      component: PasswardChange,
      meta: {
        title: '修改密码'
      }
    },{
      path: '/checkRoom',
      name: 'checkRoom',
      component: CheckRoom,
      meta: {
        title: '巡检'
      }
    },{
      path: '/',
      redirect: '/blank'
    }
  ]
})

//过滤登陆态
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router;
