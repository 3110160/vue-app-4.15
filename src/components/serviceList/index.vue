<template>
  <div class="orderList">
    <scroller
    :on-infinite="infinite"
    ref="my_scroller">
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
          <span class="right">{{item.projectNames+' '+item.declareContent}}</span>
        </div>
        <div class="footer">
          <div class="tips">
            <span>申报人：{{item.declarant}}</span>
            <span>申请时间：{{item.declareDay+' '+item.declareTime}}</span>
          </div>
          <!-- <div class="btn">
            <x-button mini type="primary" @click.native="repairStart(item.code)">开始维修</x-button>
          </div> -->
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
      pageSize: 3,
      topc: 0
    };
  },
  computed: {
    ...mapState({
      list: state => state.order.list
    })
  },
  mounted() {
    this.$refs.my_scroller.resize();
    this.$http
      .post("/mall/v1/currentUser/declarations", {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
      .then(data => {
        this.pageNum++;
        this.$store.commit("setList", data.result.list);
      })
      .catch(e => {
        this.$vux.toast.text(e);
      });
  },
  activated() {
    this.$refs.my_scroller.resize();
  },
  methods: {
    //开始维修
   /*  repairStart(id) {
      this.$http
      .post("/mall/v1/maintenance/repairStart", { id:id })
      .then(data => {
       let p =  this.list.find((item,index)=>{
          return item.code === id
        })
      })
      .catch(e => {
        this.$vux.toast.text(e);
      });
    }, */
    infinite(done) {
      if (this.list.length < this.pageSize) {
        done(true);
        return;
      }
      this.$http
        .post("/mall/v1/currentUser/declarations", {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(data => {
          done(true);
          data.result.list && this.pageNum++;
          this.$store.commit("setList", [
            ...this.list,
            ...(data.result.list || [])
          ]);
        })
        .catch(e => {
          done(true);
          this.$vux.toast.text(e);
        });
    },
    //获取状态
    getStauts(status) {
      switch (status) {
        case 0:
          return "待处理";
          break;
        case 1:
          return "待签发";
          break;
        case 2:
          return "待维修";
          break;
        case 3:
          return "维修中";
          break;
        case 4:
          return "已完成";
          break;
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.path == "/home/addOrder") {
      next(vm => {
        vm.pageNum = 1;
        vm.$refs.my_scroller.scrollTo(0, 0);
        vm.$http
          .post("/mall/v1/currentUser/declarations", {
            pageNum: 1,
            pageSize: vm.pageSize
          })
          .then(data => {
            if (data.result.list) {
              vm.pageNum = 2;
            }
            vm.$store.commit("setList", data.result.list || []);
          })
          .catch(e => {
            vm.$vux.toast.text(e);
          });
      });
    } else {
      next(vm => {
        vm.$refs.my_scroller.scrollTo(0, vm.topc, false);
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