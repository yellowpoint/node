<!-- 观察者页面 -->
<template>
  <div class="content observerPage">
    <div class="op_header">
      <div class="op_header_tips">
        <i class="iconfont iconxianshi"></i>
        <p>观察模式</p>当前为观察者只读链接
      </div>
      <div class="op_header_name">{{observerUserInfo.nickname}}</div>
    </div>

    <VPoolTable
      :pool_table_thead_list="pool_table_thead_list"
      :pool_table_item_list="pool_table_item_list"
      :pool_table_thead_list_data="pool_table_thead_list_data"
      :isLoading="isLoading"
    >
      <template #default="slotProps">
        <observer
          :tableItem="slotProps.tableItem"
          :poolData="poolData"
          :apiKey="apiKey"
        ></observer>
      </template>
    </VPoolTable>
  </div>
</template>

<script>
import observer from './observer';

export default {
  name: 'observerPage',
  components: {
    observer,
  },
  data() {
    return {
      apiKey: '', // 观察者的key
      observerUserInfo: {}, // 观察者页面用户信息
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
  computed: { // 组件计算属性
    pool_table_item_list() {
      return this.$store.getters.mineTypeList.millmgr;
    },
  },
  watch: { // 组件监听事件

  },
  created() { // 生命周期 - 创建完成
    this.apiKey = this.$route.params.key;
    this.init(); // 初始化
  },
  mounted() { // 生命周期 - 挂载完成

  },
  methods: { // 组件方法
    init() { // 获得key后在初始化
      this.getObserverUserInfo();
      this.pool_table_item_list.forEach(item => {
        this.getHeader(item);
      });
    },
    // 获取顶部信息
    async getHeader({ key: mineType, name }) {
      const res = await this.$api.mineOnline({ mineType, apiKey: this.apiKey });
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
    async getObserverUserInfo() { // 获取矿机信息
      this.observerUserInfo = await this.$api.getMineObserverUserId({ apiKey: this.apiKey });
    },

  },

};
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.observerPage {
  .op_header {
    position: relative;
    width: 100%;
    height: 1.26rem;
    margin-bottom: 0.2rem;
    border-radius: 0.1rem;
    background: url(~@/assets/images/millManage/observerPage.png) no-repeat;
    background-size: 100%;
    .op_header_tips {
      position: absolute;
      top: 0.3rem;
      left: 0.4rem;
      display: flex;
      align-items: center;
      @font-s();
      color: #fff;
      i {
        font-size: 0.2rem;
      }
      p {
        @font-l();
        font-weight: bold;
        margin: 0 0.1rem;
      }
    }
    .op_header_name {
      @allCenter();
      height: 100%;
      color: @color-default;
      font-size: 0.3rem;
      font-weight: bold;
    }
  }
}
</style>
