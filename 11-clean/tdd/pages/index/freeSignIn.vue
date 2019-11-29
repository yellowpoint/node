<!-- 0元购的邀请注册页面 -->
<template>
	<view class="freeSignIn">
		<image class="f-header" src="/static/index/freeToBuy/header.png" mode="widthFix"></image>
		<view class="f-main">
			<!-- <view class="f-times">1</view> -->
			<view class="f-form">
				<!-- 要能tab切换 回车提交 -->
				<view class="ff-input">
					<view class="ffi-icon">
						<image src="/static/index/freeToBuy/signIn/phone.png" mode="widthFix"></image>
					</view>
					<input type="number" maxlength="11" placeholder="请输入手机号码" v-model="phone" />
				</view>
				<view class="ff-input">
					<view class="ffi-icon">
						<image src="/static/index/freeToBuy/signIn/imgCode.png" mode="widthFix"></image>
					</view>
					<input  maxlength="4" placeholder="请输入验证码" v-model="imgCode" />
					<img :src="imgUrl" alt="" @click='changeImgCode' class='imgCode'>
					<!-- <view v-if='!showCodeTime' class="ffi-getCode" @click="getCode">获取验证码</view>
					<view v-if='showCodeTime' class="ffi-getCode">{{countDown}}s后重发</view> -->
				</view>
				<view class="ff-input">
					<view class="ffi-icon">
						<image src="/static/index/freeToBuy/signIn/code.png" mode="widthFix"></image>
					</view>
					<input type="number" maxlength="6" placeholder="请输入验证码" v-model="code" />
					<view v-if='!showCodeTime' class="ffi-getCode" @click="getCode">获取验证码</view>
					<view v-if='showCodeTime' class="ffi-getCode">{{countDown}}s后重发</view>
				</view>
				<view class="ff-input">
					<view class="ffi-icon">
						<image src="/static/index/freeToBuy/signIn/invite.png" mode="widthFix"></image>
					</view>
					<input type="text" placeholder="可输入邀请码" v-model="inviteCode" />
				</view>
				<view class="ff-submit" @click="submit">登录/注册</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				phone: '',
				code: '',
				inviteCode: '',
				countDown: 60,
				showCodeTime: false,
				isCanLogin: false,
				imgUrl:'',
				imgCode:'',
				random:''
			}
		},
		props: {
			propName: {
				type: Number,
				default: 0
			},
		},
		onLoad(params) {
			this.inviteCode = params.inviteCode || ''
			this.changeImgCode()
			console.log(this.inviteCode)
		},
		methods: {
			async getCode() { //获取验证码

				let status = this.$common.isPhoneNumber(this.phone);
				if(!status){
					this.$toast("请填写正确的手机号");
					return;
				}
				if(!this.$common.isImgCode(this.imgCode)){
					this.$toast("请填写正确的图形验证码");
					return;
				}
					let res = await this.$api.getCode({
						phone: this.phone,
						smsTypeEnum: 'PHONE_REGISTER_OR_LOGIN',
						random:this.random,
						code:this.imgCode
					})
					
					this.$toast("验证码发送成功");
					this.coutdown();

			},
			coutdown() { //倒计时
				this.showCodeTime = true;
				let timer = setInterval(() => {
					if (this.countDown == 1) {
						clearInterval(timer);
						this.showCodeTime = false;
					} else {
						this.countDown--;
					}
				}, 1000)
			},
			async submit() {

				let phoneStatus = this.$common.isPhoneNumber(this.phone);
				let codeStatus = this.$common.isCode(this.code);
				if (!phoneStatus) {
					this.$toast("请填写正确的手机号");
					return;
				}
				if (!codeStatus) {
					this.$toast("请填写正确的短信验证码");
					return;
				}
				

				let res = await this.$api.phoneRegisterLogin({
					phone: this.phone,
					verifCode: this.code,
					activateChannels: 'HTML5',
					byInvitationCode: this.inviteCode

				})
				this.$toast("登录成功");
				this.$store.dispatch('userInfo', res.data);
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/forIos/downLoadApp'
					});
				}, 1000)
			},
			changeImgCode(){
				let data=this.$common.getImgCode()
				this.imgUrl=data.imgUrl;
				this.random=data.random;
			}

		},
		watch: {
			phone(newValue, oldValue) {
				if (this.$common.isCode(this.code) && this.$common.isPhoneNumber(this.phone)) {
					this.isCanLogin = true
				}
			},
			code(newValue, oldValue) {
				if (this.$common.isCode(this.code) && this.$common.isPhoneNumber(this.phone)) {
					this.isCanLogin = true
				}
			}

		},
	}
</script>

<style lang="scss">
	image {
		width: 100%;
	}

	page {
		background: #F7302D;
	}
	.f-header{
		height: 680upx;
	}
	.f-main {
		position: relative;
		z-index: 2;
		height: 860upx;
		margin-top: -220upx;
		background: url(/static/index/freeToBuy/signIn/bg.png) no-repeat;
		background-size: 100%;
		font-size: 24upx;
		overflow: hidden;

		.f-times {
			@include allCenter;
			position: absolute;
			top: 50upx;
			right: 300upx;
			width: 70upx;
			height: 30upx;
			color: #fff;
			font-size: 38upx;
			font-weight: bold;
		}

		.f-form {
			width: 450upx;
			margin: 86upx auto 0;
		}

		.ff-input {
			display: flex;
			align-items: center;
			width: 450upx;
			height: 76upx;
			margin-top: 30upx;
			background: rgba(255, 255, 255, 1);
			border-radius: 38upx;

			.ffi-icon {
				@include allCenter;
				width: 92upx;
				height: 32upx;
				border-right: 2upx solid #999;

				image {
					width: 30upx;
					height: 30upx;
				}
			}

			input {
				flex: 1;
				height: 32upx;
				padding: 0 20upx;
				font-size: 26upx;
			}

			.ffi-getCode {
				@include allCenter;
				width: 160upx;
				height: 76upx;
				color: #fff;
				background: linear-gradient(0deg, rgba(31, 31, 31, 1), rgba(94, 94, 94, 1));
				border-radius: 0 38upx 38upx 0;
			}
		}

		.ff-submit {
			@include allCenter;
			@include active;
			width: 450upx;
			height: 82upx;
			margin: 50upx auto 0;
			border-radius: 41upx;
			background: url(/static/index/freeToBuy/signIn/btn.png) no-repeat;
			background-size: 100%;
			color: #fff;
			font-size: 30upx;
			font-weight: bold;
			overflow: hidden;
		}
		.imgCode{
			@include allCenter;
			width: 160upx;
			height: 76upx;
			color: #fff;
			border-radius: 0 38upx 38upx 0;
		}
	}
</style>
