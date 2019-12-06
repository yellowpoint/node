<!--矿机管理-->
<template>
	<div class="millManage content">
		<div class="headerMillBox">
			<div class="headerMillBoxLeft">
				<div class="onLineMill">
					<img class="onLineImg" src="~assets/images/millManage/inLine.png" alt="">
					<div class="onLineMillCount">{{mineOnline.mineOnline || 0}}</div>
					<div class="millType">在线矿机</div>
				</div>
				<div class="outLineMill">
					<img class="offLineImg" src="~assets/images/millManage/offLine.png" alt="">
					<div class="outLineMillCount offlineStatus">{{mineOnline.mineOffline || 0}}</div>
					<div class="millType offlineStatus">离线矿机</div>
				</div>
			</div>
			<div class="headerMillBoxRight">
				<!-- 矿机信息模块 -->
				<mill-info-module 
					:mineOnline="mineOnline" 
					:poolInfo="poolInfo"
				>
				</mill-info-module>
			</div>
		</div>
		<div class="chartBox">
			<!-- 矿机在线率模块 -->
			<mill-online-rate-module></mill-online-rate-module>
		</div>
		<div class="millManageModuleBox">
			<mill-manage-module
				@updateMierInfo="getMineOnline()"
			>
			</mill-manage-module>
		</div>
	</div>
</template>

<script>

	import millInfoModule from 'components/millInfoModule/millInfoModule';
	import millOnlineRateModule from 'components/millOnlineRateModule/millOnlineRateModule';
	import millManageModule from 'components/millManageModule/millManageModule';

	export default {

		name: 'millManage',

		mixins: [],

		components: {
			millInfoModule,
			millOnlineRateModule,
			millManageModule,
		},

		props: {},

		data() {
			return {
				poolInfo: {}, // 矿池信息
				mineOnline: {}, // 矿机信息
			}
		},

		computed: {
			mineType() { // 币种
				return this.$store.getters.mineType
			},
		},

		watch: {},

		beforeCreate() {
			
		},
		beforeDestroy() { //生命周期 - 销毁之前
		
        },
		created() {
			this.getPoolInfo();
			this.getMineOnline();
		},

		mounted() {

		},

		destroyed() {},

		methods: {
			getPoolInfo() { // 获取矿池信息
				let data = {
					mineType: this.mineType,
				}
				this.$api.poolInfo(data).then( res => {
					this.poolInfo = res;
                    console.log('矿池信息', res);
                }).catch( err => {
                    console.log('矿池信息错误', err);
                })
			},
			getMineOnline() { // 获取矿机信息
				let data = {
					mineType: this.mineType,
				}
				this.$api.mineOnline(data).then( res => {
					this.mineOnline = res;
                    console.log('矿机信息', res);
                }).catch( err => {
                    console.log('矿机信息错误', err);
                })
			},
		}
	}
</script>

<style lang="less" scoped>
	.millManage{
		background: none;
		@media (max-width: 768px) {
			width: 94%;
			margin: 0 auto;
		}
		.chartBox{
			background: @color-default;
			margin-bottom: 0.2rem;
			box-shadow: 0 0 0.13rem 0 rgba(93,113,255,0.22);
			border-radius: 0.1rem;
		}
		.headerMillBox{
			display: flex;
			justify-content: space-between;
			padding-bottom: 0.2rem;
			@media (max-width: 768px) {
				flex-direction: column;
			}
			.headerMillBoxLeft{
				display: flex;
				justify-content: space-between;
				width: 4.6rem;
				height: 2.6rem;
				padding-top: 0.38rem;
				padding-bottom: 0.22rem;
				background: @color-main url("~assets/images/millManage/millBoxBg.png") no-repeat;
				box-shadow: 0 0 0.13rem 0 rgba(93,113,255,0.22);
				border-radius: 0.1rem;
				@media (max-width: 768px) {
					width: 100%;
					margin-bottom: 0.2rem;
				}
				.onLineMill{
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-between;
					width: 50%;
					height: 100%;
					.onLineImg{
						width: 0.84rem;
    					height: 0.3rem;
					}
				}
				.outLineMill{
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-between;
					width: 50%;
					height: 100%;
					.offLineImg{
						width: 1.12rem;
    					height: 0.25rem;
					}
					.offlineStatus{
						color: #FFC001;
					}
				}
				.onLineMillCount,.outLineMillCount{
					@font-xxxl();
					font-family: HelveticaInserat-Roman-SemiB;
					font-weight:bold;
					color:@color-default;
				}
				.millType{
					@font-m();
					font-weight: 400;
					color: @color-default;
				}
			}
			.headerMillBoxRight{
				width: 7.20rem;
				height: 2.6rem;
				background:rgba(255,255,255,1);
				box-shadow: 0 0 0.13rem 0 rgba(93,113,255,0.22);
				border-radius: 0.1rem;
				@media (max-width: 768px) {
					width: 100%;
				}
			}
		}
	}

</style>