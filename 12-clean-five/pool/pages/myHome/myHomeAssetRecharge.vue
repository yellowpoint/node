<!-- 我的首页 资产tabs 充值模块 -->
<template>
  <div class="mha_tbody_item_recharge">
    <div class="mhati_main">
      <div
        class="mhati_main_nav"
        v-if="mineType=='bhd' || mineType=='BHD'"
      >
        <div class="mhati_main_nav_itemBox">
          <div
            class="mhati_main_nav_item"
            :class="{act:switchIndex===0}"
            @click="switchTable(0)"
          >充值到充值账户</div>
          <div
            class="mhati_main_nav_item"
            :class="{act:switchIndex===1}"
            @click="switchTable(1)"
          >借入到借入账户</div>
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
          <p>你可以从任意地址发送到地址</p>
          <div class="mhatimbi_main">
            <div class="mhatimbi_main_code">{{poolRechargeAddress}}</div>
            <div
              class="mhatimbi_main_copy iconfont iconfuzhi"
              @click="copyPoolRechargeAddress"
            ></div>
          </div>
          <p>等区块网络3个确认以后系统会自动完成充值到您的可用余额</p>
        </div>
        <div
          class="mhati_main_body_item"
          v-show="switchIndex===1"
        >
          <div v-if="borrowAddress">
            <p>请从您的钱包：<span>{{borrowAddress}}</span></p>
            <div class="mhatimbi_main">
              <p>指向任意数量到：</p>
              <div class="mhatimbi_main_code">{{poolBorrowAddress}}</div>
              <div
                class="mhatimbi_main_copy iconfont iconfuzhi"
                @click="copyPollBorrowAddress"
              ></div>
            </div>
            <p>请务必使用绑定地址进行借出，其他地址借出无效</p>
          </div>
          <div v-else>
            <div class="unAuth">
              <p>您尚未绑定个人钱包，指向借入无法读取！</p>
              <div
                class="smallConfirm"
                @click="toBind"
              >前往绑定</div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="mhati_tips">
      <h3>充值提醒</h3>
      <div class="mhati_tips_main">{{tipsText[1]}}</div>
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
      switchIndex: 0,
      poolRechargeAddress: '',
      poolBorrowAddress: '',
    };
  },
  computed: {

  },
  created() {
    // 获取文案数据
    this.getWrite(1);
    this.getPoolRechargeAddress();
    this.getPoolBorrowAddress();
  },
  mounted() {

  },
  methods: {
    // 获取矿池充值地址
    async getPoolRechargeAddress() {
      this.poolRechargeAddress = await this.$api.getPoolAddress({ mineType: this.mineType });
    },
    // 获取借入指向地址
    async getPoolBorrowAddress() {
      this.poolBorrowAddress = await this.$api.homepagePoolAddress({ mineType: this.mineType });
    },
    copyPoolRechargeAddress() {
      this.$copy(this.poolRechargeAddress);
    },
    copyPollBorrowAddress() {
      this.$copy(this.poolBorrowAddress);
    },
    toBind() { // 跳转到tabs的地址模块
      this.$parent.switchTableIndex = 1;
    },


  },
};
</script>

<style lang='less' scoped>
@import './myHomeAsset.less';
</style>

