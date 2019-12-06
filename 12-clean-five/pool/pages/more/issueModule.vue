<!-- 常见问题 -->
<template>
  <div class="moduleWrap">
    <div class="moduleContent">
      <el-collapse
        v-model="activeNames"
      >
        <el-collapse-item
          v-for="(item, index) in issueData.helps"
          :key="index"
          :title="item.title"
          :name="index"
        >
          <template slot="title">
            <div class="titleBox">
              <div class="titleName">
                <i class="icon iconfont iconyidu titileIcon"></i>
                {{item.title}}
              </div>
              <div class="toggleBtn">
                {{mapActive(index) ? '收起' : '展开'}}
                <span :class="mapActive(index) ? 'el-icon-arrow-down is-active' : 'el-icon-arrow-down'"></span>
              </div>
            </div>
          </template>
          <div class="questionContent">
            <pre class="questionText">{{item.content}}</pre>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="footerPagination">
      <el-pagination
        layout="prev, pager, next"
        :total="issueData.pages ? issueData.pages*10 : 0"
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
      page_size: 15,
      activeNames: [-1],
      issueData: {}, // 常见问题
    };
  },
  computed: { // 组件计算属性

  },
  watch: { // 组件监听事件

  },
  methods: { // 组件方法
    getHelp() {
      const data = {
        language: 'zh',
        page_no: this.page,
        page_size: this.page_size,
      };
      this.$api.help(data).then(res => {
        console.log('常见问题', res);
        this.issueData = res;
      }).catch(err => {
        console.log('常见问题出错', err);
      });
    },
    listCurrentChange(val) { // 点击页码
      this.page = val;
      this.getHelp();
    },
    listPrevPage() { // 上一页
      this.page -= 1;
      this.getHelp();
    },
    listNextPage() { // 下一页
      this.page += 1;
      this.getHelp();
    },
    mapActive(index) {
      return this.activeNames.includes(index);
    },
  },
  created() { // 生命周期 - 创建完成
    this.getHelp();
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
  padding: 0 0.3rem;
  .el-collapse{
    border-top: 0;
  }
  .moduleContent{
    min-height: 6.6rem;
    .titleBox{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .titleName{
        @allCenter();
        @font-s();
        color: @color-font-default;
        .titileIcon{
          font-size: 0.2rem;
          color: @color-main;
          margin-right: 0.15rem;
        }
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

