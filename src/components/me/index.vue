<template>
  <div class="me">
    <group class="inputs">
      <x-input 
      placeholder="请输入原密码" 
      :show-clear="false" 
      v-model="oldPassword"
      placeholder-align="left"></x-input>
    <x-input 
      placeholder="请输入新密码" 
      type="password"
      :show-clear="false" 
      v-model="newPassword"
      placeholder-align="left"></x-input>
      <x-input 
      placeholder="请确认新密码" 
      type="password"
      :show-clear="false" 
      v-model="newPasswordAgain"
      placeholder-align="left"></x-input>
    </group>
    <x-button 
    class="btn"
    @click.native="submit" 
    type="primary">确定修改</x-button>
    <x-button 
    class="btn"
    @click.native="logout" 
    type="warn">退出登陆</x-button>
  </div>
</template>

<script>
import { XInput, Group, XButton } from "vux";
import axios from "axios";
export default {
  name: "me",
  components: {
    XInput,
    Group,
    XButton
  },
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      newPasswordAgain: ""
    };
  },
  methods: {
    submit() {
      if (
        this.oldPassword == "" ||
        this.newPassword == "" ||
        this.newPasswordAgain == ""
      ) {
        this.$vux.toast.text("输入框不能为空");
        return;
      }
      if (this.newPassword !== this.newPasswordAgain) {
        this.$vux.toast.text("两次密码不一致");
        return;
      }
      this.$http
        .put("/mall/v1/modify/password", {
          newPassword: this.newPassword,
          oldPassword: this.oldPassword
        })
        .then(data => {
          this.$vux.toast.text("修改成功");
          localStorage.removeItem('wuzhishanlogin')
          this.$router.push({ path: "/login", replace: true });
        })
        .catch(e => {
          this.$vux.toast.text(e);
        });
    },
    logout() {
      this.$http
        .get("/mall/v1/logout")
        .then(data => {
          this.$vux.toast.text("退出成功");
          window.location.reload(location.href+'?time='+((new Date()).getTime()));
          localStorage.removeItem('wuzhishanlogin')
          this.$router.push({ path: "/login", replace: true });
        })
        .catch(e => {
          this.$vux.toast.text(e);
        });
    }
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>
