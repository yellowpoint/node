<template>
	<!-- 黑五预售活动 -->
	<view class="blackFivePrepaid" :style="{'backgroundColor':blackBase.backgroundColor}">
		<img :src="blackBase.bigImageUrl" alt="">
		<view class='content'>
			<view class='goZ' @click="go">去会场GO ></view>
			<view class='middel'>
				<view class='title'>{{blackBase.configVal}}</view>
				<view class='btn btn-copy' @click='copy'>复制链接赚钱</view>
				<view class='share'>分享好友，好友下单，你赚钱</view>
			</view>
			<!-- <view class='bottom'>
				<view class='detail'>在【发圈】-【宣传素材】中可下载本次活动素材</view>
				<view class='circle'></view>
			</view> -->
		</view>
		
	</view>
</template>

<script>
	import { sending } from '@/common/bridge'
	export default {
		data() {
			return {
				id:'',
				type:'',
				blackBase:'',
				userId:"",
				url:''
			}
		},
		onLoad(e) {
			this.id=e.id;
			this.type=e.type;
			this.userId=e.userId;
			this.inint();

		},
		methods: {
			async inint() {
				let res = await this.$api.dobolT({
					id:this.id
				});
				this.blackBase=res.data;

			},
			go(){
				let that=this;
				this.changcode().then(function(){
					let obj={//去主会场
						type:'9',
						terraceType:that.blackBase.terraceType,
						url:that.url,
						title:that.blackBase.configVal
					}
					if(that.type=='android'){
						jsActivity.onCall(JSON.stringify(obj))
						return
					}
					sending(obj)
				})
				
			},
			async copy(){
				let that=this;
				 this.changcode().then(function(){
					 let obj={//复制短
					 	type:'10',
					 	terraceType:that.blackBase.terraceType,
					 	url:that.url,
					 	title:that.blackBase.configVal
					 }
					 if(that.type=='android'){
					 	jsActivity.onCall(JSON.stringify(obj))
					 	return
					 }
					 sending(obj)
				 })
				
				
			},
			 changcode(){
				return new Promise(async (resolve,resject)=>{
					if(!this.userId){
						this.$toast('用户id为空');
						return
					}
					if(this.blackBase.terraceType=='TAOBAO'){//taobao转链
						let res = await this.$api.createActivityLink({
							sceneId:this.blackBase.numIid,
							userId:this.userId
						});
						
						let res1 = await this.$api.createTaoKouling({
							text:this.blackBase.configName,
							url:res.data
						});
						this.url=res1.data;
						resolve(res1.data)
						
					}else if(this.blackBase.terraceType=='PINGDUODUO'){
							let res;
						if(!this.blackBase.numIid){
							 res = await this.$api.genCmsPromUrl({
								userId:this.userId
							});
							this.url=res.data;
							resolve(res.data)
							
						}else{
							res = await this.$api.genThemePromUrl({
								userId:this.userId,
								themeId:this.blackBase.numIid
							});
							this.url=this.type=='ios'?res.data.mobileShortUrl:res.data.mobileUrl							
							resolve(res.data)
						}
						
					}
					
				})
				
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
	.blackFivePrepaid{
		/* background-color: red; */
		min-height: 100%;
	}
	.content{
		padding: 27upx 36upx;
		.goZ{
			width:360upx;
			height:88upx;
			background:linear-gradient(90deg,rgba(254,242,216,1),rgba(249,205,100,1));
			border-radius:43upx;
			font-size:36upx;
			font-weight:bold;
			color:rgba(236,56,42,1);
			text-align: center;
			line-height: 88upx;
			margin: 0 auto;
		}
		.middel{
			padding: 78upx 60upx 34upx;
			font-size:28upx;
			background:rgba(255,255,255,1);
			text-align: center;
			margin: 66upx 0 32upx;
			border-radius:10upx;
			.title{
				font-size:28upx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(51,51,51,1);
				line-height:42upx;
				text-align: center;
			}
			.btn-copy{
				width:430upx;
				height:88upx;
				background:linear-gradient(90deg,rgba(251,101,128,1),rgba(252,45,53,1));
				border-radius:44upx;
				font-size:36upx;
				font-weight:bold;
				color:rgba(255,255,255,1);
				line-height:88upx;
				margin: 40upx auto 20upx;
			}
			.share{
				font-size:26upx;
				color:rgba(223,51,57,1);
				
			}
		}
		.bottom{
			width: 100%;
			font-size:26upx;
			color:rgba(88,53,2,1);
			position: relative;
			padding: 9upx;
			background:rgba(255,255,255,1);
			border-radius:30upx;
			.circle{
				width:72upx;
				height:72upx;
				background:rgba(251,211,123,1);
				border-radius:50%;
				position: absolute;
				top: -12upx;
				left: -6upx;
			}
			.detail{
				text-indent: 72upx;
			}
		}
		
		
	}
</style>
