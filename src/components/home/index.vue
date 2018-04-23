<template>
  <view-box ref="viewBox">
    <group>
      <cell title="填写报修单" :link="{path:'/addOrder'}" is-link></cell>
      <cell title="报修单列表" :link="{path:'/orderList'}" is-link></cell>
      <cell title="维修单列表" :link="{path:'/serviceList'}" is-link></cell>
      <cell title="个人中心" :link="{path:'/me'}" is-link></cell>      
    </group>
  </view-box>
</template>

<script>
import { ViewBox,Group,Cell } from "vux";
export default {
  name: "home",
  components: {
    ViewBox,
    Group,
    Cell
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>
