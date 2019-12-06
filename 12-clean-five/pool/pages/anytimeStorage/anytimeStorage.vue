<!-- 随心存 -->
<template>
    <div class="anytimeStorage">
        <div class="headerBox">
            <div class="bannerBox">
                <img v-if="isPC" src="~assets/images/anytimeStorage/banner.png" alt="">
                <img v-else src="~assets/images/anytimeStorage/banner2.jpg" alt="">
                <div class="calculator">
                    <div class="leftBox">
                        <div class="title">计算预期收益</div>    
                        <div class="inputBox datePickerBox">
                            <el-date-picker
                                v-model="startTime"
                                type="date"
                                :editable="false"
                                :picker-options="startPickerOptions"
                                :default-value="startTimeDefaultShow"
                                placeholder="选择借入时间">
                            </el-date-picker>
                        </div>
                        <div class="inputBox datePickerBox">
                            <el-date-picker
                                v-model="endTime"
                                type="date"
                                :editable="false"
                                :picker-options="endPickerOptions"
                                :default-value="endTimeDefaultShow"
                                placeholder="选择赎回时间">
                            </el-date-picker>
                        </div>
                        <div class="inputBox">
                            <input type="text" v-model.trim="bhdCount" placeholder="请输入要借入的币数(100BHD起)" @input="oninputBHDCountEvent($event)">
                            <div class="units">BHD</div>
                        </div>
                        <div class="title">您的预期收入</div>
                        <div class="inputBox">
                            <input type="text" class="predictIncome" v-model="predictIncome" readonly>
                            <div class="units">BHD</div>
                        </div>
                    </div>
                    <div class="rightBox">
                        <div class="itemBox">
                            <div class="itemBox_leftBox">
                                <div class="leftTitle">产品周期</div>
                                <div class="type">{{shortInterestRate.otherValue}}天以内</div>
                            </div>
                            <div class="itemBox_rightBox">
                                <div class="rightTitle">日息</div>
                                <div class="count">{{shortInterestRate.configValue}}</div>
                            </div>
                        </div>
                        <div class="itemBox">
                            <div class="itemBox_leftBox">
                                <div class="leftTitle">产品周期</div>
                                <div class="type">{{shortInterestRate.otherValue}}天以上</div>
                            </div>
                            <div class="itemBox_rightBox">
                                <div class="rightTitle">日息</div>
                                <div class="count">{{mediumInterestRate.configValue}}</div>
                            </div>
                        </div>
                        <div class="msg">注: 从{{ mediumInterestRate. updateTime | moment('y年M月d日')}}开始执行</div>
                    </div>
                </div>
            </div>
            <div class="computeBox">
                <div class="rateBox">
                    <div class="lable">收益率计算：</div>
                    <p class="text">借出和赎回当天均不计算收益，借出第二天（T+1日）开始计算收益。</p>
                    <p class="text">在该笔订单赎回时按照借出周期结算利息，借出和赎回当天均不计算收益。单笔借出不满48小时内赎回不结算收益。</p>
                    <p class="text">借出1-{{shortInterestRate.otherValue || 15}}天之间（含{{shortInterestRate.otherValue || 15}}天）日息{{shortInterestRate.configValue}}（借出1000个每天收益{{shortInterestRate.configValue*1000/100}}个）</p>
                    <p class="text">借出{{mediumInterestRate.otherValue || 15}}天以上日息{{mediumInterestRate.configValue}}（借出1000个每天收益{{ mediumInterestRate.configValue*1000/100}}个）</p>
                    <p class="text">*以上利率从{{ mediumInterestRate. updateTime | moment('y年M月d日')}}开始执行</p>
                    <p class="text">（超过2000个的借出建议拆分为多笔借出，方便单独单笔赎回）</p>
                </div>
                <div class="settleMode">
                    <div class="lable">BHD结算：</div>
                    <p class="text">1、短期出借不满{{shortInterestRate.otherValue || 15}}天（含{{shortInterestRate.otherValue || 15}}天），借币赎回以后，一次性结算利息给用户，计算方式为：借出数量*天数*{{shortInterestRate.configValue*1000/100000}}</p>
                    <p class="text">2、长期合作用户（借出超过{{mediumInterestRate.otherValue || 15}}天），规则如下：自借出日起第十个自然日后的第十天，结算收益一次，结算第一日至第十日的收益，第三十日当天结算第十日至第二十日的收益，以此类推。（例如客户A，在6月1号成功出借，在6月20号当天，结算6月1-10号期间的收益。6月30号当天，结算6月10-20号期间的收益，后续以此类推，每10天结算一次。）</p>
                </div>
            </div>
        </div>
        <div class="centerBox">
            <div class="pledgeAddress">
                <div class="lable">抵押地址：</div>
                <div class="poolAddress">37ahFaegsA5662VVCt4dgy2fS1Rz8w9Csg</div>
                <div class="copyAddressBtn" @click="copyPoolAddress" :data-clipboard-text="'37ahFaegsA5662VVCt4dgy2fS1Rz8w9Csg'">复制</div>
            </div>
            <div class="activeBox">
                <div class="lable">操作步骤</div>
                <div class="stepBox">
                    <div class="imgBox">
                        <img src="~assets/images/anytimeStorage/step1.png" alt="">
                    </div>
                    <div class="imgBox">
                        <img src="~assets/images/anytimeStorage/step2.png" alt="">
                    </div>
                    <div class="imgBox">
                        <img src="~assets/images/anytimeStorage/step3.png" alt="">
                    </div>
                    <div class="c">
                        <img src="~assets/images/anytimeStorage/step4.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="footerBox">
            <div class="title">如果您有富足的BHD，请添加爱挖矿池客服微信</div>
            <div class="imgList">
                <img src="~assets/images/anytimeStorage/Wechat1.png" alt="">
                <img src="~assets/images/anytimeStorage/Wechat2.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    //import templateName from 'path';import Clipboard from 'clipboard';
    import Clipboard from 'clipboard';

    export default {
        name: "",
        components: {},
        data() {
            return {
                shortInterestRate: {},
                mediumInterestRate: {},
                bhdCount: '100',
                daysCount: '',
                endTimeDefaultShow: new Date(this.$common.getTruthTime()),
                startTimeDefaultShow: new Date(this.$common.getTruthTime()),
                startTime: '',
                endTime: '',
                startPickerOptions: {
                    disabledDate: (time) => {
                        if(this.endTime) { // 如果已选择结束时间则   起始时间必须小于结束时间
                            return this.$common.getTruthTime(time) > this.$common.getTruthTime(this.endTime) || this.$common.getTruthTime(time) < this.$common.getTruthTime() - 24*60*60*1000;
                        }
                        return this.$common.getTruthTime(time) < this.$common.getTruthTime() - 24*60*60*1000;
                    }
                },
                endPickerOptions: {
                    disabledDate: (time) => {
                        if(this.startTime) { // 如果已选择开始时间则   结束时间必须大于开始时间
                            return this.$common.getTruthTime(time) < this.$common.getTruthTime(this.startTime);
                        }
                        return this.$common.getTruthTime(time) < this.$common.getTruthTime();
                    }
                },
            };
        },
        computed: { 	// 组件计算属性
            predictIncome() {
                if(this.startTime && this.endTime && this.bhdCount){
                    if(this.$common.getTruthTime(this.endTime) == this.$common.getTruthTime(this.startTime)) {
                        return 0;
                    }
                    let differenceValue = this.$common.getTruthTime(this.endTime) - this.$common.getTruthTime(this.startTime)-(24*60*60*1000);
                    let days = Math.ceil(differenceValue/(24*60*60*1000));
                    console.log('天数', days);
                    if(days>this.shortInterestRate.otherValue) {
                        return Math.floor(this.$common.accMul(this.bhdCount, this.$common.accMul(days, this.$common.accDiv(this.mediumInterestRate.configValue, 100)))*10000)/10000;
                    }else{
                        return Math.floor(this.$common.accMul(this.bhdCount, this.$common.accMul(days, this.$common.accDiv(this.shortInterestRate.configValue, 100)))*10000)/10000;
                    }
                }else{
                    return 0;
                }
            },
            isPC() {
                if(document.body.clientWidth <= 768) {
                    return false
                }else{
                    return true
                }
            },
        },
        watch: { 	// 组件监听事件
            startTime(newVal) {
                if(newVal){
                    if(this.$common.getTruthTime() - this.$common.getTruthTime(newVal) > 3600 * 1000 * 24 * 180) {
                        this.endTimeDefaultShow = this.$common.getTruthTime(newVal);
                    }else{
                        if(this.endTime) {
                            this.startTimeDefaultShow = this.$common.getTruthTime(this.endTime);
                        }else{
                            this.endTimeDefaultShow = new Date(this.$common.getTruthTime());
                            this.startTimeDefaultShow = new Date(this.$common.getTruthTime());
                        }
                    }
                }
            },
            endTime(newVal) {
                if(!newVal && !this.startTime) { // 起始和结束都空，设置成当前时间
                    this.endTimeDefaultShow = new Date(this.$common.getTruthTime());;
                    this.startTimeDefaultShow = new Date(this.$common.getTruthTime());;
                }
                if(newVal && !this.startTime) { // 结束时间不为空，起始时间设置为跟结束时间一样
                    this.startTimeDefaultShow = this.endTime;
                }
            },
        },
        methods: { 	// 组件方法
            copyPoolAddress() { // 复制矿池地址
				let clipboard = new Clipboard('.copyAddressBtn')
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
            getFollowHeartRate() { // 获取随心存利率
                let data = {
					mineType: this.mineType,
				}
				this.$api.followHeartRate().then( res => {
                    console.log('获取随心存利率', res);
                    if(res.length) {
                        this.shortInterestRate = res[0];
                        this.mediumInterestRate = res[1];
                    }
				}).catch( err => {
					console.log('获取随心存利率错误', err);
				})
            },
            oninputDaysEvent(e) { //输入正整数
                if(!/^\d+$/.test(e.target.value)) {
                    e.target.value = e.target.value.replace(/\D/g, "")
                    this.daysCount = e.target.value.replace(/\D/g, "");
                }
            },
            oninputBHDCountEvent(e) {
                if(!/^\d+$/.test(e.target.value)) {
                    e.target.value = e.target.value.replace(/\D/g, "")
                    this.bhdCount = e.target.value.replace(/\D/g, "");
                }
            },
        },
        created() { 	//生命周期 - 创建完成
            this.getFollowHeartRate();
        },
        mounted() {	//生命周期 - 挂载完成
        
        },
        beforeCreate() {
			document.querySelector('#app').setAttribute('style', 'background: rgba(246,249,252,0.5);');
		},
		beforeDestroy() { //生命周期 - 销毁之前
            document.querySelector('#app').setAttribute('style', '');
        },
        beforeMount() {}, //生命周期 - 挂载之前
        beforeUpdate() {}, //生命周期 - 更新之前
        updated() {}, //生命周期 - 更新之后
        destroyed() {}, //生命周期 - 销毁完成
        activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>

<style lang="less">
    .anytimeStorage{
        .el-date-editor.el-input{
            width: 100%;
            height: 100%;
            .el-input__inner{
                width: 100%;
                height: 100%;
                border: 0;
                &::placeholder{
                    color: #999;
                    font-size: 0.16rem;
                }
            }
        }
        .leftBox{
            .inputBox{
                .el-input__icon,.el-input__inner{
                    line-height: 0.54rem;
                    @media (max-width: 768px) {
                        line-height: 0.64rem;
                    }
                }
            }
        }
    }
</style>


<style lang="less" scoped>
    //@import url(); 引入公共css类
    .anytimeStorage{
        @content();
        padding-top: 0.2rem;
        .headerBox{
            margin-bottom: 0.2rem;
            .bannerBox{
                position: relative;
                width: 100%;
                height: 8.78rem;
                border-radius: 0.1rem;
                overflow: hidden;
                margin-bottom: 0.3rem;
                background: #0f013c;
                box-shadow: 0 0 0.14rem 0 rgba(212,212,212,0.6);
                @media (max-width: 768px) {
                    height: auto;
                }
                img{
                    width: 100%;
                }
                .calculator{
                    display: flex;
                    justify-content: space-between;
                    position: absolute;
                    left: 0;
                    width: 100%;
                    top: 3.2rem;
                    padding: 0 0.8rem;
                    @media (max-width: 768px) {
                        top: 3.0rem;
                        padding: 0 0.2rem;  
                    }
                    .leftBox{
                        @media (max-width: 768px) {
                            width: 45%
                        }
                        .title{
                            font-size: 0.2rem;
                            color: @color-default;
                            font-weight: bold;
                            margin-bottom: 0.28rem;
                        }
                        .inputBox{
                            position: relative;
                            width: 4.0rem;
                            height: 0.54rem;
                            border-radius: 0.1rem;
                            background: @color-default;
                            overflow: hidden;
                            margin-bottom: 0.3rem;
                            @media (max-width: 768px) {
                                width: 100%;
                                height: 0.64rem;
                            }
                            .units{
                                @allCenter();
                                position: absolute;
                                right: 0;
                                bottom: 0;
                                height: 100%;
                                color: #9A26D9;
                                @font-l();
                                padding-right: 0.1rem;
                            }
                            input{
                                position: relative;
                                width: 100%;
                                height: 100%;
                                text-indent: 0.2rem;
                                font-size: 0.18rem;
                                &::placeholder{
                                    color: #999;
                                    font-size: 0.16rem;
                                }
                            }
                            .predictIncome{
                                font-size: 0.3rem;
                                color: #9A26D9;
                                font-weight:bold;
                                padding-right: 0.6rem;
                                text-align: right;
                            }
                        }
                    }
                    .rightBox{
                        width: 5.3rem;
                        padding-top: 0.54rem;
                        @media (max-width: 768px) {
                            width: 45%
                        }
                        .msg{
                            font-size: 0.18rem;
                            color: @color-default;
                            text-align: right;
                        }
                        .itemBox{
                            display: flex;
                            width: 100%;
                            height: 1.3rem;
                            padding-left: 0.4rem;
                            background:rgba(255, 255, 255, 0.2);
                            border-radius: 0.1rem;
                            margin-bottom: 0.2rem;
                            .type{
                                font-size: 0.3rem;
                                font-weight: bold;
                                color: @color-default;
                                padding-left: 0.26rem;
                            }
                            .count{
                                font-size: 0.3rem;
                                font-weight: bold;
                                color: @color-default;
                            }
                            .itemBox_leftBox{
                                display: flex;
                                flex-direction: column;
                                justify-content: space-around;
                                width: 60%;
                                padding: 0.1rem 0;
                                .leftTitle{
                                    position: relative;
                                    font-size: 0.2rem;
                                    line-height: 0.2rem;
                                    font-weight:300;
                                    color: @color-default;
                                    padding-left: 0.26rem;
                                    &::before{
                                        content: "";
                                        position: absolute;
                                        left: 0;
                                        top: 0;
                                        bottom: 0;
                                        width: 0.06rem;
                                        background: @color-default;
                                        border-radius: 0.03rem;
                                    }
                                    @media (max-width: 768px) {
                                        line-height: 1;
                                    }
                                }
                            }
                            .itemBox_rightBox{
                                display: flex;
                                flex-direction: column;
                                justify-content: space-around;
                                width: 40%;
                                padding: 0.1rem 0;
                                .rightTitle{
                                    font-size: 0.2rem;
                                    font-weight:300;
                                    color: @color-default;
                                }
                            }
                        }
                    }
                }
            }
            .computeBox{
                background: rgba(255,255,255,1);
                box-shadow: 0 0 0.14rem 0 rgba(212,212,212,0.6);
                border-radius: 0.1rem;
                padding: 0 0.4rem 0.54rem;
                .lable{
                    @font-m();
                    color: @color-danger;
                    font-weight: bold;
                    padding: 0.3rem 0;
                }
                .text{
                    @font-m();
                    color: #333;
                    line-height: 2;
                }
            }
        }
        .centerBox{
            background: rgba(255,255,255,1);
            box-shadow: 0 0 0.14rem 0 rgba(212,212,212,0.6);
            border-radius: 0.1rem;
            padding: 0.28rem 0.4rem 0rem;
            margin-bottom: 0.2rem;
            .pledgeAddress{
                display: flex;
                align-items: center;
                .lable{
                    @font-m();
                }
                .poolAddress{
                    height: 0.32rem;
                    line-height: 0.32rem;
                    background:rgba(239,243,255,1);
                    padding: 0 0.2rem;
                    margin-left: 0.2rem;
                    margin-right: 0.32rem;
                    @font-m();
                    color: @color-main;
                    font-weight: bold;
                }
                .copyAddressBtn{
                    @allCenter();
                    width: 0.8rem;
                    height: 0.40rem;
                    color: @color-default;
                    @font-s();
                    background: @color-main;
                    border-radius: 0.20rem;
                    cursor: pointer;
                }
            }
            .activeBox{
                .lable{
                    @font-m();
                    color: @color-danger;
                    font-weight: bold;
                    padding: 0.3rem 0;
                }
                .stepBox{
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    .imgBox{
                        width: 48%;
                        margin-bottom: 0.5rem;
                        @media (max-width: 768px) {
                            width: 100%;
                        }
                    }
                    img{
                        width: 100%;
                    }
                }
            }
        }
        .footerBox{
            padding: 0.4rem;
            background: rgba(255,255,255,1);
            box-shadow: 0 0 0.14rem 0 rgba(212,212,212,0.6);
            border-radius: 0.1rem;
            .title{
                margin-bottom: 0.36rem;
            }
            .imgList{
                display: flex;
                img{
                    width: 2.26rem;
                    height: 2.26rem;
                    margin-right: 0.5rem;
                }
            }
        }
    }
</style>