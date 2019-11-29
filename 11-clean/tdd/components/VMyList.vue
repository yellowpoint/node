<!--我的页面组件-->
<template>
	<view class='myList'>
		<view class='item' v-for='(item,index) in list' :key='index' @click='choose(item.id)'>
			<view class='leftsider'>
				<image class='icon' v-if='item.imgSrc' :src="item.imgSrc" alt=""></image>
				<text class='title'>{{item.title}}</text>
			</view>
			<view class='rightsider'>
				<view class='icon-right'>
				</view>
				<view class='tip'>{{item.tip}}</view>
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
			list: {
				type: Array,
				default: ()=>{
					return []
				}
			}
		},
		methods: {
			choose(id){
				this.$emit("choose",id);
			}
		}
	}
</script>

<style  lang='scss'>
	.item{
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 35upx 0 41upx;
		height: 98upx;
		.leftsider{
			flex: 0 0 50%;
			text-align: left;
			display: flex;
			align-items: center;
			.icon{
				width: 36upx;
				height: 36upx;
				margin-right:38upx;
			}
			.title{
				font-size:28upx;
				font-weight:500;
				color:rgba(51,51,51,1);
			}
		}
		.rightsider{
			flex: 0 0 50%;
			text-align: right;
			display: flex;
			align-items: center;
			justify-items: right;
			flex-direction:row-reverse;
			.icon-right{
				width: 18upx;
				height: 32upx;
				background:url(/static/my/icon-right.png) no-repeat;
				background-size: 100%;
				margin-left: 18upx;
			}
			.tip{
				text-align: right;
			}
		}
	}
	.item::after{
		@include border-1px(rgba(242,242,242,1),bottom);
	}
	.myList{
		background-color: #fff;
		}
</style>
