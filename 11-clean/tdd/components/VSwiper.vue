<!-- 公共的手机验证码 -->
<template>
	<view class="VSwiper" >
		<!-- 轮播 -->
		<swiper-vue class="carousel" :options="swiperOption" >
			<swiper-vue-slide v-for="(item, index) in bannerList " :key="index" class="carousel-item" @click.native="swiper(item)">
				<image :src="item.url" />
			</swiper-vue-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper-vue> 
	</view>

</template>

<script>
	export default {
		data() {
			return {
				swiperOption: {
					autoplay: {
						disableOnInteraction: false
					},
					loop: true,
					observer: true,
					observeParents: true,
					spaceBetween: 10,
					pagination: {
						el: '.swiper-pagination'
					}
				
				}
				
			}
		},
		props: {
			bannerList: {
				type: Array,
				default:[]
			},
		},
		mounted() {
		// this.changeImgCode()

		},
		methods: {
			radioChange(e){
				console.dir(e)
				
			},
			bindAlipay(){
				uni.navigateTo({
					url: `/pages/earning/binAlipay`
				})
			},
			swiper(item) {
				if (item.type == 1) {
					// 如果链接是项目自己的链接则uni.navigateTo跳转
					if(item.clickUrl.indexOf('tdd.51app.cn/pages/')>-1){
						uni.navigateTo({
							url: `/pages/${item.clickUrl.split('tdd.51app.cn/pages/')[1]}`
						})
						return
					}
					
					window.location.href = item.clickUrl;
			
				} else if (item.type == 3) {
					uni.navigateTo({
						url: `/pages/product/product?id=${item.numIid}`
					})
				}
			
			}
			
		},
		watch: {
		},
	}
</script>

<style lang="scss">
	.title{
		font-size:28upx;
		font-weight:700;
		color:rgba(51,51,51,1);
		margin: 25upx 48upx 15upx;
	}
	.item{
		display: flex;
		align-items: center;
		padding: 30upx 48upx 30upx 48upx;
		.icon{
			width:170upx;
			height: 60upx;
		}
		.tips{
			width: 280upx;
			font-size:28upx;
			font-weight:400;
			color:rgba(153,153,153,1);
			margin-left: 54upx;
		}
		.bind{
			font-size:28upx;
			color:rgba(84,160,255,1);
			padding:0 0 0 29upx;
			align-items: right;
		}
		.choose{
			margin-left: auto;
		}
	}
	/* 头部 轮播图 */
	.carousel-section {
		position: relative;
		padding: 20upx 0 30upx;
		text-align: center;
	}
	
	.carousel {
		// width: 702upx;
		// height: 314upx;
			width:100%;
			height:100%;
		.carousel-item {
			width: 100%;
			height: 100%;
			overflow: hidden;
		}
	
		image {
			width: 100%;
			height: 100%;
			border-radius: 10upx;
		}
	}
</style>
