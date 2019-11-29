<!-- 底部loading，用于上拉加载 -->
<template>
	<view class="VBottomloading">
		<view v-if="finish" class="lastTips"><i class="left-line"></i>我们是有底线的<i class="right-line"></i></view>
		<view v-else class="infinite-scroll-preloader"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			finish: {
				type: Boolean,
				default: false
			},
		},
		mounted() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.infinite-scroll-preloader {
		width: 36upx;
		height: 96upx;
		overflow: hidden;
		margin: 20upx auto 0;
		background: url("http://file.diy.51app.cn/wp/icoImg/loading.gif") no-repeat;
		background-size: 100%;
	}

	.lastTips {
		width: 100%;
		padding-bottom: 70upx;
		margin: 20upx 0 0;
		color: #a7a5a5;
		text-align: center;
		font-size: 28upx;
	}

	.lastTips i {
		display: inline-block;
		width: 200upx;
		height: 2upx;
		margin: 0 10upx 10upx;
	}

	.lastTips .left-line {
		background: linear-gradient(to right, #d9d9d9, #f0f0f0);
		background: -webkit-linear-gradient(right, #d9d9d9, #f0f0f0);
	}

	.lastTips .right-line {
		background: linear-gradient(to left, #d9d9d9, #f0f0f0);
		background: -webkit-linear-gradient(left, #d9d9d9, #f0f0f0);
	}
</style>
