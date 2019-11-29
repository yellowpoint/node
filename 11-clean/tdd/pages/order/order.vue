<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{current: navAct === index}" @click="tabClick(index)">
				{{item.text}}
			</view>
		</view>

		<swiper :current="navAct" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">

				<VScroll class="contentSc" @scrollToEnd="getData" :vScrollData="tabItem.dataList" pullup>
					<!-- 空白页 -->
					<VEmpty v-if="tabItem.dataList.length === 0&&isShow" :img='"/static/common/nullOrder.png"'></VEmpty>

					<!-- 订单列表 -->
					<block v-else="">
						<VOrderList :tabItem='tabItem.dataList'></VOrderList>
						<uniLoadMore :status="tabItem.loadingType"></uniLoadMore>
					</block>

				</VScroll>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import VEmpty from "@/components/VEmpty";
	import VOrderList from '@/components/VOrderList.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			VEmpty,
			VOrderList,
			uniLoadMore
		},
		data() {
			return {
				navAct: 0,
				navList: [{
						text: '全部',
						pageNum: 1,
						loadingType: 'more',
						dataList: []
					},
					{
						text: '待结算',
						pageNum: 1,
						loadingType: 'more',
						dataList: []
					},
					{
						text: '已结算',
						pageNum: 1,
						loadingType: 'more',
						dataList: []
					},
				],
				pageSize: 4,
				isShow:false

			};
		},

		onLoad(options) {
			//获取url上的state
			this.navAct = +options.state || 0
			this.getData();

		},

		methods: {
			async getData() {
				this.isShow=false;
				let navItem = this.navList[this.navAct]
				//如果是正在加载或是没有更多了则不再请求
				if (navItem.loadingType === 'loading' || navItem.loadingType === 'noMore') {
					//防止重复加载
					return;
				}

				navItem.loadingType = 'loading';
				let dataBox = (await this.$api.getUserOrderList({
					status: this.navAct || '',
					pageNum: navItem.pageNum,
					pageSize: this.pageSize
				})).data.list
				if (dataBox) {
					navItem.dataList.push(...dataBox)
					this.isShow=true;
				}


				//判断是否还有数据， 有改为 more， 没有改为noMore 
				if (!dataBox || dataBox.length < this.pageSize) {
					navItem.loadingType = 'noMore';
					return
				} else {
					navItem.loadingType = 'more';
				}

				navItem.pageNum++


			},
			//swiper 切换
			changeTab(e) {
				
				this.tabClick(e.target.current)
				
			},
			//顶部tab点击
			tabClick(index) {
				this.navAct = index;
				if (this.navList[this.navAct].dataList.length == 0) {
					this.getData();
				}
			},

		},
	}
</script>

<style lang="scss">
	page,
	.content {
		background: $page-color-base;
		height: 100%;
	}

	.swiper-box {
		height: calc(100% - 40px);
	}

	.list-scroll-content {
		height: 100%;
	}

	.navbar {
		display: flex;
		height: 80upx;
		padding: 0 10upx;
		background: #fff;
		box-shadow: 0 2upx 10upx rgba(0, 0, 0, .06);
		position: relative;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30upx;
			color: $font-color-dark;
			position: relative;

			&.current {
				color: $base-color;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 88upx;
					height: 0;
					border-bottom: 4upx solid $base-color;
				}
			}
		}
	}

	.uni-swiper-item {
		height: auto;
	}

	.VScroll {
		top: 0;
		bottom: 0;
	}
	.VEmpty{
		padding-top: 240upx;
	}
</style>
