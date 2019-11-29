<template><!-- 第二次打开红包 -->
	<view class="secondPacket">
		<view>
			<img src="../../static/cashBonus/secondBg.png" alt="">
			<view class='allMoney'>
				<view>瓜分</view>
				<view>{{cashPack.totalCashRedPacket}}红包</view>
			</view>
			<view class='all'>今日已送出现金￥{{cashPack.todayAlreadySendAmount}}</view>
			<view class='price'>
				<view class='title'>已拆现金</view>
				<view class='money'>{{cashPack.alreadySendAmount}} <text class='unit'>元</text></view>
				<view class='poor'>还差<text class='poorMoney'>{{cashPack.surplusAmount }}元</text> 即可提现</view>
			</view>
			<view class='rules'>按照游戏步骤依次完成</view>
			<view class='timeOut'>{{time}}后现金将失效</view>
			<view class='btn' @click="openPop">分享{{cashPack.surplusNumber }}位好友，再拆{{cashPack.surplusAmount}}元</view>
			<view class='btn-rules' @click="jumpRules"></view>
			<view class='list'>
				<view class='item' v-for='(item,index) in cashPack.recordVos' :key='index'>
					<view class='leftsider'>
						<img :src="item.headImgurl" alt="">
						<view class='middle'>
							<view class='mk'>{{item.userName}}</view>
							<view class='mv'>{{item.remark}}</view>
						</view>
					</view>
					<view class='money'>已拆开{{item.amount}}元</view>
				</view>
			</view>
		</view>
		<vPop v-if='isShowPop' @closePop='closePop'>
			<view class='pop-main'>
				<view class='title'>已拆现金</view>
				<view class='money title'>{{shareDate.alreadySendAmount}}</view>
				<view class='money1 title'>还差{{shareDate.surplusAmount}}元 即可提现</view>
				<view class='btn btn-share' @click="share">分享{{shareDate.surplusNumber }}位好友 再拆{{shareDate.surplusAmount}}元</view>
				<view class='percent' v-if='shareDate'>
					<VProgressBar :percent='shareDate.percent'></VProgressBar>
				</view>
				<view class='btn-close' @click='closePop'></view>
			</view>
		</VPop>
	</view>
</template>

<script>
	import VProgressBar from "@/components/VProgressBar"
	import  cashMixins  from './cashMixins'
	import  vPop  from '@/components/VPop.vue'
	import  popMixins  from '@/common/popMixins'
	export default {
		mixins:[cashMixins,popMixins],
		data() {
			return {
				time:'',
				list:[[],[],[]],
				cashPack:'',
				shareDate:'',
				userInfo: this.$store.getters.userInfo,
				url:""
			}
		},
		onLoad() {
			let cashPack= this.$common.getCookie('cashPack');
			this.cashPack=cashPack?JSON.parse(cashPack):null
			console.log(this.cashPack)
			let t=Math.floor(this.cashPack.failureTime/1000);
			this.inintTimeOut(t);
			
		},
		methods: {
			async openPop(){
				console.log(222,this.userInfo)
				let res=await this.$api.getRedPacketShare({
					userId:this.userInfo.id
				});
				this.shareDate=res.data;
				this.isShowPop=true;
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
		},
		components:{
			vPop,
		VProgressBar
		}
	}
</script>

<style lang='scss'>
	.secondPacket{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		text-align:center;
		background-color:#F54833;
		overflow: auto;
		padding-bottom:100upx;
		.all{
			font-size:32upx;
			color:rgba(255,255,255,1);
			line-height:35upx;
			position: absolute;
			left: 0;
			top: 140upx;
			text-align: center;
			width: 100%;
		}
		.price{
			position: absolute;
			left: 0;
			top:268upx;
			width:100%;
			.title{
				font-size:36upx;
				font-weight:700;
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
			.poor{
				margin-top: 30upx;
				font-size:26upx;
				font-weight:700;
				color:rgba(185,110,21,1);
				.poorMoney{
					color:rgba(230,88,54,1);
					margin-right: 10upx;
				}
			}
		}
		.timeOut{
			font-size:32upx;
			color:rgba(255,255,255,1);
			opacity:0.6;
			position:absolute;
			top: 756upx;
			left:0;
			width: 100%;
		}
		.btn{
			background:url(../../static/cashBonus/btn-invitate1.png) no-repeat;
			background-size: 100% 100%;
			width: 554upx;
			height: 80upx;
			position:absolute;
			top: 653upx;
			left: 50%;
			margin-left: -277upx;
			font-size:34upx;
			font-weight:bold;
			color:rgba(185,111,22,1);
			line-height:74upx;
		}
		.rules{
			position:absolute;
			top: 598upx;
			left: 0;
			width: 100%;
			font-size:24upx;
			color:rgba(114,26,7,1);
			opacity:0.6;
		}
		.item{
			width:100%;
			height: 160upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 37upx;
			background: url(../../static/cashBonus/itemBg.png) no-repeat;
			background-size: 100% 100%;
			.leftsider{
				/* flex: 0 0 60%; */
				display: flex;
				align-items: center;
			}
			img{
				border-radius: 50%;
				border: 1px solid #fff;
				width: 94upx;
				height: 94upx;
				margin-right: 20upx;
			}
			.middle{
				font-size:32upx;
				color:rgba(255,255,255,1);
				text-align:left;
				.mv{
					font-size:24upx;
					margin-top: 20upx;
				}
			}
			.money{
				padding: 11upx 21upx;
				background:linear-gradient(-14deg,rgba(239,45,7,1) 0%,rgba(244,83,50,1) 100%);
				font-size:28upx;
				color:rgba(255,255,255,1);
			}
		}
		.btn-rules{
			position: absolute;
			top: 0upx;
			right: 0upx;
			width: 122upx;
			height: 140upx;
			z-index: 100000;
		}
	}
	.pop-main{
		width: 750upx;
		height: 1125upx;
		font-size: 15px;
		font-weight: bold;
		color: #333333;
		top: 100upx;
		background:url(../../static/cashBonus/pop-share.png) no-repeat;
		background-size: 100%;
		left: 50%;
		margin-left: -361upx;
		text-align: center;
		.btn-close{
			width: 100upx;
			height: 100upx;
			position: absolute;
			bottom: 0;
			left: 50%;
			margin-left: -50upx;
		}
		.title{
			font-size:48upx;
			font-weight:700;
			color:rgba(255,255,255,1);
			opacity:0.4;
			position: absolute;
			bottom: 0;
			top: 400upx;
			width: 100%;
		}
		.money{
			font-size:106upx;
			font-weight:400;
			color:rgba(255,255,255,1);
			opacity: 1;
			top: 500upx;
		}
		.money1{
			font-size:32upx;
			font-weight:400;
			color:rgba(255,255,255,1);
			opacity:0.4;
			top: 652upx;
		}
		.btn-share{
			background:none;
			top: 818upx;
		}
	}
	.allMoney{
		position: absolute;
		right: 37upx;
		top: 936upx;
		color: #fff9c5;
		font-size: 24upx;
		width: 154upx;
		height: 87upx;
		background: url(../../static/cashBonus/secondBgMoney.png) no-repeat;
		background-size: 100% 100%;
		padding: 10upx 0;
	}
	.VProgressBar{
		width:506upx;
		position: absolute;
		left: 50%;
		margin-left:-253upx;
		top: 780upx;
	}
</style>
