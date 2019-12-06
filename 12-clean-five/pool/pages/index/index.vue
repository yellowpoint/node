<!-- 首页 -->
<template>
	<div class="indexWrap">
		<div class="bannerBox">
			<div class="slideshowBox">
				<swiper :options="swiperOption" class="swiper-container" >
					<swiper-slide class="swiper-item" v-for="(item, index) of bannerData" :key="index">
						<div class="swiperItemBox">
							<img class='swiper-img' :src="item.imgSrc" alt="" />
						</div>
					</swiper-slide>
					<div class="swiper-pagination pagination-position"  slot="pagination"></div>
					<div class="swiper-button-prev" slot="button-prev">
						<i class="el-icon-arrow-left"></i>
					</div>
					<div class="swiper-button-next" slot="button-next">
						<i class="el-icon-arrow-right"></i>
					</div>
					
				</swiper>
			</div>
		</div>
		<div class="index content">
			<!--顶部仪表盘开始-->
			<div class="panel">
				<!-- 全网容量 -->
				<div class="panel-col1">
					<div class="panel-currency">
						<div 
							v-for="(item, index) in poolTypeData" 
							:key="index"
							class="panel-currency-item"
							:class="item.active ? 'act' : ''"
							v-html="item.name"
							@click="switchPoolType(item, index)"
						>
						</div>
					</div>
					<div v-show="poolType == 0" class="panel-col1-main" style="padding-top: 0.16rem;">
						<i class="icon iconfont icon-weibiaoti- bigIcon"></i>
						<p class="hirsb-font">{{allVolume}}</p>
						<span>全网容量</span>
						<span>(PB)</span>
					</div>
					<div v-show="poolType == 1" class="panel-col1-main" style="padding-top: 0.16rem;">
						<i class="icon iconfont icon-weibiaoti- green bigIcon"></i>
						<p class="hirsb-font">{{allVolume}}</p>
						<span>全网容量</span>
						<span>(PB)</span>
					</div>
					<div v-show="poolType == 0" class="panel-col1-main">
						<i class="icon iconfont icon-xiaoshishouyi bigIcon"></i>
						<p class="hirsb-font">{{bluePool.coinSize || 0}} BHD/PB</p>
						<span>主矿池24小时收益均值</span>
					</div>
					<div v-show="poolType == 1" class="panel-col1-main">
							<i class="icon iconfont icon-xiaoshishouyi green bigIcon"></i>
							<p class="hirsb-font">{{greenPool.coinSize || 0}} BHD/PB</p>
							<span>生态池24小时收益均值</span>
						</div>
				</div>
				<!-- 主矿池 -->
				<div v-show="poolType == 0" class="panel-col2 variousInfo">
					<div class="panel-col2-row">
						<!-- <div class="panel-col2-row-col">
							<i class="icon iconfont icon-kuangchirongliang"></i>
							<p class="hirsb-font">{{mainPoolIncome}} BHD/PB</p>
							<span>全网预期收益</span>
						</div>
						<div class="panel-col2-row-col">
							<i class="icon iconfont icon-xiaoshishouyi"></i>
							<p class="hirsb-font">{{bluePool.coinSize || 0}} BHD/PB</p>
							<span>主矿池24小时收益</span>
						</div> -->
						<div class="panel-col2-row-col">
							<i class="icon iconfont icon-kuangchirongliang"></i>
							<p class="hirsb-font">{{bluePool.volume || 0}} PB</p>
							<span>主矿池容量</span>
						</div>
						<div class="panel-col2-row-col">
							<i class="icon iconfont icon-xiaoshibaokuai"></i>
							<p class="hirsb-font">{{bluePool.coinCount || 0}}</p>
							<span>24小时爆块</span>
						</div>
					</div>
					<div class="panel-col2-row">
						<div class="panel-col2-row-col">
							<i class="icon iconfont icon-zaixiankuanggong"></i>
							<p class="hirsb-font">{{bluePool.minerOnlineCount || 0}}</p>
							<span>在线矿工</span>
						</div>
						<div class="panel-col2-row-col">
							<i class="icon iconfont icon-zaixiankuangji"></i>
							<p class="hirsb-font">{{bluePool.mineOnlineCount || 0}}</p>
							<span>在线矿机</span>
						</div>
					</div>
				</div>
				<!-- 生态池 -->
				<div v-show="poolType == 1" class="panel-col2 variousInfo">
					<div class="panel-col2-row">
						<div class="panel-col2-row-col">
							<i class="icon iconfont icon-kuangchirongliang green"></i>
							<p class="hirsb-font">{{greenPool.volume || 0}} PB</p>
							<span>生态池容量</span>
						</div>
						<div class="panel-col2-row-col">
							<i class="icon iconfont icon-xiaoshibaokuai green"></i>
							<p class="hirsb-font">{{greenPool.coinCount || 0}}</p>
							<span>24小时爆块</span>
						</div>
					</div>
					<div class="panel-col2-row">
						<div class="panel-col2-row-col">
							<i class="icon iconfont icon-zaixiankuanggong green"></i>
							<p class="hirsb-font">{{greenPool.minerOnlineCount || 0}}</p>
							<span>在线矿工</span>
						</div>
						<div class="panel-col2-row-col">
							<i class="icon iconfont icon-zaixiankuangji green"></i>
							<p class="hirsb-font">{{greenPool.mineOnlineCount || 0}}</p>
							<span>在线矿机</span>
						</div>
					</div>
				</div>
			</div>
			<!--顶部仪表盘结束-->
			<!--表格区域开始-->
			<!-- 主矿池 -->
			<div class="tableArea">
				<div class="table-left">
					<!-- 主矿池最近挖到的区块 -->
					<div class="tableItem latelyBlock">
						<div class="tableTitle">主矿池最近挖到的区块</div>
						<div class="tableBox">
							<el-table
								:data="latelyBlueBlockData.list"
								stripe
								:row-class-name="tableRowClassName"
								:row-style="rowStyle"
							>
								<!-- 自定义暂无数据提示 -->
								<template slot="empty">
									<div class="defineNotData">
										<svg class="icon svg-icon" aria-hidden="true">
											<use xlink:href="#icon-weibiaoti-1"></use>
										</svg>
										<p>抱歉，暂时没有数据</p>
									</div>
								</template>
								<el-table-column
									prop="blockCode"
									label="区块"
									align="center"
									:width="isPC ? '' : '70'"
								>
								</el-table-column>
								<el-table-column
									prop="minerNickName"
									label="矿工ID"
									align="center"
									:width="isPC ? '' : '70'"
								>
								</el-table-column>
								<el-table-column
									prop="date"
									label="时间"
									align="center"
									:width="isPC ? '240' : ''"
								>
									<template slot-scope="scope">
										<span class="createDate">{{ scope.row.time | moment('y-M-d h:m')}}</span>
									</template>
								</el-table-column>
								<el-table-column
									prop="coinSize"
									label="数量(BHD)"
									align="center"
								>
								</el-table-column>
							</el-table>
							<div class="tablePagination">
								<el-pagination
									layout="prev, pager, next"
									:total="latelyBlueBlockData.pages*10"
									@current-change="blockCurrentChange"
									@prev-click="blockPrevPage"
									@next-click="blockNextPage"
								>
								</el-pagination>
							</div>
						</div>
					</div>
				</div>
				<div class="table-right">
					<!-- 主矿池容量排行榜 -->
					<div class="tableItem ranking">
						<div class="tableTitle">主矿池容量排行榜</div>
						<div class="tableBox">

							<el-table
								:data="bluePollVolumeRanking"
								stripe
								style="width: 100%"
								:row-class-name="tableRowClassName"
								:row-style="rowStyle"
							>
								<!-- 自定义暂无数据提示 -->
								<template slot="empty">
									<div class="defineNotData">
										<svg class="icon svg-icon" aria-hidden="true">
											<use xlink:href="#icon-weibiaoti-1"></use>
										</svg>
										<p>抱歉，暂时没有数据</p>
									</div>
								</template>
								<el-table-column
									prop="date"
									label="排名"
									width=""
									align="center"
								>
									<template slot-scope="scope">
										<span v-text="scope.$index+1"></span>
									</template>
								</el-table-column>
								<el-table-column
									prop="userAccount"
									label="矿工ID"
									width=""
									align="center"
								>
									<template slot-scope="scope">
										<span>{{scope.row.userAccount || ''}}</span>
									</template>
								</el-table-column>
								<el-table-column
									prop="volume"
									label="算力(PB)"
									align="center"
								>
								</el-table-column>
							</el-table>
						</div>
					</div>
				</div>
			</div>
			<!-- 生态池 -->
			<div class="tableArea">
				<div class="table-left">
					<!-- 生态池最近挖到的区块 -->
					<div class="tableItem latelyBlock">
						<div class="tableTitle green">生态池最近挖到的区块</div>
						<div class="tableBox">
							<el-table
								:data="latelyGreenBlockData.list"
								stripe
								:row-class-name="tableRowClassName"
								:row-style="rowStyle"
							>
								<!-- 自定义暂无数据提示 -->
								<template slot="empty">
									<div class="defineNotData">
										<svg class="icon svg-icon" aria-hidden="true">
											<use xlink:href="#icon-weibiaoti-1"></use>
										</svg>
										<p>抱歉，暂时没有数据</p>
									</div>
								</template>
								<el-table-column
									prop="blockCode"
									label="区块"
									align="center"
									:width="isPC ? '' : '70'"
								>
								</el-table-column>
								<el-table-column
									prop="minerNickName"
									label="矿工ID"
									align="center"
									:width="isPC ? '' : '70'"
								>
									<template slot-scope="scope">
										<div class="ecoUserBox">
											<img class="userTypeImg" src="~assets/images/header/eco.png" />
											<span class="createDate">{{ scope.row.minerNickName}}</span>
										</div>
									</template>
								</el-table-column>
								<el-table-column
									prop="date"
									label="时间"
									align="center"
									:width="isPC ? '240' : ''"
								>
									<template slot-scope="scope">
										<span class="createDate">{{ scope.row.time | moment('y-M-d h:m')}}</span>
									</template>
								</el-table-column>
								<el-table-column
									prop="coinSize"
									label="数量(BHD)"
									align="center"
								>
								</el-table-column>
							</el-table>
							<div class="tablePagination">
								<el-pagination
									layout="prev, pager, next"
									:total="latelyGreenBlockData.pages*10"
									@current-change="greenBlockCurrentChange"
									@prev-click="greenBlockPrevPage"
									@next-click="greenBlockNextPage"
								>
								</el-pagination>
							</div>
						</div>
					</div>
				</div>
				<div class="table-right">
					<!-- 生态池容量排行榜 -->
					<div class="tableItem ranking">
						<div class="tableTitle green">生态池容量排行榜</div>
						<div class="tableBox">

							<el-table
								:data="greenPollVolumeRanking"
								stripe
								style="width: 100%"
								:row-class-name="tableRowClassName"
								:row-style="rowStyle"
							>
								<!-- 自定义暂无数据提示 -->
								<template slot="empty">
									<div class="defineNotData">
										<svg class="icon svg-icon" aria-hidden="true">
											<use xlink:href="#icon-weibiaoti-1"></use>
										</svg>
										<p>抱歉，暂时没有数据</p>
									</div>
								</template>
								<el-table-column
									prop="date"
									label="排名"
									width=""
									align="center"
								>
									<template slot-scope="scope">
										<span v-text="scope.$index+1"></span>
									</template>
								</el-table-column>
								<el-table-column
									prop="userAccount"
									label="矿工ID"
									width=""
									align="center"
								>
									<template slot-scope="scope">
										<div class="ecoUserBox">
											<img class="userTypeImg" src="~assets/images/header/eco.png" />
											<span class="createDate">{{ scope.row.userAccount}}</span>
										</div>
									</template>
								</el-table-column>
								<el-table-column
									prop="volume"
									label="算力(PB)"
									align="center"
								>
								</el-table-column>
							</el-table>
						</div>
					</div>
				</div>
			</div>
			<!-- 公告 -->
			<div class="tableArea">
				<div class="affiche">
					<div class="tableTitle"><i class="icon iconfont icon-tongzhi- gonggao"></i>公告</div>
					<div class="tableMore" @click="toAffiche">更多</div>
					<div class="tableMain">
						<div class="noticeUl">
							<div class="noticeLi" 
								v-for="(item,index) of afficheData.list" 
								:key="index"
								@click="showContent(item)"
								:class="index%2 != 0 ? 'zebraBg' : ''"
							>
								<p>{{item.messageName}}</p>
								<span>{{item.updateTime | moment('y-M-d')}}</span>
							</div>
							<div class="defineNotData" v-if="!afficheData.list || !afficheData.list.length">
								<svg class="icon svg-icon" aria-hidden="true">
									<use xlink:href="#icon-weibiaoti-1"></use>
								</svg>
								<p>抱歉，暂时没有数据</p>
							</div>	
						</div>
					</div>
				</div>
			</div>
			<!--表格区域结束-->
		</div>
		<!-- 广告图区域 -->
		<div class="animateAreaWrap">
			<div class="animateArea">
				<div class="advantageImgBoxWrap">
					<img src="~assets/images/home/advantageBG.png" class="testImg" alt="">
					<div class="advantageImgBox">
						<div ref="advantageTitle" class="advantageTitle">
							<h3>平台优势</h3>
							<p>以用户为中心，竭诚为您服务</p>
						</div>
					</div>
				</div>
				<div ref="advantageImg" class="advantageImg">
					<div v-if="showAdvantage" class="advantage">
						<div class="advantageItem animated flipInY"
							v-for="(item, index) in advantageData" 
							:key="index"
							:style="{'animation-delay': `${index * 0.2}s`}"
						>
							<img :src="item.imgSrc" alt="">
							<div class="itemTextBox">
								<div class="itemTitle">{{item.title}}</div>
								<p>{{item.msg1}}</p>
								<p>{{item.msg2}}</p>
							</div>
						</div>
					</div>
				</div>

				<div class="advantageStepWrap">
					<div ref="advantageStep" class="advantageStep">
						<img src="~assets/images/home/text2.png" alt="">
					</div>
				</div>
			</div>
			<div class="getCourse" @click="toCourse"></div>
		</div>
	</div>
</template>

<script>
	import VTable from "@/components/VTable";
	import 'swiper/dist/css/swiper.css'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	let vm = null;
	export default {
		name: 'index',
		components: {
			VTable,
			swiper,
			swiperSlide,
		},
		data() {
			return {
				allVolume: 0, // 全网算力
				bluePool: {}, // 主矿池
				greenPool: {}, // vip矿池
				latelyBlueBlockData: {}, // 最近爆块
				latelyGreenBlockData: {}, // 生态池最近爆块
				bluePollVolumeRanking: [], // 主矿池排名
				greenPollVolumeRanking: [], // 生态池排名
				mainRankingPage: 1,
				ecoRankingPage: 1,
				table_lastBlock:[],
				noticePage: 1,
				blockPage: 1,
				blockGreenPage: 1,
				afficheData: {},
				realIndex: 0, // 实际下标
				swiperOption:{
					// 是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象
					// 假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
					// notNextTick: true,
					initialSlide: 0, // 轮播起始页
					// 参数选项,显示小点
					pagination:'.swiper-pagination',
					slidesPerView: 'auto',
					roundLengths: true, // 防止文字模糊
					loop: true, //循环
					autoplay: { //自动播放
						delay: 8000,//8秒切换一次
						disableOnInteraction: false,// 用户操作后是否禁止自动轮播
					},
					speed: 600,//滑动速度600
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
						type: 'bullets'
					},
					on: {
						// 由于swiper循环复制的块没有点击事件故用其click事件，然后通过类名来区分处理误点击
						click: function(...args) {
							// 这里有坑，需要注意的是：this 指向的是 swpier 实例，而不是当前的 vue， 因此借助 vm，来调用 methods 里的方法 
							// console.log(this); // -> Swiper
							// 当前活动块的索引，与activeIndex不同的是，在loop模式下不会将 复制的块 的数量计算在内。
							let clickTarget = args[0].target.className; // 过滤swiper翻页按钮和分页按点点击引起的冒泡事件
							if(clickTarget.indexOf('swiper-button-next') == -1 && clickTarget.indexOf('swiper-button-prev') == -1 && clickTarget.indexOf('el-icon-arrow-right') == -1 && clickTarget.indexOf('el-icon-arrow-left') == -1 && clickTarget.indexOf('swiper-pagination') == -1 &&  clickTarget.indexOf('swiper-pagination-bullet') == -1) {
								vm.handleClickSlide(this.realIndex);
							}
						}
					}
				},
				poolType: 0,
				poolTypeData: [
					{
						name: `主<br/>矿<br/>池`,
						active: true,
					},
					{
						name: `生<br/>态<br/>池`,
						active: false,
					},
				],
				bannerData: [
					{
						imgSrc: require('assets/images/home/borrowingTreasure.png'),
						path: '/borrowingTreasure',
					},
					{
						imgSrc: require('assets/images/home/deposit.png'),
						path: '/deposit',
					},
					{
						imgSrc: require('assets/images/home/bannerFont.png'),
						path: '',
					},
				],
				advantageData: [
					{
						title: '安全稳重',
						msg1: '多重签名技术',
						msg2: '冷热钱包实时清算',
						imgSrc: require('assets/images/home/advantage1.png'),
					},
					{
						title: '公开透明',
						msg1: '平台费用公开透明',
						msg2: '拒绝任何虚假信息',
						imgSrc: require('assets/images/home/advantage2.png'),
					},
					{
						title: '贴心服务',
						msg1: '专业客服一对一',
						msg2: '为您提供优质服务',
						imgSrc: require('assets/images/home/advantage3.png'),
					},
					{
						title: '强大支撑',
						msg1: '自有大型矿厂',
						msg2: '更懂矿工',
						imgSrc: require('assets/images/home/advantage4.png'),
					}
				],
				showAdvantage: false,
			}
		},
		props: {

		},
		created() {
			vm = this;
			this.init();
		},

		mounted() {
			console.log(this);
			this.$store.dispatch('setLangKey', 'zh')
			if(window.attachEvent) { // 挂载添加滚动监听
                window.attachEvent("scroll", this.advantageAni); 
            } else if(window.addEventListener) {
                window.addEventListener("scroll", this.advantageAni);   
			}
			this.getNoticeList();
		},
		computed: {
			mineType() { // 币种 默认BHD
                return this.$store.getters.mineType;
			},
			isPC(){
                if(document.body.clientWidth <= 768) {
                    return false;
                }else{
                    return true;
                }
			},
			mainPoolIncome() {
				if(this.allVolume <= 0 ) {
					return 0;
				}else{
					return 0;
					// let divCount = this.$common.accDiv(288, this.allVolume);
					// console.log('divCount',divCount);
					// return this.$common.accMul(divCount, 23.75);
				}
			},
			ecoPoolIncome() {
				if(this.allVolume <= 0) {
					return 0;
				}else{
					return 0;
					// let divCount = this.$common.accDiv(288, this.allVolume);
					// console.log('divCount',divCount);
					// return this.$common.accMul(divCount, 7.5);
				}
			},
		},
		beforeCreate() {
			document.querySelector('#app').setAttribute('style', 'background: rgba(246,249,252,0.5);')
		},
		beforeDestroy() {
			document.querySelector('#app').setAttribute('style', '')
			if(window.detachEvent) { // 销毁移除滚动监听
				window.detachEvent("scroll", this.advantageAni); 
			} else if(window.removeEventListener) {
				window.removeEventListener("scroll", this.advantageAni);
			}
		},

		methods: {
			init() {
				this.getAllVolume();
				this.getBluePool();
				this.getGreenPool();
				this.getLatelyBlock();
				this.getLatelyGreenBlock();
				this.getBluePoolVolumeRanking();
				this.getGreenPoolVolumeRanking();
			},
			tableRowClassName({row, rowIndex}) {
                return 'animated flipInX';
            },
            rowStyle({row, rowIndex}){
                return `animation-delay: ${rowIndex * 0.1}s`
            },
			toAffiche() {
				this.$router.push('/affiche');
			},
			handleClickSlide(index) {
				if(index == 0) {
					this.$router.push('/borrowingTreasure');
				}
				if(index == 1) {
					this.$router.push('/deposit');
				}
			} ,
			switchPoolType(selectItem, index) {
				for (const item of this.poolTypeData) {
					item.active = false;
				}
				selectItem.active = true;
				this.poolType = index;
			},
			getAllVolume() { // 获取全网算力
				let data = {
					mineType: this.mineType,
				}
				this.$api.allVolume(data).then( res => {
					this.allVolume = res;
				}).catch( err => {
					console.log('全网算力错误', err);
				})
			},
			getBluePool() { // 获取主矿池的信息
				let data = {
					mineType: this.mineType,
					vip: 0,
				}
				this.$api.poolVolume(data).then( res => {
					console.log('主矿池的信息正确', res);
					this.bluePool = res;
				}).catch( err => {
					console.log('主矿池的信息错误', err);
				})
			},
			getGreenPool() { // 获取生态池的信息
				let data = {
					mineType: this.mineType,
					vip: 2,
				}
				this.$api.poolVolume(data).then( res => {
					console.log('生态池的信息正确', res);
					this.greenPool = res;
				}).catch( err => {
					console.log('生态池的信息错误', err);
				})
			},
			getLatelyGreenBlock() { // 生态池最近挖到的区块 参数 page=1&pageSize=20
				let data = {
					mineType: this.mineType,
					page: this.blockGreenPage,
					pageSize: 10,
				}
				this.$api.latelygreenBlock(data).then( res => {
					this.latelyGreenBlockData = res;
					console.log('生态池挖到的区块', res);
				}).catch( err => {
					console.log('最近挖到的区块错误', err);
				})
			},
			greenBlockCurrentChange(val) {
				this.blockGreenPage = val;
				this.getLatelyGreenBlock();
			},
			greenBlockPrevPage() {
				this.blockGreenPage -= 1;
				this.getLatelyGreenBlock();
			},
			greenBlockNextPage() {
				this.blockGreenPage += 1;
				this.getLatelyGreenBlock();
			},
			getLatelyBlock() { // 最近挖到的区块 参数 page=1&pageSize=20
				let data = {
					mineType: this.mineType,
					page: this.blockPage,
					pageSize: 10,
				}
				this.$api.latelyBlock(data).then( res => {
					this.latelyBlueBlockData = res;
					console.log('主矿池挖到的区块', res);
				}).catch( err => {
					console.log('最近挖到的区块错误', err);
				})
			},
			blockCurrentChange(val) {
				this.blockPage = val;
				this.getLatelyBlock();
			},
			blockPrevPage() {
				this.blockPage -= 1;
				this.getLatelyBlock();
			},
			blockNextPage() {
				this.blockPage += 1;
				this.getLatelyBlock();
			},
			getBluePoolVolumeRanking() { // 主矿池容量排行
				let data = {
					mineType: this.mineType,
					vip: 0,
					page: this.mainRankingPage,
					pageSize: 10,
				}
				this.$api.pollVolumeRanking(data).then( res => {
					this.bluePollVolumeRanking = res;
					console.log('主矿池容量排行', res);
				}).catch( err => {
					console.log('主矿池容量排行错误', err);
				})
			},
			getGreenPoolVolumeRanking() { // 生态池容量排行
				let data = {
					mineType: this.mineType,
					vip: 2,
					page: this.ecoRankingPage,
					pageSize: 10,
				}
				this.$api.pollVolumeRanking(data).then( res => {
					this.greenPollVolumeRanking = res;
					console.log('生态池容量排行', res);
				}).catch( err => {
					console.log('生态池容量排行错误', err);
				})
			},
			advantageAni() {
				let el_2 = this.$refs.advantageImg;
				let obj_2 = el_2.getBoundingClientRect();
				let winHeight = document.documentElement.clientHeight || document.body.clientHeight;
				if(obj_2.top < winHeight && obj_2.bottom > 0) {
					this.showAdvantage = true;
				}else{
					this.showAdvantage = false;
				}
			},
			toCourse() { // 跳转挖矿教程
				// const { href } = this.$router.resolve({
				// 	path: '/course'
				// })
				// window.open(href, '_blank');
				window.open('http://51app-file-test.oss-cn-hangzhou.aliyuncs.com/payment/other/2019/7/12/18555471096465.pdf', '_blank');
			},
			getNoticeList(){ // 拉取公告数据
                let data = {
                    language: 'zh',
                    page: this.noticePage,
                    pageSize: 6,
                }
                this.$api.noticeList(data).then( res => {
                    this.afficheData = res;
                    console.log('公告列表', res);
                }).catch( err => {
                    console.log('公告列表错误', err);
                })
			},
			showContent(item) { // 公告弹窗
                this.$MsgPopup({
                    msgData: item,
                });
			},
		}
	}
</script>

<style lang="less">
.index{
	
	.el-table__header-wrapper{
		.el-table__header{
			th{
				height: 0.8rem;
				.cell{
					font-size: 0.16rem;
					font-weight: bold;
					color: #666666;
				}
			}
		}
	}
	.latelyBlock{
		.el-table{
			box-shadow: none;
			margin-bottom: 0;
			.el-table__body-wrapper{
				height: 4.8rem;
				@media (max-width: 768px) {
					height: auto;
				}
				tbody tr:last-child{
					td{
						border-bottom: 1px solid #ebeef5;
					}
				}
				.el-table__empty-block{
					height: 4.8rem;
				}
			}
		}
		
	}
	.tablePagination{
		height: 0.8rem;
		padding-right: 0.4rem;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		@media (max-width: 768px) {
			padding-right: 0rem;
		}
	}
	.el-table .el-table__row td:nth-child(2) .cell{
		color: @color-main;
	}
	.el-table__body{
		.el-table__row{
			td{
				height: 0.48rem;
				padding: 0;
			}
			@media (max-width: 768px) {
				height: auto;
			}
		}
		td{
			.cell{
				font-size: 0.16rem;
				color: #666666;
			}
		}
		tbody tr:last-child{
			td{
				// border-bottom: 0;
			}
		}
	}
	.el-table::before{
		height: 0;
	}
	.ranking{
		.el-table__body-wrapper{
			height: 4.8rem;
			@media (max-width: 768px) {
				height: auto;
			}
		}
	}
	
	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}
	
	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}
}
.el-icon-edit {
	color: red !important;
}
.indexWrap{ 
	.el-carousel__arrow{
		width: 0.52rem;
		height: 0.52rem;
		background:rgba(0,0,0,0.5);
		i{
			font-size: 0.3rem;
		}
	}
	.el-carousel__container{
		@media (max-width: 768px) {
			height: 1.0rem;
		}
	}
	.el-carousel__button{
		width: 0.1rem;
		height: 0.1rem;
		border-radius: 50%;
	}
}
</style>

<style scoped lang="less">
	@font-face {
		font-family: 'HelveticaInserat-Roman-SemiB';
		src: url('~assets/fonts/HELVETICAINSERAT-ROMAN-SEMIB.ttf') format('truetype');
	}
	// .hirsb-font{
	// 	font-family: 'HelveticaInserat-Roman-SemiB';
	// }
	.indexWrap{
		margin-top: -0.8rem;
		.bannerBox{
			width: 100%;
			height: 7.15rem;
			background: url("~assets/images/home/banner.png") no-repeat;
			background-position: bottom;
			background-size: cover;
			padding-top: 0.8rem;
			@media (max-width: 768px) {
				height: auto;
				margin-top: 1.0rem;
				// padding-top: 1.0rem;
			}
			.bannerFont{
				@content();
				margin-top: 0.3rem;
			}
			.slideshowBox{
				@content();
				padding-bottom: 0.4rem;
				.swiper-container{
					&:hover .swiper-button-next, &:hover .swiper-button-prev{
						display: flex;
					}
				}
				.imgBox{
					cursor: pointer;
				}
				.swiperItemBox{
					padding-bottom: 0.6rem;
					padding-top: 0.5rem;
					cursor: pointer;
				}
				.pagination-position{
					width: 100%;
					bottom: 0.1rem;
				}
				.swiper-button-next{
					@allCenter();
					width: 0.52rem;
					height: 0.52rem;
					border-radius: 50%;
					background: rgba(0, 0, 0, 0.5);
					overflow: hidden;
					border: 0;
					cursor: pointer;
					display: none;
					.el-icon-arrow-right{
						font-size: 0.26rem;
						color: @color-default;
					}
				}
				.swiper-button-prev{
					@allCenter();
					width: 0.52rem;
					height: 0.52rem;
					border-radius: 50%;
					background: rgba(0, 0, 0, 0.5);
					overflow: hidden;
					border: 0;
					cursor: pointer;
					display: none;
					.el-icon-arrow-left{
						font-size: 0.26rem;
						color: @color-default;
					}
				}
			}
		}
		.content {
			@content();
			padding-top: 0;
			margin-top: -2.9rem;
			/*overflow: hidden;*/
			background: transparent;
			@media (max-width: 768px) {
				margin-top: 0;
				padding-top: 0.3rem;
			}
		}
		.index {
			/*仪表盘开始*/
			position: relative;
			z-index: 1;
			.panel {
				display: flex;
				justify-content: space-between;
				height: 4.2rem;
				border-radius: .18rem;
				margin-bottom: 0.69rem;
				@media (max-width: 768px) {
					flex-direction: column;
					height: auto;
					margin: 0 0.1rem;
				}
				.icon{
					font-size: 0.6rem;
					color: #3972ED;
					height: auto;
					background: transparent;
					margin-bottom: 0.1rem;
					@media (max-width: 768px) {
						font-size: 0.4rem;
					}
					&.green{
						color: #23B442;
					}
				}
				.bigIcon{
					font-size: 0.72rem;
				}
				.panel-col1,
				.panel-col2 {
					width: 5.54rem;
					height: 100%;
					background: @color-default;
					border-radius: 0.1rem;
					overflow: hidden;
					box-shadow: 0 0 .18rem 0 rgba(73,150,255,0.5);
					@media (max-width: 768px) {
						width: 100%;
						margin-bottom: 0.2rem;
						height: 2.6rem;
					}
				}
				.panel-col1 {
					display: flex;
					width: 6.26rem;
					@media (max-width: 768px) {
						width: 100%;
					}
				}
				.panel-currency {
					display: flex;
					flex-direction: column;
					width: .72rem;
					height: 100%;
					background-image: linear-gradient(to bottom,@color-main, #4ED283);
					.panel-currency-item {
						@hover();
						@allCenter();
						flex: 1;
						color: @color-default;
						@font-l();
						&.act {
							position: relative;
							&::after{
								content: "";
								position: absolute;
								top: 46%;
								right: -0.08rem;
								width: 0.16rem;
								height: 0.16rem;
								background: @color-default;
								transform: rotate(45deg);
							}
						}
					}
				}
				.panel-col1-main {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 2.77rem;
					img {
						width: .6rem;
						height: .6rem;
					}
					p {
						@allCenter();
						@ellipsis();
						@font-xl();
						height: .6rem;
						font-weight: 600;
					}
					span {
						@font-s();
					}
				}
				.panel-col2 {
					display: flex;
					flex-direction: column;
					.panel-col2-row {
						flex: 1;
						display: flex;
						justify-content: center;
						.panel-col2-row-col {
							flex: 1;
							display: flex;
							flex-direction: column;
							justify-content: flex-start;
							align-items: center;
							padding-top: 0.6rem;
							@media (max-width: 768px) {
								padding-top: 0.2rem;
							}
							img {
								width: .5rem;
								height: .5rem;
								margin-bottom: .2rem;
							}
							p {
								@allCenter();
								// @ellipsis();
								font-size: 0.2rem;
								height: .3rem;
								font-weight: 600;
							}
							span {
								@font-s();
							}
							.line{
								width: .62rem;
								height: .04rem;
								margin: .1rem 0;
								background: #383838;
							}
							&.panel-col2-title {
								padding-top: 1.0rem;
								@media (max-width: 768px) {
									padding-top: 0.2rem;
								}
								p {
									@font-m();
								}
								span {
									font-weight: 600;
								}
								a {
									color: @color-main;
									@font-s();
									b {}
								}
							}
						}
					}
				}
				.variousInfo{
					flex: 1;
					margin-left: 0.2rem;
					@media (max-width: 768px) {
						width: 100%;
						margin-left: 0;
					}
				}
			}
			/*仪表盘结束*/
			/*表格区域开始*/
			.tableArea {
				position: relative;
				display: flex;
				justify-content: space-between;
				padding-bottom: 0.2rem;
				@media (max-width: 768px) {
					flex-direction: column;
				}
				.affiche{
					width: 100%;
				}
				.table-left {
					width: 7.8rem;
					@media (max-width: 768px) {
						width: 100%;
						margin-bottom: 0.2rem;
					}
				}
				.table-right {
					width: 4rem;
					@media (max-width: 768px) {
						width: 100%;
					}
				}
				.tableItem {
					position: relative;
					@media (max-width: 768px) {
						padding-left: 0.1rem;
						padding-right: 0.14rem;
					}
				}
				.tableTitle {
					@subtitle();
					i{
						font-size: 0.28rem;
						font-weight: 600;
						margin-right: .2rem;
					}
					&.green{
						background: #23B442;
					}
				}
				.tableMore {
					@hover();
					@allCenter();
					position: absolute;
					top: .1rem;
					right: 0;
					width: 1rem;
					height: .3rem;
					color: @color-main;
					@font-s();
				}
				.tableMain {
					background: @color-default;
					box-shadow: 0 0 0.13rem 0 #dbdfff;
					border-radius: 0 0.1rem 0.1rem 0.1rem;
					overflow: hidden;
				}
				.noticeUl{
					height: 2.8rem;
					padding: .23rem .15rem;
					padding-bottom: 0.29rem;
					box-shadow: 0 0 0.13rem 0 #dbdfff;
					.defineNotData{
						padding: 0.2rem 0;
						text-align: center;
					}
					.zebraBg{
						background: #FAFAFA;
					}
					.noticeLi{
						@hover();
						position: relative;
						display: flex;
						align-items: center;
						height: .38rem;
						color: #666;
						@font-s();
						padding-left: 0.05rem;
						border-bottom: 1px solid #ebeef5;
						// &:after{
						// 	content:'';
						// 	position: absolute;
						// 	top: 50%;
						// 	left: .15rem;
						// 	width: .08rem;
						// 	height: .08rem;
						// 	margin-top:-.04rem ;
						// 	border-radius: 50%;
						// 	background: @color-main;
						// }
						p{
							@ellipsis();
							margin-right: .1rem;
						}
						span{
							flex-shrink:0;
							margin-left: auto;
							margin-right: .15rem;
							@font-s();
							color:#999999;
							@media (max-width: 768px) {
								width: auto;
							}
						}
						
					}
				}
			}
			.tableBox{
				height: 6.4rem;
				background: @color-default;
				box-shadow: 0 0 0.13rem 0 #dbdfff;
				border-radius: 0 0.1rem 0.1rem 0.1rem;
				overflow: hidden;
				@media (max-width: 768px) {
					height: auto;
				}
				.ecoUserBox{
					display: flex;
					justify-content: center;
					align-items: center;
					.userTypeImg{
						width: 0.16rem;
						height: 0.16rem;
						margin-right: 0.1rem;
					}
					.createDate{
						line-height: 0.16rem;
					}
				}
			}
			/*表格区域结束*/
		}
		.animateAreaWrap{
			width: 100%;
			.getCourse{
				width: 3.58rem;
				height: 1.0rem;
				margin: 0 auto;
				background: url('~assets/images/home/toCourse.png') no-repeat;
				background-size: cover;
				cursor: pointer;
				margin-bottom: 0.6rem;
				@media (max-width: 768px) {
					width: 2.8rem;
					height: 0.8rem;
				}
			}
			.advantageImgBoxWrap{
				position: relative;
				width: 100%;
				height: 4.86rem;
				// background: url('~assets/images/home/advantageBG.png') no-repeat;
				// background-size: cover;
				@media (max-width: 768px) {
					height: auto;
				}
				.testImg{
					position: absolute;
					z-index: -2;
					left: 0;
					top: 0;
					@media screen and (min-width: 769px) and (max-width: 1600px) { 
						top: 0.5rem;
					}
					@media (min-width: 2000px) {
						top: -0.5rem;
					}
					@media (max-width: 768px) {
						top: 2.0rem;
					}
				}
				.advantageImgBox{
					@content();
					height: 100%;
					.advantageTitle{
						width: 100%;
						text-align: center;
						// display: flex;
						// align-items: center;
						// justify-content: space-around;
						padding-bottom: 1.3rem;
						h3{
							font-size: 0.6rem;
							font-weight: bold;
							color: #333;
							margin-bottom: 0.24rem;
						}
						p{
							font-size: 0.32rem;
							color: #333;
						}
						@media (max-width: 768px) {
							height: auto;
							padding: 0.5rem 0.2rem;
						}
						img{
							width: auto;
							@media (max-width: 768px) {
								width: 100%;
							}
						}
					}
				}
			}
			.advantageImg{
				@content();
				margin-top: -2.14rem;
				@media (max-width: 768px) {
					margin-top: 0.6rem;
				}
				.advantage{
					display: flex;
					justify-content: space-between;
				}
				.advantageItem{
					width: 2.85rem;
					height: 3.8rem;
					background: @color-default;
					box-shadow: 0 0 0.13rem 0 #dbdfff;
					@media (max-width: 768px) {
						width: 24%;
						height: auto;
						padding-bottom: 0.2rem;
					}
					.itemTextBox{
						display: flex;
						flex-direction: column;
						align-items: center;
	
						.itemTitle{
							font-size: 0.28rem;
							font-weight:bold;
							color: #383838;
							line-height: 0.28rem;
							margin-top: 0;
							margin-bottom: 0.2rem;
						}
						p{
							font-size: 0.2rem;
							color: #383838;
							margin-bottom: 0.06rem;
							@media (max-width: 768px) {
								font-size: 0.10rem;
							}
						}
					}
					img{
						min-height: 1.0rem;
					}
				}
				.margintop50{
					margin-top: 0.5rem;
				}
			}
			.advantageStepWrap{
				width: 100%;
				.advantageStep{
					@content();
					display: flex;
					align-items: center;
					padding: 1.0rem 0 0.8rem;
				}
			}
		}
	}
</style>
