<!-- 模块名称 -->
<template>
  <div class="tableModule">
    <div>
      <el-table
        :stripe="stripe"
        :data="listData.list ? listData.list : []"
        @sort-change="changeSortEvent($event)"
      >
        <template slot="empty">
          <div class="defineNotData" v-show="!loading">
            <svg
              class="icon svg-icon"
              aria-hidden="true"
            >
              <use xlink:href="#icon-weibiaoti-1"></use>
            </svg>
            <p>抱歉，暂时没有数据</p>
          </div>
        </template>
        <el-table-column
          v-for="(item, index) in columnData"
          :prop="item.prop"
          :label="item.label"
          :sortable="item.sortable ? 'custom' : false"
          :key="index"
          :align="item.align || 'center'"
          :width="item.width || ''"
        >
          <template slot-scope="scope">
            <div
              v-if="item.units"
              :style="item.style"
              :class="item.showAdd && scope.row.macroBlockProfit ? 'columnBox' : ''"
            >
              <span v-if="item.showAdd">+</span>{{scope.row[item.prop]}} {{tableItem.name}}
              <div
                v-if="item.showAdd && scope.row.macroBlockProfit"
                class="bigBlockBox"
              >
                <div class="bigBlockIcon">巨块收益</div>
                <div class="bigBlockCount">{{scope.row.macroBlockProfit}} {{tableItem.name}}</div>
              </div>
            </div>
            <div v-else-if="item.moment">{{ (scope.row[item.prop]) | moment(item.moment || 'y-M-d h:m')}}</div>
            <div v-else-if="item.handle">
              <span
                class="cancelWithdraw"
                v-if="scope.row.orderStatus == 1"
                @click="showCancelPopupEvent(scope.row.id)"
              >取消提现</span>
            </div>
            <div v-else-if="item.rdeemHandle" class="redeemBox">
              {{item.mapFn(scope.row[item.prop])}}
              <!-- <div class="redeemBtn" @click="redeemEvent(scope.row)">赎回</div> -->
              <div v-if="scope.row.status == 1 && scope.row.redeemableTime < new Date().getTime()" class="redeemBtn" @click="redeemEvent(scope.row)">赎回</div>
              <div v-if="scope.row.status == 0" class="remindBtn" @click="remindEvent(scope.row)">提醒审核</div>
            </div>
            <div v-else-if="item.copy">
              <div>
                <span>{{item.mapFn ? item.mapFn(scope.row[item.prop]) : scope.row[item.prop]}}</span>
                <i
                  v-if="scope.row[item.prop]"
                  class="icon iconfont iconfuzhi copyBtn"
                  v-clipboard:copy="scope.row[item.prop]"
                  v-clipboard:success="copy"
                  v-clipboard:error="onError"
                >
                </i>
              </div>
            </div>
            <div v-else>{{ item.mapFn ? item.mapFn(scope.row[item.prop]) : scope.row[item.prop] }}</div>
          </template>
        </el-table-column>
      </el-table>
      <div class="footerPagination">
        <el-pagination
          v-if="paginationShow"
          layout="prev, pager, next"
          :total="listData.pages ? listData.pages*10 : 0"
          @current-change="tableCurrentChange"
          @prev-click="tablePrevPage"
          @next-click="tableNextPage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'userDefinedTable',
  components: {},
  props: {
    listData: {
      type: Object,
      default: () => ({}),
    },
    columnData: {
      type: Array,
      default: () => ([]),
    },
    paginationShow: {
      type: Boolean,
      default: true,
    },
    tableItem: {
      type: Object,
      default: () => ({}),
    },
    stripe: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {

    };
  },
  computed: { // 组件计算属性

  },
  watch: { // 组件监听事件

  },
  methods: { // 组件方法
    tableCurrentChange(val) { // 选择页码
      this.$emit('childCurrentChange', val);
    },
    tablePrevPage() { // 上一页
      this.$emit('childPrevPage');
    },
    tableNextPage() { // 下一页
      this.$emit('childNextPage');
    },
    changeSortEvent(obj) { // 修改排序
      this.$emit('changeSortEvent', obj);
    },
    showCancelPopupEvent(id) {
      this.$emit('showCancelPopupEvent', id);
    },
    copy(e) {
      this.$toast('复制成功');
    },
    onError(e) {
      this.$toast('复制失败');
    },
    redeemEvent(obj) {
      this.$emit('redeemEvent', obj);
    },
    remindEvent(obj) {
      this.$emit('remindEvent', obj);
    },
  },
  created() { // 生命周期 - 创建完成

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
// .tableModule {
//   .el-table__body-wrapper {
//     min-height: 4rem;
//   }
//   .el-table__header-wrapper {
//     height: 0.5rem;
//   }
// }
</style>

<style lang="less" scoped>
//@import url(); 引入公共css类
.tableModule {
  width: 100%;
  overflow: hidden;
  .footerPagination {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.1rem 0;
  }
  .el-table__body-wrapper {
    min-height: 4rem;
    .columnBox {
      display: flex;
      .bigBlockBox {
        display: flex;
        justify-items: center;
        .bigBlockIcon {
          @allCenter();
          color: @color-default;
          @font-xs();
          padding: 0 0.03rem;
          background: @color-danger;
          margin-left: 0.2rem;
          margin-right: 0.1rem;
        }
        .bigBlockCount {
          color: @color-font-default;
        }
      }
    }
  }
  .el-table__header-wrapper {
    height: 0.5rem;
  }
  .cancelWithdraw {
    color: @color-main;
    text-decoration: underline;
    cursor: pointer;
  }
  .copyBtn{
    cursor: pointer;
    @active();
  }
  .redeemBox{
    display: flex;
  }
  .redeemBtn,.remindBtn{
    color: @color-main;
    text-decoration: underline;
    cursor: pointer;
    margin-left: 0.3rem;
  }
}
</style>

