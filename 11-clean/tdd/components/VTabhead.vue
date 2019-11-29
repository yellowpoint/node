<!-- 带tab的商品列表 顶部 -->
<template>
	<view class="VTabhead">
		<view class="VTabgoods-header">
			<view class="vh-item" :class="{act :VTabhead_act==index}" v-for="(item,index) of VTabhead_list" :key="index" @click="changeTab(index)">{{item.text}}
				<block v-if="index!=0">
					<view class='vh-icon' :class="{down:!item.sort}"></view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			VTabhead_list: {
				type: Array,
				default: () => {
					return []
				}
			},
			VTabhead_act: {
				type: Number,
				default: 0
			},
		},
		created() {

		},
		mounted() {


		},
		methods: {

			changeTab(index) {

				if (this.VTabhead_act == index) {
					// 第一个选项不做排序
					if (index == 0) {
						return;
					}
					this.$set(this.VTabhead_list[index], 'sort', !this.VTabhead_list[index].sort)
					this.$set(this.VTabhead_list[index], 'pageNum', 1)
					this.$set(this.VTabhead_list[index], 'loadingType', 'more')
				}
				this.$emit('changeTab', {
					index: index,
					VTabhead_list: this.VTabhead_list
				})
			},

		},

	}
</script>

<style lang="scss">
	.VTabhead {
		position: relative;
		z-index: 9999;

		.VTabgoods-header {
			display: flex;
			align-items: center;
			justify-content: space-around;
			width: 100%;
			height: 90upx;
			padding: 0 40upx;
			border-bottom: 1px solid #F2F2F2;
			background: #fff;
			font-weight: bold;

			&.fixed {
				position: absolute;
				top: 170upx;
				left: 0;
				z-index: 9999;
			}

			.vh-item {
				position: relative;
				flex: auto;
				@include allCenter();
				width: 0;
				height: 100%;

				&.act {
					color: #BF3627;

					.vh-icon {
						border-color: transparent transparent #BF3627 transparent;
					}
				}

				.vh-icon {
					margin-left: 8upx;
					width: 0;
					height: 0;
					border-style: solid;
					border-width: 0 8upx 13.9upx 8upx;
					border-color: transparent transparent #999 transparent;
					transition: transform .26s;

					&.down {
						transform: rotate(180deg);
					}
				}


			}



		}
	}
</style>
