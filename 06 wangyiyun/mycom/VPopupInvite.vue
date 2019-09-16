<!--公共分享助力弹窗-->
<template>

	<div class="VPopupInvite">
		<VPopup class="popup_invite" ref='popup_invite' @close='closePopup'>
			<div class="invite-main">
				<VScroll class="popup-scroll" :data="inviteCode">
					<div>{{inviteCode}}</div>
				</VScroll>
				<div class="stepBtn copy_invite" :data-clipboard-text="inviteCode" @click="copy_invite">点击复制</div>
				<p>分享链接给微信好友，邀请TA为我助力！</p>
			</div>
		</VPopup>
		<transition name='fade'>
			<div @touchmove.prevent v-if="isShowWxShareTips" class="wxShareTips" @click="closeWxShareTips">
				<img src="../assets/images/common/wxShareTips.png" alt="点击右上角分享" />
			</div>

		</transition>
	</div>

</template>

<script>
	import Clipboard from 'clipboard';
	export default {

		name: 'VPopupInvite',

		mixins: [],

		components: {},

		props: {

		},

		data() {
			return {
				inviteCode: '请先登录获取您的分享链接',
				isShowWxShareTips: false
			}
		},

		computed: {},

		watch: {

		},

		created() {},

		mounted() {
			

		},

		destroyed() {},

		methods: {
			copy_invite() {
				let clipboard = new Clipboard('.copy_invite')
				clipboard.on('success', e => {
					this.$toast('复制成功，去分享给朋友吧~')
					setTimeout(() => {
						location.href = 'wechat://';
					},2000)
					// 释放内存 
					clipboard.destroy()
				})
				clipboard.on('error', e => {
					// 不支持复制
					this.$toast('该浏览器不支持自动复制,请长按复制')
					// 释放内存 
					clipboard.destroy()
				})
			},
			show() {
				let wxShareLink = 'http://idt.51app.cn/#/index'

				if(this.$store.getters.userInfo) {
					this.inviteCode = '亲，我正在参与答题，每日瓜分5000元，点击链接帮我助力一下吧！ http://idt.51app.cn/#/index?userCode=' + this.$store.getters.userInfo.userCode;
					wxShareLink = 'http://idt.51app.cn/#/index?userCode=' + this.$store.getters.userInfo.userCode;
				}
				//设置微信分享的链接，带上用户code
				wxShare('答题挑战，每日瓜分5000元！', wxShareLink, 'http://idt.51app.cn/static/img/shareImg.jpg', '我已领取，每天都能提现，一起来玩！')
				

				//有登录，在微信里弹点击右上角的提示，非微信弹弹窗
				//未登录，在微信和首页的分享按钮下不用登录可直接弹提示，其他情况需要登录

				if(this.$store.getters.userInfo) {
					if(this.$common.isOpenInWeixin()) {
						this.showWxShareTips()
					} else {
						this.$refs.popup_invite.ifShow = true
					}

				} else {
					if((this.$common.isOpenInWeixin() || this.$common.isOpenInAiSi()) && (this.$route.path == '/index' || this.$route.path == '/')) {
						this.showWxShareTips()

						return false;
					}
					this.$toast('分享前先让我们知道您是谁吧~')

					if(this.$route.path == '/answer') {
						this.$VLogin({
							callback: () => {
								this.$router.push('/index')
							},
							closeCallback: () => {
								this.$router.push('/index')
							},
						});
					} else {
						this.$VLogin()
					}

				}

			},
			closePopup() {
				this.$emit('close')
			},
			showWxShareTips() {
				this.isShowWxShareTips = true
			},
			closeWxShareTips() {
				this.isShowWxShareTips = false
			}
		}
	}
</script>

<style lang="less" scoped>
	.popup_invite {
		.invite-main {
			position: relative;
			width: 5.5rem;
			height: 7.2rem;
			background: #fff url('~assets/images/my/popup-invite.png') no-repeat;
			background-size: 100%;
			border-radius: .15rem;
		}
		.popup-scroll {
			@allCenter();
			width: 4.5rem;
			height: 1.5rem;
			padding: .1rem;
			margin: 2.5rem auto 0;
			background: #EDEDED;
			color: #5B5B5B;
			font-size: .24rem;
			word-break: break-all;
			overflow-x: hidden;
			overflow-y: auto;
			box-sizing: border-box;
		}
		.stepBtn {
			@active();
			display: block;
			width: 2.3rem;
			height: .71rem;
			line-height: .6rem;
			margin: .3rem auto;
			margin-top: 0.8rem;
			background: url('~assets/images/btn/yellow.png') no-repeat;
			background-size: 100%;
			color: #fff;
			text-align: center;
		}
		p {
			color: #666;
			font-size: .26rem;
			text-align: center;
		}
	}
	
	.wxShareTips {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 88;
		background: rgba(0, 0, 0, .75);
		overflow: hidden;
	}
</style>