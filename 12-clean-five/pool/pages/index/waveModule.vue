<!-- 模块名称 -->
<template>
  <div class="waveModule">
    <div class="waveContent">
      <canvas id="myCanvas" class="myCanvas">
        您的浏览器不支持 HTML5 canvas 标签。
      </canvas>
      <!-- <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="waveItems" id="svgItem">
        <g fill="rgba(178,184,255, 1.0)">
          <path d="M 0 70 Q 200 20 400 0 T 900 70 T 1000 0 V 100 H 0 V 0" id="svgPath"></path>
          <animateTransform attributeName="transform" attributeType="XML" type="translate" from="0" :to="svgWidth" dur="30s" repeatCount="indefinite"></animateTransform>
        </g>
        <g fill="rgba(67,135,255, 1.0)">
          <path d="M 0 70 Q 87.5 47, 175 70 T 350 70 T 525 70 T 700 70 T 875 70 T 1050 70 V 100 H 0 V 0"></path>
          <animateTransform attributeName="transform" attributeType="XML" type="translate" from="0" :to="svgWidth" dur="6s" repeatCount="indefinite"></animateTransform>
        </g>
        <g fill="rgba(36,106,255, 1.0)" transform="translate(-903.868 0)">
          <path d="M 0 70 Q 135 36, 270 70 T 540 70 T 810 70 T 1080 70 T 1350 70 T 1620 70 V 100 H 0 V 0" transform="translate(-38.232284367796474, 0)"></path>
          <animateTransform attributeName="transform" attributeType="XML" type="translate" from="0" :to="svgWidth" dur="4s" repeatCount="indefinite"></animateTransform>
        </g>
      </svg> -->
      <!-- <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="200">
        <g fill="rgba(106,127,239,0.1)">
          <path d="M 0 70 Q 75 39, 150 70 T 300 70 T 450 70 T 600 70 T 750 70 V 100 H 0 V 0"></path>
          <animateTransform attributeName="transform" attributeType="XML" type="translate" from="0" to="-300" dur="1.5s" repeatCount="indefinite"></animateTransform>
        </g>
        <g fill="rgba(106,127,239,0.15)">
          <path d="M 0 70 Q 87.5 47, 175 70 T 350 70 T 525 70 T 700 70 T 875 70 T 1050 70 V 100 H 0 V 0"></path>
          <animateTransform attributeName="transform" attributeType="XML" type="translate" from="0" to="-350" dur="3s" repeatCount="indefinite"></animateTransform>
        </g>
        <g fill="rgba(106,127,239,0.18)" transform="translate(-903.868 0)">
          <path d="M 0 70 Q 135 36, 270 70 T 540 70 T 810 70 T 1080 70 V 100 H 0 V 0" transform="translate(-38.232284367796474, 0)"></path>
          <animateTransform attributeName="transform" attributeType="XML" type="translate" from="0" to="-540" dur="2s" repeatCount="indefinite"></animateTransform>
        </g>
      </svg> -->
      <!-- <div class="waveItem"></div>
      <div class="waveItem1"></div>
      <div class="waveItem2"></div> -->
      <!-- <div class="waveItem3"></div>
      <div class="waveItem4"></div> -->
    </div>
  </div>
</template>

<script>

// import templateName from 'path';
export default {
  name: '',
  components: {},
  data() {
    return {
      svgWidth: 0,
      svgPath: 0,
      d1: '',
    };
  },
  computed: { // 组件计算属性

  },
  watch: { // 组件监听事件

  },
  methods: { // 组件方法
    initCanvas() {
      const c = document.getElementById('myCanvas');
      const ctx = c.getContext('2d');
      ctx.width = 2000;
      ctx.height = 624;
      ctx.moveTo(0, 0);
      // ctx.beginPath();
      ctx.quadraticCurveTo(200, 140, 600, 60);
      ctx.stroke();
      // ctx.fillStyle = '#f00';
      // ctx.fillRect(0, 0, 150, 75);
    },
  },
  created() { // 生命周期 - 创建完成

  },
  mounted() { // 生命周期 - 挂载完成
    this.initCanvas();
  },
  beforeCreate() { // 生命周期 - 创建之前

  },
  beforeMount() { // 生命周期 - 挂载之前

  },
  tbeforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang="less" scoped>
  //@import url(); 引入公共css类
.waveModule{
  width: 100%;
  height: 6.24rem;
  .waveContent{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .myCanvas{
    }
    .waveItems{
      width: 100%;
      height: 100%;
    }
    .waveItem{
      position: absolute;
      left: 15%;
      bottom: 1.5rem;
      width: 28rem;
      height: 28rem;
      background: #b2b8ff;
      border-radius: 45%;
      animation: cwrotate 15.0s linear infinite;
    }
    .waveItem1{
      position: absolute;
      width: 28rem;
      height: 28rem;
      left: 18%;
      bottom: 2.0rem;
      background: #3f81ff;
      animation-delay: 0.2s;
      border-radius: 45%;
      animation: cwrotate 15.0s linear infinite;
    }
    .waveItem2{
      position: absolute;
      width: 28rem;
      height: 28rem;
      left: 30%;
      bottom: 2.2rem;
      background: #2065ff;
      animation-delay: 0.4s;
      border-radius: 45%;
      animation: cwrotate 15.0s linear infinite;
    }
    .waveItem3{
      position: absolute;
      z-index: 1;
      width: 28rem;
      height: 28rem;
      right: -100%;
      bottom: 70%;
      background: #2065ff;
      animation-delay: 0.6s;
      border-radius: 45%;
      animation: cwrotate 15.0s linear infinite;
    }
    .waveItem4{
      position: absolute;
      width: 28rem;
      height: 28rem;
      right: -90%;
      top: 30%;
      background: #fff;
      animation-delay: 0.8s;
      border-radius: 45%;
      animation: ihrotate 15.0s linear infinite;
    }
  }
  @keyframes cwrotate {
    0% {transform: translate(-50%, 0) rotateZ(0deg);}
    50% {transform: translate(-50%, -2%) rotateZ(-180deg);}
    100% {transform: translate(-50%, 0%) rotateZ(-360deg);}
  }
  @keyframes ihrotate {
    0% {transform: translate(-50%, 0) rotateZ(0deg);}
    50% {transform: translate(-50%, -2%) rotateZ(180deg);}
    100% {transform: translate(-50%, 0%) rotateZ(360deg);}
  }
}
</style>

