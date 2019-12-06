<!--  我的首页（原来的资金管理） -->
<template>
    <div class="fundsPage content">
        <div class="accountInfoBox">
            <div class="accountInfoBoxItem">
                <div class="accountTitle red">
                    充值余额
                    <el-tooltip placement="top">
                        <div slot="content">
                            可用于挖矿抵押、合作投放、定期理财、借入宝
                        </div>
                        <i class="icon iconfont icon-tishi align"></i>
                    </el-tooltip>
                </div>
                <div class="accountInfoLeft accountInfoItem">
                    <div class="blueLabel">
                        <div class="name">可用余额<div class="units">BHD</div></div>
                        <div class="limitBox">
                            <span class="count">{{$common.toDecimal(borrowInfo.availableBalance, 8)}}</span>
                        </div>
                    </div>
                    <div class="detailItemBox">
                        <div class="detailLabel">
                            <div class="detaiItem">总额度</div>
                            <div class="detaiCount">{{$common.toDecimal(borrowInfo.totalCashWithdrawals, 8)}}</div>
                        </div>
                        <div class="detailLabel">
                            <div class="detaiItem">冻结数量</div>
                            <div class="detaiCount">{{$common.toDecimal(borrowInfo.freezingAmount, 8)}}</div>
                        </div>
                        <div class="detailLabel">
                            <div class="detaiItem">可提现数量</div>
                            <div class="detaiCount">{{$common.toDecimal(borrowInfo.withdrawableCash, 8)}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="verticalBar"></div>
            <div class="toBorrow">
                <div class="toBorrowImg"></div>
                <div class="toBorrowBtn" @click="toBorrowPrecious">进入借币宝</div>
            </div>
            <div class="verticalBar"></div>
            <div class="accountInfoBoxItem">
                <div class="accountTitle blue">
                    借入余额
                    <el-tooltip placement="top">
                        <div slot="content">
                            可用于挖矿抵押、借入宝
                        </div>
                        <i class="icon iconfont icon-tishi align"></i>
                    </el-tooltip>
                </div>
                <div class="accountInfoRight accountInfoItem">
                    <div class="blueLabel">
                        <div class="name">可使用借入抵押额<div class="units">BHD</div></div>
                        <div class="limitBox">
                            <span class="count">{{$common.toDecimal(borrowInfo.availableMortgage, 8)}}</span>
                        </div>
                    </div>
                    <div class="detailItemBox">
                        <div class="detailLabel">
                            <div class="detaiItem">借入总额</div>
                            <div class="detaiCount">{{$common.toDecimal(borrowInfo.borrowMortgage, 8)}}</div>
                        </div>
                        <div class="detailLabel">
                            <div class="detaiItem">生效额</div>
                            <div class="detaiCount">{{$common.toDecimal(borrowInfo.effectiveMortgage, 8)}}</div>
                        </div>
                        <div class="detailLabel">
                            <div class="detaiItem">可赎回额</div>
                            <div class="detaiCount">{{$common.toDecimal(borrowInfo.redeemableMortgage, 8)}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="userActiveBox">
            <div class="contentLeftBox">
                <div class="activeArea">
                    <div class="activeContent" :style="userInfo.vip == 2 ? 'height: 7.0rem' : ''">
                        <div class="blockIncome">
                            <div class="incomeType">挖矿收益</div>
                            <div class="incomeInfo" style="padding-top: 0.3rem">
                                <div class="infoItem">
                                    <div class="label">今日挖矿收益</div>
                                    <div class="count">{{blockIncome.dayConin}}&nbsp;BHD</div>
                                </div>
                                <div class="infoItem">
                                    <div class="label">历史总收益</div>
                                    <div class="count">{{blockIncome.allConin}}&nbsp;BHD</div>
                                </div>
                            </div>
                        </div>
                        <div class="leaseIncome">
                            <div class="incomeType">投放收益</div>
                            <div class="incomeInfo">
                                <div class="infoItem">
                                    <div class="label">已投放总额</div>
                                    <div class="count">{{rentalIncome.rentOutAmount}}&nbsp;BHD</div>
                                </div>
                                <div class="infoItem">
                                    <div class="label">昨日投放分成收益</div>
                                    <div class="count">{{rentalIncome.todayEarnings}}&nbsp;BHD</div>
                                </div>
                                <div class="infoItem">
                                    <div class="label">历史总收益</div>
                                    <div class="count">{{rentalIncome.historyEarnings}}&nbsp;BHD</div>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="breakMoudle">
                            <div class="breakItem">
                                <span>违约次数</span>
                                <span>{{mortgageLeaseCount.defaultCount || 0}}&nbsp;次</span>
                            </div>
                            <div class="breakItem">
                                <span>已支付违约金</span>
                                <span>{{paidDebit}} &nbsp;BHD</span>
                            </div>
                        </div> -->
                        <div class="incomeModuleBox" v-if="userInfo.vip != 2">
                            <income-module ref="myHomeIncomeModule" @tap="getMortgageRate" class="resetIncomeModuleStyle"></income-module>
                        </div>
                    </div>
                </div>
            </div>
            <div class="contentRightBox" :style="userInfo.vip == 2 ? 'height: 7.0rem' : ''">
                <div class="showArea">
                    <div class="activeRight">
                        <div class="activeItem"
                            v-for="(item, index) in navData"
                            :key="index"
                            :class="item.active ? 'active' : ''"
                            @click="activeEvent(item, index)"
                        >
                            {{item.name}}
                        </div>
                    </div>
                    <div class="topArea">
                        <div v-show="currentIndex === -1" class="notActive">
                            <div class="defineNotData">
                                <svg class="icon svg-icon" aria-hidden="true">
                                    <use xlink:href="#icon-weibiaoti-1"></use>
                                </svg>
                                <p>抱歉，暂时没有操作</p>
                            </div>
                        </div>
                        <div v-show="currentIndex === 0" class="recharge activeShowArea">
                            <div class="swichBox">
                                <switch-btn class="rechargeTypeBtn" @tap="changeRechargeType" :text="rechargeBtnText"></switch-btn>
                            </div>
                            <div class="rechargeType" v-show="rechargeType">
                                <div class="rechargeMsg">您可以从任意地址、发送任意数量到如下地址：</div>
                                <div class="addressBox">
                                    <div class="pollAddress">{{pollAddress}}</div>
                                    <div class="smallConfirm copyPoolAddress" :data-clipboard-text="pollAddress" @click="copyPoolAddress">复制</div>
                                </div>
                                <div class="rechargeMsg">等区块网络3个确认以后系统会自动完成充值到您的可用余额。</div>
                            </div>
                            <div class="rechargeType" v-show="!rechargeType">
                                <div v-if="borrowAddress">
                                    <div class="oneselfWallet"><div class="label">请从您的钱包：</div><div class="boldFont">{{borrowAddress}}</div></div>
                                    <div class="addressBox">
                                        <div class="label">指向任意数量到：</div>
                                        <div class="pollWalletAddress">37ahFaegsA5662VVCt4dgy2fS1Rz8w9Csg</div>
                                        <div class="smallConfirm copyPoolWalletAddress" data-clipboard-text="37ahFaegsA5662VVCt4dgy2fS1Rz8w9Csg" @click="copyPoolWalletAddress">复制</div>
                                    </div>
                                    <div class="rechargeMsg">请务必使用绑定地址进行借出，其他地址借出无效</div>
                                </div>
                                <div v-else>
                                    <div class="unAuth">
                                        <div class="">您尚未绑定个人BHD钱包，指向借入无法读取！</div>
                                        <div class="smallConfirm" @click="toBind">前往绑定</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-show="currentIndex === 1" class="withdraw borrowAddress activeShowArea">
                            <div>
                                <div class="withdrawActive">
                                    <div class="longLabel">借入地址</div>
                                    <div class="inptBox">
                                        <input class="inpt" v-model.trim="newBorrowAddress" type="text" placeholder="请输入您借入的钱包地址">
                                    </div>
                                </div>
                                <div class="mailActive">
                                    <div class="longLabel">安全密码</div>
                                    <div class="passwordBox">
                                        <input type="password" v-model.trim="borrowAddressPayPassword" class="inputCode" maxlength="8" autocomplete="new-password" placeholder="请输入安全密码">
                                        <div v-if="!userInfo.isPwd" class="toSetPwd" @click="toSetPwd">设置</div>
                                    </div>
                                    <div class="smallConfirm" @click="setBorrowAddress" style="margin-left: 0.3rem;">确认</div>
                                </div>
                                <div class="cashMsg">修改您的借入钱包地址。</div>
                            </div>
                        </div>
                        <div v-show="currentIndex === 2" class="withdraw activeShowArea">
                            <div class="lableBox">
                                <div class="lable">当前可提现余额</div>
                                <div class="textContetn">{{borrowInfo.withdrawableCash}}&nbsp;BHD</div>
                            </div>
                            <div class="lableBox" style="margin-bottom: 0.1rem;">
                                <div class="lable">提现地址</div>
                                <div class="textContetn">{{userWalletAddr}}</div>
                            </div>
                            <div class="withdrawActive">
                                <div class="longLabel">提现数量</div>
                                <div class="inptBox">
                                    <input class="inpt" v-model.trim="cashCount" type="text" @input="cashCountOninputEvent()" placeholder="数量为正整数">
                                    <div class="units">BHD</div>
                                </div>
                            </div>
                            <div class="mailActive">
                                <div class="longLabel">安全密码</div>
                                <div class="passwordBox">
                                    <input type="password" v-model.trim="cashPayPassword" class="inputCode" maxlength="8" autocomplete="new-password" placeholder="请输入安全密码">
                                    <div v-if="!userInfo.isPwd" class="toSetPwd" @click="toSetPwd">设置</div>
                                </div>
                                <button class="smallConfirm" ref="getCash" @click="getCash" style="margin-left: 0.3rem;">确认</button>
                            </div>
                        </div>
                        <div v-show="currentIndex === 3" class="pledge activeShowArea">
                            <div class="mask" v-if="userInfo.vip == 2">
                                <div>该功能为主矿池划转抵押功能，您是<span class="green"> 生态池 </span>用户，无需此功能</div>
                            </div>
                            <div class="swichBox">
                                <switch-btn class="rechargeTypeBtn" @tap="changePledgeType" :text="pledgeBtnText"></switch-btn>
                            </div>
                            <div v-show="pledgeType">
                                <div class="pledgeActive">
                                    <div class="longLabel">划进抵押额</div>
                                    <div class="inptBox">
                                        <input class="inpt" v-model.trim="toApplyCount" type="text" @input="toApplyOninputEvent()" placeholder="将可用余额划进到抵押额，划转金额精确到8位小数！">
                                        <div class="units">BHD</div>
                                    </div>
                                </div>
                                <div class="mailActive">
                                    <div class="longLabel">安全密码</div>
                                    <div class="passwordBox">
                                        <input type="password" v-model.trim="toApplyPayPassword" class="inputCode" maxlength="8" autocomplete="new-password" placeholder="请输入安全密码">
                                        <div v-if="!userInfo.isPwd" class="toSetPwd" @click="toSetPwd">设置</div>
                                    </div>
                                    <button class="smallConfirm" ref="getToApply" @click="getToApply" style="margin-left: 0.3rem;">确认</button>
                                </div>
                            </div>
                            <div v-show="!pledgeType">
                                <div class="pledgeActive">
                                    <div class="longLabel">抵押额赎回</div>
                                    <div class="inptBox">
                                        <input class="inpt" v-model.trim="toRedeemCount" type="text" @input="toRedeemOninputEvent()" placeholder="将抵押额划转到余额，划转金额精确到8位小数！">
                                        <div class="units">BHD</div>
                                    </div>
                                </div>
                                <div class="mailActive">
                                    <div class="longLabel">安全密码</div>
                                    <div class="passwordBox">
                                        <input type="password" v-model.trim="toRedeemPayPassword" class="inputCode" maxlength="8" autocomplete="new-password" placeholder="请输入安全密码">
                                        <div v-if="!userInfo.isPwd" class="toSetPwd" @click="toSetPwd">设置</div>
                                    </div>
                                    <button class="smallConfirm" ref="getToRedeem" @click="getToRedeem" style="margin-left: 0.3rem;">确认</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="CopywritingTipBox" :style=" userInfo.vip == 2 ? 'height: 3.48rem;margin-bottom: 0;' : ''">
                    <div v-show="currentIndex === 0">
                        <div class="tipTitle">充值提醒</div>
                        <div class="tipContent">
                            1、矿池账户资产分为二个部分：充值账户，借入账户<br/>
                            2、指向借入额需要充值相对应数量的20%才可激活生效<br/>
                            3、充值账户余额可用于自己抵押、投放合作挖矿、购买定投、转入借入宝<br/>
                            4、借入账户余额仅可用于自己抵押、转入借入宝<br/>
                            5、充值地址为每个账户专属唯一，支持用户从任意地址、充值转账任意数量<br/>
                            6、用户的指向借入地址，必须为用户绑定的借出地址方可识别生效
                        </div>
                    </div>
                    <div v-show="currentIndex === 1">
                        <div class="tipTitle">绑定提醒</div>
                        <div class="tipContent">
                            1、此地址为您操作借入的钱包地址<br/>
                            2、在操作借入抵押前必须先进行地址绑定，绑定后系统方可识别<br/>
                            3、绑定借入抵押地址后，只有该地址借出抵押的金额，才会生效于借入抵押
                        </div>
                    </div>
                    <div v-show="currentIndex === 2">
                        <div class="tipTitle">提现提醒</div>
                        <div class="tipContent">
                            最小提币数量 1 BHD，提币申请T+1日处理，提现数量将按照每笔固定扣除0.1BHD手续费，每天14:00集中处理过去24小时的提现申请
                        </div>
                    </div>
                    <div v-show="currentIndex === 3">
                        <div v-if="pledgeType">
                            <div class="tipTitle">抵押提醒</div>
                            <div class="tipContent">
                                1、从可用余额划转到抵押，从抵押转出到可用余额，等操作均为免费<br/>
                                2、转进抵押额达到足额100%后，即可获得100%收益
                            </div>
                        </div>
                        <div v-else>
                            <div class="tipTitle">赎回提醒</div>
                            <div class="tipContent">
                                1、从可用余额划转到抵押，从抵押转出到可用余额，等操作均为免费<br/>
                                2、抵押赎回后抵押额不足100%，挖矿收益为{{IncomeRate.agreementRate}}%即使是99%的抵押也是{{IncomeRate.agreementRate}}%收益
                            </div>
                        </div>
                    </div>
                </div>
                <div class="infoList" v-if="userInfo.vip != 2">
                    <div class="infoHeader">
                        <text-title class="listTitle">矿机信息</text-title>
                        <div class="volumeRatio">当前条件容量证明系数 1: {{IncomeRate.theoryRate}}</div>
                    </div>
                    <div class="infoItem">
                        <div class="infoLeft">
                            <svg class="icon svg-icon" aria-hidden="true">
                                <use xlink:href="#icon-lilundiya"></use>
                            </svg>
                            <div class="infoName">理论抵押</div>
                        </div>
                        <div class="detailCount">{{mortgageLeaseCount.stock}} BHD</div>
                    </div>
                    <div class="infoItem">
                        <div class="infoLeft">
                            <svg class="icon svg-icon" aria-hidden="true">
                                <use xlink:href="#icon-shijidiya"></use>
                            </svg>
                            <div class="infoName">实际抵押</div>
                        </div>
                        <div class="detailCount">{{mortgageLeaseCount.stockActive}} BHD</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Clipboard from 'clipboard';

    import incomeModule from 'components/incomeModule/incomeModule';

    import commonMixins from '@/mixins/common';

    export default {
        name: "",
        mixins: [commonMixins],
        components: {
            incomeModule,
        },
        data() {
            return {
                accountStatus: {},  // 账户余额
                borrowAddress: '',// 用户借入金额钱包地址
                newBorrowAddress: '',// 修改用户借入金额钱包地址（临时）
                borrowAddressPayPassword: '', // 修改借入金额钱包地址 安全密码
                toApplyPayPassword: '', // 申请抵押支付密码
                toRedeemPayPassword: '', // 抵押赎回支付密码
                mortgageLeaseCount: {}, // 抵押和出租数量
                defaultCount: {}, // 违约数
                blockIncome: {}, // 爆块收益
                rentalIncome: {}, // 租借收益
                pollAddress: '', // 矿池地址
                cashPayPassword: '', // 提现安全密码
                cashCount: '', // 提现数量
                currentIndex: 0, // 选中的下标
                userWalletAddr: '', // 用户钱包地址
                tempUserWalletAddr: '', // 用户钱包地址（临时）
                toApplyCount: '', // 划转到抵押的数量
                toRedeemCount: '', // 划转到余额的数量
                rechargeType: true, // 从任意地址充值/从钱包地址抵押 
                pledgeType: true, // 修改抵押类型
                paidDebit: 0, // 已支付违约金
                IncomeRate: {}, // 抵押率
                getCashInterval: null, // 提现定时限制
                getToApplyInterval: null, // 抵押定时限制
                getToRedeemInterval: null, // 赎回定时限制
                rechargeBtnText: { // 抵押类型按钮文本
                    openText: '充值到充值账户',
                    closeText: '借入到借入账户',
                    borrowRatio: '20',
                    walletRatio: '80',
                },
                pledgeBtnText: {
                    openText: '抵押申请',
                    closeText: '抵押赎回',
                },
                navData: [
                    {
                        name: "充值",
                        active: true,
                    },
                    {
                        name: "地址",
                        active: false,
                    },
                    {
                        name: "提现",
                        active: false,
                    },
                    {
                        name: "划转",
                        active: false,
                    },
                ],
            };
        },
        computed: {	// 组件计算属性
            userInfo() { // 用户信息
				return this.$store.getters.userInfo
            },
            isPC() {
                if(document.body.clientWidth <= 768) {
                    return false
                }else{
                    return true
                }
            },
            mineType() { // 币种
                return this.$store.getters.mineType;
            },
            borrowInfo() { // 用户账户信息
				return this.$store.getters.userBorrowInfo
            },
        },
        watch: { // 组件监听事件
        
        },
        methods: { 	// 组件方法
            init() {
                this.getBorrowInfo(); //  获取账户借入余额信息
                this.getMortgageLeaseCount(); // 获取抵押,理论抵押,出租金额,租借金额数量
                this.getPollAddress(); // 获取矿池地址
                this.getUserWalletAddr(); // 获取用户钱包地址
                this.getBlockIncome(); // 获取爆块收益
                this.getRentalIncome(); // 租借收益
                this.getBorrowAddress(); // 获取用户借入金额钱包地址
                this.getPaidDebit(); // 获取已支付违约金
            },
            getMortgageRate(res) {
                this.IncomeRate = res;
                console.log('更新抵押率');
            },
            toSetPwd() {
                this.$SetPopup({
                    popupType: 'payPassword',
                });
            },
            activeEvent(val, index) { // 切换菜单事件
                for (const item of this.navData) {
                    item.active = false;
                }
                val.active = true;
                this.currentIndex = index;
            },
            toBind() { // 跳转到绑定
                for (const item of this.navData) {
                    item.active = false;
                }
                this.navData[1].active = true;
                this.currentIndex = 1;
            },
            copyPoolWalletAddress() {
                let clipboard = new Clipboard('.copyPoolWalletAddress')
				clipboard.on('success', e => {
					this.$toast('复制成功');
					// 释放内存 
					clipboard.destroy()
				})
				clipboard.on('error', e => {
					// 不支持复制
					this.$toast('该浏览器不支持自动复制,请长按复制')
					// 释放内存 
					clipboard.destroy()
				})
            },
            copyPoolAddress() { // 复制矿池地址
				let clipboard = new Clipboard('.copyPoolAddress')
				clipboard.on('success', e => {
					this.$toast('复制成功');
					// 释放内存 
					clipboard.destroy()
				})
				clipboard.on('error', e => {
					// 不支持复制
					this.$toast('该浏览器不支持自动复制,请长按复制')
					// 释放内存 
					clipboard.destroy()
				})
            },
            getBorrowInfo() { // 获取余额借入金额信息
                this.getCommonBorrowInfo();
            },
            getMortgageLeaseCount() { // 获取抵押,理论抵押,出租金额,租借金额数量
                let data = {
                    mineType: this.mineType,
                }
                this.$api.getMortgageLeaseCount(data).then( res => {
                    this.mortgageLeaseCount = res;
                    console.log('获取抵押出租数量', res);
                }).catch( err => {
                    console.log('获取抵押出租数量出错', err);
                })
            },
            getBlockIncome() { // 爆块收益
                let data = {
					mineType: this.mineType,
				}
				this.$api.getBlockIncome(data).then( res => {
                    this.blockIncome = res;
                    console.log('爆块收益', res);
                }).catch( err => {
                    console.log('爆块收益错误', err);
                })
            },
            getRentalIncome() { // 租借收益
                let data = {
					mineType: this.mineType,
				}
				this.$api.getRentalIncome(data).then( res => {
                    this.rentalIncome = res;
                    console.log('租借收益', res);
                }).catch( err => {
                    console.log('租借收益错误', err);
                })
            },
            refreshRate() {
                this.$refs.myHomeIncomeModule.getRate(); // 刷新抵押率
            },
            changeRechargeType(status) { // 修改充值类型
                this.rechargeType = !this.rechargeType;
            },
            changePledgeType(status) { // 修改抵押类型
                this.pledgeType = !this.pledgeType;
            },
            getPollAddress() { // 获取矿池地址
                let data = {
                    mineType: this.mineType,
                }
                this.$api.getPollAddress(data).then( res => {
                    this.pollAddress = res;
                    console.log('获取矿池地址', res);
                }).catch( err => {
                    console.log('获取矿池地址出错', err);
                })
            },
            getUserWalletAddr() { // 获取用户钱包地址
                let data = {
                    mineType: this.mineType,
                }
                this.$api.getUserWalletAddr(data).then( res => {
                    this.userWalletAddr = res;
                    this.tempUserWalletAddr = res;
                    console.log('获取用户钱包地址', res);
                }).catch( err => {
                    console.log('获取用户钱包地址出错', err);
                })
            },
            cashCountOninputEvent() { // 提现输入正整数
                if(this.cashCount) {
                    if(this.cashCount < 0){
                        this.cashCount = 0;
                    }
                    if(!/^\d+$/.test(this.cashCount)) {
                        this.cashCount = '';
                    }
                }
            },
            toApplyOninputEvent() { // 划转到抵押输入正整数（精确到8位小数）
                if(/^\d+[.]/.test(this.toApplyCount)) {
                    let floatingPoint = this.toApplyCount.split(".")[1];
                    if(floatingPoint.length>8) {
                        let intPart = this.toApplyCount.split(".")[0];
                        this.toApplyCount = intPart + "." +floatingPoint.slice(0,8);
                    }
                }
            },
            toRedeemOninputEvent() { // 划转到余额输入数量（精确到8位小数）
                if(/^\d+[.]/.test(this.toRedeemCount)) {
                    let floatingPoint = this.toRedeemCount.split(".")[1];
                    if(floatingPoint.length>8) {
                        let intPart = this.toRedeemCount.split(".")[0];
                        this.toRedeemCount = intPart + "." +floatingPoint.slice(0,8);
                    }
                }
            },
            async getCash() { // 提现
                if(!this.userWalletAddr){
                    this.$toast("您未设置提现地址，请到个人中心设置，才能提现！");
                    return
                }
                if(this.cashCount=='0' || this.cashCount=='') {
                    this.$toast("提现金额必须为正整数！");
                    return
                }
                if(!/^[a-zA-Z0-9]{8}$/.test(this.cashPayPassword)) {
                    this.$toast("请输入正确的安全密码！");
                    return
                }
                let element = this.$refs.getCash;
                this.$common.countdown(element, this.getCashInterval, 30);
                this.sendCashRequest(); // 发起提现请求
            },
            sendCashRequest() { // 发起提现请求
                let data = {
                    mineType: this.mineType,
                    conin: this.cashCount,
                    payPwd: this.$md5(this.cashPayPassword),
                }
                this.$api.getCash(data).then( res => {
                    this.$toast("提交成功，等待审核");
                    this.getBorrowInfo(); // 提交成功，重新请求账户余额
                    this.refreshRate(); // 更新抵押率
                    this.cashPayPassword = '';
                    this.cashCount = '',
                    console.log('提现', res);
                }).catch( err => {
                    console.log('提现出错', err);
                })  
            },
            async getToApply() { // 划转到抵押
                if(this.userInfo.vip == 2) {
                    return
                }
                if(this.toApplyCount=='0' || this.toApplyCount=='' || !/^\d+$|^\d+[.]\d{1,8}$/.test(this.toApplyCount)) {
                    this.$toast("金额格式错误，划转金额精确到8位小数！");
                    return
                }
                let element = this.$refs.getToApply; 
                this.$common.countdown(element, this.getToApplyInterval, 30);
                this.toApplyRequest(); // 发起抵押请求
            },
            toApplyRequest() { // 发起 划转到抵押 请求
                let data = {
                    mineType: this.mineType,
                    conin: this.toApplyCount,
                    payPwd: this.$md5(this.toApplyPayPassword),
                }
                this.$api.getToApply(data).then( res => {
                    this.toApplyCount = '';
                    this.toApplyPayPassword = '';
                    this.$toast("划转抵押成功！");
                    this.getMortgageLeaseCount(); // 划转成功， 重新更新抵押数
                    this.getBorrowInfo(); // 划转成功，重新请求账户余额
                    this.refreshRate(); // 更新抵押率
                    console.log('划转到抵押', res);
                }).catch( err => {
                    this.toApplyCount = '';
                    this.toApplyPayPassword = '';
                    console.log('划转到抵押出错', err);
                })
            },
            async getToRedeem() { // 划转到余额
                if(this.userInfo.vip == 2) {
                    return
                }
                if(this.toRedeemCount=='0' || this.toRedeemCount=='' || !/^\d+$|^\d+[.]\d{1,8}$/.test(this.toRedeemCount)) {
                    this.$toast("金额格式错误，划转金额精确到8位小数！");
                    return
                }
                let element = this.$refs.getToRedeem;
                this.$common.countdown(element, this.getToRedeemInterval, 30);
                this.toRedeemRequest(); // 校验通过发起请求
            },
            toRedeemRequest() { // 发起划转到余额的请求
                let data = {
                    mineType: this.mineType,
                    conin: this.toRedeemCount,
                    payPwd: this.$md5(this.toRedeemPayPassword),
                }
                this.$api.getToRedeem(data).then( res => {
                    this.toRedeemCount = '';
                    this.toRedeemPayPassword = '';
                    this.$toast("划转余额成功！");
                    this.getMortgageLeaseCount(); // 划转成功， 重新更新抵押数
                    this.getBorrowInfo(); // 划转成功，重新请求账户余额
                    this.refreshRate(); // 更新抵押率
                    console.log('划转到余额', res);
                }).catch( err => {
                    console.log('划转到余额出错', err);
                })
            },
            getBorrowAddress() { // 获取用户借入金额钱包地址
                let data = {
                    mineType: this.mineType,
                }
                this.$api.getBorrowAddress(data).then( res => {
                    this.borrowAddress = res;
                    this.newBorrowAddress = res;
                    console.log('获取用户借入金额钱包地址', res);
                }).catch( err => {
                    console.log('获取用户借入金额钱包地址出错', err);
                })
            },
            async setBorrowAddress() { // 修改用户借入金额钱包地址
                if(!this.newBorrowAddress) {
                    this.$toast('借入金额钱包地址不能能为空！');
                    return
                }
                this.setBorrowAddressRequest(); // 校验通过发起修改请求
            },
            setBorrowAddressRequest() { // 修改用户借入金额钱包地址发送请求
                let data = {
                    mineType: this.mineType,
                    newAddress: this.newBorrowAddress,
                    payPwd: this.$md5(this.borrowAddressPayPassword),
                }
                this.$api.setBorrowAddress(data).then( res => {
                    this.$toast('修改成功！');
                    this.borrowAddress = res;
                    this.newBorrowAddress = res;
                    this.borrowAddressPayPassword = '';
                    console.log('设置用户借入金额钱包地址', res);
                }).catch( err => {
                    console.log('设置用户借入金额钱包地址出错', err);
                })
            },
            getPaidDebit() { // 获取已支付违约金
                let data = {
                    mineType: this.mineType,
                }
				this.$api.paidDebit(data).then( res => {
                    this.paidDebit = res;
                    console.log('获取已支付违约金', res);
                }).catch( err => {
                    console.log('获取已支付违约金失败', err);
                })
            },
            toBorrowPrecious() {
                // this.$toast('即将上线，敬请期待~')
                this.$router.push("/borrowPrecious");
            },
        },
        created() { 	//生命周期 - 创建完成
            this.init() // 初始化请求
        },
        mounted() {	//生命周期 - 挂载完成
        
        },
        beforeCreate() { //生命周期 - 创建之前
            document.querySelector('#app').setAttribute('style', 'background: rgba(246,249,252,0.5);');
        },
        beforeMount() {}, //生命周期 - 挂载之前
        beforeUpdate() {}, //生命周期 - 更新之前
        updated() {}, //生命周期 - 更新之后
        beforeDestroy() { //生命周期 - 销毁之前
            document.querySelector('#app').setAttribute('style', '');
        },
        destroyed() {}, //生命周期 - 销毁完成
        activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>

<style lang="less" scoped>
    //@import url(); 引入公共css类
    @import url("./funds.less");
</style>