<!-- 标题组件 -->
<template>
    <div :class="isReactive ? 'textTitle isReactive' : 'textTitle'" :style="textStyle">
        <div class="leftLine" :style="lineStyle"></div>
        <slot></slot>
    </div>
</template>

<script>
    //import templateName from 'path';
    export default {
        name: "textTitle",
        props:{
            isReactive: {
                type: Boolean,
                default: false,
            },
            textStyle: {
                type: Object,
                default: () => {},
            },
            lineStyle: {
                type: Object,
                default: () => {},
            }
        },
        components: {},
        data() {
            return {

            };
        },
        computed: { 	// 组件计算属性

        },
        watch: { 	// 组件监听事件

        },
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
    .textTitle{
        display: flex;
        align-items: center;
        position: relative;
        color:#383838;
        font-weight:bold;
        @font-xl();
        height: 0.24rem;
        line-height: 1;
        padding-left: 0.3rem;
    }
    .leftLine{
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 0.1rem;
        border-radius: 0.05rem;
        background: @color-main;
    }
    .isReactive{
        @media (max-width: 768px) {
            padding-left: 0.15rem;
            @font-xs();
        }
    }
</style>