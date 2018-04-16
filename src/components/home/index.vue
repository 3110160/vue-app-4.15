<template>
  <section class="layout">
    <!--内容-->
    <section class="scrollView" ref="scrollView">
      <!--子路由-->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </section>
    <!--底部导航-->
    <tabbar>
      <tabbar-item :link="{path:'/home/addOrder',replace:true}">
        <span slot="label">填写报修单</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/home/orderList',replace:true}">
        <span slot="label">报修单列表</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/home/me',replace:true}">
        <span slot="label">修改密码</span>
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
