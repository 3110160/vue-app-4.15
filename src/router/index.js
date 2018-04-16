import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Home from '@/components/home'
import AddOrder from '@/components/addOrder'
import OrderList from '@/components/orderList'
import ServiceList from '@/components/serviceList'
import Me from '@/components/me'
import ServiceEnd from '@/components/serviceEnd'
import ServiceEvaluation from '@/components/serviceEvaluation'
import OrderDetail from '@/components/orderDetail'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登陆'
      }
    }, {
      path: '/orderDetail',
      name: 'orderDetail',
      component: OrderDetail,
      meta: {
        title: '维修详情',
        keepAlive:true
      }
    },{
      path: '/serviceEnd',
      name: 'serviceEnd',
      component: ServiceEnd,
      meta: {
        title: '填写维修结果',
        keepAlive:true
      }
    },{
      path: '/serviceEvaluation',
      name: 'serviceEvaluation',
      component: ServiceEvaluation,
      meta: {
        title: '用户评价'
      }
    }, {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        title: '填写报修单'
      },
      children: [{
        path: 'addOrder',
        name: 'addOrder',
        component: AddOrder,
        meta: {
          title: '填写报修单'
        }
      }, {
        path: 'orderList',
        name: 'orderList',
        component: OrderList,
        meta: {
          title: '报修单列表',
          keepAlive:true
        }
      },{
        path: 'serviceList',
        name: 'serviceList',
        component: ServiceList,
        meta: {
          title: '维修单列表',
          keepAlive:true
        }
      }, {
        path: 'me',
        name: 'me',
        component: Me,
        meta: {
          title: '个人中心'
        }
      }]
    }
  ]
})

//过滤登陆态
router.beforeEach((to, from, next) => {
  let isLogin = false;
  try {
    isLogin = JSON.parse(localStorage.getItem('wuzhishanlogin'))
  } catch (e) {
    console.log(e)
  }
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.path !== '/login' & !isLogin) {
    next({ path: '/login', replace: true })
  } else {
    next()
  }

})
export default router;
