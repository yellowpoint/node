<!-- 理财 增值中心 -->
<!-- 只有bhd的活期宝可用借入2019年12月5日15:28:07 -->
<template>
  <div class="finance">
    <financePeriod @update="update"></financePeriod>
    <financeCoo
      v-if="financeCoo_show"
      @update="update"
    ></financeCoo>
    <financeBorrow @update="update"></financeBorrow>
  </div>
</template>

<script>
import commonMixins from '@/mixins/common';
import financePeriod from './financePeriod';
import financeCoo from './financeCoo';
import financeBorrow from './financeBorrow';

export default {
  name: '',
  mixins: [commonMixins],
  components: {
    financePeriod,
    financeCoo,
    financeBorrow,
  },
  provide() {
    return {
      tableItem: this.tableItem,
      finance_this: this,
    };
  },
  props: {
    tableItem: {
      type: Object,
      default: () => ({}),
    },
    pool_table_thead_list_data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      financeCoo_show: this.tableItem.key != 'xhd',
      financeUserInfo: {},
    };
  },
  computed: {

  },
  created() {
    this.getUserInfoFreedom();
  },
  mounted() {

  },
  methods: {
    getUserInfoFreedom() { // 获取增值专区账户信息
      this.$api.getUserInfoFreedom({ mineType: this.tableItem.key }).then(res => {
        if (res.borrowAmount < 0) {
          res.borrowAmount = 0;
        }
        this.financeUserInfo = res;
        console.log('活期宝账户信息', res);
      }).catch(err => {
        console.log('活期宝账户信息出错', err);
      });
    },
    update() {
      this.getUserInfoFreedom();
    },
  },
};
</script>

<style lang='less' scoped>
</style>
