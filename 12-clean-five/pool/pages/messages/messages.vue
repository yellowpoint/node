<!-- 模块名称 -->
<template>
    <div class="messagesPage content">
        <div class="messagesBox">
            <div class="titleBox">
                <text-title>消息管理</text-title>
                <div class="clearAllMsg" @click="clearAllMsg"><i class="iconfont icon-yidu biaoji"></i>全部已读</div>
            </div>
            <div class="listBox">
                <el-table
                    :data="msgData.list"
                    stripe
                    style="width: 100%"
                    @row-click="showContent($event)"
                    :row-class-name="tableRowClassName"
                    :row-style="rowStyle"
                >
                    <!-- 自定义暂无数据提示 -->
                    <template slot="empty">
                        <div class="defineNotData">
                            <svg class="icon svg-icon" aria-hidden="true">
                                <use xlink:href="#icon-weibiaoti-1"></use>
                            </svg>
                            <p>抱歉，暂时没有数据</p>
                        </div>
                    </template> 
                    <el-table-column
                        prop="date"
                        label="日期"
                        :width="isPC ? '280' : ''"
                    >
                        <template slot-scope="scope">
                            <span v-if="!scope.row.readRemark" class="createDate">{{ scope.row.createTime | moment('y-M-d') }}<i class="redPoint"></i></span>
                            <span v-else class="createDate">{{ scope.row.createTime | moment('y-M-d') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="messageName"
                        label="主题"
                        :width="isPC ? '400' : ''"
                    >
                    </el-table-column>
                    <el-table-column
                        v-if="isPC"
                        prop=""
                        label=""
                    >
                    </el-table-column>
                </el-table>
                <!-- <v-pagination></v-pagination> -->
                <div class="tablePagination">
                    <el-pagination
                        layout="prev, pager, next"
                        :total="msgData.pages*10"
                        @current-change="msgCurrentChange"
                        @prev-click="msgPrevPage"
                        @next-click="msgNextPage"
                    >
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "messages",
        components: {},
        data() {
            return {
                msgData: {},
                msgPage: 1,
            };
        },
        computed: { // 组件计算属性
            isPC() {
                if(document.body.clientWidth <= 768) {
                    return false
                }else{
                    return true
                }
            },
            msgCount() { // 用户信息
				return this.$store.getters.msgCount
            },
        },
        watch: {},	// 组件监听事件
        methods: { 	// 组件方法
            tableRowClassName({row, rowIndex}) {
                if(row.news) {
                    return 'animated flipInX newData';
                }else{
                    return 'animated flipInX';
                }
            },
            rowStyle({row, rowIndex}){
                return `animation-delay: ${rowIndex * 0.1}s`
            },
            clearAllMsg() {
                if(this.msgCount) {
                    this.$api.clearAllMsg().then( res => {
                        console.log('标记所有消息为已读', res);
                        this.getMsgCount();
                        this.getMsgList();
                    }).catch( err => {
                        console.log('标记所有消息为已读错误', err);
                    })
                }else{
                    this.$toast('暂无未读消息！');
                }
            },
            showContent(itemData) {
                console.log('弹窗数据', itemData);
                if(itemData.readRemark == 0) { // 修改新消息状态
                    let data = {
                        id: itemData.id
                    }
                    this.$api.changeMsgStatus(data).then( res => {
                        console.log('修改消息状态', res);
                        this.getMsgCount();
                        this.getMsgList();
                    }).catch( err => {
                        console.log('修改消息状态错误', err);
                    })
                }
                this.$MsgPopup({
                    msgData: itemData,
                });
            },
            getMsgCount() { // 获取未读消息数量
                this.$api.msgCount().then( res => {
                    console.log('更新未读消息数', res);
                    this.$store.dispatch('setMsgCount', res).then( () => {
                        
                    }).catch(err => {
                        console.log(err);
                    });
                }).catch( err => {
                    console.log('更新未读消息数错误', err);
                })
            },
            getMsgList() {
                let data = {
                    language: 'zh',
                    page: this.msgPage,
                    pageSize: 10,
                }
                this.$api.msgList(data).then( res => {
                    this.msgData = res;
                    console.log('消息列表', res);
                }).catch( err => {
                    console.log('消息列表错误', err);
                })
            },
            msgCurrentChange(val) { // 选择页码
                if(this.msgPage == val) { // 解决点击上一页和下一页发送两次请求的问题
                    return
                }
                this.msgPage = val;
                this.getMsgList();
            },
            msgPrevPage() { // 上一页
                this.msgPage -= 1;
                this.getMsgList();
            },
            msgNextPage() { // 下一页
                this.msgPage += 1;
                this.getMsgList();
            },
        },
        created() { 	//生命周期 - 创建完成
            this.getMsgList();
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

<style lang="less">
.messagesPage{
    .el-table__body-wrapper{
        min-height: 6.0rem;
    }
    .el-table .cell{
        @font-m();
        font-weight: 400;
        color: #666;
        line-height: 0.42rem;
        text-align: center;
    }
    .el-table .newData .cell{
        @font-m();
        font-weight: bold;
        color: #333;
        line-height: 0.42rem;
        text-align: center;
    }
    .el-table .el-table__row--striped{
        background: #EDEDED;
    }
    .el-table th>.cell{
        @font-m();
        font-weight: 400;
        color: @color-main;
        text-align: center;
    }
    .el-table td{
        height: 0.6rem;
        padding: 0;
    }
}
    
</style>


<style lang="less" scoped>
    //@import url(); 引入公共css类
    .messagesPage{
        @content();
        .messagesBox{
            background: @color-default;
            box-shadow:  0 0 0.13rem 0 rgba(219,223,255,1);
            border-radius: 0.1rem;
            padding-bottom: 0.2rem;
        }
        .titleBox{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.4rem;
            .clearAllMsg{
                @allCenter();
                width: 1.2rem;
                height: 0.4rem;
                padding: 0 0.1rem;
                @font-s();
                color: @color-default;
                background: #FB6565;
                border-radius: 0.04rem;
                cursor: pointer;
                .biaoji{
                    font-size: 0.22rem;
                    margin-right: 0.1rem;
                }
            }
        }
        .listBox{
            .createDate{
                margin-left: 10px;
                position: relative;
                .redPoint{
                    position: absolute; 
                    right: -0.12rem;
                    top: 0; 
                    width: 0.06rem; 
                    height: 0.06rem;
                    background: red;
                    border-radius: 50%;
                }
            }
            .tablePagination{
                display: flex;
                justify-content: center;
                margin-top: 0.25rem;
            }
        }
    }
</style>