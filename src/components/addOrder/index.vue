<template>
  <div class="addOrder">
    <group title="维修地点(必填)">
      <div class="left">
        <popup-picker 
          title="请选择前缀"
          v-model="prefixId"
          show-name 
          :data="prefixList" 
          placeholder="请选择前缀"></popup-picker>
      </div>
      <div>
        <x-input
          title="请输入商位号"
          placeholder="请输入商位号" 
          v-model="declareAddress"
          :show-clear="false"
          text-align='right'
          placeholder-align="right"></x-input>
      </div>
    </group>

    <group title="维修项目(必填)">
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
      <x-textarea 
        :max="120"
        v-model="declareContent"
        placeholder="上方无可选项、需要补充说明的，均在此填写"></x-textarea>
    </group>
    <group title="上传照片(选填)">
        <uploader
        style="margin-left:8px" 
        :max="1"
        title="故障照片"
        @upload="upload"></uploader>
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
  CheckerItem,
  PopupPicker
} from "vux";
export default {
  name: "AddOrder",
  components: {
    XInput,
    Group,
    XButton,
    XTextarea,
    Checklist,
    PopupPicker,
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
      declareContent: "",
      prefixList: [[{
        name: '无',
        value: ''
      }]],
      prefixId: []
    };
  },
  methods: {
    //选择项目id
    change(value) {
      this.projectIds = value;
    },
    upload(urls) {
      this.httpUrls = urls;
    },
    //todo 获取维修项目
    getTypes() {
      this.$http
        .post("/mall/v1/combo/maintenanceProjects", {
          buildingCode: "rrrrr"
        })
        .then(data => {
          this.commonList = data.result;
        })
        .catch(e => {
          e&&this.$vux.toast.text(e);
        });
    },
    //获取 前缀
    getPrefix(){
      this.$http
        .post("/mall/v1/combo/prefixManagers",{
          buildingCode:''
        })
        .then(data => {
          data.result.map(item=>{
            item.name = item.prefixName;
            item.value = `${item.id}`;
          })
          this.$set(this.prefixList,0,this.prefixList[0].concat(data.result))
          //this.prefixList[0] = data.result;
        })
        .catch(e => {
          e&&this.$vux.toast.text(e);
        });
    },
    submit() {
      if (this.declareAddress == "") {
        this.$vux.toast.text("请填写商铺地址");
        return;
      }
      if (!this.projectIds.length && this.declareContent === "") {
        this.$vux.toast.text("请选择或填写维修内容");
        return;
      }
      this.$http
        .post("/mall/v1/declaration/internal", {
          declareAddress: this.declareAddress,
          declareContent: this.declareContent,
          picture: this.httpUrls.join(""),
          projectIds: this.projectIds.join(","),
          prefixId:this.prefixId[0] || ''
        })
        .then(data => {
          this.$vux.toast.text("提交成功");
          this.$router.push({ path: "/orderList", repalce: true });
        })
        .catch(e => {
          e&&this.$vux.toast.text(e);
        });
    }
  },
  created() {
    this.getTypes();
    this.getPrefix();
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>
