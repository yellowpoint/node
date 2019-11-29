<!-- 商品详情 -->
<template>
	<view class="container">
		<!--轮播图-->
		<view class="carousel">
			<swiper circular=true duration="400" @change="swiperChange">
				<swiper-item class="swiper-item" v-for="(item,index) in productData.smallImagesArr" :key="index">
					<view class="image-wrapper">
						<image :src="item" class="loaded" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
			<text v-if="productData.smallImagesArr" class='picNum'>{{swiperIndex+1}}/{{productData.smallImagesArr.length}}</text>
		</view>
		<!--  价格-->
		<view class="introduce-section">
			<view class="detail">
				<view class="price">
					<text class='unit'>￥</text>
					<text class='currentP'>{{productData.zkFinalPrice}}</text>
					<text class='oriP'>￥{{productData.reservePrice }}</text>
					<!-- <text class='icon-art'></text> -->
					<text v-if="!isZero" class='saveM'>返{{productData.returnMoney}}元</text>
					<text v-if="isZero" class='saveM'>补贴{{productData.zkFinalPrice}}元</text>

				</view>
				<view class="number">
					月销：{{productData.volume}}件
				</view>
			</view>
			<view class='detail-desc'>
				<view class='comeFrom icon-taobao' v-if='productData.userType==0'></view>
				<view class='comeFrom icon-tianmao' v-if='productData.userType==1'></view>
				<view class='comeFrom icon-pidd' v-if='productData.userType==3'></view>
				<view class="title">{{productData.taoTitle}}</view>
			</view>
			<view class="coupon">
				<view class="price_bg">
					<text class='priceN'>{{productData.couponInfoMoney }}</text>
					<text>元优惠劵</text>
				</view>
				<view class="time">
					{{productData.couponStartTime}}-{{productData.couponEndTime}}
				</view>
				<view class="btn btn-receive" @click='jumpTB'></view>
			</view>
		</view>
		<!-- 图片详情 -->
		<view class="pic-desc">
			<VTitleClass v-if='productData.detailsImages' :value="'图文详情'"></VTitleClass>
			<view v-if='productData.detailsImages'>
				<img v-for="(item,index) in productData.detailsImages" :key="index" :src="item" />
			</view>
			<VTitleClass :value="'为你推荐'"></VTitleClass>
			<view class='goodsList'>
				<VGoods :goodsList="goodsList" :tyoe='1'></VGoods>
			</view>
		</view>
		<view>
			<VPayFooter @share='share' :numId='numId' :productData='productData' @changeCollect='changeCollect' :collect='isCollect'
			 :isZero='isZero' @jumpTB='jumpTB'></VPayFooter>
		</view>

		<share ref="share" :contentHeight="436" :shareList="shareList" :copyData='copyData'></share>
		<view class='pop-weixin' v-if='isWXPop'>
			<view class='pop-mask' @click='closePop'></view>
			<view class='content'>
				<!-- <img :src="productData.smallImagesArr[0]" alt="">
				<view class='weixinCode'>{{wxCode}}</view> -->
				<view class='price'>{{productData.returnMoney}} 元</view>
				<view class='btn btn-copy-weixin' v-clipboard:copy="wxCode" v-clipboard:success="onCopy" v-clipboard:error="onError2"></view>
				<!-- <view class='btn btn-copy-link' v-clipboard:copy="shareLink" v-clipboard:success="onCopy1" v-clipboard:error="onError1"></view> -->
				<!-- <view class='btn btn-jump' @click='jumpWx'></view> -->
				<view class='btn btn-delect' @click='closePop'></view>
			</view>
		</view>
		<!-- 弹窗二 -->
		<view class='copyPop' v-if='isShow'>
			<view class='pop-mask' @click='close'></view>
			<view class='content'>
				<view class='top'>
					淘口令购买
					<img src="/static/common/icon-delect.png" alt="" @click='close'>
				</view>
				<view class='middle'>{{shareLink}}</view>
				<view class='btn btn-copy'
				 v-clipboard:copy="shareLink"
					  v-clipboard:success="onCopy1"
					  v-clipboard:error="onError1">复制</view>
				<view class='detail'>
		              使用说明：点击复制后，{{title}}！
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import share from '@/components/share';
	import VPayFooter from '@/pages/product/VPayFooter';
	import VTitleClass from '@/components/VTitleClass';
	export default {
		components: {
			share,
			VPayFooter,
			VTitleClass
		},
		data() {
			return {
				shareList: [{ //分享
						type: 1,
						icon: '/static/temp/share_wechat.png',
						text: '微信好友'
					},
					{
						type: 3,
						icon: '/static/temp/share_qq.png',
						text: 'QQ好友'
					},
					{
						type: 2,
						icon: '/static/temp/share_moment.png',
						text: '朋友圈'
					},

				],
				swiperIndex: 0, //当前轮播图的index,
				goodsList: [], //为你推荐列表,
				productData: {},
				numId: '',
				pageNum: 1,
				pageSize: 10,
				isCollect: false,
				copyData: '',
				userInfo: this.$store.getters.userInfo,
				taobaoAuth: 0,
				client_id: '23709391',
				wxCode: '',
				shareLink: '',
				isWXPop: false,
				terraceType: '',
				//是否是零元购商品
				isZero: 0 ,//默认为0表示不是，传入1就是
				couponId:'',
				isShow:false,
				title:'淘宝'
			};
		},
		async onLoad(options) { //跳转带参
			this.terraceType = options.terraceType;
			this.isZero = Number(options.isZero);
			this.couponId=options.couponId||'';
			
			this.numId = options.id;
			if (this.terraceType == 'PINGDUODUO') {
				this.initP(options.id);
			} else {
				this.inint(options.id);
			}
			this.title=this.terraceType== 'PINGDUODUO'?'请打开浏览器访问购买':'请打开【手机淘宝】购买！';


		},
		beforeRouteEnter(to, from, next) {
			console.log(22, to, from, next);
		},
		onShow() {
			this.userInfo = this.$store.getters.userInfo;
			if (!this.userInfo) {
				return
			}
			this.taobaoAuth = this.userInfo.taobaoAuth; //判断淘宝回调
			this.taobaoObj = this.$common.urlParse();
			// console.log("淘宝授权",this.taobaoObj,this.taobaoAuth);
			if (JSON.stringify(this.taobaoObj) != '{}' && this.userInfo && this.taobaoAuth == 0) {
				if (this.taobaoObj.code) {
					this.getTooken();
				}
			}
		},
		methods: {
			async inint(id) { //获取商品详情
				let res = await this.$api.productDetail({
					numId: id,
					couponId:this.couponId //注释，后台接口未上
					
				});
				this.productData = res.data;
				this.getRecommend(); //获取为推荐
				this.createTaoKoulingTwoInOne(1) //获取淘宝分享短链
				this.isCollect = this.productData.collect;
			},
			async initP(id) { //获取拼多多商品详情
				let res = await this.$api.productDetailPidd({
					numiid: id
				});
				this.productData = res.data;
				this.getRecommend(); //获取为推荐
				this.generateGoodsPromUrl() //获取分享短链，暂时没有权限
				// this.generatePddPhrase()
				this.isCollect = this.productData.collect;
			},
			async getRecommend() { //为你推荐
				let res = await this.$api.getBeInCommonUseQuery({
					query: this.productData.title,
					pageNum: this.pageNum,
					pageSize: 6
				});
				this.goodsList = res.data;
			},
			share() { //分享
				if(this.shareLink==""||this.wxCode==""){
					this.$toast("商品数据获取失败，请稍后再试");
				}else{
					this.isWXPop = true;
				}
				// if(this.userInfo){
				// 	if(this.taobaoAuth==1){//授权过
				// 		this.createTaoKoulingTwoInOne();
				// 		this.$refs.share.toggleMask();
				// 	}else{
				// 		uni.showModal({
				// 		    content: '淘宝未授权，是否去淘宝授权？',
				// 		    success:async (e)=>{
				// 		    	if(e.confirm){
				// 					this.$common.setCookie("ShareOrOrder",0,30);
				// 					this.bindTaobao();
				// 		    	}
				// 		    }
				// 		});
				// 	}
				// }else{
				// 	this.jumpLogin();
				// }

			},
			async createTaoKoulingTwoInOne(id) { //获取淘宝分享的字段
				let res = await this.$api.createTaoKoulingTwoInOne({ //生产分享短链
					numIid: this.numId,
					text: this.productData.taoTitle,
					wechatType:this.isZero == 1 ? 1 :'' //如果是零元购则传入1
				});
				if (id == 2) {
					this.copyData = `${this.productData.taoTitle}${res.data.url}点击链接，再选择浏览器咑閞；或復·制这段描述${res.data.kouling}后到淘寳`;
				} else {
					this.shareLink = res.data.kouling;
					this.wxCode = this.$commonLogic.randomWX(res.data.wechatId)
				}

			},
			async generatePddPhrase() { //目前没有权限
				let res = await this.$api.generatePddPhrase({ //拼多多生成分享口令
					productId: this.numId,
					multiGroup: false
				});
				this.shareLink=res.data.phrase;
				this.wxCode = this.$commonLogic.randomWX(res.data.wechatId)
			},
			// 获取拼多多推广链接
			async generateGoodsPromUrl() {
				let res = await this.$api.generateGoodsPromUrl({ //拼多多生成分享口令
					productId: this.numId,
					shortUrl: true,
					multiGroup: false
				});
				// 只有url的这个链接微信的机器人才能识别
				this.shareLink = res.data.url;
				this.wxCode = this.$commonLogic.randomWX(res.data.wechatId)
			},
			jumpLogin() {
				let url = `${window.location.href}`;
				url = url.replace("?", "&");
				uni.navigateTo({
					url: `/pages/public/login?url=${url}`,

				})
			},
			swiperChange(e) { //轮播图
				this.swiperIndex = e.detail.current;
			},
			jumpTB() { //下单
				if(this.shareLink==""||this.wxCode==""){
					this.$toast("商品数据获取失败，请稍后再试");
				}else if(this.terraceType== 'PINGDUODUO'){//拼多多没有短链，直接跳转链接
					if(this.userInfo){
						this.$commonLogic.href(this.shareLink);
					}else{
						let url=encodeURIComponent(`${window.location.href}`)
						url=`/pages/public/login?url=${url}`
						uni.navigateTo({
							url:url
						})
						console.log(111,url)
					}
					
				}else{
					this.isShow = true;
				}
				// if(this.userInfo){
				// 	if(this.taobaoAuth==1){//授权过
				// 		this.convertLink();
				// 	}else{
				// 		this.$common.setCookie("ShareOrOrder",1,30);
				// 		this.bindTaobao();
				// 	}
				// }else{
				// 	this.jumpLogin();
				// }
			},
			async convertLink() {
				let res = await this.$api.convertLink({
					numId: this.numId
				});
				if (res.data.couponClickUrl) {
					location.href = res.data.couponClickUrl;
				}
			},
			changeCollect() { //收藏
				if (this.$store.getters.userInfo) {
					// this.isCollect=!this.isCollect;
					if (!this.isCollect) {
						this.addCollect();
					} else {
						this.delectCollect();
					}
				} else {
					this.jumpLogin();
				}

			},
			async addCollect() {
				let that = this;
				await this.$api.doTaobaoCollectCommodity({
					numIid: this.numId,
					terraceTypeEnum: this.productData.terraceType
				})
				this.isCollect = true;
				this.$toast('收藏成功');


			},
			async delectCollect() {
				await this.$api.doTaobaoCancelCollect({
					numIid: this.numId,
					terraceTypeEnum: this.productData.terraceType
				})
				this.isCollect = false;
				this.$toast('已取消收藏');
			},
			bindTaobao() {
				let redirect_uri = `${window.location.href}`
				redirect_uri = encodeURIComponent(redirect_uri);

				let url =
					`https://oauth.taobao.com/authorize?response_type=code&client_id=${this.client_id}&redirect_uri=${redirect_uri}&state=tb&view=wap`;
				location.href = url;
			},
			async getTooken() {
				let res = await this.$api.getToken({
					code: this.taobaoObj.code,
					note: this.userInfo.id
				});
				this.taobaoAuth = res.data.taobaoAuth;
				this.userInfo.taobaoAuth = res.data.taobaoAuth
				this.$store.dispatch('userInfo', this.userInfo)

				if (this.$common.getCookie("ShareOrOrder") == 0) {
					this.createTaoKoulingTwoInOne(2);
					this.$refs.share.toggleMask();
				} else {
					this.convertLink();
				}

			},
			onCopy() {
				this.$toast("复制微信成功，正在为你打开微信");
				setTimeout(function(){
					window.open("weixin://");
				},700)
				
			},
			onError2: function(e) {
				this.$toast("复制失败");
			},
			onCopy1() {
				this.$toast("复制成功");
			},
			onError1: function(e) {
				this.$toast("复制失败");
			},
			jumpWx() {
				window.open("weixin://");
			},
			closePop() {
				this.isWXPop = false;
			},
			close(){
				this.isShow=false;
			}
		},

	}
</script>

<style lang='scss'>
	page {
		background: #fff;
		padding-bottom: calc(100upx + constant(safe-area-inset-bottom));
		padding-bottom: calc(100upx + env(safe-area-inset-bottom));
	}

	.icon-you {
		font-size: $font-base + 2upx;
		color: #888;
	}

	.carousel {
		height: 722upx;
		position: relative;

		swiper {
			height: 100%;
		}

		.image-wrapper {
			width: 100%;
			height: 100%;
		}

		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.picNum {
			font-size: 30upx;
			color: rgba(255, 255, 255, 1);
			padding: 7upx 25upx;
			background: rgba(0, 0, 0, 1);
			opacity: 0.12;
			position: absolute;
			bottom: 24upx;
			right: 24upx;
			border-radius: 40upx;
		}

	}

	/* 标题简介 */
	.introduce-section {
		background: #fff;
		padding: 25upx 37upx;

		.price {
			flex: 0 0 70%;
			text-align: left;
			font-size: 36upx;
			color: rgba(191, 54, 39, 1);
			display: flex;
			align-items: center;

			.unit {
				font-size: $font-sm;
			}

			.currentP {
				font-size: 36upx;
				padding: 0 12upx 0 0;
			}

			.icon-art {
				width: 76upx;
				height: 30upx;
				background: url(/static/index/icon-juan.png) no-repeat;
				background-size: 100%;
				display: inline-block;
			}

			.oriP {
				font-size: $font-sm;
				color: rgba(153, 153, 153, 1);
				text-decoration: line-through;
			}

			.saveM {
				font-size: 22upx;
				font-weight: bold;
				border-radius: 4upx;
				padding: 4upx 9upx;
				margin: 0 30upx 0 20upx;
				color: #ff2828;
				background: #ffdada;
			}

		}

		.number {
			flex: 0 0 30%;
			text-align: right;
			color: rgba(153, 153, 153, 1);
			font-size: 24upx;
		}

		.detail {
			display: flex;
			align-items: center;
			width: 100%;
		}

		.detail-desc {
			position: relative;

			.comeFrom {
				width: 30upx;
				height: 30upx;
				margin-right: 18upx;
				position: absolute;
				top: 2upx;
				left: 0;
			}

			.icon-taobao {
				background: url(/static/index/icon-taobao.png) no-repeat;
				background-size: 100%;
			}

			.icon-tianmao {
				background: url(/static/index/icon-tianmao.png) no-repeat;
				background-size: 100%;
			}

			.icon-pidd {
				background: url(/static/index/icon-pidd.png) no-repeat;
				background-size: 100%;
			}

			.title {
				font-size: 13px;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
				overflow: hidden;
				-o-text-overflow: ellipsis;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				margin: 12px 0 5px;
				text-indent: 22px;
				width: 100%;
			}
		}

		.coupon {
			background: url(/static/index/saveBg.png) no-repeat;
			background-size: 100%;
			color: #fff;
			width: 100%;
			height: 148upx;
			padding: 4upx 40upx;
			margin: 40upx 0 0;
			position: relative;

			.btn-receive {
				width: 180upx;
				height: 120upx;
				position: absolute;
				top: 8upx;
				right: 32upx;
			}
		}

		.price_bg {
			font-size: 30upx;
			font-weight: bold;
			color: #fff;

			.priceN {
				font-size: 72upx;
				margin-right: 18upx;
			}

			.time {
				font-size: $font-sm;
				margin-top: 12upx;
			}
		}
	}

	/*  详情 */
	.pic-desc {
		background: #fff;

		.d-header {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			position: relative;
			margin-bottom: 10upx;

			text {
				padding: 0 20upx;
				background: #fff;
				position: relative;
				z-index: 1;
			}

			&:after {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 500upx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc;
			}
		}
	}

	.pop-weixin {
		.pop-mask {
			position: fixed;
			z-index: 999;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			background: rgba(0, 0, 0, .6);
		}

		.content {
			position: fixed;
			z-index: 999;
			width: 620upx;
			height: 920upx;
			top: 50%;
			left: 50%;
			-webkit-transform: translate(-50%, -60%);
			transform: translate(-50%, -60%);
			background-color: #fff;
			text-align: center;
			overflow: hidden;
			background: url(/static/common/weixin-bg.png) no-repeat;
			background-size: 100%;
		}

		.btn {
			/* border: 1px solid red; */
			width: 444upx;
			height: 102upx;
			position: absolute;
			right: 86upx;
		}

		.btn-copy-weixin {
			bottom: 76upx;
		}
		.price{
			position: absolute;
			top: 500upx;
			color: #FFF127;
			font-size: 60upx;
			width: 100%;
			text-align: center;
		}
		.btn-copy-link {
			top: 428upx;
			right: 40upx;
		}

		.btn-jump {
			bottom: 168upx;
			right: 160upx;
			width: 312upx;
			height: 96upx;
		}

		.btn-delect {
			left: 2upx;
			width: 76upx;
			height: 76upx;
			top: 4upx;
		}

		img {
			width: 200upx;
			height: 200upx;
			border-radius: 10upx;
			position: absolute;
			top: 330upx;
			left: 60upx;
		}
	}

	.weixinCode {
		font-size: 24upx;
		font-weight: 500;
		color: rgba(246, 65, 53, 1);
		position: absolute;
		top: 88upx;
		right: 158upx;
	}
	.copyPop{
		.pop-mask{
			position: fixed;
			z-index: 999;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			background: rgba(0,0,0,.6);
		}
		.content{
			    position: fixed;
				z-index: 999;
				width: 550upx;
				top: 50%;
				left: 50%;
				height: 480upx;
				-webkit-transform: translate(-50%,-50%);
				transform: translate(-50%,-50%);
				background-color: #fff;
				text-align: center;
				border-radius:10upx;
				overflow: hidden;
				.top{
					height:88upx;
					line-height: 88upx;
					background:rgba(255,67,36,1);
					font-size:32upx;
					color:rgba(255,255,255,1);
					text-align: center;
					position: relative;
					display: inline-block;
					width: 100%;
					img{
						padding: 29upx 10upx;
						width:50upx;
						height:88upx;
						position: absolute;
						top: 0;
						right: 0;
						margin-right: 12px;
					}
				}
				.middle{
					width:380upx;
					height:84upx;
					background:rgba(233,233,233,1);
					margin:56upx auto 33upx;
					font-size:36upx;
					font-weight:bold;
					color:rgba(51,51,51,1);
					line-height:84upx;
					overflow: hidden;
					text-overflow: ellipsis;
					padding: 0 10upx;
				}
				.btn-copy{
					width:340upx;
					height:84upx;
					background:rgba(255,67,36,1);
					border-radius:80upx;
					font-size:36upx;
					font-weight:bold;
					color:rgba(255,255,255,1);
					line-height:84upx;
					margin:0 auto 34upx;
				}
				.detail{
					width:394upx;
					height:49upx;
					font-size:22upx;
					color:rgba(102,102,102,1);
					margin:0 auto;
				}
		}
	}
</style>
