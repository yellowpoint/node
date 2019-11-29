<!-- 带tab的商品列表 -->
<template>
	<view class="VTabgoods">
		<VTabhead ref="VTabhead" @changeTab="changeTab" :VTabhead_act="VTabhead_act" :VTabhead_list="VTabhead_list"></VTabhead>
		<VGoods :goodsList="goodsList[VTabhead_act]"></VGoods>
		<uniLoadMore :status="VTabhead_list[VTabhead_act].loadingType"></uniLoadMore>
	</view>
</template>

<script>
	import VTabhead from "@/components/VTabhead"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			VTabhead,
			uniLoadMore
		},
		data() {
			return {
				goodsList: [
					[]
				],
				tabAct: 0,
				goodsList_params: {
					query: "男装",
					sort: "price_des",
					pageNum: 1,
					pageSize: 10
				},
			}
		},
		props: {
			goodsList_params_label: {
				type: Object,
				default: () => {
					return {}
				}
			},
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
			this.tabAct = this.VTabhead_act
			this.$set(this.goodsList_params, 'query', this.goodsList_params_label.val)
			this.$set(this.goodsList_params, 'commodityConfigId', this.goodsList_params_label.id)
			this.loadData()

		},
		methods: {

			loadData() {

				return new Promise(async (resolve, reject) => {
					this.setParams()
					let VTabhead_item = this.VTabhead_list[this.tabAct]
					//如果是正在加载或是没有更多了则不再请求
					if (VTabhead_item.loadingType === 'loading' || VTabhead_item.loadingType === 'noMore') {
						//防止重复加载
						return;
					}

					VTabhead_item.loadingType = 'loading';

					let goodsList = (await this.$api.getBeInCommonUseQuery(this.goodsList_params)).data
					if (!this.goodsList[this.tabAct]) {
						this.$set(this.goodsList, this.tabAct, [])
					}
					if (!goodsList || !goodsList.length) {
						VTabhead_item.loadingType = 'noMore';
						return
					}
					this.goodsList[this.tabAct].push(...goodsList)
					//判断是否还有数据， 有改为 more， 没有改为noMore 
					// 来自淘宝的接口可能出现某一页数量不足了，但下一页还有数据的情况，故只按照有没有数据来判断
					
					VTabhead_item.loadingType = 'more';
					VTabhead_item.pageNum++
					resolve()



				})


			},
			changeTab({
				index,
				VTabhead_list
			}) {
				if (this.tabAct == index && index == 0) {
					return
				}

				this.$emit('changeTab_tab', {
					index,
					VTabhead_list
				})

				//点击已选中的选项时，切换排序，要将数据和page清空
				if (this.tabAct == index) {
					this.$set(this.goodsList, index, [])
				}
				this.tabAct = index;
				// 当这个选项没有数据或为空的时候才请求
				if (!this.goodsList[index] || this.goodsList[index].length == 0) {
					this.loadData()
				}

			},
			async loadMore() {

				await this.loadData()
				return this.goodsList[this.tabAct]
			},
			setParams() {
				let sort = this.VTabhead_list[this.tabAct].sort
				let pageNum = this.VTabhead_list[this.tabAct].pageNum
				if (this.tabAct == 0) {
					this.$set(this.goodsList_params, 'sort', '')
				} else if (this.tabAct == 1) {
					if (sort) {
						this.$set(this.goodsList_params, 'sort', 'price_asc')
					} else {
						this.$set(this.goodsList_params, 'sort', 'price_des')
					}

				} else if (this.tabAct == 2) {
					if (sort) {
						this.$set(this.goodsList_params, 'sort', 'total_sales_asc')
					} else {
						this.$set(this.goodsList_params, 'sort', 'total_sales_des')
					}
				}
				this.$set(this.goodsList_params, 'pageNum', pageNum)
			},

		},

	}
</script>

<style lang="scss">
	.VTabgoods {
		.VTabgoods-header {
			display: flex;
			align-items: center;
			justify-content: space-around;
			width: 100%;
			height: 90upx;
			padding: 0 120upx;
			border-bottom: 1px solid #F2F2F2;
			background: #fff;
			font-weight: bold;

			.vh-item {
				&.act {
					color: #BF3627;
				}
			}
		}

		.VGoods {
			padding-top: 20upx;
		}
	}
</style>
