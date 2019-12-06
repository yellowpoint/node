<!-- 模块名称 -->
<template>
  <div class="poolDetail">
    <text-element
      class="poolDetailitem"
      textName="全网容量"
      iconName="iconweibiaoti-"
    >
      {{ poolInfo.netcapacity || 0 }} PB
    </text-element>

    <text-element
      class="poolDetailitem"
      textName="在线矿工"
      iconName="iconzaixiankuanggong"
    >
      {{ poolInfo.minerOnlineCount || 0 }}
    </text-element>

    <text-element
      class="poolDetailitem"
      textName="24小时收益均值"
      iconName="iconjijingaikuang"
    >
      {{ poolInfo.coinSize || 0 }} {{ units }}/PB
    </text-element>

    <text-element
      class="poolDetailitem"
      textName="24小时爆块"
      iconName="iconxiaoshibaokuai"
    >
      {{ poolInfo.coinCount || 0 }}
    </text-element>

    <text-element
      class="poolDetailitem"
      textName="矿池容量"
      iconName="iconkuangchirongliang"
    >
      {{ poolInfo.volume || 0 }} PB
    </text-element>

    <text-element
      class="poolDetailitem"
      textName="在线矿机"
      iconName="iconzaixiankuangji"
    >
      {{ poolInfo.mineOnlineCount || 0 }}
    </text-element>
  </div>
</template>

<script>
import textElement from './textElement';

export default {
  name: '',
  components: {
    textElement,
  },
  props: {
    units: {
      type: String,
      default: '',
    },
    poolInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
  computed: {
    // 组件计算属性
  },
  watch: {
    // 组件监听事件
  },
  methods: {
    // 组件方法
  },
  created() {
    // 生命周期 - 创建完成
    console.log('poolInfo', this.poolInfo);
  },
  mounted() {
    // 生命周期 - 挂载完成
  },
  beforeCreate() {
    // 生命周期 - 创建之前
  },
  beforeMount() {
    // 生命周期 - 挂载之前
  },
  tbeforeUpdate() { }, // 生命周期 - 更新之前
  updated() { }, // 生命周期 - 更新之后
  beforeDestroy() { }, // 生命周期 - 销毁之前
  destroyed() { }, // 生命周期 - 销毁完成
  activated() { }, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.poolDetail {
  display: flex;
  flex-wrap: wrap;
  padding-left: 0.7rem;
  .poolDetailitem {
    width: 50%;
  }
}
</style>
