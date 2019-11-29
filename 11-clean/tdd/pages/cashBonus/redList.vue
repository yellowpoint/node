<template><!-- 红包列表 -->
	<view class="redList">
		<view class='banner'>
			<img src="../../static/cashBonus/listBanner.png" alt="">
			<view class='price' v-if='listData'>{{listData.totalCashAmount||0}}</view>
			<view class='price price1' v-if='listData'>{{listData.usableCashAmount}}</view>
			<view class='rule'>按照游戏步骤依次完成</view>
			<view class='btn btn-withdrawal' @click='toGetMoney'></view>
		</view>
		<view class='list'  v-if='listData'>
			<view class='title'>收支明细</view>
			<view class='detail'>
				<view class='item' v-for='(item,index) in listData.packetVos' :key='index'>
					<view class='topsider'>
						<view class='tk'>现金红包</view>
						<view class='tv'>+{{item.amount}}</view>
					</view>
					<view class='topsider bottomsider'>
						<view class='tk'>{{$common.formatDate(item.createTime)}}</view>
						<!-- 状态 0=进行中 1=待结算 2=已结算 3=已失效-->
						<view class='tv' v-if='item.status==0'>进行中</view>
						<view class='tv' v-if='item.status==1'>待结算</view>
						<view class='tv' v-if='item.status==2'>已结算</view>
						<view class='tv' v-if='item.status==3'>已失效</view>
					</view>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listArr:[[],[],[]],
				userInfo: this.$store.getters.userInfo,
				listData:''
			}
		},
		onLoad() {
			this.inint()
		},
		methods: {
			async inint(){
				let res= await this.$api.getUserRedPacketWithCash({
					userId:this.userInfo.id
				})
				this.listData=res.data;
				console.log(222,this.listData)
			},
			toGetMoney() {
			
				// 获取最低提现额度
				this.$api.getByType({
					configEnum: 'MINIMUM_WITHDRAWAL_AMOUNT'
				}).then(res => {
					let minimum = +res.data[0].configVal
			
					if (this.listData.usableCashAmount && this.listData.usableCashAmount >= minimum) {
						uni.navigateTo({
							url: '/pages/earning/getMoney?type=2' //1是提现余额，2是红包余额
						});
			
					} else {
						this.$toast(`最低提现额度为${minimum}元`)
					}
				})
			
			
			}
		}
	}
</script>

<style lang='scss'>
	uni-page-body{
		height: 100%;
	}
	.redList{
		min-height: 100%;
		background-color:#F9F9FA;
		.banner{
			position: relative;
			.price{
				font-size:80upx;
				position: absolute;
				left: 146upx;
				top: 144upx;
				color:rgba(230,88,54,1);
			}
			.price1{
				left: 452upx;
			}
			.rule{
				font-size:24upx;
				color:rgba(114,26,7,1);
				opacity:0.6;
				width: 100%;
				text-align: center;
				position: absolute;
				left: 0;
				bottom: 16upx;
			}
		}
		.list{
			padding:26upx 28upx;
			.title{
				font-size:34upx;
				font-weight:bold;
				color:rgba(40,40,40,1);
				position:relative;
				margin:0 0 32upx;
				&::after{
					content:'';
					width:85upx;
					height:8upx;
					background:rgba(247,68,45,1);
					border-radius:4upx;
					position: absolute;
					bottom: -10upx;
					left: 18upx;
				}
			}
			.item{
				height:150upx;
				background:rgba(255,255,255,1);
				box-shadow:0upx 7upx 35upx 0upx rgba(167,167,167,0.1);
				border-radius:10upx;
				margin-bottom: 26upx;
				padding:24upx 30upx 24upx;
				.topsider{
					justify-content: space-between;
					align-items: center;
					display:flex;
					.tv{
						font-size:40upx;
						font-weight:bold;
						color:rgba(40,40,40,1);
					}
					.tk{
						font-size:28upx;
						font-weight:500;
						color:rgba(40,40,40,1);
					}
				}
				.bottomsider{
					margin-top:18upx;
					.tv{
						font-size:24upx;
						font-weight:500;
						color:rgba(237,74,33,1);
					}
					.tk{
						font-size:24upx;
						font-weight:500;
						color:rgba(127,127,127,1);
					}
				}
			}
		}
		
		
		
	}
	.btn-withdrawal{
		width: 200upx;
		height: 100upx;
		/* border: 1px solid red; */
		position: absolute;
		top: 20upx;
		right: 0;
	}
</style>
