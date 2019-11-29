<template>
	<view class="channlType">
		<view class='title'>搜索渠道</view>
		<view class='content'>
			<view class='item' v-for="(item,index) in list" :key='index' :class='[item.id==activeIndex?"active":"",index%2==0?"":"even"]' @click='choose(item.id)'>
				<view>{{item.title}}</view>
				<view class='icon'></view>
			
			</view>
			
		</view>
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{
						id:0,
						title:'淘宝',
					},
					{
						id:1,
						title:'拼多多',
					},
					{
						id:2,
						title:'京东',
					}
				],
			activeIndex:0
			};
		},
		onLoad(options){
			this.activeIndex=this.$common.getCookie("searchActiveIndex")||0;
			
		},
		methods:{
			choose(id){
				this.activeIndex=id;
				this.$common.setCookie("searchActiveIndex",id , 30);
				uni.switchTab({
					url: `/pages/search/search`
				})
				
			}
		}
	}
</script>

<style lang='scss'>
	.channlType{
		padding: 24upx;
		.title{
			font-size:28upx;
			font-weight:bold;
			color:rgba(51,51,51,1);
			padding: 35upx 0;
		}
		.content{
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			.item{
				width: 338upx;
				height: 84upx;
				padding: 29upx 29upx 29upx 24upx;
				display: flex;
				align-items: center;
				justify-content:space-between;
				background:rgba(237,237,237,1);
				color:rgba(102,102,102,1);
				margin-bottom: 26upx;
			}
			.active{
				background:rgba(247,226,224,1);
				color:rgba(191,54,39,1);
				.icon{
					width: 32upx;
					height: 22upx;
					background: url(/static/search/icon-right.png) no-repeat;
					background-size: 100%;
				}
			}
			.even{
				margin-left: 26upx;
			}
		}
		
	}
	

</style>
