<!-- 合作挖矿 图表 -->
<template>
  <div class="echartsModule">
    <div class="echartsTitle">最近10天</div>
    <div
      ref="echart"
      class="echartsBox"
    ></div>
  </div>
</template>

<script>

export default {
  name: 'finance_echartsBox',
  components: {},
  inject: ['tableItem'],
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
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
  },
  mounted() {
    // 生命周期 - 挂载完成
    this.allVolumeData = this.data;
    this.initAllVolumeDataRateCharts();
  },
  methods: {

    // 组件方法
    initAllVolumeDataRateCharts() {
      // 基于准备好的dom，初始化echarts实例
      const breakOutChart = this.$echarts.init(this.$refs.echart);
      // 指定图表的配置项和数据
      const option = {
        grid: [
          {
            x: '0',
            y: '0',
            x2: '0',
            y2: '0',
          },
        ],
        xAxis: {
          show: false,
          name: '',
          type: 'category',
          boundaryGap: false,
          inverse: true, // 是否倒序
          nameLocation: 'start',
          data: this.allVolumeData.map(item => {
            return this.$common.timestampToTime(item.createTime, 'M-D');
          }),
          splitLine: {
            show: true,
          },
          nameTextStyle: {
            color: '#333',
            fontSize: 12,
            padding: [140, 0, 0, -60],
          },
        },
        yAxis: {
          show: false,
          name: `${this.tableItem.name}最近10天`,
          type: 'value',
          nameGap: 20,
          axisLabel: {
            formatter: '{value}',
          },
          splitLine: {
            // show: true,
          },
          nameTextStyle: {
            color: '#333',
            fontSize: 14,
            padding: [0, 0, 0, 10],
          },
        },
        series: [
          {
            name: '收益率',
            type: 'line',
            data: this.allVolumeData.map(item => {
              return item.deliveryRate;
            }),
            symbol: 'circle',
            symbolSize: '1',
            smooth: true,
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(72, 150, 255,0.4)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(72, 150, 255,0.4)',
                  },
                ]),
              },
            },
            itemStyle: {
              normal: {
                color: '#4896FF',
                lineStyle: {
                  width: 1, // 折线宽度
                  color: '#4896FF', // 折线颜色
                },
                // borderColor: '#F7F7F7', // 拐点边框颜色
                borderWidth: 0,
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
            return `&nbsp;&nbsp;&nbsp;&nbsp;${item.axisValue}<br />${item.marker}${item.seriesName}: ${item.data}%`;
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
.echartsModule {
  position: relative;
  width: 100%;
  height: 100%;
  border-left: 1px solid @color-main;
  border-bottom: 1px solid @color-main;
  .echartsTitle {
    position: absolute;
    top: 0;
    left: 0.1rem;
    color: @color-main;
    @font-s();
    opacity: 0.8;
  }
  .echartsBox {
    width: 100%;
    height: 100%;
  }
}
</style>
