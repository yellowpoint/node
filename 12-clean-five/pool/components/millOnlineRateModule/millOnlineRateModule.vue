<!-- 矿机在线率模块 -->
<template>
    <div class="millOnlineRateModule">
        <div class="chartHeader">
            <text-title>矿机在线率</text-title>
            <div class="chart-timeSpan">
                <switch-btn @tap="changeTimeType" :text="btnText"></switch-btn>
            </div>
        </div>
        <div class="onlineRateCharts onlineRateChartsModule"></div>
    </div>
</template>

<script>
    //import templateName from 'path';
    // 引入 ECharts 主模块
	let echarts = require('echarts/lib/echarts');
	// 引入折线图图
	require('echarts/lib/chart/line');
	// 引入提示框和标题组件
	require('echarts/lib/component/tooltip');

    export default {
        name: "millOnlineRateModule",
        components: {},
        props: {
			apiKey: {
                type: String,
                default: '',
            },
            readOnly: {
                type: Boolean,
                default: false,
            },
		},
        data() {
            return {
                btnText: {
                    openText: '最近24小时',
                    closeText: '最近30天',
                },
                displayType: 1, // 1： 24小时 2：30天
                echartsData: [], // 图表数据
            };
        },
        computed: { 	// 组件计算属性
            mineType() { // 币种
				return this.$store.getters.mineType
			},
        },
        watch: { 	// 组件监听事件

        },
        methods: { 	// 组件方法
            changeTimeType(status) { // 24小时数据和30天数据
				if(status) {
					this.displayType = 1;
					this.getOnlineRate();
				}else{
					this.displayType = 2;
					this.getOnlineRate();
				}
            },
            getOnlineRate() { // 获取矿机在线率
                let data = {
					mineType: this.mineType,
                    displayType: this.displayType,
                }
                if(this.readOnly) {
                    data.apiKey = this.apiKey;
                };
                this.$api.onlineRate(data).then( res => {
					console.log('在线率数据', res);
                    this.echartsData = [];
                    this.echartsData = res.list;
					this.initonlineRateCharts();
                }).catch( err => {
                    console.log('矿机在线率错误', err);
                })
			},
			initonlineRateCharts() {
                // 基于准备好的dom，初始化echarts实例
                var hashrateChart = echarts.init(document.querySelector('.onlineRateChartsModule'));
                // 指定图表的配置项和数据
                var option = {
                    tooltip: {
                        trigger: 'axis'
					},
                    grid: [
                        { // 设置canvs主视图上下左右留白边距
                            x: '60',
                            y: '60',
                            x2: '60',
                            y2: '90',
                        },
                    ],
                    xAxis:  {
                        name: this.displayType == 1 ? '时间 -> now' : '日期',
                        type: 'category',
						boundaryGap: false,
						inverse: true,
						nameLocation: "start",
                        data: this.displayType == 1 ? this.echartsData.map((item) => {
							return this.$common.timestampToTime( item.tagTime, 'h:m')
						}) : this.echartsData.map((item) => {
							return this.$common.timestampToTime( item.tagTime )
						}),
                        splitLine:{
                            show: true
                        },
                        nameTextStyle: {
                            color: '#333',
                            fontSize: 14,
                            padding: [140, 0, 0, -60],
                        },
                        // axisLabel: {
                        //     interval:0, // 优化x轴刻度显示不全的问题
                        //     rotate:40
                        // }
                    },
                    yAxis: {
                        name: '百分率',
                        type: 'value',
                        nameGap: 20,
                        axisLabel: {
							formatter: '{value} %',
						},
						splitNumber: 10,
						min: 0,
						max: 100,
                        splitLine:{
                            show: true
                        },
                        nameTextStyle: {
                            color: '#333',
                            fontSize: 14,
                            padding: [0, 0, 0, 10],
                        }
					},
					// dataZoom: [{
					// }, {
					// 	type: 'inside'
					// }],
                    series: [
                        {	
							name:'在线率',
                            type:'line',
                            data: this.echartsData.map((item) => {
								return item.mineOnlineRate;
							}),
                            symbol: "circle",
							symbolSize: '10',
							smooth: true,
							areaStyle: {
								normal: {
									color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color: '#FF4242'
									}, {
										offset: 1,
										color: 'rgba(255,255,255,0.8)'
									}]),
								}
							},
							itemStyle: {
								normal: {
									color: '#FF4242',
									borderColor: '#F7F7F7', // 拐点边框颜色
									borderWidth: 2,
									textStyle: {
										color: '@color-default',
										type: 'solid' // dotted虚线，solid实线
									}
								}
                            },
						},
                    ],
                    tooltip: {
                        trigger: 'axis',
                        // axisPointer: {
                        //     type: 'cross',
                        //     label: {
                        //         backgroundColor: '#6a7985'
                        //     }
						// },
						// formatter: '{b0}: {c0}<br />{a0}: 00',
						// formatter : function (params) {
						// 	console.log(params);
							// console.log('ss',option.series);
							// return `${params[0].name}: ${params[0].data}%`
							// return `${params[0].name}: ${params[0].data.mineOnlineRate}%<br>在线容量:${params[0].data.activeSize}`
						// },
                    },
                };
                // 使用刚指定的配置项和数据显示图表。
                hashrateChart.setOption(option);
                window.addEventListener("resize", function() {
					hashrateChart.resize();
				});
            },
        },
        created() { 	//生命周期 - 创建完成
            this.getOnlineRate();
        },
        mounted() {	//生命周期 - 挂载完成

        },
        beforeCreate() {}, //生命周期 - 创建之前
        beforeMount() {}, //生命周期 - 挂载之前
        beforeUpdate() {}, //生命周期 - 更新之前
        updated() {}, //生命周期 - 更新之后
        beforeDestroy() {}, //生命周期 - 销毁之前
        destroyed() {}, //生命周期 - 销毁完成
        activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>

<style lang="less" scoped>
    //@import url(); 引入公共css类
    .millOnlineRateModule{
        background: @color-default;
        margin-bottom: 0.2rem;
        box-shadow: 0 0 0.13rem 0 rgba(93,113,255,0.22);
        border-radius: 0.1rem;
        .chartHeader{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.44rem 0.6rem 0.44rem 0.5rem;
            .chart-timeSpan {
                display: flex;
                justify-content: flex-end;
                @font-s();
                color: @color-default;
                width: 2.0rem;
                height: 0.4rem;
            }
        }
        .onlineRateCharts{
            width: 100%;
            height: 4.6rem;
			@media (max-width: 768px) {
                height: 5.6rem;
            }
        }
    }
</style>