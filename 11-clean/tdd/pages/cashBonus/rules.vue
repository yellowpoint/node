<template><!-- 规则-->
	<view class="rules" :class='[!type?"rules":"rules rules1"]'>
		<view class='header' @click="goback" v-if='!type'>
			<view class='goback'><view class='icon'></view></view>
			
			天天领现金
		</view>
		<view class='item'>
			<view class='title'>活动规则:</view>
			<!-- <view class='title title1'>1、什么是积分</view> -->
			<view class='detail'>1.本次活动仅限普通用户和VIP用户参与</view>
			<view class='detail'>2.活动期间一个设备每24小时可瓜分一次随机红包;</view>
			<view class='detail'>3.已领取的红包有效期为24小时,有效期内拆完所有红包,即可全额提现;</view>
			<view class='detail'>4.本活动前后共6个步骤,分为3次分享和3次邀请新用户,用户需要按照所有活动步骤依次完成才算有效;</view>
			<view class='detail'>5.新用户定义:需要同时满足新设备和新注册账号。活动中新用户需要在红包有效期内通过活动链接登陆APP才算完成邀请新用户;</view>
			<view class='detail'>6.平台每日发放金额有限。如当日红包金额发放完,则不再继续发放,可次日再来领取;</view>
			<view class='detail'>7.拆完可提现的红包,可在<text class='tip'>【我的】-【现金红包】</text>账户中提现和查看;</view>
 
<view class='detail'>8.用户需要按照活动步骤来完成拆红包,不得用任何不正当手段或舞弊方式参与活动。一经发现,平台有权收回发放的红包并保留追究该用户责任的权利。</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:''
			}
		},
		onLoad(options) {
			this.type=options.type;
		},
		methods: {
			goback(){
				uni.navigateBack();
			}
		}
	}
</script>

<style lang='scss'>
	.rules{
		padding: 158upx 30upx;
		.title{
			font-size:32upx;
			font-weight:700;
			color:rgba(40,40,40,1);
			line-height: 1.5;
			margin-bottom: 20upx;
		}
		.title1{
			font-size:28upx;
			margin-bottom: 15upx;
			line-height: 1.5;
			padding:0 10upx;
		}
		.detail{
			font-size:26upx;
			color:#2a2a2a;
			line-height: 1.5;
			/* text-indent: 48upx; */
			padding:6upx 10upx;
		}
	}
	.tip{
		font-weight: 700;
	}
	.header{
		width: 100%;
		height: 88upx;
		background: #bf3627;
		position: fixed;
		top: 0;
		left: 0;
		font-size: 32upx;
		color: #fff;
		text-align: center;
		line-height: 88upx;
		.goback{
			position: absolute;
			left: 0;
			top:0;
			padding:30upx 27upx;
		}
		.icon{
			width:18upx;
			height: 34upx;
			background: url(../../static/common/arrow.png) no-repeat;
			background-size: 100% 100%;
		}
	}
	.rules1{
		padding-top:40upx ;
	}
</style>
