<!-- 模块名称 -->
<template>
  <div class="afficheModule">
    <div class="affiche">
      <div class="afficheHeader" v-show="showHeader">
        <text-title>公告中心</text-title>
        <div
          v-if="showMore"
          class="tableMore"
          @click="toAffiche"
        >查看更多 <span class="el-icon-arrow-right"></span></div>
      </div>
      <div class="tableMain">
        <div class="noticeUl">
          <div
            class="noticeLi"
            v-for="(item,index) of afficheData.news"
            :key="index"
            @click="showContent(item)"
          >
            <p><i class="icon iconfont icontongzhi gonggao"></i>{{item.title}}</p>
            <span>{{item.create_time}}</span>
          </div>
          <div
            class="defineNotData"
            v-if="!afficheData.news || !afficheData.news.length"
          >
            <svg
              class="icon svg-icon"
              aria-hidden="true"
            >
              <use xlink:href="#icon-weibiaoti-1"></use>
            </svg>
            <p>抱歉，暂时没有数据</p>
          </div>
        </div>
        <div class="tablePagination" v-if="showPagination">
          <el-pagination
            layout="prev, pager, next"
            :total="afficheData.pages*10"
            @current-change="afficheCurrentChange"
            @prev-click="affichePrevPage"
            @next-click="afficheNextPage"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// import templateName from 'path';
export default {
  name: '',
  components: {},
  props: {
    showMore: {
      type: Boolean,
      default: true,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    showPagination: {
      type: Boolean,
      default: true,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      noticePage: 1,
      afficheData: {},
    };
  },
  computed: { // 组件计算属性

  },
  watch: { // 组件监听事件

  },
  methods: { // 组件方法
    toAffiche() {
      this.$router.push('/more');
    },
    showContent(item) { // 公告弹窗
      this.$MsgPopup({
        msgData: item,
      });
    },
    getNoticeList() { // 拉取公告数据
      const data = {
        language: 'zh',
        page_no: this.noticePage,
        page_size: this.pageSize,
      };
      this.$api.noticeList(data).then(res => {
        this.afficheData = res;
        console.log('公告列表', res);
      }).catch(err => {
        console.log('公告列表错误', err);
      });
    },
    afficheCurrentChange(val) { // 点击页码
      this.noticePage = val;
      this.getNoticeList();
    },
    affichePrevPage() { // 上一页
      this.noticePage -= 1;
      this.getNoticeList();
    },
    afficheNextPage() { // 下一页
      this.noticePage += 1;
      this.getNoticeList();
    },
  },
  created() { // 生命周期 - 创建完成
    this.getNoticeList();
  },
  mounted() { // 生命周期 - 挂载完成

  },
  beforeCreate() { // 生命周期 - 创建之前

  },
  beforeMount() { // 生命周期 - 挂载之前

  },
  tbeforeUpdate() { }, // 生命周期 - 更新之前
  updated() { }, // 生命周期 - 更新之后
  beforeDestroy() { }, // 生命周期 - 销毁之前
  destroyed() { }, // 生命周期 - 销毁完成
  activated() { }, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.afficheModule {
  position: relative;
  display: flex;
  justify-content: space-between;
  @shadow();
  border-radius: 0.1rem;
  background: @color-default;
  overflow: hidden;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  .affiche {
    width: 100%;
    .tableTitle {
      @subtitle();
      i {
        font-size: 0.28rem;
        font-weight: 600;
        margin-right: 0.2rem;
      }
    }
    .afficheHeader{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 0.6rem;
      padding: 0 0.2rem;
      border-bottom: 1px solid #ebeef5;
    }
    .tableMore {
      @allCenter();
      color: @color-font-light;
      @font-m();
      @hover();
      .el-icon-arrow-right{
        margin-left: 0.1rem;
      }
    }
    .tableMain {
      background: @color-default;
      .noticeUl {
        .defineNotData {
          padding: 0.2rem 0;
          text-align: center;
        }
        .noticeLi {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 0.6rem;
          color: #666;
          @font-s();
          padding: 0 0.3rem 0 0.2rem;
          border-bottom: 1px solid #ebeef5;
          cursor: pointer;
          p {
            @font-s();
            font-weight: 400;
            @ellipsis();
            margin-right: 0.1rem;
          }
          span {
            flex-shrink: 0;
            @font-s();
            color: @color-font-light;
            @media (max-width: 768px) {
              width: auto;
            }
          }
          &:hover{
            background: #f5f9ff;
          }
          .gonggao{
            color: @color-main;
            @font-m();
            margin-right: 0.13rem;
            font-weight: 900;
          }
        }
      }
      .tablePagination{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 0.6rem;
      }
    }
  }
}
</style>

