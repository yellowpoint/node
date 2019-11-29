<template>
	<view class="container">
		<view class="title" @click="goHome">
			<img src="/static/common/title.png" alt="">
		</view>
		<view class="input-content">
			<view class="input-item">
				<text class="tit">手机号码</text>
				<input type="number" v-model="mobile" placeholder="请输入手机号码" maxlength="11" data-key="mobile" />
			</view>
			<view class="input-item">
				<text class="tit">图形验证</text>
				<view class='code'>
					<input  v-model="imgCode" placeholder="请输入验证码" maxlength="4" />
					<img :src="imgUrl" alt="" @click='changeImgCode' class='imgCode'>
				</view>
			</view>
			<view class="input-item">
				<text class="tit">短信验证</text>
				<view class='code'>
					<input type="number" v-model="code" placeholder="请输入验证码" maxlength="6" data-key="code" />
					<text class='getCode' v-if='!showCodeTime' @click="getCode">获取验证码</text>
					<text class="timeOut" v-if='showCodeTime'>{{countDown}}s后重发</text>
				</view>
			</view>
		</view>
		<view class="confirm-btn" @click="login">登录</view>
		<!-- <view class='other' v-if='isWeiXin'>
			<view class='title'>通过第三方登录</view>
			<view class='icon-groups'>
				<text class='weixin' @click='wechat'></text>
			</view>
		</view> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				code: '',
				countDown: 60,
				showCodeTime: false,
				isWeiXin:true,
				imgUrl:'',
				imgCode:'',
				random:''
			}
		},
		onLoad() {
			if(this.$common.isWeiXin()){
				this.isWeiXin=true;
			}else{
				this.isWeiXin=false;
			}
			if(this.$store.getters.userInfo){
				uni.switchTab({
					url:'/pages/index/index'
				})
			}
			let obj = this.$common.urlParse();
			if (obj.code) {
				this.wechatLogin(obj.code);
			}
		
			this.changeImgCode()
		},
		methods: {
			async getCode() { //获取验证码

				let status = this.$common.isPhoneNumber(this.mobile);
				if(!status){
					this.$toast("请填写正确的手机号");
					return;
				}
				
				if(!this.$common.isImgCode(this.imgCode)){
					this.$toast("请填写正确的图形验证码");
					return;
				}
				let res = await this.$api.getCode({
					phone: this.mobile,
					smsTypeEnum: "LOGIN",
					random:this.random,
					code:this.imgCode
				})
				
				this.coutdown();
				this.$toast("验证码发送成功");
				

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
			async login() { //手机号登录
				let phoneStatus = this.$common.isPhoneNumber(this.mobile);
				let codeStatus = this.$common.isCode(this.code);
				if (!phoneStatus) {
					this.$toast("请填写正确的手机号");
					return;
				}
				if (!codeStatus) {
					this.$toast("请填写正确的短信验证码");
					return;
				}
				let res = await this.$api.login({
					phone: this.mobile,
					verifCode: this.code
				})
				if(res.data.userToken){
					this.$toast("登录成功");
					this.$store.dispatch('userInfo', res.data);
					// let url = this.formatUrl();
					let url = window.location.href.substr(window.location.href.indexOf("?")+5);
					
					url=decodeURIComponent(url)
					url=decodeURIComponent(url)
					console.log(url)
					this.$commonLogic.href(url)
				}else{
					this.$toast("登陆失败");
				}
			},
			formatUrl() {
				let obj = this.$common.urlLoginParse();
				let url = '';
				for (let key in obj) {
					debugger;
					if (key == "url") {
						url += obj[key];
					} else {
						url += `&${key}=${obj[key]}`
					}
				}
				url = url.replace("&", "?")
				return url;
			},
			async wechat() {
				let url =encodeURIComponent(window.location.href);
				let res = await this.$api.wechat({
					project: 'tbk',
					returnUrl: url,
					leve: 2
				})
				console.log(444,res.data)
				location.href = res.data;
			},
			async wechatLogin(code) {
				let res = await this.$api.wechatLogin({
					code: code,
				})
				if(res.data.userToken){
					this.$store.dispatch('userInfo', res.data);
					this.$toast("登录成功");
					let url = this.formatUrl();
					this.$commonLogic.href(url)
				}else{
					this.$toast("登陆失败");
				}
				
			},
			goHome() {
				uni.switchTab({
					url: '/pages/index/index',
				})
			},
			changeImgCode(){
				let data=this.$common.getImgCode()
				this.imgUrl=data.imgUrl;
				this.random=data.random;
			}
		},

	}
</script>

<style lang='scss'>
	page {
		background: #fff;
	}

	.container {
		position: relative;
		padding: 140upx 0 50upx;
		background: #fff;

		.title {
			font-size: 68upx;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			text-align: center;
			img{
				width: 234upx;
				height: 88upx;
				display: block;
				margin: 0 auto;
			}
		}
	}

	.input-content {
		padding: 100upx 60upx 0;
	}

	.input-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		position: relative;
		padding: 18upx 30upx;
		margin-bottom: 50upx;

		&:last-child {
			margin-bottom: 0;
		}

		.tit {
			height: 50upx;
			line-height: 56upx;
			font-size: $font-lg + 2upx;
			color: rgba(153, 153, 153, 1);
			margin-bottom: 20upx;
		}

		input {
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}
	}

	.input-item::after {
		@include border-1px(rgba(242, 242, 242, 1), bottom);
	}

	.confirm-btn {
		width: 188upx;
		height: 88upx;
		line-height: 88upx;
		border-radius: 10upx;
		background: rgba(191, 54, 39, 1);
		font-size: 34upx;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		margin: 120upx auto 0;

	}

	.code {
		display: flex;
		align-items: center;
		width: 100%;

		input {
			flex: 0 0 70%;

		}

		.getCode,
		.timeOut {
			flex: 0 0 30%;
			text-align: right;
			font-size: 28upx;
			color: rgba(51, 51, 51, 1);
		}

		.timeOut {
			color: #ccc;
		}
	}

	.other {
		.title {
			font-size: $font-base;
			color: rgba(153, 153, 153, 1);
			margin: 90upx 0 40upx;
		}

		.icon-groups {
			text-align: center;

			.weixin {
				width: 72upx;
				height: 72upx;
				background: url(/static/common/wechat.png) no-repeat;
				background-size: 100%;
				display: inline-block;
				/* margin-right: 96upx; */
			}

			/* .qq {
				width: 72upx;
				height: 72upx;
				background: url(/static/temp/share_qq.png) no-repeat;
				background-size: 100%;
				display: inline-block;
			} */
		}
	}
	.imgCode{
		width: 180upx;
	}
</style>
