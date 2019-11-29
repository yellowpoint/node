<template>
	<view class="earning">
		<!-- 头部 -->
		<view class="header">
			<view class="header-main">
				<view class="header-all">
					<view class="header-title">总收益（元）<view class="header-eye" :class="{hide:!eye_show}" @click="clickEye"></view>
					</view>
					<view class="header-num">
						<block v-if="eye_show">{{userAsset.totalRevenue | money}}</block>
						<block v-else>*****</block>
					</view>
				</view>
				<view class="header-usable">
					<view class="header-title">可用余额（元）</view>
					<view class="header-num">
						<block v-if="eye_show">{{userAsset.balance | money}}</block>
						<block v-else>*****</block>
					</view>
				</view>
				<view class="header-unusable">
					<view class="header-title">即将到账（元）</view>
					<view class="header-num">
						<block v-if="eye_show">{{userAsset.aboutArrive | money}}</block>
						<block v-else>*****</block>
					</view>
				</view>
			</view>
			<view class="header-ad">
				<image src="/static/earning/ad.png" mode="widthFix"></image>
			</view>

		</view>

		<!-- 详细数据列表 -->
		<view class="detailList">
			<view class="detailList-tab" :class="{fixed:detailList_fixed}" ref="detailList">
				<view v-for="(item,index) of navList" :key="index" class="detailList-tab-item" :class="{act:detailList_act==index}"
				 @click="changeTab(index)">{{item.text}}</view>
			</view>
			<view class="detailList-page">
				<block v-for="(page_item,page_index) of navList" :key="page_index">
					<view v-show="page_index == detailList_act" class="detailList-page-item">
						<VEmpty v-if="page_item.dataList.length==0&&page_item.loadingType=='noMore'" :img='"/static/common/nullTiXian.png"'></VEmpty>
						<block v-else>
							<view>
								<view class="dpi-item" v-for="(item,index) of page_item.dataList" :key="index">
									<view class="dpi-name">{{recordType(item.type)}}</view>
									<view class="dpi-tips">{{terraceType(item.terraceType)}}</view>
									<view class="dpi-calc">{{incomeExpenditure(item.incomeExpenditure,item.amount)}}</view>
									<view class="dpi-time">{{ item.createTime | moment('y-M-d') }}</view>
									<view class="dpi-sum">{{item.balance}}</view>
								</view>
							</view>
							<uniLoadMore :status="page_item.loadingType"></uniLoadMore>
						</block>

					</view>

				</block>
			</view>
		</view>
		<view class="earning-get" @click="toGetMoney">提现</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import VEmpty from "@/components/VEmpty";
	export default {
		components: {
			uniLoadMore,
			VEmpty
		},
		data() {
			return {
				// 用户资产
				userAsset: {},
				// 导航分类列表
				navList: [{
						text: '全部',
						loadingType: 'more',
						pageNum: 1,
						dataList: []
					},
					{
						text: '收入',
						loadingType: 'more',
						pageNum: 1,
						dataList: []
					},
					{
						text: '支出',
						loadingType: 'more',
						pageNum: 1,
						dataList: []
					},
				],
				// 导航分类选中的index
				detailList_act: 0,
				// 是否将记录列表固定在顶部
				detailList_fixed: false,
				// 记录列表距离顶部的距离
				detailList_top: 0,
				// 是否显示金额
				eye_show: true
			}
		},
		async created() {
			if (!this.$commonLogic.verifyLogin()) {
				return
			}

			this.$api.getUserAsset().then(res => {
				this.userAsset = res.data
			})

			this.getRecordData()

		},
		mounted() {
			//获取记录列表距离顶部的距离
			this.detailList_top = this.$common.getElementTop(this.$refs.detailList.$el)
		},
		computed: {

		},
		onReachBottom() {
			this.getRecordData()
		},
		onPageScroll(e) {
			this.handleScroll(e)
		},
		methods: {
			getRecordData() {

				let index = this.detailList_act
				let navItem = this.navList[index]
				let params = {
					pageNum: navItem.pageNum
				}
				if (index != 0) {
					params.incomeExpenditureType = index
				}

				//如果是正在加载或是没有更多了则不再请求
				if (navItem.loadingType === 'loading' || navItem.loadingType === 'noMore') {
					//防止重复加载
					return;
				}

				navItem.loadingType = 'loading';

				this.$api.getRecordVo(params).then(res => {
					let dataBox = res.data.list || []
					navItem.dataList = [...navItem.dataList, ...dataBox]

					//判断是否还有数据， 有改为 more， 没有改为noMore 
					if (dataBox.length < 10) {
						navItem.loadingType = 'noMore';
						return
					} else {
						navItem.loadingType = 'more';
					}

					//页码加一
					navItem.pageNum++

				})
			},
			changeTab(index) {
				this.detailList_act = index
				if (this.navList[index].dataList.length == 0) {
					this.getRecordData()
				}

			},
			handleScroll(e) {

				let scrollTop = e.scrollTop
				if (this.detailList_top <= scrollTop) {
					this.detailList_fixed = true
				} else {
					this.detailList_fixed = false
				}

			},
			clickEye() {
				this.eye_show = !this.eye_show
			},
			recordType(type) {
				let name = ''
				switch (type) {
					case 1:
						name = '新手奖励'
						break;
					case 2:
						name = '返现'
						break;
					case 3:
						name = '提现'
						break;
					case 4:
						name = '待结算佣金'
						break;
					case 5:
						name = '已结算佣金'
						break;
					case 6:
						name = '推广'
						break;
					default:
						break;
				}
				// 类型(1=新手奖励/2=返现/3=提现/4=待结算佣金/5=已结算佣金/6=推广)
				return name
			},
			// 平台类型(1=淘宝/2=京东/3=拼多多) 
			terraceType(type) {
				let name = ''
				switch (type) {
					case 1:
						name = '淘宝'
						break;
					case 2:
						name = '京东'
						break;
					case 3:
						name = '拼多多'
						break;
					default:
						break;
				}
				return name
			},
			// incomeExpenditure 收支类型(1=收入/2=支出) ,
			incomeExpenditure(type, money) {
				if (type == 1) {
					return '+' + money
				}
				return '-' + money
			},
			toGetMoney() {

				// 获取最低提现额度
				this.$api.getByType({
					configEnum: 'MINIMUM_WITHDRAWAL_AMOUNT'
				}).then(res => {
					let minimum = +res.data[0].configVal

					if (this.userAsset.balance && this.userAsset.balance >= minimum) {
						uni.navigateTo({
							url: '/pages/earning/getMoney'
						});

					} else {
						this.$toast(`最低提现额度为${minimum}元`)
					}
				})


			}
		},

	}
</script>

<style lang="scss">
	.earning {}

	.header {
		position: relative;
		height: 375upx;
		background: #e43c3e url(/static/earning/headerBg.png) no-repeat;
		background-size: 100%;
		text-align: center;
		color: #fff;

		.header-main {
			display: flex;
			flex-wrap: wrap;
			padding: 40upx 60upx;
		}

		.header-eye {
			display: inline-block;
			width: 30upx;
			height: 30upx;
			vertical-align: middle;
			background: url(/static/earning/eye_show.png) no-repeat;
			background-size: 100%;

			&.hide {
				background-image: url(/static/earning/eye_hide.png);
			}
		}

		.header-title {
			display: flex;
			align-items:center;
			justify-content: center;
			font-size: 24upx;
			overflow: hidden;
		}

		.header-num {
			font-size: 34upx;
			margin-top: 20upx;
		}

		.header-all {
			width: 100%;
			margin-bottom: 40upx;

			.header-num {
				font-size: 60upx;
			}
		}

		.header-usable {
			width: 180upx;
		}

		.header-unusable {
			width: 180upx;
			margin-left: auto;
		}

		.header-ad {
			position: absolute;
			left: 24upx;
			bottom: -78upx;
			width: 702upx;
			height: 126upx;
			image {
				width: 100%;
				height: auto;
			}
		}
	}

	.detailList {
		position: relative;
		width: 702upx;
		padding-top: 90upx;
		padding-bottom: 150upx;
		margin: 102upx auto 0;
		background: #fff;
		border-radius: 10upx;
		font-size: 28upx;
		color: #333;

		&.fixed {
			position: absolute;
			top: 0;
			left: 24upx;
			z-index: 9999;
		}

		.detailList-tab {
			position: absolute;
			top: 0;
			left: 0;
			display: flex;
			align-items: center;
			justify-content: space-around;
			width: 100%;
			height: 90upx;
			border-bottom: 1px solid #F2F2F2;
			background: #fff;
			font-weight: bold;

			&.fixed {
				position: fixed;
				z-index: 9999;
			}

			.detailList-tab-item {
				&.act {
					color: #BF3627;
					border-bottom: 4upx solid #BF3627;

				}
			}
		}

		.detailList-page {
			position: relative;

			.detailList-page-item {
				padding: 0 24upx;

				.dpi-item {
					display: flex;
					flex-wrap: wrap;
					align-content: space-between;
					height: 130upx;
					padding: 35upx 0 25upx;
					border-bottom: 1px solid #F2F2F2;

					&:last-child {
						border-bottom: none;
					}
				}

				.dpi-name {
					width: 33.33%;
				}

				.dpi-tips {
					width: 33.33%;
					text-align: center
				}

				.dpi-calc {
					width: 33.33%;
					margin-left: auto;
					text-align: right;
				}

				.dpi-time {
					width: 50%;
					font-size: 24upx;
					color: #999;
				}

				.dpi-sum {
					width: 50%;
					text-align: right;
					font-size: 24upx;
					color: #999;
				}
			}
		}
	}

	.earning-get {
		position: fixed;
		bottom: 32upx;
		left: 25upx;
		@include allCenter;
		width: 700upx;
		height: 98upx;
		background: url(/static/earning/btn.png) no-repeat;
		background-size: 100%;
		font-size: 34upx;
		color: #fff;

	}
</style>
