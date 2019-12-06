<!-- 数据统计 -->
<template>
    <div class="statisticsPage content">
        <div class="averageRateBox">
            <div class="titleBox">
                <text-title>每T每日平均收益</text-title>
            </div>
            <div id="averageRateCharts" class="averageRateCharts"></div>
        </div>
        <div class="hashrateBox">
            <div class="titleBox">
                <text-title>最近算力</text-title>
                <switch-btn class="switchBtn" @tap="changeHashrateTimeType" :text="hashrateBtnText"></switch-btn>
            </div>
            <div id="hashrateCharts" class="hashrateCharts"></div>
        </div>
        <div class="divideIntoBox">
            <div class="titleBox">
                <text-title>最近30天投放分成率</text-title>
            </div>
            <div id="divideIntoCharts" class="divideIntoCharts"></div>
        </div>
        <!-- <div class="breakOutBox">
            <div class="titleBox">
                <text-title>最近爆块</text-title>
                <switch-btn class="switchBtn" @tap="changeBreakOutTimeType" :text="breakOutBtnText"></switch-btn>
            </div>
            <div id="breakOutCharts" class="breakOutCharts"></div>
        </div> -->
    </div>
</template>

<script>
    // 引入 ECharts 主模块
    let echarts = require('echarts/lib/echarts');
    // 引入折线图
    require('echarts/lib/chart/line');
    // 引入提示框组件和图例组件
    require('echarts/lib/component/tooltip');
    require("echarts/lib/component/legendScroll");
    
    export default {
        name: "dataStatistics",
        components: {},
        data() {
            return {
                hashrateDisplayType: 0, // 最近算力 0: 24小时  1：30天
                blockDisplayType: 0, // 最近爆块 0: 24小时  1：30天
                mainBombBlock: [], // 爆块主矿池
                vipBombBlock: [], // 爆块SOLO矿池
                mainLatelyPower: [],  // 算力主矿池 
                ecoLatelyPower: [], // 算力生态池
                mainAverageRate: [], // 主矿池平均收益
                ecoAverageRate: [], // 生态池平均收益
                divideInto: [], // 最近30天投放分成率
                hashrateBtnText: {
                    openText: '最近24小时',
                    closeText: '最近30天',
                },
                breakOutBtnText: {
                    openText: '最近24小时',
                    closeText: '最近30天',
                },
            };
        },
        computed: {
            mineType() { // 币种
                return this.$store.getters.mineType;
            }
        },	// 组件计算属性
        watch: {},	// 组件监听事件
        methods: { 	// 组件方法
            changeHashrateTimeType(status) { // 24小时算力和30天算力
				if(status) {
					this.hashrateDisplayType = 0;
					this.getLatelyPower();
				}else{
					this.hashrateDisplayType = 1;
					this.getLatelyPower();
				}
            },
            changeBreakOutTimeType(status) { // 24小时爆块和30天爆块
				if(status) {
					this.blockDisplayType = 0;
					this.getBombBlock();
				}else{
					this.blockDisplayType = 1;
					this.getBombBlock();
				}
            },
            blockLast24h(e) { // 24小时爆块
                this.blockDisplayType = 0;
				this.$refs.blockLast30d.className = '';
                e.target.className = 'active';
                this.getBombBlock();
            },
            blockLast30d(e) { // 30天爆块
                this.blockDisplayType = 1;
				this.$refs.blockLast24h.className = '';
                e.target.className = 'active';
                this.getBombBlock();
            },
            getBombBlock() { // 获取最近爆块
                let data = {
                    displayType: this.blockDisplayType,
                    mineType: this.mineType,
                }
                this.$api.bombBlock(data).then( res => {
                    this.mainBombBlock = res.mainList;
                    this.vipBombBlock = res.vipList;
                    this.initBreakOutCharts();
                    console.log('最近爆块', res);
                }).catch( err => {
                    console.log('最近爆块错误', err);
                })
            },
            getLatelyPower() { // 最近算力
                let data = {
                    displayType: this.hashrateDisplayType,
                    mineType: this.mineType,
                }
                this.$api.latelyPower(data).then( res => {
                    console.log('最近算力', res);
                    this.mainLatelyPower = res.mainList;
                    this.ecoLatelyPower = res.ecoList;
                    this.initHashrateCharts();
                }).catch( err => {
                    console.log('最近算力错误', err);
                })
            },
            getAverageRate() { // 获取平均收益
                let data = {
                    mineType: this.mineType,
                }
                this.$api.averageRate(data).then( res => {
                    this.mainAverageRate =  res.mainProfit;
                    this.ecoAverageRate = res.ecoProfit;
                    this.initAverageRateCharts();
                    console.log('获取平均收益', res);
                }).catch( err => {
                    console.log('获取平均收益出错', err);
                })
            },
            getDivideIntoRate() { // 最近30天投放分成率
                let data = {
                    mineType: this.mineType,
                }
                this.$api.divideInto(data).then( res => {
                    this.divideInto = res;
                    this.initDivideIntoRateCharts();
                    console.log('最近30天投放分成率', res);
                }).catch( err => {
                    console.log('最近30天投放分成率出错', err);
                })
            },
            initHashrateCharts() { // 算力
                // 基于准备好的dom，初始化echarts实例
                var hashrateChart = echarts.init(document.getElementById('hashrateCharts'));

                // 指定图表的配置项和数据
                var option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        // orient:'vertical', // 垂直对齐
                        data:['主矿池','生态池'],
                        top: 10,
                        right: '56',
                        itemGap: 20,
                        itemWidth: 60,
                        itemHeight: 10,
                    },
                    grid: [
                        { // 设置canvs主视图上下左右留白边距
                            x: '60',
                            y: '90',
                            x2: '60',
                            y2: '90',
                        },
                    ],
                    xAxis:  {
                        name: this.hashrateDisplayType == 0 ? '时间 -> now' : '日期',
                        type: 'category',
                        boundaryGap: false,
                        inverse: true,
						nameLocation: "start",
                        // data: this.hashrateDisplayType == 0 ? this.xAxisDataPower : ( this.mainLatelyPower.length > this.ecoLatelyPower.length ? this.mainLatelyPower.map((item) => {
                        //     return this.$common.timestampToTime( item.tagTime )
                        // }) : this.ecoLatelyPower.map((item) => {
                        //     return this.$common.timestampToTime( item.tagTime )
                        // })),
                        data: this.hashrateDisplayType == 0 ? this.mainLatelyPower.map((item) => {
                            return this.$common.timestampToTime( item.tagTime , 'h:m')
                        }) : this.mainLatelyPower.map((item) => {
                            return this.$common.timestampToTime( item.tagTime)
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
                        name: '算力(PB)',
                        type: 'value',
                        nameGap: 20,
                        axisLabel: {
                            formatter: '{value}',
                        },
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
                            name:'主矿池',
                            type:'line',
                            data: this.mainLatelyPower.map((item) => {
                                return item.mineVolumeRate
                            }),
                            symbol: "circle",
                            symbolSize: '10',
                            smooth: true,
                            areaStyle: {
								normal: {
									color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color: '#52B0FF'
									}, {
										offset: 1,
										color: 'rgba(255,255,255,0.8)'
									}]),
								}
							},
							itemStyle: {
								normal: {
									color: '#52B0FF',
									lineStyle: {
										width: 3, // 折线宽度
										color: "#52B0FF" // 折线颜色
									},

									borderColor: '#F7F7F7', // 拐点边框颜色
									borderWidth: 2,
									textStyle: {
										color: '@color-default',
										type: 'solid' // dotted虚线，solid实线
									}
								}
                            },
                        },
                        {
                            name:'生态池',
                            type:'line',
                            data: this.ecoLatelyPower.map((item) => {
                                return item.mineVolumeRate
                            }),
                            symbol: "circle",
                            symbolSize: '10',
                            smooth: true,
                            areaStyle: {
								normal: {
									color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color: '#4ED283'
									}, {
										offset: 1,
										color: 'rgba(255,255,255,0.8)'
									}]),
								}
							},
							itemStyle: {
								normal: {
									color: '#4ED283',
									lineStyle: {
										width: 3, // 折线宽度
										color: "#4ED283" // 折线颜色
									},

									borderColor: '#F7F7F7', // 拐点边框颜色
									borderWidth: 2,
									textStyle: {
										color: '@color-default',
										type: 'solid' // dotted虚线，solid实线
									}
								}
                            },
                        }
                    ],
                    tooltip: {
                        trigger: 'axis',
                        // axisPointer: {
                        //     type: 'cross',
                        //     label: {
                        //         backgroundColor: '#6a7985'
                        //     }
                        // },
                    },
                };

                // 使用刚指定的配置项和数据显示图表。
                hashrateChart.setOption(option);
                window.addEventListener("resize", function() {
					hashrateChart.resize();
				});
            },
            initBreakOutCharts() { // 爆块
                // 基于准备好的dom，初始化echarts实例
                var breakOutChart = echarts.init(document.getElementById('breakOutCharts'));
                
                // 指定图表的配置项和数据
                var option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        // orient:'vertical',
                        data:['主矿池','SOLO矿池'],
                        top: 10,
                        right: '56',
                        itemGap: 20,
                        itemWidth: 60,
                        itemHeight: 10,
                    },
                    grid: [
                        {
                            x: '60',
                            y: '90',
                            x2: '60',
                            y2: '90',
                        },
                    ],
                    xAxis:  {
                        name: this.blockDisplayType == 0 ? '时间 -> now' : '日期',
                        type: 'category',
                        boundaryGap: false,
                        inverse: true,
                        nameLocation: "start",
                        data: this.blockDisplayType == 0 ? this.mainBombBlock.map((item) => {
                                return this.$common.timestampToTime( item.tagTime, 'h' )
                        }) : this.mainBombBlock.map((item) => {
                                return this.$common.timestampToTime( item.tagTime)
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
                        name: '爆块/个',
                        type: 'value',
                        nameGap: 20,
                        axisLabel: {
                            formatter: '{value}',
                        },
                        splitLine:{
                            show: true
                        },
                        nameTextStyle: {
                            color: '#333',
                            fontSize: 14,
                            padding: [0, 0, 0, 10],
                        }
                    },
                    // dataZoom: [{ // 缩放功能
					// }, {
					// 	type: 'inside'
					// }],
                    series: [
                        {
                            name:'主矿池',
                            type:'line',
                            data: this.mainBombBlock.map((item) => {
                                return item.mineBlockCount
                            }),
                            symbol: "circle",
                            symbolSize: '10',
                            smooth: true,
                            areaStyle: {
								normal: {
									color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color: '#52B0FF'
									}, {
										offset: 1,
										color: 'rgba(255,255,255,0.8)'
									}]),
								}
							},
							itemStyle: {
								normal: {
									color: '#52B0FF',
									lineStyle: {
										width: 3, // 折线宽度
										color: "#52B0FF" // 折线颜色
									},

									borderColor: '#F7F7F7', // 拐点边框颜色
									borderWidth: 2,
									textStyle: {
										color: '@color-default',
										type: 'solid' // dotted虚线，solid实线
									}
								}
                            },
                        },
                        {
                            name:'SOLO矿池',
                            type:'line',
                            data: this.vipBombBlock.map((item) => {
                                return item.mineBlockCount
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
									lineStyle: {
										width: 3, // 折线宽度
										color: "#FF4242" // 折线颜色
									},

									borderColor: '#F7F7F7', // 拐点边框颜色
									borderWidth: 2,
									textStyle: {
										color: '@color-default',
										type: 'solid' // dotted虚线，solid实线
									}
								}
                            },
                        }
                    ],
                    tooltip: {
                        trigger: 'axis',
                        // axisPointer: {
                        //     type: 'cross',
                        //     label: {
                        //         backgroundColor: '#6a7985'
                        //     }
                        // },
                    },
                };

                // 使用刚指定的配置项和数据显示图表。
                breakOutChart.setOption(option);
            },
            initAverageRateCharts() { // 收益
                // 基于准备好的dom，初始化echarts实例
                var breakOutChart = echarts.init(document.getElementById('averageRateCharts'));
                
                // 指定图表的配置项和数据
                var option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        // orient:'vertical',
                        data:['主矿池','生态池'],
                        top: 10,
                        right: '56',
                        itemGap: 20,
                        itemWidth: 60,
                        itemHeight: 10,
                    },
                    grid: [
                        {
                            x: '60',
                            y: '90',
                            x2: '60',
                            y2: '90',
                        },
                    ],
                    xAxis:  {
                        name: '日期 -> 昨日',
                        type: 'category',
                        boundaryGap: false,
                        inverse: true,
                        nameLocation: "start",
                        data: this.mainAverageRate.map((item) => {
                            return this.$common.timestampToTime( item.createDate)
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
                        name: 'BHD/TB',
                        type: 'value',
                        nameGap: 20,
                        axisLabel: {
                            formatter: '{value}',
                        },
                        splitLine:{
                            show: true
                        },
                        nameTextStyle: {
                            color: '#333',
                            fontSize: 14,
                            padding: [0, 0, 0, 10],
                        }
                    },
                    // dataZoom: [{ // 缩放功能
					// }, {
					// 	type: 'inside'
					// }],
                    series: [
                        {
                            name:'主矿池',
                            type:'line',
                            data: this.mainAverageRate.map((item) => {
                                return item.yieldRate
                            }),
                            symbol: "circle",
                            symbolSize: '10',
                            smooth: true,
                            areaStyle: {
								normal: {
									color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color: '#52B0FF'
									}, {
										offset: 1,
										color: 'rgba(255,255,255,0.8)'
									}]),
								}
							},
							itemStyle: {
								normal: {
									color: '#52B0FF',
									lineStyle: {
										width: 3, // 折线宽度
										color: "#52B0FF", // 折线颜色
									},

									borderColor: '#F7F7F7', // 拐点边框颜色
									borderWidth: 2,
									textStyle: {
										color: '@color-default',
										type: 'solid', // dotted虚线，solid实线
									}
								}
                            },
                        },
                        {
                            name:'生态池',
                            type:'line',
                            data: this.ecoAverageRate.map((item) => {
                                return item.yieldRate
                            }),
                            symbol: "circle",
                            symbolSize: '10',
                            smooth: true,
                            areaStyle: {
								normal: {
									color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color: '#4ED283',
									}, {
										offset: 1,
										color: 'rgba(255,255,255,0.8)',
									}]),
								}
							},
							itemStyle: {
								normal: {
									color: '#4ED283',
									lineStyle: {
										width: 3, // 折线宽度
										color: "#4ED283", // 折线颜色
									},

									borderColor: '#F7F7F7', // 拐点边框颜色
									borderWidth: 2,
									textStyle: {
										color: '@color-default',
										type: 'solid', // dotted虚线，solid实线
									}
								}
                            },
                        }
                    ],
                    tooltip: {
                        trigger: 'axis',
                        // axisPointer: {
                        //     type: 'cross',
                        //     label: {
                        //         backgroundColor: '#6a7985'
                        //     }
                        // },
                    },
                };

                // 使用刚指定的配置项和数据显示图表。
                breakOutChart.setOption(option);
            },
            initDivideIntoRateCharts() { // 最近30天投放分成率
                // 基于准备好的dom，初始化echarts实例
                var breakOutChart = echarts.init(document.getElementById('divideIntoCharts'));
                
                // 指定图表的配置项和数据
                var option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    // legend: {
                    //     // orient:'vertical',
                    //     data:['主矿池','SOLO矿池'],
                    //     top: 10,
                    //     right: '56',
                    //     itemGap: 20,
                    //     itemWidth: 60,
                    //     itemHeight: 10,
                    // },
                    grid: [
                        {
                            x: '60',
                            y: '90',
                            x2: '60',
                            y2: '90',
                        },
                    ],
                    xAxis:  {
                        name: '时间/天',
                        type: 'category',
                        boundaryGap: false,
                        inverse: true,
                        nameLocation: "start",
                        data: this.divideInto.map((item) => {
                            return this.$common.timestampToTime( item.createTime)
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
                        name: '分成率 %',
                        type: 'value',
                        nameGap: 20,
                        max: 50,
                        axisLabel: {
                            formatter: '{value}',
                        },
                        splitLine:{
                            show: true
                        },
                        nameTextStyle: {
                            color: '#333',
                            fontSize: 14,
                            padding: [0, 0, 0, 10],
                        }
                    },
                    // dataZoom: [{ // 缩放功能
					// }, {
					// 	type: 'inside'
					// }],
                    series: [
                        // {
                        //     name:'主矿池',
                        //     type:'line',
                        //     data: this.divideInto.map((item) => {
                        //         return item.deliveryRate
                        //     }),
                        //     symbol: "circle",
                        //     symbolSize: '10',
                        //     smooth: true,
                        //     areaStyle: {
						// 		normal: {
						// 			color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						// 				offset: 0,
						// 				color: '#52B0FF'
						// 			}, {
						// 				offset: 1,
						// 				color: 'rgba(255,255,255,0.8)'
						// 			}]),
						// 		}
						// 	},
						// 	itemStyle: {
						// 		normal: {
						// 			color: '#52B0FF',
						// 			lineStyle: {
						// 				width: 3, // 折线宽度
						// 				color: "#52B0FF", // 折线颜色
						// 			},

						// 			borderColor: '#F7F7F7', // 拐点边框颜色
						// 			borderWidth: 2,
						// 			textStyle: {
						// 				color: '@color-default',
						// 				type: 'solid', // dotted虚线，solid实线
						// 			}
						// 		}
                        //     },
                        // },
                        {
                            name:'分成率',
                            type:'line',
                            data: this.divideInto.map((item) => {
                                return item.deliveryRate
                            }),
                            symbol: "circle",
                            symbolSize: '10',
                            smooth: true,
                            areaStyle: {
								normal: {
									color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color: '#575FFF',
									}, {
										offset: 1,
										color: 'rgba(255,255,255,0.8)',
									}]),
								}
							},
							itemStyle: {
								normal: {
									color: '#575FFF',
									lineStyle: {
										width: 3, // 折线宽度
										color: "#575FFF", // 折线颜色
									},

									borderColor: '#F7F7F7', // 拐点边框颜色
									borderWidth: 2,
									textStyle: {
										color: '@color-default',
										type: 'solid', // dotted虚线，solid实线
									}
								}
                            },
                        }
                    ],
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params) {
                            let item = params[0];
                            return `${item.axisValue}<br />${item.marker}${item.seriesName}: ${item.data}%`;
                        }
                        // axisPointer: {
                        //     type: 'cross',
                        //     label: {
                        //         backgroundColor: '#6a7985'
                        //     }
                        // },
                    },
                };

                // 使用刚指定的配置项和数据显示图表。
                breakOutChart.setOption(option);
            },
        },
        created() { 	//生命周期 - 创建完成
            // this.getBombBlock();
            this.getAverageRate();
            this.getLatelyPower();
            this.getDivideIntoRate();
        },
        mounted() {	//生命周期 - 挂载完成
            this.initHashrateCharts();
            // this.initBreakOutCharts();
        },
        beforeCreate() { //生命周期 - 创建之前
            document.querySelector('#app').setAttribute('style', 'background: rgba(246,249,252,0.5);');
        },
        beforeMount() {}, //生命周期 - 挂载之前
        beforeUpdate() {}, //生命周期 - 更新之前
        updated() {}, //生命周期 - 更新之后
        beforeDestroy() { //生命周期 - 销毁之前
            document.querySelector('#app').setAttribute('style', '');
        },
        destroyed() {}, //生命周期 - 销毁完成
        activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>

<style lang="less" scoped>
    //@import url(); 引入公共css类
    .statisticsPage{
        @content();
        background: transparent;
        .titleBox{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.4rem 0.5rem;
            .switchBtn{
                width: 2.0rem;
                height: 0.4rem;
            }
        }
        .hashrateBox{
            box-shadow:  0 0 0.13rem 0 rgba(219,223,255,1);
            border-radius: 0.1rem;
            margin-bottom: 0.25rem;
            background: @color-default;
            .hashrateCharts{
                height: 560px;
            }
        }
        .averageRateBox{
            box-shadow:  0 0 0.13rem 0 rgba(219,223,255,1);
            border-radius: 0.1rem;
            margin-bottom: 0.25rem;
            background: @color-default;
            .averageRateCharts{
                height: 560px;
            }
        }
        .breakOutBox{
            box-shadow:  0 0 0.13rem 0 rgba(219,223,255,1);
            border-radius: 0.1rem;
            margin-bottom: 0.25rem;
            background: @color-default;
            .breakOutCharts{
                height: 560px;
            }
        }
        .divideIntoBox{
            box-shadow:  0 0 0.13rem 0 rgba(219,223,255,1);
            border-radius: 0.1rem;
            margin-bottom: 0.25rem;
            background: @color-default;
            .divideIntoCharts{
                height: 560px;
            }
        }
    }
</style>