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
          <div class="right">{{getStauts(item.status)}}</div>
        </div>
        </div>
        <div class="roomNum"><span>报修房号：</span>{{item.declareAddress}}</div>
        <div class="content">
          <span class="left">报修内容：</span>
          <span class="right">{{item.projectNames||''+' '+item.declareContent||''}}</span>
        </div>
        <div class="footer">
          <div class="tips">
            <span>申报人：{{item.declarant}}</span>
            <span>申请时间：{{item.declareDay+' '+item.declareTime}}</span>
          </div>
          <div class="btn">
            <x-button v-if="item.status===1" mini type="primary" @click.native="repairStart(item.id)">开始维修</x-button>
            <x-button v-if="item.status===2" mini type="warn" @click.native="endRepair(item.id)">结束维修</x-button>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>
<script>
import { XButton } from "vux";
import { mapState } from "vuex";
import { setTimeout } from "timers";
export default {
  components: {
    XButton
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 4,
      nodata: false,
      topc: 0
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
        if (data.result.list) {
          this.pageNum = 2;
        } else {
          this.nodata = true;
        }
        this.$store.commit("setServiceList", data.result.list || []);
      })
      .catch(e => {
        if (!e) {
          this.nodata = true;
        }
        e && this.$vux.toast.text(e);
      });
  },
  activated() {
    this.$refs.my_scroller.resize();
    this.$refs.my_scroller.scrollTo(0, this.topc, false);
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
          return "待签发";
          break;
        case 1:
          return "待维修";
          break;
        case 2:
          return "维修中";
          break;
        case 3:
          return "已完成";
          break;
      }
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