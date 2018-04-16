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
        <flow-state state="1" title="用户上报" :is-done="getStatus(detail.status,[1,2,3,4,98,99])"></flow-state>
        <flow-line :is-done="getStatus(detail.status,[1,2,3,4,98,99])"></flow-line>
        <flow-state state="2" title="已受理" :is-done="getStatus(detail.status,[2,3,4,98,99])"></flow-state>
        <flow-line :is-done="getStatus(detail.status,[2,3,4,98,99])"></flow-line>
        <flow-state state="3" title="已签发" :is-done="getStatus(detail.status,[3,4,98,99])"></flow-state>
        <flow-line :is-done="getStatus(detail.status,[3,4,98,99])"></flow-line>
        <flow-state state="4" title="已完成" :is-done="getStatus(detail.status,[4,98,99])"></flow-state>
        <flow-line :is-done="getStatus(detail.status,[4,98,99])"></flow-line>
        <flow-state state="5" title="已回访" :is-done="getStatus(detail.status,[98,99])"></flow-state>
      </flow>
    </group>
    <group class="verTime">
      <flow orientation="vertical" style="height:400px;width:96px">
        <div class="box">
          <span>14:25
            <br>2018-03-26
          </span>
          <span class="content">电工【金航天】已维修完成</span>
        </div>
        <flow-line is-done></flow-line>
        <div class="box">
          <span>14:25
            <br>2018-03-26
          </span>
          <span class="content">电工【金航天】已维修完成</span>
        </div>
        <flow-line is-done ></flow-line>
        <div class="box">
          <span>14:25
            <br>2018-03-26
          </span>
          <span class="content">电工【金航天】已维修完成</span>
        </div>
        <flow-line is-done></flow-line>
        <div class="box">
          <span>14:25
            <br>2018-03-26
          </span>
          <span class="content">电工【金航天】已维修完成</span>
        </div>
        <flow-line is-done></flow-line>
        <div class="box">
          <span>14:25
            <br>2018-03-26
          </span>
          <span class="content">电工【金航天】已维修完成</span>
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
  activated() {
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
        return range.find(item=>{
          return item == state;
        })
      }
    },
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>
