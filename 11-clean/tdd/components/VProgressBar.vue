<template><!-- 现金红包进度条 -->
	<view class="VProgressBar" >
		<view class='progressContent'>
			<!-- <view class='percent' v-if=''>0%</view> -->
			<view class='bar' :style="{width:`${percent}%`}">
				<view class='percent' >{{percent}}%</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				
				
			}
		},
		props: {
			percent: {
				type: Number,
				default:0
			},
		},
		mounted() {

		},
		methods: {
			
		},
		watch: {
		},
		
	}
</script>

<style lang="scss">
	.progressContent{
		height:20upx;
		width: 100%;
		background:rgba(255,255,255,1);
		border-radius:10upx;
		/* margin:34upx 0 52upx; */
		.bar{
			height:21upx;
			background:rgba(255,173,28,1);
			position: absolute;
			left: 0;
			top: 0;
			border-radius:10upx;
			// .percent{
			// 	text-align: right;
			// }
		}
		.percent{
			position: absolute;
			right: -30upx;
			bottom: 36upx;
			width:67upx;
			height:40upx;
			line-height:36upx;
			font-size:24upx;
			color:rgba(185,111,22,1);
			text-align: center;
			background: url(../static/cashBonus/tabar.png) no-repeat;
			background-size: 100% 100%;
		}
	}
</style>
