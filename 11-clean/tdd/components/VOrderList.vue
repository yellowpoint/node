	<!-- 订单列表 -->
<template>
	<view class='orderList'>
	
		<view class='order-item' v-for='(item,index) in tabItem' :key='index'>
			<view class='top'>
				<text class='orderNum'>订单编号：{{item.tradeId }}</text>
				<text class='isPay'>{{item.tkStatusVal}}</text>
			</view>
			<view class='middle'>
				<view class='leftsider'>
					<!-- <view class='comeFrom'></view> -->
					<view class='comeFrom icon-taobao' v-if='item.orderType=="淘宝"'></view>
					<view class='comeFrom icon-tianmao' v-if='item.orderType=="天猫"'></view>
					<view class='comeFrom icon-pidd' v-if='item.orderType=="拼多多"'></view>
					<view class='comeFrom icon-jd' v-if='item.orderType=="京东"'></view>
					<view class="title">{{item.itemTitle}}</view>
				</view>
				<view class='rightsider'>
					<view class='originPrice'>￥{{item.price}}</view>
					<view class='num'>x1</view>
				</view>
			</view>
			<view class='middle2 comH'>
				<view class='detail'>订单将在确认收货之后结算</view>
				<view class='price'>
					<text>共1件商品</text>
					<text class='all'>合计：</text>
				</view>
				<view class='money'>￥{{item.alipayTotalPrice }}</view>
			</view>
			<view class='bottom comH' >
				<view class='detail'></view>
				<view class='price'>
					<text class='icon-isPay' v-if='item.commissionStatus==1'>待结算</text>
					<text class='icon-isPay payDown' v-if='item.commissionStatus==2'>已结算</text>
					<text class='icon-isPay payDown1' v-if='item.commissionStatus==3'>已取消</text>
					<text class='all'>佣金：</text>
				</view>
				<view class='money'>￥{{item.totalCommissionFee }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
		,props:{
			tabItem:{
				type:Array,
				default:function(){
					return []
				}
			}
		}
	}
</script>

<style lang="scss">
.order-item{
	height:320upx;
	background:rgba(255,255,255,1);
	border-radius:10upx;
	margin: 24upx 24upx;
	padding:0 0 30upx;
	.top{
		font-size:$font-sm;
		color:rgba(51,51,51,1);
		display: flex;
		align-items: center;
		position: relative;
		line-height: 58upx;
		padding:15upx 24upx;
		.orderNum{
			flex: 0 0 80%;
			text-align: left;
		}
		.isPay{
			flex: 0 0 20%;
			text-align: right;
			color:rgba(255,115,13,1);
		}
		&::after{
			 @include border-1px(rgba(242,242,242,1),bottom);
		}
	}
	.middle{
			display: flex;
			align-items: center;
			padding:0 24upx;
			margin-bottom: 20upx;
		.leftsider{
			position: relative;
			flex:0 0 80%;
			line-height: 45upx;
			.title {
				font-size:$font-sm;
				color: $font-color-dark;
				font-size:24upx;
				font-weight:500;
				color:rgba(51,51,51,1);
				line-height:36upx;
				 @include ellipsis(2);
				 float: left;
				 margin: 22upx 0 10upx;
				 text-indent: 40upx;
				 height: 68upx;
				 width: 100%;
			}
			.comeFrom{
				width:30upx;
				height: 30upx;
				background: url(/static/index/icon-taobao.png) no-repeat;
				background-size: 100%;
				margin-right: 18upx;
				position: absolute;
				top:24upx;
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
		}
		.rightsider{
			flex:0 0 20%;
			font-size:$font-sm;
			font-weight:400;
			color:rgba(102,102,102,1);
			line-height: 45upx;
			text-align: right;
		}
	}
	.comH{
		display: flex;
		font-size:$font-sm;
		align-items: center;
		padding:0 24upx;
		margin-bottom: 14upx;
		.detail{
			flex:0 0 50%;
			color:rgba(153,153,153,1);
			line-height:42upx;
			text-align: left;
			
		}
		.price{
			flex:0 0 35%;
			color:rgba(51,51,51,1);
			text-align:right;
			.all{
				padding-left: 10upx;
			}
			.icon-isPay{
				text-align: right;
				background:rgba(255,232,230,1);
				padding:4upx 9upx;
				font-size:18upx;
				font-weight:500;
				color:rgba(191,54,39,1);
			}
			.payDown{
					color:rgba(39,191,64,1);
					background:rgba(230,255,234,1);
				}
			.payDown1{
					 color: #ff7f23;
					background: #ffead0;
				}
		}
		.money{
			flex:0 0 15%;
			text-align: right;
			
		}
	}
 
}
	
</style>
