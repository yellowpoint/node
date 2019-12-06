<!-- 我的首页 币种详情 -->
<template>
  <div
    class="myHomeDetail"
    @dblclick="closeAssetTable"
  >
    <div class="myHomeDetail_item">
      <div class="myHomeDetail_title">
        <div class="mhdt_name"><i class="iconfont iconzichan"></i>资产</div>
        <myHomeAsset
          ref="myHomeAsset"
          @dblclick.native.stop
        ></myHomeAsset>
      </div>
      <div class="myHomeDetail_data">
        <myHomeCard
          :style="`${(tableItem.key!='bhd' && tableItem.key!='BHD') ? 'flex: 1' : ''}`"
          :mineType="tableItem"
          title="充值余额"
          :myHomeCardList="getMyHomeCardList(tableItem,'asset')"
        ></myHomeCard>
        <myHomeCard
          v-if="tableItem.key=='bhd' || tableItem.key=='BHD'"
          :mineType="tableItem"
          title="借入余额"
          :myHomeCardList="getMyHomeCardList(tableItem,'asset2')"
        ></myHomeCard>
      </div>
    </div>
    <div class="myHomeDetail_item">
      <div class="myHomeDetail_title">
        <div class="mhdt_name"><i class="iconfont iconshouyidefuben"></i>收益 </div>
        <router-link
          to="/dataQuery"
          class="mhdt_go"
        >收益明细<i class="el-icon-arrow-right"></i></router-link>
      </div>
      <div class="myHomeDetail_data">
        <myHomeCard
          :mineType="tableItem"
          title="挖矿收益"
          :type="2"
          :myHomeCardList="getMyHomeCardList(tableItem,'profit')"
        ></myHomeCard>
        <myHomeCard
          :mineType="tableItem"
          title="增值收益"
          :type="2"
          :myHomeCardList="getMyHomeCardList(tableItem,'profit2')"
        ></myHomeCard>
      </div>
    </div>
    <div class="myHomeDetail_item">
      <div class="myHomeDetail_title">
        <div class="mhdt_name"><i class="iconfont iconjiqi"></i>矿机</div>
      </div>
      <div
        class="myHomeDetail_data"
        v-if="incomeRate[tableItem.key]&&mortgageLeaseCount[tableItem.key]"
      >
        <div class="mhdd_left">
          <div class="mhdd_left_title"><i class="iconfont iconyanzhengma"></i>抵押信息
            <div class="scaleBox">当前条件容量证明系数 1: {{incomeRate[tableItem.key].theoryRate}}</div>
          </div>
          <div class="mhdd_left_body">
            <div class="mhdd_left_body_item">
              <span>理论抵押</span>
              <p>{{mortgageLeaseCount[tableItem.key].stock}} {{tableItem.name}}</p>
            </div>
            <div class="mhdd_left_body_item">
              <span>实际抵押</span>
              <p>{{mortgageLeaseCount[tableItem.key].stockActive}} {{tableItem.name}}</p>
            </div>
          </div>
        </div>
        <div class="mhdd_right">
          <div class="mhdd_right_title"><i class="iconfont iconyanzhengma"></i>当前可获得<span>{{incomeRate[tableItem.key].rate}}%</span>收益</div>
          <div class="mhdd_right_body">
            <div class="mhdd_right_body_item">
              <span>当前抵押率</span>
              <el-progress
                class="progress_red"
                color="#FF5757"
                :stroke-width="25"
                :percentage="incomeRate[tableItem.key].mortgageRate || 0"
              ></el-progress>
            </div>
            <div class="mhdd_right_body_item">
              <span>当前收益率</span>
              <el-progress
                class="progress_blue"
                color="#575FFF"
                :stroke-width="25"
                :percentage="incomeRate[tableItem.key].rate || 0"
              ></el-progress>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import commonMixins from '@/mixins/common';
import myHomeCard from './myHomeCard';
import myHomeAsset from './myHomeAsset';

export default {
  name: '',
  mixins: [commonMixins],
  components: {
    myHomeCard,
    myHomeAsset,
  },
  provide() {
    return {
      tableItem: this.tableItem,
      provideData: this.$data,
      myHomeDetail_this: this,
    };
  },
  props: {
    tableItem: {
      type: Object,
      default: () => ({}),
    },
    profitData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      // 借入相关信息
      borrowInfo: {},
      // 抵押率
      incomeRate: {},
      // 抵押和出租数量
      mortgageLeaseCount: {},
    };
  },
  computed: {

  },
  created() {

  },
  mounted() {
    this.init(this.tableItem.key);
  },
  methods: {
    init(mineType) {
      this.getBorrowInfo(mineType);
      this.getRate(mineType);
      this.getMortgageLeaseCount(mineType);
    },
    getMyHomeCardList(tableItem, type) {
      let result = [];
      let mine_data = {};
      // 充值余额
      if (type === 'profit') {
        mine_data = this.profitData[tableItem.key];
        if (!mine_data) {
          return;
        }
        result = [{ name: '今日挖矿收益', data: mine_data.todayProfit },
          { name: '昨日挖矿收益', data: mine_data.yesterdayProfit },
          { name: '历史总收益', data: mine_data.totalProfit }];
      }
      // 借入余额
      if (type === 'profit2') {
        mine_data = this.profitData[tableItem.key];
        if (!mine_data) {
          return;
        }
        result = [{ name: '昨日定投收益', data: mine_data.yestDayFundPledgeProfit },
          { name: '昨日活期宝收益', data: mine_data.yesterdayBorrow },
          { name: '昨日合作挖矿收益', data: mine_data.yesterdayCooperative }];
      }
      // 挖矿收益
      if (type === 'asset') {
        mine_data = this.borrowInfo[tableItem.key];
        if (!mine_data) {
          return;
        }
        result = [{ name: '可用余额', data: mine_data.availableBalance },
          { name: '总额度', data: mine_data.totalCashWithdrawals },
          { name: '冻结数量', data: mine_data.freezingAmount },
          { name: '可提现数量', data: mine_data.withdrawableCash }];
      }
      // 增值收益
      if (type === 'asset2') {
        mine_data = this.borrowInfo[tableItem.key];
        if (!mine_data) {
          return;
        }
        result = [{ name: '可用借入抵押额', data: mine_data.availableMortgage },
          { name: '借入总额', data: mine_data.borrowMortgage },
          { name: '生效额度', data: mine_data.effectiveMortgage },
          { name: '可赎回额', data: mine_data.redeemableMortgage }];
      }
      return result;
    },
    async getBorrowInfo(mineType) { // 获取余额借入金额信息
      const res = await this.$api.newBorrowInfo({ mineType });
      this.$set(this.borrowInfo, mineType, res);
    },
    // 获取抵押率
    async getRate(mineType) {
      const res = await this.$api.getIncomeRate({ mineType });
      this.$set(this.incomeRate, mineType, res);
    },
    // 获取抵押,理论抵押,出租金额,租借金额数量
    async getMortgageLeaseCount(mineType) {
      const res = await this.$api.getMortgageLeaseCount({ mineType });
      this.$set(this.mortgageLeaseCount, mineType, res);
    },
    // 各种操作之后的更新数据
    updateData(mineType) {
      this.getMortgageLeaseCount(mineType); // 重新更新抵押数;
      this.getBorrowInfo(mineType); // 重新请求账户余额
      this.getRate(mineType); // 更新抵押率
      this.$emit('updateData', this.tableItem);
    },
    closeAssetTable() {
      this.$refs.myHomeAsset.closeTable();
    },
  },
};
</script>

<style lang='less' scoped>
@import "./myHomeDetail.less";
</style>
