<template>
	<view class="iwant">
		
		<view class='header' @click='toggle'>
			每天半小时，财富滚滚来 联系导师获得一对一指导
			<view class='btn btn-teacher'>微信导师</view>
		</view>
		<VScroll>
			<view v-for="(item, index) in wantData.detailsPictureLink" :key='index'>
				<img class='item' v-if='index!=1' :key="index" :src="item.imageUrl">
			</view>
		</VScroll>
		<view class='pop' v-if='isPop'>
			<view class='pop-mask' @click='toggle'></view>
			<view class='pop-main'>
				<img src="/static/iwant/pop.png" alt="">
				<view class='btn btn-close' @click='toggle'></view>
				<view class='btn btn-copy' v-clipboard:copy="copyData" v-clipboard:success="onCopy" v-clipboard:error="onError" >
				</view>
			</view>
		</view>
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				wantData: '',
				isPop: false,
				copyData:''
			}
		},
		onLoad(options) { //跳转带参
			this.init();
		},
		methods: {
			async init() {
				let res = await this.$api.getIWantToMake();
				this.wantData = res.data;
				this.copyData = this.$commonLogic.randomWX(res.data.customerServiceLink.configVal)
			},
			toggle() {
				this.isPop = !this.isPop;
			},
			onCopy(){
				this.$toast("复制成功")
				// this.isPop = !this.isPop;
				setTimeout(()=>{
						window.open("weixin://");
				},700)
			
			},
			onError(){
				this.$toast("复制失败")
			}
		}
	}
</script>

<style lang="scss">
	.VScroll{
		top: 88upx;
		bottom: 0;
	}
	
	.iwant {
		padding-top: 88upx;

		.item {
			width: 100%;
			display: block;
			height: 100%;
		}
	}

	.header {
		width: 100%;
		height: 88upx;
		background: rgba(255, 78, 0, 1);
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		color: #fff;
		padding:0 20upx;
		z-index: 3;
		font-size: 24upx;
		.btn-teacher {
			padding: 14upx 26upx;
			background: linear-gradient(0deg, rgba(170, 36, 255, 1), rgba(90, 58, 255, 1));
			box-shadow: 0px 2upx 0upx 0upx rgba(119, 33, 199, 1), 0upx 2upx 0upx 0upx rgba(215, 255, 205, 0.35);
			border-radius: 28upx;
			font-size: 24upx;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
			position: absolute;
			top: 13upx;
			right: 20upx;
		}
	}

	.pop {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 999;

		.pop-mask {
			width: 100%;
			height: 100%;
			background: #000;
			opacity: .3;
		}

		.pop-main {
			position: absolute;
			top: 200upx;

			.btn-close {
				position: absolute;
				bottom: -20upx;
				width: 120upx;
				height: 120upx;
				border-radius: 80upx;
				left: 50%;
				margin-left: -60upx;
			}

			.btn-copy {
				position: absolute;
				bottom: 160upx;
				width: 600upx;
				height: 120upx;
				left: 50%;
				margin-left: -300upx;
			}
		}
	}
</style>
