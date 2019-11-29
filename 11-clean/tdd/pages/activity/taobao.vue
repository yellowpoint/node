
<template><!--淘宝活动页 -->
	<view class="buttonNav taobao" >
		<view v-for="(item,index) in topImageList">
			 <img :src="item.imageUrl" alt=""> 
		</view>
		<VTable :tab-list="tabList" :tabCur.sync="tabCur" tab-class="taobao-nav-box"  @change="tabChange" ></VTable>
		<VScroll ref="VScroll" pullup @scrollToEnd="loadMore" :vScrollData="goodsList[tabCur]"  v-if='goodsList.length>0'>
			<!-- <VSwiper :bannerList='bannerList' v-if='this.tabList[this.tabCur].val=="热销"&&bannerList.length>0'></VSwiper> -->
			<VGoods class="VGoods" :optionsType='type' :goodsList="goodsList[tabCur]" :type="2" @openPop='openPop' :className='"taobao-goods"' :channel='4'></VGoods> 
			 <uniLoadMore :status="tabList[tabCur].loadingType" ></uniLoadMore>
		</VScroll>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import VTable from "@/components/VTable";
	import VSwiper from "@/components/VSwiper";
	import { sending } from '@/common/bridge'
	export default {
		components: {
			uniLoadMore,
			VTable,
			VSwiper
		},
		data() {
			return {
				tabList:[],
				goodsList:[],
				tabCur:0,
				pageSize:10,
				buttonIndex:'',
				title:'淘宝',
				bannerList:[],
				topImageList:[],
				type:''
			}
		},
		props: {

		},
		onLoad(e) {
			this.loadTab(this.tabCur);
			this.type=e.type;
			console.log(this.type)
		},
		mounted(e) {
			
		},

		methods: {
			async loadTab(){
				let api='getTaobaoActivity';
				let res = await this.$api[api]({
					channelType: "HTML5"
				});
				
				res.data.navigationBarList.forEach((item,index)=>{
					let objE={
							id:item.numIid,
							loadingType: 'more',
							pageNum: 1,
							val:item.configVal
						}
					
					this.tabList.push(objE);
					
				})
				this.topImageList=res.data.topImageList;
				
				
				this.loadMore()
				
			},
			goBack() {
				uni.switchTab({
					url: '/pages/index/index',
				})
			},
			tabChange(){
				if (!this.goodsList[this.tabCur]){
					this.loadMore();
				}
				
				
			},
			async loadMore(){
				//如果是正在加载或是没有更多了则不再请求
				let VTabhead_item = this.tabList[this.tabCur]
				if (VTabhead_item.loadingType === 'loading' || VTabhead_item.loadingType === 'noMore') {
					//防止重复加载
					return;
				}
				VTabhead_item.loadingType = 'loading';
				let ajax='getFavoriteItems'
				
				let params={
						channelType: "HTML5",
						pageNum:this.tabList[this.tabCur].pageNum,
						pageSize:this.pageSize,
						favoriteId:this.tabList[this.tabCur].id
					}
				let res = await this.$api[ajax](params);
				if(this.tabList[this.tabCur].val=="热销"){
					this.bannerList=res.data.bannerList;
					res.data=res.data.goodsList;
					
				}
				//判断是否还有数据， 有改为 more， 没有改为noMore ；
				// 来自淘宝的接口可能出现某一页数量不足了，但下一页还有数据的情况，故只按照有没有数据来判断
				if (!res.data || !res.data.length) {
					VTabhead_item.loadingType = 'noMore';
					return
				}
				if (!this.goodsList[this.tabCur]) {
					this.$set(this.goodsList, this.tabCur, res.data)
				}else{
					this.goodsList[this.tabCur].push(...res.data)
				}
				// this.goodsList[this.tabCur].push(...res.data)
				VTabhead_item.loadingType = 'more';
				VTabhead_item.pageNum++
			}
			
		},

	}
</script>

<style lang="scss">
	.VScroll {
		top: calc(410upx);
		bottom: 0;
		background-color:#DD371F;
	}
	.VGoods {
		background-color:#DD371F;
	}
	.buttonNav {
		// padding-top: 88upx;
		background-color:#DD371F;
		.VGoods {
			padding-top: 20upx;
		}
		
	}

	.buttonNav-head {

		position: fixed;
		top: 0;
		left: 0;
		z-index: 998;
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 88upx;
		background: #BF3627;
		font-size: 32upx;
		color: #fff;

		.head-back {
			position: absolute;
			top: 0;
			left: 0;
			width: 60upx;
			height: 100%;
			padding-left: 30upx;
			display: flex;
			align-items: center;

			image {
				width: 18upx;
				height: 33upx;
			}
		}

		.head-text {
			@include allCenter;
			width: 100%;
		}
	}
	.VSwiper{
		width: 700upx;
		height: 250upx;
		margin: 10upx 25upx 20upx;
	}
	// .taobao-nav-box{
	// 	margin: 0 26upx;
	// }
	
	
</style>
