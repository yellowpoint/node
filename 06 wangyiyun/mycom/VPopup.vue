<!--公共弹窗组件-->
<template>

	<div class="vPopup" :class="{noAnimation:noAnimation}" @touchmove.prevent>
		<!--为了实现半透明的背景与核心内容不同的动画效果，分成了两个并行的div，
		最外层的popup还是用了定位方便整体控制，为了防止popup的存在挡住了非弹窗原页面的点击事件，故将其pointer-events: none;其子元素设为pointer-events: all;-->
		<transition name='fade'>
			<div v-if="ifShow" class="popup-mask"></div>
		</transition>
		<transition name='bounceUp'>
			<div v-if="ifShow" class="popup-main" @click.self="close">
				<slot></slot>
				<div v-if="getMoneyShow" class="popup-get-money" @click="getMoney">领取奖金</div>
				<div v-if="!getMoneyShow&&isCanClosePopup" class="popup-close" @click="close"></div>
			</div>
		</transition>
	</div>

</template>

<script>
	export default {

		name: 'VPopup',

		mixins: [],

		components: {},

		props: {
			getMoneyShow: {
				type: Boolean,
				default: false,
			},
			//能否关闭弹窗
			isCanClosePopup: {
				type: Boolean,
				default: true,
			},
			//不用弹窗动画
			noAnimation: {
				type: Boolean,
				default: false,
			},
		},

		data() {
			return {
				ifShow: false
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
			close() {
				this.$emit('close')
				if(!this.isCanClosePopup) {
					return
				}
				this.ifShow = false;

			},
			getMoney(e) {
				this.$emit('tap', e);
			}
		}
	}
</script>

<style lang="less" scoped>
	.vPopup {
		/*.bounceUp-enter-active,
		.bounceInUp,
		.bounceUp-leave-active,
		.bounceOutUp {
			-webkit-animation-duration: 1.5s;
			animation-duration: 1.5s;
			-webkit-animation-fill-mode: both;
			animation-fill-mode: both;
		}*/
		&.noAnimation {
			.bounceUp-enter-active,
			.bounceUp-leave-active,
			.fade-enter-active,
			.fade-leave-active {
				animation: null;
			}
		}
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 600;
		pointer-events: none;
		.popup-mask {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 1;
			background: rgba(0, 0, 0, .6);
			pointer-events: all;
		}
		.popup-main {
			@allCenter();
			flex-direction: column;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 2;
			pointer-events: all;
		}
		.popup-close {
			width: .78rem;
			height: .78rem;
			margin-top: .5rem;
			background: url('~assets/images/btn/close.png') no-repeat;
			background-size: 100%;
		}
		.popup-get-money {
			width: 4.2rem;
			height: 1.0rem;
			font-size: 0.4rem;
			text-align: center;
			line-height: 0.8rem;
			font-family: PingFang-SC-Bold;
			font-weight: bold;
			color: rgba(255, 255, 255, 1);
			text-shadow: 0px 2px 7px rgba(228, 135, 0, 1);
			margin-top: .5rem;
			background: url('~assets/images/btn/withdrawal.png') no-repeat;
			background-size: 100% 100%;
		}
		/*用了transtion后，这个类名对外层父级上用改类名的元素就没作用了，蛋疼*/
		.popup-scroll {
			overflow-y: auto;
		}
	}
</style>