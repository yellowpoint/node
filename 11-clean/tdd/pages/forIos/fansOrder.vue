<template>
	<view class='fansOrder'>
		<view class='content' >
				<view class='item' v-for='(item,index) in list' :key='index'>
					<img :src="item.imageUrl" alt="">
					<view class='btn-group' v-if='item.numIid&&item.numIid.isShow'>
						<view class='btn btn-jump' v-for='(item1,index1) in item.numIid.arr' :style="{top:''+item1.top+'upx',left:''+item1.left+'upx'}" @click='jump(item.clickUrl)'></view>
					</view>
				</view>
				
		</view>
	</view>
</template>

<script>
	import { sending } from '@/common/bridge'
	import {
		host_iWantUp
	} from '@/common/config'
	export default {
		data() {
			return {
				list:'',
				userId:'',
				type:''
			}
		},
		onLoad(options){
			console.log(22,options);
			this.userId=options.userId;
			this.type=options.type;
			this.init()
			
		},
		methods: {
			async init(){
				let res = await this.$api.getPromotionPageInfo({
					userId:this.userId
				});
				let that=this;
				that.list=res.data.reduce((arr,item,index)=>{
					if(item.numIid){
						item.numIid=that.parsing(item.numIid)
						item.numIid=that.parsing(item.numIid)
					}
					arr.push(item)
					return arr;
				},[])
				console.log(this.list)
				
			},
			parsing(params){
				return JSON.parse(params)
				
			},
			jump(clickUrl){
				if(clickUrl==1){
					let obj={
						type:'2',//立即邀请
					}
					if(this.type=='android'){
						
						jsActivity.onCall(JSON.stringify(obj))
						return
					}
					sending(obj)
				}else if(clickUrl==2){
					//配合ios
					let url=`${host_iWantUp}/pages/forIos/promote?userId=${this.userId}`
					
					if(this.type=='android'){
						url=`http:${url}`
						jsActivity.onProfit(url)
						return
					}
					location.href=url;
				}else if(clickUrl==3){
						let url=`${host_iWantUp}/pages/cashBonus/upGradeDelegat?userId=${this.userId}&type=${this.type}`
						location.href=url;
						
				}
				
			}
			
		}
	}
</script>

<style lang="scss">
	.item{
		position: relative
	}
	.btn-jump{
		// border: 1px solid red;
		width: 750upx;
		height: 100upx;
		position: absolute;
		z-index: 99;
		
	}

</style>
