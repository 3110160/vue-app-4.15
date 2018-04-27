import Vue from 'vue'
import Vuex from 'vuex'
import order from './modules/order'
import common from './modules/common'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        order,
        common
    }
  })
  
  export default store;