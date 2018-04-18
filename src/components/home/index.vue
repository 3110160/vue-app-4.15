<template>
  <section class="layout">
    <!--内容-->
    <section class="scrollView" ref="scrollView">
      <!--子路由-->
      <keep-alive v-if="$route.meta.keepAlive">
          <router-view/>
      </keep-alive>
      <router-view v-else/>
    
    </section>
    <!--底部导航-->
    <tabbar>
      <tabbar-item :selected='$route.path==="/home/addOrder"' :link="{path:'/home/addOrder',replace:true}">
        <span slot="label">填写报修单</span>
      </tabbar-item>
      <tabbar-item :selected='$route.path==="/home/orderList"' :link="{path:'/home/orderList',replace:true}">
        <span slot="label">报修单列表</span>
      </tabbar-item>
      <tabbar-item :selected='$route.path==="/home/serviceList"' :link="{path:'/home/serviceList',replace:true}">
        <span slot="label">维修单列表</span>
      </tabbar-item>
      <tabbar-item :selected='$route.path==="/home/me"' :link="{path:'/home/me',replace:true}">
        <span slot="label">设置</span>
      </tabbar-item>
    </tabbar>
  </section>
</template>

<script>
import { Tabbar, TabbarItem } from "vux";
export default {
  name: "home",
  components: {
    Tabbar,
    TabbarItem
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>
