<template>
  <view-box ref="viewBox">
    <group>
      <cell title="修改密码" :link="{path:'/passwardChange'}" is-link></cell>     
    </group>
    <group>
      <cell title="退出登录" @click.native="showConfirm" is-link></cell>     
    </group>
  </view-box>
</template>

<script>
import { ViewBox, Group, Cell } from "vux";
import axios from "axios";
export default {
  name: "me",
  components: {
    ViewBox,
    Group,
    Cell
  },
  methods: {
    showConfirm() {
      let that = this;
      this.$vux.confirm.show({
        content:'退出登录吗？',
        onCancel() {
          that.$vux.confirm.hide();
        },
        onConfirm() {
          that.logout()
        }
      });
    },
    logout() {
      this.$http
        .get("/mall/v1/logout")
        .then(data => {
          this.$vux.toast.text("退出成功");
          this.$router.push({ path: "/login", replace: true });
          window.location.reload(
            location.href + "?time=" + new Date().getTime()
          );
        })
        .catch(e => {
          e&&this.$vux.toast.text(e);
        });
    }
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>
