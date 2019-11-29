<!-- 提现 -->
<template>
	<view class="getmoney" :class="{bodyLoading:showLoading}">
		<view class="getmoney-num">
			<image class="getmoney-num-icon" src="/static/earning/money.png"></image>
			<!-- pattern="[0-9]*" 由于uni封装了 这个就无效了 -->
			<input class="getmoney-num-input" type="number" :placeholder="placeholder" v-model="money" />
			<view class="getmoney-num-all" @click="allMoney">全部</view>
			<view class="getmoney-num-tips">每笔提现最低额度{{minimum}}元</view>
		</view>
		<view class="getmoney-verify">
			<VPhone ref="VPhone"  :type='1' loginText="提现" :repeat='repeat' phoneText="暂未绑定手机,请输入手机号" :loginBefore="loginBefore" :loginCB="loginCB">
				<VPay :alipayAccount='alipayAccount'></VPay>
			</VPhone>
		</view>
	</view>
</template>

<script>
	import VPhone from "@/components/VPhone"
	import VPay from "@/components/VPay"
	export default {
		components: {
			VPhone,
			VPay
		},
		data() {
			return {
				money: '',
				userInfo: this.$store.getters.userInfo,
				userMoney: -1,
				minimum: 10,
				showLoading: true,
				placeholder:`可提现金额999元`,
				alipayAccount:"",
				repeat:true,
				type:1 //1是现金余额，2是红包余额
			}
		},
		created() {

		},
		onLoad(options) {
			this.type=options.type?options.type:1;
		},
		async mounted() {
			if (!this.$commonLogic.verifyLogin()) {
				return
			}

			await Promise.all([this.getMinimum(), this.getUserMoney()])
			this.showLoading = false
			this.placeholder = `可提现金额${this.userMoney}元`
			this.$refs.VPhone.phone = this.userInfo.phone || ''


		},
		methods: {
			// 获取最低提现额度
			async getMinimum() {
				this.minimum = +(await this.$api.getByType({
					configEnum: 'MINIMUM_WITHDRAWAL_AMOUNT'
				})).data[0].configVal
				
			},
			async getUserMoney() {
				let res=await this.$api.getWithdrawDepositVo({
					withdrawalType:this.type
				});
				
				this.userMoney = res.data.balance
				this.alipayAccount=res.data.alipayAccount;
			},
			loginBefore() {
				if (!this.money) {
					this.$toast("请输入金额")
					return false
				}
				if (this.money > this.userMoney) {
					this.$toast("超过了可用金额")
					this.money = ''
					return false
				}
				if (this.money < this.minimum) {
					this.$toast(`每笔提现最低额度${this.minimum}元`)
					this.money = ''
					return false
				}
				return true
			},
			loginCB(code) {
				this.repeat=false
				if(!this.alipayAccount){
					this.$toast("请先绑定支付宝账号")
					return
				}
				this.$api.doWithdrawDeposit({
					amount: this.money,
					verifCode: code,
					gatheringWay:2,
					withdrawalType:this.type
				}).then(res => {
					this.$toast("提现成功")
					setTimeout(() => {
						uni.navigateTo({
							url: `/pages/earning/getMoneyResult?type=${this.type}`
						});
						this.repeat=true;
					}, 1000)
				}).catch(err => {
					this.$toast("提现失败")
				})

			},
			allMoney() {
				this.money = this.userMoney
			}

		},
		watch: {

		},
	}
</script>

<style lang="scss">
	.getmoney {

		.getmoney-num {
			display: flex;
			flex-wrap: wrap;
			height: 200upx;
			padding: 30upx 44upx 20upx;
			border-top: 20upx solid #f5f5f5;
			background: #fff;

			.getmoney-num-icon {
				width: 41upx;
				height: 52upx;
			}

			.getmoney-num-input {
				width: 400upx;
				height: 50upx;
				line-height: 50upx;
				margin-left: 36upx;
			}

			.getmoney-num-all {
				@include allCenter;
				width: 100upx;
				height: 50upx;
				color: #E1472E;
				margin-left: auto;
				font-size: 28upx;
				font-weight: bold;
			}

			.getmoney-num-tips {
				width: 100%;
				margin-left: 78upx;
				color: #E1472E;
				font-size: 22upx;
			}
		}

		.getmoney-verify {
			border-top: 20upx solid #f5f5f5;


		}


	}
</style>
