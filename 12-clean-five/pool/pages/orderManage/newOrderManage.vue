<!-- 订单管理 -->
<template>
    <div class="newOrderManage content">
        <div class="orderTable">
            <div>
                <el-table
                    :data="rentOutListData.list"
                    style="width: 100%"
                    stripe
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
                        prop="orderNo"
                        label="订单编号"
                        align="center"
                        width="180"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="投放时间"
                        align="center"
                        width="140"
                    >
                        <template slot-scope="scope">
                            <div>{{scope.row.createTime | moment('y-M-d h:m')}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="allottedTime"
                        label="投放期限"
                        align="center"
                        width="90"
                    >
                        <template slot-scope="scope">
                            {{scope.row.allottedTime}}天
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="amount"
                        label="投放数量"
                        align="center"
                        width="140"
                    >  
                        <template slot-scope="scope">
                            {{scope.row.amount}}&nbsp;BHD
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="effectEndTime"
                        label="预计释放时间"
                        align="center"
                        width="140"
                    >
                        <template slot-scope="scope">
                            <div>{{scope.row.effectEndTime | moment('y-M-d h:m')}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="residualMaturity"
                        label="剩余天数"
                        align="center"
                        width="90"
                    >
                        <template slot-scope="scope">
                            {{scope.row.residualMaturity}}天
                        </template>
                    </el-table-column>
                    <!-- <el-table-column
                        prop="guaranteeAmount"
                        label="支付违约金"
                        align="center"
                        width="110"
                    >
                        <template slot-scope="scope">
                            {{scope.row.guaranteeAmount || 0}}&nbsp;BHD
                        </template>
                    </el-table-column> -->
                    <el-table-column
                        prop="incomeEarned"
                        label="当前已收益"
                        align="center"
                        width="160"
                    >
                        <template slot-scope="scope">
                            <div style="color: #25C03B">
                                {{scope.row.incomeEarned}}&nbsp;BHD
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="状态"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <div :style="{'color' : `${orderColorStatus(scope.row.status)}`}">
                                {{mapRentOutStatus(scope.row.status)}}
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="footerPagination">
                    <el-pagination
                        layout="prev, pager, next"
                        :total="rentOutListData.pages*10"
                        @current-change="rentOutCurrentChange"
                        @prev-click="rentOutPrevPage"
                        @next-click="rentOutNextPage"
                    >
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "newOrderManage",
        components: {
            
        },
        data() {
            return {
                rentOutListPage: 1, // 出租方列表页码
                rentOutListData: {}, // 出租方列表
            };
        },
        computed: { 	//

        },
        watch: { 	// 组件监听事件

        },
        methods: { 	// 组件方法
            init() {
                this.getRentOutListData();
            },
            orderColorStatus(status) {
                switch (status) {
                    case 1:
                        return '@color-main';
                        break;
                    case 2:
                        return '#999999';
                        break;
                    case 3:
                        return '#FF3535';
                        break;
                    default:
                        return '#999999';
                        break;
                }
            },
            getRentOutListData() { // 获取出租市场列表
                let data = {
                    page: this.rentOutListPage,
                    pageSize: 10,
                }
                this.$api.getLeaseOrderList(data).then( res => {
                    console.log('出租方列表', res);
                    this.rentOutListData = res;
                }).catch( err => {
                    console.log('出租方列表出错', err);
                })
            },
            rentOutCurrentChange(val) { // 出租市场选中页码
                if(this.rentOutListPage == val) { // 解决点击上一页和下一页发送两次请求的问题
                    return
                }
                this.rentOutListPage = val
                this.getRentOutListData();
            },
            rentOutPrevPage() { // 出租市场上一页
                this.rentOutListPage -= 1;
                this.getRentOutListData();
            },
            rentOutNextPage() { // 出租市场下一页
                this.rentOutListPage += 1;
                this.getRentOutListData();
            },
            mapRentOutStatus(val) { // 映射出租状态 1=进行中 2=已过期 3=流标中止
                switch(val){
                    case 1:
                        return '进行中';
                        break;
                    case 2:
                        return '到期终止';
                        break;
                    case 3:
                        return '流标终止';
                        break;
                    default:
                        return '未知';
                }
            },
        },
        created() { 	//生命周期 - 创建完成
            this.init();
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
    .newOrderManage{
        position: relative;
        z-index: 2;
        @content();
        background: transparent;
        .danger{
            color: #FF6464;
        }
        .orderTable{
            border-radius: 0.1rem;
            box-shadow: 0 0 0.13rem 0 rgba(219,223,255,1);
            background: @color-default;
            overflow: hidden;
            .footerPagination{
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0.3rem 0;
                background: @color-default;
            }
        }
    }
</style>

<style lang="less">
    .newOrderManage{
        .el-table th.is-leaf{
            height: 0.5rem;
            @font-m();
            color: #333;
            font-weight: 400;
            border-bottom: 0;
            background: #C9E6FF;
            padding: 0;
        }
        .orderTable{
            .el-table__body-wrapper{
                min-height: 4.12rem;
                padding-top: 0.12rem;
            }
        }
        .el-table td{
            padding: 0;
            height: 0.4rem;
        }
        .el-table::before{
            height: 0;
        }
        .el-table{
           @media (max-width: 768px) {
                font-size: 0.12rem;
            } 
        }
    }
</style>
