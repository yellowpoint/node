<!-- 活期宝 各种弹窗-->
<template>
  <div class="financeBorrowPopup">
    <transition name="fade">
      <div
        v-show="showWritePopup"
        class="popupMask"
        @touchmove.prevent
        @click.stop="closeWritePopup"
        style="animation-duration: 0.3s;"
      >
        <div
          class="popupContentBox"
          @click.stop
        >
          <div class="popupTitle">
            <text-title>存入</text-title>
            <div
              class="closeBtn"
              @click="closeWritePopup"
            >&times;</div>
          </div>
          <div class="popupContent">
            <div class="listDetailItem">
              <div class="itemLabel">可存余额</div>
              <div class="itemDetail">{{computedBorrowAmount || 0}} {{tableItem.name}}</div>
            </div>
            <div class="listDetailItem">
              <div class="itemLabel">存入额度</div>
            </div>
            <div class="inputBox">
              <input
                type="text"
                :placeholder="minimum"
                class="inpt"
                v-model="writeCount"
                @input="writeOninputEvent($event)"
                @focus="clearPositionTimer"
                @blur="resetPosition"
              >
              <div class="units">{{tableItem.name}}</div>
            </div>
            <div class="listDetailItem">
              <div class="itemLabel"><i class="iconfont icon-mima passwordIcon"></i> 安全码</div>
            </div>
            <div class="inputBox">
              <input
                type="password"
                v-model="userPayPassword"
                placeholder="请输入安全码"
                class="inpt"
                autocomplete="new-password"
                maxlength="8"
                @keyup.enter="consentWriteEvent"
                @focus="clearPositionTimer"
                @blur="resetPosition"
              >
            </div>
            <div class="msgInfo">提示：你将要存入 {{writeCount||'0'}} {{tableItem.name}}，系统会优先存入生效指向余额</div>
          </div>
          <div class="popupBtnBox">
            <button
              :class="disabledClick ? 'consentBtn disabled' : 'consentBtn'"
              :disabled="disabledClick"
              @click="consentWriteEvent"
            >确定</button>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div
        v-show="showReadPopup"
        class="popupMask"
        @touchmove.prevent
        @click.stop="closeReadPopup"
        style="animation-duration: 0.3s;"
      >
        <div
          class="popupContentBox"
          @click.stop
        >
          <div class="popupTitle">
            <text-title>赎回</text-title>
            <div
              class="closeBtn"
              @click="closeReadPopup"
            >&times;</div>
          </div>
          <div class="popupContent">
            <div class="listDetailItem">
              <div class="itemLabel">可赎回金额</div>
              <div class="itemDetail">{{computedReadAmuont}} {{tableItem.name}}</div>
            </div>
            <div class="listDetailItem">
              <div class="itemLabel">赎回额度</div>
            </div>
            <div class="inputBox">
              <input
                type="text"
                :placeholder="minimum"
                class="inpt"
                v-model="readCount"
                @input="readOninputEvent($event)"
                @focus="clearPositionTimer"
                @blur="resetPosition"
              >
              <div class="units">{{tableItem.name}}</div>
            </div>
            <div class="listDetailItem">
              <div class="itemLabel"><i class="iconfont icon-mima passwordIcon"></i> 安全码</div>
            </div>
            <div class="inputBox">
              <input
                type="password"
                v-model="userPayPassword"
                placeholder="请输入安全码"
                class="inpt"
                autocomplete="new-password"
                maxlength="8"
                @keyup.enter="consentReadEvent"
                @focus="clearPositionTimer"
                @blur="resetPosition"
              >
            </div>
            <div class="msgInfo">提示：你将要赎回 {{readCount||'0'}} {{tableItem.name}}，系统会优先赎回您的充值余额</div>
          </div>
          <div class="popupBtnBox">
            <button
              :class="disabledClick ? 'consentBtn disabled' : 'consentBtn'"
              :disabled="disabledClick"
              @click="consentReadEvent"
            >确定</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  name: '',
  mixins: [],
  components: {},
  inject: ['tableItem', 'finance_this'],
  props: {
    numberData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      showWritePopup: false,
      showReadPopup: false,
      disabledClick: false,
      writeCount: '',
      readCount: '',
      userPayPassword: '',
      positionTimer: null,
    };
  },
  computed: { // 组件计算属性
    financeUserInfo() {
      return this.finance_this.financeUserInfo;
    },
    computedBorrowAmount() {
      return this.$common.accAdd(this.financeUserInfo.borrowAmount, this.financeUserInfo.cashAmount);
    },
    computedReadAmuont() {
      return this.$common.accAdd(this.financeUserInfo.effectAmount, this.financeUserInfo.unEffectAmount);
    },
    userInfo() { // 用户信息
      return this.$store.getters.userInfo;
    },
    isPC() {
      if (document.body.clientWidth <= 768) {
        return false;
      }
      return true;
    },
    // 存入和赎回的最小额度
    minimum() {
      return +(this.numberData.startThrow || 10);
    },
  },
  watch: { // 组件监听事件

  },
  created() { // 生命周期 - 创建完成
  },
  mounted() { // 生命周期 - 挂载完成

  },
  methods: { // 组件方法
    resetPosition() {
      this.positionTimer = setTimeout(() => {
        if (this.$common.iosVersion()) {
          $('body').scrollTop(0);
        }
      }, 100);
    },
    clearPositionTimer() {
      if (this.positionTimer) {
        clearTimeout(this.positionTimer);
      }
    },
    writeOninputEvent(e) { // 输入正整数
      if (!/^\d+$/.test(e.target.value)) {
        e.target.value = e.target.value.replace(/\D/g, '');
        this.writeCount = e.target.value.replace(/\D/g, '');
      }
    },
    readOninputEvent(e) {
      if (!/^\d+$/.test(e.target.value)) {
        e.target.value = e.target.value.replace(/\D/g, '');
        this.readCount = e.target.value.replace(/\D/g, '');
      }
    },
    closeWritePopup() {
      this.showWritePopup = false;
      setTimeout(() => {
        $('body').css({ overflow: 'visible', 'padding-right': '0px' });
        $('#longNavType').css({ right: '0px' });
      }, 300);
    },
    openWritePopup() {
      this.showWritePopup = true;
      if (this.isPC) {
        $('body').css({ overflow: 'hidden', 'padding-right': '17px' });
        $('#longNavType').css({ right: '17px' });
      } else {
        $('body').css({ overflow: 'hidden' });
      }
    },
    showWritePopupEvent() {
      if (this.userInfo) {
        this.openWritePopup();
      } else {
        this.$toast('请登录！');
        this.$RegPopup({
          popupType: 'accountLogIn',
        });
      }
    },
    closeReadPopup() {
      this.showReadPopup = false;
      setTimeout(() => {
        $('body').css({ overflow: 'visible', 'padding-right': '0px' });
        $('#longNavType').css({ right: '0px' });
      }, 300);
    },
    openReadPopup() {
      this.showReadPopup = true;
      if (this.isPC) {
        $('body').css({ overflow: 'hidden', 'padding-right': '17px' });
        $('#longNavType').css({ right: '17px' });
      } else {
        $('body').css({ overflow: 'hidden' });
      }
    },
    showReadPopupEvent() {
      if (this.userInfo) {
        this.openReadPopup();
      } else {
        this.$toast('请登录！');
        this.$RegPopup({
          popupType: 'accountLogIn',
        });
      }
    },
    consentWriteEvent() { // 存入活期宝
      if (!this.writeCount) {
        this.$toast('请输入存入数量！');
        return;
      } else if (this.writeCount < this.minimum) {
        this.$toast(`存入额度必须大于等于${this.minimum + this.tableItem.name}！`);
        return;
      } else if (!this.userPayPassword.length) {
        this.$toast('请输入安全密码！');
        return;
      }
      this.disabledClick = true;
      this.consentWriteHandle(); // 执行存入操作
    },
    consentWriteHandle() {
      const data = {
        coin: this.writeCount,
        prePwd: this.$md5(this.userPayPassword),
        mineType: this.tableItem.key,
      };
      this.$api.userWriteFreedom(data).then(res => {
        this.$toast('存入成功！');
        this.writeCount = '';
        this.userPayPassword = '';
        this.closeWritePopup();
        this.$emit('update');
        this.disabledClick = false;
        console.log('存入活期宝', res);
      }).catch(err => {
        this.disabledClick = false;
        console.log('存入活期宝出错', err);
      });
    },
    consentReadEvent() { // 赎回
      if (!this.readCount) {
        this.$toast('请输入赎回数量！');
        return;
      } else if (!this.userPayPassword.length) {
        this.$toast('请输入安全密码！');
        return;
      }
      this.disabledClick = true;
      this.consentReadHandle(); // 执行赎回操作
    },
    consentReadHandle() { // 赎回操作
      const data = {
        coin: this.readCount,
        prePwd: this.$md5(this.userPayPassword),
        mineType: this.tableItem.key,
      };
      this.$api.userReadFreedom(data).then(res => {
        this.$toast('赎回成功！');
        this.readCount = '';
        this.userPayPassword = '';
        this.closeReadPopup();
        this.$emit('update');
        this.disabledClick = false;
        console.log('取出活期宝', res);
      }).catch(err => {
        this.disabledClick = false;
        console.log('取出活期宝出错', err);
      });
    },
  },


};
</script>

<style lang="less" scoped>
.popupMask {
  @allCenter();
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);

  .popupContentBox {
    width: 6.92rem;
    padding-bottom: 0.32rem;
    background: @color-default;
    border-radius: 0.1rem;

    @media (max-width: 768px) {
      width: 90%;
    }

    .popupTitle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.22rem 0.4rem;

      .closeBtn {
        font-size: 0.4rem;
        color: @color-main;
        cursor: pointer;
      }
    }

    .popupContent {
      padding: 0rem 0.7rem;

      .listDetailItem {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        @font-m();
        line-height: 0.5rem;
      }

      .inputBox {
        position: relative;
        display: flex;
        height: 0.4rem;
        margin: 0.1rem 0;

        @media (max-width: 768px) {
          height: 0.8rem;
        }

        .inpt {
          width: 100%;
          height: 100%;
          color: #666666;
          text-indent: 0.1rem;
          padding-right: 0.7rem;
          border: 1px solid #b3b3b3;

          &:focus {
            border: 1px solid #409eff;
          }
        }

        .units {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          @allCenter();
          width: 0.7rem;
          font-size: 0.14rem;
          color: #3d8bff;
          font-weight: 900;

          &.approximate {
            width: auto;
            right: 0;
            top: 0;
            bottom: 0;
            padding-right: 0.2rem;
          }
        }
      }

      .msgInfo {
        @allCenter();
        width: 100%;
        height: 0.4rem;
        color: #3a9dff;
        background: #d1e8ff;
        margin-top: 0.26rem;
        margin-bottom: 0.4rem;

        @media (max-width: 768px) {
          font-size: 0.12rem;
        }
      }
    }

    .popupBtnBox {
      display: flex;
      justify-content: center;
      align-items: center;

      .consentBtn {
        @allCenter();
        width: 4.32rem;
        height: 0.48rem;
        @font-m();
        color: @color-main;
        border: 1px solid @color-main;
        border-radius: 0.24rem;
        background: @color-default;
        cursor: pointer;
        outline: none;

        &:hover {
          color: @color-default;
          background: @color-main;
        }

        &.disabled {
          color: @color-default;
          background: #bbb;
          border: 1px solid @color-default;
        }

        @media (max-width: 768px) {
          font-size: 0.14rem;
          width: 80%;
        }
      }

      .cancelQuit {
        color: #999;
        cursor: pointer;
      }
    }
  }
}
</style>
