<template>
	<view class='myCollection'>
		<VChangeType :isChange='false'></VChangeType>
			<!-- <VChangeType @changeType='changeType'></VChangeType> -->
		<view class='content'>
			<VScroll :class='{"contentSc":!isBottom}' ref="VScroll" @scrollToEnd="scroll" :vScrollData="allList" pullup>
				<view class='main'>
					 <VGoods :goodsList="collectList" @check='check' :comFrom="true" :url='"myCollect"' :type='type' v-if='collectList.length>0'
					  :isDelect='isDelect' :isNoSales='isNoSales' :isClick='!isBottom'></VGoods>
					<VEmpty v-if='collectList.length==0&&!isCollect' :img='"/static/common/nullCollect.png"'></VEmpty>
					<uniLoadMore :status="loadingType" v-if='collectList.length>0&&isShowLoad'></uniLoadMore>
				</view>
				<view v-if='!isCollect'>
					<VTitleClass :value='"为你推荐"'></VTitleClass>
					<VGoods :goodsList="recommondList" v-if='recommondList.length>0'></VGoods>
					<uniLoadMore :status="loadingType2" v-if='recommondList.length>0'></uniLoadMore>
				</view>

			</VScroll>
		</view>

		<view class='bottom' v-if='isBottom>0'>
			<view class='leftsider' @click='allCheck()'>
				<view :class='isAllCheck?"icon-check icon":"icon-unCheck icon"'></view>
				<view class='name'>全选</view>
			</view>
			<view class='rightsider'>
				<view class='btn-delect' @click='delect'>删除</view>
			</view>

		</view>
	</view>
</template>

<script>
	import VTitleClass from '@/components/VTitleClass';
	import VChangeType from '@/components/VChangeType';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import VEmpty from "@/components/VEmpty";

	export default {
		data() {
			return {
				collectList: [],
				page: 1,
				pageSize: 10,
				pageR: 1, //为你推荐的分页
				recommondList: [], //为你推荐数据
				allList: [],
				isCollect: true,
				type: 2,
				isBottom: false,
				isAllCheck: false,
				isDelect: false, //是否有删除,
				isNoSales: false, //是否有销量,
				loadingType: 'more',
				loadingType2: 'more',
				isShowLoad:true


			};
		},
		onShow(option) {
			this.page = 1;
			this.pageR = 1;
			this.collectList = [];
			this.recommondList = [];
			this.isCollect = true;
			this.loadingType = 'more';
			this.loadingType2 = 'more'
			this.allList = [];
			this.inint();
			this.getRecommond();
			this.isShowLoad=true;


		},
		onLoad(option) {
			// uni.setNavigationBarTitle({
			// 	title: '新的标题'
			// });
		},
		watch: {
			loadingType(val){
				if(val=="noMore"){
					this.isShowLoad=false;
				}
			}
		},
		computed: {},
		components: {
			VTitleClass,
			VChangeType,
			uniLoadMore,
			VEmpty
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0 && this.collectList.length != 0) {
				this.isBottom = !this.isBottom;
				this.isDelect = !this.isDelect;
			} else {
				this.$toast('请先收藏')
			}
		},
		methods: {
			async scroll() {
				if (this.isCollect) {
					await this.inint();
				} else if (this.pageR < 21) {
					await this.getRecommond();
				} else {}

			},
			async inint() {

				if (this.loadingType === 'loading' || this.loadingType === 'noMore') {
					return;
				}

				this.loadingType = 'loading';
				let res = await this.$api.getCollectRecord({
					pageNum: this.page,
					pageSize: this.pageSize
				});
				if (res.data.list) {
					if (this.page == 1) {
						this.collectList = res.data.list
					} else {
						this.collectList = this.collectList.concat(res.data.list)
					}

					if (this.collectList.length >= res.data.total) {
						this.isCollect = false;
						this.loadingType = 'noMore';
					} else {
						this.loadingType = 'more';
					}
					this.page++;
				} else {
					this.isCollect = false;
					this.loadingType = 'noMore';
				}

				this.collectList.forEach(item => { //获取数据时加入isCheck字段
					if (typeof item.isCheck == "undefined" && !this.isAllCheck) {
						this.$set(item, 'isCheck', false);
					} else if (this.isAllCheck) {
						this.$set(item, 'isCheck', true);
					}

				})
				this.allList = this.allList.concat(this.collectList);

			},
			async getRecommond() {
				if (this.loadingType2 === 'loading' || this.loadingType2 === 'noMore') {
					return;
				}
				this.loadingType2 = 'loading';
				let res = await this.$api.getToYouRecommend({
					pageNum: this.pageR,
					pageSize: this.pageSize
				});
				if (res.data) {

					if (this.pageR == 1) {
						this.recommondList = res.data;
					} else {
						this.recommondList = this.recommondList.concat(res.data);
					}
					this.loadingType2 = 'more'
					if (this.pageR == 20) {
						this.loadingType2 = 'noMore'
					}
					this.pageR++;
				} else {
					this.loadingType2 = 'noMore'
				}



				this.allList = this.allList.concat(this.recommondList);

			},
			changeType() {
				this.type = this.type == 1 ? 2 : 1;

			},
			allCheck() {
				this.isAllCheck = !this.isAllCheck;
				if (this.isAllCheck) {
					this.collectList.forEach(item => {
						item.isCheck = true;
					})
				} else {
					this.collectList.forEach(item => {
						item.isCheck = false;
					})
				}
			},
			check(id) {
				this.collectList.forEach(item => {
					if (item.numIid == id) {
						item.isCheck = !item.isCheck;
					}
				})
			},
			delect() {

				if (this.collectList.length <= 0) {
					this.$toast("收藏夹已清空");
				} else {
					let that = this;
					uni.showModal({
						content: '确定删除？',
						success: (res) => {
							if (res.confirm) {
								this.operation();
							} else if (res.cancel) {

							}
						}
					});
				}

			},
			async operation() {
				let ids = '';
				this.collectList.forEach(item => {
					if (item.isCheck) {
						ids += `${item.id},`
					}
				})

				console.log(555, ids);
				let res = await this.$api.doTaobaoBatchCancelCollectHtml({
					ids: ids
				});
				this.$toast("删除成功");
				this.page = 1;
				this.pageR = 1;
				this.collectList = [];
				this.recommondList = [];
				this.isCollect = true;
				this.loadingType = 'more';
				this.loadingType2 = 'more'
				this.isBottom = false;
				this.allList = [];
				this.inint();
				this.getRecommond();
				this.isShowLoad=true;
				this.isDelect=false;

			},
			jump() {
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			}
		}
	}
</script>
<style lang='scss'>
	.bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 98upx;
		background: rgba(242, 242, 242, 1);
		display: flex;
		align-items: center;
		padding: 0 36upx 0 30upx;

		.leftsider {
			display: flex;
			align-items: center;
			flex: 0 0 30%;
			padding: 20upx 0;

			.icon {
				width: 30upx;
				height: 30upx;
				border-radius: 50%;
				margin-right: 30upx;
			}

			.icon-check {
				background: url(/static/my/icon-check.png) no-repeat;
				background-size: 100%;

			}

			.icon-unCheck {
				background: url(/static/my/icon-unCheck.png) no-repeat;
				background-size: 100%;

			}
		}

		.rightsider {
			flex: 0 0 70%;
			display: flex;
			justify-content: flex-end;
			align-items: center;

			.btn-delect {
				width: 150upx;
				height: 60upx;
				background: rgba(191, 54, 39, 1);
				border-radius: 30upx;
				text-align: center;
				font-size: 28upx;
				color: rgba(255, 255, 255, 1);
				line-height: 60upx;

			}
		}

	}

	.main {
		padding: 20upx 0;
	}

	.VTitleClass {
		padding-bottom: 40upx;
	}

	.contentSc {
		bottom: 0;
	}
</style>
