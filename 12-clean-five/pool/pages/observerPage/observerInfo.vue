<!-- 组件说明 -->
<template>
  <div class="">
    <div
      class="pool_table_detail_data"
      v-if="incomeRate[tableItem.key]&&poolData[tableItem.key].volume"
    >
      <div class="ptdd_left">
        <div class="ptdd_left_body">
          <div class="ptdd_left_body_item">
            <span>矿机容量</span>
            <p>{{poolData[tableItem.key].volume || 0}} TB</p>
          </div>
          <div class="ptdd_left_body_item">
            <span>AccountKey</span>
            <p class="copy"><span>{{AccountKey}}</span><i
                class="iconfont iconfuzhi"
                @click="copy"
              ></i></p>
          </div>
        </div>
      </div>
      <div class="ptdd_right">
        <div class="ptdd_right_title"><i class="iconfont iconyanzhengma"></i>当前可获得<span>{{incomeRate[tableItem.key].rate}}%</span>收益</div>
        <div class="ptdd_right_body">
          <div class="ptdd_right_body_item">
            <span>当前抵押率</span>
            <el-progress
              class="progress_red"
              color="#FF5757"
              :stroke-width="25"
              :percentage="incomeRate[tableItem.key].mortgageRate || 0"
            ></el-progress>
          </div>
          <div class="ptdd_right_body_item">
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
</template>

<script>
// import x from ''
export default {
  name: '',
  components: {

  },
  props: {
    tableItem: {
      type: Object,
      default: () => ({}),
    },
    poolData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      // 抵押率
      incomeRate: {},
    };
  },
  computed: {
    AccountKey() {
      return this.$store.getters.userInfo.userCode;
    },
  },
  created() {
    this.init(this.tableItem.key);
  },
  mounted() {
  },
  methods: {
    init(mineType) {
      this.getRate(mineType);
    },
    // 获取抵押率
    async getRate(mineType) {
      const data = {
        mineType: mineType,
        apiKey: this.apiKey,
      };
      const res = await this.$api.getIncomeRate(data);
      this.$set(this.incomeRate, mineType, res);
    },
    copy() {
      this.$copy(this.AccountKey);
    },
  },
};
</script>

<style lang='less' scoped>
.pool_table_detail_data {
  display: flex;
  justify-content: space-between;
  padding: 0.3rem;

  .ptdd_left,
  .ptdd_right {
    flex: 1;
    height: 1.4rem;
  }

  .ptdd_left {
    margin-right: 0.3rem;

    .ptdd_left_body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      padding: 0.2rem 0;
      .ptdd_left_body_item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        @font-s();
        color: #2e0707;
        span {
          @font-l();
          .fontB();
        }
        p {
          color: #666;
          @font-xl();
          .fontB();
          &.copy {
            display: flex;
            align-items: center;
            span {
              @allCenter();
              height: 0.37rem;
              padding: 0 0.1rem;
              background: #e6f1ff;
              color: @color-main;
            }

            .iconfont {
              margin-left: 0.1rem;
              font-size: 0.16rem;
              color: @color-main;
              @active();
            }
          }
        }
      }
    }
  }

  .ptdd_right {
    .ptdd_right_title {
      display: flex;
      align-items: center;
      margin-bottom: 0.3rem;
      @font-l();
      font-weight: bold;

      span {
        margin: 0 0.1rem;
        color: #ff4a4a;
      }

      .iconfont {
        margin-right: 0.1rem;
        color: #333;
        font-size: 0.16rem;
      }
    }

    .ptdd_right_body {
      display: flex;
      flex-direction: column;

      .ptdd_right_body_item {
        display: flex;
        align-items: center;
        margin-bottom: 0.2rem;
        @font-s();
        color: #666666;

        .el-progress {
          display: flex;
          align-items: center;
          width: 3.6rem;
          height: 0.25rem;
          margin-left: 0.36rem;
        }
      }
    }
  }
}
</style>
