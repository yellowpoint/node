<!-- 可投放列表模块 -->
<template>
    <div class="rentOutListModule">
        <div class="headerTitleBox">
			<text-title>可投放列表</text-title>
        </div>
        <div class="tableBox">
            <div class="table el-table">
                <div class="tableHader">
                   <div class="tableItem">矿工ID</div>
                   <div class="tableItem sortableItem" @click.stop="handleHeaderClick({rentOutListSortClass: 4, prop: 'calculateTheForce'})">
                       矿工算力
                        <span class="caret-wrapper">
                            <i 
                                class="sort-caret ascending" 
                                :style="rentOutListSortClass == 4 && rentOutListSortType == 0 ? 'border-bottom-color: #409EFF' : ''"
                                @click.stop="changeSortEvent({prop: 'calculateTheForce', order: 'ascending'})"
                            ></i>
                            <i 
                                class="sort-caret descending" 
                                :style="rentOutListSortClass == 4 && rentOutListSortType == 1 ? 'border-top-color: #409EFF' : ''"
                                @click.stop="changeSortEvent({prop: 'calculateTheForce', order: 'descending'})"
                            ></i>
                        </span>
                    </div>
                   <div class="tableItem">需要总额度</div>
                   <div class="tableItem sortableItem" @click.stop="handleHeaderClick({rentOutListSortClass: 2, prop: 'balance'})">
                        剩余额度
                        <span class="caret-wrapper">
                            <i 
                                class="sort-caret ascending" 
                                :style="rentOutListSortClass == 2 && rentOutListSortType == 0 ? 'border-bottom-color: #409EFF' : ''"
                                @click.stop="changeSortEvent({prop: 'balance', order: 'ascending'})"
                            ></i>
                            <i 
                                class="sort-caret descending" 
                                :style="rentOutListSortClass == 2 && rentOutListSortType == 1 ? 'border-top-color: #409EFF' : ''"
                                @click.stop="changeSortEvent({prop: 'balance', order: 'descending'})"
                            ></i>
                        </span>
                    </div>
                   <div class="tableItem">操作</div>
                </div>
                <div 
                    class="tableTr animated flipInX"
                    v-for="(item, index) in rentOutListData.list"
                    :key="index"
                    :style="`animation-delay: ${index * 0.1}s;`"
                >
                    <div class="tableItem">{{item.userId}}</div>
                    <div class="tableItem">{{item.calculateTheForce}}<span class="units">&nbsp;PB</span></div>
                    <div class="tableItem">{{Math.floor(item.totalAmount)}}<span class="units">&nbsp;BHD</span></div>
                    <div class="tableItem">{{Math.floor(item.balance)}}<span class="units">&nbsp;BHD</span></div>
                    <div class="tableItem"><div class="userHandleBtn" @click="userHandleEvent(item)">投放</div></div>
                    <div class="progressLine" :style="`width: ${item.fullScaleRateOfProgress*100}%`"></div>
                </div>
                <!-- 自定义暂无数据提示 -->
                <div class="defineNotData" v-show="!rentOutListData.total">
                    <svg class="icon svg-icon" aria-hidden="true">
                        <use xlink:href="#icon-weibiaoti-1"></use>
                    </svg>
                    <p>抱歉，暂时没有数据</p>
                </div>
            </div>
            <div v-if="rentOutListData.total>20" class="footerPagination">
                <el-pagination
                    v-if="paginationShow"
                    layout="prev, pager, next"
                    :total="rentOutListData.pages*10"
                    @current-change="rentOutListCurrentChange"
                    @prev-click="rentOutListPrevPage"
                    @next-click="rentOutListNextPage"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    //import templateName from 'path';
    import ThrowIn from './popup/throwIn/index';
    export default {
        name: "rentOutListModule",
        components: {},
        data() {
            return {
                rentOutListPage: 1, // 页码
                rentOutListData: {}, // 投放列表数据
                rentOutListSortType: 1, //默认1降序
                rentOutListSortClass: -1, // 排序字段 1=总额、2=剩余额度、3=矿工ID、4=矿工算力 5=即将释放额度
                showNotDataImg: false, // 显示没有数据的图片
                paginationShow: true, // 显示分页
            };
        },
        computed: { 	// 组件计算属性
            mineType() { // 币种
				return this.$store.getters.mineType
            },
            userInfo() { // 用户信息
				return this.$store.getters.userInfo
            },
        },
        watch: { 	// 组件监听事件

        },
        methods: { 	// 组件方法
            userHandleEvent(row) { // 投放事件弹窗
                if(this.userInfo) {
                    ThrowIn({
                        popupInfo: row,
                        cb: this.refreshAllList,
                    });
                }else{
                    this.$RegPopup({
                        popupType: 'accountLogIn',
                    });
                }
            },
            handleHeaderClick(item) { // 点击列表头部排序
                if(item.rentOutListSortClass == this.rentOutListSortClass) {
                    if(this.rentOutListSortType == 0) { // this.rentOutListSortType == 0：原来为升序 改为降序
                        this.changeSortEvent({prop: item.prop, order: 'descending'});
                    }else if(this.rentOutListSortType == 1) { // this.rentOutListSortType == 1：原来为降序 改为默认排序
                        this.changeSortEvent({order: '',prop: ''});
                    }
                }else{
                    this.changeSortEvent({prop: item.prop, order: 'ascending'}); // this.rentOutListSortType == 1：原来为默认排序 改为升序
                }
            },
            changeSortEvent(obj) { // 投放列表排序
                this.paginationShow = false;
                // this.rentOutListData = {};   
                console.log(obj);
                if(obj.prop) {
                    this.rentOutListSortClass = -1;
                    switch(obj.prop){ // 投放列表排序字段
                        case 'calculateTheForce':
                            this.rentOutListSortClass = 4; // 根据算力排序
                            break;
                        case 'balance':
                            this.rentOutListSortClass = 2; // 根据剩余额度排序
                            break;
                        default: break;
                    }
                }else{
                    this.rentOutListSortClass = -1;
                }
                if(obj.order) { // 映射租用市场列表升序降序
                    this.rentOutListSortType = 1;
                    switch(obj.order){
                        case 'ascending':
                            this.rentOutListSortType = 0; // 升序
                            break;
                        case 'descending':
                            this.rentOutListSortType = 1; // 降序
                            break;
                        default: break;
                    }
                }else{
                    this.rentOutListSortType = 1;
                }
                this.rentOutListPage = 1;
                this.$nextTick(function () { // 解决修改分页后视图不更新的问题  强制刷新分页组件
                    this.paginationShow = true;
                })
                this.getNewRentOutListData();
            },
            getNewRentOutListData() {
                let data = {
					page: this.rentOutListPage,
					pageSize: 10,
					sortField: this.rentOutListSortClass,
                    sortType: this.rentOutListSortType,
				}
				this.$api.newRentOutList(data).then( res => {
                    this.rentOutListData = res;
                    console.log('投放列表', res);
                    this.showNotDataImg = true;
				}).catch( err => {
                    console.log('投放列表错误', err);
                    this.showNotDataImg = true;
				})
            },
            rentOutListCurrentChange(val) {
				if(this.rentOutListPage == val) { // 解决点击上一页和下一页发送两次请求的问题
                    return
                }
				this.rentOutListPage = val;
				this.getNewRentOutListData();
			},
			rentOutListPrevPage() { // 上一页
				this.rentOutListPage -= 1;
				this.getNewRentOutListData();
			},
			rentOutListNextPage() { // 下一页
				this.rentOutListPage += 1;
				this.getNewRentOutListData();
            },
            refreshAllList() { // 刷新所有列表
                this.getNewRentOutListData();
                this.$emit('refreshOtherList');
            },
        },
        created() { 	//生命周期 - 创建完成
            this.getNewRentOutListData();
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
.rentOutListModule{
    .el-table::before{
        height: 0;
    }
}
</style>

<style lang="less" scoped>
    //@import url(); 引入公共css类
    .rentOutListModule{
        position: relative;
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
            .tableHader{
                display: flex;
                align-items: center;
                justify-content: space-around;
                position: relative;
                width: 100%;
                height: 0.4rem;
                margin-bottom: 0.06rem;
                .tableItem{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex: 1;
                    position: relative;
                    z-index: 1;
                    font-size: 0.14rem;
                    color: @color-main;
                    &.sortableItem{
                        cursor: pointer;
                    }
                }
            }
            .tableTr{
                display: flex;
                align-items: center;
                justify-content: space-around;
                position: relative;
                width: 100%;
                height: 0.4rem;
                margin-bottom: 0.06rem;
                @media (max-width: 768px) {
                    height: 0.6rem;
                }
                .tableItem{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex: 1;
                    position: relative;
                    z-index: 1;
                    font-size: 0.14rem;
                    color: #333333;
                    .units{
                        font-weight: bold;
                    }
                }
                .progressLine{
                    position: absolute;
                    top: 0;
                    height: 100%;
                    left: 0;
                    border-radius: 0 0.2rem 0.2rem 0;
                    background-color: #E1EFFF;
                    @media (max-width: 768px) {
                        border-radius: 0 0.3rem 0.3rem 0;
                    }
                }
                &:hover{
                    background-color: #F6F9FB;
                    .progressLine{
                        background-color: @color-assistant;
                    }
                }
            }
            .userHandleBtn{
                @allCenter();
                width: 0.44rem;
                height: 0.22rem;
                color: @color-default;
                @font-xs();
                background: @color-main;
                border-radius: 0.11rem;
                cursor: pointer;
                @media (max-width: 768px) {
                    width: 0.54rem;
                    height: 0.34rem;
                    border-radius: 0.17rem;
                }
            }
            .footerPagination{
                display: flex;
                justify-content: center;
            }
            .defineNotData{
                text-align: center;
            }
        }
    }
</style>