<!-- 工具下载 -->
<template>
  <div class="moduleWrap">
    <div class="moduleContent">
      <div class="listBox">
        <div class="listItem"
          v-for="(item, index) in  toolsData"
          :key="index"
        >
          <div class="headerBox">
            <div class="toolType">
              <span class="el-icon-s-cooperation toolsIcon"></span>
              {{item.name}}
            </div>
            <div class="handleBox">
              <div class="handleBtn course" @click="downloadFile(item.tutorial_url)">使用教程</div>
              <a class="handleBtn downloadBtn" :href="item.download_url" download>下载安装包</a>
            </div>
          </div>
          <pre class="itemContentBox">{{item.desc}}</pre>
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
  data() {
    return {
      page: 1,
      pageSize: 10,
      toolsData: [],
    };
  },
  computed: { // 组件计算属性

  },
  watch: { // 组件监听事件

  },
  methods: { // 组件方法
    getToolsList() {
      const data = {
        language: 'zh',
        page_no: this.page,
        page_size: this.pageSize,
      };
      this.$api.toolsList(data).then(res => {
        console.log('软件工具', res);
        this.toolsData = res;
      }).catch(err => {
        console.log('软件工具出错', err);
      });
    },
    downloadFile(filePath) {
      window.open(filePath);
    },
  },
  created() { // 生命周期 - 创建完成
    this.getToolsList();
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
  padding: 0.3rem;
  .moduleContent{
    min-height: 6.6rem;
    .listBox{
      .listItem{
        border-radius: 0.1rem;
        background: #e9f2ff;
        margin-bottom: 0.2rem;
        overflow: hidden;
        .headerBox{
          height: 0.46rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: @color-default;
          background: #71a8ff;
          padding: 0 0.2rem;
          .toolType{
            @font-m();
            .toolsIcon{
              // @font-l();
              @font-xl();
              margin-right: 0.18rem;
            }
          }
          .handleBox{
            display: flex;
            .handleBtn{
              @allCenter();
              width: 0.9rem;
              height: 0.26rem;
              @font-s();
              cursor: pointer;
              border-radius: 0.13rem;
            }
            .course{
              color: @color-main;
              background: #e3eeff;
              margin-right: 0.2rem;
            }
            .downloadBtn{
              color: @color-default;
              background: @color-main;
            }
          }
        }
        .itemContentBox{
          min-height: 1.74rem;
          color: @color-font-light;
          @font-s();
          line-height: 0.36rem;
          padding: 0rem 0.25rem;
          background: url('~assets/images/common/awLogo.png') no-repeat right bottom;
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
}
</style>

