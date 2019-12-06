<!--矿机管理-->
<template>
  <div class="observer">
    <div class="moduleBox">
      <observerInfo
        :tableItem="tableItem"
        :poolData="poolData"
      ></observerInfo>
    </div>
    <!-- 矿机在线T数模块 -->
    <div class="moduleBox">
      <echartsModule
        :selectTrData="tableItem"
        :apiKey="apiKey"
      ></echartsModule>
    </div>
    <!-- 矿机管理模块 -->
    <div class="moduleBox">
      <millManageModule
        :readOnly="true"
        :apiKey="apiKey"
      ></millManageModule>
    </div>
  </div>
</template>

<script>

import echartsModule from '@/pages/millManage/echartsModule';
import millManageModule from '@/pages/millManage/millManageModule';
import observerInfo from './observerInfo';

export default {
  name: 'observer',
  mixins: [],
  provide() {
    return {
      tableItem: this.tableItem,
    };
  },
  components: {
    echartsModule,
    millManageModule,
    observerInfo,
  },
  props: {
    tableItem: {
      type: Object,
      default: () => ({}),
    },
    poolData: {
      type: Object,
      default: () => ({}),
    },
    apiKey: {
      type: String,
      default: '',
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
  },
};
</script>

<style lang="less" scoped>
.observer {
  @media (max-width: 768px) {
    width: 94%;
    margin: 0 auto;
  }
  .moduleBox {
    border-bottom: 0.1rem solid #eeeeee;
  }
}
</style>
