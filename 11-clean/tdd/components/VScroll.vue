<!-- 局部滚动组件 h5用的是better-scroll；外部可以用VScroll来控制样式 -->
<!-- 需要上拉加载则需要传入pullup和vScrollData(为了数据变化后的重新初始化以及控制是否加载等)，再监听scrollToEnd做业务处理，如 <VScroll pullup @scrollToEnd="loadMore" :vScrollData="goodsList"> -->

<template>
	<block>
		<!-- #ifdef H5 -->
		<div class="VScroll" ref="wrapper">
			<div>
				<slot></slot>
			</div>
			<cmdTransition name="fly">
				<div class="goTop" v-show="goTop_show" @click="goTop_func">
					<image src="/static/common/goTop.png" mode="widthFix"></image>
				</div>
			</cmdTransition>
		</div>
		<!-- #endif -->

		<!-- #ifdef MP -->
		<scroll-view scroll-y :scroll-top="scrollTop" @scroll="scrollViewScrollFunction">
			<slot></slot>
		</scroll-view>
		<!-- #endif -->
	</block>
</template>



<script>
	import cmdTransition from "@/components/cmd-transition/cmd-transition.vue"
	import BScroll from 'better-scroll'
	export default {
		components: {
			cmdTransition
		},
		data() {
			return {
				goTop_show: false
			}
		},
		props: {
			/**
			 * 1 滚动的时候会派发scroll事件，会截流。
			 * 2 滚动的时候实时派发scroll事件，不会截流。
			 * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
			 */
			probeType: {
				type: Number,
				default: 3
			},
			/**
			 * 点击列表是否派发click事件
			 */
			click: {
				type: Boolean,
				default: true
			},
			/**
			 * 是否开启横向滚动
			 */
			scrollX: {
				type: Boolean,
				default: false
			},
			/**
			 * 是否开启纵向滚动
			 */
			scrollY: {
				type: Boolean,
				default: true
			},
			/**
			 * 是否派发滚动事件
			 */
			listenScroll: {
				type: Boolean,
				default: false
			},
			/**
			 * 列表的数据
			 */
			vScrollData: {
				type: Array,
				default: () => {
					return []
				}
			},
			/**
			 * 是否派发滚动到底部的事件，用于上拉加载
			 */
			pullup: {
				type: Boolean,
				default: false
			},
			/**
			 * 是否派发顶部下拉的事件，用于下拉刷新
			 */
			pulldown: {
				type: Boolean,
				default: false
			},
			/**
			 * 是否派发列表滚动开始的事件
			 */
			beforeScroll: {
				type: Boolean,
				default: false
			},
			/**
			 * 当数据更新后，刷新scroll的延时。
			 */
			refreshDelay: {
				type: Number,
				default: 20
			},
			scrollTop: {
				type: Number,
				default: 0
			},
			// 显示回到顶部的按钮，以及出现的距离，默认开启且距离为1000，关闭就传0
			goTop: {
				type: Number,
				default: 1000
			},


		},
		mounted() {
			// 保证在DOM渲染完毕后初始化better-scroll
			setTimeout(() => {
				this._initScroll()
			}, 20)
		},
		methods: {
			_initScroll() {
				if (!this.$refs.wrapper) {
					return
				}
				// better-scroll的初始化
				this.scroll = new BScroll(this.$refs.wrapper, {
					probeType: this.probeType,
					click: this.click,
					scrollX: this.scrollX,
					scrollY: this.scrollY,
					//开启鼠标滚动
					mouseWheel: true
				})
				
				// 显示回到顶部的按钮
				if (this.goTop) {
					this.scroll.on('scroll', (pos) => {
						let distance = this.goTop 
						if (pos.y < -distance) {
							this.goTop_show = true
						} else {
							this.goTop_show = false
						}
					})
				}

				// 是否派发滚动事件
				if (this.listenScroll) {
					let me = this
					this.scroll.on('scroll', (pos) => {
						me.$emit('scroll', pos)
					})
					this.scroll.on('scrollEnd', (pos) => {
						me.$emit('scrollEnd', pos)
					})

				}

				// 是否派发滚动到底部事件，用于上拉加载
				if (this.pullup) {
					this.scroll.on('scrollEnd', () => {
						// 滚动到底部
						if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
							this.$emit('scrollToEnd')
						}
					})
				}

				// 是否派发顶部下拉事件，用于下拉刷新
				if (this.pulldown) {
					this.scroll.on('touchend', (pos) => {
						// 下拉动作
						if (pos.y > 50) {
							this.$emit('pulldown')
						}
					})
				}

				// 是否派发列表滚动开始的事件
				if (this.beforeScroll) {
					this.scroll.on('beforeScrollStart', () => {
						this.$emit('beforeScroll')
					})
				}
			},
			disable() {
				// 代理better-scroll的disable方法
				this.scroll && this.scroll.disable()
			},
			enable() {
				// 代理better-scroll的enable方法
				this.scroll && this.scroll.enable()
			},
			refresh() {
				// 代理better-scroll的refresh方法
				this.scroll && this.scroll.refresh()
			},
			scrollTo() {
				// 代理better-scroll的scrollTo方法
				this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
			},
			scrollToElement() {
				// 代理better-scroll的scrollToElement方法
				this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
			},
			scrollViewScrollFunction(e) {
				this.$emit('scroll', e)
			},
			goTop_func() {
				this.scrollTo(0, 0, 500)
			}
		},

		watch: {
			// 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
			vScrollData(newValue, oldValue) {
				setTimeout(() => {
					this.refresh()
				}, this.refreshDelay)
			},
			scrollTop(newV) {
				this.scrollTo(0, -newV, 500)
			},

		}
	}
</script>

<style lang="scss" scoped>
	.VScroll {
		position: absolute;
		// top: 434upx !important;
		bottom: 50px;
		left: 0;
		right: 0;
		overflow: hidden;

		.goTop {
			position: absolute;
			bottom: 100upx;
			right: 20upx;
			width: 72upx;
			height: 72upx;

			image {
				width: 100%;
			}
		}
	}
</style>
