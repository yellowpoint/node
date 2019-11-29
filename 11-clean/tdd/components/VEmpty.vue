<!-- 无数据时的展示，可传入图片地址 img -->
<template>
	<view class="VEmpty">
		<image class="VEmpty-image" :src="img" mode="aspectFit"></image>
	</view>
</template>

<script>
	export default {
		props: {
			img: {
				type: String,
				default: '/static/common/empty.png'
			},
		},

		data() {
			return {

			}
		},

		computed: {

		}
	}
</script>

<style lang="scss">
	.VEmpty {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 50upx;
		&-image {
			width: 270upx;
			height: 324upx;
			// margin: 40upx auto;
		}
	}
	
</style>
