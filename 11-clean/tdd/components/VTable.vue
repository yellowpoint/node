<template>
	<view class="scrollBox" >
		<scroll-view class="VTable" ref="VTable" :class="tabClass" :style="tabStyle" scroll-with-animation scroll-x
		 :scroll-left="scrollLeft">

			<view class="VTable-item" ref="Vitem" :class="[index === tabCur ? selectClass + ' cur':'']" v-for="(item,index) in tabList"
			 :key="index" @tap="tabSelect(index,$event)">
				<span>{{item.val}}</span>
			</view>

		</scroll-view>
	</view>
</template>
<script>
	export default {
		name: 'VTable',
		data() {
			return {
				scrollLeft: 0
			};
		},
		props: {
			tabList: {
				type: Array,
				default () {
					return [];
				}
			},
			tabCur: {
				type: Number,
				default () {
					return 0;
				}
			},
			tabClass: {
				type: String,
				default () {
					return '';
				}
			},
			tabStyle: {
				type: String,
				default () {
					return '';
				}
			},
			selectClass: {
				type: String,
				default () {
					return '';
				}
			}
		},
		methods: {
			tabSelect(index, e) {
				if (this.currentTab === index) return false;
				this.$emit('update:tabCur', index);
				this.$emit('change', index);
				this.scrollXCenter(index)
			},
			// 设置滚动条，让选中的在中间
			scrollXCenter(index) {
				if (!this.$refs.Vitem) {
					return
				}
				let item = this.$refs.Vitem[index].$el;
				let itemOffset = item.offsetLeft;
				let container = this.$refs.VTable.$el;
				let centerLeft = (container.clientWidth - item.clientWidth) / 2;
				this.scrollLeft = itemOffset - centerLeft

			}
		},
		computed: {},
		watch: {
			tabCur(newValue, oldValue) {
				this.scrollXCenter(newValue)
			}
		},
	};
</script>
<style>
	/* 隐藏首页横向滚动条 */
	.scrollBox {
		/* height: 88upx; */
		overflow: hidden;
	}

	.VTable {
		/* height: 102upx; */
		white-space: nowrap;
		margin: 0 10upx;
		width: calc(100% - 20upx);
	}

	.VTable-item {
		height: 66upx;
		display: inline-block;
		margin: 0 20upx 20upx;
		padding: 18upx 0 0;
		border-bottom: 4upx solid transparent;
		color:rgba(51,51,51,1);
		transition: border-bottom-color .26s;

	}

	.VTable-item.cur {
		border-bottom-color: rgba(191,54,39,1);
		color:rgba(191,54,39,1);
	}
	.taobao-nav-box .VTable-item.cur{
		
		background:rgba(255,255,255,1);
		border-radius:34upx;
		font-size:28upx;
	}
	.taobao-nav-box .VTable-item.cur span{
		color:rgba(255,43,43,1);
	}
	.taobao-nav-box .VTable-item span{
		font-size:28upx;
		font-weight:500;
		color:rgba(255,255,255,1);
	}
	.taobao-nav-box {
		padding: 28upx 0 20upx;
		margin: 0 28upx;
	}
	.taobao-nav-box .VTable-item{
		border: 0 !important;
		padding: 10upx 26upx;
		margin: 10upx 8upx 12upx;
		height: 100%;
	}
</style>
