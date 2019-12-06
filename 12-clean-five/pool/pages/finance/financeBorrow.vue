<!-- 活期宝 -->
<!-- 只有bhd的活期宝可用借入2019年12月5日15:28:07 -->
<template>
  <div class="financeBorrow financeM">
    <div class="financeM_main">
      <div class="main_title">
        <div class="main_title_left">活期宝</div>
        <div class="main_title_right">{{tableItem.key=='bhd'?'支持充值+借入':'充值可投'}} </div>
      </div>
      <div class="main_tips">收益每日结算，每日分配到账</div>
      <div class="main_body">
        <div class="main_body_operation">
          <div class="mbo_yield">{{numberData.yearInterest}}% <p>最高固定年化{{numberData.yearInterest}}%初始值10%</p>
          </div>
          <div class="mbo_btn">
            <div
              class="mbo_output"
              @click="financeBorrowPopupFn('showReadPopupEvent')"
            >赎回</div>
            <div
              class="mbo_input"
              @click="financeBorrowPopupFn('showWritePopupEvent')"
            >存入</div>
          </div>
        </div>
        <div class="main_body_info">
          <div class="mbi_intro">{{tipsText[8]}}</div>
          <div class="mbi_number">
            <p>未生效额度<span>{{numberData.uneffectCoin}} {{tableItem.name}}</span></p>
            <p>已计息额度<span>{{numberData.coin}} {{tableItem.name}}</span></p>
            <p>已计息天数<span>{{numberData.yetDay}}天</span></p>
          </div>
        </div>
      </div>
      <div class="main_p">{{tipsText[7]}}</div>
    </div>
    <financeBorrowPopup
      ref="financeBorrowPopup"
      @update="update"
      :numberData="numberData"
    ></financeBorrowPopup>
  </div>
</template>

<script>
import financeBorrowPopup from './financeBorrowPopup';

export default {
  name: '',
  inject: ['tableItem'],
  components: {
    financeBorrowPopup,
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
      tipsText: {},
      // 各种数字数据
      numberData: {},
    };
  },
  computed: {

  },
  created() {
    // 获取文案数据
    this.getWrite(7);
    this.getWrite(8);
    this.getFreedomFundOrder();
  },
  mounted() {

  },
  methods: {
    // 获取文案数据
    async getWrite(writeType = 1) {
      const res = (await this.$api.getWrite({
        writeType,
        mineType: this.tableItem.key,
      }));
      if (res && res.writeValue) {
        this.$set(this.tipsText, writeType, res.writeValue);
      }
    },
    financeBorrowPopupFn(fn) {
      this.$refs.financeBorrowPopup[fn]();
    },
    async getFreedomFundOrder() {
      this.numberData = await this.$api.getFreedomFundOrder({
        mineType: this.tableItem.key,
      });
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
