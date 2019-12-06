<!-- 粒子效果组件 -->
<template>
  <transition name="fade2">
    <div
      class="VParticles"
      v-show="isShow"
    >
      <div id="particles"></div>
    </div>
  </transition>
</template>

<script>
import ResizeObserver from 'resize-observer-polyfill';
import EventBus from '@/utils/eventBus';
import '@/utils/lib/particles.min.js';
import particlesConfig from './particles.json';

export default {
  name: '',
  components: {

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
      isShow: true,
    };
  },
  computed: {

  },
  created() {

  },
  mounted() {
    this.init();
    this.change();
  },
  methods: {
    init(config = particlesConfig) {
      // eslint-disable-next-line no-undef
      particlesJS('particles', config);
    },
    change() {
      EventBus.$on('changeMine', (tableItem) => {
        if (this.$route.path != '/finance') { return; }
        this.isShow = false;
        const newConfig = this.$common.cloneDeep(particlesConfig);
        if (tableItem) {
          newConfig.particles.shape.image.src = tableItem.icon;
          newConfig.particles.shape.type = 'image';
          // 延时显示，是因为粒子画布在变化的时候会抖动拉扯
        }
        setTimeout(() => {
          this.init(newConfig);
          this.isShow = true;
        }, 300);
      });
      // 防抖一下
      const resize = this.$common.debounce(() => {
        window.dispatchEvent(new Event('resize'));
      }, 500);

      // 监听粒子画布的高度变化，变化后都要重新更新一次，否则会画布会拉伸
      const ro = new ResizeObserver((entries, observer) => {
        // 触发resize，让particles更新视图
        // 由于该插件没有暴露更新的方法，又发现它会检测resize,故这么做
        resize();
      });

      ro.observe(document.getElementById('particles'));
    },
  },
};
</script>

<style lang='less' scoped>
#particles {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: #f6f9fc;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
.fade2-enter-active {
  transition: opacity 0.5s;
}
.fade2-enter {
  opacity: 0;
}
</style>
