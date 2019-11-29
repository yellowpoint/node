<template>
	<view class='myCollection browsHistory'>
		<VChangeType @changeType='changeType'></VChangeType>
		<view class='content'>
				<VScroll  class="contentSc" ref="VScroll" @scrollToEnd="scroll" :vScrollData="allList" pullup>
				<view class='main'>
					<VGoods :goodsList="collectList"  :type='type' v-if='collectList.length>0'  ></VGoods>
					<VEmpty v-if='collectList.length==0&&!isCollect' :img='"/static/common/nullHistory.png"'></VEmpty>
					<uniLoadMore :status="loadingType" v-if='collectList.length>0&&isShowLoad'></uniLoadMore>
				</view>
				<view v-if='!isCollect'>
					<VTitleClass :value='"为你推荐"'></VTitleClass>
					<VGoods :goodsList="recommondList"  v-if='recommondList.length>0'></VGoods>
					<uniLoadMore :status="loadingType2"></uniLoadMore>
				</view>
				
			</VScroll>
		</view>
	</view>
</template>

<script>
	import VTitleClass from '@/components/VTitleClass';
	import VChangeType from '@/components/VChangeType';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import VEmpty from "@/components/VEmpty";
	export default {
		data() {
			return {
				collectList:[],
				page:1,
				pageSize:10,
				pageR:1,//为你推荐的分页
				recommondList:[],//为你推荐数据
				allList:[],
				isCollect:true,
				pullup:true,
				type:2,
				isAllCheck:false,
				loadingType: 'more',
				isScroll:true,
				loadingType2:'more',
				isShowLoad:true
			};
		},
		onShow(option){
			this.isScroll=true;
			this.loadingType='more';
			this.loadingType2='more'
			this.page=1;
			this.pageR=1;
			this.recommondList=[];
			this.collectList=[];
			this.allList=[];
			this.isCollect=true;
			this.inint();
			this.getRecommond();
			this.isShowLoad=true;
		},
		watch: {
			loadingType(val){
				if(val=="noMore"){
					this.isShowLoad=false;
				}
			}
		},
		computed:{
		},
		components: {
			VTitleClass,
			VChangeType,
			uniLoadMore,
			VEmpty
		},
		onNavigationBarButtonTap(e){
			if(e.index==0){
				this.clear();
			}
		},
		methods:{
			scroll(){
				if(this.isScroll){
					if(this.isCollect){
						this.inint();
					}else if(this.pageR<21){
						this.getRecommond();
					}else{
					}
				}
				
				
			},
			async inint(){
				if (this.loadingType === 'loading' || this.loadingType === 'noMore') {
					return;
				}
				this.loadingType  = 'loading';
				
				let res= await this.$api.getBrowseHistory({
					pageNum:this.page,
					pageSize:this.pageSize
					// terraceTypeEnum:"TAOBAO"
				});
				
				if (res.data.list) {
					this.isScroll=true;
					if (this.page == 1) {
						this.collectList = res.data.list
					} else {
						this.collectList=this.collectList.concat(res.data.list)
					}
					this.allList=this.allList.concat(this.collectList);
					
					if (this.collectList.length >= res.data.total) {
						this.isCollect=false;
						this.loadingType  = 'noMore';
						return
					} else {
						this.loadingType  = 'more';
						this.page++;
					}
					
				}else{
					this.isCollect=false;
				}
			},
			async getRecommond(){
				if (this.loadingType2 === 'loading' || this.loadingType2 === 'noMore') {
					return;
				}
				this.loadingType2  = 'loading';
				
		
				let res= await this.$api.getToYouRecommend({
					pageNum:this.pageR,
					pageSize:this.pageSize
				});
				if(res.data){
					if(this.pageR==1){
						this.recommondList=res.data;
					}else{
						this.recommondList=this.recommondList.concat(res.data);
					}
					this.loadingType2='more';
					this.allList=this.allList.concat(this.recommondList);
					if(this.pageR==20){
						this.loadingType2='noMore';
						return;
					}
					this.pageR++;
				}else{
					this.loadingType2='noMore';
				}
				
				
			},
			changeType(){
				this.type=this.type==1?2:1;
				
			},
			 clear(){
				 if(this.collectList.length<=0){
					 this.$toast("浏览记录已清空");
				 }else{
					 let that=this;
					 uni.showModal({
					 	content: '确定清除浏览记录？',
					 	success:async (res) => {
					 		if (res.confirm) {
					 			let res= await that.$api.doWipeData();
								that.$toast("浏览记录已清空");
					 			that.collectList=[];
					 			that.page=0;
								that.isShowLoad=true;
								that.allList=that.recommondList;
								that.isCollect=false;
					 		} else if (res.cancel) {
					 			
					 		}
					 	}
					 });
				 }
				
				
				
			}
		}
	}
</script>
<style lang='scss'>
	.main{
		padding:20upx 0;
	}
	.VTitleClass{
		padding-bottom: 40upx;
	}
	.contentSc{
		bottom: 0;
	}
</style>
