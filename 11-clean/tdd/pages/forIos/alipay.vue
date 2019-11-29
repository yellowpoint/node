<template>
	<view class='alipay'>
		<img src="../../static/forIos/bg.jpg" alt="">
		<view class='btn btn-copy'  v-clipboard:copy="tMCode" v-clipboard:success="onCopy" v-clipboard:error="onError1"></view>
		<view class='btn btn-jump'  @click='jump'><a href="alipays://platformapi/startApp"></a></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tMCode:'587731010'
			}
		},
		onLoad(){
			
		},
		methods: {
			onCopy() {
				this.$toast("复制口令成功");
			},
			onError1: function(e) {
				this.$toast("复制口令失败，请稍后再试");
			},
			jump(){
				window.location.href = ''
			}
		}
	}
</script>

<style scoped lang='scss'>
	.alipay{
		position: absolute;
		top: 0;
		bottom: 0;
		background-color: #0185e7
	}
	.btn{
		position: absolute;
		top: 380upx;
		left: 120upx;
		/* border: 1px solid blue; */
		width: 260upx;
		height: 100upx;
	}
	.btn-jump{
		left: 380upx;
		a{
			width: 100%;
			height: 100%;
			display: block;
		}
	}

</style>

