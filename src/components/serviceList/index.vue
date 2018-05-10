<template>
  <div class="orderList">
    <scroller
    :on-infinite="infinite"
    ref="my_scroller">
    <div v-if="nodata" class="noData">
      <img width="50%" src="./img/nodata@2x.png" alt="/">
      <p>没有新的维修单哦～</p>
    </div>
      <div v-for="(item,index) in list" :key="index" class="box">
        <div style="background-color: white;">
          <div class="header">
          <div class="left">
            <i></i>
            <span>报修单号：</span>{{item.code}}</div>
          <div class="right" :style='`color:${getStauts(item.status).c}`'>{{getStauts(item.status).t}}</div>
        </div>
        </div>
        <div class="roomNum"><span>报修房号：</span>{{item.declareAddress}}</div>
        <div class="content">
          <span class="left">报修内容：</span>
          <span class="right">{{item.projectNames?item.projectNames:''}} {{item.declareContent?item.declareContent:''}}</span>
        </div>
        <div class="roomNum" v-if="item.repairStatus!==0"><span>异常原因：</span>{{item.repairStatus===1?'缺少材料':item.repairStatus===2?'不是我的':''}}</div>
        <div class="footer">
          <div class="tips">
            <span>申报人：{{item.declarant ||'未登记'}}</span>
            <span>申请时间：{{item.declareDay+' '+item.declareTime}}</span>
          </div>
          <div class="btn">
            <x-button v-if="item.status===1" mini type="primary" @click.native="repairStart(item.id)">开始维修</x-button>
            <x-button v-if="item.status===2&&item.repairStatus===0" mini type="warn" @click.native="showDialog(item.id)">无法维修</x-button>
            <x-button v-if="item.status===2" mini type="warn" @click.native="endRepair(item.id)">结束维修</x-button>
          </div>
        </div>
      </div>
    </scroller>

  <div v-transfer-dom>
      <popup v-model="showPopup" height="50%" style="width:101%">
        <div style="width:100%">
          <group>
            <radio :options="reasons" v-model="theReason"></radio>
          </group>
          <x-button 
            style="width:90%;margin-top:56px"
            class="btn"
            @click.native="submit" 
            type="primary">提交</x-button>
        </div>
      </popup>
    </div>

  </div>
</template>
<script>
import { XButton,Radio, Group,Popup ,TransferDom} from "vux";
import { mapState } from "vuex";
import { setTimeout } from "timers";
import { truncate } from 'fs';
export default {
  components: {
    XButton,
    Radio,
    Group,
    Popup
  },
  directives: {
    TransferDom
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 4,
      nodata: false,
      topc: 0,
      reasons: [{
        key:1,
        value:'缺少材料'
      },{
        key:2,
        value:'不是我的'
      }],
      theReason:'',
      currentId:'',
      showPopup:false
    };
  },
  computed: {
    ...mapState({
      list: state => state.order.serviceList
    })
  },
  mounted() {
    this.nodata = false;
    this.pageNum = 1;
    this.$http
      .post("/mall/v1/maintenances", {
        pageNum: 1,
        pageSize: this.pageSize
      })
      .then(data => {
        if (data&&data.result.list) {
          this.pageNum = 2;
          this.nodata = false;
        } else {
          this.nodata = true;
        }
        this.$store.commit("setServiceList", data.result.list || []);
      })
      .catch(e => {
        e && this.$vux.toast.text(e);
      });
  },
  activated() {
    this.$refs.my_scroller.resize();
    this.$refs.my_scroller.scrollTo(0, this.topc, false);
  },
  watch:{
    //清除当前选中的值
    showPopup(value){
      if(!value){
        this.theReason='';
        this.currentId='';
      }
    }
  },
  methods: {
    //开始维修
    repairStart(id) {
      this.$http
        .post("/mall/v1/maintenance/repairStart", { id })
        .then(data => {
          this.$store.commit("repairStart", id);
        })
        .catch(e => {
          this.$vux.toast.text(e);
        });
    },
    //结束维修
    endRepair(id) {
      this.$router.push({ path: "/serviceEnd", query: { id } });
    },
    infinite(done) {
      if (this.list.length < this.pageSize) {
        done(true);
        return;
      }
      this.$http
        .post("/mall/v1/maintenances", {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(data => {
          done(true);
          data.result.list && this.pageNum++;
          this.$store.commit("setServiceList", [
            ...this.list,
            ...(data.result.list || [])
          ]);
        })
        .catch(e => {
          done(true);
          e && this.$vux.toast.text(e);
        });
    },
   //获取状态
    getStauts(status) {
      switch (status) {
        case 0:
          return {
            t:"待签发",
            c:'#f37f7f'
          };
          break;
        case 1:
          return {
            t:"待维修",
            c:'#f1ae91'
          };
          break;
        case 2:
          return {
            t:"维修中",
            c:'#ead28a'
          };
          break;
        case 3:
          return {
            t:"已完成",
            c:'#aad89c'
          };
          break;        
      }
    },
    //无法维修
    showDialog(id){
      this.currentId = id;
      this.showPopup = true;
    },
    //提交原因
    submit(){
      let data = {
        id:this.currentId,
        repairStatus:this.theReason
      }
      this.$http
        .post("/mall/v1/maintenance/unableToRepair",data)
        .then(data => {
          this.$store.commit("deleteOrder", {id:this.currentId,repairStatus:this.theReason});
          this.showPopup = false;
        })
        .catch(e => {
          this.$vux.toast.text(e);
        });
    }
  },
  beforeRouteLeave(to, from, next) {
    this.topc = this.$refs.my_scroller.getPosition().top;
    next();
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>