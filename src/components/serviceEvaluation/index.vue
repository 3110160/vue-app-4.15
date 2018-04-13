<template>
  <view-box class="serviceEvaluation">

  <group title="维修人员态度:">
    <checker
      class="checkbox"
      v-model="value1"
      default-item-class="checkItem"
      selected-item-class="checkItemSelected"
    >
    <checker-item 
      v-for="(item,index) in List1" 
      :key="index" :value="item.key">{{item.value}}</checker-item>
    </checker>
  </group>

  <group title="维修及时情况:">
    <checker
      class="checkbox"
      v-model="value2"
      default-item-class="checkItem"
      selected-item-class="checkItemSelected"
    >
    <checker-item 
      v-for="(item,index) in List2" 
      :key="index" :value="item.key">{{item.value}}</checker-item>
    </checker>
  </group>

  <group title="维修质量:">
    <checker
      class="checkbox"
      v-model="value3"
      default-item-class="checkItem"
      selected-item-class="checkItemSelected"
    >
    <checker-item 
      v-for="(item,index) in List3" 
      :key="index" :value="item.key">{{item.value}}</checker-item>
    </checker>
  </group>

  <group title="满意度:">
    <checker
      class="checkbox"
      v-model="value4"
      default-item-class="checkItem"
      selected-item-class="checkItemSelected"
    >
    <checker-item 
      v-for="(item,index) in List4" 
      :key="index" :value="item.key">{{item.value}}</checker-item>
    </checker>
  </group>

  <group title="其他:">
    <x-textarea 
    :max="120" 
    placeholder="其他维修原因"></x-textarea>
  </group>
    <x-button 
    class="btn"
    @click.native="submit" 
    type="primary">提交</x-button>
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
export default {
  name: "serviceEvaluation",
  components: {
    Checklist,
    ViewBox,
    XTextarea,
    Group,
    XButton,
    Checker,
    CheckerItem
  },
  data() {
    return {
      List1: [
        {
          key: "1",
          value: "好"
        },
        {
          key: "2",
          value: "一般"
        },
        {
          key: "3",
          value: "差"
        }
      ],
      List2: [
        {
          key: "1",
          value: "迅速"
        },
        {
          key: "2",
          value: "一般"
        },
        {
          key: "3",
          value: "慢"
        }
      ],
      List3: [
        {
          key: "1",
          value: "好"
        },
        {
          key: "2",
          value: "一般"
        },
        {
          key: "3",
          value: "慢"
        }
      ],
      List4: [
        {
          key: "1",
          value: "满意"
        },
        {
          key: "2",
          value: "较满意"
        },
        {
          key: "3",
          value: "一般"
        },
        {
          key: "4",
          value: "不满意"
        }
      ],
      value1: [],
      value2: [],
      value3: [],
      value4: []
    };
  },
  methods: {
    change(val, label) {
      console.log("change", val);
    },
    submit() {}
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>
