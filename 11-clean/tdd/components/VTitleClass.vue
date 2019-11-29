<template>
	<view class="VTitleClass">
		<view class="pic-desc">
			<view class="d-header">
				<view class='item'></view>
				<text>{{value}}</text>
				<view></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {},
		props: {
			value: {
				type: String,
				default: ""
			}
		},
	}
</script>

<style lang='scss'>
	/*  详情 */
	.pic-desc {
		background: #fff;

		.d-header {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			position: relative;
			padding:40upx 0 40upx;

			text {
				padding: 0 20upx;
				background: #fff;
				position: relative;
				/* z-index: 1; */
				font-size:30upx;
				font-weight:bold;
				color:rgba(51,51,51,1);
			}

			.item:after {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 500upx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc;
			}
			.item{
				
			}
		}
	}
</style>
