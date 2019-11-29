<template>
	<!-- 黑五活动 -->
	<view class="blackFive" :style="{'backgroundColor':blackFiveData.backgroundColor}">
		<img v-if='blackFiveData' :src="blackFiveData.topImage" alt="">
		<view class='list' v-if='blackFiveData'> 
			<img v-for="(item,index) in blackFiveData.imageList" :key='index' :src='item.imageUrl' class='item' alt="" @click='jump(item)'>
		</view>
	</view>
</template>

<script>
	import { sending } from '@/common/bridge'
	export default {
		data() {
			return {
				blackFiveData:'',
				type:'',
				channel:""
				
			}
		},
		onLoad(e) {
		
			this.type=e.type;
			this.channel=e.channel;
			console.log(e)
			this.inint();

		},
		methods: {
			async inint() {
				let res = await this.$api.getBlackFridayActivity({
					channel:this.channel||""
				});
				this.blackFiveData=res.data;
			},
			jump(item){
				let obj={
					type:'7',//黑五
					item:item
				}
				if(this.type=='android'){
					
					jsActivity.onBlackFive(JSON.stringify(obj))
					return
				}
				sending(obj)
			}
			
		},
		components: {
			
		}
	}
</script>

<style lang='scss'>
	uni-page-body{
		height: 100%;
	}
	.blackFive{
		min-height: 100%;
	}
	.list{
		padding:0 47upx 40upx;
		.item{
			margin-top: 37upx;
			border-radius:20upx;
		}
	}
</style>
