<template>
	<view class="indexHome">

		<VScroll ref="VScroll" @scrollToEnd="guessLikeInit" :vScrollData="guessLikeArray" pullup>
			<!-- 假搜索框 -->
			<view class='searchBox' @click='jumpSearch'>
				<view class='icon-search'></view>
				<view>输入商品名查找大额优惠劵</view>
			</view>
			<!-- 头部轮播 -->
			<view class="carousel-section">
				<image class="carousel carousel-img" @click='caJump' src='http://51app-image.oss-cn-hangzhou.aliyuncs.com/payment/tbk/2019/6/20/19392151071070.png'></image>
				<!-- <swiper-vue class="carousel" :options="swiperOption">
					<swiper-vue-slide v-for="(item, index) in homeData.bannerVos " :key="index" class="carousel-item" @click.native="swiper(item)">
						<image :src="item.url" />
					</swiper-vue-slide>
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper-vue> -->
			</view>
			
			<!-- 分类 -->
			<VSetion :List='homeData.configVos.slice(0,5)' @jump='jump' imageShadow></VSetion>
			<VSetion v-if='homeData.configVos.length>6' :List='homeData.configVos.slice(5)' @jump='jump' imageShadow></VSetion>
			<!-- 双十一活动 -->
			<!-- <view class='doubleT' @click='doublT' v-if='homeRushToPurchases.bigImageUrl'>
				<image class='doubleT-img' :src='homeRushToPurchases.bigImageUrl'></image>
			</view> -->
			<VFull @jump='jump' :List='homeData.configVosThree'></VFull>
			<!-- 今日热销榜单 -->
			<view class="f-header m-t">
				<image src="/static/index/hot.png"></image>
				<view class="tit-box" @click="toSecret">
					<text class="tit">今日热销榜单</text>
				</view>
				<view class="f-header-more" @click="moreHot">查看更多 <i class="arrow_right"></i></view>
			</view>

			<view class="guess-section">
				<VGoods :goodsList="homeData.optimusMaterialVos"></VGoods>
			</view>

			<!-- 猜你喜欢 -->
			<view class="f-header m-t">
				<image src="/static/index/like.png"></image>
				<view class="tit-box">
					<text class="tit">猜你喜欢</text>
				</view>
			</view>

			<view class="guess-section">
				<VGoods :goodsList="guessLikeArray"></VGoods>
				<uniLoadMore :status="loadingType"></uniLoadMore>
			</view>

		</VScroll>

		<!-- 秘密弹窗开始 -->
		<view class="secretPopup" v-if="secretShow">
			<view>该弹窗为测试弹窗，10s后将自动消失</view>
			<input type="number" password placeholder="请输入密码" v-model="secretNumber" />
			<button type="primary" @click="confimSecret">确认</button>
		</view>
		<!-- 秘密弹窗结束 -->
		

	</view>
</template>
<script>
	import VSetion from "@/components/VSetion"
	import VFull from "@/components/VFull"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			VSetion,
			uniLoadMore,
			VFull
		},
		data() {
			return {
				swiperOption: {
					autoplay: {
						disableOnInteraction: false
					},
					loop: true,
					observer: true,
					observeParents: true,
					spaceBetween: 10,
					pagination: {
						el: '.swiper-pagination'
					}

				},
				loadingType: 'more',
				guessLikeArray: [],
				page: 1,
				pageSize: 10,
				// 秘密弹窗相关变量开始
				// 测试秘密弹窗显示
				secretShow: false,
				// 秘密通道点击数
				secretSum: 0,
				secretNumber: ''
				// 秘密弹窗相关变量结束
			};
		},
		created() {
			this.guessLikeInit();
			
		},
		methods: {
			caJump(){
				uni.navigateTo({
					url: `/pages/user/cpa`
				})
			},
			jumpSearch(){
				uni.switchTab({
					url: '/pages/search/search'
				});
			},
			swiper(item) {
				if (item.type == 1) {
					// 如果链接是项目自己的链接则uni.navigateTo跳转
					if(item.clickUrl.indexOf('tdd.51app.cn/pages/')>-1){
						uni.navigateTo({
							url: `/pages/${item.clickUrl.split('tdd.51app.cn/pages/')[1]}`
						})
						return
					}
					
					window.location.href = item.clickUrl;

				} else if (item.type == 3) {
					uni.navigateTo({
						url: `/pages/product/product?id=${item.numIid}`
					})
				}

			},
			//clickType:1跳内链,如果有clickUrl则跳clickUrl，没有就去buttonNav
			// 2 就跳外链
			jump(item) {
				console.log(item)
				//0元购的直接跳过去
				if (item.id == 89) {
					uni.navigateTo({
						url: `/pages/index/freeToBuy`,
					});
					return
				}
				// 拼多多每日红包链接
				if (item.id == 90) {
					this.$api.generatePromUrl().then(res => {
						location.href = res.data.shortUrl
					})
					return
				}
				// 拼多多转盘抽奖链接
				if (item.id == 80) {
					this.$api.getLotteryUrl().then(res => {
						location.href = res.data.shortUrl
					})
					return
				}
				// 拼多多页面
				if (item.id == 77) {
					uni.navigateTo({
						url: `/pages/index/pindd?buttonIndex=${item.id}`,
					});
					return
				}
				
				if(item.clickType == 1){
					if(item.clickUrl=='JDCOM'){//京东
						uni.navigateTo({
							url:"/pages/index/pindd?buttonIndex=80",
						});
						return
					}
					uni.navigateTo({
						url: item.clickUrl || `/pages/index/buttonNav?buttonIndex=${item.id}`,
					});
				}else if (item.clickType == 2) {
					location.href = item.clickUrl
				}else if(item.clickType == 6){ //双十一活动会场
					uni.navigateTo({
						url: `/pages/forIos/doubleT?id=${item.id}`,
					});
				}else if(item.clickType == 7){
					uni.navigateTo({
						url: `/pages/forIos/activeTeen`,
					});
				}
				
				

			},
			async guessLikeInit() {
				//如果是正在加载或是没有更多了则不再请求
				if (this.loadingType == 'noMore' || this.loadingType == 'loading') {
					return;
				}
				this.loadingType = 'loading';

				let res = await this.$api.getGuessLikeProducts({
					sort: 'sale_num_desc',
					pageNum: this.page,
					pageSize: this.pageSize
				});
				//判断是否还有数据， 有改为 more， 没有改为noMore ；
				// 来自淘宝的接口可能出现某一页数量不足了，但下一页还有数据的情况，故只按照有没有数据来判断
				if (!res.data || !res.data.length) {
					this.loadingType = 'noMore';
					return
				}
				if (this.page == 1) {
					this.guessLikeArray = res.data
				} else {
					this.guessLikeArray = this.guessLikeArray.concat(res.data);
				}
				this.loadingType = 'more';
				this.page++;

			},
			// 更多今日热销，固定buttonIndex为10
			moreHot() {
				uni.navigateTo({
					url: `/pages/index/buttonNav?buttonIndex=10`,
				});
			},
			//秘密弹窗相关方法开始
			toSecret() {
				this.secretSum++;
				if (this.secretSum > 6) {
					this.secretShow = true
					setTimeout(() => {
						this.secretShow = false
						this.secretSum = 0
					}, 10000)
				}
				//点第一下后 5秒内未连续点击7下则重置
				if (this.secretSum == 1) {
					setTimeout(() => {
						if (!this.secretShow) {
							this.secretSum = 0
						}
					}, 5000)
				}
			},
			confimSecret() {
				if (this.secretNumber == '708090') {
					location.href =
						"http://192.168.100.22:5501/testMain/%E7%A7%BB%E5%8A%A8%E7%AB%AF%E6%95%88%E6%9E%9C/iphonex%E9%80%82%E9%85%8D.html"
				} else {
					alert('密码错误')
				}

			},
			//秘密弹窗相关方法结束
			doublT(){
				this.$emit('doublT');
			}

		},
		props: {
			homeData: {
				type: Object,
				default: function() {
					return {}
				}
			},
			homeRushToPurchases:{
				type: Object,
				default: function() {
					return {}
				}
			}
		}


	}
</script>

<style lang="scss">
	.VScroll {
		top: 0;
		bottom: 0;
	}

	.page-list {
		position: fixed;
		top: 170upx;
		bottom: 100upx;
		left: 0;
		right: 0;
		height: auto;
		overflow: hidden;
		background: #fff;
	}

	.header-section {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
		width: 100%;
		height: 170upx;
		background: #BF3627;
		color: #fff;

		.header-title {
			@include allCenter;
			height: 88upx;
			font-size: 32upx;
		}

		.header-nav {}
	}

	/* 头部 轮播图 */
	.carousel-section {
		position: relative;
		padding: 20upx 0 30upx;
		text-align: center;
	}

	.carousel {
		width: 702upx;
		height: 314upx;

		.carousel-item {
			width: 100%;
			height: 100%;
			overflow: hidden;
		}

		image {
			width: 100%;
			height: 100%;
			border-radius: 10upx;
		}
	}

	/* 模块头部 */
	.f-header {
		display: flex;
		align-items: center;
		padding: 0 24upx 20upx;
		background: #fff;

		image {
			flex-shrink: 0;
			width: 66upx;
			height: 66upx;
			margin-right: 20upx;
		}

		.tit-box {
			flex: 1;
			display: flex;
			flex-direction: column;
		}

		.tit {
			font-size: $font-sm;
			color: #font-color-dark;
			font-weight: bold;
		}

		.tit2 {
			font-size: $font-sm;
			color: $font-color-light;
		}

		.icon-you {
			font-size: $font-lg +2upx;
			color: $font-color-light;
		}

		.f-header-more {
			display: flex;
			align-items: center;
			color: #999;
			font-size: 24upx;


		}
	}


	.arrow_right {
		display: inline-block;
		border-style: solid;
		width: 14upx;
		height: 14upx;
		border-width: 2upx 2upx 0 0;
		border-color: #999;
		transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0)
	}

	// 秘密弹窗开始
	.secretPopup {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99999;
		padding: 20% 5%;
		background: rgba(0, 0, 0, .6);
		color: #fff;
		font-size: 40upx;
		text-align: center;

		input {
			margin-top: 10%;
			background: #fff;
			color: #000;
		}

		button {
			margin-top: 10%;
		}
		
	}
	.carousel-img{
		border-radius: 10upx;
	}

	// 秘密弹窗结束
	
	//搜索框
	.searchBox{
		width:700upx;
		height:60upx;
		background:rgba(247,247,247,1);
		border-radius:6upx;
		margin: 0 auto;
		display: flex;
		align-items: center;
		padding: 0 18upx;
		font-size:24upx;
		font-weight:500;
		color:rgba(209,209,209,1);
		.icon-search{
			background: url(../../static/common/icon-search.png);
			width: 40upx;
			height: 40upx;
			background-size: 100%;
			padding-right: 20upx;
		}
	}
	//双十一
	.doubleT{
		margin:10upx auto 16upx;
		width: 700upx;
		height: 202upx;
		.doubleT-img{
			width: 100%;
			height: 100%;
		}
	}
	
</style>
