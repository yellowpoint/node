<template><!-- 双十一活动页面 -->

	<view class='activeTeen'>
		<VScroll v-if='data'  @scrollToEnd="inint" :vScrollData="data" pullup>
			<view >
				<image class='banner' src='/static/forIos/banner.png'></image>
				<view class='item' v-for="(item,index) in data" :key='index'  @click="jump(item.numIid,item.taobaoAuth,item.itemtitle,item.code)">
				<view class='top'>
				<view class='left'>
					<image class='left-img' :src='item.itempic'></image>
					
				</view>
				<view class='right'>
					<view class='detail-desc'>
						<view class='comeFrom icon-taobao' v-if='item.shoptype=="C"'></view>
						<view class='comeFrom icon-tianmao' v-if='item.shoptype=="B"'></view>
						<!-- <view class='comeFrom icon-pidd' v-if='productData.userType==3'></view> -->
						<view class="title">{{item.itemtitle}}</view>
					</view>
					<view class='dec'>
						{{item.itemdesc}}
					</view>
					<view class='juan'>
						<view class='juan-l'>劵后 <text class='price'>{{item.itemendprice}}</text></view>
						<view class='juan-r'>
							<text class='rk'>尾款可用劵</text>
							<text class='rv'>{{item.couponmoney }}元</text>
						</view>
					</view>
					<view class='juan juan-p'>
						<view class='juan-l'>返现 <text class='price price1'>{{item.returnMoney}}</text></view>
						<view class='juan-r'>
							<text class='deposit'>定金{{item.deposit}}元</text>
						</view>
					</view>
					
				</view>
				</view>
				<view class='bottom'>
					<text class='title'>{{item.shopname}}</text>
					<view class='btn' >
						<text class='left'>{{item.itemsale2}}</text>
					<!-- 	<text class='icon'></text> -->
						<text class='right1'>{{item.presaleDiscountFeeText}}</text>
					</view>
				</view>
			</view>
			<uniLoadMore :status="loadingType" v-if='data.length>0'></uniLoadMore>
			</view>
		</VScroll>
		<!-- 弹窗二 -->
		<view class='copyPop' v-if='isShow'>
			<view class='pop-mask' @click='close'></view>
			<view class='content'>
				<view class='top'>
					淘口令购买
					<img src="/static/common/icon-delect.png" alt="" @click='close'>
				</view>
				<view class='middle'>{{code}}</view>
				<view class='btn btn-copy' @click="jumpH()">复制</view>
				<view class='detail'>
		             点击复制后，打开手机淘宝！
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import {
		sending
	} from '@/common/bridge'
	export default {
		data() {
			return {
				userId:'',
				data:'',
				type:'',
				numIid:'',
				code:'',
				isSq:"",
				showLoading: true,
				page:1,
				loadingType:'more',
				itemtitle:'',
				isShow:false
			}
		},
		onLoad(options) {
			this.userId=options.userId?options.userId:'';
			this.type=options.type;
			this.inint();
		},
		components: {
			uniLoadMore
		},
		methods: {
			
			async inint() {
				if (this.loadingType === 'loading' || this.loadingType === 'noMore') {
					return;
				}
				
				this.loadingType = 'loading';
				let res = await this.$api.getD11ProductList({
					userId: this.userId,
					page:this.page,
					pageSize:10
				});
				if (res.data) {
					if (this.page == 1) {
						this.data = res.data
					} else {
						this.data = this.data.concat(res.data)
					}
					if(res.data.length<this.page){
						this.loadingType = 'noMore';
					}else{
						this.loadingType = 'more';
					}
					this.page++;
				} else {
					this.loadingType = 'noMore';
				}
				
				if(this.page==1){
					let that=this;
						that.showLoading=false;
				}
				

			},
			async getCode(){
				 let that=this;//h5
				let userId=this.userId?this.userId:''
				let res = await this.$api.createTaoKoulingTwoInOne({
					userId: userId,
					numIid:this.numIid,
					text:this.itemtitle||''
					
				})
				that.code=res.data.kouling;
				that.go();
			},
			jump(id,taobaoAuth,itemtitle){
				
				this.numIid=id;
				this.isSq=taobaoAuth;
				this.itemtitle=itemtitle;
				this.getCode();
			},
			go(){
				if(this.type=='ios'&&this.userId){//ios登录情况，有口令
					let obj={
						type:5,
						code:`${this.code}`,
						isSq:this.isSq
					}
					console.log(obj)
					sending(obj)
					return;
				}
				this.isShow=true;
			},
			jumpH(){
				let that=this;//h5
				this.$copyText(that.code).then(function(e){
					that.$toast('复制成功')
					setTimeout(function() {
						window.open('taobao://')
					}, 300);
				},function(err){
					that.$toast('复制失败')
				})
			},
			close(){
				this.isShow=false;
			}

		}
	}
</script>

<style scoped lang='scss'>
	.activeTeen {
		
		.banner {
			width: 720upx;
			height: 310upx;
			border-radius: 14upx;
			
		}

		.item {
			/* flex: 0 0 40%; */
			height: 360upx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 6upx 8upx 0upx rgba(149, 149, 149, 0.06);
			border-radius: 14upx;
			margin-top:28upx;
			.top{
				display: flex;
				justify-content: space-between;
			}

			.left {
				.left-img {
					width: 268upx;
					height: 267upx;
					margin-bottom: 20upx;
				}

				.title {
					color: rgba(169, 169, 169, 1);
					line-height: 30upx;
				}
			}

			.right {
				flex:0 0 60%;
				padding-left:22upx;
				.dec{
					font-size:20upx;
					overflow: hidden;
					-o-text-overflow: ellipsis;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
					margin-bottom: 19upx;
					color:rgba(169,169,169,1);
				}
				.juan{
					display:flex;
					align-items: center;
					margin-bottom:8upx;
					.juan-l{
						display:flex;
						align-items: center;
						font-size:22upx;
						flex:0 0 40%;
						color:rgba(169,169,169,1);
						padding-right:10upx;
						.price{
							font-size:26upx;
							font-weight:700;
							color:rgba(255,68,51,1);
							padding-left:10upx;
						}
					}
					
				}
				.juan-r{
					display:flex;
					align-items: center;
					justify-content: flex-end;
					flex:0 0 60%;
					font-size:22upx;
					color:rgba(255,255,255,1);
					.rk{
						/* width:132upx;
						height:34upx */
						padding:4upx 10upx ;
						background:rgba(247,46,28,1);
						border-radius:4upx 0upx 0upx 4upx;
						text-align: center;
					}
					.rv{
						padding: 4upx 12upx;
						background:linear-gradient(-34deg,rgba(228,166,96,1) 0%,rgba(234,188,134,1) 100%);
						border-radius:0upx 4upx 4upx 0upx;
					}
				}
				.juan-p{
					.price{
						color:rgba(67,67,67,1);
					}
					.deposit{
						font-size:20upx;
						color:rgba(228,166,96,1);
						padding: 1upx 11upx;
						border:2upx solid;
						border-radius:4upx;
						
						}
						
				}
			}
		}
	
		.detail-desc {
			position: relative;
		
			.comeFrom {
				width: 30upx;
				height: 30upx;
				margin-right: 18upx;
				position: absolute;
				top: 2upx;
				left: 0;
			}
		
			.icon-taobao {
				background: url(/static/index/icon-taobao.png) no-repeat;
				background-size: 100%;
			}
		
			.icon-tianmao {
				background: url(/static/index/icon-tianmao.png) no-repeat;
				background-size: 100%;
			}
		
			.icon-pidd {
				background: url(/static/index/icon-pidd.png) no-repeat;
				background-size: 100%;
			}
		
			.title {
				font-size: 13px;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
				overflow: hidden;
				-o-text-overflow: ellipsis;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				margin: 0 0 5px;
				text-indent: 22px;
				width: 100%;
			}
		}
		.bottom{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.title{
			
				text-align: center;;
				flex:0 0 30%;
				font-size:20upx;
				color:rgba(169,169,169,1);
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				
			}
			.btn{
				/* flex:0 0 75%; */
				display: flex;
				align-items: center;
				/* background:url(../../static/forIos/dot_btn.png) no-repeat;
				background-size:100% 100%; */
				height: 40upx;
				text-align:right;
				
				
				.left{
					/* flex: 0 0 60%; */
					padding:4upx 18upx;
					font-size:22upx;
					font-weight:bold;
					color:rgba(214,138,51,1);
					text-align: right;
					 background:rgba(250,232,211,1);
					 border-radius:20upx 0 0 20upx;
				}
				.right1{
					/* flex: 0 0 40%; */
					font-size:22upx;
					font-weight:400;
					color:rgba(255,255,255,1);
					background: #f72e1c;
					border-radius:0 20upx 20upx 0;
					padding:4upx 18upx;
					/* padding-left: 40upx; */
				}
			}
		}
	}
	.VScroll{
	    position: absolute;
	    top: 20upx;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    overflow: hidden;
		padding: 50upx 20upx 0 15upx;
		
	}
	.copyPop{
		.pop-mask{
			position: fixed;
			z-index: 999;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			background: rgba(0,0,0,.6);
		}
		.content{
			    position: fixed;
				z-index: 999;
				width: 550upx;
				top: 50%;
				left: 50%;
				height: 440upx;
				-webkit-transform: translate(-50%,-50%);
				transform: translate(-50%,-50%);
				background-color: #fff;
				text-align: center;
				border-radius:10upx;
				overflow: hidden;
				.top{
					height:88upx;
					line-height: 88upx;
					background:rgba(255,67,36,1);
					font-size:32upx;
					color:rgba(255,255,255,1);
					text-align: center;
					position: relative;
					display: inline-block;
					width: 100%;
					img{
						padding: 29upx 10upx;
						width:50upx;
						height:88upx;
						position: absolute;
						top: 0;
						right: 0;
						margin-right: 12px;
					}
				}
				.middle{
					width:380upx;
					height:84upx;
					background:rgba(233,233,233,1);
					margin:56upx auto 33upx;
					font-size:36upx;
					font-weight:bold;
					color:rgba(51,51,51,1);
					line-height:84upx;
					overflow: hidden;
					text-overflow: ellipsis;
					padding: 0 10upx;
				}
				.btn-copy{
					width:340upx;
					height:84upx;
					background:rgba(255,67,36,1);
					border-radius:80upx;
					font-size:36upx;
					font-weight:bold;
					color:rgba(255,255,255,1);
					line-height:84upx;
					margin:0 auto 34upx;
				}
				.detail{
					width:394upx;
					height:49upx;
					font-size:22upx;
					color:rgba(102,102,102,1);
					margin:0 auto;
				}
		}
		}
		.bottom .icon{
			width: 16upx;
			/* background-image:url(../../static/forIos/middleT.png); */
			background-size: 100%;
			background-repeat: no-repeat;
			font-size:22upx;
			font-weight:400;
			padding:8upx 18upx;
			
		}
	.activeTeen .item .right .juan .juan-l  .price1{
		color: rgba(67,67,67,1);
	}

</style>