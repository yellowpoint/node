<!-- 矿机管理模块 -->
<template>
  <div class="myMillPage millManageModule">
    <div class="headerTitleBox">
      <div class="headerTitle">矿机管理</div>
      <div class="activeBox">
        <div class="userSelectBox">
          <div
            class="userSelectItem"
            :class="{act:selectType===item.value}"
            v-for="item in selectTypeOptions"
            :key="item.value"
            @click="changeSelectType(item)"
          >{{item.label}}</div>
        </div>
        <div
          v-if="!readOnly"
          class="userDeleteBtn"
          @click="userDeleteMill"
        >
          <i class="deleteBtn icon iconfont iconshanchu-copy-copy"></i>
        </div>
      </div>
    </div>
    <div class="tableBox">
      <el-table
        ref="table"
        :data="myMinerListData.list"
        style="width: 100%;"
        :row-style="rowStyle"
        @selection-change="handleSelectionChange"
        @sort-change="changeSortEvent($event)"
      >
        <!-- 自定义暂无数据提示 -->
        <template slot="empty">
          <div class="defineNotData">
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
          type="selection"
          width="112"
          :selectable="selectInit"
          v-if="!readOnly"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="clientCode"
          label="矿机名"
          sortable='custom'
          :width="isPC ? '260' : ''"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="maxVolume"
          label="历史最大容量(TB)"
          width="180"
          sortable='custom'
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="volume"
          label="当前容量(TB)"
          width="160"
          sortable='custom'
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="dropVolume"
          label="掉盘容量(TB)"
          sortable='custom'
          :width="isPC ? '' : '100'"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="最后上报时间"
          :width="isPC ? '180' : '100'"
          sortable='custom'
          align="center"
        >
          <template slot-scope="scope">
            <span :style="scope.row.minerOnlineStatus ? '' : 'color: #FB6565'">{{ scope.row.createTime | moment('y-M-d h:m:s') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="状态"
          align="left"
        >
          <template slot-scope="scope">
            <div :class="scope.row.minerOnlineStatus ? 'minerOnlineStatus' : 'minerOutlineStatus'">
              {{scope.row.minerOnlineStatus ? '在线' : '离线'}}
              <el-tooltip
                v-if="Number(scope.row.dropVolume) && !readOnly"
                placement="top"
              >
                <div slot="content">刷新历史最大容量</div>
                <i
                  class="icon iconfont iconrefresh refreshBtn"
                  @click="userRefreshMill(scope.row.id)"
                ></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="footerPagination">
        <el-pagination
          v-if="paginationShow"
          layout="prev, pager, next"
          :total="myMinerListData.pages*10"
          @current-change="millManageCurrentChange"
          @prev-click="millManagePrevPage"
          @next-click="millManageNextPage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'millManageModule',
  inject: ['tableItem'],
  components: {},
  props: {
    apiKey: {
      type: String,
      default: '',
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      page: 1,
      paginationShow: true,
      myMinerListData: {}, // 我的矿机列表
      multipleSelection: [], // 表格选中的项
      selectTypeOptions: [ // 下拉框选项
        {
          value: '1',
          label: '全部',
        },
        {
          value: '2',
          label: '在线',
        },
        {
          value: '3',
          label: '离线',
        },
      ],
      selectType: '1', // 1全部 2在线 3离线
      millSortClass: 3, // 矿机列表排序字段
      millSortType: 1, // 矿机列表排序升序降序
    };
  },
  computed: { // 组件计算属性
    isPC() {
      if (document.body.clientWidth < 768) {
        return false;
      }
      return true;
    },
    mineType() { // 币种
      return this.tableItem.key;
    },
  },
  watch: { // 组件监听事件

  },
  methods: { // 组件方法
    handleSelectionChange(val) { // 选中数据发生变化
      console.log(val);
      this.multipleSelection = val;
    },
    rowStyle({ row, rowIndex }) { // 表格行选中背景
      for (const item of this.multipleSelection) {
        if (item.id == row.id && !row.minerOnlineStatus) {
          return 'background: #F6F9FB';
        }
      }
      return '';
    },
    selectInit(row, index) {
      if (row.minerOnlineStatus) {
        return false; // 不可勾选
      }
      return true; // 可勾选
    },
    changeSelectType(obj) {
      this.paginationShow = false;
      this.selectType = obj.value;
      this.page = 1;
      this.$nextTick(function () { // 解决修改分页后视图不更新的问题  强制刷新分页组件
        this.paginationShow = true;
      });
      this.getMinerList();
    },
    changeSortEvent(obj) { // 矿机列表排序事件
      console.log(obj);
      this.paginationShow = false;
      if (obj.prop) {
        switch (obj.prop) { // 矿机列表排序字段
          case 'clientCode':
            this.millSortClass = 1;
            break;
          case 'volume':
            this.millSortClass = 2;
            break;
          case 'createTime':
            this.millSortClass = 3;
            break;
          case 'maxVolume':
            this.millSortClass = 4;
            break;
          case 'dropVolume':
            this.millSortClass = 5;
            break;
          default:
            this.millSortClass = 3;
        }
      } else {
        this.millSortClass = 3;
      }
      if (obj.order) { // 矿机列表列表升序降序
        switch (obj.order) {
          case 'ascending':
            this.millSortType = 0;
            break;
          case 'descending':
            this.millSortType = 1;
            break;
          default:
            this.millSortType = 1;
        }
      } else {
        this.millSortType = 1;
      }
      this.page = 1;
      this.$nextTick(function () { // 解决修改分页后视图不更新的问题  强制刷新分页组件
        this.paginationShow = true;
      });
      this.getMinerList(); // 获取矿机列表
    },
    getMinerList() { // 获取矿机列表
      const data = {
        mineType: this.mineType,
        page: this.page,
        pageSize: 20,
        sortField: this.millSortClass,
        sortType: this.millSortType,
        queryType: this.selectType,
      };
      if (this.readOnly) {
        data.apiKey = this.apiKey;
      }
      this.$api.myMinerList(data).then(res => {
        console.log('我的矿机', res);
        if (res) {
          this.myMinerListData = res;
          this.millCount = res.total;
        }
      }).catch(err => {
        console.log('我的矿机错误', err);
      });
    },
    millManageCurrentChange(val) {
      if (this.page == val) { // 解决点击上一页和下一页发送两次请求的问题
        return;
      }
      this.page = val;
      this.getMinerList();
    },
    millManagePrevPage() {
      this.page -= 1;
      this.getMinerList();
    },
    millManageNextPage() {
      this.page += 1;
      this.getMinerList();
    },
    userDeleteMill() { // 删除矿机
      console.log('删除数据', this.multipleSelection);
      if (this.multipleSelection.length) {
        const data = {
          mineType: this.mineType,
          list: this.multipleSelection,
        };
        this.$api.deleteMiner(data).then(res => {
          this.$toast('删除成功');
          this.myMinerListData = {};
          this.page = 1;
          this.getMinerList(); // 更新矿机列表
          this.$emit('updateMierInfo');
        }).catch(err => {
          console.log('参数数据出错', err);
        });
      } else {
        this.$toast('请选择要删除的矿机！');
      }
    },
    userRefreshMill(id) { // 刷新矿机
      const data = {
        mineType: this.mineType,
        id: id,
      };
      this.$api.refreshMiner(data).then(res => {
        this.myMinerListData = {};
        this.page = 1;
        this.getMinerList(); // 更新矿机列表
        if (!this.readOnly) {
          this.$emit('updateMierInfo');
        }
      }).catch(err => {
        console.log('参数数据出错', err);
      });
    },
  },
  created() { // 生命周期 - 创建完成
    this.getMinerList();
  },
  mounted() { // 生命周期 - 挂载完成

  },
  beforeCreate() { }, // 生命周期 - 创建之前
  beforeMount() { }, // 生命周期 - 挂载之前
  beforeUpdate() { }, // 生命周期 - 更新之前
  updated() { }, // 生命周期 - 更新之后
  beforeDestroy() { }, // 生命周期 - 销毁之前
  destroyed() { }, // 生命周期 - 销毁完成
  activated() { }, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang="less">
.myMillPage.millManageModule {
  .el-table .cell {
    @font-xs();
    font-weight: 400;
    color: #666;
    line-height: 0.42rem;
    // text-align: center;
  }
  .el-table .el-table__row--striped {
    background: #ededed;
  }
  .el-table__header-wrapper {
    margin-top: 0.32rem;
  }
  .el-table th {
    height: 0.8rem;
    .cell {
      @font-m();
      font-weight: 400;
      color: #383838;
      // line-height: 0.42rem;
      // text-align: center;
    }
  }
  .el-table {
    .el-table__body-wrapper {
      min-height: 6rem;
    }
    td {
      padding: 0;
      height: 0.6rem;
    }
  }
  .el-table tr td:first-child,
  .el-table tr th:first-child {
    padding-left: 0rem;
  }
  .el-checkbox__inner {
    width: 18px;
    height: 18px;
    border-color: #999;
    &::after {
      width: 4px;
      height: 8px;
      left: 6px;
      top: 2px;
    }
  }
  .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
    top: 7px;
    height: 3px;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #64ea49;
    border-color: #64ea49;
  }
  .el-input__inner {
    border-radius: 0;
    @font-m();
    background-color: #ededed;
    @media (max-width: 768px) {
      height: 0.8rem;
      line-height: 0.8rem;
    }
  }
  .el-select .el-input.is-focus .el-input__inner {
    border-color: #dcdfe6;
  }
  .el-select .el-input__inner:focus {
    border-color: #dcdfe6;
  }
  .el-table th.is-leaf .cell {
    color: @color-main;
  }
}
</style>


<style lang="less" scoped>
//@import url(); 引入公共css类
.myMillPage.millManageModule {
  background: @color-default;
  overflow: hidden;
  .headerTitleBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 0.72rem;
    padding: 0 0.5rem;
    border-bottom: 1px solid #eeeeee;
    @media (max-width: 768px) {
      height: 0.8rem;
    }
    .headerTitle {
      @font-l();
      font-weight: bold;
    }
    .activeBox {
      display: flex;
      align-items: center;
      .userSelectBox {
        display: flex;
        padding: 0.04rem 0.05rem;
        background: rgba(239, 243, 255, 1);
        border-radius: 0.04rem;
        margin-right: 0.2rem;
        @pointer();
        color: @color-main;
        .userSelectItem {
          width: 0.6rem;
          height: 0.28rem;
          @allCenter();
          transition: all 0.26s;
          @font-s();
          &.act {
            color: #fff;
            background: @color-main;
            border-radius: 0.04rem;
          }
        }
      }
      .userDeleteBtn {
        @allCenter();
        width: 0.4rem;
        height: 0.4rem;
        background: #fb6565;
        margin-right: 0.2rem;
        cursor: pointer;
        @media (max-width: 768px) {
          width: 0.8rem;
          height: 0.8rem;
        }
        .deleteBtn {
          color: @color-default;
          font-size: 0.18rem;
        }
      }
    }
  }
  .footerPagination {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.3rem 0;
    background: @color-default;
  }
  .tableBox {
    .minerOnlineStatus {
      display: inline-block;
      position: relative;
      color: #333;
      @font-m();
      padding-left: 0.22rem;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -0.05rem;
        width: 0.1rem;
        height: 0.1rem;
        background: #47e44a;
        border-radius: 50%;
      }
    }
    .minerOutlineStatus {
      display: inline-block;
      position: relative;
      color: #333;
      @font-xs();
      padding-left: 0.22rem;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -0.05rem;
        width: 0.1rem;
        height: 0.1rem;
        background: #fb6565;
        border-radius: 50%;
      }
    }
    .refreshBtn {
      font-size: 0.2rem;
      cursor: pointer;
      &:hover {
        color: #5cb6ff;
      }
    }
  }
}
</style>
