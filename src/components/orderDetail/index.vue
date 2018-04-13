<template>
  <view-box class="orderDetail">
    <group>
      <cell title="编号" :value="1"></cell>
      <cell title="维修地址" :value="2"></cell>
      <cell title="维修内容" :value="3"></cell>
    </group>
    <group title="完成节点及时间">
      <flow>
        <flow-state state="1" title="用户上报" is-done></flow-state>
        <flow-line is-done></flow-line>
        <flow-state state="2" title="已受理" is-done></flow-state>
        <flow-line is-done></flow-line>
        <flow-state state="3" title="已签发" is-done></flow-state>
        <flow-line is-done></flow-line>
        <flow-state state="4" title="已完成" is-done></flow-state>
        <flow-line is-done></flow-line>
        <flow-state state="5" title="已回访" is-done></flow-state>
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
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>
