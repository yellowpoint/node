<!-- 收益模块 -->
<template>
    <div class="incomeModule yieldAate">
        <div class="yieldTitle">
            <text-title>可获得{{IncomeRate.rate}}%收益</text-title>
            <el-tooltip placement="top">
                <div slot="content">
                    抵押不足100%，挖矿收益为{{IncomeRate.rate}}%，足额100%满抵押，即可获得100%收益；<br/>
                    注意: 即使是99%的抵押也是{{IncomeRate.rate}}%收益。<br/>
                    系统提醒: 签约后，即可享受0抵押，{{IncomeRate.agreementRate}}%收益，系统会自动替矿工进行发单合作挖矿。

                </div>
                <i class="icon iconfont icon-tishi align"></i>
            </el-tooltip>
        </div>
        <div class="rateBox">
            <div class="pledgeArea rateItem">
                <div id="pledgeRate" class="canvas" :style="readOnly ? 'margin-bottom: 0.12rem' : 'margin-bottom: 0.25rem'"></div>
                <div class="pledgeRate">当前抵押率</div>
            </div>
            <div class="yieldArea rateItem">
                <div id="yieldRate" class="canvas" :style="readOnly ? 'margin-bottom: 0.12rem' : 'margin-bottom: 0.25rem'"></div>
                <div class="yieldRate">收益率</div>
            </div>
        </div>
    </div>
</template>

<script>
    //import templateName from 'path';
    // 引入 ECharts 主模块
    let echarts = require('echarts/lib/echarts');
    // 引入饼状图
    require('echarts/lib/chart/pie');
    // 引入标题组件
    require('echarts/lib/component/title');

    export default {
        name: "incomeModule",
        components: {},
        data() {
            return {
                IncomeRate: {},
            };
        },
        props: {
            apiKey: {
                type: String,
                default: '',
            },
            readOnly: {
                type: Boolean,
                default: false,
            },
        },
        computed: { 	// 组件计算属性
            isPC() {
                if(document.body.clientWidth <= 768) {
                    return false
                }else{
                    return true
                }
            },
            mineType() { // 币种
                return this.$store.getters.mineType;
            }
        },
        watch: { 	// 组件监听事件

        },
        methods: { 	// 组件方法
            getRate() { // 获取抵押率
                let data = null;
                if(this.readOnly) {
                    data = {
                        mineType: this.mineType,
                        apiKey: this.apiKey,
                    }
                }else{
                    data = {
                        mineType: this.mineType,
                    }
                }
                this.$api.getIncomeRate(data).then( res => {
                    if(res) {
                        this.$emit('tap', res);
                    }
                    this.IncomeRate = res || {};
                    this.drawPledgeRate();
                    this.drawyieldRate();
                    console.log('获取抵押率', res);
                }).catch( err => {
                    console.log('获取抵押率出错', err);
                })
            },
            drawPledgeRate() { // 绘制抵押率
                let e= this.IncomeRate.mortgageRate || '0'; 
                let Chart = echarts.init(document.getElementById('pledgeRate'));
                var labelBottom = {//底层样式
                    normal : {
                        color: '#FF9E9E',
                        label : {
                            show : true,
                            position : 'center',
                        },
                        labelLine : {
                            show : false
                        },
                    },
                };
                var labelTop = {//上层样式
                    normal : {
                        color :'#FF5757',
                        label : {
                            show : true,
                            position : 'center',
                        },
                        labelLine : {
                            show : false
                        }
                    }
                };
                let option = {
                    title:{
                        show: true,
                        text: e+'%',
                        x: 'center',
                        y: 'center',
                        textStyle: {
                            fontSize: this.isPC ? '24' : '12',
                            color: '#333',
                            fontWeight: 'bold'
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{d}%",
                        show: false
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        show: false
                    },
                    series: {
                        name: '',
                        type: 'pie',
                        radius: ['80%', '100%'],
                        avoidLabelOverlap: true,
                        hoverAnimation: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center',
                            },
                            emphasis: {
                                show: false
                            },
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value: e, name: '', itemStyle : labelTop},
                            {value: 100-e, name: '', itemStyle : labelBottom}
                        ]
                    }
                };
                Chart.setOption(option);
            },
            drawyieldRate() { // 绘制收益率
                let e= this.IncomeRate.rate || '0'; 
                let Chart = echarts.init(document.getElementById('yieldRate'));
                var labelBottom = {//底层样式
                    normal : {
                        color: '#E1E2FF',
                        label : {
                            show : true,
                            position : 'center',
                        },
                        labelLine : {
                            show : false
                        },
                    },
                };
                var labelTop = {//上层样式
                    normal : {
                        color :'#575FFF',
                        label : {
                            show : true,
                            position : 'center',
                        },
                        labelLine : {
                            show : false
                        }
                    }
                };
                let option = {
                    title:{
                        show: true,
                        text: e+'%',
                        x: 'center',
                        y: 'center',
                        textStyle: {
                            fontSize: this.isPC ? '24' : '12',
                            color: '#333',
                            fontWeight: 'bold',
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{d}%",
                        show: false
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        show: false
                    },
                    series: {
                        name: '',
                        type: 'pie',
                        radius: ['80%', '100%'],
                        avoidLabelOverlap: true,
                        hoverAnimation: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center',
                            },
                            emphasis: {
                                show: false
                            },
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value: e, name: '', itemStyle : labelTop},
                            {value: 100-e, name: '', itemStyle : labelBottom}
                        ]
                    }
                };
                Chart.setOption(option);
            },
        },
        created() { 	//生命周期 - 创建完成
            this.getRate();
        },
        mounted() {	//生命周期 - 挂载完成

        },
        beforeCreate() {}, //生命周期 - 创建之前
        beforeMount() {}, //生命周期 - 挂载之前
        beforeUpdate() {}, //生命周期 - 更新之前
        updated() {}, //生命周期 - 更新之后
        beforeDestroy() {}, //生命周期 - 销毁之前
        destroyed() {}, //生命周期 - 销毁完成
        activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>

<style lang="less" scoped>
    //@import url(); 引入公共css类
    .yieldAate{
        width: 100%;
        height: 100%;
        background: @color-default;
        padding: 0.24rem 0.2rem;
        box-shadow: 0 0 0.13rem 0 rgba(219,223,255,1);
        border-radius: 0.1rem;
        @media (max-width: 768px) {
            padding: 0.24rem 0.4rem;
        }
        .yieldTitle{
            position: relative;
            display: flex;
            align-items: center;
            width: 100%;
            color: #383838;
            margin-bottom: 0.3rem;
            .align{
                margin-left: 0.2rem;
            }
        }
        .rateBox{
            display: flex;
            justify-content: space-between;
            align-items: center;
            @media (max-width: 768px) {
                padding: 0 0.6rem;
            }
            .rateItem{
                text-align: center;
                .canvas{
                    width: 1.3rem;
                    height: 1.3rem;
                    @media (max-width: 768px) {
                        width: 1.2rem;
                        height: 1.2rem;
                    }
                }
            }
        }
    }
</style>