<template>
    <div class="toast__container">
        <div ref="content" class="toastContent animated fadeIn" :class="setOption.bg">
            <!-- <img v-if="showIcon" :src="setOption.icon" alt=""> -->
            <i v-if="showIcon" :class="setOption.icon"></i>
            <span v-html="text" />
            <!-- <pre class="textBox">{{text}}</pre> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'toast',
    data() {
        return {
        }
    },
    props: {
        // 提示类型
        toastType: {
            type: String,
            default: '',
        },
        // 是否显示图标
        showIcon: {
            type: Boolean,
            default: false,
        },
        // 文本内容
        text: {
            type: String,
            default: '',
        },
        // 窗体持续时间
        duration: {
            type: Number,
            default: 2000,
        },
        // 是否手动关闭
        isManualClose: {
            type: Boolean,
            default: false,
        },
        // 窗体关闭回调
        onClose: {
            type: Function,
            default: () => {},
        },
    },
    computed: {
        setOption() {
            let option = {};
            if(this.toastType == 'success') {
                option.icon = 'el-icon-success';
                option.bg = 'success';
            } else if(this.toastType == 'error') {
                option.icon = 'el-icon-error';
                option.bg = 'error';
            } else if(this.toastType == 'warning') {
                option.icon = 'el-icon-warning';
                option.bg = 'warning';
            } else{
                return option;
            }
            return option;
        }
    },
    created() {
    },
    methods: {
        /**
         * 主动关闭窗口，移除元素
         */
        destroy() {
            if (this.$el) {
                document.body.removeChild(this.$el);
            }
            this.onClose();
        },
        /**
         * 异步控制
         * @param {Number}            timeout 时间（毫秒）
         * @param {Function}        fn            执行函数
         * @param {Array}         args      执行函数的参数
         * @param {Any}           scope    执行函数的作用域
         */
        syncApply({ timeout, fn, args = [], scope = this }) {
            return new Promise((resolve, reject) => {
                try {
                    setTimeout(() => {
                        resolve(fn.apply(scope, args));
                    }, timeout);
                } catch (err) {
                    reject(err);
                }
            });
        },
    },
    async mounted() {
        // 自动关闭窗口
        if (!this.isManualClose) {
            try {
                // 执行淡出动画
                await this.syncApply({
                    timeout: this.duration,
                    fn: this.$el.children[0].classList.add,
                    args: ['fadeOut'],
                    scope: this.$el.children[0].classList,
                });
                // 移除元素
                await this.syncApply({
                    timeout: 500,
                    fn: this.destroy,
                });
            } catch (err) {
                throw err;
            }
        }
    },
};
</script>

<style lang="less" scoped>
.toast__container {
    
    .toastContent {
        position: fixed;
        z-index: 101;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -48%, 0);
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        overflow: hidden;
        color: @color-default;
        background-color: rgba(0, 0, 0, 0.6);
        @font-s();
        padding: 0.04rem 0.2rem;
        i {
            margin-right: 0.15rem;
        }
        span {
            @font-s();
            word-wrap: break-word;
        }
        .textBox{
            margin: 0;
        }
    }
    .success{
        color: rgba(44,180,50,1);
        background-color: rgba(168,255,172,1);
    }
    .error{
        color: rgba(180,44,44,1);
        background-color: rgba(255,168,168,1);
    }
    .warning{
        color: rgba(68,148,210,1);
        background-color: rgba(163,219,255,1);
    }
}
</style>