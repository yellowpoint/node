<!-- 分类页面 -->
<template>
	<view class="category">
		<VScroll class="left-aside">
			<view v-for="(item,index) in flist" :key="item.id" class="f-item" :class="{active: index === currentId}" @click="tabtap(index)">
				{{item.val}}
			</view>
		</VScroll>
		<VScroll class="right-aside" :vScrollData="slist[currentId]">
			<view class="s-list" v-if="slist[currentId]&&slist[currentId].length>0">
				<text class="s-item">{{flist[currentId].val}}</text>
				<view class="t-list">
					<view class="t-item" v-for="(sitem,sindex) in slist[currentId]" :key="sindex" @click="navToList(sitem)">
						<image :src="sitem.imageUrl"></image>
						<text>{{sitem.val}}</text>
					</view>
				</view>
			</view>
		</VScroll>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentId: 0,
				flist: [],
				slist: [],
			}
		},
		onLoad() {
			this.loadData();
		},
		methods: {
			async loadData() {
				this.flist = (await this.$api.getFirstClassList()).data;
				this.getSecondList()

			},
			//一级分类点击
			tabtap(index) {
				this.currentId = index;
				this.getSecondList()
			},
			// 获取二级分类的数据
			async getSecondList() {
				// 存在就不去请求了
				if (this.slist[this.currentId]) {
					return
				}
				let data = (await this.$api.getByParentIdList({
					parentId: this.flist[this.currentId].id
				})).data
				this.$set(this.slist, this.currentId, data)
			},

			navToList(item) {
				this.$store.dispatch('searchObject', item)
				uni.switchTab({
					url: `/pages/search/search`
				})
			},
		}
	}
</script>

<style lang='scss'>
	page{
		background: #fff;
	}
	.category {
		display: flex;
		.VScroll{
			top: 0;
			bottom: 0;
		}
	}

	.left-aside {
		width: 150upx;
		background-color: #fff;
	}

	.f-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 108upx;
		margin-bottom: 4upx;
		font-size: 28upx;
		color: $font-color-base;
		background: #EDEDED;
		position: relative;

		&.active {
			color: $base-color;
			background: #fff;

			&:before {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				height: 36upx;
				width: 8upx;
				background-color: $base-color;
				border-radius: 0 4px 4px 0;
				opacity: .8;
			}
		}
	}

	.right-aside {
		left: 150upx;
		padding: 0 40upx;
	}

	.s-item {
		display: flex;
		align-items: center;
		height: 70upx;
		padding: 8upx 0 0 30upx;
		font-size: 28upx;
		color: $font-color-dark;
		font-weight: bold;
	}

	.t-list {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		background: #fff;
		padding-top: 12upx;

		&:after {
			content: '';
			flex: 99;
			height: 0;
		}
	}

	.t-item {
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 33.333%;
		font-size: 24upx;
		color: #333;
		padding-bottom: 20upx;

		image {
			width: 120upx;
			height: 120upx;
		}
	}
</style>
