<!-- 矿机管理 -->
<template>
  <div class="millManagePage content">
    <VPoolTable
      :pool_table_thead_list="pool_table_thead_list"
      :pool_table_item_list="pool_table_item_list"
      :pool_table_thead_list_data="pool_table_thead_list_data"
      :isLoading="isLoading"
    >
      <template #default="slotProps">
        <millManage :tableItem="slotProps.tableItem"></millManage>
      </template>
    </VPoolTable>
  </div>
</template>

<script>
import commonMixins from '@/mixins/common';
import millManage from './millManage';

export default {
  name: '',
  mixins: [commonMixins],
  components: {
    millManage,
  },
  provide() {
    return { provideData: this.$data, provideThis: this };
  },
  props: {
    prop: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isLoading: true,
      // table的头部文案
      pool_table_thead_list: ['币种', '所在矿池', '在线矿机', '离线矿机', '矿机容量'],
      // table未展开时的简要数据
      pool_table_thead_list_data: {},
      // 展开的币种
      pool_table_detail_show: '',
      //  矿池相关的数据
      poolData: {},

    };
  },
  computed: {
    // 币种列表
    pool_table_item_list() {
      return this.$store.getters.mineTypeList.millmgr;
    },
  },
  created() {
    this.init();
  },
  mounted() {

  },
  methods: {
    init() {
      this.pool_table_item_list.forEach(item => {
        this.getHeader(item);
      });
    },
    // 获取顶部信息
    async getHeader({ key: mineType, name }) {
      const res = await this.$api.mineOnline({ mineType });
      const aHeader = [];
      // 如果key中包含eco则为生态池
      const pool = /eco/i.test(mineType) ? '生态池' : '主矿池';
      aHeader.push(`${name}`);
      aHeader.push(`${pool}`);
      aHeader.push(`${res.mineOnline || 0}`);
      aHeader.push(`${res.mineOffline || 0}`);
      aHeader.push(`${res.volume || 0} TB`);

      this.$set(this.pool_table_thead_list_data, mineType, aHeader);
      this.$set(this.poolData, mineType, res);
      this.isLoading = false;
    },

  },
};
</script>

<style lang='less' scoped>
</style>
