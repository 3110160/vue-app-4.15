<template>
  <view-box class="serviceEnd">
    <group title="上传照片(选填 最多添加4张)">
        <uploader 
        :max="4"
        @upload="upload"></uploader>
    </group>
    <group title="其他描述(选填)">
      <x-textarea 
      :max="120"
      v-model="description"
      placeholder="其他描述"></x-textarea>
    </group>
    <div class="materials" v-for="(item,index) in materials" :key="index">
      <span v-if="index!==0" class="delete" @click="todelete(index)">删除</span>
      <group :title='`维修材料${index+1}`'>
      <x-input 
      title="名称:"
      placeholder="选填" 
      :show-clear="false" 
      v-model="item.name"
      placeholder-align="right"></x-input>
      <x-input 
      title="单价:"
      placeholder="选填" 
      :show-clear="false"
      keyboard="number" 
      v-model="item.price"
      placeholder-align="right"></x-input>
      <x-input 
      title="数量:"
      placeholder="选填" 
      :show-clear="false"
      keyboard="number" 
      v-model="item.quantity"
      placeholder-align="right"></x-input>
      <x-input 
      title="总价:"
      placeholder="选填" 
      :show-clear="false"
      keyboard="number" 
      v-model="item.total"
      placeholder-align="right"></x-input>
    </group>
    </div>
    <group>
      <div class="add" @click="add">+ 添加材料信息</div>
    </group>
    <x-button 
    class="btn"
    @click.native="submit"
    type="primary">提交</x-button>
  </view-box>
</template>

<script>
import {
  ViewBox,
  XTextarea,
  Group,
  XButton,
  XInput
} from "vux";
import Uploader from "@/common/uploadImg.vue";
export default {
  name: "serviceEnd",
  components: {
    Uploader,
    ViewBox,
    XTextarea,
    Group,
    XButton,
    XInput
  },
  data() {
    return {
      httpUrls: [],
      isOk:true,
      description:'',
      materials: [
        {
          name: "",
          price: "",
          quantity: "",
          total: ""
        }
      ]
    };
  },
  methods: {
    upload(urls) {
      this.httpUrls = urls;
    },
    add() {
      this.materials.push({
        name: "",
        price: "",
        quantity: "",
        total: ""
      });
    },
    todelete(index){
      this.materials.splice(index,1)
    },
    submit(){
      this.$http.post('/mall/v1/maintenance/repairFinish',{
            image:this.httpUrls,
            id:this.$route.query.id,
            description:this.description,
            materials:this.materials
      }).then(data=>{
          this.$store.commit('repairEnd',this.$route.query.id)
          this.$vux.toast.text('上传成功');
          this.$router.go(-1)
      }).catch(e => {
          this.$vux.toast.text(e);
        });
    }
  },
  //由于缓存页面 重置data
  beforeRouteEnter(t0, from, next) {
    next(vm => {
      vm.httpUrls=[],
      //vm.isOk=true,
      vm.description='',
      vm.materials= [
        {
          name: "",
          price: "",
          quantity: "",
          total: ""
        }
      ]
    });
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>
