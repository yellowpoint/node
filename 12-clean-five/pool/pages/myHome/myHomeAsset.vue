<!-- 我的首页 资产tabs -->
<template>
  <div
    class="myHomeAsset"
    :class="{open:isOpen}"
  >
    <div class="mha_thead">
      <div
        class="mha_thead_itemBox"
        @click="openTable"
      >
        <div
          v-for="(stItem,stIndex) of switchTableList "
          :key="stIndex"
          class="mha_thead_item"
          :class="{act:switchTableIndex===stIndex}"
          @click="switchTable($event, stIndex)"
        >{{stItem}}</div>
      </div>
      <div
        v-show="switchTableIndex!==-1"
        class="mha_thead_act"
        :style="`
          transform: translate3d(${this.switchTableIndex*(isBHD ? 1.42 : 1.88)}rem , -50%, 0);
          left: ${isBHD ? 0.34 : 0.58}rem;
        `"
      ></div>
      <!-- :class="getTableActClass" -->
    </div>
    <el-collapse-transition>
      <div
        v-show="isOpen"
        class="mha_tbody clearfix"
      >
        <keep-alive>
          <myHomeAssetRecharge
            class="mha_tbody_item"
            v-if="switchTableIndex===0"
          ></myHomeAssetRecharge>
        </keep-alive>
        <keep-alive>
          <myHomeAssetAddress
            class="mha_tbody_item"
            v-if="isBHD && switchTableIndex===1"
          ></myHomeAssetAddress>
        </keep-alive>
        <keep-alive>
          <myHomeAssetWithdraw
            class="mha_tbody_item"
            v-if="switchTableIndex===(isBHD ? 2 : 1)"
          ></myHomeAssetWithdraw>
        </keep-alive>
        <keep-alive>
        <myHomeAssetTransfer
          class="mha_tbody_item"
          v-if="switchTableIndex===(isBHD ? 3 : 2)"
        ></myHomeAssetTransfer>
        </keep-alive>
        <div
          class="mha_tbody_close"
          @click="closeTable"
        ><i></i>
          <p>收起<span class="iconfont iconshouqi"></span></p><i></i>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import myHomeMixins from './myHome_mixins';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import myHomeAssetRecharge from './myHomeAssetRecharge';
import myHomeAssetAddress from './myHomeAssetAddress';
import myHomeAssetWithdraw from './myHomeAssetWithdraw';
import myHomeAssetTransfer from './myHomeAssetTransfer';

export default {
  name: '',
  mixins: [myHomeMixins],
  components: {
    elCollapseTransition: CollapseTransition,
    myHomeAssetRecharge,
    myHomeAssetAddress,
    myHomeAssetWithdraw,
    myHomeAssetTransfer,
  },
  props: {
  },
  data() {
    return {
      isOpen: false,
      switchTableList: ['充值', '地址', '提现', '划转'],
      switchTableIndex: -1,
      isBHD: true,
    };
  },
  computed: {
    getTableActClass() {
      return 'act' + this.switchTableIndex;
    },
  },
  created() {
    if (this.mineType !== 'bhd' && this.mineType !== 'BHD') {
      this.isBHD = false;
      this.switchTableList = ['充值', '提现', '划转'];
    }
    this.getBorrowAddress();
  },
  mounted() {
  },
  methods: {
    getBorrowAddress() { // 获取用户借入金额钱包地址
      const data = {
        mineType: this.mineType,
      };
      this.$api.getBorrowAddress(data).then(res => {
        this.borrowAddress = res;
        this.newBorrowAddress = res;
        console.log('获取用户借入金额钱包地址', res);
      }).catch(err => {
        console.log('获取用户借入金额钱包地址出错', err);
      });
    },
    switchTable(e, index) {
      if (this.switchTableIndex == index) {
        this.closeTable();
        try {
          e.stopPropagation(); // 非IE浏览器
        } catch (err) {
          window.event.cancelBubble = true; // IE浏览器
        }
      } else {
        this.switchTableIndex = index;
      }
    },
    openTable() {
      if (this.isOpen) { return; }
      // 延迟一下展开，switchTableIndex由-1改为选中index后再展开，否则动画会卡一下
      setTimeout(() => {
        this.isOpen = true;
      }, 10);
    },
    closeTable() {
      if (!this.isOpen) { return; }
      this.isOpen = false;
      setTimeout(() => {
        this.switchTableIndex = -1;
      }, 300);
    },

  },
};
</script>

<style lang='less' scoped>
.myHomeAsset {
  width: 5.7rem;
  background: #fff;
  border-radius: 0.05rem;
  border: 1px solid @color-main;
  &.open {
    .mha_thead {
      border: 0;
    }
    .mha_tbody {
      border: 0;
    }
  }
  .mha_thead {
    position: relative;
    height: 0.4rem;
    color: @color-main;
    @font-s();
    transition: border 1s;
    .mha_thead_itemBox {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      display: flex;
      width: 100%;
      height: 100%;
    }
    .mha_thead_item {
      position: relative;
      flex: 1;
      @allCenter();
      @pointer();
      transition: color 0.26s;
      &:after {
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 1px;
        height: 0.1rem;
        background: @color-main;
      }
      &:last-child:after {
        display: none;
      }
      &.act {
        color: #fff;
      }
    }
    .mha_thead_act {
      position: absolute;
      top: 50%;
      left: 0.34rem;
      z-index: 1;
      transform: translate3d(0, -50%, 0);
      width: 0.72rem;
      height: 0.24rem;
      background: @color-main;
      border-radius: 0.12rem;
      transition: transform 0.26s;
      // &.act1 {
      //   transform: translate3d(1.42rem, -50%, 0);
      // }
      // &.act2 {
      //   transform: translate3d(2.84rem, -50%, 0);
      // }
      // &.act3 {
      //   transform: translate3d(4.26rem, -50%, 0);
      // }
    }
  }
  .mha_tbody {
    .mha_tbody_item {
      overflow: hidden;
    }
    .mha_tbody_close {
      height: 0.5rem;
      padding: 0 0.32rem;
      @allCenter();
      @pointer();
      color: @color-main;
      @font-s();
      i {
        width: 2rem;
        height: 0.02rem;
        background: @color-main;
      }
      p {
        @allCenter();
        width: 0.87rem;
      }
    }
  }
}
.mha_mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 40;
  background: rgba(0, 0, 0, 0.5);
}
</style>
