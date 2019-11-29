<template>
	<view class='contactUs'>
		<img :src="usData.qrCode" alt="">
		<view class='title'>{{usData.remark}}</view>
		<view class='list'>
			<view class='item'>
				<view class='item-t'>客服电话：</view>
				<view class='item-v item-blue'><a :href="tel">{{usData.telephone}}</a></view>
			</view>
			<view class='item'>
				<view class='item-t'>客服微信：</view>
				<view class='item-v'>{{wxCode}}</view>
				<view class='btn btn-copy' 
					v-clipboard:copy="wxCode"
					  v-clipboard:success="onCopy"
					  v-clipboard:error="onError">复制</view>
			</view>
		</view>
		<view class='title bottom'>人工服务时间：工作日9：00-24：00</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				usData:'',
				tel:'',
				wxCode:''
			}
		},
		onLoad(){
			this.init();
		},
		methods: {
			async init(){
				let res= await this.$api.getContactUs();
				this.usData=res.data;
				this.tel=`tel:${this.usData.telephone}`
				this.wxCode = this.$commonLogic.randomWX(this.usData.qq) 
			},
			onCopy(){
				this.$toast("复制成功");
			},
			onError(){
			  this.$toast("复制失败");
			}
		}
	}
</script>

<style lang='scss'>
	.contactUs{
		margin: 0 auto;
		img{
			width:210upx;
			height:210upx;
			margin: 84upx auto 0;
		}
		.title{
			font-size:24upx;
			color:rgba(153,153,153,1);
			margin-bottom: 70upx;
			text-align: center;
		}
		.item{
			display: flex;
			align-items: center;
			line-height: 70upx;
			margin:0 auto;
			font-size:24upx;
			font-weight:bold;
			color:rgba(51,51,51,1);
			justify-content: center;
			.item-blue{
				a{
					color:#4B93FF;
					text-decoration: underline;
				}
			}
			.btn-copy{
				width:60upx;
				height:36upx;
				text-align: center;
				line-height: 36upx;
				background:rgba(255,255,255,1);
				border:2upx solid rgba(153, 153, 153, 1);
				border-radius:10upx;
				font-size:20upx;
				color:rgba(153,153,153,1);
				margin-left: 20upx;
				position: relative;
			}
			
		}
		.bottom{
			margin-top: 50upx;
		}
	}
	
</style>
