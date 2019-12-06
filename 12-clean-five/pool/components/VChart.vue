<!--该页介绍-->
<template>
	<div class="VChart">
		<!--<ve-line :data="chartData" :extend="extend" :settings="chartSettings"></ve-line>-->
		<div id="myChart"></div>
	</div>
</template>

<script>
	//	let echarts = require('echarts/lib/echarts');
	//	require('echarts/lib/chart/line')
	import echarts from 'echarts'
	export default {

		name: '',

		mixins: [],

		components: {},

		props: {},

		data() {
			return {
				extend: {
					series: {
						smooth: false
					}
				},
				chartSettings: {
					yAxisName: ['数值'],

				},
				chartData: {
					columns: ['日期', '访问用户', '下单用户', '下单率'],
					rows: [{
							'日期': '1/1',
							'访问用户': 1393,
							'下单用户': 1093,
							'下单率': 0.32
						},
						{
							'日期': '1/2',
							'访问用户': 3530,
							'下单用户': 3230,
							'下单率': 0.26
						},
						{
							'日期': '1/3',
							'访问用户': 2923,
							'下单用户': 2623,
							'下单率': 0.76
						},
						{
							'日期': '1/4',
							'访问用户': 1723,
							'下单用户': 1423,
							'下单率': 0.49
						}

					]
				}
			}
		},

		computed: {},

		watch: {},

		created() {},

		mounted() {
			this.drawLine();
		},

		destroyed() {},

		methods: {
			drawLine() {

				var chartOption = {
					title: {
						text: "过去24小时算力",
						textStyle: {
							color: '#34495e'
						},
						top: 0,
						right: 10
					},
					legend: {
						right: 10,
						top: 30,
						itemWidth: 12,
						itemHeight: 12,
						selectedMode: false,
					},
					tooltip: {
						trigger: 'axis',
						backgroundColor: 'rgba(255, 255, 255, 0.8)',
						borderColor: '#333',
						borderWidth: 1,
						padding: [5, 10],
						textStyle: {
							color: '#000',
							fontSize: 12
						}
					},
					xAxis: {
						type: 'time',
						splitLine: {
							show: true,
							lineStyle: {
								opacity: 0.4
							}
						},
					},
					yAxis: {
						type: 'value',
						splitLine: {
							lineStyle: {
								opacity: 0.4
							}
						},
						axisLabel: {
							showMaxLabel: false
						},
						max: 'dataMax'
					},
					series: [{
						type: 'line',
						showSymbol: false,
						smooth: true,
						lineStyle: {
							normal: {
								color: '#2b90e9',
								width: 1
							}
						},
						itemStyle: {
							normal: {
								color: '#88d0f8',
								borderColor: '#2b90e9'
							},
							emphasis: {
								color: '#2b90e9'
							}
						},
						areaStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#b5ecff'
								}, {
									offset: 1,
									color: '#d1fbff'
								}]),
								opacity: 0.5
							}
						}
					}]
				};

				// 基于准备好的dom，初始化echarts实例
				let myChart = echarts.init(document.getElementById('myChart'))
				// 绘制图表
				var option2 = {
					xAxis: {

					},
					yAxis: {},
					series: [{
						data: [
							[20, 120],
							[50, 200],
							[40, 50]
						],
						type: 'line'
					}]
				};
				var option = {

					xAxis: {
						type: 'category',
						splitLine: {
							show: true
						},
						name: '时间/h',
						data: ['24h', '24h', '24h', '24h', '24h', '24h', '24h', '24h', '24h', '24h', '24h', '24h', '24h', '24h', '24h', '24h', '24h', '24h', '24h', '24h', '24h']
					},
					yAxis: {
						type: 'value',
						name: '百分率',
						axisLabel: {
							formatter: '{value} %'
						},
						splitNumber: 10,
						min: 0,
						max: 100
						//						data: ['10%', '10%', '10%', '10%', '10%', '10%']
					},
					series: [{
							data: [100, 0, 50, 0, 80, 100, 20, 10, 30, 50, 20, 80, 100, 2, 100, 30, 50, 20, 8, 100, 2],
							type: 'line',
							//							areaStyle: {
							//								color: {
							//									type: 'linear', // 线性渐变，x y x2 y2 参数用于配置渐变色的起止位置, 依次对应右/下/左/上四个方位。0 0 0 1 代表渐变色从正上方开始。
							//									x: 0,
							//									y: 0,
							//									x2: 0,
							//									y2: 1,
							//									colorStops: [{
							//										offset: 0,
							//										color: '#cff0ea' // 0% 处的颜色
							//									}, {
							//										offset: 1,
							//										color: '#5ab1ef' // 100% 处的颜色
							//									}],
							//									globalCoord: false // 缺省为 false
							//								}, // 渐变填充色
							//							},
							symbol: "circle",
							symbolSize: '10',
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
							}
						}

					],
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#6a7985'
							}
						},
						formatter: function(params) {
							params = params[0];
							var date = new Date(params.name);
							return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
						}
					},

				}
				

				var data3 = [{
					"name": "Mon Oct 20 1997 00:00:00 GMT+0800 (中国标准时间)",
					"value": ["1997/10/20", 753]
				}, {
					"name": "Tue Oct 21 1997 00:00:00 GMT+0800 (中国标准时间)",
					"value": ["1997/10/21", 756]
				}, {
					"name": "Wed Oct 22 1997 00:00:00 GMT+0800 (中国标准时间)",
					"value": ["1997/10/22", 755]
				}, {
					"name": "Thu Oct 23 1997 00:00:00 GMT+0800 (中国标准时间)",
					"value": ["1997/10/23", 762]
				}, {
					"name": "Fri Oct 24 1997 00:00:00 GMT+0800 (中国标准时间)",
					"value": ["1997/10/24", 756]
				}, {
					"name": "Sat Oct 25 1997 00:00:00 GMT+0800 (中国标准时间)",
					"value": ["1997/10/25", 746]
				}, {
					"name": "Sun Oct 26 1997 00:00:00 GMT+0800 (中国标准时间)",
					"value": ["1997/10/26", 754]
				}, {
					"name": "Mon Oct 27 1997 00:00:00 GMT+0800 (中国标准时间)",
					"value": ["1997/10/27", 749]
				}]

				window.addEventListener("resize", function() {
					myChart.resize();
				});

				function randomData() {
					var now = new Date();
					value = value + Math.random() * 21 - 10;
					return {
						value: [
							[now.getHours(), now.getMinutes(), now.getSeconds()].join(':'),
							Math.round(value)
						]
					}
				}

				var data = [];
				var date = [];
				var value = Math.random() * 1000;
				for(var i = 0; i < 1000; i++) {
					data.push(randomData());
					date.push('')
				}

				let option3 = {
					title: {
						text: '动态数据 + 时间坐标轴'
					},
					tooltip: {
						trigger: 'axis',
						formatter: function(params) {
							params = params[0];
							return params.value[0] + ' / ' + params.value[1];
						},
						axisPointer: {
							animation: false
						}
					},
					xAxis: {
						type: 'category',
						splitLine: {
							show: false
						},
						data: date
					},
					yAxis: {
						type: 'value',
						boundaryGap: [0, '100%'],
						splitLine: {
							show: false
						}
					},
					series: [{
						name: '模拟数据',
						type: 'line',
						showSymbol: false,
						hoverAnimation: false,
						data: data
					}]
				};

				setInterval(function() {
					var _data = randomData();
					data.shift();
					date.shift();
					data.push(_data);
					date.push(_data.value[0])

					myChart.setOption({
						xAxis: {
							data: date
						},
						series: [{
							data: data
						}]
					});
				}, 1000);
				myChart.setOption(option3);

			}

		}
	}
</script>

<style lang="less" scoped>
	#myChart,
	#chart {
		width: auto;
		height: 400px;
	}
</style>