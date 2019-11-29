<template><!-- 升级团长 -->
	<view class="upGradeDelegat">
		<img class='bg' src="../../static/cashBonus/delegateBg.png" alt="" />
		<view class='progress'>
			<view class='item' v-for='(item,index) in progressArr' :key='index'>
				<view class='title' v-if='index!=2'>
					<text class='tk'>{{item.name}}</text>
					<text class='tv'>{{item.person}}人/目标{{item.allPerson}}人</text>
				</view>
				<view class='title' v-if='index==2'>
					<text class='tk'>{{item.name}}</text>
					<text class='tv'>{{item.person}}元/目标{{item.allPerson}}元</text>
				</view>
				<view class='progressContent' >
					<view class='percent' v-if='item.value==0'>0%</view>
					<view class='bar' v-if='item.value!=0'  :style="{width:`${item.value}%`}">
						<view class='percent' >{{item.value}}%</view>
					</view>
				</view>
			</view>
		</view>
		<view class='detail'>
			{{upGradeDelegat.remark}}
		</view>
		
		<view class='privilege'>
			<view class='bar' :class='upGradeDelegat.presentPrivilegeImageList?"bar":"bar bar1"'>
				<view  :class='index==0?"item active":"item"' @click='check(1)' v-if='upGradeDelegat.presentPrivilegeImageList'>当前特权</view>
				<view  :class='index!=0?"item active":"item"' @click='check(0)'>团长特权</view>
			</view>
			<view v-for='(item,index) in imgList' :key='index'>
				<img :src="item.imageUrl" alt="">
			</view>
			<view class='btn-group'>
				<view class='btn btn-recharge' @click="goPromote()" v-if='upGradeDelegat.presentPrivilegeImageList'>充值{{upGradeDelegat.regimentalCommanderCard}}元 </view>
				<view class='btn' @click="share()">邀请好友</view>
			</view>
		</view>
		<view v-for='(item,index) in imgListAll' :key='index' class='bottom'>
			<img :src="item.imageUrl" alt="">
		</view>
	</view>
</template>

<script>
	import { sending } from '@/common/bridge'
	export default {
		data() {
			return {
				progressArr:[
					{
						name:'直属粉丝',
						value:'',
						person:'',
						allPerson:''
					},
					{
						name:'直属粉丝邀约',
						value:'',
						person:'',
						allPerson:''
					},
					{
						name:'佣金',
						value:'',
						person:'',
						allPerson:''
					}
						
				],
				upGradeDelegat:'',
				userInfo: this.$store.getters.userInfo,
				index:0,
				imgList:[],
				type:'',
				userId:"",
				imgListAll:[],
			}
		},
		onLoad(options) {
			
			this.type=options.type;
			this.userId=options.userId;
			this.inint();
			
		},
		methods: {
			async inint(){
				let userInfoId
				if(!this.userId){
					userInfoId=this.userInfo?this.userInfo.id:'';
				}else{
					userInfoId=this.userId;
				}
				
				
				let res=await this.$api.getUpgradeDelegationInfo({
					userId:userInfoId
				});
				this.upGradeDelegat=res.data;
				this.progressArr[0].value=res.data.oneLevelFansPercent;
				this.progressArr[0].person=res.data.oneLevelFansNumber;
				this.progressArr[0].allPerson=res.data.upgradeDelegationOneFansNummber;
				
				this.progressArr[1].value=res.data.twoLevelFansPercent;
				this.progressArr[1].person=res.data.twoLevelFansNumber;
				this.progressArr[1].allPerson=res.data.upgradeDelegationTwoFansNummber;
				
				this.progressArr[2].value=res.data.commPercent;
				this.progressArr[2].person=res.data.commission ;
				this.progressArr[2].allPerson=res.data.upgradeDelegationComm;
				this.progressArr.forEach(function(item,index){
					if(item.value>100){
					item.value=100
					}
				})
				
				this.check(this.index)
				console.log(this.progressArr)
				
				this.imgListAll=this.upGradeDelegat.imageList;
			},
			check(index){
				this.index=index;
				if(index==0){//当前特权
					this.imgList=this.upGradeDelegat.teamPrivilegeImageList;
					
				}else{//团长特权
					this.imgList=this.upGradeDelegat.presentPrivilegeImageList;
				}
				
			},
			share(){//分享
				let obj={
					type:'2'
				}
				if(this.type=='android'){
					jsActivity.onCall(JSON.stringify(obj))
					return
				}
				sending(obj)
			},
			goPromote(){//跳转充值面
				let obj={
					type:'1',
					price:this.upGradeDelegat.regimentalCommanderCard,
					id:3
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

<style lang='scss'>
	.upGradeDelegat{
		background-color: #ee4544;
		padding-bottom: 40upx;
	}
	.progress{
		position: relative;
		left: 0;
		top: 0;
	}
	.progress{
		position: absolute;
		top: 750upx;
		left: 65upx;
		width:620upx;
		height:481upx;
		padding:30upx 36upx;
		.title{
			font-size:28upx;
			font-weight:400;
			display: flex;
			align-items: center;
			justify-content: space-between;
			color:rgba(111,63,11,1);
			.tv{
				font-size:24upx;
			}
		}
		.progressContent{
			height:30upx;
			background:rgba(255,255,255,1);
			border-radius:15upx;
			position: relative;
			margin:34upx 0 52upx;
			.bar{
				height:30upx;
				background:rgba(255,173,28,1);
				position: absolute;
				left: 0;
				top: 0;
				border-radius:15upx;
				.percent{
					text-align: right;
				}
			}
			.percent{
				font-size:24upx;
				color:rgba(111,63,11,1);
				line-height: 30upx;
				padding: 0 10upx;
				text-align: center;
			}
		}
	}
	.detail{
		position: absolute;
		top: 1264upx;
		left: 65upx;
		width:620upx;
		padding:0 12upx;
		font-size:24upx;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:44upx;
	}
	.privilege{
		min-height:706upx;
		background-color:#D72C2D;
		border-radius:10upx;
		margin: 30upx 24upx 0;
		.bar{
			display: flex;
			align-items: center;
			height: 110upx;
			.item{
				flex: 0 0 50%;
				font-size:36upx;
				font-weight:bold;
				color:rgba(255,255,255,1);
				line-height: 110upx;
				text-align: center;
			}
			.active{
				height: 100%;
				background:rgba(110,29,29,1);
				border-radius:10upx;
				font-size:30upx;
				font-weight:400;
				color:rgba(255,255,255,1);
				opacity:0.5;
				
			}
		}
	}
	.btn-invite{
		
		
	}
	.btn-group{
		position: fixed;
		width: 100%;
		bottom: 48upx;
		left:0;
		display:flex;
		justify-content: center;
		align-items:center;
		font-size:30upx;
		color:rgba(60,41,6,1);
		.btn{
			width:320upx;
			height:83upx;
			text-align: center;
			line-height: 83upx;
			background:linear-gradient(101deg,rgba(254,244,183,1),rgba(253,186,57,1));
			border-radius:42upx;
		}
		.btn-recharge{
			margin-right: 34upx;
		}
	}
	.bottom{
		    margin: 10upx 24upx 100upx;
	}
	.bar1 .item{
		flex:0 0 100% !important;
		}
</style>
