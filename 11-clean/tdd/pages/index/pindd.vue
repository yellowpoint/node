<!-- 首页的按钮导航点击后的页面，如9.9、
海淘购-->
<template>
	<view class="buttonNav" >
		<view class="buttonNav-head">
			<view class="head-back" @click="goBack">
				<image src="/static/common/arrow.png" mode="widthFix"></image>
			</view>
			<view class="head-text">{{title}}</view>
		</view>
		<VTable :tab-list="tabList" :tabCur.sync="tabCur" tab-class="header-nav-box" @change="tabChange" ></VTable>
		<VScroll ref="VScroll" pullup @scrollToEnd="loadMore" :vScrollData="goodsList[tabCur]" v-if='goodsList.length>0'>
			<VSwiper :bannerList='bannerList' v-if='this.tabList[this.tabCur].val=="热销"&&bannerList.length>0'></VSwiper>
			<VGoods class="VGoods" :goodsList="goodsList[tabCur]" :type="2" @openPop='openPop'></VGoods> 
			 <uniLoadMore :status="tabList[tabCur].loadingType" ></uniLoadMore>
		</VScroll>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import VTable from "@/components/VTable";
	import VSwiper from "@/components/VSwiper";
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
				title:'拼多多',
				bannerList:[]
			}
		},
		props: {

		},
		onLoad(e) {
			// 默认是拼多多
			this.buttonIndex = e.buttonIndex||77;
			this.title=e.buttonIndex==77?"拼多多":"京东"
			uni.setNavigationBarTitle({
				title: this.title
			});
		},
		mounted(e) {
			this.loadTab(this.tabCur);
			
		},

		methods: {
			goBack() {
				uni.switchTab({
					url: '/pages/index/index',
				})
			},
			async loadTab(){
				let api=this.buttonIndex==77?'getPddTwoLevelCategory':'getGoodsCategory'
				let res = await this.$api[api]({
					channelType: "HTML5"
				});
				let obj={
					val:"热销",
					id:''
				}
				if(this.buttonIndex!=77){//京东新增热销
					res.data.unshift(obj);
				}
				res.data.forEach((item,index)=>{
					let objE={
							id:'',
							loadingType: 'more',
							pageNum: 1,
							val:'',
							numId:item.id
						}
					objE.id=index;
					objE.val=item.val;
					this.tabList.push(objE);
					
				})
				
				
				this.loadMore()
				
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
				let ajax
				if(this.buttonIndex==77){
					ajax=this.tabList[this.tabCur].val=="热销"?'getPddTopGoods':'getPddDdkGoods' //区分
				}else{
					ajax=this.tabList[this.tabCur].val=="热销"?'getChoicenessGoodsList':'getCateGoodList' //区分
				}
				let params={
						channelType: "HTML5",
						pageNum:this.tabList[this.tabCur].pageNum,
						pageSize:this.pageSize,
						keyword:this.tabList[this.tabCur].val,
						sortType:0,
						id:this.tabList[this.tabCur].numId
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
				console.log(this.goodsList)
			},
			openPop(text){//京东分享提示
				let that=this;
				uni.showModal({
				    title: '是否分享到微信',
				    content: text,
				    success: function (res) {
				        if (res.confirm) {
				           
				            that.$copyText(text).then(function(){
				            	that.$toast('复制成功')
				            	setTimeout(function() {
				            		window.open('weixin://');
				            	}, 300);
				            },function(){
				            	that.$toast('复制失败，请稍后重试')
				            })
							
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		},

	}
</script>

<style lang="scss">
	.VScroll {
		top: calc(88upx + 90upx);
		bottom: 0;
	}

	.buttonNav {
		padding-top: 88upx;

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
	
</style>
