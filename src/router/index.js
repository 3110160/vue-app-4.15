import Vue from 'vue'
import Router from 'vue-router'

const Login = () =>
    import ('@/components/login')
const Home = () =>
    import ('@/components/home')
const AddOrder = () =>
    import ('@/components/addOrder')
const OrderList = () =>
    import ('@/components/orderList')
const AbnormalList = () =>
    import ('@/components/abnormalList')
const AddOrderOuter = () =>
    import ('@/components/addOrderOuter')
const ServiceList = () =>
    import ('@/components/serviceList')
const Me = () =>
    import ('@/components/me')
const CheckRoom = () =>
    import ('@/components/checkRoom')
const PasswardChange = () =>
    import ('@/components/passwardChange')
const ServiceEnd = () =>
    import ('@/components/serviceEnd')
const ServiceEvaluation = () =>
    import ('@/components/serviceEvaluation')
const OrderDetail = () =>
    import ('@/components/orderDetail')
const AbnormalDetail = () =>
    import ('@/components/abnormalDetail')
const Blank = () =>
    import ('@/components/blank')

Vue.use(Router)

const router = new Router({
    mode: 'hash',
    routes: [{
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: '登录'
        }
    }, {
        path: '/blank',
        name: 'blank',
        component: Blank,
        meta: {
            keepAlive: true
        }
    }, {
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
        path: '/abnormalDetail',
        name: 'abnormalDetail',
        component: AbnormalDetail,
        meta: {
            title: '异常单详情',
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
    }, {
        path: '/addOrder',
        name: 'addOrder',
        component: AddOrder,
        meta: {
            title: '填写报修单'
        }
    }, {
        path: '/orderList',
        name: 'orderList',
        component: OrderList,
        meta: {
            title: '报修单列表',
            keepAlive: true
        }
    }, {
        path: '/abnormalList',
        name: 'abnormalList',
        component: AbnormalList,
        meta: {
            title: '异常单列表',
            keepAlive: true
        }
    }, {
        path: '/serviceList',
        name: 'serviceList',
        component: ServiceList,
        meta: {
            title: '维修单列表',
            keepAlive: true
        }
    }, {
        path: '/me',
        name: 'me',
        component: Me,
        meta: {
            title: '个人中心',
            keepAlive: true
        }
    }, {
        path: '/passwardChange',
        name: 'passwardChange',
        component: PasswardChange,
        meta: {
            title: '修改密码'
        }
    }, {
        path: '/checkRoom',
        name: 'checkRoom',
        component: CheckRoom,
        meta: {
            title: '巡检'
        }
    }, {
        path: '/',
        redirect: '/blank'
    }]
})

//过滤登录态
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})
export default router;