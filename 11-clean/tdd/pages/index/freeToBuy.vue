<!-- 0元购 -->
<template>
	<view class="freeToBuy">
		<image class="f-tips" src="/static/index/freeToBuy/tips.png" mode="widthFix" @click="showRule"></image>
		<image class="f-header" src="/static/index/freeToBuy/header.png" mode="widthFix"></image>
		<view class="f-chanceBox">
			<image class="f-chance" src="/static/index/freeToBuy/chance.png" mode="widthFix"></image>
			<view class="fc-times">{{chanceTimes}}</view>
			<view class="fc-get" @click="showShare"></view>
		</view>

		<VEmpty v-if="loadingType=='noMore'&&goodsList.length==0"></VEmpty>
		<!-- 商品列表 -->
		<view class="f-list">

			<view v-for="(item,index) of goodsList" :key="index" class="f-item" @click="clickGoods(item)">
				<view class="f-main">
					<image class="fi-img" :class="[item.loaded]" :src="item.pictUrl" @load="onImageLoad('goodsList', index)" @error="onImageError('goodsList', index)"
					 lazy-load></image>
					<view class="fi-right">
						<view class="fi-name">
							<image src="/static/index/icon-taobao.png"></image>
							{{item.title}}
						</view>
						<view class="fi-oldprice">￥{{item.reservePrice}}</view>
						<view class="fi-row">
							<view class="fi-newprice">￥{{item.zkFinalPrice}}</view>
							<view class="fi-subsidy">
								<image src="/static/index/freeToBuy/subsidy.png"></image>￥{{item.zkFinalPrice}}
							</view>
						</view>
					</view>
				</view>
			</view>


			<uniLoadMore v-if="loadingType!='noMore'" :status="loadingType" color="#fff"></uniLoadMore>
		</view>
		<view class="f-footer">活动最终解释权归淘多多所有</view>


		<!-- 分享弹窗 -->
		<popup-layer direction="top" v-model="share_show">
			<view class="f-share">
				<p>邀请好友，即可获得免单机会</p>
				<view class="fs-list">
					<view class="fs-item" @click="share(0)">
						<image src="/static/index/freeToBuy/share_wx.png" mode="widthFix"></image>
						<p>微信好友</p>
					</view>
					<view class="fs-item" @click="share(1)">
						<image src="/static/index/freeToBuy/share_qq.png" mode="widthFix"></image>
						<p>QQ好友</p>
					</view>
					<view class="fs-item" @click="share(2)">
						<image src="/static/index/freeToBuy/share_moments.png" mode="widthFix"></image>
						<p>朋友圈</p>
					</view>
				</view>
				<view class="fs-cancel" @click="closeShare">取消</view>
			</view>
		</popup-layer>


		<!-- 规则弹窗 -->
		<popup-layer direction="top" v-model="rule_show">
			<view class="f-rule">
				<image class="fr-header" src="/static/index/freeToBuy/rule.png" mode="widthFix"></image>
				<view class="fr-close" @click="closeRule"></view>
				<view class="fr-main">
					<VScroll>
						<freeToBuyRule></freeToBuyRule>
					</VScroll>
				</view>
			</view>
		</popup-layer>
	</view>
</template>

<script>
	import popupLayer from '@/components/popup-layer/popup-layer.vue';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import VEmpty from '@/components/VEmpty.vue';
	import freeToBuyRule from '@/pages/index/freeToBuyRule';
	export default {
		components: {
			popupLayer,
			uniLoadMore,
			VEmpty,
			freeToBuyRule
		},
		data() {
			return {
				userInfo: this.$store.getters.userInfo,
				goodsList: [],
				//机会次数
				chanceTimes: '',
				rule_show: false,
				share_show: false,
				loadingType: 'loading',
				// 邀请码
				inviteCode: ''
			}
		},
		props: {
			propName: {
				type: Number,
				default: 0
			},
		},
		async onLoad() {
			let res = (await this.$api.getZeroBuyList()).data
			this.loadingType = 'noMore'
			this.goodsList = res.zeroBuyVo
			this.chanceTimes = res.zeroBuyChance || 0

		},
		methods: {
			showRule() {
				this.rule_show = true
			},
			closeRule() {
				this.rule_show = false
			},
			async showShare() {
				if (!this.userInfo) {
					this.$toast('获取机会前请先登录')
					setTimeout(() => {
						this.$commonLogic.verifyLogin()
					}, 1000)

					return
				}

				this.inviteCode = this.userInfo.invitationCode || ''
				this.share_show = true
			},
			closeShare() {
				this.share_show = false
			},
			share(share_index) {
				let copyText = `你购物我买单，首笔订单全额返！自购省钱分享还能赚钱！${location.origin}/pages/index/freeSignIn?inviteCode=${this.inviteCode}`
				let appHref = 'weixin://'
				if (share_index == 1) {
					appHref = 'mqqwpa://'
				}


				this.$copyText(copyText).then(e => {
					this.closeShare()
					uni.showModal({
						title: '提示',
						content: '邀请链接复制成功,正在跳转app',
						showCancel: false
					})
					setTimeout(() => {
						location.href = appHref
					}, 1000)

				}, e => {
					this.$toast('自动复制失败')
				})

			},
			clickGoods(item) {

				if (this.chanceTimes <= 0) {
					this.$toast('没有机会了请先获取机会')
					setTimeout(() => {
						this.showShare()
					}, 1000)
					return
				}
				uni.navigateTo({
					url: `/pages/product/product?id=${item.numIid}&terraceType=${item.terraceType}&isZero=1`
				})
			},
			//监听image加载完成
			onImageLoad(key, index) {
				this.$set(this[key][index], 'loaded', 'loaded');
			},
			//监听image加载失败
			onImageError(key, index) {
				this[key][index].pictUrl = '/static/errorImage.jpg';
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F7302D;
	}

	.freeToBuy {
		padding-top: 80upx;

		.f-tips {
			position: fixed;
			top: var(--window-top);
			left: 0;
			z-index: 88;
			height: 80upx;
		}

		image {
			width: 100%;
			display: block;
		}

		.f-header {
			height: 680upx;
		}

		.f-chanceBox {
			position: relative;

			.fc-times {
				position: absolute;
				bottom: 34upx;
				left: 346upx;
				color: #fff;
				font-size: 38upx;
				font-weight: bold;
			}

			.fc-get {
				position: absolute;
				bottom: 30upx;
				right: 120upx;
				width: 104upx;
				height: 60upx;
			}
		}

		.f-chance {
			height: 260upx;
			margin-top: -220upx;
		}

		.f-list {
			margin-top: 20upx;

			.f-item {
				width: 690upx;
				height: 280upx;
				padding: 10upx;
				margin: 20upx auto 0;
				background: linear-gradient(0deg, rgba(255, 123, 16, 1), rgba(255, 219, 50, 1));
				border-radius: 10upx;

				.f-main {
					position: relative;
					display: flex;
					width: 670upx;
					height: 260upx;
					padding: 10upx;
					background: #fff;
				}

				.fi-img {
					flex-shrink: 0;
					width: 240upx;
					height: 240upx;
				}

				.fi-right {
					padding: 20upx;
					overflow: hidden;
				}

				.fi-name {
					position: relative;
					height: 134upx;
					color: #383838;
					font-size: 24upx;
					text-indent: 42upx;
					overflow: hidden;

					image {
						position: absolute;
						top: 0;
						left: 0;
						width: 32upx;
						height: 32upx;
					}
				}

				.fi-oldprice {
					color: #C6C6C6;
					font-size: 24upx;
					text-decoration: line-through;
				}

				.fi-row {
					display: flex;
				}

				.fi-newprice {
					color: #F7302D;
					font-size: 30upx;
					font-weight: bold;
				}

				.fi-subsidy {
					display: flex;
					align-items: center;
					margin-left: auto;
					color: #F7302D;
					font-size: 24upx;

					image {
						width: 72upx;
						height: 24upx;
					}
				}
			}
		}

		.f-footer {
			@include allCenter;
			height: 74upx;
			color: #FFFFFF;
			opacity: 0.8;
			font-size: 22upx;
		}

		.f-share {
			position: relative;
			height: 330upx;
			padding-top: 30upx;
			background: rgba(255, 255, 255, 1);
			border-radius: 20upx 20upx 0 0;
			text-align: center;
			font-size: 28upx;

			.fs-list {
				padding: 0 20upx;
				margin-top: 44upx;
				overflow: hidden;

				.fs-item {
					float: left;
					width: 100upx;
					margin-right: 50upx;
					text-align: center;
					font-size: 24upx;
					overflow: hidden;

					image {
						width: 72upx;
						height: 72upx;
						margin: 0 auto 20upx;
					}
				}
			}

			.fs-cancel {
				position: absolute;
				bottom: 0;
				left: 0;
				@include allCenter;
				width: 100%;
				height: 80upx;
				border-top: 1px solid #f5f5f5;
			}
		}

		.f-rule {
			position: relative;
			height: 1000upx;
			background: linear-gradient(55deg, rgba(247, 48, 45, 1), rgba(255, 131, 47, 1));
			border-radius: 20upx 20upx 0 0;
			overflow: hidden;

			.fr-header {
				margin: 40upx 0;
			}

			.fr-close {
				position: absolute;
				top: 35upx;
				right: 35upx;
				width: 50upx;
				height: 50upx;
			}

			.fr-main {
				position: relative;
				width: 690upx;
				height: 816upx;
				margin: 0 auto;
				background: #fff;
				border-radius: 20upx;
				color: #383838;
				font-size: 24upx;
				overflow: hidden;

				.VScroll {
					top: 20upx;
					bottom: 20upx;
					overflow: hidden;
				}


			}
		}
	}

	/* 图片载入替代方案 */
	.fi-img {
		transition: .6s;
		opacity: 0;

		&.loaded {
			opacity: 1;
		}

	}
</style>
