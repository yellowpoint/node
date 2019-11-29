<!-- 公共的手机验证码 -->
<template>
	<view class="VPay" >
		<view class='title'>提现到</view>
		<view class="item b-t" >
			<image class="icon" src="/static/earning/icon-alipay.png"></image>
			<view class='tips' v-html="alipayAccount?alipayAccount:'您暂未绑定支付宝'"></view>
			<view class='bind' @click='bindAlipay' v-html="alipayAccount?'更换':'绑定'"></view>
			<radio value='alipay' @click='radioChange' :checked="checkV==1" class='choose' />
		</view>
		
	</view>

</template>

<script>
	export default {
		data() {
			return {
				checkV:1,
				list:[{
					
				},{
					
				}]
				
			}
		},
		props: {
			alipayAccount: {
				type: String
			},
		},
		mounted() {
		// this.changeImgCode()

		},
		methods: {
			radioChange(e){
				console.dir(e)
				
			},
			bindAlipay(){
				uni.navigateTo({
					url: `/pages/earning/binAlipay`
				})
			}
			
		},
		watch: {
		},
	}
</script>

<style lang="scss">
	.title{
		font-size:28upx;
		font-weight:700;
		color:rgba(51,51,51,1);
		margin: 25upx 48upx 15upx;
	}
	.item{
		display: flex;
		align-items: center;
		padding: 30upx 48upx 30upx 48upx;
		.icon{
			width:170upx;
			height: 60upx;
		}
		.tips{
			width: 280upx;
			font-size:28upx;
			font-weight:400;
			color:rgba(153,153,153,1);
			margin-left: 54upx;
		}
		.bind{
			font-size:28upx;
			color:rgba(84,160,255,1);
			padding:0 0 0 29upx;
			align-items: right;
		}
		.choose{
			margin-left: auto;
		}
	}
</style>
