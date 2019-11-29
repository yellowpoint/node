<template>
	<view class="container">
		<VScroll  >
			<view class='set'>
				<view class="list-cell" @click='TaoBao'>
					<text class="cell-tit">淘宝授权</text>
					<text class="cell-tip"  v-if='taobaoAuth==1'>取消授权</text>
					<text class="cell-tip" v-if='taobaoAuth==0'>去授权</text>
					<text class="cell-more yticon icon-you"></text>
				</view>
			</view>
		</VScroll>
		<view class='btn-logout' @click="toLogout">退出当前账户</view>
	</view>
	
</template>

<script>
	import {  
	    mapMutations  
	} from 'vuex';
	export default {
		data() {
			return {
				taobaoAuth:0,
				taobaoObj:{},
				client_id:23709391,//淘宝授权配置id
				state:'tb',
				returnUrl:'',
				userInfo:this.$store.getters.userInfo
				
			};
		},
		onLoad(option) {
			this.state=option.returnUrl?encodeURIComponent(option.returnUrl):encodeURIComponent(window.location.href);//判断是否从商品详情跳转授权
			
		},
		onShow(){
			this.userInfo=this.$store.getters.userInfo;
			if(!this.userInfo){
				return
			}
			this.taobaoAuth=this.userInfo.taobaoAuth;
			this.taobaoObj=this.$common.urlParse();

			if(JSON.stringify(this.taobaoObj)!='{}'&&this.userInfo&&this.taobaoAuth==0){
				if(this.taobaoObj.code){
					this.getTooken();
				}
			}
		},
		methods:{
			navTo(url){
				this.$toast(`跳转到${url}`);
			},
			//退出登录
			toLogout(){
				uni.showModal({
				    content: '确定要退出登录么',
				    success: (e)=>{
				    	if(e.confirm){
				    		this.loginOut();
				    		
				    	}
				    }
				});
			},
			async loginOut(){
				let res= await this.$api.exit();
				this.$store.dispatch('userInfo', null);
				this.$toast("退出登录成功");
				uni.switchTab({
					url: `/pages/user/user`
				})
			},
			TaoBao(){
				if(this.taobaoAuth==0){
					this.bindTaoBao();
				}else if(this.taobaoAuth==1){
					this.cancelTaobaoAuth();
				}
			},
			bindTaoBao(){//跳转淘宝
				let that=this;
				uni.showModal({
				    content: '确定淘宝授权？',
				    success: (e)=>{
				    	if(e.confirm){
				    		let url=`https://oauth.taobao.com/authorize?response_type=code&client_id=${that.client_id}&redirect_uri=${that.state}&state=tb&view=wap`;
				    		location.href=url;
				    	}
				    }
				});
			
				
			},
			cancelTaobaoAuth(){//取消授权
				uni.showModal({
				    content: '确定取消淘宝授权？',
				    success:async (e)=>{
				    	if(e.confirm){
				    		let res= await this.$api.cancelTaobaoAuth();
				    		this.taobaoAuth=res.data.taobaoAuth;
								this.userInfo.taobaoAuth=res.data.taobaoAuth
								this.$store.dispatch('userInfo',this.userInfo)
							this.$toast("取消成功");
				    	}
				    }
				});
				
			},
			async getTooken(){
				// debugger;
				let res= await this.$api.getToken({
					code:this.taobaoObj.code,
					note:this.userInfo.id
				});
				this.taobaoAuth=res.data.taobaoAuth;
				this.userInfo.taobaoAuth=res.data.taobaoAuth
				this.$store.dispatch('userInfo',this.userInfo)
				let userInfo=this.$store.getters.userInfo;
				this.$toast("授权成功");
			}
		}
	}
</script>

<style lang='scss'>
	.VScroll{
		top: 0;
	}
	.list-cell{
		display:flex;
		align-items:baseline;
		padding: 20upx $page-row-spacing;
		line-height:60upx;
		position:relative;
		background: #fff;
		justify-content: center;
		&.log-out-btn{
			margin-top: 40upx;
			.cell-tit{
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}
		&.cell-hover{
			background:#fafafa;
		}
		&.b-b:after{
			left: 30upx;
		}
		&.m-t{
			margin-top: 16upx; 
		}
		.cell-more{
			align-self: baseline;
			font-size:$font-lg;
			color:$font-color-light;
			margin-left:10upx;
		}
		.cell-tit{
			flex: 1;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right:10upx;
		}
		.cell-tip{
			font-size: $font-base;
			color: $font-color-light;
		}
	}
	.list-cell::after{
		@include border-1px(rgba(242,242,242,1),bottom);
		}
	.set{
		padding-top: 20upx;
		background: $page-color-base;
	}
	.btn-logout{
		position: fixed;
		bottom: 0;
		left: 0;
		height:98upx;
		background:rgba(191,54,39,1);
		line-height: 98upx;
		color: #fff;
		width: 100%;
		text-align: center;
		font-size:34upx;
		font-weight:500;
		}
</style>
