<!-- 页尾 -->
<template>
    <div class="pageFooter">
        <div class="footerBox">
            <div class="footerContent">
                <div class="footerLogo" >
                    <img src="~assets/images/home/awpool-logo.png" alt="">
                </div>
                <img class="QR-code" src="~assets/images/footer/awpoolQR.jpg" alt="">
                <p class="msg">AWPool爱挖矿池业务布局POC容量证明硬盘挖矿全产业链服务全球用户<br/>我们希望省电环保的POC共识，真正实现中本聪初衷“去中心化人人挖矿”</p>
            </div>
        </div>
    </div>
</template>

<script>
    //import templateName from 'path';
    export default {
        name: "page-footer",
        components: {},
        data() {
            return {
                isFixed: false,
            };
        },
        computed: {},	// 组件计算属性
        watch: {
            
        },	// 组件监听事件
        methods: { 	// 组件方法

        },
        created() { 	//生命周期 - 创建完成

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
    .pageFooter{
        position: absolute;
        bottom: 0;
        width: 100%;
        background: @color-light;
    }
    .footerBox{
        @content();
        @media (max-width: 768px) {
            width: 100%;
        }
        .footerContent{
            display: flex;
            flex-direction: column;
            align-items: center;
            background: @color-light;
            
            .QR-code{
                width: 1.8rem;
                height: 1.8rem;
                background: #999;
            }
            .msg{
                @font-s();
                font-weight: 300;
                text-align: center;
                color:rgba(255,255,255,1);
                line-height: 0.42rem;
                padding: 0 0.2rem;
                line-height: 1.5;
                margin: 0.4rem 0;
            }
            .footerLogo{
                @allCenter();
                width: 1.6rem;
                height: 0.8rem;
                margin: 0.2rem 0;
            }
        }
    }
    
</style>