<!-- 我的首页 资产tabs 提现模块 -->
<template>
  <div class="mha_tbody_item_withdraw">
    <div class="mhati_main">

      <div class="mhati_main_balance">
        <div class="longLabel">当前可提现余额</div>
        <div class="fontB">{{withdrawableCash}}&nbsp;{{tableItem.name}}</div>
      </div>
      <div class="mhati_main_address">
        <div class="longLabel">提现地址</div>
        <div
          class="addr"
          v-if="userWalletAddr"
        >
          <div class="fontB">{{userWalletAddr}}</div>
          <div
            class="change"
            @click="changeAddress"
          >修改</div>
        </div>
        <div
          class="noAddr"
          v-else
        >
          <p>请先前往绑定提现地址</p>
          <div
            class="change"
            @click="changeAddress"
          >前往</div>
        </div>
      </div>

      <div class="mhati_main_amount">
        <div class="longLabel">提现数量</div>
        <div class="inputBox">
          <input
            v-model.trim="cashCount"
            type="text"
            @input="cashCountOninputEvent()"
            placeholder="数量为正整数"
          >
          <div class="units">{{tableItem.name}}</div>
        </div>
      </div>

      <div class="mhati_main_password">
        <div class="longLabel">安全密码</div>
        <div class="inputBox">
          <input
            v-if="userInfo.isPwd"
            type="password"
            v-model.trim="cashPayPassword"
            maxlength="8"
            autocomplete="new-password"
            placeholder="请输入安全密码"
          >
          <div
            v-if="!userInfo.isPwd"
            class="toSetPwd"
            @click="toSetPwd"
          >设置</div>
        </div>
        <div
          v-if="userInfo.isPwd"
          class="smallConfirm"
          @click="getCash"
        >确认</div>
      </div>
    </div>
    <div class="mhati_tips">
      <h3>提现提醒</h3>
      <div class="mhati_tips_main">{{tipsText[3]}}</div>
    </div>
  </div>
</template>

<script>
import myHomeMixins from './myHome_mixins';

export default {
  name: '',
  mixins: [myHomeMixins],
  inject: ['myHomeDetail_this'],
  components: {

  },
  data() {
    return {
      cashCount: '', // 提现数量
      userWalletAddr: '', // 用户钱包地址
      cashPayPassword: '', // 提现安全密码
    };
  },
  props: {
    prop: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    withdrawableCash() {
      return this.myHomeDetail_this.borrowInfo[this.tableItem.key].withdrawableCash;
    },
  },
  created() {
    // 获取文案数据
    this.getWrite(3);
    this.getUserWalletAddr();
  },
  mounted() {
  },
  methods: {
    getUserWalletAddr() { // 获取用户钱包地址
      const data = {
        mineType: this.mineType,
      };
      this.$api.getUserWalletAddr(data).then(res => {
        this.userWalletAddr = res;
        console.log('获取用户钱包地址', res);
      }).catch(err => {
        console.log('获取用户钱包地址出错', err);
      });
    },
    cashCountOninputEvent() { // 提现输入正整数
      if (this.cashCount) {
        if (this.cashCount < 0) {
          this.cashCount = 0;
        }
        if (!/^\d+$/.test(this.cashCount)) {
          this.cashCount = '';
        }
      }
    },
    async getCash() { // 提现
      if (!this.userWalletAddr) {
        this.$toast('您尚未设置提现地址，请先设置提现地址，才能提现！');
        return;
      }
      if (this.cashCount == '0' || this.cashCount == '') {
        this.$toast('提现金额必须为正整数！');
        return;
      }
      if (!/^[a-zA-Z0-9]{8}$/.test(this.cashPayPassword)) {
        this.$toast('请输入正确的安全密码！');
        return;
      }
      await this.commonVerifyPayPassword(this.cashPayPassword).then(res => {
        if (res) {
          this.sendCashRequest(); // 校验通过发起提现请求
        }
      }).catch(err => {
        console.log('提现校验密码出错', err);
      });
    },
    sendCashRequest() { // 发起提现请求
      const data = {
        mineType: this.mineType,
        conin: this.cashCount,
        payPwd: this.$md5(this.cashPayPassword),
      };
      this.$api.getCash(data).then(res => {
        this.$toast('提交成功，等待审核');
        this.updateData(this.mineType);// 操作后更新数据
        this.cashPayPassword = '';
        this.cashCount = '';
        console.log('提现', res);
      }).catch(err => {
        console.log('提现出错', err);
      });
    },
    changeAddress() {
      this.$SetPopup({
        popupType: 'resetAddress',
        mineType: this.mineType,
        userWalletAddr: this.userWalletAddr,
        updateAddressCB: this.getUserWalletAddr,
      });
    },
  },
};
</script>

<style lang='less' scoped>
.mha_tbody_item_withdraw {
  .mhati_main {
    padding: 0.3rem;
    border-bottom: 0.1rem solid #f6f9fc;
    @font-s();
    .longLabel {
      width: 1.3rem;
      flex-shrink: 0;
    }
    .fontB {
      color: @color-main;
      @font-s();
      font-weight: bold;
    }
    .change {
      width: 0.48rem;
      height: 0.24rem;
      background: rgba(255, 255, 255, 1);
      border: 1px solid @color-main;
      border-radius: 0.04rem;
      color: @color-main;
      @allCenter();
      margin-left: auto;
      @pointer();
    }
    .inputBox {
      position: relative;
      flex: 1;
      display: flex;
      height: 0.4rem;
      border: 1px solid rgba(232, 232, 232, 1);

      input {
        flex: 1;
        text-indent: 0.15rem;
      }
      .units {
        width: 0.7rem;
        height: 100%;
        @font-m();
        font-weight: 600;
        color: @color-main;
        @allCenter();
      }
    }
    .mhati_main_balance {
      display: flex;
      align-items: center;
      margin-bottom: 0.2rem;
    }
    .mhati_main_address {
      display: flex;
      align-items: center;
      margin-bottom: 0.2rem;
      .addr {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
      }
      .noAddr {
        display: flex;
        align-items: center;
        p {
          margin-right: 0.1rem;
          color: #999;
        }
      }
    }
    .mhati_main_amount {
      display: flex;
      align-items: center;
      margin-bottom: 0.2rem;
    }
    .mhati_main_password {
      display: flex;
      position: relative;
      align-items: center;
      .inputBox {
        margin-right: 0.3rem;
      }
      .toSetPwd {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        background: @color-main;
        color: @color-default;
        cursor: pointer;
        padding: 0 0.1rem;
      }
    }
    .smallConfirm {
      width: 0.84rem;
      height: 0.4rem;
      background: @color-main;
      font-size: 0.14rem;
      color: @color-default;
      @allCenter();
      border-radius: 0.2rem;
      cursor: pointer;
      margin: 0 auto;
    }
    .mhati_main_tips {
      color: #999;
      @font-s();
      margin: 0.14rem 0;
    }
  }
  .mhati_tips {
    padding: 0.2rem 0.32rem;
    h3 {
      margin-bottom: 0.2rem;
      @font-l();
      font-weight: bold;
    }
    p {
      margin-bottom: 0.1rem;
      @font-s();
    }
    .mhati_tips_main {
      @font-s();
      line-height: 1.5;
      white-space: pre-wrap;
    }
  }
}
</style>
