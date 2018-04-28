<template>
  <div></div>
</template>

<script>
import qs from "querystring";
export default {
  created() {
    console.log('created')
    //获取openid 
    let openid = qs.parse(window.location.hash.split('?')[1]).openid
    this.$store.commit('setOpenid',openid)
    console.log('openid',openid)
    this.$http
      .get("/mall/common/login/verify")
      .then(data => {
        this.$router.push({path:'/home',replace:true})
      })
      .catch(e => {
        this.$vux.toast.text(e);
      });
  },
  beforeRouteEnter(t0, from, next) {
    console.log(from.path)
    if(from.path==='/home'||from.path==='/login'){
        window.WeixinJSBridge&&WeixinJSBridge.call('closeWindow') || window.history.go(-1);
    }
    next();
  }
};
</script>


