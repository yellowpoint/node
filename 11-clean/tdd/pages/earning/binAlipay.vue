<template><!-- 提现 -->
	<view class="getmoney">
		<view class="getmoney-num">
			<view class="VPhone-phone">
				<image class="VPhone-icon" src="/static/earning/Alipay.png"></image>
				<view class="VPhone-name">支付宝账号</view>
			</view>
			<input class="VPhone-input" placeholder-style="fontSize:24upx" placeholder="请输入您的支付宝账号，手机号或邮箱" v-model="alipayCode" />
		</view>
		<view class="getmoney-verify">
			<VPhone ref="VPhone"  :alipayCode='alipayCode' :loginText="'绑定'" :type="3" phoneText="暂未绑定手机,请输入手机号" :loginBefore="loginBefore" :loginCB="loginCB">
				<view>
					<input class="VPhone-input alipayName" placeholder-style="fontSize:24upx" placeholder="请输入您的支付宝姓名(选填)" v-model="alipayName" />
				</view>
			</VPhone>
		</view>
		
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
				alipayCode:'',
				alipayName:''
			}
		},
		created() {
			

		},
		mounted() {
			console.log(this.$store.getters.userInfo);


		},
		methods: {

			loginBefore() {
				return true
			},
			loginCB(code) {
				this.$api.bindOrModifyAlipayAccount({
					alipayAccount: this.alipayCode,
					code: code,
					realName:this.alipayName
					
				})
				.then(res => {
					this.$toast("绑定成功")
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/earning/getMoney'
						});
					}, 1000)
				}).catch(err => {
					this.$toast("绑定失败")
				})
			}
		},
		watch: {

		},
	}
</script>

<style lang="scss">
	.VPhone-phone {
		display: flex;
		align-items: center;
		padding: 0 48upx;
		height: 123upx;
		}
		.VPhone-icon {
			width: 36upx;
			height: 36upx;
		}
		
		.VPhone-name {
			width: 200upx;
			font-size: 28upx;
			margin-left: 40upx;
		}
		
		.VPhone-input {
			width: 500upx;
			margin: 0 0 40upx 124upx;
		}
		.getmoney-num{
			border-bottom: 20upx solid #f5f5f5;
			border-top: 20upx solid #f5f5f5;
			}
		.alipayName{
			margin: 20upx 48upx;
			width: 710upx;
		}
		

	
</style>

