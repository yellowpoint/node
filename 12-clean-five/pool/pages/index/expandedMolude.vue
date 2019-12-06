<!-- 首页列表扩展模块 -->
<template>
  <div class="expandedMolude">
    <div class="switchBox">
      <switch-btn
        v-if="tableItem.type == 0"
        class="switchStyle"
        @tap="changePoolType"
        :text="btnText"
        :selectStyle="selectStyle"
      ></switch-btn>
    </div>
    <div class="detailInfoBox">
      <echarts-module class="echartsModuleBox" :tableItem="tableItem"></echarts-module>
      <pool-detail
        class="poolDetailBox"
        :poolInfo="poolData"
        :units="tableItem.name"
      ></pool-detail>
    </div>
    <div class="latelyBlockBox">
      <div class="toggleExpandedBox">
        <div class="line"></div>
        <div
          class="toggleExpandedBtn"
          @click="showTable = !showTable"
        >最近挖到的块<i :class="showTable ? 'el-icon-caret-bottom showTableIcon' : 'el-icon-caret-bottom'"></i></div>
        <div class="line"></div>
      </div>
      <el-collapse-transition>
        <keep-alive>
          <user-defined-table
            v-show="showTable"
            :loading="loading"
            :columnData="tableColumnData"
            :listData="tableData"
            :tableItem="tableItem"
            :stripe="false"
            :paginationShow="paginationShow"
            @childCurrentChange="tableCurrentChange"
            @childPrevPage="tablePrevPage"
            @childNextPage="tableNextPage"
          >
          </user-defined-table>
        </keep-alive>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>

import echartsModule from './echartsModule';
import poolDetail from './poolDetail';

export default {
  name: '',
  components: {
    echartsModule,
    poolDetail,
  },
  props: {
    expandedData: {
      type: Object,
      default: () => ({}),
    },
    tableItem: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      loading: false,
      showTable: false,
      paginationShow: true,
      poolType: 0, // 0 主矿池， 2 生态池
      btnText: {
        openText: '主矿池',
        closeText: '生态池',
      },
      selectStyle: {
        color: '#4896FF',
        background: '#fff',
      },
      poolData: {},
      tableColumnData: [ // 每日总收益
        {
          label: '区块',
          prop: 'blockCode',
          align: 'center',
        },
        {
          label: '矿工ID',
          prop: 'minerNickName',
          align: 'center',
        },
        {
          label: '时间',
          prop: 'time',
          align: 'center',
          moment: 'y-M-d h:m',
        },
        {
          label: '数量',
          prop: 'coinSize',
          align: 'center',
          units: true,
        },
      ],
      blockPage: 1, // 表格页码
      tableData: {},
    };
  },
  computed: { // 组件计算属性

  },
  watch: { // 组件监听事件

  },
  methods: { // 组件方法
    changePoolType(status) { // 切换主矿池和生态池
      if (status) {
        this.poolType = 0;
        this.poolData = this.expandedData[this.tableItem.key].mainPool;
      } else {
        this.poolType = 2;
        this.poolData = this.expandedData[this.tableItem.key].ecopool;
      }
      this.paginationShow = false;
      this.blockPage = 1;
      this.$nextTick(function () { // 解决修改分页后视图不更新的问题  强制刷新分页组件
        this.paginationShow = true;
      });
      this.getLatelyBlock();
    },
    tableCurrentChange(val) {
      this.blockPage = val;
      this.getLatelyBlock();
    },
    tablePrevPage() {
      this.blockPage -= 1;
      this.getLatelyBlock();
    },
    tableNextPage() {
      this.blockPage += 1;
      this.getLatelyBlock();
    },
    getLatelyBlock() {
      this.loading = true;
      const data = {
        mineType: this.tableItem.key,
        page: this.blockPage,
        pageSize: 10,
      };
      if (this.poolType == 0) {
        this.$api.latelyBlock(data).then(res => {
          this.tableData = res;
          this.loading = false;
          console.log('主矿池挖到的区块', res);
        }).catch(err => {
          this.loading = false;
          console.log('最近挖到的区块错误', err);
        });
      } else if (this.poolType == 2) {
        this.$api.latelygreenBlock(data).then(res => {
          this.tableData = res;
          this.loading = false;
          console.log('生态池挖到的区块', res);
        }).catch(err => {
          this.loading = false;
          console.log('最近挖到的区块错误', err);
        });
      }
    },
  },
  created() { // 生命周期 - 创建完成
    this.getLatelyBlock();
    this.poolData = this.expandedData[this.tableItem.key].mainPool;
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

<style lang="less">
.expandedMolude {
  .el-table__expand-icon--expanded {
    transform: rotate(-180deg);
  }
  .showTableIcon {
    transform: rotate(-180deg);
  }
  .latelyBlockBox {
    .el-table,
    .el-table th,
    .el-table tr,
    .footerPagination {
      background-color: #f3f3f3;
    }
    .footerPagination {
      .el-pagination .btn-next,
      .el-pagination .btn-prev {
        background-color: #f3f3f3;
      }
      .el-dialog,
      .el-pager li {
        background: #f3f3f3;
      }
    }
    .el-table__body-wrapper{
      min-height: 4.8rem;
    }
  }
  .el-table th td .cell{
    @font-s();
    color: @color-font-default;
    font-weight: 400 !important;
  }
}
</style>

<style lang="less" scoped>
//@import url(); 引入公共css类
.expandedMolude {
  padding-left: 0.2rem;
  padding-bottom: 0.28rem;
  background: #fafafa;
  .switchBox {
    display: flex;
    justify-content: center;
    padding: 0.32rem 0;
    .switchStyle {
      width: 2.4rem;
      height: 0.38rem;
      @font-s();
      color: @color-default;
      font-weight: bold;
      background: @color-main;
    }
  }
  .detailInfoBox {
    display: flex;
    .echartsModuleBox {
      width: 7rem;
    }
    .poolDetailBox {
      flex: 1;
    }
  }
  .latelyBlockBox {
    background: #fafafa;
    .toggleExpandedBox {
      @allCenter();
      .line {
        flex: 1;
        height: 1px;
        background: #ddd;
      }
      .toggleExpandedBtn {
        width: 2rem;
        height: 0.6rem;
        @allCenter();
        color: @color-font-default;
        @font-s();
        cursor: pointer;
      }
    }
  }
}
</style>

