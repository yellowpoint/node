<!-- 开关按钮 -->
<template>
  <div
    class="switchBtn"
    @click="switchStatus"
    :style="bgStyle"
  >
    <div class="item">
      <div
        v-if="showRatio"
        class="ratio"
      >{{text.borrowRatio}}%</div>{{text.openText}}
    </div>
    <div class="item">
      <div
        v-if="showRatio"
        class="ratio"
      >{{text.walletRatio}}%</div>{{text.closeText}}
    </div>
    <div
      class="topItem"
      :style="isOpen ? 'left: 2px; margin: 0;' : 'left: 50%; margin-left: -2px;'"
    >
      <div
        v-if="showRatio"
        class="ratioSelects"
      >{{isOpen ? text.borrowRatio : text.walletRatio}}%</div>{{isOpen ? text.openText : text.closeText}}
    </div>
  </div>
</template>

<script>
// import templateName from 'path';
export default {
  name: 'switchBtn',
  components: {},
  props: {
    showRatio: {
      type: Boolean,
      default: false,
    },
    text: { // 文本信息
      type: Object,
      default: () => ({
        openText: '',
        closeText: '',
        borrowRatio: '20',
        walletRatio: '80',
      }),
    },
    selectStyle: { // 上层选中样式
      type: Object,
      default: () => ({}),
    },
    bgStyle: { // 下层样式
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isOpen: true,
    };
  },
  computed: { // 组件计算属性

  },
  watch: { // 组件监听事件

  },
  methods: { // 组件方法
    switchStatus() { // 切换
      this.isOpen = !this.isOpen;
      this.$emit('tap', this.isOpen);
    },
  },
  created() { // 生命周期 - 创建完成

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

<style lang="less" scoped>
//@import url(); 引入公共css类
.switchBtn {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  min-width: 0.88rem;
  min-height: 0.26rem;
  font-size: 0.14rem;
  color: #262932;
  background: @color-main;
  border-radius: 0.2rem;
  padding: 0 !important;
  cursor: pointer;
  .item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 !important;
    border-radius: 0.2rem;
    .ratio {
      @allCenter();
      height: 0.18rem;
      padding: 0 0.08rem;
      color: @color-main;
      border: 1px solid @color-main;
      border-radius: 0.09rem;
      margin-right: 0.06rem;
    }
  }
  .topItem {
    position: absolute;
    left: 2px;
    top: 2px;
    bottom: 2px;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: @color-main;
    background: @color-default;
    transition: left 0.2s linear;
    border-radius: 0.2rem;
    padding: 0 !important;
    .ratioSelects {
      @allCenter();
      height: 0.18rem;
      padding: 0 0.08rem;
      color: #262932;
      border-radius: 0.09rem;
      margin-right: 0.06rem;
      background: #eff3ff;
    }
  }
}
</style>
