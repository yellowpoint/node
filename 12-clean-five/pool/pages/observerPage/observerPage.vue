<!-- 观察者页面 -->
<template>
    <div class="content observerPage">
        <div class="headerInfo">
            <div class="moduleBox">
                <i class="iconfont icon-xianshi  readOnlyIcon"></i>
                <span class="moduleName">观察模式</span>
                <span class="moduleMsg">当前为观察者只读链接</span>
                <div class="userName">{{observerUserInfo.nickname}}</div>
                <i v-if="observerUserInfo.vip" class="iconfont icon-VIPbiaozhun1 soloIcon"></i>
            </div>
            <div class="millInfoList">
                <div class="item">
                    <div class="imgBox"><img class="onLineImg" src="~assets/images/millManage/inLineBlue.png" alt=""></div>
                    <div class="countBox">{{mineOnline.mineOnline}}</div>
                    <div class="itemName">在线矿机</div>
                </div>
                <div class="shieldedWire"></div>
                <div class="item">
                    <div class="imgBox"><img class="offLineImg" src="~assets/images/millManage/offLineBlue.png" alt=""></div>
                    <div class="countBox offlineStatus">{{mineOnline.mineOffline}}</div>
                    <div class="itemName offlineStatus">离线矿机</div>
                </div>
                <div class="shieldedWire"></div>
                <div class="item">
                    <div class="imgBox"><i class="iconfont icon-xiaoshishouyi itemIcon"></i></div>
                    <div class="countBox">{{blockIncome.dayConin}}</div>
                    <div class="itemName">今日爆块收益（BHD）</div>
                </div>
                <div v-if="observerUserInfo.vip" class="shieldedWire"></div>
                <div v-if="observerUserInfo.vip" class="item">
                    <div class="imgBox"><i class="iconfont icon-xiaoshibaokuai itemIcon"></i></div>
                    <div class="countBox">{{blockIncome.count}}</div>
                    <div class="itemName">今日爆块数</div>
                </div>
            </div>
        </div>
        <div class="incomeAndMillModule">
            <div class="incomeModuleBox">
                <!-- 收益模块 -->
                <income-module 
                    :readOnly="true"
                    :apiKey="apiKey"
                >
                </income-module>
            </div>
            <div class="millModuleBox">
                <!-- 矿机信息模块 -->
            <mill-info-module
                :readOnly="true"
                :mineOnline="mineOnline"
                :poolInfo="poolInfo"
            >
            </mill-info-module>
            </div>
        </div>
        <div class="rateModuleBox">
            <!-- 矿机在线率模块 -->
            <mill-online-rate-module
                :readOnly="true"
                :apiKey="apiKey"
            >
            </mill-online-rate-module>
        </div>
        <div class="millManageModuleBox">
            <!-- 矿机管理模块 -->
            <mill-manage-module
                :readOnly="true"
                :apiKey="apiKey"
            >
            </mill-manage-module>
        </div>
    </div>
</template>

<script>
    //import templateName from 'path';
    import incomeModule from 'components/incomeModule/incomeModule';
    import millInfoModule from 'components/millInfoModule/millInfoModule';
    import millManageModule from 'components/millManageModule/millManageModule';
    import millOnlineRateModule from 'components/millOnlineRateModule/millOnlineRateModule';
    export default {
        name: "observerPage",
        components: {
            incomeModule,
            millInfoModule,
            millManageModule,
            millOnlineRateModule,
        },
        data() {
            return {
                apiKey: '', // 观察者的key
                mineOnline: {}, // 矿机信息
                poolInfo: {}, // 矿池信息
                blockIncome: {}, // 爆块收益
                observerUserInfo: {}, // 观察者页面用户信息
            };
        },
        computed: { 	// 组件计算属性
            mineType() { // 币种
				return this.$store.getters.mineType
			},
        },
        watch: { 	// 组件监听事件

        },
        methods: { 	// 组件方法
            init() { // 获得key后在初始化
                this.getObserverUserInfo();
                this.getMineOnline();
                this.getPoolInfo();
                this.getBlockIncome();
            },
            getObserverUserInfo() { // 获取矿机信息
				let data = {
                    mineType: this.mineType,
                    apiKey: this.apiKey,
				}
				this.$api.getMineObserverUserId(data).then( res => {
                    if(res) {
                        this.observerUserInfo = res;
                    }
                    console.log('获取观察者页面用户信息', res);
                }).catch( err => {
                    console.log('获取观察者页面用户信息错误', err);
                })
            },
            getMineOnline() { // 获取矿机信息
				let data = {
                    mineType: this.mineType,
                    apiKey: this.apiKey,
				}
				this.$api.mineOnline(data).then( res => {
					this.mineOnline = res;
                    console.log('矿机信息', res);
                }).catch( err => {
                    console.log('矿机信息错误', err);
                })
            },
            getPoolInfo() { // 获取矿池信息
				let data = {
                    mineType: this.mineType,
                    apiKey: this.apiKey,
				}
				this.$api.poolInfo(data).then( res => {
					this.poolInfo = res;
                    console.log('矿池信息', res);
                }).catch( err => {
                    console.log('矿池信息错误', err);
                })
            },
            getBlockIncome() { // 爆块收益
                let data = {
                    mineType: this.mineType,
                    apiKey: this.apiKey,
				}
				this.$api.getBlockIncome(data).then( res => {
                    this.blockIncome = res;
                    console.log('爆块收益', res);
                }).catch( err => {
                    console.log('爆块收益错误', err);
                })
            },
        },
        created() { 	//生命周期 - 创建完成
            this.apiKey = this.$route.params.key;
            this.init(); // 初始化
        },
        mounted() {	//生命周期 - 挂载完成

        },
        beforeCreate() { //生命周期 - 创建之前
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
    .observerPage{
        
         @media (max-width: 768px) {
            width: 94%;
            margin: 0 auto;
        }
        .headerInfo{
            width: 100%;
            height: 3.08rem;
            margin-bottom: 0.2rem;
            padding-top: 0.26rem;
            background: @color-default;
            box-shadow: 0 0 0.13rem 0 rgba(93,113,255,0.22);
            border-radius: 0.1rem;
            .moduleBox{
                display: flex;
                align-items: center;
                padding-left: 0.32rem;
                .readOnlyIcon{
                    font-size: 0.32rem;
                    color: @color-main;
                }
                .moduleName{
                    color: #383838;
                    @font-xl();
                    font-weight:bold;
                    margin-left: 0.2rem;
                    margin-right: 0.24rem;
                }
                .moduleMsg{
                    @font-s();
                    color: #383838;
                    font-weight:300;
                    margin-right: 2.0rem;
                    @media (max-width: 768px) {
                        margin-right: 1.0rem;
                    }
                }
                .userName{
                    @allCenter();
                    height: 0.32rem;
                    color: @color-default;
                    @font-m();
                    font-weight:bold;
                    border-radius: 0.16rem;
                    padding: 0 0.17rem;
                    background: @color-main;
                    margin-right: 0.1rem;
                }
                .soloIcon{
                    color: #FFC72F;
                    font-size: 0.4rem;
                }
            }
            .millInfoList{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.27rem 1.0rem;
                @media (max-width: 768px) {
                    padding: 0.2rem 0.4rem;
                }
                .item{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                    height: 1.86rem;
                    .imgBox{
                        @allCenter();
                        height: 0.8rem;
                        .onLineImg{
                            width: 0.84rem;
                            height: 0.3rem;
                        }
                        .offLineImg{
                            width: 1.12rem;
                            height: 0.25rem;
                        }
                        .itemIcon{
                            color: @color-main;
                            font-size: 0.6rem;
                        }
                    }
                    .countBox{
                        color: #333;
                        font-size: 0.26rem;
                        font-weight:bold;
                    }
                    .itemName{
                        color: #333;
                        @font-m();
                        font-weight:400;
                    }
                    // .offlineStatus{
                    //     color: #FFC001;
                    // }
                }
                .shieldedWire{
                    width: 1px;
                    height: 0.66rem;
                    background: #E1E2FF;
                }
            }
        }
        .incomeAndMillModule{
            display: flex;
            justify-content: space-between;
            width: 100%;
            height: 2.6rem;
            margin-bottom: 0.2rem;
            @media (max-width: 768px) {
                height: auto;
                flex-direction: column;
            }
            .incomeModuleBox{
                width: 4.6rem;
                height: 100%;
                @media (max-width: 768px) {
                    width: 100%;
                    margin-bottom: 0.2rem;
                }
            }
            .millModuleBox{
                width: 7.2rem;
                height: 100%;
                @media (max-width: 768px) {
                    width: 100%;
                    
                }
            }
        }
        .millManageModuleBox{
            width: 100%;
            margin-bottom: 0.2rem;
        }
    }
</style>