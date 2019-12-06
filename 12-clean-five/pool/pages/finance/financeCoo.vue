<!-- 合作挖矿 -->
<template>
  <div class="financeCoo financeM">
    <div class="financeM_main">
      <div class="main_title">
        <div class="main_title_left">合作挖矿</div>
        <div class="main_title_right">充值可投</div>
      </div>
      <div class="main_tips">收益每日结算，每日分配到账</div>
      <div
        class="main_body"
        ref="parallax"
      >
        <div class="main_body_operation">
          <div
            class="mbo_yield"
            data-depth=".1"
          >
            <div>≈{{numberData.yieldRate}}%
              <p>昨日投放100{{tableItem.name}}，合作挖矿分成收入{{(100*numberData.yieldRate/100/365).toFixed(4)}}{{tableItem.name}}</p>
            </div>
          </div>
          <div
            class="mbo_input"
            @click="userHandleEvent"
          >投入</div>
        </div>
        <div class="main_body_info">
          <div
            class="mbi_chart"
            v-if="numberData.deliveryRateVos"
          >
            <financeCooPopupEchart
              :selectTrData="tableItem"
              :data="numberData.deliveryRateVos"
            ></financeCooPopupEchart>
          </div>
          <div class="mbi_number">
            <p>期数<span>第{{numberData.cycle}}期</span></p>
            <p>总额度<span>{{numberData.totalAmount }} {{tableItem.name}}</span></p>
            <p>剩余额度<span>{{numberData.residueAmount }} {{tableItem.name}}</span></p>
            <p>周期<span>{{numberData.cycle}}天</span></p>
          </div>
        </div>
      </div>
      <div class="main_p">{{tipsText}}</div>
    </div>
  </div>
</template>

<script>
import ThrowIn from './financeCooPopup/index';
import financeCooPopupEchart from './financeCooPopupEchart';
import Parallax from '@/utils/lib/parallax.3.1.0.min.js';

export default {
  name: '',
  inject: ['tableItem', 'finance_this'],
  components: {
    financeCooPopupEchart,
  },
  props: {
    prop: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      tipsText: '',
      // 各种数字数据
      numberData: {},
    };
  },
  computed: {
    // 可用余额等信息
    financeUserInfo() {
      return this.finance_this.financeUserInfo;
    },
    userInfo() { // 用户信息
      return this.$store.getters.userInfo;
    },
  },
  created() {
    // 获取文案数据
    this.getWrite(10);
    this.getFreedomFundOrder();
  },
  mounted() {
    // eslint-disable-next-line no-unused-vars
    const parallaxInstance = new Parallax(this.$refs.parallax, {
      relativeInput: true,
      hoverOnly: true, // 只有在hover改元素的时候动
      scalarX: 10, // 摩擦系数，越大越飘
      selector: '.main_body_operation .mbo_yield', // 运动的元素
      pointerEvents: true,
    });
  },
  methods: {
    // 获取文案数据
    async getWrite(writeType = 1) {
      const res = (await this.$api.getWrite({
        writeType,
        mineType: this.tableItem.key,
      }));
      if (res && res.writeValue) {
        this.tipsText = res.writeValue;
      }
    },
    async getFreedomFundOrder() {
      this.numberData = await this.$api.getCooperativeMining({
        mineType: this.tableItem.key,
      });
    },
    userHandleEvent(row) { // 投放事件弹窗
      if (this.userInfo) {
        ThrowIn({
          financeUserInfo: this.financeUserInfo,
          tableItem: this.tableItem,
          popupInfo: this.numberData,
          cb: this.update,
        });
      } else {
        this.$RegPopup({
          popupType: 'accountLogIn',
        });
      }
    },
    update() {
      this.getFreedomFundOrder();
      this.$emit('update');
    },
  },
};
</script>

<style lang='less' scoped>
@import "./financeM.less";
</style>
