<!-- 挖矿教程 -->
<template>
  <div class="moduleWrap">
    <div class="moduleContent">
      <div class="listItem"
        v-for="(item, index) in courseData.docs   "
        :key="index"
      >
        <div class="itemTitle">
          <img :src="item.icon_url" alt="">
          <span class="titleText">{{item.name}}</span>
        </div>
        <div class="handleBox">
          <!-- <a class="handleBtn downloadCourse" :href="item.url" :download="item.name">下载教程</a> -->
          <div class="handleBtn lookBtn" @click="openFile(item.url);">立即查看</div>
        </div>
      </div>
    </div>
    <div class="footerPagination">
      <el-pagination
        layout="prev, pager, next"
        :total="courseData.pages ? courseData.pages*10 : 0"
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
      page_no: 1,
      page_size: 15,
      courseData: {},
    };
  },
  computed: { // 组件计算属性

  },
  watch: { // 组件监听事件

  },
  methods: { // 组件方法
    getCourseList() {
      const data = {
        language: 'zh',
        page_no: this.page_no,
        page_size: this.page_size,
      };
      this.$api.courseList(data).then(res => {
        console.log('教程', res);
        this.courseData = res;
      }).catch(err => {
        console.log('教程出错', err);
      });
    },
    openFile(filePath) {
      window.open(filePath);
    },
    listCurrentChange(val) { // 点击页码
      this.page_no = val;
      this.getCourseList();
    },
    listPrevPage() { // 上一页
      this.page_no -= 1;
      this.getCourseList();
    },
    listNextPage() { // 下一页
      this.page_no += 1;
      this.getCourseList();
    },
  },
  created() { // 生命周期 - 创建完成
    this.getCourseList();
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

<style lang="less" scoped>
  //@import url(); 引入公共css类
.moduleWrap{
  .moduleContent{
    min-height: 6.6rem;
    .listItem{
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 0.7rem;
      border-bottom: 1px solid #eee;
      padding: 0 0.3rem;
      .itemTitle{
        display: flex;
        align-items: center;
        img{
          width: 0.3rem;
          height: 0.3rem;
          margin-right: 0.24rem;
        }
        .titleText{
          color: @color-font-default;
          @font-s();
          font-weight: bold;
        }
      }
      .handleBox{
        display: flex;
        align-items: center;
        .handleBtn{
          @allCenter();
          width: 0.9rem;
          height: 0.26rem;
          @font-s();
          cursor: pointer;
          border-radius: 0.13rem;
        }
        .downloadCourse{
          color: @color-main;
          border: 1px solid @color-main;
          margin-right: 0.2rem;
        }
        .lookBtn{
          color: @color-default;
          background: @color-main;
        }
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

