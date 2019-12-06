<!-- 矿机信息模块 -->
<template>
    <div class="millInfoModule">
        <div class="millVolumeBox">
            <i class="iconfont icon-kuangjirongliang iconVolume"></i>
            <div class="millOnlineVolume">{{mineOnline && mineOnline.volume || 0}} <span class="unit">TB</span></div>
            <div class="millVolumeTitle">矿机容量</div>
        </div>
        <div class="AccountKeyBox">
            <div class="labelTitle">AccountKey</div>
            <div class="accountKeyText">{{poolInfo && poolInfo.accountKey}}</div>
            <div class="copyAccountKey copyAccount" :data-clipboard-text="poolInfo && poolInfo.accountKey" @click="copyAccount">复制</div>
        </div>
    </div>
</template>

<script>
    //import templateName from 'path';
    // 复制插件
    import Clipboard from 'clipboard';
    
    export default {
        name: "millInfoModule",
        components: {},
        props: {
            mineOnline: {
                type: Object,
                default: () => null,
            },
            poolInfo: {
                type: Object,
                default: () => null,
            },
        },
        data() {
            return {

            };
        },
        computed: { 	// 组件计算属性

        },
        watch: { 	// 组件监听事件

        },
        methods: { 	// 组件方法
            copyAccount() { //复制
				let clipboard = new Clipboard('.copyAccount');
				clipboard.on('success', e => {
					this.$toast('复制成功');
					// 释放内存 
					clipboard.destroy();
				})
				clipboard.on('error', e => {
					// 不支持复制
					this.$toast('该浏览器不支持自动复制,请长按复制');
					// 释放内存 
					clipboard.destroy();
				})
			},
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
    .millInfoModule{
        width: 100%;
        height: 100%;
        background:rgba(255,255,255,1);
        box-shadow: 0 0 0.13rem 0 rgba(93,113,255,0.22);
        border-radius: 0.1rem;
        .millVolumeBox{
            display: flex;
            padding: 0 0.68rem;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 1.74rem;
            border-bottom: 1px solid #E9E9E9;
            .iconVolume{
                font-size: 0.7rem;
                color: #A177FF;
            }
            .millOnlineVolume{
                display: flex;
                align-items: flex-end;
                @font-xxxl();
                line-height: 0.4rem;
                font-weight:bold;
                font-family: HelveticaInserat-Roman-SemiB;
                color:#383838;
                .unit{
                    @font-xl();
                    line-height: 0.16rem;
                    font-weight:bold;
                    color:#383838;
                    margin-left: 0.28rem;
                }
            }
        }
        .AccountKeyBox{
            display: flex;
            padding: 0 0.68rem;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 0.85rem;
            .labelTitle{
                @font-l();
                font-weight:bold;
                color:#383838;
            }
            .accountKeyText{
                @font-l();
                color:#383838;
            }
            .copyAccountKey{
                @allCenter();
                width: 0.8rem;
                height: 0.4rem;
                background:@color-main;
                border-radius: 0.2rem;
                @font-m();
                color: @color-default;
                cursor: pointer;
            }
        }
    }
</style>