<template>
  <div class="login">
    <group class="inputs">
      <x-input 
      placeholder="请输入员工号" 
      :show-clear="false" 
      v-model="username"
      placeholder-align="left"></x-input>
    <x-input 
      placeholder="请输入密码" 
      type="password"
      :show-clear="false" 
      v-model="password"
      placeholder-align="left"></x-input>
    </group>
    <x-button 
    class="btn"
    @click.native="submit" 
    type="primary">登录</x-button>
  </div>
</template>

<script>
import { XInput, Group, XButton } from "vux";
import axios from "axios";
import { setTimeout } from "timers";
export default {
  name: "login",
  components: {
    XInput,
    Group,
    XButton
  },
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    submit() {
      if (this.username == "" || this.password == "") {
        this.$vux.toast.text("用户名和密码不能为空");
        return;
      }
      this.$http
        .post("/mall/v1/login", {
          jobNum: this.username,
          password: this.password,
          openId:this.$store.state.common.openid
        })
        .then(data => {
          this.$router.push({ path: "/home", replace: true });
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
