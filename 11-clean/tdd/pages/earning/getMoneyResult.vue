<!-- 提现结果页面 -->
<template>
	<view class="getMoneyResult">
		<view class="getMoneyResult-title">发起提现申请成功！</view>
		<image class="getMoneyResult-img" :src="dataBox.imageUrl||'/static/earning/qrcode.jpg'"></image>
		<view class="getMoneyResult-tips">{{dataBox.configVal ||'微信搜索添加 省钱达人'}}</br></view>
		<!-- <navigator class="getMoneyResult-btn" url="/pages/earning/earning">确定</navigator> -->
		<view class="getMoneyResult-btn" @click="jump">确定</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataBox: {},
				type:1
			}
		},
		onLoad(options) {
			this.init()
			this.type=options.type?options.type:1;
		},
		methods: {
			async init() {
				let res = (await this.$api.getByType({
					configEnum: 'WITHDRAW_QR_CODE'
				})).data[0]
				this.dataBox = res
			},
			jump(){
				if(this.type==2){
					uni.switchTab({
						url:'/pages/user/user'
					})
				}else{
					uni.navigateTo({
						url:'/pages/earning/earning'
					})
					
				}
				
			}
		}
	}
</script>

<style lang="scss">
	.getMoneyResult {
		text-align: center;
		// border-top: 20upx solid #f5f5f5;

		.getMoneyResult-title {
			font-size: 34upx;
			margin-top: 80upx;
		}

		.getMoneyResult-img {
			width: 210upx;
			height: 210upx;
			margin: 40upx auto;
		}

		.getMoneyResult-tips {
			font-size: 28upx;
			color: #666;
		}

		.getMoneyResult-btn {
			@include allCenter;
			@include active;
			width: 680upx;
			height: 98upx;
			margin: 60upx auto;
			background: #54A0FF;
			border-radius: 10upx;
			font-size: 34upx;
			color: #fff;
			overflow: hidden;

		}


	}
</style>
