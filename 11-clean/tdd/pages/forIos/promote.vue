<template>
	<view>
		<view class='content' :style='{backgroundColor:info.backgroundColor}'>
				<view class='item' v-for='(item,index) in list'>
					<img  :key='index'  :src="item.imageUrl" alt="">
					<view class='btn-group' v-if='item.numIid&&item.numIid.isShow' >
						<view class='btn btn-recharge' @click='openPop' ></view>
						<!-- <view class='btn btn-recharge' @click='goRecharge(99)' ></view> -->
						<view class='btn btn-share' @click='goShare' ></view>
					</view>
				</view>
				
		</view>
		<vPop v-if='isShowPop' @closePop='closePop'>
			<view class='pop-main'>
				<view class='title'>
					充值选择
					<text class='icon-delect' @click="closePop"></text>
				</view>
				<view class='item' v-for='(item,index) in priceArr' :key='index'>
					<img class='bg' src="../../static/cashBonus/priceBg.png" mode="" v-if='index==0'/>
					<img class='bg' src="../../static/cashBonus/priceBg1.png" mode="" v-if='index!=0'/>
					<view class='content'>
						<view class='header'><text class='icon-tip'></text>{{item.name}}</view>
						<view class='price'><text class='symbol'>￥</text>{{item.value}}</view>
						<view class='btn' @click="goRecharge(item.value,item.type)"></view>
					</view>
				</view>
			</view>
		</vPop>
	</view>
</template>

<script>
	import { sending } from '@/common/bridge'
	import  popMixins  from '@/common/popMixins'
	import  vPop  from '@/components/VPop.vue'
	export default {
		mixins:[popMixins],
		data() {
			return {
				list:'',
				userId:'',
				info:'',
				type:'',
				priceArr:[{
					name:'合伙人终身卡',
					value:'',
					type:2
				},{
					name:'合伙人30天体验卡',
					value:'',
					type:1
				}]
			}
		},
		onLoad(options){
			this.userId=options.userId;
			this.type=options.type;
			this.init()
		},
		methods: {
			async init(){
				let res = await this.$api.iWantToUpgrade({
					userId:this.userId?this.userId:''
				});
				this.info=res.data;
				let that=this;
				that.list=res.data.upgradeVos.reduce((arr,item,index)=>{
					if(item.numIid){
						item.numIid=that.parsing(item.numIid)
						item.numIid=that.parsing(item.numIid)
					}
					arr.push(item)
					return arr;
				},[])
				console.log(this.list)
				this.priceArr[0].value=res.data.topUpAmount;
				this.priceArr[1].value=res.data.partnerExperienceCardAmount;
			},
			parsing(params){
				return JSON.parse(params)
				
			},
			goRecharge(price,type){
				let obj={
					type:'1',
					price:price,
					id:type
				}
				if(this.type=='android'){
					
					jsActivity.onCall(JSON.stringify(obj))
					return
				}
				sending(obj)
			},
			goShare(){
				let obj={
					type:'2'
				}
				if(this.type=='android'){
					jsActivity.onCall(JSON.stringify(obj))
					return
				}
				sending(obj)
			}
		},
		components:{vPop}
	}
</script>

<style scoped lang='scss'>
	.content{
		position: relative;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		img{
			margin-top: -1px;
			position: relative;
		}
		.btn{
			position: absolute;
			width: 360upx;
			height: 90upx;
			top: 36upx;
			/* border: 1px solid red; */
		}
		.btn-recharge{
			left: 8upx;
		}
		.btn.btn-share{
			right: 8upx;
		}
		.item{
			position: relative;
			top: 0;
			left: 0;
		}
		
	}
	.pop-main{
		width:100%;
		background:#fff;
		bottom: 0;
		border-radius:20upx 20upx 0 0 ;
		padding: 36upx 30upx;
		font-size:30upx;
		font-weight:bold;
		color:rgba(51,51,51,1);
		.title{
			text-align: center;
			margin-bottom:40upx;
			.icon-delect{
				width: 50upx;
				height:50upx;
				padding: 10upx;
				background: url(../../static/cashBonus/icon-delect.png) no-repeat;
				background-size: 80% 80%;
				background-position: center center;
				display: inline-block;
				float: right;
			}
		}
		.item{
			width: 100%;
			height: 240upx;
			margin-bottom: 25upx;
			position: relative;
			.content{
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
				padding:28upx 45upx;
				font-size:32upx;
				font-weight:bold;
				color:rgba(165,87,36,1);
				.icon-tip{
					width: 32upx;
					height: 30upx;
					background: url(../../static/cashBonus/icon-tip.png) no-repeat ;
					background-size: 100%;
					display: inline-block;
					margin-right: 16upx;
				}
				.time{
					font-size: 24upx;
					font-weight:400;
					position: absolute;
					top: 80upx;
					left: 45upx;
					
				}
				.price{
					margin-top: 64upx;
					font-size:72upx;
					.symbol{
						font-size: 36upx;
					}
				}
				.btn{
					top: 140upx;
					right: 0;
				}
				
			}
		}
		
	}

</style>
