<!-- 定投 各种弹窗 -->
<template>
  <div class="financePeriodPopup">
    <transition name="fade">
      <div
        v-show="showThrowInPopup"
        class="throwInMask"
        @touchmove.prevent
        @click.stop="closeThrowIn"
        style="animation-duration: 0.3s;"
      >
        <div
          class="throwInContentBox"
          @click.stop
        >
          <div class="throwInContent">
            <div class="throwInTitle">
              <text-title>提醒</text-title>
              <div
                class="closeBtn"
                @click="closeThrowIn"
              >&times;</div>
            </div>
            <div class="throwInInfo">
              <div class="throwInInfoItem">投放额度</div>
              <div
                data-v-5aac78ad=""
                class="inptBox"
              >
                <input
                  type="text"
                  placeholder="10"
                  class="inpt"
                  v-model="rentOutCount"
                  @input="rentOutOninputEvent($event)"
                  @focus="clearPositionTimer"
                  @blur="resetPosition"
                >
                <div class="units">{{tableItem.name}}</div>
              </div>
              <div class="throwInInfoItem gray">当前可用充值余额: &nbsp;<span class="balance">{{financeUserInfo.cashAmount}}</span>&nbsp;&nbsp;{{tableItem.name}}</div>
              <div class="throwInInfoItem gray">投放额度 10 {{tableItem.name}}起，仅限充值余额投放</div>
              <div class="throwInInfoItem">
                <div>预计收益</div>
                <div>{{computedIncome}}{{tableItem.name}}</div>
              </div>
              <div class="throwInInfoItem">
                <div>投放周期</div>
                <div>{{popupData.periodTimeNum}}天</div>
              </div>
              <div class="throwInInfoItem">
                <div>释放时间</div>
                <div>{{deadline}} 00:00</div>
              </div>
              <div class="throwInInfoItem">
                <div><i class="iconfont icon-mima passwordIcon"></i> 安全密码</div>
              </div>
              <div class="inptBox">
                <input
                  type="password"
                  v-model="userPayPassword"
                  placeholder="请输入安全码"
                  class="inpt"
                  autocomplete="new-password"
                  maxlength="8"
                  @focus="clearPositionTimer"
                  @blur="resetPosition"
                >
              </div>
              <div class="msgInfo">提示：您将要投放 {{rentOutCount}} {{tableItem.name}}，投放期限 {{popupData.periodTimeNum}} 天！</div>
              <button
                class="confirmBtn"
                @click="showRemindPopupEvent()"
              >确定</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div
        v-show="showRemindPopup"
        class="remindMask"
        @click.stop="showRemindPopup = false"
        style="animation-duration: 0.3s;"
      >
        <div
          class="remindContentBox"
          @click.stop
        >
          <div class="remindContent">
            <div class="remindTitle">
              <text-title>提醒</text-title>
            </div>
            <div class="remindContentText">
              您现在操作的是爱挖定期投放项目，投放数量：{{rentOutCount}} {{tableItem.name}}将从您的充值账户余额扣除，
              投放时间为{{popupData.periodTimeNum}}天，利息收益每日发放，每日到账，投放数量将在{{deadline}}释放。
              合作投放期间订单无法终止与转让！
            </div>
            <div class="remindBtnBox">
              <button
                :class="disabledClick ? 'consentBtn disabled' : 'consentBtn'"
                :disabled="disabledClick"
                @click="checkoutPayPassword()"
              >我已知晓并同意以上合作方式，确认提交<span v-show="count">（{{count}}）</span></button>
              <div
                class="cancelQuit"
                @click="showRemindPopup = false"
              >取消退出</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// import templateName from 'path';
export default {
  name: '',
  inject: ['tableItem', 'finance_this'],
  components: {},
  data() {
    return {
      showThrowInPopup: false,
      showRemindPopup: false,
      disabledClick: true, // 禁止点击
      count: 10,
      timer: null,
      rentOutCount: '', // 投放数量
      userPayPassword: '', // 安全码
      popupData: {}, // 弹窗数据
      positionTimer: null,
    };
  },
  computed: { // 组件计算属性
    // 可用余额等信息
    financeUserInfo() {
      return this.finance_this.financeUserInfo;
    },
    userInfo() { // 用户信息
      return this.$store.getters.userInfo;
    },
    computedIncome() {
      if (this.rentOutCount) {
        if (this.tableItem.key == 'xhd' || this.tableItem.key == 'BHD') {
          return Math.floor(this.rentOutCount * this.popupData.rate * this.popupData.interest * this.popupData.periodTimeNum / 365 / 100 / 100 * 100000000) / 100000000;
        }
        return Math.floor(this.rentOutCount * this.popupData.interest * this.popupData.periodTimeNum / 365 / 100 * 100000000) / 100000000;
      }
      return 0;
    },
    deadline() {
      const endTime = new Date().getTime() + ((this.popupData.periodTimeNum + 1) * 24 * 60 * 60 * 1000);
      return this.$common.timestampToTime(endTime, 'y-M-D');
    },
    isPC() {
      if (document.body.clientWidth <= 768) {
        return false;
      }
      return true;
    },
  },
  watch: { // 组件监听事件

  },
  created() { // 生命周期 - 创建完成

  },
  mounted() { // 生命周期 - 挂载完成

  },
  methods: { // 组件方法
    tableRowClassName() { },
    rowStyle() { },
    closeThrowIn() {
      this.showThrowInPopup = false;
      setTimeout(() => {
        $('body').css({ overflow: 'visible', 'padding-right': '0px' });
        $('html').css({ overflow: 'visible' });
        $('#longNavType').css({ right: '0px' });
      }, 300);
    },
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
    showThrowInPopupEvent(item) {
      if (this.userInfo) { // 已登录--投放
        this.showThrowInPopup = true;
        this.popupData = item;
        if (this.isPC) {
          $('body').css({ overflow: 'hidden', 'padding-right': '17px' });
          $('html').css({ overflow: 'hidden' });
          $('#longNavType').css({ right: '17px' });
        } else {
          $('body').css({ overflow: 'hidden' });
          $('html').css({ overflow: 'hidden' });
        }
      } else { // // 未登录--登录
        this.$RegPopup({
          popupType: 'accountLogIn',
        });
      }
    },
    rentOutOninputEvent(e) { // 输入正整数
      if (!/^\d+$/.test(e.target.value)) {
        e.target.value = e.target.value.replace(/\D/g, '');
        this.rentOutCount = e.target.value.replace(/\D/g, '');
      }
    },
    checkoutPayPassword() { // 校验密码
      this.disabledClick = true;
      const data = {
        payPwd: this.$md5(this.userPayPassword),
      };
      this.$api.checkPayPassword(data).then(res => {
        if (res) {
          this.userDeliveryHandle();
        } else {
          this.$toast('密码错误！');
          this.disabledClick = false;
          this.closeRemindPopup();
        }
        console.log('校验安全密码', res);
      }).catch(err => {
        this.userPayPassword = '';
        console.log('校验安全密码出错', err);
        if (err.msg) {
          this.$toast(err.msg);
        }
        this.disabledClick = false;
        this.closeRemindPopup();
      });
    },
    showRemindPopupEvent() {
      if (!this.rentOutCount) {
        this.$toast('输入投放数量！');
        return;
      } else if (this.rentOutCount < 10) {
        this.$toast(`投放额度必须大于等于10${this.tableItem.name}！`);
        return;
      } else if (this.rentOutCount > +this.financeUserInfo.cashAmount) {
        this.$toast('可用充值余额不足！');
        return;
      } else if (!this.userPayPassword.length) {
        this.$toast('请输入安全密码！');
        return;
      }
      this.countDown();
      this.showRemindPopup = true;
    },
    countDown() { // 倒计时
      clearInterval(this.timer);
      this.disabledClick = true;
      let count = 10;
      this.timer = setInterval(() => {
        count -= 1;
        if (count <= 0) {
          clearInterval(this.timer);
          this.disabledClick = false;
          this.count = 0;
        } else {
          this.count = count;
        }
      }, 1000);
    },
    closeRemindPopup() {
      this.showRemindPopup = false;
      clearInterval(this.timer);
      this.count = 10;
    },
    userDeliveryHandle() { // 用户定投操作
      const data = {
        id: this.popupData.id,
        coin: this.rentOutCount,
        mineType: this.tableItem.key,
      };
      this.$api.userDeliveryHandle(data).then(res => {
        this.$toast('投放成功！');
        this.$emit('update');
        this.rentOutCount = ''; // 投放数量
        this.userPayPassword = ''; // 安全码
        this.closeThrowIn();
        this.showRemindPopup = false;
        console.log('用户定投操作', res);
      }).catch(err => {
        console.log('用户定投操作出错', err);
      });
    },
  },
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.financePeriodPopup {
  .throwInMask {
    @allCenter();
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
    .throwInContentBox {
      width: 6.92rem;
      padding-bottom: 0.32rem;
      background: @color-default;
      border-radius: 0.1rem;
      @media (max-width: 768px) {
        width: 96%;
      }

      .throwInContent {
        .throwInTitle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.24rem 0.4rem 0;
          .closeBtn {
            color: @color-main;
            font-size: 0.4rem;
            cursor: pointer;
          }
        }
        .throwInInfo {
          padding: 0.2rem 0.7rem;
          .throwInInfoItem {
            display: flex;
            justify-content: space-between;
            color: #333;
            line-height: 0.46rem;
            &.gray {
              justify-content: flex-start;
              align-items: baseline;
              color: #999;
              line-height: 0.34rem;
              .balance {
                color: #3d8bff;
                @font-xl();
              }
            }
          }
          .inptBox {
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
            height: 0.48rem;
            color: #3a9dff;
            background: #d1e8ff;
            margin-top: 0.26rem;
            margin-bottom: 0.4rem;
            @media (max-width: 768px) {
              font-size: 0.12rem;
            }
          }
          .confirmBtn {
            @allCenter();
            width: 3.6rem;
            height: 0.48rem;
            color: @color-eco-pool;
            @font-s();
            background: @color-default;
            margin: 0 auto;
            border: 1px solid @color-eco-pool;
            border-radius: 0.24rem;
            cursor: pointer;
            &:hover {
              color: @color-default;
              background: @color-eco-pool;
            }
          }
        }
      }
    }
  }
  .remindMask {
    @allCenter();
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
    .remindContentBox {
      width: 5.5rem;
      padding: 0.32rem 0.4rem;
      background: @color-default;
      border-radius: 0.1rem;
      @media (max-width: 768px) {
        width: 90%;
      }
      .remindContent {
        .remindContentText {
          padding: 0.4rem 0;
        }
        .remindBtnBox {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .consentBtn {
            @allCenter();
            width: 4.32rem;
            height: 0.48rem;
            color: #ff2626;
            background: rgba(255, 189, 189, 1);
            border-radius: 0.24rem;
            cursor: pointer;
            outline: none;
            margin-bottom: 0.24rem;
            &.disabled {
              color: @color-default;
              background: #bbbbbb;
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
  }
}
</style>
