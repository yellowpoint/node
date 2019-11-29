<!-- 首页的按钮导航点击后的页面，如9.9、海淘购-->
<template>
	<view class="buttonNav" :class="{noTab:noTab}">
		<view class="buttonNav-head">
			<view class="head-back" @click="goBack">
				<image src="/static/common/arrow.png" mode="widthFix"></image>
			</view>
			<view class="head-text">{{buttonList[buttonIndex].text}}</view>
		</view>
		<VTabhead v-if="!noTab" ref="VTabhead" @changeTab="changeTab" :VTabhead_act="VTabhead_act" :VTabhead_list="VTabhead_list"></VTabhead>
		<VScroll ref="VScroll" pullup @scrollToEnd="loadMore" :vScrollData="goodsList[VTabhead_act]">
			<VGoods class="VGoods" :goodsList="goodsList[VTabhead_act]" :type="2"></VGoods>
			<uniLoadMore :status="VTabhead_list[VTabhead_act].loadingType"></uniLoadMore>
		</VScroll>
	</view>
</template>

<script>
	import VTabhead from "@/components/VTabhead"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			VTabhead,
			uniLoadMore
		},
		data() {
			return {
				headText: '海淘购',
				goodsList: [
					[]
				],
				// 头部选中的index
				VTabhead_act: 0,
				// 选项卡头部列表;sort:true为升序（由小到大_asc）、false为降序（由大到小_des）；loadingType：三种状态more、loading、nomore
				VTabhead_list: [{
						text: '推荐',
						loadingType: 'more',
						pageNum: 1,
						sort: true,
						dataList: []
					},
					{
						text: '券后价',
						loadingType: 'more',
						pageNum: 1,
						sort: true,
						dataList: []
					},
					{
						text: '销量',
						loadingType: 'more',
						pageNum: 1,
						sort: false,
						dataList: []
					},
				],
				goodsList_params: {
					sort: '',
					pageNum: 1,
					pageSize: 10
				},
				buttonIndex: 1,
				buttonList: {
					1: {
						text: '超值9.9',
						ajax: 'ninePiecesOfNineList'
					},
					2: {
						text: '淘抢购',
						ajax: 'getTqgList'
					},
					4: {
						text: '天猫',
						ajax: 'getTianMaoList'
					},
					10: {
						text: '今日热销榜单',
						ajax: 'getTodayHotSale'
					},
					77: {
						text: '拼多多',
						ajax: 'getPddTopGoods'
					}
				},
				// 没有顶部tab栏
				noTab: false
			}
		},
		props: {

		},
		onLoad(e) {
			// buttonInde为按钮的id，1是超值9.9，2是淘抢购，4是天猫
			this.buttonIndex = e.buttonIndex || 1;
			// 如果没有这个角标则默认给1
			if (!this.buttonList[this.buttonIndex]) {
				this.buttonIndex = 1
			}
			// buttonIndex为2 即淘抢购时没有tab
			// 后加10（今日热卖）也没有，拼多多也没有
			this.noTab = [2, 10, 77].includes(+this.buttonIndex) ? true : false

		},
		mounted(e) {
			this.loadData()
		},

		methods: {

			loadData() {

				return new Promise(async (resolve, reject) => {
					this.setParams()
					let VTabhead_item = this.VTabhead_list[this.VTabhead_act]
					//如果是正在加载或是没有更多了则不再请求
					if (VTabhead_item.loadingType === 'loading' || VTabhead_item.loadingType === 'noMore') {
						//防止重复加载
						return;
					}

					VTabhead_item.loadingType = 'loading';
					let ajax = this.buttonList[this.buttonIndex].ajax
					let goodsList = (await this.$api[ajax](this.goodsList_params)).data
					if (!this.goodsList[this.VTabhead_act]) {
						this.$set(this.goodsList, this.VTabhead_act, [])
					}
					//判断是否还有数据， 有改为 more， 没有改为noMore ；
					// 来自淘宝的接口可能出现某一页数量不足了，但下一页还有数据的情况，故只按照有没有数据来判断
					if (!goodsList || !goodsList.length) {
						VTabhead_item.loadingType = 'noMore';
						return
					}
					this.goodsList[this.VTabhead_act].push(...goodsList)
					VTabhead_item.loadingType = 'more';
					VTabhead_item.pageNum++
					resolve()

				})


			},
			changeTab({
				index,
				VTabhead_list
			}) {
				if (this.VTabhead_act == index && index == 0) {
					return
				}
				// 滚动到顶部
				this.$refs.VScroll.scrollTo(0, 20)
				//点击已选中的选项时，切换排序，要将数据和page清空
				if (this.VTabhead_act == index) {
					this.$set(this.goodsList, index, [])
				}
				this.VTabhead_act = index;
				// 当这个选项没有数据或为空的时候才请求
				if (!this.goodsList[index] || this.goodsList[index].length == 0) {
					this.loadData()
				}

			},
			async loadMore() {

				await this.loadData()
				return this.goodsList[this.VTabhead_act]
			},
			setParams() {
				//拼多多特有的参数
				if (this.buttonIndex == 77) {
					this.$set(this.goodsList_params, 'sortType', 1)
				}

				let sort = this.VTabhead_list[this.VTabhead_act].sort
				let pageNum = this.VTabhead_list[this.VTabhead_act].pageNum
				if (this.VTabhead_act == 0) {
					this.$set(this.goodsList_params, 'sort', '')
				} else if (this.VTabhead_act == 1) {
					if (sort) {
						this.$set(this.goodsList_params, 'sort', 'price_asc')
					} else {
						this.$set(this.goodsList_params, 'sort', 'price_des')
					}

				} else if (this.VTabhead_act == 2) {
					if (sort) {
						this.$set(this.goodsList_params, 'sort', 'total_sales_asc')
					} else {
						this.$set(this.goodsList_params, 'sort', 'total_sales_des')
					}
				}
				this.$set(this.goodsList_params, 'pageNum', pageNum)
			},
			goBack() {
				uni.switchTab({
					url: '/pages/index/index',
				})
			}

		},

	}
</script>

<style lang="scss">
	.VScroll {
		top: calc(88upx + 90upx);
		bottom: 0;
	}

	.buttonNav {
		padding-top: 88upx;

		.VGoods {
			padding-top: 20upx;
		}

		&.noTab {
			.VScroll {
				top: 88upx;

			}


		}
	}

	.buttonNav-head {

		position: fixed;
		top: 0;
		left: 0;
		z-index: 998;
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 88upx;
		background: #BF3627;
		font-size: 32upx;
		color: #fff;

		.head-back {
			position: absolute;
			top: 0;
			left: 0;
			width: 60upx;
			height: 100%;
			padding-left: 30upx;
			display: flex;
			align-items: center;

			image {
				width: 18upx;
				height: 33upx;
			}
		}

		.head-text {
			@include allCenter;
			width: 100%;
		}
	}
</style>
