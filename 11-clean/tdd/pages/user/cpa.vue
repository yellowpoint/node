<template>
	<view class="cpa">
		<view class='btn-return return-bg' v-if='isShowIcon' @click='goback'></view>
		<view class='topsider' id='topsider'  v-if='cpaData'>
			<view class='btn btn-share1' v-if='isShow' @click="scrollTo(scrollIndex2)"></view>
			<img v-for='(item,index) in cpaData.topConfigVos' :key='index' @onload="imgload"  :src='item.imageUrl' alt="" >
		</view>
		 <view class='middle' v-if='cpaData'  id='middle'>
			<img v-for='(item,index) in cpaData.middleConfigVos' :key='"key1"+index' :src='item.imageUrl' alt=""  @load='load'>
		</view>
		<view class='bottomsider'  v-if='cpaData'>
			<img v-for='(item,index) in cpaData.bottomConfigVos' :key='"key2"+index'  :src='item.imageUrl' alt="">
		</view>
		<view  id='fixedTop' v-if='isShowIcon' :class='isShowButton?" btnGroup":"btnGroup btnsNone"'>
			<view  :class='isShow?"topActive top":"top"' >
				<view class='btn-return'  @click='goback'></view>
				<view class='btn btn-juan' v-if='!isShow'  @click="scrollTo(scrollIndex1)"></view>
				<view class='btn btn-share' v-if='isShow' @click="scrollTo(scrollIndex2)"></view>
			</view>
		</view>
		<view  id='fixedTop' v-if='!isShowIcon' :class='isShowButton?" btnGroup":"btnGroup btnsNone"'>
			<view  :class='isShow?"topActive topActive1 top top1":"top top1"' >
				<view class='btn btn-juan' v-if='!isShow'  @click="scrollTo(scrollIndex1)"></view>
				<view class='btn btn-share' v-if='isShow' @click="scrollTo(scrollIndex2)"></view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cpaData:'',
				isShow:true,
				isShowButton:false,
				scrollIndex1:0,
				scrollIndex2:0,
				isShowIcon:true,
				middelData:'',
				name:''
				
			}
		},
		created() {
			this.inint();
		},
		mounted() {
		},
		onLoad(option){
			if(option.type=="ios"){
				this.isShowIcon=false;
			}
			this.name=option.title;
		},
		onShow(){
			document.title="新手攻略"
		},
		onHide(){
			document.title="淘多多"
		},
		onUnload(){
			document.title="淘多多"
		},
		onPageScroll(obj){
			if(+obj.scrollTop>=this.scrollIndex1&&+obj.scrollTop<this.scrollIndex2){
				this.isShowButton=true;
				this.isShow=true;
				return;
			}
			
			if(+obj.scrollTop<this.scrollIndex1){
				this.isShowButton=false;
				this.isShow=true;
				return;
			}
			if(+obj.scrollTop>=this.scrollIndex2){
				this.isShowButton=true;
				this.isShow=false;
				return;
			}
		},
		methods:{
			async inint(){
				let res= await this.$api.getNewStrategy();
				this.cpaData=res.data;
				
				//分出淘多多和淘利返
				this.middelData=this.cpaData.middleConfigVos;
				if(this.name=='tfl'){
					this.middelData[1].imageUrl='http://51app-image.oss-cn-hangzhou.aliyuncs.com/payment/tbk/2019/10/15/1830481194404.png'
				}
				
			},
			scrollTo(index){
				uni.pageScrollTo({
					scrollTop: index,
					duration: 300
				});
				
				 if(+index>=this.scrollIndex2){
					 this.isShowButton=true;
					 this.isShow=false;
				 }else{
					 this.isShowButton=false;
					 this.isShow=true;
				 }
				 
			},
			load(e){
				let height1=document.getElementById('topsider').offsetHeight;
				let height2=document.getElementById('middle').offsetHeight;
				let height3=document.getElementById('fixedTop').offsetHeight;
				this.scrollIndex1=height1-height3;
				this.scrollIndex2=height1+height2-height3;

			},
			goback(){
				uni.navigateBack();
			}
		},
		computed: {
			
		}
	}
</script>

<style lang="scss">
	.return-bg{
		background:url(/static/cpa/return.png) no-repeat;
		background-size: 100%;
		z-index: 999;
	}
	.btnGroup{
		position: fixed;
		top:0;
		left: 0;
		width: 100%;
		z-index: 1;
	}
	.btnsNone{
		z-index: -1;
		left: -1000upx;
	}
	
	.top{
		width: 100%;
		background:url(/static/cpa/z.jpg) no-repeat;
		background-size: 100%;
		height: 100upx;
		.btn-return{
			position: absolute;
			left: 0;
			right: 0;
			width: 100upx !important;
			height: 72upx;
		}
		.btn{
			width:300upx;
			height:72upx;
			position: absolute;
			top: 14upx;
			z-index:1;
		}
		.btn-juan{
			left: 100upx;
			background-color: transparent;

		}
		.btn-share{
			right:32upx ;
			background-color: transparent;
		}
		.btn-ios-juan{
			
		}
		.btn-ios-share{
			
		}
		.topsider,.bottomsider,.middle{
			overflow: hidden;
		}
	}
	img{
		display: block;
	}
	.item{
		width: 100%;
	}
	.top1{
		background:url(/static/cpa/z1.jpg) no-repeat;
		background-size: 100%;
		.btn{
			width: 329upx;
		}
		.btn-juan{
			left:32upx;
		}
	}
	.topActive{
		background:url(/static/cpa/s.jpg) no-repeat;
		background-size: 100%;
	}
	.topActive1{
		background:url(/static/cpa/s1.jpg) no-repeat;
		background-size: 100%;
	}
	.cpa{
		position: relative;
		.btn-return{
			width:141upx;
			height:58upx;
			position: absolute;
			top: 36upx;
			left: 0;
		}
	}
	.topsider{
		position: relative;
		.btn-share1{
			right: 56upx;
			background-color: transparent;
			width: 280upx;
			height: 72upx;
			position: absolute;
			bottom: 40upx;
			z-index: 1;
		}
	}
</style>
