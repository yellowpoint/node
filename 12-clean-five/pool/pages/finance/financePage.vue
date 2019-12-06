<!-- 理财 增值中心 -->
<template>
  <div>
    <VParticles></VParticles>
    <div class="financePage content">
      <VPoolTable
        :pool_table_item_list="pool_table_item_list"
        :pool_table_thead_list="pool_table_thead_list"
        :pool_table_thead_list_data="pool_table_thead_list_data"
        :isLoading="isLoading"
      >
        <template #default="slotProps">
          <finance :tableItem="slotProps.tableItem"></finance>
        </template>
      </VPoolTable>
    </div>
  </div>

</template>

<script>
import commonMixins from '@/mixins/common';
import finance from './finance';

export default {
  name: '',
  mixins: [commonMixins],
  components: {
    finance,
  },
  props: {
    prop: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isLoading: true,

      // table的头部文案
      pool_table_thead_list: ['币种', '累计投放额度', '累计收益', '昨日总收益'],
      // table未展开时的简要数据
      pool_table_thead_list_data: {},
    };
  },
  computed: {
    pool_table_item_listObj() {
      return this.$store.getters.mineTypeList;
    },
    // 币种列表
    pool_table_item_list() {
      return this.pool_table_item_listObj.addval;
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
      const res = await this.$api.getAppreciation({ mineType });
      const aHeader = [];
      aHeader.push(`${name}`);
      aHeader.push(`${res.putAmount || 0} ${name}`);
      aHeader.push(`${this.$common.toDecimal(res.accumulateEarnings || 0)} ${name}`);
      aHeader.push(`${this.$common.toDecimal(res.yesterdayEarnings || 0)} ${name}`);
      this.$set(this.pool_table_thead_list_data, mineType, aHeader);
      this.isLoading = false;
    },


  },
};
</script>

<style lang='less' scoped>
.financePage {
  position: relative;
  z-index: 3000;
}
</style>
