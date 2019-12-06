<!-- 租赁 -->
<template>
    <div class="lease content">
        <div class="headerInfo">
            <div class="leftIncomeBox">
                <div class="incomeModule">
                    <div class="titleBox">
                        <text-title>预计收益率</text-title>
                    </div>
                    <div class="leftContentBox">
                        <div class="incomeRate">≈&nbsp;{{gainSharing.sharingRatio}}%</div>
                        <div class="incomeCount">昨日投放<span class="count">{{gainSharing.yesterdayPut}}</span>BHD，合作挖矿分成收入<span class="count">{{gainSharing.shareRevenue}}</span>BHD</div>
                    </div>
                </div>
                <div class="borrowInfo" v-if="userInfo">
                    <text-title :textStyle="{color: 'white',fontSize: '0.18rem',}" :lineStyle="{background: 'white',}">可用充值余额&nbsp;&nbsp;&nbsp;&nbsp;{{borrowInfo.availableBalance}} BHD</text-title>
                </div>
            </div>
            <div class="rightTimeBox">
                <div class="countDownModule">
                    <div class="titleBox">
                        <text-title>倒计时</text-title>
                    </div>
                    <div class="rightContentBox">
                        <div class="countDownBox">
                            <div class="countDownTitle">距离开始时间</div>
                            <div class="countDown">
                                <div class="countDownItem">
                                    <div class="whiteLine"></div>
                                    <div class="time">{{countDown.hours}}</div>
                                    <div class="unit">时</div>
                                </div>
                                <div class="flags">:</div>
                                <div class="countDownItem">
                                    <div class="whiteLine"></div>
                                    <div class="time">{{countDown.minutes}}</div>
                                    <div class="unit">分</div>
                                </div>
                                <div class="flags">:</div>
                                <div class="countDownItem">
                                    <div class="whiteLine"></div>
                                    <div class="time">{{countDown.seconds}}</div>
                                    <div class="unit">秒</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="endTimeMsg">预计到期释放<span class="count" style="color: #fff">{{countDownInfo.amount}}</span>BHD &nbsp;&nbsp;&nbsp;投放开始时间：{{countDownInfo.effectEndTime | moment('y-M-d h:m:s')}}</div>
            </div>
        </div>
        <div class="rentOutListModuleBox">
            <!-- 可投放列表模块 -->
            <rent-out-list-module @refreshOtherList="refreshOtherList"></rent-out-list-module>
        </div>
        <div class="releaseModuleBox">
            <!-- 即将释放列表模块 -->
            <release-module ref="releaseModule"></release-module>
        </div>
        <div class="fullModuleBox">
            <!-- 满额列表模块 -->
            <full-module ref="fullModule"></full-module>
        </div>
    </div>
</template>

<script>
    //import templateName from 'path';
    import rentOutListModule from './rentOutListModule';
    import releaseModule from './releaseModule';
    import fullModule from './fullModule';
    import commonMixins from '@/mixins/common';
    export default {
        name: "lease",
        mixins: [commonMixins],
        components: {
            rentOutListModule,
            releaseModule,
            fullModule,
        },
        data() {
            return {
                countDownInfo: {},
                intervalContorl: null,
                countDown: {
                    hours: '00',
                    minutes: '00',
                    seconds: '00',
                },
                gainSharing: {}, // 收益分成率
            };
        },
        computed: {	// 组件计算属性
            userInfo() { // 用户信息
				return this.$store.getters.userInfo
            },
            mineType() { // 币种
                return this.$store.getters.mineType;
            },
            borrowInfo() { // 用户信息
				return this.$store.getters.userBorrowInfo
            },
        },
        watch: {},	// 组件监听事件
        methods: { 	// 组件方法
            eroFit(num = 0) { // 补零
                return num < 10 ? `0${num}` : num;
            },
            countDownEvent(timestamp) { // 倒计时
                let time = Math.floor(timestamp / 1000);
                this.intervalContorl = setInterval(() => {
                    time -= 1;
                    const hours = ~~(time / 3600);
                    const minutes = ~~(time / 60 % 60);
                    const seconds = ~~(time % 60);
                    this.countDown.hours = this.eroFit(hours);
                    this.countDown.minutes = this.eroFit(minutes);
                    this.countDown.seconds = this.eroFit(seconds);
                    if (time <= 0) {
                        clearInterval(this.intervalContorl);
                        window.location.reload();
                        return ;
                    }
                }, 1000);
            },
            getRevenueSharingRatioVo() { // 获取收益分成率
                let data ={
                    mineType: this.mineType,
                }
                this.$api.getRevenueSharingRatioVo(data).then( res => {
                    this.gainSharing = res;
					console.log('获取收益分成率', res);
				}).catch( err => {
					console.log('获取收益分成率错误', err);
				})
            },
            getCountDownInfo() { // 获取倒计时信息
				this.$api.getCountDownInfo().then( res => {
                    this.countDownInfo = res;
                    if(this.countDownInfo.countDownTime) {
                        this.countDownEvent(this.countDownInfo.countDownTime);
                    }
					console.log('倒计时信息', res);
				}).catch( err => {
					console.log('倒计时信息错误', err);
				})
            },
            refreshOtherList() {
                this.$refs.releaseModule.getNewReleaseData();
                this.$refs.fullModule.getNewfullData();
            },
        },
        created() { 	//生命周期 - 创建完成
            this.getRevenueSharingRatioVo();
            this.getCountDownInfo();
            if(this.userInfo) {
                this.getCommonBorrowInfo(); // 获取余额借入金额信息
            }
        },
        mounted() {	//生命周期 - 挂载完成
            // this.$AgreementPopup();
        },
        beforeCreate() {
			
		},
		beforeDestroy() { //生命周期 - 销毁之前
            
        },
        beforeMount() {}, //生命周期 - 挂载之前
        beforeUpdate() {}, //生命周期 - 更新之前
        updated() {}, //生命周期 - 更新之后
        destroyed() {}, //生命周期 - 销毁完成
        activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>

<style lang="less" scoped>
    //@import url(); 引入公共css类
    .lease{
        position: relative;
        z-index: 2;
        background: transparent;
        .headerInfo{
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin-bottom: 0.2rem;
            @media (max-width: 768px) {
                flex-direction: column;
            }
            .titleBox{
                padding-left: 0.4rem;
            }
            .count{
                @font-xl();
                color: @color-assistant;
                font-weight: bold;
                margin: 0 0.04rem;
            }
            .leftIncomeBox{
                position: relative;
                width: 5.9rem;
                height: 3.0rem;
                box-shadow: 0 0 0.13rem 0 rgba(93,113,255,0.22);
                border-radius: 0.10rem;
                background: @color-assistant;
                overflow: hidden;
                @media (max-width: 768px) {
                    width: 100%;
                    margin-bottom: 0.2rem;
                }
                .incomeModule{
                    height: 2.4rem;
                    border-radius: 0 0 0.1rem 0.1rem;
                    padding-top: 0.4rem;
                    background: @color-default;
                    overflow: hidden;
                }
                .leftContentBox{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                    height: 1.6rem;
                    background: @color-default;
                    z-index: 1;
                    @media (max-width: 768px) {
                        height: auto;
                        padding-bottom: 0.2rem;
                    }
                    .incomeRate{
                        color: @color-assistant;
                        font-size: 0.6rem;
                        line-height: 1.2rem;
                        font-weight:bold;
                    }
                }
                .borrowInfo{
                    display: flex;
                    align-items: center;
                    height: 0.6rem;
                    padding-left: 0.4rem;
                    background: @color-assistant;
                }
            }
            .rightTimeBox{
                width: 5.9rem;
                height: 3.0rem;
                background: @color-default;
                box-shadow: 0 0 0.13rem 0 rgba(93,113,255,0.22);
                border-radius: 0.10rem;
                background: @color-assistant;
                overflow: hidden;
                @media (max-width: 768px) {
                    width: 100%;
                }
                .countDownModule{
                    height: 2.4rem;
                    border-radius: 0 0 0.1rem 0.1rem;
                    padding-top: 0.4rem;
                    background: @color-default;
                }
                .endTimeMsg{
                    display: flex;
                    align-items: center;
                    height: 0.6rem;
                    color: @color-default;
                    @font-m();
                    padding-left: 0.7rem;
                    @media (max-width: 768px) {
                        font-size: 0.12rem;
                    }
                }
                .rightContentBox{
                    padding-left: 0.7rem;
                    .countDownBox{
                        display: flex;
                        align-items: center;
                        height: 1.6rem;
                        padding-bottom: 0.4rem;
                        .countDownTitle{
                            margin-right: 0.35rem;
                        }
                        .countDown{
                            position: relative;
                            display: flex;
                            align-items: center;
                            .flags{
                                font-size: 0.32rem;
                                color: @color-assistant;
                                padding: 0 0.2rem;
                            }
                            .countDownItem{
                                position: relative;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                width: 0.8rem;
                                height: 1.0rem;
                                background: @color-assistant;
                                box-shadow: 0 0 0.1rem 0 @color-assistant;
                                border-radius: 0.10rem;
                                .whiteLine{
                                    position: absolute;
                                    top: 0.4rem;
                                    left: 0;
                                    right: 0;
                                    height: 2px;
                                    background: rgba(255,255,255,0.4);
                                }
                                div{
                                    color: @color-default;
                                }
                                .time{
                                    font-size: 0.48rem;
                                    line-height: 0.48rem;
                                    font-weight:400;
                                    padding-top: 0.15rem;
                                    padding-bottom: 0.05rem;
                                    font-family:Helvetica-Condensed-Black-Se;
                                }
                                .unit{
                                    @font-m();
                                    font-weight:400;
                                }

                            }
                            
                        }
                    }
                }
            }
        }
        .rentOutListModuleBox{
            margin-bottom: 0.2rem;
        }
        .releaseModuleBox{
            margin-bottom: 0.2rem;
        }
        .fullModuleBox{
            margin-bottom: 0.2rem;
        }
    }
</style>