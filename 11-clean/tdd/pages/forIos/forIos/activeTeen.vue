<template><!-- 双十一邀请好友页面  -->
	<view class='doubleTInvite'>
		<image class='bg' src="/static/forIos/doubltInvite-bg1.jpg" mode=""></image>
		<view class='btn btn-invite' @click='invite'></view>
		<view class='btn btn-copy' @click='copy'></view>
	</view>
</template>

<script>
	import { sending } from '@/common/bridge'
	export default {
		data() {
			return {
				type:''
			}
		},
		onLoad(options){
			this.type=options.type;
		},
		methods: {
			invite(){
				let obj={
					type:2
				}
				if(this.type=='android'){
					jsActivity.onCall(JSON.stringify(obj))
					return
				}
				sending(obj)
			},
			copy(){
				let obj={
					type:3,
					form:2,//1.taobao,2.weixin 
					code:'taoduoduo269'
				}
				if(this.type=='android'){
					jsActivity.onCall(JSON.stringify(obj))
					return
				}
				sending(obj)
			}
			
		}
	}
</script>

<style scoped lang='scss'>
	.doubleTInvite{
		position: fixed;
		top:0 ;
		left: 0;
		right: 0;
		bottom: 0;
		.bg{
			width: 100%;
			height: 100%;
		}
		.btn{
			/* border: 1px solid red; */
			position: absolute;
			width: 100%;
			height: 140upx;
		}
		.btn-invite{
			top: 36%;
		}
		.btn-copy{
			bottom: 0;
		}
	}

</style>

