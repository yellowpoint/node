<!--我的页面组件-->
<template>
	<view class='aboutUs'>
		<view class='top'>
			<img src="/static/common/logo.jpg" alt="">
			<view class='title'>淘多多</view>
			<!-- <view class='value'>当前版本号：8.6.10</view> -->
		</view>
		<view class='middle'></view>
		<view class='bottom'>
			<VMyList :list='list' @choose='choose'></VMyList>
		</view>
	</view>
</template>

<script>
	import VMyList from '@/components/VMyList';
	export default {
		data() {
			return {
				list: [{
						id: 0,
						imgSrc: '',
						title: '隐私政策',
						tip: ''
					},
					{
						id: 1,
						imgSrc: '',
						title: '商务合作',
						tip: ''
					},
					{
						id: 2,
						imgSrc: '',
						title: '联系我们',
						tip: ''
					}
				]
			}
		},
		props: {
			
		},
		methods: {
			choose(id) {
				let url = ''
				switch (id) {
					case 0:
						url = `/pages/user/policy?id=${id}`;
						break;
					case 1:
						url = `/pages/user/policy?id=${id}`;
						break;
					case 2:
						url = '/pages/user/contactUs';
						break;
				}
				uni.navigateTo({
					url: url
				})
			
			},
		},
		components:{
			VMyList
		}
	}
</script>

<style  lang='scss'>
	.aboutUs{
		.top{
			padding:40upx 0;
			text-align: center;
			img{
				width: 120upx;
				height: 120upx;
				border-radius:20upx;
				margin: 0 auto 20upx;
				display: block;
			}
			.title{
				font-size:$font-base;
				color:rgba(51,51,51,1);
				margin-bottom: 20upx;
			}
			.value{
				font-size:24upx;
				color:rgba(51,51,51,1);
			}
		}
		.middle{
			background: #f2f2f2;
			height: 30upx;
		}
	}
	
</style>
