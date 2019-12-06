<!-- 资源中心 -->
<template>
    <div class="resource content">
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
        <div class="resourceContent">
            <div class="tools" v-show="currentIndex == 0">
                <div class="fileInfoBox" v-for="(item, index) in resourceInfo" :key="index">
                    <div class="leftModule">
                        <!-- 矿池类型  1合作池  2生态池 3代理软件 -->
                        <text-title class="downloadTitle">下载{{item.category == 1 ? 'AWMiner' : 'X-Proxy'}}</text-title>
                        <div class="fileList">
                            <div class="fileInfo">
                                <div 
                                    class="downloadBtn" 
                                    @click="downLoadTools(item.resourceUrl)" 
                                    :style="item.category == 2 ? 'background: #4ED283' : ''"
                                >
                                    <i class="iconfont downloadIcon" :class="mapIconFont(item.type)"></i>
                                    <span>{{item.category == 3 ? 'X-Proxy.zip' : 'AWMiner.zip'}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="rightModule">
                        <div class="rightModuleTitle">帮助说明</div>
                        <a
                            v-if="item.category == 3"
                            href="https://51app-file.oss-cn-hangzhou.aliyuncs.com/payment/mine/2019/10/17/18540886133721.pdf"
                            target="_blank"
                        >X-Proxy使用教程</a>
                        <pre class="detail">{{item.detail}}</pre>
                    </div>
                </div>
            </div>
            <!-- <div class="store" v-show="currentIndex == 1">
                正在开发中...
            </div> -->
        </div>
    </div>
</template>

<script>
    //import templateName from 'path';
    export default {
        name: "resource",
        components: {},
        data() {
            return {
                navData: [
                    {
                        name: '工具下载',
                        active: true,
                    },
                    // {
                    //     name: '硬盘商城',
                    //     active: false,
                    // },
                ],
                currentIndex: 0,
                resourceInfo: [],
            };
        },
        computed: {},	// 组件计算属性
        watch: {},	// 组件监听事件
        methods: { 	// 组件方法
            tabNav(val, index) { //  菜单切换
                for (const item of this.navData) {
                    item.active = false;
                }
                val.active = true;
                this.currentIndex = index;
            },
            mapIconFont(val) { // 映射icon图标
                switch (val) {
                    case 1:
                        return 'icon-weiruan'
                        break;
                    case 2:
                        return 'icon-linux'
                        break;

                    case 3:
                        return 'icon-ios'
                        break;
                
                    default:
                        return 'icon-weiruan'
                        break;
                }
            },
            downLoadTools(address) {
                window.open(address); 
            },
            getResourceInfo() { // 获取资源信息
                this.$api.getResourceInfo().then( res => {
                    this.resourceInfo = res;
                    console.log('资源', res);
                }).catch( err => {
                    console.log('资源出错', err);
                })
            },
        },
        created() { 	//生命周期 - 创建完成
            this.getResourceInfo() // 获取资源
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
    .resource{
        position: relative;
        z-index: 10;
        @content();
        background: transparent;
        a {
            display: block;
            margin-top: 0.16rem;
            color: #1f3fff;
        }
        .nav{
            @media (max-width: 768px) {
                background: rgba(0, 0, 0, 0.8);
                height: 1.0rem;
            }
            .navItem{
                height: 0.56rem;
                margin-right: 1.08rem;
                color: #666;
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
        .resourceContent{
            min-height: 4rem;
            @media (max-width: 768px) {
                padding-left: 0.3rem;
                padding-right: 0.3rem;
            }
            .tools{
                .fileInfoBox{
                    display: flex;
                    padding: 0.4rem;
                    box-shadow:  0 0 0.13rem 0 rgba(219,223,255,1);
                    border-radius: 0.1rem;
                    margin-bottom: 0.2rem;
                    background: @color-default;
                    .leftModule{
                        margin-right: 2.0rem;
                        @media (max-width: 768px) {
                            margin-right: 0.4rem;
                        }
                    }
                    .rightModule{
                        .rightModuleTitle{
                            @font-xl();
                            color: #383838;
                            font-weight: bold;
                        }
                        .detail{
                            line-height: 0.28rem;
                            @media (max-width: 768px) {
                                font-size: 0.12rem;
                            }
                        }
                    }
                    .downloadTitle{
                        margin-bottom: 0.44rem;
                    }
                    .fileList{
                        display: flex;
                        justify-content: space-between;
                        .fileInfo{
                            .downloadBtn{
                                width: 2.66rem;
                                height: 0.64rem;
                                color: @color-default;
                                background: @color-main;
                                border-radius: 0.08rem;
                                cursor: pointer;
                                @allCenter();
                                @hover();
                                justify-content: flex-start;
                                .downloadIcon{
                                    font-size: 0.3rem;
                                    margin: 0 0.2rem;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>