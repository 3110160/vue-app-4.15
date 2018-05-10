<template>
  <view-box class="check" ref="viewBox" v-if="formList.length">
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
      <x-button 
        class="btn"
        @click.native="submit" 
        type="primary">提交</x-button>
  </view-box>
</template>

<script>
import { ViewBox, Group, Cell, XInput, XTextarea,XButton } from "vux";
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
  name: "checkRoom",
  components: {
    ViewBox,
    Group,
    XTextarea,
    XInput,
    Cell,
    XButton
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
    this.getTable([
      {
        accuracy: "0.404806",
        major: 10170,
        minor: 34438,
        proximity: "2",
        rssi: "-51",
        uuid: "FDA50693-A4E2-4FB1-AFCF-C6EB07647825"
      }
    ]);
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
                //http 请求当前巡检间的表格
                this.getTable(result);
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
          }, 6000);
        });
    },
    //获取报表字段
    getTable(bluetooths) {
      this.$http
        .post(`/mall/v1/inspectionRoom/tableStructure`, {
          bluetooths
        })
        .then(data => {
          this.formList = data.result;
        })
        .catch(e => {
          this.$vux.toast.text(e);
        });
    },
    //提交表单
    submit(){
      let list = this.formList;
      list.map(item=>{
        if(item.list){
          item.details = item.list;
          item.details.map(i=>{
            i.reportSettings = i.id;
            i.value = i.value || '';
          })
        }
      })
      this.$http
        .post(`/mall/v1/reportRecord`, {
          list
        })
        .then(data => {
          this.$vux.toast.text('提交成功');
          this.$router.push({path:'/home',replace:true})
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
