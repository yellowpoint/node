<!-- 公告 -->
<template>
    <div class="affichePage content">
        <div class="affichePageContent">
            <div class="title">
                <text-title>公告</text-title>
            </div>
            <div class="afficheListBox">
                <div class="listContent">
                    <ul class="afficheList">
                        <li class="afficheItem" 
                            v-for="(item, index) in afficheData.list" 
                            :key="index"
                            @click="showContent(item)"
                            :class="index%2 != 0 ? 'zebraBg' : ''"
                        >
                            <div class="main">{{item.messageName}}</div>
                            <div class="date">{{item.updateTime | moment('y-M-d')}}</div>
                        </li>
                    </ul>
                    <div class="defineNotData" v-if="!afficheData.list || !afficheData.list.length">
                        <svg class="icon svg-icon" aria-hidden="true">
                            <use xlink:href="#icon-weibiaoti-1"></use>
                        </svg>
                        <p>抱歉，暂时没有数据</p>
                    </div>
                </div>
                <div class="tablePagination">
                    <el-pagination
                        layout="prev, pager, next"
                        :total="afficheData.pages*10"
                        @current-change="afficheCurrentChange"
                        @prev-click="affichePrevPage"
                        @next-click="afficheNextPage"
                    >
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //import templateName from 'path';
    export default {
        name: "",
        components: {},
        data() {
            return {
                afficheData: {},
                noticePage: 1,
            };
        },
        computed: {},	// 组件计算属性
        watch: {},	// 组件监听事件
        methods: { 	// 组件方法
            getNoticeList(){
                let data = {
                    language: 'zh',
                    page: this.noticePage,
                    pageSize: 10,
                }
                this.$api.noticeList(data).then( res => {
                    this.afficheData = res;
                    console.log('公告列表', res);
                }).catch( err => {
                    console.log('公告列表错误', err);
                })
            },
            afficheCurrentChange(val) { //点击页码
                this.noticePage = val;
                this.getNoticeList();
            },
            affichePrevPage() { // 上一页
                this.noticePage -= 1;
                this.getNoticeList();
            },
            afficheNextPage() { // 下一页
                this.noticePage += 1;
                this.getNoticeList();
            },
            showContent(item) {
                this.$MsgPopup({
                    msgData: item,
                });
            },
        },
        created() { 	//生命周期 - 创建完成
            this.getNoticeList();
        },
        mounted() {	//生命周期 - 挂载完成

        },
        beforeCreate() {
			document.querySelector('#app').setAttribute('style', 'background: rgba(246,249,252,0.5);')
		},
        beforeMount() {}, //生命周期 - 挂载之前
        beforeUpdate() {}, //生命周期 - 更新之前
        updated() {}, //生命周期 - 更新之后
        beforeDestroy() { //生命周期 - 销毁之前
            document.querySelector('#app').setAttribute('style', '')
        },
        destroyed() {}, //生命周期 - 销毁完成
        activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>

<style lang="less" scoped>
    //@import url(); 引入公共css类
    .affichePage{
        position: relative;
        z-index: 2;
        @content();
        
        @media (max-width: 768px) {
            margin-top: 0.2rem;
            padding: 0.2rem;
        }
        .affichePageContent{
            background: @color-default;
            box-shadow:  0 0 0.13rem 0 rgba(219,223,255,1);
            border-radius: 0.1rem;
            padding-bottom: 0.2rem;
            .title{
                color: #333;
                @font-xl();
                padding-left: 0.3rem;
                padding: 0.2rem 0 0.2rem 0.4rem;
                font-weight: bold;
            }
            .afficheListBox{
                width: 100%;
                .tablePagination{
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                }
                .listContent{
                    min-height: 4.4rem;
                }
                .defineNotData{
                    text-align: center;
                }
                .zebraBg{
                    background: #FAFAFA;
                }
                .afficheList{
                    .afficheItem{
                        @hover();
                        width: 100%;
                        height: 0.48rem;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border-bottom: 1px solid #ebeef5;
                        padding-right: 0.15rem;
                        .main{
                            position: relative;
                            padding-left: 0.3rem;
                            font-size: 0.16rem;
                            font-weight: 400;
                            // color: @color-main;
                            cursor: pointer;
                            // &::before{
                            //     content: "";
                            //     position: absolute;
                            //     width: 0.08rem;
                            //     height: 0.08rem;
                            //     border-radius: 50%;
                            //     top: 35%;
                            //     left: 0;
                            //     background: @color-main;
                            // }
                        }
                        .date{
                            font-size: 0.14rem;
                            font-weight: 400;
                            color:#999999;
                        }
                    }
                }
                .footerPagination{
                    display: flex;
                    justify-content: flex-end;
                    padding-top: 0.2rem;
                }
            }
        }
    }
</style>