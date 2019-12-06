<!-- 借币宝 -->
<template>
    <div class="borrowPrecious">
        <div class="balanceInfoBox">
            <div class="balanceModule">
                <div class="typeBox">
                    <div class="typeName">
                        <text-title 
                            :textStyle="{color: 'white',fontSize: '0.16rem',fontWeight: 400,paddingLeft: '0.23rem',height: '0.2rem',}" 
                            :lineStyle="{background: 'white',width: '0.05rem',borderRadius: '0.02rem',}"
                        >
                            可存充值余额
                        </text-title>
                    </div>
                    <div class="countBox">
                        <div class="count">{{freedomAccountInfo.cashAmount || 0}}</div>
                        <div class="units">BHD</div>
                    </div>
                </div>
                <div class="typeBox">
                    <div class="typeName">
                        <text-title 
                            :textStyle="{color: 'white',fontSize: '0.16rem',fontWeight: 400,paddingLeft: '0.23rem',height: '0.2rem',}" 
                            :lineStyle="{background: 'white',width: '0.05rem',borderRadius: '0.02rem',}"
                        >
                            可存指向余额
                        </text-title>
                    </div>
                    <div class="countBox">
                        <div class="count">{{freedomAccountInfo.borrowAmount || 0}}</div>
                        <div class="units">BHD</div>
                    </div>
                </div>
            </div>
            <div class="incomeModule">
                <div class="typeBox">
                    <div class="typeName">
                        <text-title 
                            :textStyle="{color: 'white',fontSize: '0.16rem',fontWeight: 400,paddingLeft: '0.23rem',height: '0.2rem',}" 
                            :lineStyle="{background: 'white',width: '0.05rem',borderRadius: '0.02rem',}"
                        >
                            生效计息额
                        </text-title>
                    </div>
                    <div class="countBox">
                        <div class="count">{{freedomAccountInfo.effectAmount || 0}}</div>
                        <div class="units">BHD</div>
                    </div>
                </div>
                <div class="incomeDetailBox">
                    <div class="incomeDetailItem">
                        <div class="detailName">已存未生效</div>
                        <div>{{freedomAccountInfo.unEffectAmount || 0}} BHD</div>
                    </div>
                    <div class="incomeDetailItem">
                        <div class="detailName">昨日收益利息</div>
                        <div>{{freedomAccountInfo.yesterdayProfit || 0}} BHD</div>
                    </div>
                    <div class="incomeDetailItem">
                        <div class="detailName">总收益利息</div>
                        <div>{{freedomAccountInfo.totalProfit || 0}} BHD</div>
                    </div>
                </div>
            </div>
            <div class="medalModule">
                <text-title>用户等级</text-title>
                <div class="medalImgBox">
                    <img v-if="userInfo" class="medalImg" :src="medalImg" />
                    <div v-else style="text-align: center;font-size: 0.2rem;padding-top: 0.3rem;">请登录！</div>
                </div>
            </div>
        </div>
        <div class="annualRateBox">
            <div class="annualRateModule" id="annualRateModule"></div>
        </div>
        <div class="userHandleBox">
            <div class="userWriteBtn" @click="showWritePopupEvent">存入</div>
            <div class="userReadBtn" @click="showReadPopupEvent">赎回</div>
        </div>
        <div class="textBox explainBox">
            <text-title>说明</text-title>
            <div class="explainList">
                <div 
                    class="explainListItem" 
                    v-for="(item, index) in explainListDocument" 
                    :key="index"
                >
                    {{item}}
                </div>
            </div>
        </div>
        <div class="textBox exampleBox">
            <text-title>例子</text-title>
            <div class="imgList">
                <div class="imgListItem">
                    <div class="imgBox icon1"></div>
                    <div class="imgCaption">BHD存入“借入宝”</div>
                </div>
                <div class="secantLine"></div>
                <div class="imgListItem">
                    <div class="imgBox icon2"></div>
                    <div class="imgCaption">2：8充值指向比例</div>
                </div>
                <div class="secantLine"></div>
                <div class="imgListItem">
                    <div class="imgBox icon3"></div>
                    <div class="imgCaption">借入时间越长，收益越高</div>
                </div>
            </div>
            <div class="exampleTextBox">
                <pre class="documentStyle">{{exampleDocument}}</pre>
            </div>
        </div>
        <div class="textBox ruleBox">
            <div class="ruleTitleBox">
                <text-title>等级规则</text-title>
            </div>
            <pre class="documentStyle">{{ruleDocument}}</pre>
        </div>
        <transition name="fade">
            <div v-show="showWritePopup" class="popupMask" @touchmove.prevent @click.stop="closeWritePopup" style="animation-duration: 0.3s;">
                <div class="popupContentBox" @click.stop>
                    <div class="popupTitle">
                        <text-title>存入</text-title>
                        <div class="closeBtn" @click="closeWritePopup">&times;</div>
                    </div>
                    <div class="popupContent">
                        <div class="listDetailItem">
                            <div class="itemLabel">可存余额</div>
                            <div class="itemDetail">{{computedBorrowAmount || 0}} BHD</div>
                        </div>
                        <div class="listDetailItem">
                            <div class="itemLabel">存入额度</div>
                        </div>
                        <div class="inputBox">
                            <input type="text" placeholder="100" class="inpt" v-model="writeCount" @input="writeOninputEvent($event)" @focus="clearPositionTimer" @blur="resetPosition">
                            <div class="units">BHD</div>
                        </div>
                        <div class="listDetailItem">
                            <div class="itemLabel"><i class="iconfont icon-mima passwordIcon"></i> 安全码</div>
                        </div>
                        <div class="inputBox">
                            <input type="password" v-model="userPayPassword" placeholder="请输入安全码" class="inpt" autocomplete="new-password" maxlength="8" @keyup.enter="consentWriteEvent"  @focus="clearPositionTimer" @blur="resetPosition">
                        </div>
                        <div class="msgInfo">提示：你将要存入 {{writeCount||'0'}} BHD，系统会优先存入生效指向余额</div>
                    </div>
                    <div class="popupBtnBox">
                        <button :class="disabledClick ? 'consentBtn disabled' : 'consentBtn'" :disabled="disabledClick" @click="consentWriteEvent">确定</button>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div v-show="showReadPopup" class="popupMask" @touchmove.prevent @click.stop="closeReadPopup" style="animation-duration: 0.3s;">
                <div class="popupContentBox" @click.stop>
                    <div class="popupTitle">
                        <text-title>赎回</text-title>
                        <div class="closeBtn" @click="closeReadPopup">&times;</div>
                    </div>
                    <div class="popupContent">
                        <div class="listDetailItem">
                            <div class="itemLabel">可赎回金额</div>
                            <div class="itemDetail">{{computedReadAmuont}} BHD</div>
                        </div>
                        <div class="listDetailItem">
                            <div class="itemLabel">赎回额度</div>
                        </div>
                        <div class="inputBox">
                            <input type="text" placeholder="10" class="inpt" v-model="readCount" @input="readOninputEvent($event)" @focus="clearPositionTimer" @blur="resetPosition">
                            <div class="units">BHD</div>
                        </div>
                        <div class="listDetailItem">
                            <div class="itemLabel"><i class="iconfont icon-mima passwordIcon"></i> 安全码</div>
                        </div>
                        <div class="inputBox">
                            <input type="password" v-model="userPayPassword" placeholder="请输入安全码" class="inpt" autocomplete="new-password" maxlength="8" @keyup.enter="consentReadEvent"  @focus="clearPositionTimer" @blur="resetPosition">
                        </div>
                        <div class="msgInfo">提示：你将要赎回 {{readCount||'0'}} BHD，系统会优先赎回您的充值余额</div>
                    </div>
                    <div class="popupBtnBox">
                        <button :class="disabledClick ? 'consentBtn disabled' : 'consentBtn'" :disabled="disabledClick" @click="consentReadEvent">确定</button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    //import templateName from 'path';
    // 引入 ECharts 主模块
    let echarts = require('echarts/lib/echarts');
    // 引入提示框组件和图例组件
    // 引入柱状图
    require('echarts/lib/chart/bar');
    require('echarts/lib/chart/custom');
    require('echarts/lib/component/tooltip');
    require("echarts/lib/component/legendScroll");
    export default {
        name: "",
        mixins: [],
        components: {},
        data() {
            return {
                showWritePopup: false,
                showReadPopup: false,
                disabledClick: false,
                writeCount: '',
                readCount: '',
                userPayPassword: '',
                medalImg: '', //等级勋章路劲
                freedomAccountInfo: {}, // 活期宝账户信息
                annualRateInfo: [], // 年化率信息
                explainListDocument: [], // 说明文案
                ruleDocument: '', // 规则文案
                exampleDocument: '', // 例子文案
                positionTimer: null,
            };
        },
        computed: { 	// 组件计算属性
            computedBorrowAmount() {
                return this.$common.accAdd(this.freedomAccountInfo.borrowAmount, this.freedomAccountInfo.cashAmount);
            },
            computedReadAmuont() {
                return this.$common.accAdd(this.freedomAccountInfo.effectAmount, this.freedomAccountInfo.unEffectAmount);
            },
            userInfo() { // 用户信息
				return this.$store.getters.userInfo
            },
            isPC(){
                if(document.body.clientWidth <= 768) {
                    return false;
                }else{
                    return true;
                }
            },
        },
        watch: { 	// 组件监听事件

        },
        methods: { 	// 组件方法
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
            writeOninputEvent(e) { //输入正整数
                if(!/^\d+$/.test(e.target.value)) {
                    e.target.value = e.target.value.replace(/\D/g, "")
                    this.writeCount = e.target.value.replace(/\D/g, "");
                }
            },
            readOninputEvent(e) {
                if(!/^\d+$/.test(e.target.value)) {
                    e.target.value = e.target.value.replace(/\D/g, "")
                    this.readCount = e.target.value.replace(/\D/g, "");
                }
            },
            closeWritePopup() {
                this.showWritePopup = false;
                setTimeout(() => {
                    $("body").css({"overflow":"visible","padding-right":"0px"});
                    $("#longNavType").css({"right":"0px"});
                },300);
            },
            openWritePopup() {
                this.showWritePopup = true;
                if(this.isPC){
                    $("body").css({"overflow":"hidden","padding-right":"17px"})
                    $("#longNavType").css({"right":"17px"});
                }else{
                    $("body").css({"overflow":"hidden"})
                }
            },
            showWritePopupEvent() {
                if(this.userInfo) {
                    this.openWritePopup();
                }else{
                    this.$toast('请登录！');
                    this.$RegPopup({
                        popupType: 'accountLogIn',
                    });
                }
            },
            closeReadPopup() {
                this.showReadPopup = false;
                setTimeout(() => {
                    $("body").css({"overflow":"visible","padding-right":"0px"});
                    $("#longNavType").css({"right":"0px"});
                },300);
            },
            openReadPopup() {
                this.showReadPopup = true;
                if(this.isPC){
                    $("body").css({"overflow":"hidden","padding-right":"17px"})
                    $("#longNavType").css({"right":"17px"});
                }else{
                    $("body").css({"overflow":"hidden"})
                }
            },
            showReadPopupEvent() {
                if(this.userInfo) {
                    this.openReadPopup();
                }else{
                    this.$toast('请登录！');
                    this.$RegPopup({
                        popupType: 'accountLogIn',
                    });
                }
            },
            getUserInfoFreedom() { // 获取活期宝账户信息
                this.$api.getUserInfoFreedom().then( res => {
                    if(res.borrowAmount<0) {
                        res.borrowAmount = 0;
                    }
                    this.freedomAccountInfo = res;
                    this.mapMedal(res.level); // 映射等级勋章
                    console.log('活期宝账户信息', res);
                }).catch( err => {
                    console.log('活期宝账户信息出错', err);
                })
            },
            getText() {
                this.$api.getDocumentFreedom().then( res => {
                    console.log('活期宝文案', res);
                    if(res) {
                        res.map((item) => {
                            if(item.messageName=='说明') {
                                this.explainListDocument.push(item.messageAnswer);
                            }
                            if(item.messageName=='例子') {
                                this.exampleDocument=item.messageAnswer
                            }
                            if(item.messageName=='等级规则') {
                                this.ruleDocument=item.messageAnswer
                            }
                        })
                    }
                }).catch( err => {
                    console.log('获取活期宝文案出错', err);
                })
            },
            consentWriteEvent() { // 存入活期宝
                if(!this.writeCount) {
                    this.$toast('请输入存入数量！');
                    return;
                }else if(this.writeCount < 100) {
                    this.$toast('存入额度必须大于等于100BHD！');
                    return;
                }else if(!this.userPayPassword.length) {
                    this.$toast('请输入安全密码！');
                    return;
                }
                this.disabledClick = true;
                this.consentWriteHandle(); // 执行存入操作
            },
            consentWriteHandle() {
                let data = {
                    coin: this.writeCount,
                    prePwd: this.$md5(this.userPayPassword),
                }
                this.$api.userWriteFreedom(data).then( res => {
                    this.$toast('存入成功！')
                    this.writeCount='';
                    this.userPayPassword='';
                    this.closeWritePopup();
                    this.getUserInfoFreedom();
                    this.disabledClick = false;
                    console.log('存入活期宝', res);
                }).catch( err => {
                    this.disabledClick = false;
                    console.log('存入活期宝出错', err);
                })
            },
            consentReadEvent() { // 赎回
                if(!this.readCount) {
                    this.$toast('请输入赎回数量！');
                    return;
                }else if(!this.userPayPassword.length) {
                    this.$toast('请输入安全密码！');
                    return;
                }
                this.disabledClick = true;
                this.consentReadHandle(); // 执行存入操作
            },
            consentReadHandle() { // 赎回操作
                let data = {
                    coin: this.readCount,
                    prePwd: this.$md5(this.userPayPassword),
                }
                this.$api.userReadFreedom(data).then( res => {
                    this.$toast('赎回成功！');
                    this.readCount='';
                    this.userPayPassword='';
                    this.closeReadPopup();
                    this.getUserInfoFreedom();
                    this.disabledClick = false;
                    console.log('取出活期宝', res);
                }).catch( err => {
                    this.disabledClick = false;
                    console.log('取出活期宝出错', err);
                })
            },
            getAnnualRateInfo() {
                this.$api.getIncomeListFreedom().then( res => {
                    this.annualRateInfo = res;
                    this.initAnnualRateCharts();
                    console.log('获取年化率信息', res);
                }).catch( err => {
                    console.log('获取年化率信息出错', err);
                })
                
            },
            mapLevel(level) {
                switch (level) {
                    case 1:
                        return '铁勋';
                        break;
                    case 2:
                        return '铜勋';
                        break;
                    case 3:
                        return '银勋';
                        break;
                    case 4:
                        return '金勋';
                        break;
                    case 5:
                        return '钻勋';
                        break;
                    default:
                        return '未知';
                        break;
                }
            },
            mapMedal(level) {
                switch (level) {
                    case 1:
                        this.medalImg= require("assets/images/borrowPrecious/level1.png");
                        break;
                    case 2:
                        this.medalImg= require("assets/images/borrowPrecious/level2.png");
                        break;
                    case 3:
                        this.medalImg= require("assets/images/borrowPrecious/level3.png");
                        break;
                    case 4:
                        this.medalImg= require("assets/images/borrowPrecious/level4.png");
                        break;
                    case 5:
                        this.medalImg= require("assets/images/borrowPrecious/level5.png");
                        break;
                    default:
                        this.medalImg= require("assets/images/borrowPrecious/level1.png");
                        break;
                }
            },
            initAnnualRateCharts() { // 年化率
                // 基于准备好的dom，初始化echarts实例
                var annualRateChart = echarts.init(document.getElementById('annualRateModule'));
                var medalIcons = {
                    1: require("assets/images/borrowPrecious/level1.png"),
                    2: require("assets/images/borrowPrecious/level2.png"),
                    3: require("assets/images/borrowPrecious/level3.png"),
                    4: require("assets/images/borrowPrecious/level4.png"),
                    5: require("assets/images/borrowPrecious/level5.png"),
                };
                var medalData = this.annualRateInfo.map((entry, index) => {
                    return [
                        this.mapLevel(entry.level),
                        medalIcons[entry.level],
                        entry.yearInterest,
                        entry.id,
                        index,
                        entry.level,
                    ]
                });
                var medalIconSize =  this.isPC ? 80 : 40;
                var  renderMedalIcon = (param, api) => { // 渲染勋章
                    var point = api.coord([
                        api.value(0), // 通过第一个下标（勋章）匹配x轴坐标
                    ]);
                    return {
                        type: 'group',
                        children: [{
                            type: 'image',
                            style: {
                                image: api.value(1),
                                x: -medalIconSize / 2,
                                y: -medalIconSize / 2,
                                width: medalIconSize,
                                height: medalIconSize,
                            },
                            position: [point[0], this.isPC ? 356 : 380]
                        },{
                            type: 'text',
                            style: {
                                text: api.value(0),
                                textFont: api.font({fontSize: 14}),
                                textAlign: 'center',
                                textVerticalAlign: 'bottom',
                                fill: '#3098FF', // 字体填充颜色
                            },
                            position: [point[0], this.isPC ? 410 : 420]
                        }]
                    };
                }
                // 指定图表的配置项和数据
                var option = {
                    animationDelay: 100,
                    // animationDuration: 2000,
                    animationDuration: function (idx) {
                        // 越往后的数据延迟越大
                        return (idx+1) * 500;
                    },
                    tooltip: {
                        // trigger: 'axis',
                        formatter: function (params) {
                            return `${params.name}<br />年化率: ${params.data}%`;
                        },
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'none'        // 默认为直线，可选为：'line' | 'shadow'
                        },
                    },
                    grid: [
                        {
                            x: this.isPC ? '60' : '36',
                            y: this.isPC ? '60' : '36',
                            x2: this.isPC ? '60' : '36',
                            y2: this.isPC ? '120' : '80',
                        },
                    ],
                    xAxis: {
                        name: '等级',
                        type: 'category',
                        data: this.annualRateInfo.map((item) => {
                            return this.mapLevel(item.level);
                        }),
                        axisLabel: {
                            textStyle: {
                                color: '#3098FF'
                            },
                            show: false,
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle:{
                                color: ['#00407E'],
                                width: 1,
                                type: 'solid'
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle:{
                                color: ['#fff'],
                                width: 1,
                                type: 'solid'
                            }
                    　　},
                        nameTextStyle: {
                            color: '#00407E',
                            fontSize: this.isPC ? 16 : 14,
                            padding: this.isPC ? [50, 0, 0, -30] : [40, 0, 0, -20],
                        },
                    },
                    yAxis: {
                        name: '年化率 %',
                        type: 'value',
                        nameGap: 20,
                        axisLabel: {
                            formatter: '{value}',
                        },
                        axisLine: {
                            show: true,
                            lineStyle:{
                                color: ['#00407E'],
                                width: 1,
                                type: 'solid',
                            }
                        },
                        splitArea : {
                            show : true,
                            areaStyle:{
                                //网格背景样式
                                color: '#f0f8ff',
                            }
                        },
                        splitLine: {
                            //网格线条样式
                            show: true,
                            lineStyle:{
                                color: ['#fff'],
                                width: 1,
                                type: 'solid'
                            }
                    　　},
                        nameTextStyle: {
                            color: '#00407E',
                            fontSize: this.isPC ? 16 : 14,
                            padding: this.isPC ? [0, 0, 0, 10] : [0, 0, -8, 20],
                        }
                    },
                    series: [
                        { // For shadow
                            type: 'bar',
                            itemStyle: {
                                normal: {color: 'rgba(0,0,0,0.05)'}
                            },
                            yAxisIndex: 0,
                            barGap:'-100%',
                            data: this.annualRateInfo.map((item) => {
                                return item.yearInterest
                            }),
                            animation: false,
                            barWidth : this.isPC ? 50 : 30,//柱图宽度
                        },
                        {
                            name:'年化率',
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#83bff6'},
                                            {offset: 0.5, color: '#188df0'},
                                            {offset: 1, color: '#188df0'}
                                        ]
                                    )
                                },
                                emphasis: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#2378f7'},
                                            {offset: 0.7, color: '#2378f7'},
                                            {offset: 1, color: '#83bff6'}
                                        ]
                                    )
                                }
                            },
                            barWidth : this.isPC ? 50 : 30,//柱图宽度
                            // data: this.annualRateInfo.map((item) => {
                            //     return item.yearInterest
                            // }),
                            data: medalData,
                            encode: {
                                x: 0,
                                y: 2,
                            },
                            tooltip: {
                                show: true,
                                trigger: 'item',
                                formatter: (param) => {
                                    return `
                                    <img style="${this.isPC ? 'width:160px; height:160px;' : 'width:100px; height:100px;'}" src="${param.value[1]}" />
                                    ${param.value[0]}<br />
                                    年化率: ${param.value[2]}%`;
                                }
                            },
                        },
                        {
                            type: 'custom', // 自定义勋章模块
                            renderItem: renderMedalIcon,
                            data: medalData,
                            encode: {
                                x: 1,
                                y: 1,
                            },
                            tooltip: {
                                show: false,
                                trigger: 'item',
                                formatter: function (param) {
                                    return `<img style="width:100px; height:100px;" src="${param.value[1]}" />${param.value[0]}<br />年化率: ${param.value[2]}%`;
                                }
                            },
                        }
                    ]
                    
                };
                // 使用刚指定的配置项和数据显示图表。
                annualRateChart.setOption(option);
                window.addEventListener("resize", function() {
					annualRateChart.resize();
				});
            },
        },
        created() { 	//生命周期 - 创建完成
            this.getText();
            if(this.userInfo) {
                this.getUserInfoFreedom();
            }
            
        },
        mounted() {	//生命周期 - 挂载完成
            this.getAnnualRateInfo();
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

<style lang="less" scoped>
    //@import url(); 引入公共css类
    @import url('./borrowPrecious.less');
</style>