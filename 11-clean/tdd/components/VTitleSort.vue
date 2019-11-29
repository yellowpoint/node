<template>
	<view class="vTitleSort">
		<view class='item1 item' :class='{"active":tabIndex==0}'>推荐</view>
		<view class='item2 item' :class='{"active":tabIndex==1}'>
			劵后价
			<view class='icon-up icon'></view>
			<view class='icon-down icon'></view>
		</view>
		<view class='item2 item' :class='{"active":tabIndex==2}'>
			销量
			<view class='icon-up icon'></view>
			<view class='icon-down icon'></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex:0
			}
		},
		computed:{
		},
		props: {
			List: {
				type: Array,
				default: ()=>{
					return []
				}
			},
			scale:{
				type: String,
				default: '20%'
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.vTitleSort{
		display: flex;
		align-content: center;
		justify-content: space-around;
		.item{
			font-size:28upx;
			color:rgba(51,51,51,1);
			line-height:42upx;
			text-align: center;
			position: relative;
		}
		.active{
			color:rgba(191,54,39,1);
		}
		.icon{
			width: 12upx;
			height: 12upx;
			position: absolute;
			right:-20upx;
			background-color:#999999;
			background-repeat: no-repeat;
			.active{
				background-color:rgba(191,54,39,1);
			}
		}
		.icon-up{
			background-image: url(/static/index/icon-up.png) ;
			background-size: 100%;
			top: 10upx;
		}
		.icon-down{
			background-image: url(/static/index/icon-down.png);
			background-size: 100%;
			top: 20upx;
		}
		
	}	
	
	
</style>
