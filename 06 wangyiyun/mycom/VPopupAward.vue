<!--公共 领奖步骤 弹窗-->
<template>
	<div class="VPopupAward">
		<VPopup class="popup_award" ref='popup_award' @close='closePopup'>
			<div class="award-main">

				<div class="popup-scroll">
					<div class="step" step='1'>
						<p>截图识别二维码关注</p>
						<img src="~/assets/images/common/qr-aykk2.jpg" alt="爱用卡卡公众号" />
						<p>或微信搜索关注“爱用卡卡”公众号</p>
					</div>
					<div class="step" step='2'>
						<p>在公众号对话框回复<br />“<i>{{clipboardText}}</i>”即可</p>
					</div>
					<div class="stepBtn copy_wx" :data-clipboard-text="clipboardText" @click="copy_wx">复制编码</div>
				</div>

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
			return {
				clipboardText: `答题奖金${this.$store.getters.tempCardCode||''}`
			}
		},

		computed: {},

		watch: {
			'$store.getters.tempCardCode': {
				handler: function(newer, older) { // 可以获取新值与老值两个参数
					this.clipboardText=`答题奖金${this.$store.getters.tempCardCode||''}`
				}
			}
		},

		created() {},

		mounted() {

		},

		destroyed() {},

		methods: {
			//复制微信
			copy_wx() {
				let clipboard = new Clipboard('.copy_wx')
				clipboard.on('success', e => {
					this.$toast('复制编码成功，请到爱用卡卡公众号粘贴')
					setTimeout(() => {
						location.href = 'wechat://';
					}, 1000)
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
				this.$refs.popup_award.ifShow = true
			},
			closePopup() {
				this.$emit('close')
			},
		}
	}
</script>

<style lang="less" scoped>
	.popup_award {
		.award-main {
			position: relative;
			width: 5.5rem;
			height: 7.7rem;
			background: #fff url('~assets/images/my/popup-award.png') no-repeat;
			background-size: 100%;
			border-radius: .15rem;
			text-align: center;
		}
		.popup-scroll {
			height: 5.5rem;
			padding: 0 .65rem;
			margin: 2.3rem auto 0;
			font-size: .28rem;
			overflow-y: auto;
		}
		.step {
			position: relative;
			font-size: .28rem;
			margin-bottom: 0.2rem;
			&::before {
				@allCenter();
				content: attr(step);
				position: absolute;
				top: 0;
				left: 0;
				width: .4rem;
				height: .4rem;
				background: url('~assets/images/my/step.png') no-repeat;
				background-size: 100%;
				color: #fff;
			}
			i {
				color: #FF2525;
			}
			p {
				/*padding-left: .5rem;*/
				font-weight: bold;
			}
			img {
				width: 2rem;
				height:2rem;
				margin: 0 auto;
			}
		}
		.stepBtn {
			@active();
			display: block;
			width: 2.3rem;
			height: .71rem;
			line-height: .6rem;
			margin: .2rem auto;
			margin-top: 0.2rem;
			background: url('~assets/images/btn/yellow.png') no-repeat;
			background-size: 100%;
			color: #fff;
			text-align: center;
		}
	}
</style>