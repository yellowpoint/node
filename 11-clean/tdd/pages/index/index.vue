<template>
	<view class="index" :class="{bodyLoading:showLoading}">
		<!-- 标题栏和二级导航栏 -->
		<view class="header-section">
			<!-- <view class="header-title">淘多多</view> -->
			<VTable :tab-list="tabList" :tabCur.sync="TabCur" tab-class="header-nav-box" @change="tabChange"></VTable>
		</view>
		<!-- 标题栏和二级导航栏占位符 -->
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 中间页面 -->
		<swiper-vue class="page-list" ref="swiperPage" @slideChange="pageChange" :options="pageOption">
			<swiper-vue-slide class="page-item" v-for='(item,index) in tabList' :key="index">
				<indexHome v-if='index==0' :homeData='homeData' :homeRushToPurchases='homeRushToPurchases' @doublT='jumpDoublT'></indexHome>
				<indexOther v-if='index!=0&&TabCur==index' :label="tabList[TabCur]"></indexOther>
			</swiper-vue-slide>
		</swiper-vue>
		<!-- 一天一次的广告弹窗 -->
		<cmdTransition  name="fade">
			<view class='pop-tianMao' @click.self="hideTM" v-if='isShowIndexPop'>
				<!-- 1.商品跳转商品详情，有渠道-->
				<view class='content' v-if='advertData.redirType==1'  :style="{backgroundImage:'url('+advertData.backgroudUrl+')'}">
					<!-- <view class='main' @click="jump"></view> -->
					<view class='title'>{{advertData.title}}</view>
					<img :src="advertData.pictUrl"  alt="">
					<view class='couponPrice'>领劵后￥{{advertData.couponPrice}}/件</view>
					<view class='subsidizePrices'>最高赚￥{{advertData.subsidizePrices}}</view>
					<view class='btn btn-delect' @click="hideTM"></view>
					<view class='btn btn-sure' id='baidu_index_popup' @click="jump(advertData.numIid,advertData.goodsPlatform)"></view>
				</view>
				<!-- 2.广告跳转短链 有渠道-->
				<view class='content' v-if='advertData.redirType==2&&!advertData.command'  :style="{backgroundImage:'url('+advertData.backgroudUrl+')'}">
					<view class='btn btn-delect' @click="hideTM"></view>
					<!-- <view class='btn btn-sure btn-sure1' id='baidu_index_popup' v-clipboard:copy="tMCode" v-clipboard:success="onCopy" v-clipboard:error="onError1"></view> -->
					<view class='btn btn-sure' @click="jumpO" ></view>
				</view>
				<!-- 3.口令跳转 每天一次，第一次显示 -->
				<view class='content content1' v-if='advertData.redirType==2&&advertData.command'  :style="{backgroundImage:'url('+advertData.backgroudUrl+')'}">
					<view class='btn btn-delect' @click="hideTM"></view>
					<view class='btn btn-sure btn-sure1' id='baidu_index_popup' v-clipboard:copy="advertData.command" v-clipboard:success="onCopy" v-clipboard:error="onError1"></view>
				</view>
			</view>
			
		</cmdTransition>
		<!-- 4.悬浮图标 -->
		<!-- <view class='suspen' v-if='firstData'  @click="jumpDoublT(1)">
			
			<img  class='suspend-pop' v-if='isShowSuspendP' src="/static/common/suspend-pop.png" alt="">
			<img class='content'  :src="firstData.imageUrl" alt="">
		</view> -->
		<!-- 双十一淘宝提示弹窗-->
		<view class='doubleT-pop' v-if='isShowSuspendP'>
			<img v-if='homeRushToPurchases.clickType==5' src="/static/common/dobulT-tb.png" alt="">
			<img v-if='homeRushToPurchases.clickType==4' src="/static/common/dobulT-wx.png" alt="">
		</view>
		
		<!-- 点击后出现的微信弹窗 -->
		<cmdTransition  name="fade">
			<view class="popWx" v-if="popWx_show" @click.self="closePopWx" >
				<view class="popWx-main">
					<image src="/static/index/popWx.png"></image>
					<view class="popWx-copy" @click="copyPopWx" ></view>
					<view class="popWx-close" @click.self="closePopWx"></view>
				</view>
				
			</view>
		</cmdTransition>

		<view class="pop_tips" @click="showPopWx"><image src="/static/index/popWx-tips.png"></image></view>
		<!-- 现金红包入口 -->
		<view class='cashbonus' @click='jumpCashPack' ></view>
	</view>
</template>

<script>
	import VTable from "@/components/VTable"
	import indexHome from "@/pages/index/indexHome"
	import indexOther from "@/pages/index/indexOther"
	import cmdTransition from "@/components/cmd-transition/cmd-transition.vue"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			VTable,
			indexHome,
			indexOther,
			cmdTransition
		},
		data() {
			return {
				showLoading: true,
				tabList: [],
				TabCur: 0,
				// 由于swiper与betterScroll冲突，在页面滑动的时候会触发点击事件，故添加变量给VGoods组件控制跳转
				isSwiper: false,
				pageOption: {
					observer: true,
					observeParents: true,
					touchStartForcePreventDefault: true,
					on: {
						// 在切换开始的时候设置为true
						slideChangeTransitionStart: () => {
							this.isSwiper = true
						},
						// 动画结束的设为false，在页面没滚动过去，回弹回来也会触发，条件宽一点，让其更多少能设为false
						transitionEnd: () => {
							setTimeout(() => {
								this.isSwiper = false
							}, 100)
						}
					}
				},
				homeData: '',
				tMCode: '￥faeZYn2JwJq￥',
				isShowTM: true,
				isShowIndexPop: false,
				popWx_show:false,
				advertData:'',
				isShowFistPop:false,
				fristPopData:'',
				showAd:false,
				isShowSuspendP:false,
				homeRushToPurchases:{},
				firstData:'',
				num:1,
				userInfo: this.$store.getters.userInfo
				
				
			};
		},
		provide() {
			return {
				theme: this //提供祖先组件的实例
			};
		},
		onLoad() {
			this.inint();
			this.inint_adver();
		},
		onShow() {
				
		},
		onReady() {

		},
		computed: {

			swiperPage() {
				return this.$refs.swiperPage.swiper
			},
		},
		methods: {
			async inint() {
				let res = await this.$api.getHome();
				this.homeData = res.data;
				this.tabList = res.data.commodityConfigVos; //选项卡
				this.showLoading = false;
				//双十一活动
				if(res.data.homeRushToPurchases){
					this.homeRushToPurchases=res.data.homeRushToPurchases[0];
					this.firstData=res.data.homeRushToPurchases[0];
					let that=this;
					let dataLength=that.homeData.homeRushToPurchases.length;
					let time=this.homeRushToPurchases.cycleTime||10000
					setInterval(function(){
						if(that.num>=dataLength){
							that.num-=dataLength;
						}
						that.homeRushToPurchases=that.homeData.homeRushToPurchases[that.num];
						that.num++;
						
					},time)
				}
				

			},
			async inint_adver(){
				let res = await this.$api.getMainRecommendList({
					category:2
				});
				this.advertData=res.data;
				if(!this.advertData){
					this.isShowIndexPop=false
				}else{
					this.isShowIndexPop=true
				}
				
			},
			tabChange() {
				this.swiperPage.slideTo(this.TabCur)
			},
			pageChange(e) {
				this.TabCur = this.swiperPage.activeIndex
			},
			hideTM() {//关闭所有的弹窗
				this.isShowIndexPop=false;
			},
			setCookie_ad(){
				this.$common.setCookie("isShowIndexPop", 6, 1);
			},
			onCopy() {
				this.$toast("复制成功，请稍后");
				let url=this.advertData.goodsPlatform==1?'taobao://':'weixin://'
				setTimeout(function(){
					window.open(url);
				},700)
			},
			onError1: function(e) {
				this.$toast("复制口令失败");
			},
			closePop() {
				let that = this
				let t1 = setInterval(function() {
					if (new Date().getHours() == 24 || new Date().getHours() == 0) {
						// alert(new Date().getHours());
						that.hideTM()
						clearInterval(t1);
					}
				}, 10000);

			},
			jump(numIid,terraceType){
				this.setCookie_ad()
				// 1是淘宝，2是拼多多，3是天猫
				let terraceType1=terraceType==2?'PINGDUODUO':'TAOBAO';
				uni.navigateTo({
					url: `/pages/product/product?id=${numIid}&terraceType=${terraceType1}`
				})
			},
			jumpO(){
				this.setCookie_ad()
				let url=this.advertData.redirUrl;
				this.$commonLogic.href(url)
			},
			showPopWx(){
				this.popWx_show = true
			},
			closePopWx(){
				this.popWx_show = false
			},
			copyPopWx(){    
				let copyText = this.$commonLogic.randomWX(['wushixiong321','yirongdai524'])
				this.$copyText(copyText).then(e => {
					this.$toast('微信号复制成功,正在跳转微信')
					setTimeout(() => {
						window.open('weixin://');
						this.closePopWx()
					}, 700)
				
				}, e => {
					uni.showModal({
						title: '提示',
						content: '自动复制失败,请长按复制:\n'+copyText,
						showCancel: false
					})
					
				})
			},
			jumpDoublT(id){//双十一活动跳转 clickType   1内链链接  2外链  3商品 4=跳淘宝  5=分享微信
				let data=id==1?this.firstData:this.homeRushToPurchases;
				switch(data.clickType){
					case 1:
						uni.navigateTo({
							url: `${data.configVal}`
						})
						break;
					case 2:
						this.$commonLogic.href(data.configVal)
					break;
					case 3:
						uni.navigateTo({
							url: `/pages/product/product?id=${data.numIid}&terraceType=${data.terraceType}`
						})
					break;
					case 4:
						this.onCopySus('taobao://',id)
					break;
					case 5:
						this.onCopySus('weixin://',id)
					break;
					
					
				}
				
			},
			onCopySus(text,id){//1微信，2淘宝
			let data=id==1?this.firstData:this.homeRushToPurchases;
				let that=this;
				this.$copyText(data.configVal).then(function(e){
					that.$toast('口令复制成功');
					setTimeout(function(){
						window.open(text)
					},200)
					
				},function(e){
					that.$toast('复制失败，请稍后重试')
				})
				
				
			},
			async jumpCashPack(){//跳转现金红包
				
				if(! this.userInfo){
					let url=encodeURIComponent(`${window.location.href}`)
					url=`/pages/public/login?url=${url}`
					uni.navigateTo({
						url:url
					})
					return
				}
				let res = await this.$api.createRedPacket({
					userId:this.userInfo.id
				});
				if(res.data){		
					this.$common.setCookie("cashPack", JSON.stringify(res.data), 1);
				}
				if(res.data.justCreateRedPacket){
					uni.navigateTo({
						url:'/pages/cashBonus/firstPacket'
					})
				}else{
					uni.navigateTo({
						url:'/pages/cashBonus/secondPacket'
					})
				}
			}
		}
	
	}
</script>

<style lang="scss">
	.page-list {
		position: absolute;
		/*
		* 由于在部分手机上出现顶部分类栏与下面页面有间隙（出现过的手机也不是稳定出现），可能是因为像素除不尽的原因
		* top本来应该是88upx，先将下面的滚动页面往上移动一点
		* */
		top: calc(88upx - 2upx);
		bottom: 0;
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
		color: rgba(191, 54, 39, 1);
		background-color: #fff;

		.header-title {
			@include allCenter;
			height: 88upx;
			font-size: 32upx;
		}

	}

	.pop-tianMao {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
		background: rgba(0,0,0,.5);
		@include allCenter;
		overflow: auto;

		.content {
			position: relative;
			top: -60upx;
			width: 672upx;
			height: 1056upx;
			background-size: 100%;
			background-repeat: no-repeat;
			img{
				width: 430upx;
				height: 430upx;
				position: absolute;
				top: 360upx;
				left: 50%;
				margin-left: -215upx;
			}
			.btn {
				// border: 1px solid red;
			}
			.couponPrice{
				font-size:30upx;
				font-weight:500;
				color:rgba(255,255,255,1);
				line-height:44upx;
				position: absolute;
				left:0;
				text-align: center;
				bottom: 160upx;
				width: 100%;
				
				}
			.subsidizePrices{
				width: 100%;
				font-size:36upx;
				font-weight:500;
				color:rgba(251,54,52,1);
				line-height:44upx;
				position: absolute;
				left:0;
				text-align: center;
				bottom: 80upx;
				
			}
				
			.main{
				width: 600upx;
				height: 800upx;
				position: absolute;
				left: 80upx;
				top: 0;
			}
			.title{
				position: absolute;
				top: 260upx;
				left: 50%;
				margin-left: -191upx;
				width: 382upx;
				font-size:33upx;
				font-family:SourceHanSansCN-Medium;
				font-weight:500;
				color:rgba(0,0,0,1);
				 text-overflow: -o-ellipsis-lastline;
				  overflow: hidden;
				  text-overflow: ellipsis;
				  display: -webkit-box;
				  -webkit-line-clamp: 2;
				  line-clamp: 2;
				  -webkit-box-orient: vertical;
			}

			.btn-delect {
				width: 100upx;
				height: 100upx;
				position: absolute;
				top: 0;
				left: 0;
			}

			.btn-sure {
				width: 626upx;
				height: 980upx;
				position: absolute;
				top: 80upx;
				left: 16upx;
			}
			// .btn-sure1{
			// 	height: 100upx;
			// 	top: 444upx;
			// 	left: 128upx;
			// }

			.code {
				position: absolute;
				bottom: 294upx;
				left: 72upx;
				font-size: 40upx;
				font-weight: 500;
				color: rgba(104, 25, 24, 1);
				line-height: 72upx;
				width: 536upx;
				text-align: center;
				// border: 1px solid red;
			}
		}
		.content1{
			top: 0;
			height: 1002upx;
			.btn-sure{
				width: 680upx;
				height: 916upx;
				left: 0;
			}
			
		}
	}
	.pop_tips{
		position: fixed;
		bottom:  calc(50px + constant(safe-area-inset-bottom));
		bottom:  calc(50px + env(safe-area-inset-bottom));
		left: 0;
		z-index: 998;
		width: 100%;
		height: 80upx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.popWx{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
		background: rgba(0,0,0,.5);
		@include allCenter;
		overflow: auto;
		.popWx-main{
			position: relative;
			width: 100%;
			height: 877upx;
			image{
				width: 100%;
				height: 100%;
			}
			.popWx-copy{
				position: absolute;
				bottom: 114upx;
				left: 176upx;
				width: 396upx;
				height: 100upx;
			}
			.popWx-close{
				position: absolute;
				bottom: -8upx;
				left: 320upx;
				width: 100upx;
				height: 100upx;
			}
		}
	
		
	}
	.suspen{
		width: 140upx;
		height: 168upx;
		position: fixed;
		bottom: 470upx;
		right: -6upx;
		z-index: 100;
		.suspend-pop{
			width: 130upx;
			height: 57upx;
			position: absolute;
			bottom: -42upx;
			right: 10upx;
		}
		.content{
			width: 140upx;
			height: 168upx;
			z-index: 101;
			position: absolute;
			top: 0;
			left: 0;
		}
	}
	.doubleT-pop{
		width: 400upx;
		height: 475upx;
		position: fixed;
		top: 200upx;
		left: 50%;
		margin-left: -50%;
	}
	.cashbonus{
		position: absolute; 
		top:400px;right:0;
		width: 190upx;
		height: 190upx;
		// background:red;
		z-index: 998;
		background: url(../../static/cashBonus/suspen-cash.gif) no-repeat;
		background-size: 100% 100%;
	}
</style>
