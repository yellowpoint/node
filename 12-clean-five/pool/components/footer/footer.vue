<!-- 页尾 -->
<template>
  <div
    class="pageFooter"
    :style="isIndex ? 'background: #fff' : ''"
  >
    <div class="footerBox">
      <div class="footerContent">
        <div class="listBox">
          <div
            class="flexItem leftItem"
            :class="isIndex ? 'grayFont' : 'whiteFont'"
          >
            <div class="logoBox">
              <img
                class="logo"
                v-show="isIndex"
                src="~assets/images/common/buleLogo.png"
                alt=""
              >
              <img
                class="logo"
                v-show="!isIndex"
                src="~assets/images/common/awpool-logo.png"
                alt=""
              >
            </div>
            <p class="text">© 2013–2019 AWPool 版权所有</p>
            <p class="text">粤ICP备14013741号-1</p>
          </div>
          <div class="flexItem line"></div>
          <div
            class="flexItem helpItem"
            :class="isIndex ? '' : 'whiteFont'"
          >
            <div
              class="title"
              :class="isIndex ? 'buleFont' : 'whiteFont'"
            >用户帮助</div>
            <p class="text"><span @click="toMore(0)">帮助中心</span></p>
            <p class="text"><span @click="toMore(1)">公告中心</span></p>
            <p class="text"><span @click="toMore(3)">挖矿教程</span></p>
          </div>
          <div
            class="flexItem contact"
            :class="isIndex ? '' : 'whiteFont'"
          >
            <div
              class="title"
              :class="isIndex ? 'buleFont' : 'whiteFont'"
            >联系我们</div>
            <p
              class="text contactItem"
              v-for="(item, index) in picInfo.kefu"
              :key="index"
            >
              {{item.pic_name}}
              <el-popover
                placement="right"
                width="260"
                trigger="hover"
              >
                <div class="consultTips">
                  <img
                    :src="item.pic_url"
                    alt=""
                  >
                </div>
                <el-button
                  class="weixinIconBtn"
                  slot="reference"
                ><i
                    class="icon iconfont iconweixin kefuIcon"
                    :class="isIndex ? 'grayFont' : 'whiteFont'"
                  ></i></el-button>
              </el-popover>
            </p>
          </div>
          <div class="flexItem offAcc">
            <div
              class="officialAccountsBox"
              v-for="(item, index) in picInfo.gzh"
              :key="index"
            >
              <div :class="isIndex ? 'officialAccountsQR isIndex' : 'officialAccountsQR'">
                <img
                  :src="item.pic_url"
                  alt=""
                >
              </div>
              <div :class="isIndex ?  'officialAccountsName isIndex' : 'officialAccountsName'">{{item.pic_name || '微信公众号'}}</div>
            </div>
          </div>
        </div>
        <!-- <div class="footerLogo">
          <img
            src="~assets/images/common/awpool-logo.png"
            alt=""
          >
        </div>
        <img
          class="QR-code"
          src="~assets/images/footer/awpoolQR.jpg"
          alt=""
        > -->
        <p
          class="text msg"
          :class="isIndex ? 'buleFont' : 'whiteFont'"
        >
          AWPool爱挖矿池业务布局POC容量证明硬盘挖矿全产业链服务全球用户我们希望省电环保的POC共识，真正实现中本聪初衷“去中心化人人挖矿”</p>
      </div>
    </div>
  </div>
</template>

<script>
// import templateName from 'path';
export default {
  name: 'page-footer',
  components: {},
  data() {
    return {
      isFixed: false,
      isIndex: false,
    };
  },
  computed: { // 组件计算属性
    picInfo() { // 币种
      return this.$store.getters.picsInfo;
    },
  },
  watch: { // 组件监听事件
    '$route'(to, from) {
      if (to.path === '/index') {
        this.isIndex = true;
      } else {
        this.isIndex = false;
      }
    },
  },
  methods: { // 组件方法
    toMore(index) {
      this.$router.push({
        name: 'more',
        params: { index },
      });
    },
  },
  created() { // 生命周期 - 创建完成
    this.isIndex = this.$route.path === '/index';
  },
  mounted() { // 生命周期 - 挂载完成
  },
  beforeCreate() { }, // 生命周期 - 创建之前
  beforeMount() { }, // 生命周期 - 挂载之前
  beforeUpdate() { }, // 生命周期 - 更新之前
  updated() { }, // 生命周期 - 更新之后
  beforeDestroy() { }, // 生命周期 - 销毁之前
  destroyed() { }, // 生命周期 - 销毁完成
  activated() { }, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.pageFooter {
  position: absolute;
  bottom: 0;
  z-index: 3010;
  width: 100%;
  height: 3.3rem;
  padding: 0.6rem 0 0.48rem;
  background: @color-page-footer;
  .weixinIconBtn {
    color: @color-default;
    background: none;
    border: 0;
    padding: 0;
    &:hover {
      color: @color-default;
    }
    > &span {
      display: block;
    }
    .kefuIcon {
      @font-xl();
      margin-left: 0.2rem;
    }
  }
}
.footerBox {
  @content();
  .whiteFont {
    color: @color-default;
  }
  .grayFont {
    color: @color-font-light;
  }
  .buleFont {
    color: @color-main;
  }
  .title {
    @font-m();
    margin-bottom: 0.2rem;
  }
  .text {
    @font-s();
    line-height: 0.3rem;
    &.msg {
      text-align: center;
    }
  }
  .contactItem {
    display: flex;
    align-items: center;
  }
  .footerContent {
    .listBox {
      display: flex;
      margin-bottom: 0.14rem;
      .flexItem {
        &.leftItem {
          width: 3.24rem;
        }
        &.line {
          width: 1.18rem;
          height: 1.2rem;
          border-left: 1px solid @color-default;
          margin-top: 0.22rem;
        }
        &.helpItem {
          width: 1.82rem;
          display: flex;
          align-content: center;
          flex-direction: column;
          .text {
            span {
              cursor: pointer;
            }
          }
        }
        &.contact {
          width: 2.52rem;
        }
        &.offAcc {
          flex: 1;
        }
        .logoBox {
          width: 2rem;
          height: 0.44rem;
          margin-bottom: 0.4rem;
          .logo {
            width: 100%;
            height: 100%;
          }
        }
        .officialAccountsBox {
          display: flex;
          align-items: center;
          .officialAccountsQR {
            padding: 0.1rem;
            background: @color-default;
            border-radius: 0.06rem;
            &.isIndex {
              background: @color-main;
            }
            img {
              width: 1.84rem;
              height: 1.84rem;
            }
          }
          .officialAccountsName {
            @font-s();
            color: @color-main;
            font-weight: bold;
            writing-mode: vertical-rl;
            background: @color-main;
            padding: 0.1rem;
            background: @color-default;
            border-radius: 0rem 0.1rem 0.1rem 0rem;
            margin-left: -0.1rem;
            &.isIndex {
              color: #fff;
              background: #4896ff;
            }
          }
        }
      }
    }
  }
}
</style>
