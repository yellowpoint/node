<style scoped lang="less">
.notFound {
  height: 100vh;
  background: @color-default;
  overflow: hidden;
  text-align: center;
  img {
    margin-top: 20%;
  }
  .goHome {
    display: block;
    width: 2rem;
    height: 0.8rem;
    line-height: 0.8rem;
    border-radius: 0.4rem;
    margin: 1rem auto;
    background: #2572f4;
    color: @color-default;
    text-align: center;
  }
}
</style>
<template>
  <div class="notFound">
    <img
      src="~assets/images/common/404.jpg"
      alt="404"
    />
    <p>没找到页面，请检查链接~</p>
    <router-link
      class="goHome"
      to="/index"
    >回到首页</router-link>
  </div>
</template>

<script>

export default {

  data() {
    return {

    };
  },

  mounted() { },
  methods: {},

};
</script>
