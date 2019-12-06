<!-- 我的首页 -->
<template>
  <div class="myHome content">
    <VPoolTable
      :pool_table_item_list="pool_table_item_list"
      :pool_table_thead_list="pool_table_thead_list"
      :pool_table_thead_list_data="pool_table_thead_list_data"
      :isLoading="isLoading"
    >
      <template #default="slotProps">
        <myHomeDetail
          :tableItem="slotProps.tableItem"
          :profitData="profitData"
          @updateData="getHeader"
        ></myHomeDetail>
      </template>
    </VPoolTable>
  </div>
</template>

<script>
import myHomeDetail from './myHomeDetail';

export default {
  name: '',
  components: {
    myHomeDetail,
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
      pool_table_thead_list: ['币种', '充值余额', '借入余额', '今日挖矿收益', '昨日增值收益'],
      // table未展开时的简要数据
      pool_table_thead_list_data: {},
      profitData: {},
    };
  },
  computed: {
    // 币种列表
    pool_table_item_list() {
      return this.$store.getters.mineTypeList.home;
    },
  },
  created() {

  },
  mounted() {
    this.pool_table_item_list.forEach(item => {
      this.getHeader(item);
    });
  },
  methods: {
    // 获取顶部信息
    async getHeader({ key: mineType, name }) {
      const res = await this.$api.homepageProfit({ mineType });
      const aHeader = [];
      aHeader.push(`${name}`);
      aHeader.push(`${this.$common.toDecimal(res.coin)} ${name}`);
      aHeader.push(`${this.$common.toDecimal(res.borrowCoin)} ${name}`);
      aHeader.push(`${this.$common.toDecimal(res.todayProfit)} ${name}`);
      aHeader.push(`${this.$common.toDecimal(res.incrementProfit)} ${name}`);
      this.$set(this.pool_table_thead_list_data, mineType, aHeader);
      this.$set(this.profitData, mineType, res);
      this.isLoading = false;
    },


  },
};
</script>

<style lang='less' scoped>
.myHome {
  margin-top: 0.1rem;
}
</style>
