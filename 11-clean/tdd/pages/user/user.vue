<template>
	<view class="container user">

		<view class="user-section">
			<image class="bg" src="/static/my/bg.png"></image>
			<view v-if='userInfo'>
				<view class="user-info-box">
					<view class="portrait-box">
						<image class="portrait" :src="userData.headImgurl||defaultImg"></image>
					</view>
					<view class="info-box">
						<view class='username'>{{userData.userName||"淘多多" }}</view>
						<view class='idNum'>ID:{{userData.id }}</view>
						<view class='idNum'>邀请码:{{userData.invitationCode }}</view>
					</view>
				</view>
				<view class='userDetail' @click="navTo('/pages/earning/earning')">
				<view class='item'>
					<view class='title' v-if='userData'>{{userData.userAssetVo.totalRevenue}}</view>
					<view class='value'>总收益</view>
				</view>
				<view class='item'>
					<view class='title'  v-if='userData'>{{userData.userAssetVo.aboutArrive}}</view>
					<view class='value'>即将到账</view>
				</view>
				<view class='item'>
					<view class='title'  v-if='userData'>{{userData.userAssetVo.balance}}</view>
					<view class='value'>账户</view>
				</view>
			</view>
			</view>
			<view class='btn-login' v-if='!userInfo' @click="login">点击登录</view>
		</view>

		<view class="cover-container">

			<!-- 订单 -->
			<view class="order-section">
				<view class="order-item" @click="navTo('/pages/order/order?state=0')" hover-class="common-hover" :hover-stay-time="50">
					<text class="yticon icon-all"></text>
					<text>全部订单</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=1')" hover-class="common-hover" :hover-stay-time="50">
					<text class="yticon icon-todo"></text>
					<text>待结算</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=2')" hover-class="common-hover" :hover-stay-time="50">
					<text class="yticon icon-down"></text>
					<text>已结算</text>
				</view>
			</view>
			<!-- 浏览历史 -->
			<view class="history-section">
				<VMyList :list='list' @choose='choose'></VMyList>
			</view>
		</view>


	</view>
</template>
<script>
	import VMyList from '@/components/VMyList';
	let startY = 0,
		moveY = 0,
		pageAtTop = true;
	export default {
		components: {
			VMyList
		},
		data() {
			return {
				userInfo: this.$store.getters.userInfo,
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				list: [{
						id: 0,
						imgSrc: '/static/my/myCollect.png',
						title: '我的收藏',
						tip: ''
					},
					{
						id: 1,
						imgSrc: '/static/my/history.png',
						title: '浏览记录',
						tip: ''
					},
					{
						id: 2,
						imgSrc: '/static/my/phone.png',
						title: '绑定手机',
						tip: ""
					},
					{
						id: 3,
						imgSrc: '/static/my/newP.png',
						title: '新手攻略',
						tip: '简单几步快速入门'
					},
					{
						id: 4,
						imgSrc: '/static/my/aboutUs.png',
						title: '关于我们',
						tip: ''
					},
					{
						id: 5,
						imgSrc: '/static/my/setUp.png',
						title: '设置',
						tip: ''
					},
					{
						id: 6,
						imgSrc: '/static/my/cashBonus.png',
						title: '现金红包',
						tip: ''
					}
				],
				userData:"",
				defaultImg:'/static/my/defaultPe.png',
				taobaoObj:""
			}
		},
		onLoad() {
				
		},
		onShow(){
			this.userInfo=this.$store.getters.userInfo;
			if(this.userInfo){
				this.init();
			}
			
		},
		methods: {
			async init(){
				let res= await this.$api.getTbkUserVo();
				this.userData=res.data;
				
				this.userInfo.taobaoAuth=res.data.taobaoAuth
				this.userInfo.id=res.data.id
				this.$store.dispatch('userInfo',this.userInfo)

				if(res.data.phone){
					let arr=res.data.phone.split("");
					arr.splice(3,4,"****");
					this.list[2].tip=arr.join("");
				}
			},
			navTo(url) {
				let wUrl=encodeURIComponent(`${window.location.href}`)
				if (!this.userInfo) {
					url = `/pages/public/login?url=${wUrl}`;
				}
				uni.navigateTo({
					url
				})
			},
			choose(id) {
				
				let url = ''
				switch (id) {
					case 0:
						url = '/pages/user/myCollection';
						break;
					case 1:
						url = '/pages/user/browsHistory';
						break;
					case 2:
						if(this.userData.phone){
							this.$toast("手机号已绑定");
							return;
						}else{
							url = '/pages/user/bindPhone';
						}
						break;
					case 3:
						url = '/pages/user/cpa';
						break;
					case 4:
						url = '/pages/user/aboutUs';
						break;
					case 5:
						url = `/pages/set/set`;
						break;
					case 6:
						url = `/pages/cashBonus/redList`;
						break;
				}
				if(id==3||id==4){
					uni.navigateTo({
						url: url
					})
				}else{
					if(!this.userInfo){
						uni.navigateTo({
							url: `/pages/public/login?url=${window.location.href}`
						})
						return;
					}
					uni.navigateTo({
						url: url
					})
				}
				
				

			},
			login(){
				uni.navigateTo({
					url: `/pages/public/login?url=${window.location.href}`
				})
			}
		}
	}
</script>
<style lang='scss'>
	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%section {
		display: flex;
		justify-content: space-around;
		align-content: center;
		background: #fff;
	}

	.user-section {
		height: 520upx;
		padding: 90upx 0 0;
		position: relative;

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 440upx;
		}

		.userDetail {
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			z-index: 1;
			margin-top: 36upx;

			.item {
				flex: 0 0 33.33%;
				font-size: 28upx;
				font-weight: bold;
				color: rgba(255, 255, 255, 1);
				text-align: center;

				.title {
					margin-bottom: 10upx;
				}

				.value {
					font-size: 24upx;
					font-weight: 400;
				}
			}
		}
	}

	.user-info-box {
		position: relative;
		text-align: left;
		z-index: 1;
		padding:0 20upx;
		.portrait-box{
			position: absolute;
			left: 37upx;
			top: -4upx;
		}
		.portrait {
			width: 98upx;
			height: 98upx;
			border-radius: 50%;
		}

		.info-box {
			margin-left: 142upx;
			color: rgba(255, 255, 255, 1);

			.username {
				font-size: $font-lg+4upx;
				font-weight: bold;
				color: rgba(255, 255, 255, 1);
				margin-bottom: 24upx;
				height: 45upx;
			}

			.idNum {
				font-size: $font-sm;
				font-weight: 400;
				user-select: auto;
			}
		}
	}


	.cover-container {
		background: $page-color-base;
		margin-top: -150upx;
		position: relative;

		/* padding-bottom: 20upx; */
		.arc {
			position: absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}

	.order-section {
		@extend %section;
		padding: 20upx 0;

		.order-item {
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
		}

		.yticon {
			width: 56upx;
			height: 56upx;
			margin-bottom: 13upx;
		}

		.icon-all {
			background: url(/static/my/allOrder.png) no-repeat;
			background-size: 100%;
		}

		.icon-todo {
			background: url(/static/my/todoOrder.png) no-repeat;
			background-size: 100%;
		}

		.icon-down {
			background: url(/static/my/doneOrder.png) no-repeat;
			background-size: 100%;
		}
	}

	.history-section {
		margin-top: 10upx;
		background: #fff;
	}
	.btn-login{
		width:270upx;
		height:72upx;
		background:rgba(0,0,0,0);
		border:1px solid rgba(255, 255, 255, 1);
		border-radius:36upx;
		text-align: center;
		line-height: 72upx;
		font-size:$font-base;
		color:rgba(255,255,255,1);
		z-index:1;
		position: relative;
		margin: 60upx auto 0;
	}
</style>
