<!-- 设置组件 -->
<template>
  <div
    class="msg-popup fadeIn"
    @click="close"
    ref="msgPopup"
    @touchmove.prevent
    style="animation-duration: 0.3s;"
  >
    <div
      class="content-wrap"
      @click.stop
    >
      <div class="headerTitle">
        <div class="title">{{popupData.title}}</div>
        <div class="date">{{popupData.create_time}}</div>
      </div>
      <pre
        v-if="isPC"
        class="pcMsgContent"
      >{{popupData.content}}</pre>
      <v-scroll
        v-else
        class="contentText"
      >
        <div>
          <pre class="msgContent">{{popupData.content}}</pre>
        </div>
      </v-scroll>
      <div class="footer">
        <div
          class="btn"
          @click="close"
        >确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import VScroll from 'components/VScroll';

export default {

  name: 'msgPopup',

  mixins: [],

  components: {
    VScroll,
  },

  props: {
    msgData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      popupData: {},
    };
  },
  computed: {
    isPC() {
      if (document.body.clientWidth <= 768) {
        return false;
      }
      return true;
    },
  },

  watch: {},

  created() {
    this.popupData = this.msgData; // 只执行一次，第一次执行将静态props赋值给data,通过data实时渲染dom,静态props无法实时渲染
  },

  mounted() {
    // console.log(this.msgData);
  },

  beforeDestroy() { },

  destroyed() { },

  methods: {
    /**
     * 手动清除弹窗
    */
    destroy() {
      try {
        const el = document.querySelector('.msg-popup');
        if (el) {
          el.style.display = 'none';
        }
        return true;
      } catch (err) {
        throw err;
      }
    },
    /**
     * 关闭弹窗
    */
    close() {
      this.$refs.msgPopup.classList.add('fadeOut');
      this.$refs.msgPopup.classList.remove('fadeIn');
      setTimeout(() => { // 释放弹窗
        this.destroy();
      }, 300);
    },
  },
};
</script>

<style lang="less" scoped>
// @import url('./setPopup');
.msg-popup {
  @allCenter();
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  .content-wrap {
    width: 7.2rem;
    margin: 0 auto;
    background: @color-default;
    padding: 0.4rem;
    padding-top: 0;
    padding-bottom: 0.2rem;
    border-radius: 0.1rem;
    @media (max-width: 768px) {
      width: 85%;
    }
    .headerTitle {
      display: flex;
      align-items: center;
      height: 0.6rem;
      border-bottom: 1px solid #ededed;
      justify-content: space-between;
      .title {
        display: flex;
        align-items: center;
        @font-m();
        font-weight: 400;
        color: #333;
      }
      .date {
        display: flex;
        align-items: center;
        @font-s();
        font-weight: 400;
        color: #666;
      }
    }
    .contentText {
      position: relative;
      width: 100%;
      height: 2rem;
      overflow: hidden;
      .msgContent {
        @font-s();
        font-weight: 300;
        color: #333;
        padding: 0.4rem 0;
        margin: 0;
      }
    }
    .pcMsgContent {
      margin: 0;
      @font-s();
      font-weight: 300;
      color: #333;
      line-height: 0.28rem;
      min-height: 1rem;
      max-height: 2rem;
      padding-top: 0.2rem;
      overflow-y: auto;
      font-weight: 500;
    }
    .footer {
      display: flex;
      justify-content: flex-end;
      .btn {
        width: 1.2rem;
        height: 0.4rem;
        background: @color-main;
        @font-m();
        font-weight: 300;
        color: @color-default;
        margin-top: 0.2rem;
        cursor: pointer;
        @allCenter();
        border-radius: 0.2rem;
      }
    }
  }
}
</style>
