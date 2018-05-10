<template>
  <div class="orderList">
    <scroller
    :on-infinite="infinite"
    ref="my_scroller">
    <div v-if="nodata" class="noData">
      <img width="50%" src="./img/nodata@2x.png" alt="/">
      <p>没有新的异常单哦～</p>
    </div>
      <div v-for="(item,index) in list" :key="index" class="box" @click="detail(item.id)">
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
          <span class="right">{{item.projectNames||''}} {{item.declareContent||''}}</span>
        </div>
        <div class="roomNum"><span>异常原因：</span>{{item.repairStatus===1?'缺少材料':item.repairStatus===2?'不是我的':''}}</div>
        <div :class="item.status===4?'footer heighter':'footer'">
          <div class="tips">
            <span v-if="item.declarant">申报人：{{item.declarant||'未登记'}}</span>
            <span>上报异常时间：{{item.abnormalTime}}</span>
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
      list: state => state.order.abnormalList
    })
  },
  mounted() {
    this.$refs.my_scroller.resize();
    this.nodata = false;
    this.$http
      .post("/mall/v1/maintenances/abnormal", {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
      .then(data => {
        if(data.result.list){
          this.pageNum++;
          this.$store.commit("setAbnormalList", data.result.list);
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
      this.$router.push({ path: "/abnormalDetail", query: { id } });
    },
    infinite(done) {
      if (this.list.length < this.pageSize) {
        done(true);
        return;
      }
      this.$http
        .post("/mall/v1/maintenances/abnormal", {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(data => {
          done(true);
          data.result.list && this.pageNum++;
          this.$store.commit("setAbnormalList", [
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
  },
  //部分页面跳转过来 需要刷新列表
  beforeRouteEnter(to, from, next) {
    if (from.path == "/home") {
      next(vm => {
        vm.nodata = false;
        vm.pageNum = 1;
        vm.$refs.my_scroller.scrollTo(0, 0);
        vm.$http
          .post("/mall/v1/maintenances/abnormal", {
            pageNum: 1,
            pageSize: vm.pageSize
          })
          .then(data => {
            if (data.result.list) {
              vm.pageNum = 2;
            }else{
              vm.nodata = true;
            }
            vm.$store.commit("setAbnormalList", data.result.list || []);
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