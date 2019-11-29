<!-- 绑定手机 -->
<template>
	<view class="bindPhone">
		<VPhone :type="2"></VPhone>
	</view>
</template>

<script>
	import VPhone from "@/components/VPhone"
	export default {
		components: {
			VPhone
		},
		data() {
			return {

			}
		},
		props: {

		},
		onLoad() {


		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.bindPhone {
		border-top: 20upx solid #f5f5f5;
	}
</style>
