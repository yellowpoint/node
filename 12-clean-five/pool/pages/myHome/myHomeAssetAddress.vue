<!-- 我的首页 资产tabs 地址模块 -->
<template>
  <div class="mha_tbody_item_address">
    <div class="mhati_main">

      <div class="mhati_main_address">
        <div class="longLabel">借入地址</div>
        <div class="inputBox">
          <input
            v-model.trim="newBorrowAddress"
            type="text"
            placeholder="请输入您借入的钱包地址"
          >
        </div>
      </div>
      <div class="mhati_main_password">
        <div class="longLabel">安全密码</div>
        <div class="inputBox">
          <input
            v-if="userInfo.isPwd"
            type="password"
            v-model.trim="borrowAddressPayPassword"
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
          @click="setBorrowAddress"
        >确认</div>
      </div>
      <div class="mhati_main_tips">修改您的借入钱包地址。</div>
    </div>

    <div class="mhati_tips">
      <h3>绑定提醒</h3>
      <div class="mhati_tips_main">{{tipsText[2]}}</div>
    </div>
  </div>
</template>

<script>

import myHomeMixins from './myHome_mixins';

export default {
  name: '',
  mixins: [myHomeMixins],
  components: {

  },
  data() {
    return {
      borrowAddressPayPassword: '', // 修改借入金额钱包地址 安全密码
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

  },
  created() {
    // 获取文案数据
    this.getWrite(2);
  },
  mounted() {

  },
  methods: {
    async setBorrowAddress() { // 修改用户借入金额钱包地址
      if (!this.newBorrowAddress) {
        this.$toast('借入金额钱包地址不能能为空！');
        return;
      }
      await this.commonVerifyPayPassword(this.borrowAddressPayPassword).then(res => {
        if (res) {
          this.setBorrowAddressRequest(); // 校验通过发起提现请求
        } else {
          this.borrowAddressPayPassword = '';
        }
      }).catch(err => {
        console.log('提现校验密码出错', err);
      });
    },
    setBorrowAddressRequest() { // 修改用户借入金额钱包地址发送请求
      const data = {
        mineType: this.mineType,
        newAddress: this.newBorrowAddress,
        payPwd: this.$md5(this.borrowAddressPayPassword),
      };
      this.$api.setBorrowAddress(data).then(res => {
        this.$toast('修改成功！');
        this.borrowAddress = res;
        this.newBorrowAddress = res;
        this.borrowAddressPayPassword = '';
        console.log('设置用户借入金额钱包地址', res);
      }).catch(err => {
        console.log('设置用户借入金额钱包地址出错', err);
      });
    },
  },
};
</script>

<style lang='less' scoped>
@import "./myHomeAsset.less";
</style>
