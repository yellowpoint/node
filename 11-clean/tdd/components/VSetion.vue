<template>
	<view class="cate-section">
		<view class="cate-item" :class="{flex1:!scale}" :style='{width:scale}' v-for="(item, index) in List " :key="index" @click="jump(item,index)">
			<image :src="item.imageUrl"></image>
			<text>{{item.configVal||item.val}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		computed:{
		},
		props: {
			List: {
				type: Array,
				default: ()=>{
					return []
				}
			},
			// 传入按钮宽度比例,未传入就是均分
			scale:{
				type: String,
				default: ''
			}
		},
		methods: {
			jump(item,index){
				// 将角标也一并传出
				item = Object.assign({},item,{itemIndex:index})
				this.$emit("jump",item)
			}
		}
	}
</script>

<style lang="scss">
	/* 分类 */
	.cate-section {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		padding: 0 22upx 0;
		background: #fff;
		.cate-item {
			@include active;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			margin-bottom: 30upx;
			background:#fff;
			&.flex1{
				flex: 1;
			}
			overflow: hidden;
		}
	
		image {
			width: 96upx;
			height: 96upx;
			margin-bottom: 14upx;
		}
	}
</style>
