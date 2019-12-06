<!-- 模块名称 -->
<template>
  <div class="textElement">
    <i class="icon iconfont poolIcon" :class="iconName"></i>
    <div>
      <div class="name">{{textName}}</div>
      <div class="count">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>

// import templateName from 'path';
export default {
  name: '',
  components: {},
  props: {
    textName: {
      type: String,
      default: '',
    },
    iconName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {

    };
  },
  computed: { // 组件计算属性

  },
  watch: { // 组件监听事件

  },
  methods: { // 组件方法

  },
  created() { // 生命周期 - 创建完成

  },
  mounted() { // 生命周期 - 挂载完成

  },
};
</script>

<style lang="less" scoped>
  //@import url(); 引入公共css类
  .textElement{
    display: flex;
    align-items: center;
    .name{
      @font-s();
      color: @color-font-light;
      font-weight: 400;
    }
    .count{
      @font-l();
      color: @color-font-light;
      font-weight: 600;
    }
    .poolIcon{
      font-size: 0.34rem;
      color: @color-main;
      margin-right: 0.16rem;
    }
  }
</style>

