<template>
	<!-- 邀请页面 -->
	<view class="invite">
		<view >
			<img  src="../../static/cashBonus/inviteBg.png" alt="">
			<view class='percent' v-if='inviteData'>
				<VProgressBar :percent='inviteData.percent'></VProgressBar>
			</view>
			
			<view class='middle' >
				<view class='qrCodeContent'>
					<img :src="imgUrl" v-if='imgUrl' alt="">
					<!-- <VQRcode v-if='inviteData' :size='268' :val='inviteData.downloadLink' @success='success'></VQRcode> -->
				</view>
				
				<view>{{inviteData.invitationCode}}</view>
			</view>
			<view class='btn' @click="download"></view>
		</view>
	</view>
</template>

<script>
	import VQRcode from "@/components/VQRcode.vue"
	import VProgressBar from "@/components/VProgressBar"
	import {
		host,
		host_other
	} from '@/common/config'
	export default {
		data() {
			return {
				inviteData: '',
				id:'',
				imgUrl:''
				
				
			}
		},
		onLoad(options) {
			this.id=options.userId
			this.inint();
			
		},
		methods: {
			async inint() {
				let res = await this.$api.getRedPacketShare({
					userId:this.id
				});
				this.inviteData = res.data;
				let that=this;
				this.imgUrl=`${host}/other/validatecode/getQRCodeImage?height=200&width=200&text=${this.inviteData.invitationCode}`

			},
			success(){
				// this.isShow=true;
			},
			download(){
				let that=this;
				this.$copyText(this.inviteData.invitationCode).then(function(){
					that.$toast('复制成功')
					setTimeout(function() {
						window.open(that.inviteData.downloadLink)
					}, 300);
				},function(){
					that.$toast('复制失败，请稍后重试')
				})
			}
		},
		components: {
			VQRcode,
			VProgressBar
		}
	}
</script>

<style lang='scss'>
	.invite {
		position: relative;
		text-align: center;

		.middle {
			position: absolute;
			bottom: 254upx;
			left: 0;
			text-align: center;
			width: 100%;
			font-size: 30upx;
			font-weight: bold;
			color: rgba(255, 255, 255, 1);

			.qrCodeContent {
				width: 288upx;
				height: 288upx;
				margin: 0 auto 28upx;
				padding: 10upx;
				background-color: #FFFFFF;
				
			}
		}

		.btn {
			width: 500upx;
			height: 140upx;
			position: absolute;
			bottom: 148upx;
			left: 50%;
			margin-left: -250upx;
		}

	}
	.percent{
		width: 546upx;
		position: absolute;
		left: 50%;
		top: 507upx;
		margin-left: -273upx;
	}
	
	
</style>
