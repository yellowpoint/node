<!-- 公告 -->
<template>
  <div class="moduleWrap">
    <div class="moduleContent">
      <div class="headerTitle">
        <text-title>消息中心</text-title>
        <div
          class="clearAllMsg"
          @click="clearAllMsg"
        ><i class="icon iconfont iconyidu biaoji"></i>全部已读</div>
      </div>
      <el-collapse
        v-if="msgData.list && msgData.list.length"
        v-model="activeNames"
        @change="changeMsgStatus($event)"
      >
        <el-collapse-item
          v-for="(item, index) in msgData.list"
          :key="index"
          :title="item.messageName"
          :name="index"
        >
          <template slot="title">
            <div class="titleBox">
              <div v-if="item.readRemark" class="titleName">
                <span class="icon iconfont icontongzhi titileIcon"></span>
                {{item.messageName}}
              </div>
              <div v-else class="titleName">
                <span class="icon iconfont icontongzhi titileIcon"></span>
                {{item.messageName}}
                <i class="redPoint"></i>
              </div>
              <div class="titleRightBox">
                <div class="dateTime">
                  {{item.createTime | moment('y-M-d h:m:s')}}
                </div>
                <div class="toggleBtn">
                  {{mapActive(index) ? '收起' : '展开'}}
                  <span :class="mapActive(index) ? 'el-icon-arrow-down is-active' : 'el-icon-arrow-down'"></span>
                </div>
              </div>
            </div>
          </template>
          <div class="questionContent">
            <pre class="questionText">{{item.messageAnswer}}</pre>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="defineNotData" v-else>
        <svg
          class="icon svg-icon"
          aria-hidden="true"
        >
          <use xlink:href="#icon-weibiaoti-1"></use>
        </svg>
        <p>抱歉，暂时没有数据</p>
      </div>
    </div>
    <div class="footerPagination">
      <el-pagination
        layout="prev, pager, next"
        :total="msgData.pages ? msgData.pages*10 : 0"
        @current-change="listCurrentChange"
        @prev-click="listPrevPage"
        @next-click="listNextPage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>

// import templateName from 'path';
export default {
  name: '',
  components: {},
  data() {
    return {
      page: 1,
      pageSize: 10,
      activeNames: [],
      msgData: {}, // 消息
      showList: [], // 展开的列表
    };
  },
  computed: { // 组件计算属性
    msgCount() { // 未读消息数量
      return this.$store.getters.msgCount;
    },
  },
  watch: { // 组件监听事件

  },
  methods: { // 组件方法
    getMsgList() {
      const data = {
        language: 'zh',
        page: this.page,
        pageSize: this.pageSize,
      };
      this.$api.msgList(data).then(res => {
        this.msgData = res;
        console.log('消息列表', res);
      }).catch(err => {
        console.log('消息列表错误', err);
      });
    },
    getMsgCount() { // 获取未读消息数量
      this.$api.msgCount().then(res => {
        console.log('更新未读消息数', res);
        this.$store.dispatch('setMsgCount', res).then(() => {
        }).catch(err => {
          console.log(err);
        });
      }).catch(err => {
        console.log('更新未读消息数错误', err);
      });
    },
    clearAllMsg() {
      if (this.msgCount) {
        this.$api.clearAllMsg().then(res => {
          console.log('标记所有消息为已读', res);
          this.$toast('暂无未读消息！');
          this.getMsgCount();
          this.getMsgList();
        }).catch(err => {
          console.log('标记所有消息为已读错误', err);
        });
      } else {
        this.$toast('暂无未读消息！');
      }
    },
    changeMsgStatus(showListArr) {
      if (showListArr.length < this.showList.length) { // 当执行收起动作时return
        this.showList = showListArr;
        return;
      }
      this.showList = showListArr;
      if (showListArr.length > 0) {
        const targetIndex = showListArr[showListArr.length - 1];
        if (this.msgData.list[targetIndex].readRemark == 0) {
          const data = {
            id: this.msgData.list[targetIndex].id,
          };
          this.$api.changeMsgStatus(data).then(res => {
            console.log('修改消息状态', res);
            this.getMsgCount();
            this.getMsgList();
          }).catch(err => {
            console.log('修改消息状态错误', err);
          });
        }
      }
    },
    listCurrentChange(val) { // 选择页码
      if (this.page == val) { // 解决点击上一页和下一页发送两次请求的问题
        return;
      }
      this.page = val;
      this.getMsgList();
    },
    listPrevPage() { // 上一页
      this.page -= 1;
      this.getMsgList();
    },
    listNextPage() { // 下一页
      this.page += 1;
      this.getMsgList();
    },
    mapActive(index) {
      return this.activeNames.includes(index);
    },
  },
  created() { // 生命周期 - 创建完成
    this.getMsgList();
    this.getMsgCount();
  },
  mounted() { // 生命周期 - 挂载完成

  },
  beforeCreate() { // 生命周期 - 创建之前

  },
  beforeMount() { // 生命周期 - 挂载之前

  },
  tbeforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less">
.moduleWrap{
  .el-collapse{
    border-top: 0;
    .el-collapse-item__header{
      height: auto;
    }
  }
  .el-collapse-item__arrow{
    display: none;
  }
  .el-icon-arrow-down{
    transition: transform .2s ease-in-out;
  }
}
</style>
<style lang="less" scoped>
  //@import url(); 引入公共css类
.moduleWrap{
  @content();
  margin: 0.3rem auto;
  background: @color-default;
  .el-collapse{
    border-top: 0;
  }
  .moduleContent{
    min-height: 6.6rem;
    padding: 0 0.3rem;
    .headerTitle{
      height: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ebeef5;
      .clearAllMsg {
        @allCenter();
        width: 1.2rem;
        height: 0.4rem;
        padding: 0 0.1rem;
        @font-s();
        color: @color-default;
        background: #fb6565;
        border-radius: 0.04rem;
        cursor: pointer;
        .biaoji {
          font-size: 0.22rem;
          margin-right: 0.1rem;
        }
      }
    }
    .titleBox{
      width: 100%;
      height: 0.6rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .titleName{
        position: relative;
        @allCenter();
        @font-s();
        color: @color-font-default;
        .titileIcon{
          font-size: 0.2rem;
          color: @color-main;
          margin-right: 0.15rem;
        }
        .redPoint {
          position: absolute;
          right: -0.12rem;
          top: 0.1rem;
          width: 0.06rem;
          height: 0.06rem;
          background: red;
          border-radius: 50%;
        }
      }
      .titleRightBox{
        display: flex;
        align-items: center;
        .dateTime{
          @font-s();
          color: #999;
          margin-right: 0.2rem;
        }
        .toggleBtn{
          width: 0.6rem;
          height: 0.24rem;
          @allCenter();
          @font-s();
          color: @color-main;
          border: 1px solid @color-main;
          border-radius: 0.04rem;
          .is-active{
            transform: rotate(-180deg);
          }
        }
      }
    }
    .questionContent{
      .questionText{
        color: @color-font-light;
      }
    }
  }
  .footerPagination{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.2rem 0;
  }
}
</style>

