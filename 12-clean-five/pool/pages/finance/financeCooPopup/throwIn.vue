<!-- 设置组件 -->
<template>
  <div
    class="throwIn-popup fadeIn"
    ref="msgText"
    @click="close"
    @touchmove.prevent
    style="animation-duration: 0.3s;"
  >
    <div
      class="content-wrap"
      @click.stop
    >
      <div class="headerTitle">
        <text-title>投放订单</text-title>
        <div
          class="closeBtn"
          @click="close"
        >&times;</div>
      </div>
      <div class="throwIn-content">
        <div class="throwInLimitBox">
          <div class="throwInTitle">投放额度</div>
          <div class="inptBox">
            <input
              class="inpt"
              type="text"
              v-model.trim="rentOutCount"
              @input="rentOutOninputEvent($event)"
              placeholder="10"
              @focus="clearPositionTimer"
              @blur="resetPosition"
            >
            <div class="units">{{tableItem.name}}</div>
          </div>
          <div class="throwInMsg">当前可用充值余额: <span class="balanceCount"> {{financeUserInfo.cashAmount}} </span>{{tableItem.name}}</div>
          <div class="throwInMsg">投放额度 10 {{tableItem.name}}起</div>
          <div class="throwInMsg">现在投放预计{{incomeTime}}产生收益，{{entryTime}}入账</div>
        </div>
        <div class="allottedTimeBox">
          <div class="throwInTitle">投放期限</div>
          <div class="userSelectBox">
            <div
              class="selectItem"
              v-for="(item, index) in listData"
              :key="index"
              @click="userSelsectEvent(item)"
              :class="item.active ? 'active' : ''"
            >
              <div class="time">{{item.time}}天</div>
              <div class="income">预计可得：{{item.income}}{{tableItem.name}}</div>
            </div>
          </div>
        </div>
        <div class="passwordBox">
          <div class="throwInTitle"><i class="iconfont icon-mima passwordIcon"></i> 安全密码</div>
          <div class="inptBox">
            <input
              class="inpt"
              type="password"
              v-model.trim="userPayPassword"
              autocomplete="new-password"
              maxlength="8"
              placeholder="请输入安全密码"
              @focus="clearPositionTimer"
              @blur="resetPosition"
            >
          </div>
        </div>
        <div class="msgInfo">提示：您将要投放 {{rentOutCount}} {{tableItem.name}}，投放期限 {{rentOutTime}} 天！</div>
        <button
          class="confirmBtn"
          @click="showRemindPopupEvent()"
        >确定</button>
      </div>
    </div>
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
              请注意您现在投放的是 “{{rentOutTime}}天” 定期，在该订单 “{{deadline}}” 到期之前不可撤销。
            </div>
            <div class="remindBtnBox">
              <button
                :class="disabledClick ? 'consentBtn disabled' : 'consentBtn'"
                :disabled="disabledClick"
                @click="checkoutPayPassword($event)"
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
import commonMixins from '@/mixins/common';

export default {

  name: 'throwIn',

  mixins: [commonMixins],

  components: {},

  props: {
    financeUserInfo: {
      type: Object,
      default: () => ({}),
    },
    popupInfo: {
      type: Object,
      default: () => ({}),
    },
    tableItem: {
      type: Object,
      default: () => ({}),
    },
    cb: {
      type: [Function, Object],
      default: null,
    },
  },
  data() {
    return {
      msgText: '',
      rentOutCount: '',
      userPayPassword: '',
      rentOutTime: 0,
      throwInOptions: [], // 投放期限配置
      orderInfo: {},
      cbFun: null,
      listData: [], // 租用期限列表数据
      timer: null,
      showRemindPopup: false, // 显示提醒弹窗
      count: 10,
      disabledClick: true, // 禁止点击
      positionTimer: null,
    };
  },
  computed: {
    incomeTime() { // 收益日期
      const nextdate = new Date().getTime() + (24 * 60 * 60 * 1000);
      return this.$common.timestampToTime(nextdate, 'M月D日');
    },
    entryTime() { // 入账时间
      const nextdate = new Date().getTime() + (2 * 24 * 60 * 60 * 1000);
      return this.$common.timestampToTime(nextdate, 'M月D日');
    },
    deadline() {
      const endTime = new Date().getTime() + ((Number(this.rentOutTime) + 1) * 24 * 60 * 60 * 1000);
      return this.$common.timestampToTime(endTime, 'M月D号');
    },
  },

  watch: {
    rentOutCount(newVal) { // 增加消抖
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.throwInIncome();
      }, 500);
    },
  },

  created() {
    this.orderInfo = this.popupInfo; // 只执行一次，第一次执行将静态props赋值给data,通过data实时渲染dom,静态props无法实时渲染
    this.cbFun = this.cb;
    this.throwInOptions = [this.orderInfo.cycle];
    this.listData = [{
      time: this.orderInfo.cycle,
      income: 0,
      active: true,
    }];
    this.rentOutTime = this.orderInfo.cycle;
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
        const el = document.querySelector('.throwIn-popup');
        if (el) {
          this.rentOutCount = '';
          this.userPayPassword = '';
          el.style.display = 'none';
          el.remove();
          $('body').css({ overflow: 'visible', 'padding-right': '0px' });
          $('html').css({ overflow: 'visible' });
          $('#longNavType').css({ right: '0px' });
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
      this.$refs.msgText.classList.add('fadeOut');
      this.$refs.msgText.classList.remove('fadeIn');
      setTimeout(() => { // 释放弹窗
        this.destroy();
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
    userSelsectEvent(val) { // 选中事件
      for (const item of this.listData) {
        item.active = false;
      }
      val.active = true;
      this.rentOutTime = val.time;
    },
    rentOutOninputEvent(e) { // 输入正整数
      if (!/^\d+$/.test(e.target.value)) {
        e.target.value = e.target.value.replace(/\D/g, '');
        this.rentOutCount = e.target.value.replace(/\D/g, '');
      }
    },
    throwInIncome() { // 计算收益
      if (this.rentOutCount.length) {
        const data = {
          amount: this.rentOutCount,
          dayList: this.throwInOptions,
          mineType: this.tableItem.key,
        };
        this.$api.throwInIncome(data).then(res => {
          for (const key in res) {
            if (Object.prototype.hasOwnProperty.call(res, key)) {
              // eslint-disable-next-line array-callback-return
              this.listData.map((listItem) => {
                if (listItem.time == key) {
                  listItem.income = res[key];
                }
              });
            }
          }
          console.log('获取预计收益', res);
        }).catch(err => {
          console.log('获取预计收益出错', err);
          if (err.msg) {
            this.$toast(err.msg);
          }
        });
      } else {
        for (const item of this.listData) {
          item.income = 0;
        }
      }
    },
    checkoutPayPassword(e) { // 校验密码
      this.disabledClick = true;
      const data = {
        payPwd: this.$md5(this.userPayPassword),
      };
      this.$api.checkPayPassword(data).then(res => {
        if (res) {
          this.addLeaseOrder();
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
    addLeaseOrder() { // 订单投放
      if (!this.rentOutCount) {
        this.$toast('请输入投放额！');
        this.disabledClick = false;
      } else if (this.rentOutCount < 10) {
        this.$toast(`投放额度必须大于等于10${this.tableItem.name}！`);
        this.disabledClick = false;
        return;
      } else if (!this.rentOutTime) {
        this.$toast('请选择投放期限！');
        this.disabledClick = false;
        return;
      }
      const data = {
        allottedTime: this.orderInfo.cycle,
        amount: this.rentOutCount,
        hireId: this.orderInfo.id,
        mineType: this.tableItem.key,
      };
      this.$api.addLeaseOrder(data).then(res => {
        this.$toast('投放成功！');
        if (this.cbFun) {
          this.cbFun();
        }
        this.close();
        this.closeRemindPopup();
        console.log('投放成功', res);
        this.disabledClick = false;
      }).catch(err => {
        this.userPayPassword = '';
        console.log('投放出错', err);
        if (err.msg) {
          this.$toast(err.msg);
        }
        this.disabledClick = false;
      });
    },
    showRemindPopupEvent() {
      if (!this.rentOutCount) {
        this.$toast('输入投放数量！');
        return;
      } else if (this.rentOutCount < 10) {
        this.$toast(`投放额度必须大于等于10${this.tableItem.name}！`);
        return;
      } else if (!this.rentOutTime) {
        this.$toast('请选择投放期限！');
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
  },
};
</script>

<style lang="less" scoped>
// @import url('./setPopup');
.throwIn-popup {
  @allCenter();
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  .content-wrap {
    width: 6.92rem;
    background: @color-default;
    border-radius: 0.1rem;
    @media (max-width: 768px) {
      width: 95%;
    }
    .headerTitle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: @color-default;
      padding: 0.25rem 0.4rem 0.1rem;
      .closeBtn {
        color: @color-main;
        font-size: 0.4rem;
        cursor: pointer;
      }
    }
    .throwIn-content {
      padding: 0 0.7rem 0.4rem;
      .throwInTitle {
        @font-m();
        font-weight: 400;
        color: #333;
        line-height: 0.42rem;
      }
      .throwInLimitBox {
        .throwInMsg {
          @font-m();
          line-height: 0.16rem;
          font-weight: 400;
          color: #999;
          margin-bottom: 0.18rem;
          .balanceCount {
            font-size: 0.2rem;
            color: @color-eco-pool;
          }
        }
      }
      .allottedTimeBox {
        margin-bottom: 0.22rem;
        .userSelectBox {
          width: 100%;
          height: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .selectItem {
            display: flex;
            justify-content: space-around;
            flex-direction: column;
            align-items: center;
            width: 100%;
            height: 1rem;
            padding: 0.06rem 0;
            background: @color-default;
            border: 1px solid #b3b3b3;
            border-radius: 0.1rem;
            cursor: pointer;
            .time {
              color: @color-main-pool;
              @font-xl();
              font-weight: bold;
            }
            .income {
              text-align: center;
              color: @color-main-pool;
              @font-s();
            }
            &:hover {
              background: @color-light;
              border-color: @color-light;
            }
            &.active {
              .time,
              .income {
                color: @color-default;
              }
              background: @color-main-pool;
              border-color: @color-main-pool;
            }
          }
        }
      }
      .passwordBox {
        margin-bottom: 0.33rem;
        .throwInTitle {
          display: flex;
          align-items: center;
        }
        .passwordIcon {
          color: #333;
          @font-xl();
        }
        .inpt {
          width: 100%;
          height: 0.4rem;
          color: #666666;
          text-indent: 0.1rem;
          padding-right: 0.7rem;
          border: 1px solid #b3b3b3;
          &:focus {
            border: 1px solid @color-main;
          }
        }
      }
      .msgInfo {
        @allCenter();
        width: 100%;
        height: 0.48rem;
        color: @color-main;
        background: @color-light;
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
      .inptBox {
        position: relative;
        display: flex;
        height: 0.4rem;
        margin-bottom: 0.2rem;
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
            border: 1px solid @color-main;
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
          color: @color-main-pool;
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
    }
  }
  .remindMask {
    @allCenter();
    position: fixed;
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
