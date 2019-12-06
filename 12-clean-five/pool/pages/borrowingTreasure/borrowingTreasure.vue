<!-- 定投模块 -->
<template>
    <div class="borrowingTreasure">
        <div class="viewContent">
            <div class="viewCenter">
                <div class="headerImg"></div>
                <div style="margin-top: -0.97rem;">
                    <div class="accountInfo" v-if="userInfo">
                        <div class="accountItem">
                            <div class="detailCount">{{regularIntervalsInfo.availableBalance || 0}} BHD</div>
                            <div class="labelName">可用充值余额</div>
                        </div>
                        <div class="accountItem">
                            <div class="detailCount">{{regularIntervalsInfo.accumulatedIncome || 0}} BHD</div>
                            <div class="labelName">累计收益</div>
                        </div>
                        <div class="accountItem">
                            <div class="detailCount">{{regularIntervalsInfo.limitsPutIn || 0}} BHD</div>
                            <div class="labelName">已投放额度</div>
                        </div>
                        <div class="accountItem">
                            <div class="detailCount">{{regularIntervalsInfo.yetDayFundPledgeProfit|| 0}} BHD</div>
                            <div class="labelName">昨日收益</div>
                        </div>
                    </div>
                    <div class="listBox">
                        <div class="annualRateList">
                            <div class="listTr listTh">
                                <div class="listTd">期数</div>
                                <div class="listTd">年化率</div>
                                <div class="listTd">时间</div>
                                <div class="listTd">额度</div>
                                <div class="listTd">剩余额度</div>
                                <div class="listTd">操作</div>
                            </div>
                            <div
                                class="listTr"
                                v-for="(item, index) in rateListData.list"
                                :key="index"
                            >   
                                <div class="listTd"><div class="expectBox">第<span class="expect">{{item.periodsNo}}</span>期</div></div>
                                <div class="listTd">
                                    <div class="annualRateItem">
                                        <div class="annualRate">{{item.interest}}</div>
                                        <div class="units">%</div>
                                    </div>
                                </div>
                                <div class="listTd" :style="'flex-direction: column'">
                                    <div class="dayCount">{{item.periodTimeNum}}天</div>
                                    <div class="exclusive">{{item.remark}}</div>
                                </div>
                                <div class="listTd">{{item.totalAmount}} BHD</div>
                                <div class="listTd">{{item.residueAmount}} BHD</div>
                                <div class="listTd"><div class="userHandleBtn" v-if="item.residueAmount" @click="showThrowInPopupEvent(item)">投放</div></div>
                                <div class="progress animated slideInLeft" :style="`width: ${(item.totalAmount-item.residueAmount)/item.totalAmount*100}%;border-radius: ${item.residueAmount == 0 ? '0' : '0 0.33rem 0.33rem 0;'}`"></div>
                            </div>
                            <!-- 自定义暂无数据提示 -->
                                <div class="defineNotData" v-show="!rateListData.total">
                                    <svg class="icon svg-icon" aria-hidden="true">
                                        <use xlink:href="#icon-weibiaoti-1"></use>
                                    </svg>
                                    <p>抱歉，暂时没有数据</p>
                                </div>
                        </div>
                        <div class="footerPagination">
                            <el-pagination
                                v-if="rateListData.pages>1"
                                layout="prev, pager, next"
                                :total="rateListData.pages*10"
                                @current-change="throwInListCurrentChange"
                                @prev-click="throwInListPrevPage"
                                @next-click="throwInListNextPage"
                            >
                            </el-pagination>
                        </div>
                    </div>
                </div>
                <div class="listBox" style="margin-bottom: 0;">
                    <div class="tableTitle">
                        <text-title>往期投放记录</text-title>
                    </div>
                    <div class="throwList">
                        <el-table
                            :data="throwRecordListData.list"
                            style="width: 100%;"
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
                                prop="periodsNo"
                                label="期数"
                                :width="isPC ? '' : '100'"
                                align="center"
                            >
                                <template slot-scope="scope">
                                    <div class="expectBox">第<span class="expect">{{scope.row.periodsNo}}</span>期</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="interest"
                                label="年化率"
                                align="center"
                            >
                                <template slot-scope="scope">
                                    {{scope.row.interest}} %
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="periodTimeNum"
                                label="时间"
                                align="center"
                            >
                                <template slot-scope="scope">
                                    {{scope.row.periodTimeNum}} 天
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="putAmount"
                                label="额度"
                                align="center"
                            >
                                <template slot-scope="scope">
                                    {{scope.row.putAmount}} BHD
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="previouProfit"
                                label="到期收益"
                                :width="isPC ? '' : '160'"
                                align="center"
                            >
                                <template slot-scope="scope">
                                    {{scope.row.previouProfit}} BHD
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop=""
                                label="投放时间"
                                :width="isPC ? '' : '100'"
                                align="center"
                            >
                                <template slot-scope="scope">
                                    {{scope.row.createTime | moment('y-M-d')}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop=""
                                label="释放时间"
                                :width="isPC ? '' : '120'"
                                align="center"
                            >
                                <template slot-scope="scope">
                                    {{scope.row.effectEndTime | moment('y-M-d h:m')}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop=""
                                label="状态"
                                align="center"
                            >
                                {{mapRecordStatus()}}
                                <template slot-scope="scope">
                                    <div :style="{'color' : `${mapRecordStatusColor(scope.row.status)}`}">
                                        {{mapRecordStatus(scope.row.status)}}
                                    </div>
                                </template>
                            </el-table-column>
                            
                        </el-table>
                        <div class="footerPagination" v-if="throwRecordListData.pages>1">
                            <el-pagination
                                layout="prev, pager, next"
                                :total="throwRecordListData.pages*10"
                                @current-change="throwRecordCurrentChange"
                                @prev-click="throwRecordPrevPage"
                                @next-click="throwRecordNextPage"
                            >
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="viewFooter"></div>
        <transition name="fade">
            <div v-show="showThrowInPopup" class="throwInMask" @touchmove.prevent @click.stop="closeThrowIn" style="animation-duration: 0.3s;">
                <div class="throwInContentBox" @click.stop>
                    <div class="throwInContent">
                        <div class="throwInTitle">
                            <text-title>提醒</text-title>
                            <div class="closeBtn" @click="closeThrowIn">&times;</div>  
                        </div>
                        <div class="throwInInfo">
                            <div class="throwInInfoItem">投放额度</div>
                            <div data-v-5aac78ad="" class="inptBox">
                                <input type="text" placeholder="10" class="inpt" v-model="rentOutCount" @input="rentOutOninputEvent($event)" @focus="clearPositionTimer" @blur="resetPosition">
                                <div class="units">BHD</div>
                            </div>
                            <div class="throwInInfoItem gray">当前可用充值余额: &nbsp;<span class="balance">{{regularIntervalsInfo.availableBalance}}</span>&nbsp;&nbsp;BHD</div>
                            <div class="throwInInfoItem gray">投放额度 10 BHD起，仅限充值余额投放</div>
                            <div class="throwInInfoItem">
                                <div>预计收益</div>
                                <div>{{computedIncome}}BHD</div>
                            </div>
                            <div class="throwInInfoItem">
                                <div>投放周期</div>
                                <div>{{popupData.periodTimeNum}}天</div>
                            </div>
                            <div class="throwInInfoItem">
                                <div>释放时间</div>
                                <div>{{deadline}} 00:00</div>
                            </div>
                            <div class="throwInInfoItem">
                                <div><i class="iconfont icon-mima passwordIcon"></i> 安全密码</div>
                            </div>
                            <div class="inptBox">
                                <input type="password" v-model="userPayPassword" placeholder="请输入安全码" class="inpt" autocomplete="new-password" maxlength="8"  @focus="clearPositionTimer" @blur="resetPosition">
                            </div>
                            <div class="msgInfo">提示：您将要投放 {{rentOutCount}} BHD，投放期限 {{popupData.periodTimeNum}} 天！</div>
                            <button class="confirmBtn" @click="showRemindPopupEvent()">确定</button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div v-show="showRemindPopup" class="remindMask" @click.stop= "showRemindPopup = false" style="animation-duration: 0.3s;">
                <div class="remindContentBox" @click.stop>
                    <div class="remindContent">
                        <div class="remindTitle">
                            <text-title>提醒</text-title>
                        </div>
                        <div class="remindContentText">
                            您现在操作的是爱挖定期投放项目，投放数量：{{rentOutCount}} BHD将从您的充值账户余额扣除，
                            投放时间为{{popupData.periodTimeNum}}天，利息收益每日发放，每日到账，投放数量将在{{deadline}}释放。
                            合作投放期间订单无法终止与转让！
                        </div>
                        <div class="remindBtnBox">
                            <button :class="disabledClick ? 'consentBtn disabled' : 'consentBtn'" :disabled="disabledClick" @click="checkoutPayPassword()">我已知晓并同意以上合作方式，确认提交<span v-show="count">（{{count}}）</span></button>
                            <div class="cancelQuit" @click= "showRemindPopup = false">取消退出</div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    //import templateName from 'path';
    export default {
        name: "",
        components: {},
        data() {
            return {
                showThrowInPopup: false,
                showRemindPopup: false,
                disabledClick: true, // 禁止点击
                count: 10,
                timer: null,
                rentOutCount: '', // 投放数量
                userPayPassword: '', // 安全码
                popupData: {}, // 弹窗数据
                throwRecordListData: {},
                rateListData: {},
                throwInListPage: 1,
                recordPage: 1,
                regularIntervalsInfo: {}, // 定投账户信息
                positionTimer: null,
            };
        },
        computed: { 	// 组件计算属性
            mineType() { // 币种
				return this.$store.getters.mineType
            },
            userInfo() { // 用户信息
				return this.$store.getters.userInfo
            },
            computedIncome() {
                if(this.rentOutCount) {
                    return Math.floor(this.rentOutCount*this.popupData.interest*this.popupData.periodTimeNum/365/100*100000000)/100000000
                }else{
                    return 0;
                }
            },
            deadline() {
                let endTime = new Date().getTime() + ((this.popupData.periodTimeNum+1)*24*60*60*1000);
                return this.$common.timestampToTime(endTime, 'y-M-D');
            },
            isPC() {
                if(document.body.clientWidth <= 768) {
                    return false
                }else{
                    return true
                }
            },
            borrowInfo() { // 用户信息
				return this.$store.getters.userBorrowInfo
            },
        },
        watch: { 	// 组件监听事件

        },
        methods: { 	// 组件方法
            tableRowClassName() {},
            rowStyle() {},
            closeThrowIn() {
                this.showThrowInPopup = false;
                setTimeout(() => {
                    $("body").css({"overflow":"visible","padding-right":"0px"});
                    $("html").css({"overflow":"visible"});
                    $("#longNavType").css({"right":"0px"});
                },300)
            },
            resetPosition() {
                this.positionTimer = setTimeout(() => {
                    if(this.$common.iosVersion()) {
						$("body").scrollTop(0);
					}
                }, 100)
			},
			clearPositionTimer() {
				if (this.positionTimer) {
					clearTimeout(this.positionTimer);
                }
			},
            showThrowInPopupEvent(item) {
                if(this.userInfo) { // 已登录--投放
                    this.showThrowInPopup = true;
                    this.popupData = item;
                    if(this.isPC){
                        $("body").css({"overflow":"hidden","padding-right":"17px"});
                        $("html").css({"overflow":"hidden"});
                        $("#longNavType").css({"right":"17px"});
                    }else{
                        $("body").css({"overflow":"hidden"});
                        $("html").css({"overflow":"hidden"});
                    }
                }else{ // // 未登录--登录
                    this.$RegPopup({
                        popupType: 'accountLogIn',
                    });
                }
            },
            rentOutOninputEvent(e) { //输入正整数
                if(!/^\d+$/.test(e.target.value)) {
                    e.target.value = e.target.value.replace(/\D/g, "")
                    this.rentOutCount = e.target.value.replace(/\D/g, "");
                }
            },
            checkoutPayPassword() {  // 校验密码
                this.disabledClick = true;
                let data = {
                    payPwd: this.$md5(this.userPayPassword),
                }
                this.$api.checkPayPassword(data).then( res => {
                    if(res) {
                        this.userDeliveryHandle();
                    }else{
                        this.$toast('密码错误！');
                        this.disabledClick = false;
                        this.closeRemindPopup();
                    }
                    console.log('校验安全密码',res);
                }).catch( err => {
                    this.userPayPassword = '';
                    console.log('校验安全密码出错', err);
                    if(err.msg) {
                        this.$toast(err.msg);
                    }
                    this.disabledClick = false;
                    this.closeRemindPopup();
                })
            },
            showRemindPopupEvent() {
                if(!this.rentOutCount) {
                    this.$toast('输入投放数量！');
                    return;
                }else if(this.rentOutCount < 10) {
                    this.$toast('投放额度必须大于等于10BHD！');
                    return;
                }else if(!this.userPayPassword.length) {
                    this.$toast('请输入安全密码！');
                    return;
                }
                this.countDown();
                this.showRemindPopup = true;
            },
            countDown() { // 倒计时
                clearInterval(this.timer);
                this.disabledClick = true;
                let count = 10;
                this.timer = setInterval(() => {
                    count -= 1;
                    if(count <= 0) {
                        clearInterval(this.timer);
                        this.disabledClick = false;
                        this.count = 0;
                    } else {
                        this.count = count;
                    }
                }, 1000)
            },
            closeRemindPopup() {
                this.showRemindPopup = false;
                clearInterval(this.timer);
                this.count = 10;
            },
            getDeliveryList() { // 获取定投列表
                let data = {
                    mineType: this.mineType,
                    page: this.throwInListPage,
                    pageSize: 5,
                }
                this.$api.getDeliveryList(data).then( res => {
                    this.rateListData = res;
                    console.log('获取定投列表',res);
                }).catch( err => {
                    console.log('获取定投列表出错', err);
                })
            },
            throwInListCurrentChange(val) {
				if(this.throwInListPage == val) { // 解决点击上一页和下一页发送两次请求的问题
                    return
                }
				this.throwInListPage = val;
				this.getDeliveryList();
			},
			throwInListPrevPage() { // 上一页
				this.throwInListPage -= 1;
				this.getDeliveryList();
			},
			throwInListNextPage() { // 下一页
				this.throwInListPage += 1;
				this.getDeliveryList();
            },
            userDeliveryHandle() { // 用户定投操作
                let data = {
                    mineType: this.mineType,
                    id: this.popupData.id,
                    coin: this.rentOutCount,
                }
                this.$api.userDeliveryHandle(data).then( res => {
                    this.$toast('投放成功！');
                    this.throwInListPage = 1;
                    this.recordPage = 1;
                    this.getDeliveryList(); // 更新投列表
                    this.getDeliveryRecord(); // 更新投放记录
                    this.getRegularIntervalsInfo(); // 更新账户信息
                    this.rentOutCount = ''; // 投放数量
                    this.userPayPassword = ''; // 安全码
                    this.closeThrowIn();
                    this.showRemindPopup = false;
                    console.log('用户定投操作',res);
                }).catch( err => {
                    console.log('用户定投操作出错', err);
                })
            },
            getDeliveryRecord() { // 获取用户定投记录
                let data = {
                    mineType: this.mineType,
                    page: this.recordPage,
                    pageSize: 5,
                }
                this.$api.getDeliveryRecord(data).then( res => {
                    this.throwRecordListData = res;
                    console.log('获取用户定投记录',res);
                }).catch( err => {
                    console.log('获取用户定投记录出错', err);
                })
            },
            throwRecordCurrentChange(val) {
                if(this.recordPage == val) { // 解决点击上一页和下一页发送两次请求的问题
                    return
                }
				this.recordPage = val;
				this.getDeliveryRecord();
            },
            throwRecordPrevPage() {
                this.recordPage -= 1;
				this.getDeliveryRecord();
            },
            throwRecordNextPage() {
                this.recordPage += 1;
				this.getDeliveryRecord();
            },
            mapRecordStatus(val) { // 映射投放记录状态  0未生效 1进行中  2已到期  3流标  4已统计',
                switch(val){
                    case 0:
                        return '未生效';
                        break;
                    case 1:
                        return '进行中';
                        break;
                    case 2:
                        return '已到期';
                        break;
                    case 3:
                        return '流标';
                        break;
                    case 4:
                        return '已统计';
                        break;    
                    default:
                        return '未知';
                }
            },
            mapRecordStatusColor(status) {
                switch (status) {
                    case 0: case 2: case 3:
                        return '#999999';
                        break;
                    case 1:
                        return '#37D442';
                        break;
                    default:
                        return '#999999';
                        break;
                }
            },
            getRegularIntervalsInfo() { // 定投账户信息
                this.$api.getRegularIntervalsInfo().then( res => {
                    this.regularIntervalsInfo = res;
                    console.log('获取用户定投账号信息',res);
                }).catch( err => {
                    console.log('获取用户定投账号信息出错', err);
                })
            }
        },
        created() { 	//生命周期 - 创建完成
            this.getDeliveryList();
            if(this.userInfo) {
                this.getDeliveryRecord();
                this.getRegularIntervalsInfo();
            }
        },
        mounted() {	//生命周期 - 挂载完成

        },
        beforeCreate() {	//生命周期 - 创建之前

        },
        beforeMount() {	//生命周期 - 挂载之前

        },
        beforeUpdate() {}, //生命周期 - 更新之前
        updated() {}, //生命周期 - 更新之后
        beforeDestroy() {}, //生命周期 - 销毁之前
        destroyed() {}, //生命周期 - 销毁完成
        activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>
<style lang="less">
.borrowingTreasure{
    .expectBox{
        display: flex;
        justify-content: center;
        align-items: center;
        .expect{
            color: #787878;
            font-size: 0.3rem;
            padding: 0 0.05rem;
        }
    }
    .el-table::before{
        height: 0;
    }
    .el-table td{
        .cell{
            color: #787878;
            @font-s();
            font-weight: 400;
        }
    }
    .el-table th{
        .cell{
            color: #5E5E5E;
            @font-s();
            font-weight: 400;
        }
    }
}
</style>
<style lang="less" scoped>
    //@import url(); 引入公共css类
    .borrowingTreasure{
        width: 100%;
        margin: 0 auto;
        background: #fff1e2;
        .viewContent{
            width: 100%;
            background: #fff1e2 url('~assets/images/borrowingTreasure/headerBg.jpg') no-repeat;
            background-size: 100%;
            margin-bottom: 0.8rem;
            .viewCenter{
                @content();
            }
        }
        .viewFooter{
            width: 100%;
            height: 3.36rem;
            background: #fec384 url('~assets/images/borrowingTreasure/footerBG.jpg') no-repeat;
            background-size: 100%;
        }
        .defineNotData{
            text-align: center;
        }
        .headerImg{
            width: 100%;
            height: 5.5rem;
            background: url('~assets/images/borrowingTreasure/smallBg.jpg') no-repeat;
            background-size: 100%;
            @media (max-width: 768px) {
                height: 4.8rem;
            }
        }
        .accountInfo{
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            width: 100%;
            margin-bottom: 0.15rem;
            .accountItem{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 24%;
                height: 0.72rem;
                background: #fec384 url('~assets/images/borrowingTreasure/itemBg.png') no-repeat;
                background-size: 100%;
                border-radius: 0.1rem;
                @media (max-width: 768px) {
                    width: 48%;
                    margin-bottom: 0.2rem;
                }
                .detailCount{
                    color: @color-default;
                    @font-xl();
                    font-weight:bold;
                }
                .labelName{
                    color: @color-default;
                    @font-l();
                    font-weight:bold;
                }
            }
        }
        .listBox{
            width: 100%;
            background: @color-default;
            border-radius: 0.1rem;
            margin-bottom: 0.2rem;
            padding-bottom: 0.28rem;
            overflow: hidden;
            .tableTitle{
                padding: 0.32rem 0.4rem;
            }
            .throwList{
                padding: 0 0.15rem;
            }
            .footerPagination{
                display: flex;
                justify-content: center;
            }
            .annualRateList{
                .listTr{
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 0.08rem;
                    &:hover{
                        background: #F6F9FB;
                    }
                    &.listTh{
                        &:hover{
                            background: none;
                        }
                    }
                    .listTd{
                        position: relative;
                        z-index: 1;
                        flex: 1;
                        @allCenter();
                        height: 0.66rem;
                        color: #787878;
                        @media (max-width: 768px) {
                            @font-xs();
                        }
                        .exclusive{
                            @font-xs();
                            color: @color-danger;
                        }
                        .dayCount{
                            color: #383838;
                        }
                        .annualRateItem{
                            display: flex;
                            align-items: baseline;
                            .annualRate{
                                font-size: 0.26rem;
                                font-weight: 900;
                                color: @color-danger;
                            }
                            .units{
                                @font-s();
                                color: @color-danger;
                            }
                        }
                        .userHandleBtn{
                            @allCenter();
                            width: 0.44rem;
                            height: 0.22rem;
                            color: @color-default;
                            @font-xs();
                            background: @color-danger;
                            border-radius: 0.11rem;
                            cursor: pointer;
                            @media (max-width: 768px) {
                                width: 0.6rem;
                                height: 0.3rem;
                                border-radius: 0.15rem;
                                @font-xs();
                            }
                        }
                    }
                    .progress{
                        position: absolute;
                        left: 0;
                        top: 0;
                        bottom: 0;
                        border-radius:  0 0.33rem 0.33rem 0;
                        background: #FBC474;
                    }
                }
            }
        }
        .throwInMask{
            @allCenter();
            position: fixed;
            z-index: 99;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.4);
            .throwInContentBox{
                width: 6.92rem;
                padding-bottom: 0.32rem;
                background: @color-default;
                border-radius: 0.1rem;
                @media (max-width: 768px) {
                    width: 96%;
                }
                
                .throwInContent{

                    .throwInTitle{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 0.24rem 0.4rem 0;
                        .closeBtn{
                            color: @color-main;
                            font-size: 0.4rem;
                            cursor: pointer;
                        }
                    }
                    .throwInInfo{
                        padding: 0.2rem 0.7rem;
                        .throwInInfoItem{
                            display: flex;
                            justify-content: space-between;
                            color: #333;
                            line-height: 0.46rem;
                            &.gray{
                                justify-content: flex-start;
                                align-items: baseline;
                                color: #999;
                                line-height: 0.34rem;
                                .balance{
                                    color: #3D8BFF;
                                    @font-xl();
                                }
                            }
                        }
                        .inptBox{
                            position: relative;
                            display: flex;
                            height: 0.4rem;
                            margin: 0.1rem 0;
                            @media (max-width: 768px) {
                                height: 0.8rem;
                            }
                            .inpt{
                                width: 100%;
                                height: 100%;
                                color: #666666;
                                text-indent: 0.1rem;
                                padding-right: 0.7rem;
                                border: 1px solid #B3B3B3;
                                &:focus{
                                    border: 1px solid #409EFF;
                                }
                            }
                            .units{
                                position: absolute;
                                right: 0;
                                top: 0;
                                bottom: 0;
                                @allCenter();
                                width: 0.7rem;
                                font-size: 0.14rem;
                                color: #3D8BFF;
                                font-weight: 900;
                                &.approximate{
                                    width: auto;
                                    right: 0;
                                    top: 0;
                                    bottom: 0;
                                    padding-right: 0.2rem;
                                }
                            }
                        }
                        .msgInfo{
                            @allCenter();
                            width: 100%;
                            height: 0.48rem;
                            color: #3A9DFF;
                            background: #D1E8FF;
                            margin-top: 0.26rem;
                            margin-bottom: 0.4rem;
                            @media (max-width: 768px) {
                                font-size: 0.12rem;
                            }
                        }
                        .confirmBtn{
                            @allCenter();
                            width: 3.60rem;
                            height: 0.48rem;
                            color: @color-light;
                            @font-s();
                            background: @color-default;
                            margin: 0 auto;
                            border: 1px solid @color-light;
                            border-radius: 0.24rem;
                            cursor: pointer;
                            &:hover{
                                color: @color-default;
                                background: @color-light;
                            }
                        }
                    }
                    
                }
            }
        }
        .remindMask{
            @allCenter();
            position: fixed;
            z-index: 99;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.4);
            .remindContentBox{
                width: 5.5rem;
                padding: 0.32rem 0.4rem;
                background: @color-default;
                border-radius: 0.1rem;
                @media (max-width: 768px) {
                    width: 90%;
                }
                .remindContent{
                    .remindContentText{
                        padding: 0.4rem 0;
                    }
                    .remindBtnBox{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        .consentBtn{
                            @allCenter();
                            width: 4.32rem;
                            height: 0.48rem;
                            color: #FF2626;
                            background:rgba(255,189,189,1);
                            border-radius: 0.24rem;
                            cursor: pointer;
                            outline: none;
                            margin-bottom: 0.24rem;
                            &.disabled{
                                color: @color-default;
                                background: #BBBBBB;
                            }
                            @media (max-width: 768px) {
                                font-size: 0.14rem;
                                width: 80%;
                            }
                        }
                        .cancelQuit{
                            color: #999;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
</style>