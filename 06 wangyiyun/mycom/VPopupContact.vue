<!--公共客服弹窗-->
<template>
	<div class="VPopupContact">
		<VPopup class="popup_contact" ref='popup_contact'>
			<div class="contact-main">
				<div class="title">联系客服</div>
				<VScroll class="popup-scroll">
					<div>
						<img class="qr" src="~assets/images/common/qr-aykk.png" alt="爱用卡卡" />
						<p class="wx">请添加客服微信：小爱</p>
						<div class="step">
							<i>点击按钮复制“18124196276”跳转微信添加好友</i>
							<div class="stepBtn copy_wx" data-clipboard-text="18124196276" @click="copy_wx">点击复制</div>
						</div>
						<!-- <div class="step" step='2'>
							<i>打开微信添加好友</i>
							<a class="stepBtn" ref="toWX" href="wechat://">前往微信</a>
						</div> -->
						<div class="serverPhone">客服电话：0755-86536781</div>
					</div>
				</VScroll>

			</div>
		</VPopup>
	</div>

</template>

<script>
	import Clipboard from 'clipboard';
	export default {

		name: 'VPopupContact',

		mixins: [],

		components: {},

		props: {

		},

		data() {
			return {}
		},

		computed: {},

		watch: {

		},

		created() {},

		mounted() {

		},

		destroyed() {},

		methods: {
			copy_wx() {
				let clipboard = new Clipboard('.copy_wx')
				clipboard.on('success', e => {
					this.$toast('复制成功，去添加好友吧~');
					// 释放内存
					setTimeout(() => {
						location.href = 'wechat://';
					}, 2000)
					clipboard.destroy();
				})
				clipboard.on('error', e => {
					// 不支持复制
					this.$toast('该浏览器不支持自动复制,请长按复制')
					// 释放内存 
					clipboard.destroy()
				})
			},
			show() {
				this.$refs.popup_contact.ifShow = true
			}
		}
	}
</script>

<style lang="less" scoped>
	.popup_contact {
		.contact-main {
			position: relative;
			width: 5.84rem;
			height: 8.0rem;
			background: url('~assets/images/common/textBg.png') no-repeat;
			background-size: 100%;
			.title {
				@allCenter();
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: .72rem;
				color: #fff;
				font-size: .32rem;
			}
			.popup-scroll {
				height: 6.5rem;
				padding: 0 .65rem;
				margin: 1rem auto 0;
				font-size: .28rem;
				overflow-y: auto;
			}
			.qr {
				width: 2.6rem;
				height: 2.6rem;
				margin: 0 auto;
			}
			p {
				margin-top: .1rem;
				margin-bottom: .3rem;
				color: #999;
				font-size: .28rem;
				font-weight: bold;
				text-align: center;
			}
			.step {
				position: relative;
				font-size: .28rem;
				i {
					display: block;
					// padding-left: .76rem;
					text-align: center;
					font-weight: bold;
					word-wrap:break-word
				}
				.stepBtn {
					@active();
					display: block;
					width: 2.3rem;
					height: .71rem;
					line-height: .6rem;
					margin: 0.5rem auto;
					background: url('~assets/images/btn/yellow.png') no-repeat;
					background-size: 100%;
					color: #fff;
					text-align: center;
				}
			}
			.serverPhone{
				color: #999;
				font-size: 0.24rem;
				text-align: center;
			}
		}
	}
</style>