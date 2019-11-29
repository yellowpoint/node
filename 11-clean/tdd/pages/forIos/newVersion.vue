<template>
	<view class='newVersion'>
		<view class='title'>
			在应用商店下载“淘多多”APP
		</view>
		<view class='logo'>
			<img src="../../static/forIos/logo.png" alt="">
			<view>
				<view class='logoName'>淘多多</view>
				<view class='btn btn-copy' v-clipboard:copy="wxCode"
							  v-clipboard:success="onCopy1"
							  v-clipboard:error="onError1">
					复制APP名称
				</view>
			</view>
		</view>
		<view class='middle item'>
			<view class='vt'>当前版本号:</view>
			<view class='va'>
				苹果ios：2.1.0    
			</view>
			<view class='va'>
				安卓Android 2.0.2 
			</view>
		</view>
		<view class='middle item'>
			<view class='vt'>新版福利来袭:</view>
			<view class='va'>
				邀请3位好友下单免费升级合伙人！ 
			</view>
		</view>
		<view class='middle item'>
			<view class='vt'>本次更新内容:</view>
			<view class='va'>
				 分享：新增【今日推荐】【品牌榜】
			</view>
			<view class='va'>
				 提现：优化支付宝提现可绑定邮箱账号
			</view>
			<view class='code'>
				<img src="../../static/forIos/code.png" alt="">
				<view>扫描二维码下载 </view>
			</view>
			
		</view>
		<view class='bottom item'>
			<view class='vt'>温馨提示:</view>
			<view class='va'>
                    应用商店有同名APP，大家下载全新版本的认准 <text class='cr'>淘多多</text>的图标
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wxCode:'淘多多'
			}
		},
		methods: {
			onCopy1(){
				this.$toast("复制成功");
			},
			onError1(){
				this.$toast("复制失败");
			}
			
		}
	}
</script>

<style lang="scss">
	.newVersion{
		padding: 28upx 40upx;
		font-size: 28upx;
		.name{
			font-weight: 700;
			font-size: 30upx;
			color:#bf3627;
		}
		.btn-copy{
			padding: 10upx 20upx;
			display: inline-block;
			border-radius: 20upx;
			font-size: 26upx;
			background-color: #ff4324;;
			color: #ffffff;
			margin-top: 40upx;
			}
		.middle{
			
		}
		.item{
			margin-bottom:20upx;
			line-height: 40upx;
		}
		.vt{
			font-weight: 700;
			margin-bottom: 14upx;
			
		}
		.va{
			margin-top: 2upx;
			padding-left: 10upx;
			color:rgba(25,25,25,1);
			font-size: 24upx;
			font-weight:400;
		}
		.bottom{
			// margin-top: 80upx;
		}
		.cr{
			color: #E12E2E;
		}
		.title{
			text-align: center;
			font-size: 30upx;
			font-weight: 700;
		}
	}
	.logo{
		display: flex;
		align-items: center;
		margin:40upx 0 48upx;
		img{
			width:153upx;
			height: 153upx;
			margin-right: 30upx;
		}
		.logoName{
			font-size:50upx;
			font-weight:bold;
			color:rgba(25,25,25,1);
		}
	}
	.code{
		text-align: center;
		font-size:24upx;
		font-weight:400;
		color:rgba(152,152,152,1);
		margin:48upx 60upx;
		img{
			width: 308upx;
			height: 308upx;
			margin:0 auto 15upx;
		}
	}
</style>
