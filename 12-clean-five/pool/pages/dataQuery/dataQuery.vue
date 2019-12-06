<!-- 数据查询 -->
<template>
  <div class="dataQuery">
    <div class="queryContent">
      <div class="tableMolude">
        <VPoolTable
          :pool_table_item_list="pool_table_item_list"
          :pool_table_thead_list="pool_table_thead_list"
          :pool_table_thead_list_data="pool_table_thead_list_data"
          :isLoading="false"
          :width="[200]"
        >
          <template #default="slotProps">
            <list-table
              :tableItem="slotProps.tableItem"
            >
            </list-table>
          </template>
        </VPoolTable>
      </div>
    </div>
  </div>
</template>

<script>

import listTable from './listTable';
import commonMixins from '@/mixins/common';

export default {
  name: '',
  mixins: [commonMixins],
  components: {
    listTable,
  },
  data() {
    return {
      pool_table_thead_list: ['币种'],
      pool_table_thead_list_data: {},
      // tableData: {
      //   home: [
      //     {
      //       name: 'BHD',
      //       key: 'bhd',
      //     },
      //     {
      //       name: 'HDD',
      //       key: 'hdd',
      //     },
      //   ],
      // },
    };
  },
  computed: { // 组件计算属性
    pool_table_item_list() {
      return this.$store.getters.mineTypeList.home;
    },
  },
  watch: { // 组件监听事件

  },
  methods: { // 组件方法
  },
  created() { // 生命周期 - 创建完成

  },
  mounted() { // 生命周期 - 挂载完成
    this.pool_table_item_list.forEach(({ key: mineType, name }) => {
      const aHeader = [];
      aHeader.push(`${name}`);
      this.$set(this.pool_table_thead_list_data, mineType, aHeader);
    });
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
.dataQuery {
  .el-table {
    .el-table__header-wrapper {
      th {
        color: @color-font-default;
      }
    }
    .el-table__body-wrapper {
      th {
        color: @color-font-default;
      }
    }
  }
}
</style>

<style lang="less" scoped>
//@import url(); 引入公共css类
@import url("./dataQuery.less");
</style>

