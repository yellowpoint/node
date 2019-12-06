<!-- 定投 -->
<template>
  <div class="financePeriod financeM">
    <div class="financeM_main">
      <div class="main_title">
        <div class="main_title_left">爱挖定投</div>
        <div class="main_title_right">充值可投</div>
      </div>
      <div class="main_tips">收益每日结算，每日分配到账</div>
      <div class="main_body">
        <financePeriodCard
          v-for="(item,index) of cardList"
          :cardData="item"
          :key="index"
          @showThrowInPopupEvent="showThrowInPopupEvent"
        ></financePeriodCard>
      </div>
      <div class="main_p">{{tipsText}}</div>
    </div>
    <!-- 弹窗 -->
    <financePeriodPopup
      ref="financePeriodPopup"
      @update="update"
    ></financePeriodPopup>
  </div>
</template>

<script>
import financePeriodCard from './financePeriodCard';
import financePeriodPopup from './financePeriodPopup';

export default {
  name: '',
  inject: ['tableItem'],
  components: {
    financePeriodCard,
    financePeriodPopup,
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
      cardList: [],
    };
  },
  computed: {

  },
  created() {
    this.getNewFundPledgePlan();
    // 获取文案数据
    this.getWrite(9);
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
        this.tipsText = res.writeValue;
      }
    },
    async getNewFundPledgePlan() {
      this.cardList = await this.$api.getNewFundPledgePlan({
        mineType: this.tableItem.key,
      });
    },
    showThrowInPopupEvent(cardData) {
      this.$refs.financePeriodPopup.showThrowInPopupEvent(cardData);
    },
    update() {
      this.getNewFundPledgePlan();
      this.$emit('update');
    },
  },
};
</script>

<style lang='less' scoped>
@import "./financeM.less";
</style>
