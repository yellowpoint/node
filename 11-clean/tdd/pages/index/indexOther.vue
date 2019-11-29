<template>
	<view class="indexOther">


		<VScroll ref="VScroll" pullup @scrollToEnd="loadMore" :vScrollData="goodsList" @scroll="VScroll_scroll" @scrollEnd="VScroll_scrollEnd" listenScroll :probeType="3">

			<!-- 二级分类 -->
			<swiper-vue class="navList" :options="swiperOption">
				<swiper-vue-slide v-for="(item, index) in navList " :key="index" class="navList-item">
					<VSetion :List='item' :scale='"20%"' @jump='navListJump'></VSetion>
				</swiper-vue-slide>

			</swiper-vue>

			<VTabgoods ref="VTabgoods" :VTabhead_list="VTabhead_list" :VTabhead_act="VTabhead_act" :goodsList_params_label="label" @changeTab_tab="changeTab_tab" ></VTabgoods>

		</VScroll>
		<VTabhead v-show="VTabhead_show" :VTabhead_list="VTabhead_list" :VTabhead_act="VTabhead_act" @changeTab="changeTab"></VTabhead>
	</view>
</template>
<script>
	import VTabgoods from "@/components/VTabgoods"
	import VTabhead from "@/components/VTabhead"
	import VSetion from "@/components/VSetion"
	import VTitleSort from "@/components/VTitleSort"
	export default {
		components: {
			VTabgoods,
			VTabhead,
			VSetion,
			VTitleSort,
		},
		data() {
			return {
				// 给VSroll来更新用的
				goodsList: [],
				VTabhead_show: false,
				// 上面导航分类
				navList: [],
				// 下面选项卡头部选中的index
				VTabhead_act: 0,
				// 下面选项卡头部列表;sort:true为升序（由小到大_asc）、false为降序（由大到小_des）；loadingType：三种状态more、loading、nomore
				VTabhead_list: [{
						text: '推荐',
						loadingType: 'more',
						pageNum: 1,
						sort: true,
						dataList: []
					},
					{
						text: '券后价',
						loadingType: 'more',
						pageNum: 1,
						sort: true,
						dataList: []
					},
					{
						text: '销量',
						loadingType: 'more',
						pageNum: 1,
						sort: false,
						dataList: []
					},
				],
				// 轮播参数
				swiperOption: {
					loop: false,
					observer: true,
					observeParents: true,
					dynamicBullets: true,
				}
			};
		},
		props: {
			// 首页传入的分类标签，如男装以及其对应的id
			label: {
				type: Object,
				default: () => {
					return {}
				}
			},
		},
		created() {
			this.getNavList()
		},
		mounted() {

		},
		methods: {
			async getNavList() {

				let dataBox = (await this.$api.getByParentIdList({
					parentId: this.label.id
				})).data
				// 将二级分类的数据分割为10个一组，方便做轮播
				for (let i = 0, len = dataBox.length; i < len; i += 10) {
					this.navList.push(dataBox.slice(i, i + 10));
				}
			},
			loadMore() {
				this.$refs.VTabgoods.loadMore().then(res => {
					this.goodsList = JSON.parse(JSON.stringify(res))
				})

			},

			VScroll_scroll(e) {
				// 动态获取tab头部距离顶部的距离
				let top = this.$refs.VTabgoods.$refs.VTabhead.$el.getBoundingClientRect().top
				//获取滚动区域距离顶部的距离，兼容不同宽度下的不同距离
				let VScroll_top =  this.$common.getElementTop(this.$refs.VScroll.$el)
				if (top <= VScroll_top) {
					this.VTabhead_show = true
				} else {
					this.VTabhead_show = false
				}
				this.$emit('scroll', e)
			},
			VScroll_scrollEnd(pos){
				this.$emit('scrollEnd', pos)
			},
			changeTab(e) {
				this.$refs.VTabgoods.changeTab(e)
			},
			changeTab_tab({
				index,
				VTabhead_list
			}) {

				this.VTabhead_act = index
				this.VTabhead_list = VTabhead_list

			},
			navListJump(item) {
				this.$store.dispatch('searchObject', item)
				uni.switchTab({
					url: `/pages/search/search`
				})
			}

		},


	}
</script>

<style lang="scss">
	.VScroll {
		top: 0;
		bottom: 0;
	}

</style>
