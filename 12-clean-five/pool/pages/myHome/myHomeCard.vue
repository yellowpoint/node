<!-- 我的首页-数据卡片 -->
<template>
  <div
    class="myHomeCard"
    :class="{type2:type===2}"
  >
    <div class="mhc_logo iconfont icontubiaozhizuomoban"></div>
    <div class="mhc_title">
     <i class="iconfont iconyanzhengma"></i> {{title}}
    </div>
    <div class="mhc_body">
      <div
        class="mhc_body_item"
        v-for="(item,index) of myHomeCardList"
        :key="'myHomeCard'+index"
      >
        <span>{{item.name}}</span>
        <transition name="el-fade-in">
          <p v-if="item.data!=null">{{$common.toDecimal(item.data, 8)}} {{mineType.name}}</p>
        </transition>
      </div>

    </div>
  </div>
</template>

<script>
// import x from ''
export default {
  name: '',
  components: {

  },
  props: {
    mineType: {
      type: Object,
      default: () => ({}),
    },
    title: {
      type: String,
      default: '充值余额',
    },
    type: {
      type: Number,
      default: 1,
    },
    myHomeCardList: {
      type: Array,
      default() {
        return [
        ];
      },
    },
  },
  data() {
    return {

    };
  },
  computed: {

  },
  created() {

  },
  mounted() {

  },
  methods: {

  },
};
</script>

<style lang='less' scoped>
.myHomeCard {
  position: relative;
  width: 5.55rem;
  height: 1.4rem;
  padding: 0.2rem;
  background: #fff9f9;
  .mhc_logo {
    position: absolute;
    bottom: -0.6rem;
    right: -0.14rem;
    z-index: 1;
    font-size: 1.8rem;
    color: #ffebeb;
  }
  &.type2 {
    background: #f3faff;
    .mhc_logo {
      color: #dbf0ff;
    }
    .mhc_title{
      color: @color-main;
    }
  }
  .mhc_title {
    @font-l();
    margin-bottom: 0.26rem;
    color: #ff3c3c;
    font-weight: bold;
    i{
      font-size: .2rem;
    }
  }
  .mhc_body {
    position: relative;
    z-index: 22;
    display: flex;
    color: #666666;
    .mhc_body_item {
      flex: 1;
      display: flex;
      flex-direction: column;
      @font-s();
      p {
        margin-top: 0.1rem;
        font-weight: bold;
      }
    }
  }
}
</style>
