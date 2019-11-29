<template>
	<view class="container">
		<view class='top'>
			<view class='leftsider'>
				<img src="/static/common/logo.jpg" alt="">
				<view>淘多多，一个人人都需要的赚钱App</view>
			</view>
			<view class='btn-down' @click='down'>立即下载</view>
		</view>
		<!--轮播图-->
		<view class="carousel">
			<swiper  circular=true duration="400" @change="swiperChange">
				<swiper-item class="swiper-item" v-for="(item,index) in productData.smallImagesArr" :key="index">
					<view class="image-wrapper">
						<image
							:src="item" 
							class="loaded" 
							mode="aspectFill"
						></image>
					</view>
				</swiper-item>
			</swiper>
			<text v-if="productData.smallImagesArr" class='picNum'>{{swiperIndex+1}}/{{productData.smallImagesArr.length}}</text>		
		</view>
		<!--  价格-->
		<view class="introduce-section">
			
			<view class='detail-desc'>
				<!-- <view class='comeFrom icon-taobao' v-if='productData.userType==0'></view>
				<view class='comeFrom icon-tianmao' v-if='productData.userType==1'></view> -->
				<view class="title">{{productData.taoTitle}}</view>
			</view>
			<view class="detail">
				<view class="price">
					<text class='unit'>￥</text>
					<text class='currentP'>{{productData.zkFinalPrice}}</text>
					
					<view class="juan">
						<view class='bg'>
							<image class='leftSider' src="/static/index/juan-left.png"></image>
							<image class='middle' src="/static/index/juan-middle.png"></image>
							<image class='rightSider' src="/static/index/juan-right.png"></image>
						</view>
						￥{{productData.couponInfoMoney||0 }}
					</view>
					
				</view>
				<view class="number">
				月销：{{productData.volume}}件
				</view>
			</view>	
			<text class='oriP'>￥{{productData.reservePrice }}</text>
		</view>
		<view class='borB'></view>
		<view class='btn btn-buy' @click='jumpTB'>
			淘口令购买
		</view>
		<view class='copyPop' v-if='isShow'>
			<view class='pop-mask' @click='close'></view>
			<view class='content'>
				<view class='top'>
					淘口令购买
					<img src="/static/common/icon-delect.png" alt="" @click='close'>
				</view>
				<view class='middle'>{{copyData}}</view>
				<view class='btn btn-copy'
				 v-clipboard:copy="copyData"
					  v-clipboard:success="onCopy"
					  v-clipboard:error="onError1">复制</view>
				<view class='detail'>
                      使用说明：点击复制后，请打开【手机淘宝】购买！
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		components: {
		},
		data() {
			return {
				swiperIndex:0,//当前轮播图的index,
				productData:{},
				numId:'',
				copyData:'',
				isShow:false
			};
		},
		async onLoad(options){//跳转带参
			this.inint(options.id);
			this.numId=options.id;
			let code
			if(options.code.indexOf(":")!=-1){
				 code=options.code.split(':')[1];
			}else{
				code=options.code;
			}
			
			this.copyData=decodeURIComponent(code||"$MDds87HGdaL$")  
		},
		onShow(){
		},
		methods:{
			async inint(id){//获取商品详情
				let res= await this.$api.productDetail({
					numId:id,
					couponId:this.couponId 
				});
				this.productData=res.data;
			},
			swiperChange(e) {//轮播图
				this.swiperIndex = e.detail.current;
			},
			jumpTB(){//下单
				this.isShow=true;
			},
			close(){
				this.isShow=false;
			},
			onCopy(){
				this.$toast("复制成功");
				setTimeout(()=>{
					this.isShow=false;
				},3000)
			},
			onError1: function (e) {
			  this.$toast("复制失败");
			},
			down(){
				let url='https://a.app.qq.com/o/simple.jsp?pkgname=com.wcl.tdd'
				window.open(url);
			}
		},

	}
</script>

<style lang='scss'>
	page{
		background: #fff;;
		padding-bottom: 100upx;
	}
	.icon-you{
		font-size: $font-base + 2upx;
		color: #888;
	}
	.carousel {
		height: 750upx;
		position:relative;
		swiper{
			height: 100%;
		}
		.image-wrapper{
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
		.picNum{
			font-size:30upx;
			color:rgba(255,255,255,1);
			padding:7upx 25upx;
			background:rgba(0,0,0,1);
			opacity:0.12;
			position:absolute;
			bottom:24upx;
			right:24upx;
			border-radius:40upx;
		}
		
	}
	
	/* 标题简介 */
	.introduce-section{
		background: #fff;
		padding: 25upx 37upx;
		.price{
			flex:0 0 70%;
			text-align:left;
			font-size:36upx;
			color:rgba(191,54,39,1);
			display:flex;
			align-items:center;
			.unit{
				font-size:$font-sm;
			}
			.currentP{
				font-size:36upx;
				padding:0 12upx 0 0;
			}
			.icon-art{
				width:76upx;
				height: 30upx;
				background: url(/static/index/icon-juan.png) no-repeat;
				background-size: 100%;
				display: inline-block;
			}
			
			.saveM{
				font-size:22upx;
				font-weight:bold;
				border-radius:4upx;
				padding:4upx 9upx;
				margin:0 30upx 0 20upx;
				color: #ff2828;
				background: #ffdada;
			}
			
		}
		.oriP{
			font-size: $font-sm;
			color:rgba(153,153,153,1);
			text-decoration: line-through;
		}
		.number{
			flex:0 0 30%;
			text-align:right;
			color:rgba(153,153,153,1);
			font-size: 24upx;
		}
		.detail{
			display:flex;
			align-items:center;
			width:100%;
			margin: 20upx 0 10upx;
		}
			
		.detail-desc{
			position:relative;
			.comeFrom{
				width:30upx;
				height: 30upx;
				margin-right: 18upx;
				position: absolute;
				top:2upx;
				left: 0;
			}
			.icon-taobao{
				background: url(/static/index/icon-taobao.png) no-repeat;
				background-size: 100%;
			}
			.icon-tianmao{
				background: url(/static/index/icon-tianmao.png) no-repeat;
				background-size: 100%;
			}
			.title{
				    font-size: 13px;
					font-weight:bold;
					color:rgba(51,51,51,1);
					overflow: hidden;
					-o-text-overflow: ellipsis;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					margin: 12px 0 5px;
					/* text-indent: 22px; */
					width: 100%;
					line-height: 40upx;
			}
		}
		.price_bg{
			font-size:30upx;
			font-weight:bold;
			color:#fff;
			.priceN{
				font-size:72upx;
				margin-right:18upx;
			}
			.time{
				font-size:$font-sm;
				margin-top:12upx;
			}
		}
	}
	
	.juan {
		position: relative;
		font-size: 24upx;
		color: rgba(191, 54, 39, 1);
		/* float: left; */
		margin-left: 25upx;
		padding: 0 10upx 0 50upx;
		clear: both;
		display: flex;
		align-items: center;
		height: 30upx;
		line-height: 30upx;
	
		.bg {
			width: 100%;
			position: absolute;
			left: 0;
			top: 0;
			display: flex;
			align-items: center;
			height: 30upx;
	
			.leftSider {
				position: absolute;
				top: 0;
				left: 0;
				width: 44upx;
				height: 100%;
			}
	
			.middle {
				width: 100%;
				height: 30upx;
				margin: 0 8upx 0 44upx;
				min-width: 30upx;
				box-sizing: border-box;
	
			}
	
			.rightSider {
				width: 8upx;
				position: absolute;
				top: 0;
				right: 0;
				height: 100%;
			}
	
	
	
		}
	
		.saving {
			font-size: 18upx;
			position: absolute;
			left: 10upx;
			top: 5upx;
		}
	}
	.btn-buy{
		height:88upx;
		background:rgba(191,54,39,1);
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		font-size:30upx;
		color:rgba(255,255,255,1);
		line-height: 88upx;
		text-align: center;
	}
	.top{
		height:88upx;
		background:rgba(51,51,51,1);
		display: flex;
		align-items: center;
		padding: 0 20upx 0 27upx;
		font-size:24upx;
		color:rgba(255,255,255,1);
		justify-content: space-between;
		.leftsider{
			display: flex;
			align-items: center;
		}
		img{
			width:51upx;
			height:51upx;
			border-radius:6upx;
			margin-right: 25upx;
		}
		.btn-down{
			width:132upx;
			height:50upx;
			background:rgba(255,48,48,1);
			border-radius:25upx;
			font-size:24upx;
			font-weight:400;
			color:rgba(255,255,255,1);
			text-align: center;
			line-height:50upx;
		}
		
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
	.borB{
		width:100%;
		height:20upx;
		background:rgba(248,248,248,1);
		margin-top:20upx;
	}
</style>
