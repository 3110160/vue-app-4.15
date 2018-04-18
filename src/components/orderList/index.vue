<template>
  <div class="orderList">
    <scroller
    :on-infinite="infinite"
    ref="my_scroller">
    <div v-if="nodata" class="noData">
      <img width="50%" src="./img/nodata@2x.png" alt="/">
      <p>没有新的申报单哦～</p>
    </div>
      <div v-for="(item,index) in list" :key="index" class="box" @click="detail(item.id)">
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
          <span class="right">{{item.projectNames+' '+item.declareContent||''}}</span>
        </div>
        <div :class="item.status===4?'footer heighter':'footer'">
          <div class="tips">
            <span>申报人：{{item.declarant}}</span>
            <span>申请时间：{{item.declareDay+' '+item.declareTime}}</span>
          </div>
          <div class="btn" v-if="item.status===4">
            <x-button mini type="primary" @click.native.stop="evaluation(item.id)">评价</x-button>
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
      pageSize:4,
      nodata:false,
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
    this.nodata = false;
    this.$http
      .post("/mall/v1/currentUser/declarations", {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
      .then(data => {
        if(data.result.list){
          this.pageNum++;
          this.$store.commit("setList", data.result.list);
        }else{
          this.nodata = true;
        }
      })
      .catch(e => {
        e&&this.$vux.toast.text(e);
      });
  },
  activated() {
    this.$refs.my_scroller.resize();
  },
  methods: {
    //详情
    detail(id) {
      this.$router.push({ path: "/orderDetail", query: { id } });
    },
    //评价
    evaluation(id) {
      this.$router.push({ path: "/serviceEvaluation", query: { id } });
    },
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
        case 98:
          return "已回访";
          break;
        case 99:
          return "已评价";
          break;
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.path == "/home/addOrder") {
      next(vm => {
        vm.nodata = false;
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
            }else{
              vm.nodata = true;
            }
            vm.$store.commit("setList", data.result.list || []);
          })
          .catch(e => {
            e&&vm.$vux.toast.text(e);
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