<!-- 图表模块 -->
<template>
  <div class="echartsModule">
    <div class="contentBox">
      <div class="selectBox">
        <div
          :class="item.active ? 'selectItem active' : 'selectItem'"
          v-for="(item, index) in selectData"
          :key="index"
          @click="tabNav(item, index)"
        >
          {{ item.name }}
        </div>
      </div>
      <div
        ref="echart"
        class="echartsBox"
      ></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'echartsModule',
  components: {},
  inject: ['tableItem'],
  props: {
    apiKey: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      type: 7,
      selectData: [
        {
          name: '周',
          type: 7,
          active: true,
        },
        {
          name: '月',
          type: 30,
          active: false,
        },
      ],
      allVolumeData: [],
    };
  },
  computed: {
    // 组件计算属性
  },
  watch: {
    // 组件监听事件
  },
  created() {
    // 生命周期 - 创建完成
    this.getAllVolume();
  },
  mounted() {
    // 生命周期 - 挂载完成
  },
  methods: {
    tabNav(val, index) { //  菜单切换
      this.selectData.forEach(item => {
        item.active = false;
      });
      val.active = true;
      this.type = val.type;
      this.getAllVolume();
    },
    async getAllVolume() {
      let data = {};
      if (this.apiKey) {
        data = {
          type: this.type,
          mineType: this.tableItem.key,
          apiKey: this.apiKey,
        };
      } else {
        data = {
          type: this.type,
          mineType: this.tableItem.key,
        };
      }

      this.allVolumeData = await this.$api.getOnlineVolume(data);
      this.initAllVolumeDataRateCharts();
    },
    // 组件方法
    initAllVolumeDataRateCharts() {
      // 基于准备好的dom，初始化echarts实例
      const breakOutChart = this.$echarts.init(this.$refs.echart);

      // 指定图表的配置项和数据
      const option = {
        grid: [
          {
            x: '60',
            y: '60',
            x2: '30',
            y2: '60',
          },
        ],
        xAxis: {
          name: '',
          type: 'category',
          boundaryGap: false,
          inverse: true, // 是否倒序
          nameLocation: 'start',
          data: this.allVolumeData.map(item => {
            return this.$common.timestampToTime(item.tagTime, 'M-D');
          }),
          axisLabel: {
            textStyle: { // x轴文字颜色
              color: '#666',
            },
          },
          splitLine: { // 网格竖线
            show: true,
            lineStyle: {
              color: ['#ececec'],
              width: 1,
              type: 'solid',
            },
          },
          nameTextStyle: { // x轴标题样式
            color: '#333',
            fontSize: 12,
            fontWeight: 400,
            padding: [140, 0, 0, -60],
          },
          axisLine: { // x轴线条颜色
            lineStyle: {
              color: '#ececec',
            },
          },
        },
        yAxis: {
          name: `${this.tableItem.name}在线T数`,
          type: 'value',
          nameGap: 20,
          // max: 50,//去掉最大值限制，让其自适应
          axisLabel: {
            textStyle: { // y轴文字颜色
              color: '#666',
            },
          },
          splitLine: { // 网格横线
            show: true,
            lineStyle: {
              color: ['#ececec'],
              width: 1,
              type: 'solid',
            },
          },
          nameTextStyle: {
            color: '#333',
            fontSize: 14,
            fontWeight: 400,
            padding: [0, 0, 0, 10],
          },
          axisLine: {
            lineStyle: { // y轴线条颜色
              color: '#ececec',
            },
          },
        },
        series: [
          {
            name: '容量',
            type: 'line',
            data: this.allVolumeData.map(item => {
              return item.volume;
            }),
            symbol: 'circle',
            symbolSize: '1',
            smooth: true,
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#575FFF',
                  },
                  {
                    offset: 1,
                    color: '#575FFF',
                  },
                ]),
              },
            },
            itemStyle: {
              normal: {
                color: '#575FFF',
                lineStyle: {
                  width: 2, // 折线宽度
                  color: '#575FFF', // 折线颜色
                },
                borderColor: '#F7F7F7', // 拐点边框颜色
                borderWidth: 1,
                textStyle: {
                  color: '@color-default',
                  type: 'solid', // dotted虚线，solid实线
                },
              },
            },
          },
        ],
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            const item = params[0];
            return `&nbsp;&nbsp;&nbsp;&nbsp;${item.axisValue}<br />${item.marker}${item.seriesName}: ${item.data}TB`;
          },
        },
      };

      // 使用刚指定的配置项和数据显示图表。
      breakOutChart.setOption(option);
      window.addEventListener('resize', () => {
        breakOutChart.resize();
      });
    },
  },


};
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.echartsModule {
  width: 100%;
  min-height: 2.4rem;
  padding: 0.3rem;
  .contentBox {
    position: relative;
    height: 2.4rem;
    background: #f4f8ff;
    .selectBox {
      position: absolute;
      z-index: 10;
      right: 0.26rem;
      top: 0.2rem;
      width: 1.08rem;
      height: 0.22rem;
      @allCenter();
      background: #ececec;
      border: 1px solid #d0d0d0;
      border-radius: 2px;
      .selectItem {
        flex: 1;
        @font-s();
        color: @color-font-light;
        text-align: center;
        cursor: pointer;
        &.active {
          background: #fafafa;
        }
      }
    }
    .echartsBox {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
