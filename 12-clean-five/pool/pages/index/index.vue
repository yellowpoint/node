<!-- 首页 -->
<template>
  <div class="index" style="margin-top: -0.8rem;">
    <div class="indexBannerbox" v-for="(item, index) in picInfo.banner_bg" :key="index" :style="`backgroundImage: url(${item.pic_url})`">
      <!-- <div
        class="bannerWrap"
        :class="contentIndex%2==0 ? 'fadeInLeft animate' : 'fadeInRight animate'"
        style="animation-duration: 3s;"
        v-for="(val, contentIndex) in picInfo.banner"
        :key="contentIndex"
      >
        <img :src="val.pic_url" alt="">
      </div> -->
      <div
        class="bannerWrap"
        style="animation-duration: 3s;"
      >
        <div
          class="bannerItemLeft fadeInLeft animate"
          style="animation-duration: 3s;"
        >
          <img src="~assets/images/home/banner1.png" alt="">
        </div>
        <div
          class="bannerItemRight fadeInRight animate"
          style="animation-duration: 3s;"
        >
          <img src="~assets/images/home/bannerRight1.png" alt="">
          <img src="~assets/images/home/bannerRight2.png" class="heart" alt="">
          <img src="~assets/images/home/bannerRight3.png" class="rightTranslate" alt="">
          <div class="imgItem"></div><!-- 支撑父级高度 -->
        </div>
      </div>
    </div>
    <div class="indexSecondBannerBox">
      <div
        class="indexSecondBannerItem"
        v-for="(item, index) in picInfo.header"
        :key="index"
        @click="imgClick(item)"
      >
        <img :src="item.pic_url" alt="">
      </div>
    </div>
    <!-- <waveModule></waveModule> -->
    <div class="indexContent">
      <VPoolTable
        :pool_table_item_list="pool_table_item_list"
        :pool_table_thead_list="pool_table_thead_list"
        :pool_table_thead_list_data="pool_table_thead_list_data"
        :isLoading="isLoading"
      >
        <template #default="slotProps">
          <expanded-molude
            :tableItem="slotProps.tableItem"
            :expandedData="poolInfo"
          ></expanded-molude>
        </template>
      </VPoolTable>
    </div>
    <div class="afficheModuleWrap">
      <affiche-module :pageSize="6" :showPagination="false"></affiche-module>
    </div>
    <div class="advantageBox">
      <div
        class="advantageTitle"
        v-for="(item, index) in picInfo.plat"
        :key="index"
      >
        <img :src="item.pic_url" alt="">
      </div>
      <div class="animationControlBox" ref="animationControlBox">
        <div class="advantageList" v-if="showAdvantage">
          <div
            class="advantageItem animated fadeInRight"
            v-for="(item, index) in picInfo.footer" :key="index"
            :style="{'animation-delay': `${index * 0.5}s`}"
          >
            <img :src="item.pic_url" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="footerBG">
      <img src="~assets/images/home/footerBG.png" alt="">
    </div>
  </div>
</template>

<script>
import afficheModule from 'components/afficheModule/afficheModule';
import expandedMolude from './expandedMolude';
// import waveModule from './waveModule';

export default {
  name: '',
  components: {
    expandedMolude,
    afficheModule,
    // waveModule,
  },
  data() {
    return {
      isLoading: true,
      pool_table_thead_list: ['币种', '主矿池算力', '生态池算力', '全网算力'],
      pool_table_thead_list_data: {},
      poolInfo: {},
      showAdvantage: false, // 优势动画控制
      // tableData: {
      //   home: [
      //     {
      //       name: 'BHD',
      //       key: 'bhd',
      //     },
      //     {
      //       name: 'LHD',
      //       key: 'lhd',
      //     },
      //     {
      //       name: 'HDD',
      //       key: 'hdd',
      //     },
      //   ],
      // },
    };
  },
  computed: {
    // 组件计算属性
    picInfo() { // 图片资源
      return this.$store.getters.picsInfo;
    },
    pool_table_item_list() {
      return this.$store.getters.mineTypeList.home;
    },
  },
  watch: {
    // 组件监听事件
  },
  created() {
    // 生命周期 - 创建完成
    this.pool_table_item_list.forEach(item => {
      this.getHomePoolInfo(item);
    });
  },
  mounted() { // 生命周期 - 挂载完成
    this.addScrollListener();
  },
  methods: { // 组件方法
    async getHomePoolInfo({ key: mineType, name, type }) {
      const res = await this.$api.homePoolInfo({ mineType });
      const aHeader = [];
      aHeader.push(`${name}`);
      aHeader.push(`${res.mainvolume} <span class="units">PB</span>`);
      if (type == 0) {
        aHeader.push(`${res.ecovolume} <span class="units">PB</span>`);
      } else {
        aHeader.push('//');
      }
      aHeader.push(`${res.netcapacity || 0} <span class="units">PB</span>`);
      this.$set(this.pool_table_thead_list_data, mineType, aHeader);
      this.$set(this.poolInfo, mineType, res);
      this.isLoading = false;
    },
    imgClick(item) {
      if (item.outer_url) { // 外链存在跳外链
        window.open(item.outer_url);
      }
      if (item.inner_url) { // 内链存在跳内链
        this.$router.push(item.inner_url);
      }
    },
    advantageAni() {
      const el = this.$refs.animationControlBox;
      const obj = el.getBoundingClientRect();
      const winHeight = document.documentElement.clientHeight || document.body.clientHeight;
      if (obj.top < winHeight && obj.bottom > 0) {
        this.showAdvantage = true;
      }
    },
    addScrollListener() { // 添加滚动监听
      if (window.attachEvent) {
        window.attachEvent('scroll', this.advantageAni);
      } else if (window.addEventListener) {
        window.addEventListener('scroll', this.advantageAni);
      }
    },
    remoreScrollListener() { // 移除滚动监听
      if (window.detachEvent) {
        window.detachEvent('scroll', this.advantageAni);
      } else if (window.removeEventListener) {
        window.removeEventListener('scroll', this.advantageAni);
      }
    },
  },
  beforeCreate() {
    // 生命周期 - 创建之前
  },
  beforeMount() {
    // 生命周期 - 挂载之前
  },
  tbeforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {
    this.remoreScrollListener();
  }, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang="less">
.index {
  .el-table{
    th .cell {
      @font-s();
      font-weight: 400;
      color: @color-font-default;
    }
    td {
      background: none;
      border: 0;
      .cell {
        @font-s();
        color: @color-font-default;
        font-weight: 400;
      }
    }
  }
}
</style>

<style lang="less" scoped>
//@import url(); 引入公共css类
@import url('./index.less');
</style>
