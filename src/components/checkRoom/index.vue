<template>
  <view-box class="check" ref="viewBox">
      <div class="block" v-for="(item,index) in formList" :key="index">
        <cell
        :title="`${item.equipmentRoomName}`"
        :border-intent="false">
      </cell>
      <div class="slide animate">
        <x-input 
          v-for="(i,index) in item.list" 
          :key="index" 
          :title="`${i.name}：`" 
          placeholder="必填"
          :show-clear="false"
          v-model="i.value">
        </x-input>
        <x-textarea 
          placeholder="备注(选填)" 
          :max="120"
          v-model="item.remark"></x-textarea>
      </div>
      </div>
  </view-box>
</template>

<script>
import { ViewBox, Group, Cell, XInput, XTextarea } from "vux";
import {
  wxStartSearchBeacons,
  wxOnSearchBeacons,
  wxStopSearchBeacons,
  setWxConfig
} from "./wxJsdk";
import { fail, throws } from "assert";
import { setTimeout, clearTimeout } from "timers";
var timer;
export default {
  name: "me",
  components: {
    ViewBox,
    Group,
    XTextarea,
    XInput,
    Cell
  },
  data() {
    return {
      formList: [
        /* {
          equipmentRoomName: "巡检间名称1",
          show: false,
          remark: "",
          list: [
            {
              name: "电量",
              value: "",
              id: ""
            },
            {
              name: "温度",
              value: "",
              id: ""
            }
          ]
        } */
      ]
    };
  },
  created() {
    this.getTable(1);
    //jsdk设置
    if (navigator.userAgent.toLowerCase().indexOf("micromessenger") != -1) {
      setWxConfig();
      this.$wechat.ready(() => {
        this.listening();
      });
      this.$wechat.onerror(e => {
        console.log("onerror", e);
      });
    }
  },
  methods: {
    listening() {
      wxStartSearchBeacons()
        .then(result => {
          this.$vux.toast.text(result);
          console.log("wxStartSearchBeacons");
          wxOnSearchBeacons()
            .then(result => {
              console.log("wxOnSearchBeacons");
              if (result && result.length) {
                console.log(result);
                wxStopSearchBeacons();
                //清除定时器
                if (timer) {
                  clearTimeout(timer);
                }
              }
            })
            .catch(e => {
              this.$vux.toast.text(e);
            });
        })
        .catch(e => {
          this.$vux.alert.show({
            title: "提示",
            content: e
          });
          //10秒后再次检验蓝牙有没有开启
          timer = setTimeout(() => {
            wxStopSearchBeacons();
            this.listening();
          }, 10000);
        });
    },
    //获取报表字段
    getTable(id) {
      this.$http
        .get(`/mall/v1/inspectionRoom/${id}`)
        .then(data => {
          this.formList = data.result;
        })
        .catch(e => {
          this.$vux.toast.text(e);
        });
    }
  },
  destroyed() {
    console.log("destroyed");
    //关闭搜索
    wxStopSearchBeacons();
    if (timer) {
      clearTimeout(timer);
    }
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>
