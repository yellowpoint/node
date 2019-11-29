<template><!-- 公共弹窗-->
	<view class="VPop" >
		<view class='pop pop-window'>
			<view class='mask' @click='closePop'></view>
			<slot></slot>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
			}
		},
		mounted() {

		},
		methods: {
			closePop(){
				this.$emit('closePop')
			}
			
		}
	}
</script>

<style lang="scss">
	
</style>
