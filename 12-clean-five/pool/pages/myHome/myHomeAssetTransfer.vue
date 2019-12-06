<!-- 我的首页 资产tabs 划转模块 -->
<template>
  <div class="mha_tbody_item_transfer">
    <div class="mhati_main">
      <div
        class="mhati_main_nav"
        v-if="mineType!='xhd' && mineType!='XHD'"
      >
        <div class="mhati_main_nav_itemBox">
          <div
            class="mhati_main_nav_item"
            :class="{act:switchIndex===0}"
            @click="switchTable(0)"
          >抵押申请</div>
          <div
            class="mhati_main_nav_item"
            :class="{act:switchIndex===1}"
            @click="switchTable(1)"
          >抵押赎回</div>
        </div>
        <div
          class="mhati_main_nav_act"
          :class="{act1:switchIndex===1}"
        ></div>
      </div>
      <div class="mhati_main_body">
        <div
          class="mhati_main_body_item"
          v-show="switchIndex===0"
        >
          <div v-if="mineType!='xhd' && mineType!='XHD'">
            <div class="mhati_main_amount">
              <div class="longLabel">划进抵押额</div>
              <div class="inputBox">
                <input
                  v-model.trim="toApplyCount"
                  type="text"
                  @input="toApplyOninputEvent()"
                  placeholder="将可用余额划进到抵押额，划转金额精确到8位小数！"
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
                  v-model.trim="toApplyPayPassword"
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
                @click="getToApply"
              >确认</div>
            </div>
          </div>
          <div v-else>
            <!-- XHD -->
            <div class="mhati_main_balance">
              <div class="longLabel">可用余额</div>
              <div class="fontB">{{availableBalance}}&nbsp;{{tableItem.name}}</div>
            </div>
            <div class="mhati_main_amount">
              <div class="longLabel">划进抵押额</div>
              <div class="inputBox">
                <input
                  v-model.trim="toApplyCount"
                  type="text"
                  @input="toApplyOninputEvent()"
                  placeholder="将可用余额划进到抵押额，划转金额精确到8位小数！"
                >
                <div
                  class="allBtn"
                  @click="inputAll"
                >全部</div>
              </div>
            </div>
            <div class="mhati_time_config">
              <div class="longLabel">抵押时长</div>
              <div class="timeBox">
                <div
                  :class="item.active ? 'timeItem active' : 'timeItem'"
                  v-for="(item, index) in weightList"
                  :key="index"
                  @click="changeTime(item);"
                >{{item.configName}}</div>
              </div>
            </div>
            <div class="mhati_main_weight">
              <div class="longLabel">生效抵押额</div>
              <div class="fontB">
                <span>{{toApplyCount}}&nbsp;{{tableItem.name}}&nbsp;&nbsp;X&nbsp;&nbsp;{{(weightObj && weightObj.configValue) || 0}}&nbsp;%&nbsp;=&nbsp;{{compute_pledge_count}}&nbsp;{{tableItem.name}}</span>
                <el-tooltip placement="right">
                  <div
                    slot="content"
                    class="tipBox"
                  >
                    <img
                      :src="pool_table_item_xhd_rate_img[0].pic_url"
                      alt=""
                    >
                  </div>
                  <i class="icon iconfont iconproblem issueIcon"></i>
                </el-tooltip>
              </div>
            </div>
            <div class="mhati_main_password mb20">
              <div class="longLabel">安全密码</div>
              <div class="inputBox">
                <input
                  v-if="userInfo.isPwd"
                  type="password"
                  v-model.trim="toApplyPayPassword"
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
                @click="getToApply"
              >确认</div>
            </div>
          </div>
        </div>
        <div
          class="mhati_main_body_item"
          v-show="switchIndex===1"
        >
          <div class="mhati_main_amount">
            <div class="longLabel">抵押额赎回</div>
            <div class="inputBox">
              <input
                v-model.trim="toRedeemCount"
                type="text"
                @input="toRedeemOninputEvent()"
                placeholder="将抵押额划转到余额，划转金额精确到8位小数！"
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
                v-model.trim="toRedeemPayPassword"
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
              @click="getToRedeem"
            >确认</div>
          </div>
        </div>
      </div>
    </div>
    <div class="mhati_tips">
      <div v-show="switchIndex===0">
        <h3>抵押提醒</h3>
        <div class="mhati_tips_main">{{tipsText[4]}}</div>
      </div>
      <div v-show="switchIndex===1">
        <h3>赎回提醒</h3>
        <div class="mhati_tips_main">{{tipsText[5]}}</div>
      </div>
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
  inject: ['provideData', 'myHomeDetail_this'],
  props: {

  },
  data() {
    return {
      switchIndex: 0,
      toApplyCount: '', // 划转到抵押的数量
      toRedeemCount: '', // 划转到余额的数量
      toApplyPayPassword: '', // 申请抵押支付密码
      toRedeemPayPassword: '', // 抵押赎回支付密码
      weightList: [], // 抵押时长
      weightObj: null, // 对应的权重
    };
  },
  computed: {
    mortgageLeaseCount() {
      return this.provideData.mortgageLeaseCount[this.mineType].stockActive;
    },
    pool_table_item_xhd_rate_img() {
      return this.$store.getters.picsInfo.xhd_rate;
    },
    compute_pledge_count() {
      if (this.toApplyCount && this.weightObj && this.weightObj.configValue) {
        return Number(this.toApplyCount) * Number(this.weightObj.configValue) / 100;
      }
      return 0;
    },
    availableBalance() {
      return this.myHomeDetail_this.borrowInfo[this.tableItem.key].availableBalance;
    },
  },
  created() {
    // 获取文案数据
    this.getWrite(4);
    this.getWrite(5);
    if (this.mineType == 'xhd' || this.mineType == 'XHD') { // 获取配置
      this.getRateConfig();
    }
  },
  mounted() {
  },
  methods: {
    toApplyOninputEvent() { // 划转到抵押输入正整数（精确到8位小数）
      if (/^\d+[.]/.test(this.toApplyCount)) {
        const floatingPoint = this.toApplyCount.split('.')[1];
        if (floatingPoint.length > 8) {
          const intPart = this.toApplyCount.split('.')[0];
          this.toApplyCount = `${intPart}.${floatingPoint.slice(0, 8)}`;
        }
      }
    },
    toRedeemOninputEvent() { // 划转到余额输入数量（精确到8位小数）
      if (/^\d+[.]/.test(this.toRedeemCount)) {
        const floatingPoint = this.toRedeemCount.split('.')[1];
        if (floatingPoint.length > 8) {
          const intPart = this.toRedeemCount.split('.')[0];
          this.toRedeemCount = `${intPart}.${floatingPoint.slice(0, 8)}`;
        }
      }
    },
    async getToApply() { // 划转到抵押
      if (this.toApplyCount == '0' || this.toApplyCount == '' || !/^\d+$|^\d+[.]\d{1,8}$/.test(this.toApplyCount)) {
        this.$toast('金额格式错误，划转金额精确到8位小数！');
        return;
      }
      if (this.mineType == 'xhd' || this.mineType == 'XHD') {
        if (!this.weightObj) {
          this.$toast('请选择抵押时长！');
          return;
        }
      }
      await this.commonVerifyPayPassword(this.toApplyPayPassword).then(res => {
        if (res) {
          this.toApplyRequest(); // 校验通过发起请求
        } else {
          this.toApplyPayPassword = '';
        }
      }).catch(err => {
        console.log('提现校验密码出错', err);
      });
    },
    toApplyRequest() { // 发起 划转到抵押 请求
      const data = (this.mineType == 'xhd' || this.mineType == 'XHD') ?
        {
          mineType: this.mineType,
          conin: this.toApplyCount,
          payPwd: this.$md5(this.toApplyPayPassword),
          id: this.weightObj.id,
        } : {
          mineType: this.mineType,
          conin: this.toApplyCount,
          payPwd: this.$md5(this.toApplyPayPassword),
        };
      this.$api.getToApply(data).then(res => {
        this.toApplyCount = '';
        this.toApplyPayPassword = '';
        this.$toast('划转抵押成功！');
        this.updateData(this.mineType);// 操作后更新数据
        console.log('划转到抵押', res);
      }).catch(err => {
        this.toApplyCount = '';
        this.toApplyPayPassword = '';
        console.log('划转到抵押出错', err);
      });
    },
    async getToRedeem() { // 划转到余额
      if (this.toRedeemCount == '0' || this.toRedeemCount == '' || !/^\d+$|^\d+[.]\d{1,8}$/.test(this.toRedeemCount)) {
        this.$toast('金额格式错误，划转金额精确到8位小数！');
        return;
      }
      if (this.toRedeemCount > +this.mortgageLeaseCount.stockActive) {
        this.$toast('实际抵押额不足！');
        return;
      }
      await this.commonVerifyPayPassword(this.toRedeemPayPassword).then(res => {
        if (res) {
          this.toRedeemRequest(); // 校验通过发起请求
        } else {
          this.toRedeemPayPassword = '';
        }
      }).catch(err => {
        console.log('提现校验密码出错', err);
      });
    },
    toRedeemRequest() { // 发起划转到余额的请求
      const data = {
        mineType: this.mineType,
        conin: this.toRedeemCount,
        payPwd: this.$md5(this.toRedeemPayPassword),
      };
      this.$api.getToRedeem(data).then(res => {
        this.toRedeemCount = '';
        this.toRedeemPayPassword = '';
        this.$toast('划转余额成功！');
        this.updateData(this.mineType);// 操作后更新数据
        console.log('划转到余额', res);
      }).catch(err => {
        console.log('划转到余额出错', err);
      });
    },
    getRateConfig() { // 获取配置
      const data = {
        mineType: this.mineType,
      };
      this.$api.getRateConfig(data).then(res => {
        this.weightList = res;
        console.log('获取配置', res);
      }).catch(err => {
        console.log('获取配置出错', err);
      });
    },
    inputAll() { // 赋值全部余额
      this.toApplyCount = Math.floor(this.availableBalance);
    },
    changeTime(obj) { // 选择周期
      this.weightList.forEach((item, index) => {
        this.$set(item, 'active', false);
      });
      this.$set(obj, 'active', true);
      this.weightObj = obj;
    },
  },
};
</script>

<style lang='less' scoped>
@import "./myHomeAsset.less";
.mha_tbody_item_transfer {
  position: relative;
  @clearfix();
  .longLabel {
    width: 1rem;
  }
  .allBtn {
    width: 0.7rem;
    height: 100%;
    @font-m();
    font-weight: 600;
    color: @color-main;
    @allCenter();
    cursor: pointer;
  }
  .fontB {
    color: @color-main;
    @font-s();
    font-weight: bold;
  }
  .mb20 {
    margin-bottom: 0.2rem;
  }
  .mhati_time_config {
    display: flex;
    align-items: center;
    .timeBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex: 1;
      .timeItem {
        width: 0.86rem;
        height: 0.32rem;
        @allCenter();
        color: @color-main;
        background: @color-slight;
        cursor: pointer;
        &.active {
          border: 1px solid @color-main;
          background: @color-default url("~assets/images/myHome/active.png")
            no-repeat right bottom;
        }
      }
    }
  }
  .mhati_main_weight {
    display: flex;
    margin: 0.3rem 0;
    .tipBox {
      width: 5.8rem;
      height: 4.06rem;
    }
    .issueIcon {
      margin-left: 0.1rem;
    }
  }
}
</style>
