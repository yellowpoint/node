<!--矿机管理-->
<template>
  <div class="millManage">
    <!-- 矿机在线T数模块 -->
    <div class="moduleBox">
      <echartsModule></echartsModule>
    </div>
    <!-- 绑定查询模块 -->
    <div class="moduleBox">
      <bindingQuery></bindingQuery>
    </div>
    <!-- 矿机管理模块 -->
    <div class="moduleBox">
      <millManageModule @updateMierInfo="getMineOnline()"></millManageModule>
    </div>
  </div>
</template>

<script>

import echartsModule from './echartsModule';
import millManageModule from './millManageModule';
import bindingQuery from './bindingQuery';

export default {
  name: 'millManage',
  mixins: [],
  provide() {
    return {
      tableItem: this.tableItem,
    };
  },
  inject: ['provideThis'],
  components: {
    echartsModule,
    millManageModule,
    bindingQuery,

  },
  props: {
    tableItem: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {

    };
  },
  computed: {
    mineType() { // 币种
      return this.tableItem.key;
    },
  },
  watch: {},
  created() {
  },
  mounted() {
  },
  destroyed() { },
  methods: {
    getMineOnline() { // 获取矿机信息
      this.provideThis.getHeader(this.tableItem);
    },
  },
};
</script>

<style lang="less" scoped>
.millManage {
  @media (max-width: 768px) {
    width: 94%;
    margin: 0 auto;
  }
  .moduleBox {
    border-bottom: 0.1rem solid #eeeeee;
  }
}
</style>
