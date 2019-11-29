<template>
	<view class="changeType">
		<view class='leftsider'>
			<text  >全部分类</text>
			<!-- <text @click="toggle" :class='upOrDown?"icon-up":"icon-down"'></text> -->
		</view>
		<view class='rightsider' v-if='isChange' @click='change()'>
			<view class='icon-change'></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				upOrDown:false

			};
		},
		methods: {
			change(){
				this.$emit("changeType")
			}
		},
		props: {
			value: {
				type: String,
				default: ""
			},
			isChange:{
				type: Boolean,
				default: true
			}
			
		},
	}
</script>

<style lang='scss'>
	.changeType{
		@include allCenter();
		padding:35upx 30upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.leftsider{
			flex: 0 0 80%;
			display: flex;
			align-items: center;
			font-size:28upx;
			font-weight:bold;
			color:rgba(51,51,51,1);
			text-align: left;
			.icon-down{
				width:12upx;
				height:12upx;
				background:url(/static/my/icon-down.png) no-repeat;
				background-size: 100%;
				margin-left: 18upx;
			}
			.icon-up{
				width:12upx;
				height:12upx;
				background:url(/static/my/icon-up.png) no-repeat;
				background-size: 100%;
				margin-left: 18upx;
			}
		}
		.rightsider{
			flex: 0 0 20%;
			display: flex;
			align-items: center;
			flex-direction: row-reverse;
			justify-items: right;
			.icon-change{
				width:30upx;
				height:30upx;
				background:url(/static/my/icon-change.png) no-repeat;
				background-size: 100%;
			}
		}
		
	}
</style>
