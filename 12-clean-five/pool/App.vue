<template>
  <div
    v-if="hasMineTypeList"
    id="app"
    class="app"
    :class="{noFooter:$route.meta.noFooter}"
  >
    <page-header v-if="!$route.meta.noHeader" />
    <router-view class="routerView" />
    <page-footer v-if="!$route.meta.noFooter" />
  </div>
</template>

<script>

import '@/assets/icon/iconfont.js';
import pageFooter from '@/components/footer/footer';
import pageHeader from '@/components/header/header';
import commonMixins from '@/mixins/common';

export default {
  name: 'App',
  mixins: [commonMixins],
  data() {
    return {
      hasMineTypeList: false,
    };
  },
  components: {
    pageFooter,
    pageHeader,
  },
  created() {
    this.getMineTypeList();
  },
  mounted() {
    function setHtmlFontSize() {
      let clientWidth = document.documentElement.clientWidth;
      if (clientWidth > 1200) {
        clientWidth = 1200;
      }
      if (clientWidth <= 768) {
        document.documentElement.style.fontSize = `${clientWidth / 7.5}px`;
      } else {
        document.documentElement.style.fontSize = `${clientWidth / 12}px`;
      }
    }
    setHtmlFontSize();
    $(window).resize(() => {
      setHtmlFontSize();
    });

    // 防止手抖
    let lastTouchEnd = 0;
    document.documentElement.addEventListener('touchend', (event) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
    if (this.userInfo) {
      this.commonInitUserProfile(); // 更新用户信息
    }
    this.getHomePic();
  },
  computed: {
    userInfo() { // 用户信息
      return this.$store.getters.userInfo;
    },
  },
  methods: {
    async getMineTypeList() {
      const res = await this.$api.mineTypeList();
      await this.$store.dispatch('setMineTypeList', res);
      this.hasMineTypeList = true;
    },
    getHomePic() {
      this.$api.homePic().then(res => {
        this.$store.dispatch('setPicsInfo', res).then(() => {
        }).catch(err => {
          console.log(err);
        });
      }).catch(err => {
        console.log('', err);
      });
    },
  },

};
</script>

<style lang="less">
// @import "./assets/icon/iconfont.css";
@import "//at.alicdn.com/t/font_1493187_4cwjbq1bzjw.css";
/*
http://ianlunn.github.io/Hover/
鼠标悬浮动画，需要就从hover-all.css 将对应的类名加过去
现在有：hvr-bob、hvr-shadow
*/

@import url("./assets/styles/hover.css");

body {
  font-family: "pingFangSC-Medium";
  @font-m();
  .el-date-picker {
    .el-picker-panel__footer {
      .el-button--text {
        display: none;
      }
    }
  }
}
.app {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  padding-bottom: 3.3rem;

  @media (max-width: 415px) {
    // padding-bottom: 5rem;
  }
  &.noFooter {
    padding-bottom: 0;
  }
}

.content {
  @content();
  margin: 0.2rem auto 1rem;
  // padding: 0.2rem 0 1rem 0;
}
.defineNotData {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 0.8rem 0;
  p {
    font-size: 0.14rem;
    color: #333;
    margin-top: 0.2rem;
  }
}
.el-message-box__wrapper {
  .el-message-box {
    @media (max-width: 768px) {
      width: 90%;
    }
  }
}
.danger {
  color: #ff6464;
}
input {
  @media (max-width: 768px) {
    min-height: 0.64rem;
  }
}
input::placeholder {
  font-size: 0.14rem;
  color: #999;
}
.el-tooltip__popper {
  line-height: 2 !important;
}
pre {
  white-space: pre-wrap; /*css-3*/
  white-space: -moz-pre-wrap; /*Mozilla,since1999*/
  white-space: -pre-wrap; /*Opera4-6*/
  white-space: -o-pre-wrap; /*Opera7*/
  word-wrap: break-word; /*InternetExplorer5.5+*/
  font-family: Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB,
    Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
}
/* 谷歌 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}
/* 火狐 */
input {
  -moz-appearance: textfield !important;
}
.el-progress-bar {
  margin-right: -66px !important;
  padding-right: 66px !important;
}
.el-progress__text {
  font-size: 16px !important;
  .fontB;
}
.progress_red {
  .el-progress-bar__outer {
    background: #ffe1e1;
  }
}
.progress_blue {
  .el-progress-bar__outer {
    background: #e1e2ff;
  }
}
.el-progress-bar__inner {
  background-size: 30px 30px;
  background-image: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent;
  );
  animation: animate-stripes 3s linear infinite;
}

@keyframes animate-stripes {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 60px 0;
  }
}
.el-popper&.el-popover {
  background: #333;
  padding: 0.3rem 0.5rem;
  border: 1px solid #999;
  border-radius: 0.1rem;
  .consultTips {
    display: flex;

    img {
      width: 1.58rem;
      margin-right: 0.2rem;
      &:last-child {
        margin-right: 0;
      }
    }
    .awQR {
      color: @color-default;
      @font-m();
      padding-top: 0.16rem;
    }
  }
  .popper__arrow {
    &::after {
      border-color: #333 !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
    }
  }
}
</style>
