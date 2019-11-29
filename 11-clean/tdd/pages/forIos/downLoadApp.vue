<template>
	<view class='downLoadApp'>
		<img src="../../static/forIos/dla_t.png" class='title' alt="">
		<img src="../../static/forIos/dla_bg.png" class='bg' alt="">
		<view class='btn btn-more' @click="jump"></view>
		<view class='btn btn-download' @click='download'>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				
			}
		},
		methods: {
			jump(){
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			download(){
				let url='https://a.app.qq.com/o/simple.jsp?pkgname=com.wcl.tdd'
				window.open(url)
				
			}
		}
	}
</script>

<style lang="scss">
	.downLoadApp{
		position: relative;
		.title{
			position: fixed;
			top: 0;
			width: 100%;
		}
		.bg{
			margin-top: 84upx;
		}
		.btn-download{
			position: fixed;
			width: 184upx;
			height: 80upx;
			right: 14upx;
			top: 2upx;
		}
	}
	.btn{
		// border: 1px solid blue;
	}
	.btn-more{
		width: 350upx;
		height: 100upx;
		position: fixed;
		left: 200upx;
		bottom: 36upx;
		background:url(../../static/forIos/dla_btn.png) no-repeat;
		background-size: 100%;
	}
	
</style>
