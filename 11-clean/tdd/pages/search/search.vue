<template>
	<view class="search" id='search'>
		<view class='top'>
			<view class="search-box">
				<view class="input-box">
					<view class='change-box' @click='changeType'>
						<!-- <view class='icon ' :class='[activeIndex==0?"icon-taobao":"icon-pindd"]'></view> -->
						<view class='icon ' :class='`icon-active${activeIndex}`'></view>
						<view class='title' v-if='activeIndex==0'>淘宝</view>
						<view class='title' v-if='activeIndex==1'>拼多多</view>
						<view class='title' v-if='activeIndex==2'>京东</view>
						<view class='icon-b'></view>
					</view>
					<input type="text" :placeholder="defaultKeyword" @input="inputChange" v-model="keyword" @confirm="doSearch(false)"
					 placeholder-class="placeholder-class" confirm-type="search">
					<view class='icon-clear' @click='clear'></view>
				</view>
				<view class='icon-change' v-if='searchList.length>0' @click='changeSt'></view>
			</view>
			<VTabhead ref="VTabhead" v-if='searchList.length>0' @changeTab="changeTab" :VTabhead_list="VTabhead_list"
			 :VTabhead_act="VTabhead_act"></VTabhead>
		</view>
		<view class="search-keyword" v-if='searchList.length==0&&!isShow'>
			<scroll-view class="keyword-box" scroll-y>

				<view class="keyword-block">
					<view class="keyword-list-header">
						<view class='hotSearch'>热门搜索</view>
					</view>
					<view class="keyword" v-if="hotKeywordList.length>0">
						<view v-for="(item,index) in hotKeywordList" @tap="doSearch(item.configVal)" :key="index">{{item.configVal}}</view>
					</view>
					<view class="null" v-if="hotKeywordList.length<=0">
						暂时没有热门搜索哦
					</view>
				</view>
				<view class="keyword-block" >
					<view class="keyword-list-header" v-if="oldKeywordList.length>0">
						<view>搜索历史</view>
						<image @tap="oldDelete" src="/static/search/delete.png"></image>
					</view>
					<view class="keyword " v-if="oldKeywordList.length>0">
						<view class='history' v-for="(item,index) in oldKeywordList" @tap="doSearch(item)" :key="index">{{item}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class='searchList' v-if='searchList.length>0&&isShow'>
			<VScroll ref="VScroll" @scrollToEnd="search" :vScrollData="searchList" pullup>
				<view class='value'>
					<VGoods :goodsList='searchList' :type='type' :channel='activeIndex' @openPop='openPop'></VGoods>
					<uniLoadMore :status="VTabhead_list[VTabhead_act].loadingType"></uniLoadMore>
				</view>
			</VScroll>
		</view>
		<VEmpty v-if='searchList.length==0&&isShow&&!isLoading' :img='"/static/common/nullSearch.png"'></VEmpty>
		<uniLoadMore :status="'loading'" v-if='searchList.length==0&&isShow&&isLoading' class='loading'></uniLoadMore>
	</view>
</template>

<script>
	//引用mSearch组件，如不需要删除即可
	import VTabhead from "@/components/VTabhead"
	import VGoods from "@/components/VGoods.vue"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import VEmpty from "@/components/VEmpty";
	import  vPop  from '@/components/VPop.vue'
	import  popMixins  from '@/common/popMixins'
	export default {
		mixins:[popMixins],
		components: {
			VGoods,
			VTabhead,
			uniLoadMore,
			VEmpty,
			vPop
		},
		data() {
			return {
				defaultKeyword: "",
				keyword: "",
				oldKeywordList: [],
				hotKeywordList: [],
				searchList: [], //搜索到的列表
				type: 2,
				VTabhead_act: 0,
				// sort:true为升序（由小到大_asc）、false为降序（由大到小_des）；loadingType：三种状态more、loading、nomore
				VTabhead_list: [{
						text: '推荐',
						loadingType: 'more',
						pageNum: 1,
						sort: true,
						dataList: []
					},
					{
						text: '券后价',
						loadingType: 'more',
						pageNum: 1,
						sort: true,
						dataList: []
					},
					{
						text: '销量',
						loadingType: 'more',
						pageNum: 1,
						sort: false,
						dataList: []
					},
				],


				isShow: false,
				goodsList_params: {
					query: "男装",
					sort: "price_des",
					pageNum: 1,
					pageSize: 10,
					isCoupon:false
				},
				isLoading:true,
				activeIndex:0,
				userInfo: this.$store.getters.userInfo,
				isjdSharePop:false
				
				
			}
		},
		onShow() {
			this.clear();
			this.isLoading=true
			this.activeIndex=this.$common.getCookie("searchActiveIndex")||0;
			this.activeIndex=Number.parseInt(this.activeIndex);
			console.log(typeof this.activeIndex)
			// 如果store里有搜索的参数，则表示来自与分类等地方，需要加上commodityConfigId参数
			if (this.$store.getters.searchObject) {
				this.doSearch();
			}
			this.loadOldKeyword();
			this.loadHotKeyword();
			
			// this.doSearch();
			
		},
		onLoad(options) {
		},
		watch: {},
		methods: {
			reset() {
				this.VTabhead_act = 0
				this.searchList = []
				this.VTabhead_list = [{
						text: '推荐',
						loadingType: 'more',
						pageNum: 1,
						sort: true,
						dataList: []
					},
					{
						text: '券后价',
						loadingType: 'more',
						pageNum: 1,
						sort: true,
						dataList: []
					},
					{
						text: '销量',
						loadingType: 'more',
						pageNum: 1,
						sort: false,
						dataList: []
					},
				]
				this.goodsList_params = {
					pageNum: 1,
					pageSize: 10,
					isCoupon:false
				}
			},
			changeSt() { //改变
				this.type = this.type == 1 ? 2 : 1;
			},
			clear() {
				this.keyword = '';
				this.searchList = [];
				this.isShow = false;
				this.VTabhead_act = 0;
			},
			//加载历史搜索,自动读取本地Storage
			loadOldKeyword() {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						var OldKeys = JSON.parse(res.data);
						this.oldKeywordList = OldKeys;
					}
				});
			},
			//加载热门搜索
			async loadHotKeyword() {
				let res = await this.$api.getByType({
					configEnum: "HOT_SEARCH"
				});
				this.hotKeywordList = res.data;
			},
			//监听输入
			inputChange(event) {
				this.isShow = false;
				this.searchList = [];
			},
			//清除历史搜索
			oldDelete() {
				uni.showModal({
					content: '确定清除历史搜索记录？',
					success: (res) => {
						if (res.confirm) {
							this.oldKeywordList = [];
							uni.removeStorage({
								key: 'OldKeys'
							});
						} else if (res.cancel) {}
					}
				});
			},
			//执行搜索
			doSearch(key) {
				// if(this.activeIndex==2){//京东必须登录
				// 	if(!this.userInfo){
				// 		let url=encodeURIComponent(`${window.location.href}`)
				// 		url=`/pages/public/login?url=${url}`
				// 		uni.navigateTo({
				// 			url:url
				// 		})
				// 	}
				// }
				this.reset()
				key = key || this.keyword || this.defaultKeyword;
				this.keyword = key;

				// 如果store里有搜索的参数，则表示来自与分类等地方，需要加上commodityConfigId参数
				if (this.$store.getters.searchObject) {
					this.keyword = this.$store.getters.searchObject.val;
					// 注意这里传入二级类目id，commodityConfigId；取的是parentId
					this.$set(this.goodsList_params, 'commodityConfigId', this.$store.getters.searchObject.parentId)
					this.isShow = true;
					// 由于加了commodityConfigId，参数设置完后将store的searchObject清空，防止影响后面的正常搜索
					this.$store.dispatch('searchObject', null)
				}else{
					// 用户手动搜索的添加该参数
					this.$set(this.goodsList_params, 'searchFlag', 1)
					
					//保存为历史 
					// 只有在搜索页面手动输入或点击的才保存
					this.saveKeyword(this.keyword); 
				}
				this.search();
				
				
			},
			//保存关键字到历史记录
			saveKeyword(keyword) {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						var OldKeys = JSON.parse(res.data);
						var findIndex = OldKeys.indexOf(keyword);
						if (findIndex == -1) {
							OldKeys.unshift(keyword);
						} else {
							OldKeys.splice(findIndex, 1);
							OldKeys.unshift(keyword);
						}
						//最多10个纪录
						OldKeys.length > 30 && OldKeys.pop();
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					},
					fail: (e) => {
						var OldKeys = [keyword];
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					}
				});
			},
			//搜索结果
			async search() {
				//请求前 先设置请求参数
				this.setParams()

				let VTabhead_item = this.VTabhead_list[this.VTabhead_act]
				//如果是正在加载或是没有更多了则不再请求，防止重复加载
				if (VTabhead_item.loadingType === 'loading' || VTabhead_item.loadingType === 'noMore') {
					return;
				}
				VTabhead_item.loadingType = 'loading';
				let res
				if(this.activeIndex==0){//淘宝
					 res=await this.$api.getBeInCommonUseQuery(this.goodsList_params);
				}else if(this.activeIndex==1){//拼多多
					 res=await this.$api.getPddDdkGoods(this.goodsList_params);
					
				}else{//京东
					res=await this.$api.getCateGoodList(this.goodsList_params);
				}
				
				let goodsList=""
				this.isLoading=false
				if(res.data){
					goodsList =res.data;
					this.isShow=true;
				}else{
					goodsList=[];
					this.isShow=true;
				}
				VTabhead_item.dataList.push(...goodsList)
				// this.saveKeyword(this.keyword); //保存为历史 
				// 用searchList变量给VGoods组件展示商品
				this.searchList = VTabhead_item.dataList
				//判断是否还有数据， 有改为 more， 没有改为noMore 
				// 来自淘宝的接口可能出现某一页数量不足了，但下一页还有数据的情况，故只按照有没有数据来判断
				if (!goodsList.length) {
					VTabhead_item.loadingType = 'noMore';
					return
				} 
				VTabhead_item.loadingType = 'more';
				
				VTabhead_item.pageNum++

			},

			changeTab({
				index,
				VTabhead_list
			}) {
				// 滚动到顶部
				this.$refs.VScroll.scrollTo(0, 20)
				//点击已选中的选项时，切换排序，要将数据清空
				if (this.VTabhead_act == index) {
					this.$set(this.VTabhead_list[index], 'dataList', [])
				}
				this.VTabhead_act = index;
				this.VTabhead_list = VTabhead_list;
				// 当这个选项没有数据或为空的时候才请求，否在就直接用原来的数据
				if (!this.VTabhead_list[index].dataList || this.VTabhead_list[index].dataList == 0) {
					this.search();
				} else {
					this.searchList = this.VTabhead_list[index].dataList
				}

			},
			//返回搜索接口所需的参数
			setParams() {
				let sort = this.VTabhead_list[this.VTabhead_act].sort
				let pageNum = this.VTabhead_list[this.VTabhead_act].pageNum
				let sortName=this.activeIndex==1?'sortType':'sort'; //1是拼多多，淘宝和京东一样
				
				
				let sortValue;

				if (this.VTabhead_act == 0) {//推荐
					sortValue=this.activeIndex==1?'0':''
					
				} else if (this.VTabhead_act == 1) {//劵后价
					if (sort) {
						sortValue=this.activeIndex==1?'9':'price_asc'
					} else {
						sortValue=this.activeIndex==1?'10':'price_des'
					}

				} else if (this.VTabhead_act == 2) {//销量
					if (sort) {
						sortValue=this.activeIndex==1?'5':'total_sales_asc'
					} else {
						sortValue=this.activeIndex==1?'6':'total_sales_des'
					}
				}
				this.$set(this.goodsList_params, sortName, sortValue)
				this.$set(this.goodsList_params, 'pageNum', pageNum)
				
				if(this.activeIndex==1){
					this.$set(this.goodsList_params, 'keyword', this.keyword)
				}else{
					this.$set(this.goodsList_params, 'query', this.keyword)
				}
				
			},
			changeType(){
				uni.navigateTo({
					url: `/pages/search/channlType`,
				});
			},
			openPop(text){
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


		}
	}
</script>
<style lang="scss">
	page {
		background: #fff;
		input{
			line-height: normal；
		}
	}

	.top {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 2;
	}

	.search-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24upx;
		background: rgba(242, 242, 242, 1);

		.input-box {
			width: 90%;
			flex-shrink: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;

			input {
				width: 100%;
				-webkit-appearance: none;
				-moz-appearance: none;
				appearance: none;
				background-color: #ffffff;
				height: 62upx;
				background: #fff;
				border-radius: 30upx;
				font-size: 26upx;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				padding-left: 33upx;
			}

			.icon-clear {
				position: absolute;
				top: 0;
				right: 0;
				margin-right: 10upx;
				width: 66upx;
				height: 66upx;
				background: url(/static/search/icon-clear.png) no-repeat center center;
				background-size: 40%;
				z-index: 3;
				box-sizing: border-box;
			}
		}

		.icon-change {
			width: 36upx;
			height: 36upx;
			background: url(/static/my/icon-change.png) no-repeat;
			background-size: 100%;
		}
	}

	.placeholder-class {
		color: #9e9e9e;
	}

	.search-keyword {
		width: 100%;
		background-color: rgb(242, 242, 242);
		padding-top: 100upx;
	}

	.keyword-box {
		border-radius: 10upx 10upx 0 0;
		background-color: #fff;
		padding: 30upx 24upx;

		.keyword-block {
			margin-bottom: 30upx;

			.keyword-list-header {
				width: 100%;
				font-size: 28upx;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 30upx 0;

				image {
					width: 30upx;
					height: 30upx;
				}

				.hotSearch {
					color: rgba(191, 54, 39, 1);
				}
			}

			.keyword {
				display: flex;
				flex-flow: wrap;
				justify-content: flex-start;

				view {
					font-size: 24upx;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					background: rgba(242, 242, 242, 1);
					border-radius: 24upx;
					padding: 10upx 20upx;
					margin: 10upx 20upx 20upx 0;
				}

				.history {
					background-color: #fff;
				}
			}

			.null {
				text-align: center;
			}
		}
	}

	.searchList {

		// padding-top: 220upx;
		// position: relative;
		.title {
			background-color: rgb(242, 242, 242);
			padding: 20upx 0;
		}

		.value {
			padding-top: 30upx;
			border-radius: 10upx 10upx 0 0;
		}
	}

	.VScroll {
		position: absolute;
		top: 198upx;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: hidden;
	}
	.VEmpty{
		padding-top: 240upx;
	}
	.loading{
		padding-top: 240upx;
	}
	.change-box{
		display: flex;
		align-items: center;
		justify-content: space-around;
		flex: 0 0 20%;
		margin-right: 26upx;
		.title{
			font-size: 26upx;
		}
		.icon{
			width:30upx;
			height:30upx;
			border-radius:4upx;
		}
		.icon-active0{
			background: url(/static/index/icon-taobao.png) no-repeat;
			background-size: 100%;
		}
		.icon-active1{
			background: url(/static/index/icon-pidd.png) no-repeat;
			background-size: 100%;
		}
		.icon-active2{
			background: url(/static/index/icon-jd.jpg) no-repeat;
			background-size: 100%;
		}
		.icon-b{
			width:12upx;
			height:10upx;
			background: url(/static/search/icon-b.png) no-repeat;
			background-size: 100%;
		}
	}
	
</style>
