<!-- 满额列表模块 -->
<template>
    <div class="fullModule">
        <div class="headerTitleBox">
			<text-title>满额列表</text-title>
        </div>
        <div class="tableBox">
            <el-table
                ref="table"
                :data="fullListData.list"
                style="width: 100%;"
                :row-class-name="tableRowClassName"
                :row-style="rowStyle"
                :cell-style="cellStyle"
                @sort-change="changeSortEvent($event)"
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
                    prop="userId"
                    label="矿工ID"
                >
                </el-table-column>
                <el-table-column
                    prop="calculateTheForce"
                    label="矿工算力"
                    sortable='custom'
                >
                    <template slot-scope="scope">
                        {{scope.row.calculateTheForce}}&nbsp;<span class="units">&nbsp;PB</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="totalAmount"
                    label="需要总额度"
                >
                    <template slot-scope="scope">
                        {{Math.floor(scope.row.totalAmount)}}&nbsp;<span class="units">&nbsp;BHD</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="balance"
                    label="剩余额度"
                    sortable='custom'
                >
                    <template slot-scope="scope">
                        0&nbsp;<span class="units">&nbsp;BHD</span>
                        <!-- {{scope.row.balance}}&nbsp;<span class="units">&nbsp;BHD</span> -->
                    </template>
                </el-table-column>
                <el-table-column
                    prop="statusVal"
                    label="当前状态"
                >
                    <template slot-scope="scope">
                        <div class="currentStatus">{{scope.row.statusVal}}</div>
                    </template>
                </el-table-column>
            </el-table>
            <div v-if="fullListData.total>10" class="footerPagination">
                <el-pagination
                    v-if="paginationShow"
                    layout="prev, pager, next"
                    :total="fullListData.pages*10"
                    @current-change="fullCurrentChange"
                    @prev-click="fullPrevPage"
                    @next-click="fullNextPage"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    //import templateName from 'path';
    export default {
        name: "fullModule",
        components: {},
        data() {
            return {
                fullPage: 1, // 页码
                fullListData: {}, // 满额列表数据
                fullSortType: 1, //默认1降序
                fullSortClass: -1, // 排序字段 默认-1 1=总额、2=剩余额度、3=矿工ID、4=矿工算力 5=即将释放额度
                paginationShow: true, // 显示分页
            };
        },
        computed: { 	// 组件计算属性
            mineType() { // 币种
				return this.$store.getters.mineType
			},
        },
        watch: { 	// 组件监听事件

        },
        methods: { 	// 组件方法
            tableRowClassName({row, rowIndex}) { // 动画类
                if(row.news) {
                    return 'animated flipInX';
                }else{
                    return 'animated flipInX';
                }
            },
            rowStyle({row, rowIndex}){ // 动画延时
                return `animation-delay: ${rowIndex * 0.1}s;}`
            },
            cellStyle({row, column, rowIndex, columnIndex}) {
                if(this.fullListData.total < 10 && rowIndex == this.fullListData.total-1) {
                    return 
                }else{
                    return `border-bottom: 1px solid #EDEDED;`
                }
            },
            changeSortEvent(obj) { // 满额列表排序
                this.paginationShow = false;
                // this.fullListData = {};
                console.log(obj);
                if(obj.prop) {
                    this.fullSortClass =  -1;
                    switch(obj.prop){ // 满额列表排序字段
                        case 'calculateTheForce':
                            this.fullSortClass = 4;
                            break;
                        case 'balance':
                            this.fullSortClass = 2;
                            break;
                        default: break;
                    }
                }else{
                    this.fullSortClass = -1;
                }
                if(obj.order) { // 映射租用市场列表升序降序
                    this.fullSortType = 1;
                    switch(obj.order){
                        case 'ascending':
                            this.fullSortType = 0;
                            break;
                        case 'descending':
                            this.fullSortType = 1;
                            break;
                        default: break;
                    }
                }else{
                    this.fullSortType = 1;
                }
                this.fullPage = 1;
                this.$nextTick(function () { // 解决修改分页后视图不更新的问题  强制刷新分页组件
                    this.paginationShow = true;
                })
                this.getNewfullData();
            },
            getNewfullData() {
                let data = {
					page: this.fullPage,
					pageSize: 10,
					sortField: this.fullSortClass,
                    sortType: this.fullSortType,
				}
				this.$api.newMeetTheQuotaList(data).then( res => {
					this.fullListData = res;
				}).catch( err => {
					console.log('满额列表', err);
				})
            },
            fullCurrentChange(val) {
				if(this.fullPage == val) { // 解决点击上一页和下一页发送两次请求的问题
                    return
                }
				this.fullPage = val;
				this.getNewfullData();
			},
			fullPrevPage() { // 上一页
				this.fullPage -= 1;
				this.getNewfullData();
			},
			fullNextPage() { // 下一页
				this.fullPage += 1;
				this.getNewfullData();
			},
        },
        created() { 	//生命周期 - 创建完成
            this.getNewfullData();
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

<style lang="less">
    .fullModule{
		.el-table .cell{
            @allCenter();
			@font-s();
			color: #5E5E5E;
            text-align: center;
            font-weight: 400;
            .currentStatus{
                color: #999;
            }
        }
        .el-table td, .el-table th.is-leaf{
            border: 0;
        }
        .el-table::before{
            height: 0;
        }
        .el-table__row{
            position: relative;
            height: 0.5rem;
        }
        .el-table td, .el-table th{
            padding: 0;
        }
        .el-table__footer-wrapper, .el-table__header-wrapper{
            padding-bottom: 0.08rem;
        }
        .el-table th.is-leaf .cell{
            color: @color-main;
        }
	}
</style>


<style lang="less" scoped>
    //@import url(); 引入公共css类
    .fullModule{
        box-shadow: 0 0 0.13rem 0 rgba(93,113,255,0.22);
        border-radius: 0.10rem;
        padding-bottom: 0.28rem;
        background: @color-default;
        overflow: hidden;
        .headerTitleBox{
            padding: 0.4rem 0.4rem 0.2rem;
            background: @color-default;
        }
        .tableBox{
            .userHandleBtn{
                width: 0.44rem;
                height: 0.22rem;
                color: @color-default;
                @font-xs();
                background: @color-main;
                border-radius: 0.11rem;
                cursor: pointer;
            }
            .footerPagination{
                display: flex;
                justify-content: center;
                align-items: center;
                padding-top: 0.3rem;
            }
            .units{
                font-weight: bold;
            }
        }
    }
</style>