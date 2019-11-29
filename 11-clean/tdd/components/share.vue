<template>
	<view v-if="show" class="mask" @click="toggleMask" @touchmove.stop.prevent="stopPrevent"
		:style="{backgroundColor: backgroundColor}"
	>
		<view 
			class="mask-content"
			@click.stop.prevent="stopPrevent"
			:style="[{
				height: config.height, 
				transform: transform
			}]"
		>
			<scroll-view class="view-content" scroll-y>
				<view class="share-header">
					分享到
				</view>
				<view class="share-list">
					<view 
						v-for="(item, index) in shareList" :key="index"
						class="share-item" 
						v-clipboard:copy="copyData"
					  v-clipboard:success="onCopy"
					  v-clipboard:error="onError"
						@click="shareToFriend(item)"
					>
						<image :src="item.icon" mode=""></image>
						<text>{{item.text}}</text>
					</view>
				</view>
			</scroll-view>
			<view class="bottom b-t" @click="toggleMask">取消</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				transform: 'translateY(50vh)',
				timer: 0,
				backgroundColor: 'rgba(0,0,0,0)',
				show: false,
				config: {},
				item:""
			};
		},
		props:{
			contentHeight:{
				type: Number,
				default: 0
			},
			//是否是tabbar页面
			hasTabbar:{
				type: Boolean,
				default: false
			},
			shareList:{
				type: Array,
				default: function(){
					return [];
				}
			},
			copyData:{//淘宝分享的字段
				type:String,
				default:""
			}
		},
		created() {
			const height = uni.upx2px(this.contentHeight) + 'px';
			this.config = {
				height: height,
				transform: `translateY(${height})`,
				backgroundColor: 'rgba(0,0,0,.4)',
			}
			this.transform = this.config.transform;
		},
		onLoad(options){//跳转带参
			this.inint();
		},
		methods:{
			toggleMask(){
				//防止高频点击
				if(this.timer == 1){
					return;
				}
				this.timer = 1;
				setTimeout(()=>{
					this.timer = 0;
				}, 500)
				
				if(this.show){
					this.transform = this.config.transform;
					this.backgroundColor = 'rgba(0,0,0,0)';
					setTimeout(()=>{
						this.show = false;
						this.hasTabbar && uni.showTabBar();
					}, 200)
					return;
				}
				
				this.show = true;
				//等待mask重绘完成执行
				if(this.hasTabbar){
					uni.hideTabBar({
						success: () => {
							setTimeout(()=>{
								this.backgroundColor = this.config.backgroundColor;
								this.transform = 'translateY(0px)';
							}, 10)
						}
					});
				}else{
					setTimeout(()=>{
						this.backgroundColor = this.config.backgroundColor;
						this.transform = 'translateY(0px)';
					}, 10)
				}
			},
			//防止冒泡和滚动穿透
			stopPrevent(){},
			//分享操作
			async shareToFriend(item){
				this.item=item;
				this.toggleMask();
			},
			 onCopy: function (e) {
					 let that = this;
					 let title=`复制口令成功，是否分享到${this.item.text}？`
					 uni.showModal({
						content: title,
						success: (res) => {
							if (res.confirm) {
								if(that.item.type==3){
									window.open("mqqwpa://im/chat?chat_type=wpa&uin=1247558534&version=1&src_type=web&web_src=oicqzone.com");
								}else{
									window.open("weixin://");
								}
								
							} else if (res.cancel) {
					 
							}
						}
					 });
			},
			onError: function (e) {
				this.$toast("复制失败");
			}
		}
	}
</script>

<style lang='scss'>
	.mask{
		position:fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		display:flex;
		justify-content: center;
		align-items: flex-end;
		z-index: 998;
		transition: .3s;
		.bottom{
			position:absolute;
			left: 0;
			bottom: 0;
			display:flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 90upx;
			background: #fff;
			z-index: 9;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
		}
	}
	
	.mask-content{
		width: 100%;
		height: 580upx;
		transition: .3s;
		background: #fff;
		border-radius: 20upx 20upx 0 0;
		&.has-bottom{
			padding-bottom: 90upx;
		}
		.view-content{
			height: 100%;
		}
	}
	.share-header{
		height: 110upx;
		font-size: $font-base+2upx;
		color: font-color-dark;
		display:flex;
		align-items:center;
		justify-content: center;
		padding-top: 10upx;
		&:before, &:after{
			content: '';
			width: 240upx;
			heighg: 0;
			border-top: 1px solid $border-color-base;
			transform: scaleY(.5);
			margin-right: 30upx;
		}
		 &:after{
			 margin-left: 30upx;
			 margin-right: 0;
		 }
	}
	.share-list{
		display:flex;
		flex-wrap: wrap;
	}
	.share-item{
		min-width: 33.33%;
		display:flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 180upx;
		image{
			width: 80upx;
			height: 80upx;
			margin-bottom: 16upx;
		}
		text{
			font-size: $font-base;
			color: $font-color-base;
		}
	}
</style>
