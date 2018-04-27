<template>
  <view-box class="home" ref="viewBox">
    <div class="box">
      <router-link :to="item.path" class="item" v-for="(item,index) in menu" :key="index">
        <div class="bs">
          <img class="img" :src="item.src">
          <p>{{item.label}}</p>
        </div>
      </router-link>
    </div>
  </view-box>
</template>

<script>
import { ViewBox,Grid, GridItem,Group } from "vux";
export default {
  name: "home",
  components: {
    ViewBox,
    Grid,
    GridItem,
    Group
  },
  data(){
    return{
      menu:[{
        label:'填写报修单',
        path:'/addOrder',
        src:require('./img/bx.png')
      },{
        label:'报修单列表',
        path:'/orderList',
        src:require('./img/bx1.png')
      },{
        label:'维修单列表',
        path:'/serviceList',
        src:require('./img/wxd.png')
      },{
        label:'个人中心',
        path:'/me',
        src:require('./img/me.png')
      }/* ,{
        label:'巡检查房',
        path:'/checkRoom',
        src:require('./img/xjf.png')
      } */]
    }
  },
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>
