<template><!-- 双十一活动页面 -->
	<view class='doubleT'>
		<image class='bg' :src='data.bigImageUrl'></image>
		<view class='btn' @click="jump">
			<image :src='data.otherImageUrl' class='btn-tra'></image>
		</view>
		<img v-if='type!="ios"' class='mask' src="/static/forIos/mask.png" alt="">
	</view>
</template>

<script>
	import { sending } from '@/common/bridge'
	export default {
		data() {
			return {
				id:'',
				data:'',
				type:'',
				code:''
			}
		},
		onLoad(options){
			this.id=options.id;
			this.type=options.type;
			this.inint();
			
		},
		methods: {
			async inint(){
				let res = await this.$api.dobolT({
					id:this.id
				});
				this.data=res.data;
				this.code=eval('(' + res.data.title + ')');
			
			},
			jump(){
				if(this.type=='ios'){
					let obj={
						type:3,
						form:1,//1.taobao,2.weixin 
						code:this.code.ios
					}
					sending(obj)
					return
				}
				let that=this;
				this.$copyText(this.code.h5).then(function(){
					that.$toast('复制成功')
					setTimeout(function() {
						window.open('taobao://')
					}, 300);
				},function(){
					that.$toast('复制失败，请稍后重试')
				})
			}
		}
	}
</script>

<style scoped lang='scss'>
	.doubleT{
		position:absolute;
		left:0;
		top:0;
		right:0;
		overflow: hidden;
		bottom:0;
		.bg{
			width: 100%;
			height: 100%;
		}
		.btn{
			position: absolute;
			bottom: 30%;
			left:0;
			width:100%;
			height: 140upx;
			padding: 20upx 0;
			text-align: center;
		}
		.btn-tra{
			width: 306upx;
			height: 86upx;
			animation: free_down 2s linear alternate infinite;
			-webkit-animation: free_down 2s linear alternate infinite;
			   
		}
		
		@keyframes free_down{
			0%{
				transform: scale(1);
			}
			25%{
				transform: scale(1.3);
			}
			50%{
				transform: scale(1);
			}
			75%{
				transform: scale(1.3);
			}
		}
		
		@-webkit-keyframes free_down{
			0%{
				transform: scale(1);
			}
			25%{
				transform: scale(1.3);
			}
			50%{
				transform: scale(1);
			}
			75%{
				transform: scale(1.3);
			}
		}
	}
	.mask{
		position: fixed;
		bottom: 20%;
		left: 0;
		width: 100%;
	}

</style>

