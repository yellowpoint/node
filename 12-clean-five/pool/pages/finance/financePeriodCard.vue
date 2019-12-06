<!-- 增值专区 定投卡片 -->
<template>
  <div
    class="financePeriodCard hvr-bob hvr-shadow"
    :class="{later:type===2,finish:type===3}"
    @click="showThrowInPopupEvent()"
  >
    <div class="financePeriodCard_top">
      <div class="financePeriodCard_annual"><span>年化率</span><em>{{cardData.interest}}%</em></div>
      <div class="financePeriodCard_period"><span>周期</span><em>{{cardData.periodTimeNum}}</em>天</div>
      <div class="financePeriodCard_phase">第<em>{{cardData.periodsNo}}</em>期</div>
      <div
        class="financePeriodCard_time"
        v-if="type===2"
      >{{cardData.startTime|moment('Y-M-D H:m')}} 发售</div>
      <div class="financePeriodCard_btn">{{getBtn()}}</div>
    </div>
    <div class="financePeriodCard_bottom">
      <div class="financePeriodCard_item">总额度<p>{{cardData.totalAmount}} {{tableItem.name}}</p>
      </div>
      <div class="financePeriodCard_item">剩余额度<p>{{cardData.residueAmount }} {{tableItem.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: '',
  components: {

  },
  inject: ['tableItem'],
  props: {
    cardData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      // 样式类型，1为可投放、2为敬请期待、3为抢完了
      type: 1,
    };
  },
  computed: {
  },
  created() {

  },
  mounted() {
    this.getType();
  },
  methods: {
    getBtn() {
      switch (this.type) {
        case 1:
          return '投入';
        case 2:
          return '敬请期待';
        case 3:
          return '抢完了';
        default:
          return '投入';
      }
    },
    getType() {
      // 后台返回的status，2：敬请期待；1：可以投放，如果余额为0则是抢完了
      if (this.cardData.status == 2) {
        this.type = 2;
        return;
      }
      if (this.cardData.status == 1) {
        if (this.cardData.residueAmount > 0) {
          this.type = 1;
          return;
        }
        this.type = 3;
      }
    },
    showThrowInPopupEvent() {
      if (this.type == 1) {
        this.$emit('showThrowInPopupEvent', this.cardData);
      }
    },
  },
};
</script>

<style lang='less' scoped>
.financePeriodCard {
  display: flex;
  flex-direction: column;
  width: 3.6rem;
  border: 1px solid rgba(222, 222, 222, 1);
  border-radius: 0.04rem;
  @pointer();

  .financePeriodCard_top {
    position: relative;
    height: 1.5rem;
    background: linear-gradient(
      135deg,
      rgba(60, 110, 255, 1),
      rgba(72, 150, 255, 1)
    );

    border-radius: 0.04rem;
    color: #fff;
    @font-l();
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      background-image: url("~@/assets/images/finance/card.png");
      background-size: 2.32rem auto;
      background-repeat: no-repeat;
      background-position: top right;
    }
    .financePeriodCard_annual {
      position: absolute;
      top: 0.16rem;
      left: 0.24rem;
      z-index: 22;
      span {
        display: inline-block;
        width: 0.7rem;
      }
      em {
        font-size: 0.32rem;
        .fontB;
        .fontNum;
      }
    }
    .financePeriodCard_period {
      position: absolute;
      top: 0.66rem;
      left: 0.24rem;
      z-index: 22;
      span {
        display: inline-block;
        width: 0.7rem;
      }
      em {
        margin-right: 0.05rem;
        @font-xl();
        .fontB();
      }
    }
    .financePeriodCard_phase {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 22;
      padding: 0.1rem;
      opacity: 0.8;
      em {
        padding: 0 0.05rem;
        @font-xxxl();
        .fontB();
        .fontNum;
      }
    }
    .financePeriodCard_time {
      position: absolute;
      bottom: 0.13rem;
      left: 0.24rem;
      z-index: 22;
      width: 1.8rem;
      height: 0.25rem;
      line-height: 0.25rem;
      color: #fff;
      @font-s();
    }
    .financePeriodCard_btn {
      position: absolute;
      bottom: 0.13rem;
      right: 0.16rem;
      z-index: 22;
      width: 1.14rem;
      height: 0.25rem;
      background: #fff;
      border-radius: 0.04rem;
      color: @color-main;
      @allCenter();
      @font-s();
      .fontB();
    }
  }

  .financePeriodCard_bottom {
    display: flex;
    height: 0.84rem;
    background: #fff;
    @font-s();
    .financePeriodCard_item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0.2rem;
      p {
        color: #666666;
        .fontB();
      }
    }
  }
  &.later {
    cursor: not-allowed;
    .financePeriodCard_top {
      background: linear-gradient(
        135deg,
        rgba(156, 60, 255, 1),
        rgba(188, 60, 255, 1)
      );
      .financePeriodCard_btn {
        color: #b53cff;
      }
    }
  }
  &.finish {
    cursor: not-allowed;
    .financePeriodCard_top {
      background: #919191;
      .financePeriodCard_btn {
        color: #919191;
      }
    }
  }
}
</style>
