<template>
  <div class="orderDetail">
    <div class="home" @click="$router.push({path:'/home',replace:true})">首页</div>
    <div class="detailebox">
      <div>
      <div class="header">
        <div class="left">
          <i></i>
          <span>报修单号：</span>{{detail.code}}
        </div>
    </div>
      </div>
    <div class="roomNum"><span>报修房号：</span>{{detail.declareAddress}}</div>
    <div class="content">
      <span class="left">报修内容：</span>
      <span class="right">{{detail.projectNames||''}} {{detail.declareContent||''}}</span>
    </div>
    <div class="roomNum"><span>异常原因：</span>{{detail.repairStatus===1?'缺少材料':detail.repairStatus===2?'不是我的':''}}</div>
    </div>
    <group title="完成节点及时间">
      <flow>
        <flow-state  title="用户上报" :is-done="getStatus(detail.status,[0,1,2,3,4,98,99])"></flow-state>
        <flow-line :is-done="getStatus(detail.status,[2,3,4,98,99])"></flow-line>
        <flow-state  title="已受理" :is-done="getStatus(detail.status,[2,3,4,98,99])"></flow-state>
        <flow-line :is-done="getStatus(detail.status,[4,98,99])"></flow-line>
        <flow-state  title="已完成" :is-done="getStatus(detail.status,[4,98,99])"></flow-state>
        <flow-line :is-done="getStatus(detail.status,[98,99])"></flow-line>
        <flow-state  title="已回访" :is-done="getStatus(detail.status,[98,99])"></flow-state>
      </flow>
    </group>
    <group class="verTime">
      <flow orientation="vertical" :style='`height:${height};width:96px`'>
        <template v-for="(item,index) in detail.details">
          <flow-line v-if="index>0" is-done :key="index"></flow-line>
          <div class="box" :key="index+'~'">
            <span class="time">{{item.time}}
              <br>{{item.day}}
            </span>
            <span class="content">{{item.message}}</span>
          </div>
        </template> 
      </flow>
    </group>
  </div>
</template>

<script>
import { ViewBox, Group, Cell, Flow, FlowState, FlowLine } from "vux";
export default {
  name: "orderDetail",
  components: {
    ViewBox,
    Group,
    Cell,
    Flow,
    FlowState,
    FlowLine
  },
  data(){
    return{
      detail:{
        details:[]
      }
    }
  },
  activated() {
    let id = this.$route.query.id;
    this.$http
      .get(`/mall/v1/maintenance/abnormal/${id}`)
      .then(data => {
        this.detail = data.result;
        this.detail.details.reverse();
      })
      .catch(e => {
        this.$vux.toast.text(e);
      });
  },
  //计算属性默认只有 getter 
  computed:{
    height(){
        return this.detail.details.length*90+'px'
    }
  },
  methods:{
    //状态判断
      getStatus(state,range=[]){
        let p = range.find(item=>{
          return item === state;
        })
        return p+2?true:false;
      }
    },
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>
