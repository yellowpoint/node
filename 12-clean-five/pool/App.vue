<template>
	<div id="app" class="app" :class="{noFooter:$route.meta.noFooter}">
		<page-header v-if="!$route.meta.noHeader"/>
		<router-view class="routerView"/>
		<page-footer v-if="!$route.meta.noFooter"/>
	</div>
</template>

<script>
	import '@/assets/icon/iconfont.js'
	import pageFooter from '@/components/footer/footer';
	import pageHeader from '@/components/header/header';
  import commonMixins from '@/mixins/common';

	export default {
		name: 'App',
    mixins: [commonMixins],
		data() {
			return {
			}
		},
		components: {
			pageFooter,
			pageHeader,
		},
		created() {
      // console.log('app created')
		},
		mounted() {
      // console.log('app mounted')
			setHtmlFontSize();
			$(window).resize(function() {
				setHtmlFontSize()
			});

			function setHtmlFontSize() {
				let clientWidth = document.documentElement.clientWidth;
				if(clientWidth > 1200) {
					clientWidth = 1200
				}
				if(clientWidth <= 768) {
					document.documentElement.style.fontSize = clientWidth / 7.5 + 'px';
				} else {
					document.documentElement.style.fontSize = clientWidth / 12 + 'px';
				}

			};

			//防止手抖
			let lastTouchEnd = 0;
			document.documentElement.addEventListener('touchend', function(event) {
				let now = Date.now();
				if(now - lastTouchEnd <= 300) {
					event.preventDefault();
				}
				lastTouchEnd = now;
			}, false);
			if(this.userInfo) {
				this.commonInitUserProfile(); // 更新用户信息
			}
		},
		computed: {
			userInfo() { // 用户信息
				return this.$store.getters.userInfo
            },
		},
		methods: {

		},
		watch: {

		},
	}
</script>

<style lang="less">
	@import './assets/icon/iconfont.css';
	body {
		@font-m();
		.el-date-picker{
			.el-picker-panel__footer{
				.el-button--text{
					display: none;
				}
			}
		}
  	}
	.app{
		position: relative;
		z-index: 1;
		min-height: 100vh;
    padding-bottom: 4.6rem;
    
		@media (max-width: 768px) {
            padding-bottom: 4.8rem;
        }
    &.noFooter{
      padding-bottom: 0
    }    
	}
	// .routerView {
	// 	min-height: 100vh;
	// }
	
	.content {
		@content();
		padding: 0.2rem 0 1.0rem 0;
	}
	.defineNotData{
		display: flex;
		flex-direction: column;
		padding: 0.8rem 0;
		p{
			font-size: 0.14rem;
			color: #333;
			margin-top: 0.2rem;
		}
	}
	.vipLabelBox{
		position: relative;
		display: flex;
		align-items: center;
		padding-left: 0.7rem;
		@media (max-width: 768px) {
			padding-left: 0.5rem;
		}
		.vipLabel{
			position: absolute;
			top: 0;
			right: 0;
			display: inline-block;
			width: 0.45rem;
			height: 0.16rem;
			line-height: 0.16rem;
			color: @color-default;
			background: #FFC939;
			font-size: 0.14rem;
			vertical-align: middle;
			margin-left: 0.16rem;
		}
	}
	.icon_solo{
		font-size: 0.4rem;
		color: #FFC939;
	}
	.el-message-box__wrapper{

		.el-message-box{
			@media (max-width: 768px) {
				width: 90%;
			}
		}
	}
	.danger{
		color: #FF6464;
	}
	input{
		@media (max-width: 768px) {
			min-height: 0.64rem;
		}
	}
	input::placeholder{
		font-size: 0.14rem;
		color: #999;
	}
	.el-tooltip__popper{
		line-height: 2 !important;
	}
	pre{ 
		white-space: pre-wrap; /*css-3*/ 
		white-space: -moz-pre-wrap; /*Mozilla,since1999*/ 
		white-space: -pre-wrap; /*Opera4-6*/ 
		white-space: -o-pre-wrap; /*Opera7*/ 
		word-wrap: break-word; /*InternetExplorer5.5+*/ 
		font-family: Helvetica Neue,Helvetica,Arial,PingFang SC,Hiragino Sans GB,Heiti SC,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
	} 
	/* 谷歌 */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		appearance: none; 
		margin: 0; 
	}
	/* 火狐 */
	input{
		-moz-appearance: textfield !important;
	}
</style>