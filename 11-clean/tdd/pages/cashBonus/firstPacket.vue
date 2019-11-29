<template><!-- 第一次打开红包 -->
	<view class="firstPacket">
		<view v-if='cashPack'>
			<img src="../../static/cashBonus/firstCashBg.png" alt="">
			<view class='all'>今日已送出现金￥{{cashPack.todayAlreadySendAmount }}</view>
			<view class='price'>
				<view class='title'>恭喜获得现金</view>
				<view class='money'>{{cashPack.alreadySendAmount }} <text class='unit'>元</text></view>
			</view>
			<view class='timeOut'>{{time}}后现金将失效</view>
			<view class='btn' @click="share">分享{{cashPack.surplusNumber }}位好友 即可拆开</view>
			<view class='btn-rules' @click="jumpRules"></view>
		</view>
	</view>
</template>

<script>
	import  cashMixins  from './cashMixins'
	export default {
		mixins:[cashMixins],
		data() {
			return {
				cashPack:'',
				userInfo: this.$store.getters.userInfo,
				url:"",
				shareDate:''
			}
		},
		onLoad() {
			let cashPack= this.$common.getCookie('cashPack');
			this.cashPack=cashPack?JSON.parse(cashPack):null
			console.log(this.cashPack)
			
			if(this.cashPack.failureTime){
				let t=Math.floor(this.cashPack.failureTime/1000);
				this.inintTimeOut(t);
			}
			
			this.openPop();
			
		},
		methods: {
			async openPop(){
				let res=await this.$api.getRedPacketShare({
					userId:this.userInfo.id
				});
				this.shareDate=res.data;
			},
			share(){
				let that=this;
				this.url=`${window.location.protocol}//${window.location.host}/pages/cashBonus/invite?userId=${this.userInfo.id}`
				let text=`${this.shareDate.shareTitle}\n${this.shareDate.shareRamrk}\n分享链接:${this.url}`
				this.$copyText(text).then(function(){
					that.$toast('复制分享链接成功')
					that.$api.doDismantledRedPacket({
						userId:that.userInfo.id
					}).then(function(){
						window.open('weixin://')
					});
					
				},function(){
					that.$toast('复制失败，请稍后重试')
				})
				
			}
		}
	}
</script>

<style lang='scss'>
	.firstPacket{
		position: relative;
		text-align:center;
		.all{
			font-size:32upx;
			color:rgba(255,255,255,1);
			line-height:35upx;
			position: absolute;
			left: 0;
			top: 331upx;
			text-align: center;
			width: 100%;
		}
		.price{
			position: absolute;
			left: 0;
			top:464upx;
			width:100%;
			.title{
				font-size:48upx;
				font-weight:500;
				color:rgba(185,111,22,1);
				margin-bottom: 15upx;
			}
			.money{
				font-size:106upx;
				font-weight:700;
				color:rgba(230,88,54,1);
				.unit{
					margin-left: 10upx;
					font-size:48upx;
					font-weight:400;
				}
			}
		}
		.timeOut{
			font-size:32upx;
			color:rgba(255,255,255,1);
			opacity:0.6;
			position:absolute;
			bottom: 446upx;
			left:0;
			width: 100%;
		}
		.btn{
			background:url(../../static/cashBonus/btn-invitate1.png) no-repeat;
			background-size: 100% 100%;
			width: 442upx;
			height: 80upx;
			position:absolute;
			bottom: 306upx;
			left: 50%;
			margin-left: -221upx;
			font-size:34upx;
			font-weight:bold;
			color:rgba(185,111,22,1);
			line-height:74upx;
		}
		.btn-rules{
			position: absolute;
			top: 0upx;
			right: 0upx;
			width: 122upx;
			height: 100upx;
			z-index: 100000;
		}
	}
	
</style>
