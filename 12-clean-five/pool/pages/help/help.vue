<!-- 模块名称 -->
<template>
    <div class="help content">
        <!-- <ul class="nav clearfix">
            <li 
                v-for="(item, index) in navData"
                :key="index" 
                :class="item.active ? 'navItem active' : 'navItem'"
                @click="tabNav(item, index)"
            >
                {{item.name}}
            </li>
        </ul> -->
        <div class="helpContent">
            <div v-show="activeIndex === 0" class="question">
                <div class="contentTitle">
                    <text-title>常见问题</text-title>
                </div>
                <el-collapse v-model="activeNames" @change="handleChange">
                    <el-collapse-item 
                        v-for="(item, index) in helpList"
                        :key="index"
                        :title="item.messageName" 
                        :name="index + 1"
                    >
                        <div class="questionContent">
                            <pre>{{item.messageAnswer}}</pre>
                        </div>
                        <div class="userFeedback">
                            <button class="userLike" @click="userFeedback($event, item, 1)"><i class="icon iconfont icon-dianzan" :style="userInfo && item.praised == 1 ? 'color: red' : ''"></i><span>有用（{{item.usefulCount}}）</span></button>
                            <button class="userLike" @click="userFeedback($event, item, 0)"><i class="icon iconfont icon-chaping" :style="userInfo && item.praised == 0 ? 'color: red' : ''"></i><span>没用（{{item.uselessCount}}）</span></button>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <div v-show="activeIndex === 1" class="us">
                <div class="textBlock">
                    <h5>深圳研发中心：</h5>
                    <p class="mb">广东省深圳市南山区玉泉路89号设计创意产业基地3栋6楼</p>
                </div>
                <div class="textBlock">
                    <h5>深圳运营中心：</h5>
                    <p class="mb">深圳市福田区园岭街道燕南路42-2号</p>
                    <p class="">电话：0755-86715250</p>
                    <p class="mb">邮箱：admin@51app.cn</p>   
                </div>
                <div class="textBlock">
                    <h5>AWPOOL</h5>
                    <p class="mb">
                        爱挖矿池由深圳市粤来粤旺科技有限公司创立，是一支年轻、敏锐、朝气蓬勃、志向远大的创业团队，我们秉承专业、敬业、激情、创新的发展理念，
                        坚持以用户为本、信用为先的服务准则。爱挖矿池着重矿圈上下游布局，致力于在各个细分领域建立新标准。近年来持续服务于比特币矿机与挖矿行业， 
                        拥有丰富的系统设计、开发维护、运营管理经验。深圳市粤来粤旺科技有限公司立足于中国深圳特区，年轻的创始团队以高度的热忱并提供行业内有竞争力的薪酬待遇诚邀各路开发精英加盟创业，
                        为全球区块链事业作出贡献。
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //import templateName from 'path';
    export default {
        name: "help",
        components: {},
        data() {
            return {
                navData: [
                    {
                        name: '常见问题',
                        active: true,
                    },
                    // {
                    //     name: '联系我们',
                    //     active: false,
                    // },
                ],
                activeNames: ['1'],
                activeIndex: 0,
                helpList: [],
            };
        },
        computed: { // 组件计算属性
            userInfo() { // 用户信息
                return this.$store.getters.userInfo
            },
        },
        watch: {},	// 组件监听事件
        methods: { 	// 组件方法
            tabNav(val, index) { //  菜单切换
                for (const item of this.navData) {
                    item.active = false;
                }
                val.active = true;
                this.activeIndex = index;
            },
            handleChange(val) {
                // console.log(val);
            },
            userFeedback(e, item, status) { // 反馈
                if(!this.userInfo) {
                    this.$toast("请先登录");
                    return
                }
                if(item.praised == 1 || item.praised == 0) {
                    this.$toast("请勿重复提交");
                    return
                }
                let data = {
                    id: item.id,
                    useNumber: status,
                }
                this.$api.helpLike(data).then( res => {
                    console.log(status?'有用':'没用', res);
                    this.getHelp();
                    this.$toast("提交成功");
                }).catch( err => {
                    this.$toast("提交失败");
                    console.log(status?'有用出错':'没用出错', err);
                })
            },
            getHelp() {
                let data = {
                    language: 'zh',
                }
                this.$api.help(data).then( res => {
                    console.log('帮助', res);
                    this.helpList = res;
                }).catch( err => {
                    console.log('获取帮助出错', err);
                })
            },
        },
        created() { 	//生命周期 - 创建完成
            this.getHelp();
        },
        mounted() {	//生命周期 - 挂载完成
        
        },
        beforeCreate() { //生命周期 - 创建之前
        
        },
        beforeMount() {}, //生命周期 - 挂载之前
        beforeUpdate() {}, //生命周期 - 更新之前
        updated() {}, //生命周期 - 更新之后
        beforeDestroy() { //生命周期 - 销毁之前
        
        },
        destroyed() {}, //生命周期 - 销毁完成
        activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>

<style lang="less">
    .help{

        .el-collapse-item__header{
            @font-s();
            font-weight: bold;
            color: #383838;
            padding-left: 0.4rem;
        }
        .questionContent{
            padding: 0 0.4rem;
        }
        .el-collapse-item__arrow{
            margin: 0 0.4rem 0 auto;
        }
        .el-collapse{
            border-top: 0;
        }
    }
</style>

<style lang="less" scoped>
    //@import url(); 引入公共css类
    .help{
        @content();
        position: relative;
        z-index: 10;
        @media (max-width: 768px) {
            margin-top: 0;
        }
        .nav{
            @media (max-width: 768px) {
                background: rgba(0, 0, 0, 0.8);
                height: 1.0rem;
            }
            .navItem{
                height: 0.56rem;
                margin-right: 1.08rem;
                color: rgba(255, 255, 255, 0.5);
                @font-l();
                font-weight: 400;
                border-bottom: 0.04rem solid transparent;
                float: left;
                cursor: pointer;
                @allCenter();
                &.active{
                    border-color: @color-main;
                    color: @color-default;
                }
                @media (max-width: 768px) {
                    height: 100%;
                    border-bottom-width: 0.08rem;
                }
            }
        }
        .helpContent{
            background: @color-default;
            padding-bottom: 0.9rem;
            box-shadow:  0 0 0.13rem 0 rgba(219,223,255,1);
            border-radius: 0.1rem;
            @media (max-width: 768px) {
                padding-left: 0.3rem;
                padding-right: 0.3rem;
            }
            .contentTitle{
                padding: 0.4rem;
            }
            .question{
                .questionContent{
                    @font-s();
                    font-weight: 400;
                    color: #383838;
                    text-indent: 0.4rem;
                }
                .userFeedback{
                    display: flex;
                    justify-content: flex-end;
                    padding-top: 0.2rem;
                    .userLike{
                        color: #383838;
                        margin-right: 0.28rem;
                        cursor: pointer;
                        background: none;
                    }
                    .icon{
                        margin-right: 0.1rem;
                        cursor: pointer;
                    }
                }
            }
            .us{
                .textBlock{
                    h5{
                        @font-s();
                        color: #383838;
                        font-weight: bold;
                    }
                    p{
                        @font-s();
                        color: #383838;
                        &.mb{
                            margin-bottom: 0.3rem;
                        }
                    }
                }
            }
        }
    }
</style>