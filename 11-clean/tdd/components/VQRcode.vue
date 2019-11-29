<template><!-- 链接转二维码-->
	<view class="qrcode" >
		<tki-qrcode cid="qrcode1" 
		 ref="qrcode"
		 :val="val"
		 :size="size"
		 :unit="unit"
		 :background="background"
		 :foreground="foreground" 
		 :pdground="pdground" 
		 :icon="icon" 
		 :iconSize="iconsize" 
		 :lv="lv" 
		 :onval="onval" 
		 :loadMake="loadMake"
		 :usingComponents="true"
		 @result="qrR"
		/>
	</view>

</template>

<script>
	import tkiQrcode from "tki-qrcode"
	export default {
		data() {
			return {
				// size: 268, // 二维码大小
				unit: 'upx', // 单位
				background: '#000000', // 背景色
				foreground: '#ffffff', // 前景色
				pdground: '#ffffff', // 角标色
				icon: '', // 二维码图标
				iconsize: 300, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: true, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '' // 二维码生成后的图片地址或base64
				
			}
		},
		props: {
			size: {
				type: Number,
				default:200
			},
			val:{
				type: String,
				default:""
			}
		},
		mounted() {
			
		},
		methods: {
			qrR(res){
				this.src = res
				// console.log(11,this.src);
			}
		},
		watch: {
		},
		components:{
			tkiQrcode
		}
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
