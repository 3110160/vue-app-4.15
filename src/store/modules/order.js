import http from './../../http'
import Vue from 'vue'

//type值 获取订单列表
const GETORDERLIST = 'GETORDERLIST'

const orderList = {
    state:{
        list:[]
    },
    mutations:{
        setList(state,list){
            state.list = list;
        }
    },
    actions:{
        [GETORDERLIST]({commit,state},{pageNum,pageSize}){
            let result = [1,2,3,4]
            commit('setList',[...state.list,...result])
            /* http.post('/add',{
                pageNum,
                pageSize
            }).then(data=>{
                commit('setList',[...state.list,...data.result])
            }).catch(e=>{
                Vue.$vux.toast.text(e);
            }) */
        }
    }
}

export default orderList;