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

  <!-- <group title="维修质量:">
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
 -->
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
    v-model="suggest" 
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
          key: "好",
          value: "好"
        },
        {
          key: "一般",
          value: "一般"
        },
        {
          key: "差",
          value: "差"
        }
      ],
      List2: [
        {
          key: "迅速",
          value: "迅速"
        },
        {
          key: "一般",
          value: "一般"
        },
        {
          key: "慢",
          value: "慢"
        }
      ],
      List3: [
        {
          key: "好",
          value: "好"
        },
        {
          key: "一般",
          value: "一般"
        },
        {
          key: "慢",
          value: "慢"
        }
      ],
      List4: [
        {
          key: "满意",
          value: "满意"
        },
        {
          key: "较满意",
          value: "较满意"
        },
        {
          key: "一般",
          value: "一般"
        },
        {
          key: "不满意",
          value: "不满意"
        }
      ],
      value1: "",
      value2: "",
      value4: "",
      suggest:''
    };
  },
  methods: {
    submit(){
      this.$http.post('/mall/v1/evaluation/revisit',{
          declarationId:this.$route.query.id,
          type:0,
          attitude:this.value1,
          satisfaction:this.value4,
          timely:this.value2,
          suggest:this.suggest
      }).then(data=>{
          this.$store.commit('changeStatus',this.$route.query.id);
          this.$router.go(-1);
      }).catch(e => {
          done(true);
          this.$vux.toast.text(e);
        });
    }
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>
