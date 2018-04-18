<template>
  <view-box class="orderDetail">
    
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
      <span class="right">{{detail.projectNames+' '+detail.declareContent||''}}</span>
    </div>
    </div>
  
    <group title="完成节点及时间">
      <flow>
        <flow-state state="1" title="用户上报" :is-done="getStatus(detail.status,[0,1,2,3,4,98,99])"></flow-state>
        <flow-line :is-done="getStatus(detail.status,[2,3,4,98,99])"></flow-line>
        <flow-state state="2" title="已受理" :is-done="getStatus(detail.status,[2,3,4,98,99])"></flow-state>
        <flow-line :is-done="getStatus(detail.status,[4,98,99])"></flow-line>
        <flow-state state="4" title="已完成" :is-done="getStatus(detail.status,[4,98,99])"></flow-state>
        <flow-line :is-done="getStatus(detail.status,[98,99])"></flow-line>
        <flow-state state="5" title="已回访" :is-done="getStatus(detail.status,[98,99])"></flow-state>
      </flow>
    </group>
    <group class="verTime">
      <flow orientation="vertical" style="height:400px;width:96px">
        <div class="box" v-if="getStatus(detail.status,[98,99])">
          <span>{{detail.appraiseTime}}
            <br>{{detail.appraiseDay}}
          </span>
          <span class="content">{{detail.revisitName}} 已评价</span>
        </div>
        <flow-line is-done v-if="getStatus(detail.status,[98,99])"></flow-line>
        <div class="box" v-if="getStatus(detail.status,[4,98,99])">
          <span>{{detail.repairTime}}
            <br>{{detail.repairDay}}
          </span>
          <span class="content">{{detail.workGroupName+' '+detail.repairmanName}} 已维修完成</span>
        </div>
        <flow-line is-done v-if="getStatus(detail.status,[4,98,99])"></flow-line>
        <div class="box" v-if="getStatus(detail.status,[3,4,98,99])">
          <span>{{detail.repairStartTime}}
            <br>{{detail.repairStartDay}}
          </span>
          <span class="content">{{detail.workGroupName+' '+detail.repairmanName}} 已开始维修</span>
        </div>
        <flow-line is-done v-if="getStatus(detail.status,[3,4,98,99])"></flow-line>
        <div class="box" v-if="getStatus(detail.status,[2,3,4,98,99])">
          <span>{{detail.disposeTime}}
            <br>{{detail.disposeDay}}
          </span>
          <span class="content">{{detail.disposeName}} 已完成受理</span>
        </div>
        <flow-line is-done v-if="getStatus(detail.status,[2,3,4,98,99])"></flow-line>
        <div class="box">
          <span>{{detail.declareTime}}
            <br>{{detail.declareDay}}
          </span>
          <span class="content">{{detail.declarant}} 发起申报</span>
        </div>
      </flow>
    </group>
  </view-box>
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
      detail:{}
    }
  },
  created() {
    let id = this.$route.query.id;
    this.$http
      .get(`/mall/v1/declaration/${id}`)
      .then(data => {
        this.detail = data.result;
      })
      .catch(e => {
        this.$vux.toast.text(e);
      });
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
