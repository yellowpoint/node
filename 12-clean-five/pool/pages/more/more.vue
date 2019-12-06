<!-- 更多 -->
<template>
  <div class="moreModule">
    <div class="headerBanner">帮助中心</div>
    <div class="moreContent">
      <div class="navBox">
        <ul class="nav">
          <li
            :class="index==activeIndex ? 'navItem active' : 'navItem'"
            v-for="(item, index) in navData"
            :key="index"
            @click="tabNav(item, index)"
          >
            {{item.name}}
          </li>
        </ul>
      </div>
      <div class="moduleContent">
        <issue-module v-show="activeIndex==0"></issue-module>
        <tools-module v-show="activeIndex==1"></tools-module>
        <affiche-module v-show="activeIndex==2"></affiche-module>
        <mining-course v-show="activeIndex==3"></mining-course>
      </div>
    </div>
  </div>
</template>

<script>
// import templateName from 'path';
import issueModule from './issueModule';
import toolsModule from './toolsModule';
import afficheModule from './afficheModule';
import miningCourse from './miningCourse';

export default {
  name: '',
  components: {
    issueModule,
    toolsModule,
    afficheModule,
    miningCourse,
  },
  data() {
    return {
      activeIndex: 0,
      navData: [
        {
          name: '常见问题',
          active: true,
        },
        {
          name: '工具下载',
          active: false,
        },
        {
          name: '新闻公告',
          active: false,
        },
        {
          name: '挖矿教程',
          active: false,
        },
      ],
    };
  },
  computed: { // 组件计算属性

  },
  watch: { // 组件监听事件

  },
  methods: { // 组件方法
    tabNav(val, index) { //  菜单切换
      this.navData.forEach(item => {
        item.active = false;
      });
      val.active = true;
      this.activeIndex = index;
    },
  },
  created() { // 生命周期 - 创建完成
    if (this.$route.params.index) {
      this.activeIndex = this.$route.params.index;
    }
  },
  mounted() { // 生命周期 - 挂载完成

  },
  beforeCreate() { // 生命周期 - 创建之前

  },
  beforeMount() { // 生命周期 - 挂载之前

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
.moreModule {
  width: 100%;
  padding-bottom: 0.6rem;
  margin-top: -0.8rem;
  .headerBanner{
    width: 100%;
    height: 2.7rem;
    text-align: center;
    color: @color-default;
    @font-xxxl();
    padding-top: 1.45rem;
    background-image: url('~assets/images/more/moreBanner.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom;
  }
  .moreContent {
    width: 12rem;
    margin: 0 auto;
    background: @color-default;
    border-radius: 0.1rem;
    @shadow();
    margin-top: 0.2rem;
    .navBox {
      border-bottom: 1px solid #eee;
      .nav{
        width: 100%;
        height: 0.9rem;
        display: flex;
        .navItem{
          height: 100%;
          @allCenter();
          font-size: 0.2rem;
          font-weight:bold;
          padding: 0 0.42rem;
          cursor: pointer;
          &.active{
            @font-xl();
            color: @color-main;
          }
        }
      }
    }
    .moduleContent{
      min-height: 7.28rem;
    }
  }
}
</style>

