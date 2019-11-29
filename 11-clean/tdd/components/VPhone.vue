<!-- 公共的手机验证码 -->
<template>
	<view class="VPhone" :class="{type2:type==2}">

		<view class="VPhone-phone" v-if='type==2'>
			<image class="VPhone-icon" src="/static/earning/phone.png"></image>
			<view class="VPhone-name">手机号码</view>
			<input class="VPhone-input" type="number" maxlength="11" :placeholder="phoneText" v-model="phone"  />
		</view>
		<view class="VPhone-code">
			<image class="VPhone-icon" src="/static/earning/imgCode.png"></image>
			<view class="VPhone-name">图形验证</view>
			<input class="VPhone-input"  maxlength="4" placeholder="请输入验证码" v-model="imgCode" v-if='type!=3'/>
			<input class="VPhone-input"  maxlength="4" placeholder="请输入验证码" v-model="imgCode" placeholder-style="fontSize:24upx" v-if='type==3' />
			<!-- <image ref='imgCode'  @click='changeImgCode' class='imgCode'></image> 不支持 -->
			<img :src="imgUrl" alt=''  @click='changeImgCode' class='imgCode'>
		</view>
		<view class="VPhone-code bt20">
			<image class="VPhone-icon" src="/static/earning/code.png"></image>
			<view class="VPhone-name">短信验证</view>
			<input class="VPhone-input" type="number" maxlength="6" placeholder="请输入验证码" v-model="code" v-if='type!=3'/>
			<input class="VPhone-input" type="number" maxlength="6" placeholder="请输入验证码" v-model="code" placeholder-style="fontSize:24upx" v-if='type==3' />
			<view v-if='!showCodeTime' class="VPhone-get" @click="getCode">获取</view>
			<view v-if='showCodeTime' class="VPhone-get disabled">{{countDown}}s后重发</view>
		</view>
		<slot></slot>
		<view class="VPhone-login" :class="{act:isCanLogin}" @click="login">{{loginText}}</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				code: '',
				countDown: 60,
				showCodeTime: false,
				isCanLogin: false,
				imgUrl:'',
				imgCode:'',
				random:'',
				isMoney:false//当type为1的时候
			}
		},
		props: {
			// 类型默认1为提现页面，2为绑定手机号页面,3为绑定支付宝账号
			type: {
				type: Number,
				default: 1
			},
			loginText: {
				type: String,
				default: '绑定'
			},
			phoneText: {
				type: String,
				default: '请输入手机号码'
			},
			loginCB: {
				type: Function
			},
			loginBefore: {
				type: Function
			},
			alipayCode:{
				type: String
			},
			repeat:{
				type:Boolean,
				default:true
			}
			
		},
		mounted() {
		this.changeImgCode()

		},
		methods: {
			async getCode() { //获取验证码
			console.log(this.$parent)
				let phone=this.type==3?this.alipayCode:this.phone //支付宝绑定就是支付宝账号
				let tips=this.type==3?'支付宝账号':'手机号'
				let status = this.$common.isPhoneNumber(phone)|| this.$common.isEmail(phone);
				if(!status){
					
					this.$toast(`请填写正确的${tips}`);
					return;
				}
				if(!this.$common.isImgCode(this.imgCode)){
					this.$toast("请填写正确的图形验证码");
					return;
				}
					let smsTypeEnum=''
					if(this.type==1){
						smsTypeEnum='WITHDRAW_DEPOSIT'
					}else if(this.type==2){
						smsTypeEnum="BINDING_PHONE"
					}else{
						smsTypeEnum="BIND_TO_MODIFY_ALIPAY_ACCOUNT"
					}
				
				let res = await this.$api.getCode({
					phone: phone,
					// 绑定手机为BINDING_PHONE，提现验证为WITHDRAW_DEPOSIT
					smsTypeEnum:smsTypeEnum,
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
			async login() {
				// 点击登录前的函数存在且返回false的话就return
				if(!this.repeat){
					return
				}
				this.isMoney=this.loginBefore();
				if (this.loginBefore && !this.isMoney) {
					return
				}
				let phone=this.type==3?this.alipayCode:this.phone //支付宝绑定就是支付宝账号
				let phoneStatus
				let title=this.type==3?'支付宝账号':'手机号'
				if(this.type==3){
					 phoneStatus = this.$common.isPhoneNumber(phone)||this.$common.isEmail(phone);
				}else{
					 phoneStatus = this.$common.isPhoneNumber(phone);
				}
				let codeStatus = this.$common.isCode(this.code);
				if (!phoneStatus) {
					this.$toast(`请填写正确的${title}`);
					return;
				}
				if (!codeStatus) {
					this.$toast("请填写正确的短信验证码");
					return;
				}
				if (this.loginCB) {
					this.loginCB(this.code)
					// this.isCanLogin = false
					// setTimeout(()=>{
					// 	this.isCanLogin = true
					// },3000)
					return
				}
				
				let res = await this.$api.bindingPhone({
					phone: this.phone,
					code: this.code
				})
				this.$toast("绑定成功");
				setTimeout(() => {
					uni.navigateBack();
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
				// let status = this.$common.isPhoneNumber(this.phone)|| this.$common.isEmail(this.phone);
				if (this.$common.isCode(this.code) && this.$common.isPhoneNumber(this.phone)) {
					this.isCanLogin = true
				}
			},
			code(newValue, oldValue) {
				let phone=this.type==3?this.alipayCode:this.phone 
				if(this.type==1&&this.$common.isCode(this.code) ){//type为1,只有金额
					this.isCanLogin = true
					return
				}
				let status
				if(this.type==3){
					status=this.$common.isPhoneNumber(this.alipayCode)||this.$common.isEmail(this.alipayCode)
				}else{
					status=this.$common.isPhoneNumber(this.alipayCode)
				}
				if (this.$common.isCode(this.code) && status) {
					this.isCanLogin = true
				}
			},
			alipayCode(newValue, oldValue) {
				let status
				if(this.type==3){
					status=this.$common.isPhoneNumber(this.alipayCode)||this.$common.isEmail(this.alipayCode)
				}else{
					status=this.$common.isPhoneNumber(this.alipayCode)
				}
				if (this.$common.isCode(this.code) && status) {
					this.isCanLogin = true
				}
			}

		},
	}
</script>

<style lang="scss">
	.VPhone {
		background: #fff;

		.VPhone-phone,
		.VPhone-code {
			display: flex;
			align-items: center;
			padding: 0 48upx;
			height: 122upx;
		}

		.VPhone-code {
			height: 142upx;
			// border-bottom: 20upx solid #f5f5f5;
			border-bottom: 1upx solid #f5f5f5;
		}
		.bt20{
			border-bottom: 20upx solid #f5f5f5;
		}
		.VPhone-phone {
			height: 123upx;
			border-bottom: 1upx solid #f5f5f5;

			.VPhone-input {
				width: 380upx;
			}

		}

		.VPhone-icon {
			width: 36upx;
			height: 36upx;
		}

		.VPhone-name {
			width: 120upx;
			font-size: 28upx;
			margin-left: 40upx;
		}

		.VPhone-input {
			width: 270upx;
			margin-left: 30upx;
		}

		.VPhone-get {
			@include allCenter;
			@include active;
			width: 150upx;
			height: 72upx;
			margin-left: auto;
			background: rgba(84, 160, 255, 1);
			border-radius: 10upx;
			color: #fff;
			overflow: hidden;

			&.disabled {
				background: #C5C5C5;
			}
		}

		.VPhone-login {
			@include allCenter;
			@include active;
			width: 680upx;
			height: 98upx;
			margin: 60upx auto;
			background: rgba(197, 197, 197, 1);
			border-radius: 10upx;
			font-size: 34upx;
			color: #fff;
			overflow: hidden;

			&.act {
				background:linear-gradient(34deg,rgba(255,43,43,1),rgba(255,85,57,1));
			}
		}

		&.type2 {
			.VPhone-get {
				background: url(/static/my/phone_short.png) no-repeat;
				background-size: 100%;

				&.disabled {
					background: #C5C5C5;
				}
			}

			.VPhone-login {
				margin-top: 184upx;
				border-radius: 49upx;
				background: url(/static/my/phone_long.png) no-repeat;
				background-size: 100%;
			}

			.VPhone-code {
				height: 123upx;
				border-bottom: 1upx solid #f5f5f5;
			}

		}
		.imgCode{
			@include allCenter;
			@include active;
			width: 150upx;
			height: 72upx;
			margin-left: auto;
			overflow: hidden;
		}
	}
</style>
