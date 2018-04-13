<template>
  <view-box class="serviceEnd">
    <group title="上传图片">
        <uploader 
        :max="3"
        @upload="upload"></uploader>
    </group>
  </view-box>
</template>

<script>
import {
  Checklist,
  ViewBox,
  XTextarea,
  Group,
  XButton,
  Checker,
  CheckerItem
} from "vux";
import Uploader from "@/common/uploadImg.vue";
export default {
  name: "serviceEnd",
  components: {
    Uploader,
    ViewBox,
    Group
  },
  data() {
    return {
      httpUrls: []
    };
  },
  methods: {
    upload(urls){
      this.httpUrls = urls;
    }
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>
