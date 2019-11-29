<template>
	<!-- 底部操作菜单 -->
	<view>
		<!-- 0元购的底部 -->
		<view class="payFooter zero" v-if="isZero">
			<view class='leftsider'>
				<view class="l-left">下单补贴{{productData.zkFinalPrice}}元</view>
				<view class="l-right">￥{{productData.zkFinalPrice}}</view>
			</view>
				
			<view class="btn-groups" @click="jumpTB">
				立即购买
			</view>
		</view>
		<!-- 普通的底部 -->
		<view class="payFooter" v-if="!isZero">
			<view class='leftsider'>
				<view class="save" :class="{active: collect}" @click="toFavorite">
					<view class="icon-collect"></view>
					<text>收藏</text>
				</view>
				<view class='share'  @click="share">
					<!-- <text class='icon-share'></text> -->
					<text>领取{{productData.returnMoney}}元</text>
				</view>
			</view>
				
			<view class="btn-groups" @click="jumpTB">
				<button class="btn btn-left">￥{{productData.zkFinalPrice}}</button>
				<view class='icon-vert'></view>
				<button class="btn btn-right">购物省{{salePrice}}元</button>
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
			};
		},
	 onLoad(options){
		
		},
		computed:{
			salePrice(){
				let price=parseFloat(this.productData.returnMoney)+parseFloat(this.productData.couponInfoMoney)
				return price.toFixed(2)
			}
		},
		methods:{
			//收藏
			toFavorite(){
				
				this.$emit("changeCollect");
			},
			share(){
				this.$emit('share')
			},
			jumpTB(){
				this.$emit('jumpTB')
			},
			
			 

		},
		props:{
			numId:{
				type:String,
				default:""
			},
			collect:{
				type:Boolean,
				default:false
			},
			productData:{
				type:Object,
				default:function(){
					return {}
				}
			},
			isZero:{
				type:Number,
				default:0
			},
		}

	}
</script>

<style lang='scss'>
	/* 底部操作菜单 */
	.payFooter{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
		align-items: center;
		background-color: #fff;
		height: 98upx;
		padding: 0 24upx 0 46upx;
		z-index:99;
		.leftsider{
			flex:0 0 44%;
			text-align: left;
			display: flex;
			align-items: center;
			.icon-collect{
				width: 48upx;
				height: 48upx;
				background: url(/static/index/icon-collect.png) no-repeat #e1e1e1;
				background-size: 100%;
			}
			.share{
				padding:20upx;	
				background:rgba(255,166,62,1);
				border-radius:36upx;
				font-size:28upx;
				font-weight:500;
				color:rgba(255,255,255,1);
				margin-left: 38upx;
				display: flex;
				align-items: center;
				height: 72upx;
				.icon-share{
					width: 34upx;
					height: 34upx;
					background: url(/static/index/icon-share.png) no-repeat;
					background-size: 100%;
					margin-right: 16upx;
					display: inline-block;
				}
				.icon-share::before{
					content:'';
				}
			}
			.save.active .icon-collect{
				background: url(/static/index/icon-collect.png) no-repeat rgba(255,166,62,1);
				background-size: 100%;
			}
		}
		.btn-groups{
			flex:0 0 56%;
			text-align: right;
			background:rgba(191,54,39,1);
			display: flex;
			align-items: center;
			border-radius: 36upx;
			height: 72upx;
			.btn{
				background:transparent;
				font-size:$font-base;
				font-weight:500;
				color:#fff;
				padding:0 14upx;
			}
			.btn::after{
				content:'';
				border: 0;
			}
			.icon-vert{
				width:1px;
				height:42upx;
				background:rgba(255,255,255,1);
			}
		}
		&.zero{
			.l-left{
				@include allCenter;
				width: 254upx;
				height: 42upx;
				border-right: 1px solid #C9C9C9;
				font-size:28upx;
				font-weight:500;
				color:rgba(102,102,102,1);
			}
			.l-right{
				@include allCenter;
				width: 190upx;
				font-size:30upx;
				font-weight:bold;
				color:rgba(191,54,39,1);
			}
			.btn-groups{
				@include allCenter;
				flex: 0 1 auto;
				width:240upx;
				height:70upx;
				margin-left: auto;
				border-radius:35upx;
				font-size:28upx;
				font-weight:500;
				color:rgba(223,223,223,1);
			}
		}
	}
	
</style>
