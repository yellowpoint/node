<!-- 设置组件 -->
<template>
  <div
    class="agreement-popup fadeIn"
    @click="close"
    ref="agreementPopup"
    @touchstart="test1($event)"
    @touchend="test2($event)"
    @touchmove.prevent
    style="animation-duration: 0.3s;"
  >
    <div
      class="content-wrap"
      @click.stop
    >
      <div class="headerTitle">《爱挖矿池用户协议》</div>
      <!-- <v-scroll>

            </v-scroll>  -->
      <div
        v-if="isPC"
        class="pcScrollBox"
      >
        <div class="scrollBox">
          <div class="blockBox"></div>
          <div
            class="item"
            v-for="(items, indexs) in agreementList"
            :key="indexs"
          >
            <div class="title">{{items.title}}</div>
            <div
              class="text"
              v-for="(item, index) in items.matter"
              :key="index"
              v-html="item"
            >

            </div>
          </div>
          <div class="blockBox"></div>
        </div>
      </div>
      <v-scroll
        v-else
        class="contentText"
      >
        <div class="scrollBox">
          <div class="blockBox"></div>
          <div
            class="item"
            v-for="(items, indexs) in agreementList"
            :key="indexs"
          >
            <div class="title">{{items.title}}</div>
            <div
              class="text"
              v-for="(item, index) in items.matter"
              :key="index"
              v-html="item"
            >

            </div>
          </div>
          <div class="blockBox"></div>
        </div>
        <div class="topGradientColor"></div>
        <div class="bottomGradientColor"></div>
      </v-scroll>
      <div class="footer">
        <button
          class="confirmBtn"
          @click="submitAgreement"
        >同意</button>
        <div
          class="dapBtn"
          @click="close"
        >跳过</div>
      </div>
    </div>
  </div>
</template>

<script>

import VScroll from '@/components/VScroll';
import commonMixins from '@/mixins/common';
import { agreement } from './textMap.js';

export default {

  name: 'agreementPopup',

  mixins: [commonMixins],

  components: {
    VScroll,
  },

  props: {
    msgData: {
      type: Object,
      default: () => ({}),
    },
    tableItem: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      popupData: {},
      agreementList: agreement,
    };
  },
  computed: {
    userInfo() { // 用户信息
      return this.$store.getters.userInfo;
    },
    isPC() {
      if (document.body.clientWidth <= 768) {
        return false;
      }
      return true;
    },
  },

  watch: {
    userInfo: {
      handler(newValue, oldValue) {
        this.$store.dispatch('setUserInfo', newValue).then(() => { // userInfo改变更新cookie
        }).catch(err => {
          console.log(err);
        });
      },
      deep: true,
    },
  },

  created() {
    this.popupData = this.msgData; // 只执行一次，第一次执行将静态props赋值给data,通过data实时渲染dom,静态props无法实时渲染
  },

  mounted() {

  },

  beforeDestroy() { },

  destroyed() { },

  methods: {
    /**
     * 手动清除弹窗
    */
    destroy() {
      try {
        const el = document.querySelector('.agreement-popup');
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
      this.$refs.agreementPopup.classList.add('fadeOut');
      this.$refs.agreementPopup.classList.remove('fadeIn');
      setTimeout(() => { // 释放弹窗
        this.destroy();
      }, 300);
    },
    submitAgreement() { // 提交协议
      const mineType = this.tableItem.key;
      if (!mineType) {
        throw new Error('请传入币种');
      }
      this.$api.submitSigned({ mineType }).then(res => {
        this.commonInitUserProfile(); // 更新用户信息
        this.close();
        this.$toast('签署成功！');
      }).catch(err => {
        console.log('提交协议失败', err);
      });
    },
    test1(e) {
      console.log(e);
    },
    test2(e) {
      console.log(e);
    },
  },
};
</script>

<style lang="less" scoped>
// @import url('./setPopup');
.agreement-popup {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  @allCenter();
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  .content-wrap {
    width: 8rem;
    margin: 0 auto;
    background: @color-default;
    padding: 0.4rem 0.6rem;
    border-radius: 0.1rem;
    @media (max-width: 768px) {
      width: 85%;
    }
    .headerTitle {
      color: #333;
      font-size: 0.26rem;
      font-weight: bold;
      text-align: center;
      margin-bottom: 0.24rem;
    }
    .pcScrollBox {
      position: relative;
      width: 100%;
      height: 6.9rem;
      overflow-y: auto;
      margin-bottom: 0.5rem;
      padding-bottom: 0.4rem;
      background: url('~assets/images/register/awLogo.png') no-repeat center
        center;
      .item {
        .title {
          color: #333;
          font-weight: bold;
          padding: 0.2rem 0;
        }
        .text {
          line-height: 2;
          user-select: none;
        }
      }
    }
    .contentText {
      position: relative;
      width: 100%;
      height: 6.9rem;
      overflow: hidden;
      margin-bottom: 0.5rem;
      padding-bottom: 0.4rem;
      background: url('~assets/images/register/awLogo.png') no-repeat center
        center;
      .blockBox {
        width: 100%;
        height: 0.4rem;
      }
      .topGradientColor {
        position: absolute;
        width: 100%;
        height: 0.5rem;
        top: 0;
        background: linear-gradient(white, rgba(255, 255, 255, 0));
      }
      .bottomGradientColor {
        position: absolute;
        width: 100%;
        height: 0.5rem;
        bottom: 0;
        background: linear-gradient(rgba(255, 255, 255, 0), white);
      }
      .item {
        .title {
          color: #333;
          font-weight: bold;
          padding: 0.2rem 0;
        }
        .text {
          line-height: 2;
          user-select: none;
        }
      }
    }
    .footer {
      display: flex;
      flex-direction: column;
      align-items: center;
      .confirmBtn {
        @allCenter();
        width: 4.2rem;
        height: 0.48rem;
        color: @color-default;
        @font-m();
        font-weight: 300;
        margin-bottom: 0.2rem;
        background: @color-main;
        cursor: pointer;
        @shadow();
        border-radius: 0.24rem;
      }
      .dapBtn {
        color: @color-main;
        font-weight: 400;
        cursor: pointer;
      }
    }
  }
}
</style>
