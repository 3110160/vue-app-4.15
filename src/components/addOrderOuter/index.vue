<template>
  <div class="addOrder">
    <group title="维修地点(必填)">
      <x-input
      placeholder="请输入商位号" 
      v-model="declareAddress"
      :show-clear="false" 
      placeholder-align="left"></x-input>
    </group>

    <group title="维修项目(必选)">
    <checker
      class="checkbox"
      type="checkbox"
      v-model="projectIds"
      default-item-class="checkItem"
      selected-item-class="checkItemSelected"
    >
    <checker-item 
      v-for="(item,index) in commonList" 
      :key="index" :value="item.id">{{item.name}}</checker-item>
    </checker>
    </group>
    <group title="上传照片(选填)">
        <uploader 
        :max="1"
        title="故障照片"
        @upload="upload"></uploader>
    </group>
    <group title="其他(选填)">
      <x-textarea 
      :max="120"
      v-model="declareContent"
      placeholder="其他维修原因"></x-textarea>
    </group>
    <group title="联系人(必填)">
      <x-input 
      placeholder="请输入联系人" 
      novalidate
      v-model="declarant"
      :show-clear="false" 
      placeholder-align="left"></x-input>
    </group>
    <group title="联系方式(必填)">
      <x-input 
      placeholder="请输入联系方式" 
      novalidate
      v-model="contact"
      :show-clear="false" 
      placeholder-align="left"></x-input>
    </group>
    <x-button 
    class="btn"
    @click.native="submit" 
    type="primary">提交</x-button>
  </div>
</template>

<script>
import Uploader from "@/common/uploadImg.vue";
import {
  XInput,
  Group,
  XButton,
  XTextarea,
  Checklist,
  Checker,
  CheckerItem
} from "vux";
import { setTimeout, clearTimeout } from 'timers';
export default {
  name: "AddOrder",
  components: {
    XInput,
    Group,
    XButton,
    XTextarea,
    Checklist,
    Checker,
    CheckerItem,
    Uploader
  },
  data() {
    return {
      projectIds: [],
      commonList: [],
      httpUrls: [],
      declareAddress: "",
      contact: "",
      declarant: "",
      declareContent: ""
    };
  },
  methods: {
    change(value) {
      this.projectIds = value;
    },
    upload(urls) {
      this.httpUrls = urls;
    },
    //todo 获取维修项目
    getTypes() {
      this.$http
        .post("/mall/v1/wechat/combo/maintenanceProjects", {
          buildingCode: this.$route.query.code || ''
        })
        .then(data => {
          this.commonList = data.result;
        })
        .catch(e => {
          this.$vux.toast.text(e);
        });
    },

    submit() {
      if (this.declareAddress == "") {
        this.$vux.toast.text("请填写商铺地址");
        return;
      }
      if (!this.projectIds.length) {
        this.$vux.toast.text("请填选择维修项目");
        return;
      }
      if (this.declarant == "") {
        this.$vux.toast.text("请填写联系人");
        return;
      }
      if (this.contact == "") {
        this.$vux.toast.text("请填写联系方式");
        return;
      }
      this.$http
        .post("/mall/v1/declaration/external", {
          declareAddress: this.declareAddress,
          buildingCode: this.$route.query.code,
          declareContent: this.declareContent,
          declarant: this.declarant,
          contact: this.contact,
          picture: this.httpUrls.join(''),
          projectIds: this.projectIds.join(',')
        })
        .then(data => {
          this.$vux.toast.text("提交成功");
          let timer = setTimeout(()=>{
              location.reload();
              clearTimeout(timer)
          },1000)    
          
        })
        .catch(e => {
          e&&this.$vux.toast.text(e);
        });
    }
  },
  created() {
    this.getTypes();
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>
