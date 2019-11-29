<template>
	<view class="VGoods" >
		<view v-for="(item, index) in goodsList" :key="index" :class="[type==1?'VGoods-item itemType1':'VGoods-item itemType2',className]"
		 @tap="clickGoods(item)">
			<view class='leftCheck checkW' v-if='type==2&&isDelect' @click.stop='check(item.numIid)'>
				<view :class='item.isCheck?"icon-check icon":"icon-unCheck icon"'></view>
			</view>
			<view :class='{"rightCheck":isDelect}'>
				<view class='checkW' v-if='type==1&&isDelect' @click.stop='check(item.numIid)'>
					<view :class='item.isCheck?"icon-check icon":"icon-unCheck icon"'></view>
				</view>
				<view class="image-wrapper ">
					<!-- src="@/static/imgLoading.gif" -->
					<img v-img="item.pictUrl" alt="">
				</view>
				<view class='content'>
					<view class='detail' v-if='type==2'>
						<view class='comeFrom icon-taobao' v-if='item.userType==0'></view>
						<view class='comeFrom icon-tianmao' v-if='item.userType==1'></view>
						<view class='comeFrom icon-pidd' v-if='item.userType==3'></view>
						<view class='comeFrom icon-jd' v-if='item.userType==4'></view>
						<view class="title">{{item.title}}</view>
					</view>
					<view class='detail' v-if='type==1'>
						<view class='comeFrom icon-jd' v-if='item.userType==4'></view>
						<view class="title" :class="[item.userType==4?'title titleJd':'title']">{{item.title}}</view>
					</view>
					 <view v-if='type==2'> <!--横-->
						<text class='shipping' v-if='type==2&&item.userType!=4'>包邮</text>
						<view class="price">
							<view class='spellGroup' v-if='item.userType==4&&item.pinGou'></view>
							<text class='nowP'>￥{{item.zkFinalPrice}}</text>
							<!-- <view class='icon-art'></view> -->
							<text class='oriP' >￥{{item.reservePrice}}</text>
						</view>
						<view class='savingP'>
							<view  :class='comFrom?"lefsider lefsider2":"lefsider"'>
								<!-- <view class='spellGroup' v-if='item.userType==4&&item.pinGou'></view> -->
								<view class="juan">
									<view class='bg'>
										<image class='leftSider' src="/static/index/juan-left.png"></image>
										<image class='middle' src="/static/index/juan-middle.png"></image>
										<image class='rightSider' src="/static/index/juan-right.png"></image>
									</view>
									￥{{Math.floor(item.couponAmount||0) }}
								</view>
								<view class='saveM' v-if='type==2'>返{{item.returnMoney||0 }}元</view>
							</view>
							<view class='btnJdPay' v-if='item.userType==4'></view>
							<view class='btnJdPay1' @click.stop='jdshare(item)' v-if='item.userType==4'></view>
							<view class='person' v-if='isNoSales&&item.userType!=4'>{{item.volume }}人付款</view>
						</view>
						<view class='store' v-if='item.userType==4'>
							<view class='byself' v-if='item.owner=="g"'></view>
							<view class='storeName'>{{item.shopName}}</view>
							<view class='person' v-if='isNoSales'>{{item.volume }}人付款</view>
						</view>
					</view>
					<view v-if='type==1' class='type1'><!--竖着-->
						<view class='savingP'>
							<view class='lefsider'>
								<view class='spellGroup' v-if='item.userType==4&&item.pinGou'></view>
								<view class="juan">
									<view class='bg'>
										<image class='leftSider' src="/static/index/juan-left.png"></image>
										<image class='middle' src="/static/index/juan-middle.png"></image>
										<image class='rightSider' src="/static/index/juan-right.png"></image>
									</view>
									￥{{item.couponAmount||0 }}
								</view>
								<view class='saveM' >返{{item.returnMoney||0}}元</view>
							</view>
							
						</view>
						<view class="price">
							<view class='leftsider'>
								<text class='nowP'>￥{{item.zkFinalPrice}}</text>
								<text class='oriP' v-if='isNoSales'>￥{{item.reservePrice}}</text>
							</view>
						</view>
						<view class='bottom'>
							<view v-if='item.userType!=4'>
								<view class='icon icon-taobao' v-if='item.userType==0'></view>
								<view class='icon icon-tianmao' v-if='item.userType==1'></view>
							</view>
							<view class='byself' v-if='item.owner=="g"&&item.userType==4'></view>
							<view class='storeName' v-if='item.userType==4' :class="[item.userType==4?'storeName storeName1':'storeName']">{{item.shopName}}</view>
							<view class='personTpe1' v-if='isNoSales' :class="[item.userType==4?'personTpe1 personTpe2':'personTpe1']">{{item.volume }}人付款</view>
						</view>
					</view>
					
				
				
				</view>

			</view>

		</view>
	</view>
</template>

<script>
	import { sending } from '@/common/bridge'
	export default {
		data() {
			return {
				isCheck: false,
				userInfo: this.$store.getters.userInfo			}
		},
		// 首页的实例，用于控制商品是否跳转
		inject: {
			theme: {
				default: () => ({})
			}
		},
		props: {
			goodsList: {
				type: Array,
				default: () => {
					return []
				}
			},
			type: {
				type: Number,
				default: 1
			},
			isDelect: {
				type: Boolean,
				default: false //收藏夹
			},
			isNoSales: {
				type: Boolean,
				default: true //收藏夹
			},
			isClick:{
				type: Boolean,
				default: true //是否可以点击
			},
			comFrom:{
				type: Boolean,
				default: false //是否来自收藏夹
			},
			channel:{
				type:Number,
				default:0 //0是淘宝，1是拼多多 2是京东//4跟ios交互
			},
			className:{
				type:String,
				default:"" 
			},
			optionsType:{//淘宝活动页面传类型
				type:String,
				default:"" 
			}
			

		},
		mounted() {
			
		},
		methods: {
			//详情页
			clickGoods(item) {
				if(this.optionsType){
					// debugger;
					let obj={
						type:'8',
						item:item
					}
					if(this.optionsType=='android'){
						
						jsActivity.onCall(JSON.stringify(obj))
						return
					}else{
						sending(obj)
						return
					}
				}
				
				
				if(item.userType==4){//京东
					this.isLogin(item,1);
					return
				}
				//
				// 如果有isSwiper且为true的话就阻止跳转
				if(this.theme.isSwiper){
					return
				}
				if(!this.isClick){
					this.$emit('check', item.numIid);
					return;
				}
				item.couponId=item.couponId?item.couponId:'';
				
				uni.navigateTo({
					url: `/pages/product/product?id=${item.numIid}&terraceType=${item.terraceType}&couponId=${item.couponId}`
				})
				
				console.log(111,item.numIid,item.couponId)

			},
			check(id) {
				this.$emit('check', id);
			},
			async getJdCode(item,type){//京东
				console.log(22,item)
				let res= await this.$api.jdGenerateGoodsPromUrl({
						channelType: "HTML5",
						chainType:2,
						couponUrl:item.couponLink||"",
						materialId:item.materialUrl
					});
				if(type==1){
					if(item.couponAmount==0){
						this.$commonLogic.href(res.data.shortURL);
					}else{
						let text=`${res.data.shortURL}`;
						let that=this;
						uni.showModal({
						    title: '请使用微信打开',
						    content: text,
						    success: function (res) {
						        if (res.confirm) {
						           
						            that.$copyText(text).then(function(){
						            	that.$toast('复制成功')
						            	setTimeout(function() {
						            		window.open('weixin://');
						            	}, 300);
						            },function(){
						            	that.$toast('复制失败，请稍后重试')
						            })
									
						        } else if (res.cancel) {
						            console.log('用户点击取消');
						        }
						    }
						});
					}
				}else{
					// let text=`${item.title}${res.data.shortURL}`
					let text=`${item.title}\n${item.shopName}\n商品链接:${res.data.shortURL}`
					console.log(text)
					this.$emit('openPop', text);
				}
				
			},
			isLogin(item,type){
				if(this.userInfo){
					this.getJdCode(item,type);
				}else{
					let url=encodeURIComponent(`${window.location.href}`)
					url=`/pages/public/login?url=${url}`
					uni.navigateTo({
						url:url
					})
				}
				
			},
			jdshare(item){
				this.isLogin(item,2);
				
			}
		}
	}
</script>

<style lang="scss">
	.VGoods {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30upx;
		background: #fff;

		.VGoods-item {
			display: flex;
			width: 48.5%;
			margin-bottom: 18upx;
			padding-bottom: 20upx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0 5upx 10upx 2upx rgba(212, 212, 212, 0.35);
			border-radius: 10upx;
			background-color: #fff;
			border-radius:24upx;


		}

		.itemType1:nth-child(2n+1) {
			margin-right: 3%;
		}

		.image-wrapper {
			width: 100%;
			height: 334upx;
			border-radius: 10upx 10upx 0 0;
			// overflow: hidden;
			position: relative;

			img{
				width: 100%;
				height: 100%;
				opacity: 1;
				border: 0;
			}

			.icon-save {
				width: 124upx;
				height: 40upx;
				position: absolute;
				top: 0;
				left: 0;
				background: url(/static/index/icon-save.png) no-repeat;
				background-size: 100%;
				font-size: 24upx;
				color: #fff;
				padding-left: 10upx;
				line-height: 40upx;
			}
		}

		.title {
			font-size: $font-sm;
			color: $font-color-dark;
			font-size: 24upx;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			line-height: 36upx;
			@include ellipsis(2);
			float: left;
			margin: 10upx 0 10upx ;
			text-indent: 40upx;
			height: 68upx;
			width: 100%;
			word-break: break-all;
		}

		.price {
			font-size: 30upx;
			color: $uni-color-primary;
			font-weight: 500;
			display: flex;
			align-items: center;

			.icon-art {
				width: 72upx;
				height: 30upx;
				background: url(/static/index/icon-juan.png) no-repeat;
				background-size: 100%;
				font-size: $font-sm;
				float: left;
				margin: 10upx 0 0 6upx;
			}

			.nowP {
				// float: left;
				color: rgba(191, 54, 39, 1);
				margin-right: 15upx;
			}

			.oriP {
				font-size: $font-sm;
				color: rgba(153, 153, 153, 1);
				text-decoration: line-through;
				
			}
		}

		.content {
			padding: 0 13upx;

			.savingP {
				padding-top: 10upx;
				width: 100%;
				overflow: hidden;
				display: flex;
				align-items: center;
			}

			.juan {
				position: relative;
				font-size: 24upx;
				color: rgba(191, 54, 39, 1);
				float: left;
				margin-right: 6upx;
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

			.person {
				font-size: $font-sm;
				color: rgba(153, 153, 153, 1);
				line-height: 36upx;
				flex: 0 0 50%;
				text-align: right;
			}

			.lefsider {
				flex: 0 0 50%;
				height: 30upx;
			}
			.saveM {
				font-size: 22upx;
				font-weight: bold;
				color:rgba(255,40,40,1);
				background:rgba(255,218,218,1);
				border-radius: 4upx;
				padding:3upx 10upx;
			
			}
			.lefsider {
				flex: 0 0 66%;
				display: flex;
				align-items: center;
			}

		}

		.detail {
			position: relative;
			overflow: hidden;
		}

		.comeFrom {
			width: 30upx;
			height: 30upx;
			margin-right: 18upx;
			position: absolute;
			top: 12upx;
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
		.icon-jd{
			background: url(/static/index/icon-jd.jpg) no-repeat;
			background-size: 100%;
		}


		.itemType2 {
			width: 100%;
			position: relative;
			box-shadow: none;
			border-radius: 0;
			display: flex;

			.image-wrapper {
				width: 240upx;
				height: 240upx;
				border-radius: 10upx;
				position: absolute;
				top: 0;
				left: 0;
			}

			.content {
				padding-left: 260upx;

			}

			.shipping {
				padding: 4upx 9upx;
				background: rgba(255, 255, 255, 1);
				border: 1upx solid rgba(191, 54, 39, 1);
				border-radius: 4upx;
				font-size: 18upx;
				font-weight: 400;
				color: rgba(191, 54, 39, 1);
				line-height: 42upx;
			}

			

			

			.person {
				flex: 0 0 34%;
			}

			.title {
				margin-bottom: 20upx;
			}
			.checkW {
				flex: 0 0 7%;
				align-items: center;
				display: flex;
			}
			
			.rightCheck {
				flex: 0 0 93%;
				display: flex;
				align-items: center;
				position: relative;
			
			}
		}
	}


	.itemType1 {
		.rightCheck {
			position: relative;

			.checkW {
				padding: 20upx;
				position: absolute;
				top: 0;
				right: 0;
				z-index: 999;

				.icon {
					margin-right: 0;
				}
			}
		}
		.price{
			margin-top: 8upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.leftsider{
				flex: 0 0 100%;
				display: flex;
				align-items: center;
				.oriP{
					font-size: 20upx;
					font-weight: 400;
				}
			}
		}
		.detail .title{
			text-indent: 0;
		}
		.bottom{
			display: flex;
			align-items: center;
			margin-top: 8upx;
			.icon{
				width: 30upx;
				height: 30upx;
				margin-right: 18upx;
			}
			.personTpe1{
				font-size: 24upx;
				color: #999999;
				line-height: 36upx;
				
			}
		}
		.content .savingP{
			padding-top: 0;
			
		}
		.content .leftsider{
			flex: 0 0 100%;
		}
		.type1 .lefsider{
			    flex: 0 0 100%;
		}
	}

	.checkW {

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
	.itemType2{
		.image-wrapper{
			    box-shadow: 0 2upx 5upx 0upx rgba(212, 212, 212, 0.35);
		}
		.savingP .lefsider2{
			flex: 0 0 100%;
		}
	}
	.spellGroup{
		width: 30upx;
		height: 30upx;
		background:url(../static/cashBonus/icon-pin.png) no-repeat;
		background-size: 100% 100%;
		margin-right: 6upx;
	}
	.btnJdPay{
		width: 145upx;
		height: 42upx;
		background: url(../static/index/freeToBuy/btn-jdPay.png) no-repeat;
		background-size: 100% 100%;
	}
	.btnJdPay1{
		width: 74upx;
		height: 94upx;
		position: absolute;
		right: 90upx;
		top: 118upx;
		// border: 1px solid red;
	}
	.store{
		display: flex;
		align-items: center;
		font-size:22upx;
		color:rgba(153,153,153,1);
		margin-top:14upx;
		.byself{
			// font-size:18upx;
			// color:rgba(255,255,255,1);
			// padding: 4upx 10upx;
			// background:rgba(255,45,44,1);
			margin-right: 12upx;
		}
		.person{
			margin-left: auto;
		}
	}
	.byself{
		width: 54upx;
		height: 24upx;
		background: url(../static/cashBonus/zutuan.png) no-repeat;
		background-size: 100% 100%;
		margin-right: 12upx;
	}
	.personTpe2{
		margin-left: auto;
	}
		
	.storeName{
		font-size:22upx;
		flex:40%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color:rgba(153,153,153,1);
	}
	.storeName1{
		flex:30%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.titleJd{
		    text-indent: 40upx !important;
	}
	.taobao-goods{
		border-radius: 24upx !important;
		padding-bottom: 0 !important;
		img{
			border-radius: 10upx 0 0 10upx !important;
		}
	}
	.taobao-goods .content{
		height: 240upx;
	}
</style>
