<!-- 公告 -->
<template>
  <div class="affichePage content">
    <div class="affichePageContent">
      <affiche-module :pageSize="10" :showMore="false"></affiche-module>
    </div>
  </div>
</template>

<script>
// import templateName from 'path';
import afficheModule from 'components/afficheModule/afficheModule';

export default {
  name: '',
  components: {
    afficheModule,
  },
  data() {
    return {
      afficheData: {},
      noticePage: 1,
    };
  },
  computed: {}, // 组件计算属性
  watch: {}, // 组件监听事件
  methods: { // 组件方法
  },
  created() { // 生命周期 - 创建完成
  },
  mounted() { // 生命周期 - 挂载完成

  },
  beforeCreate() {
  },
  beforeMount() { }, // 生命周期 - 挂载之前
  beforeUpdate() { }, // 生命周期 - 更新之前
  updated() { }, // 生命周期 - 更新之后
  beforeDestroy() { // 生命周期 - 销毁之前
  },
  destroyed() { }, // 生命周期 - 销毁完成
  activated() { }, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.affichePage {
  position: relative;
  z-index: 2;
  @content();

  @media (max-width: 768px) {
    margin-top: 0.2rem;
    padding: 0.2rem;
  }
  .affichePageContent {
    background: @color-default;
  }
}
</style>
