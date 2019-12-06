<!-- 模块名称 -->
<template>
    <div class="dataQuery content">
        <div class="queryContent">
            <ul class="nav">
                <li class="navItem"
                    v-for="(item, index) in navData"
                    :key="index"
                    :class="item.active ? 'active' : ''"
                    @click="navEvent(item, index)"
                >
                    {{item.name}}
                </li>
            </ul>
            <div class="dateTimePicker">
                <div class="block">
                    <el-date-picker
                    v-model="startTime"
                    type="datetime"
                    :editable="false"
                    :picker-options="startPickerOptions"
                    :default-value="startTimeDefaultShow"
                    placeholder="选择开始时间(北京时间)">
                    </el-date-picker>
                </div>
                <div class="line">——</div>
                <div class="block">
                    <el-date-picker
                    v-model="endTime"
                    type="datetime"
                    :editable="false"
                    :picker-options="endPickerOptions"
                    :default-value="endTimeDefaultShow"
                    placeholder="选择结束时间(北京时间)">
                    </el-date-picker>
                </div>
                <div class="searchBtn" @click="searchEvent">查询</div>
            </div>
            <div v-show="currentIndex == 0" class="tableContent eleTable">
                <!-- 每日总收益列表 -->
                <el-table
                    :data="totalIncome.list"
                    stripe
                    style="width: 100%"
                >
                    <!-- 自定义暂无数据提示 -->
                    <template slot="empty">
                        <div class="defineNotData" v-show="totalIncomeNotDataImg">
                            <svg class="icon svg-icon" aria-hidden="true">
                                <use xlink:href="#icon-weibiaoti-1"></use>
                            </svg>
                            <p>抱歉，暂时没有数据</p>
                        </div>
                    </template>
                    <el-table-column
                        prop="createTime"
                        label="时间"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.createTime | moment('y-M-d') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="miningProfit"
                        label="挖矿收益"
                        :width="isPC ? '' : '100'"
                    >
                        <template slot-scope="scope">
                            {{ scope.row.miningProfit || 0}}BHD
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="putProfit"
                        label="合作挖矿收益"
                    >
                        <template slot-scope="scope">
                            {{ scope.row.putProfit || 0}}BHD
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="fundPledgeProfit"
                        label="定投收益"
                    >
                        <template slot-scope="scope">
                             {{ scope.row.fundPledgeProfit || 0}}BHD
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="totalProfit"
                        label="总收益"
                        :width="isPC ? '' : '100'"
                    >
                        <template slot-scope="scope">
                            <span class="greenFont">+{{scope.row.totalProfit || 0}}BHD</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="footerPagination">
                    <el-pagination
                        v-if="paginationShow"
                        layout="prev, pager, next"
                        :total="totalIncome.pages*10"
                        :current-page="totalIncomePage"
                        @current-change="totalIncomeCurrentChange"
                        @prev-click="totalIncomePrevPage"
                        @next-click="totalIncomeNextPage"
                    >
                    </el-pagination>
                </div>
            </div>
            <div v-show="currentIndex == 1" class="tableContent eleTable">
                <!-- 挖矿收益明细 -->
                <el-table
                    :data="profit.list"
                    stripe
                    style="width: 100%"
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
                    <!-- <el-table-column
                        prop="orderNumber"
                        label="订单编号"
                        :width="isPC ? '' : '120'"
                    >
                    </el-table-column> -->
                    <el-table-column
                        prop="jobCode"
                        label="区块高度"
                        :width="isPC ? '' : '80'"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="orderStatus"
                        label="状态"
                        :width="isPC ? '' : '60'"
                    >
                        <template slot-scope="scope">
                            <span>{{ mapProfitStatus(scope.row.orderStatus) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="收益时间"
                        :width="isPC ? '' : '100'"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.createTime | moment('y-M-d h:m') }}</span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column
                        prop="share"
                        label="有效值个数"
                        v-if="!userInfo.vip"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.share}}</span>
                        </template>
                    </el-table-column> -->
                    <el-table-column
                        prop="conin"
                        label="总收益"
                        :width="isPC ? '370' : '220'"
                    >
                        <template slot-scope="scope">
                            <div class="miningEarnings">
                                <span class="greenFont">{{ scope.row.conin}}BHD</span>
                                <div v-if="scope.row.macroBlockProfit"  class="flagType">巨块收益</div>
                                <span v-if="scope.row.macroBlockProfit">{{scope.row.macroBlockProfit}}BHD</span>
                            </div>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column
                        prop="activityCoin"
                        label="活动收益"
                    >
                    </el-table-column> -->
                </el-table>
                <div class="footerPagination">
                    <el-pagination
                        v-if="paginationShow"
                        layout="prev, pager, next"
                        :total="profit.pages*10"
                        :current-page="profitPage"
                        @current-change="profitCurrentChange"
                        @prev-click="profitPrevPage"
                        @next-click="profitNextPage"
                    >
                    </el-pagination>
                </div>
            </div>
            <div v-show="currentIndex == 2" class="tableContent eleTable">
                <!-- 租借明细列表 -->
                <el-table
                    :data="lease.list"
                    stripe
                    style="width: 100%"
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
                        prop="createTime"
                        label="时间"
                    >
                        <template slot-scope="scope">
                            <span class="">{{ scope.row.createTime | moment('y-M-d h:m') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="类别"
                    >
                        <template slot-scope="scope">
                            <div>{{ mapIncomeExpensesType(scope.row.type) }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="coin"
                        label="明细"
                    >
                        <template slot-scope="scope">
                            <div :style="{'color' : `${mapColorStatus(scope.row.type)}`}">{{scope.row.coin}}BHD</div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="footerPagination">
                    <el-pagination
                        v-if="paginationShow"
                        layout="prev, pager, next"
                        :total="lease.pages*10"
                        :current-page="leasePage"
                        @current-change="leaseCurrentChange"
                        @prev-click="leasePrevPage"
                        @next-click="leaseNextPage"
                    >
                    </el-pagination>
                </div>
            </div>
            <div v-show="currentIndex == 3" class="tableContent eleTable">
                <!-- 充值列表 -->
                <el-table
                    :data="recharge.list"
                    stripe
                    style="width: 100%"
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
                        prop="orderNumber"
                        label="订单编号"
                        :width="isPC ? '' : '120'"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="时间"
                        :width="isPC ? '' : '100'"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.createTime | moment('y-M-d h:m')}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="conin"
                        label="充值数量"
                        :width="isPC ? '' : '80'"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.conin}}BHD</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="coinAddress"
                        label="地址"
                        :width="isPC ? '360' : '200'"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="orderStatus"
                        label="状态"
                    >
                        <template slot-scope="scope">
                            <span>{{ mapRechargeStatus(scope.row.orderStatus)}}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="footerPagination">
                    <el-pagination
                        v-if="paginationShow"
                        layout="prev, pager, next"
                        :total="recharge.pages*10"
                        :currnet-page="rechargePage"
                        @current-change="rechargeCurrentChange"
                        @prev-click="rechargePrevPage"
                        @next-click="rechargeNextPage"
                    >
                    </el-pagination>
                </div>
            </div>   
            <div v-show="currentIndex == 4" class="tableContent eleTable">
                <!-- 提现列表 -->
                <el-table
                    :data="cash.list"
                    stripe
                    style="width: 100%"
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
                        prop="orderNumber"
                        label="订单编号"
                        :width="isPC ? '200' : '120'"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="conin"
                        label="申请数量"
                    >
                        <template slot-scope="scope">
                            <span class="">{{ scope.row.conin}}BHD</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="arrivalConin"
                        label="实际到账数量"
                    >
                        <template slot-scope="scope">
                            <span class="">{{ scope.row.arrivalConin}}BHD</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="coinAddress"
                        label="地址"
                        :width="isPC ? '360' : '200'"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="orderStatus"
                        label="状态"
                    >
                        <template slot-scope="scope">
                            <span class="">{{ mapCashStatus(scope.row.orderStatus) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="时间"
                        :width="isPC ? '136' : '100'"
                    >
                        <template slot-scope="scope">
                            <span class="">{{ scope.row.createTime | moment('y-M-d h:m') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop=""
                        label="操作"
                        :width="isPC ? '100' : '80'"
                    >
                        <template slot-scope="scope">
                            <span class="cancelWithdraw" v-if="scope.row.orderStatus == 1" @click="showCancelPopupEvent(scope.row.id)">取消提现</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="footerPagination">
                    <el-pagination
                        v-if="paginationShow"
                        layout="prev, pager, next"
                        :total="cash.pages*10"
                        :currnet-page="cashPage"
                        @current-change="cashCurrentChange"
                        @prev-click="cashPrevPage"
                        @next-click="cashNextPage"
                    >
                    </el-pagination>
                </div>
            </div>
            <div v-show="currentIndex == 5" class="tableContent eleTable">
                <!-- 爆块记录 -->
                <el-table
                    :data="blockInfo.list"
                    @sort-change="changeBlockEvent($event)"
                    stripe
                    style="width: 100%"
                    v-loading="loading"
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
                        prop="height"
                        label="区块高度"
                        :width="isPC ? '200' : '70'"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="plotterId"
                        label="plotterId"
                        sortable='custom'
                        align="center"
                        :width="isPC ? '200' : '120'"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="millName"
                        label="爆块机器"
                        align="center"
                        :width="isPC ? '' : '170'"
                    >
                        <template slot-scope="scope">
                            {{scope.row.millName ? scope.row.millName : ''}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="时间"
                        :width="isPC ? '200' : '120'"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.date | moment('y-M-d h:m') }}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="footerPagination">
                    <el-pagination
                        v-if="paginationShow"
                        layout="prev, pager, next"
                        :total="blockInfo.pages*10"
                        :currnet-page="blockPage"
                        @current-change="blockCurrentChange"
                        @prev-click="blockPrevPage"
                        @next-click="blockNextPage"
                    >
                    </el-pagination>
                </div>
            </div>
            <div v-show="currentIndex == 6" class="tableContent eleTable">
                <!-- DL贡献点 -->
                <el-table
                    :data="DLcontributeInfo.list"
                    @sort-change="changeDLcontributeEvent($event)"
                    stripe
                    style="width: 100%"
                    v-loading="loading"
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
                        prop="height"
                        label="区块高度"
                        :width="isPC ? '120' : '70'"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="contribute"
                        label="DL贡献点"
                        :width="isPC ? '120' : '70'"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="deadline"
                        label="Deadline"
                        :width="isPC ? '120' : '70'"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="targetDeadline"
                        label="目标"
                        :width="isPC ? '120' : '60'"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="repetitionSubmit"
                        label="重复提交"
                        :width="isPC ? '100' : '60'"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <div :class="scope.row.repetitionSubmit ? 'repetition' : 'notRepetition' ">
                                {{scope.row.repetitionSubmit ? '是' : '否'}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="plotterId"
                        label="plotterId"
                        sortable='custom'
                        align="center"
                        :width="isPC ? '200' : '120'"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="millName"
                        label="上报机器"
                        align="center"
                        :width="isPC ? '' : '170'"
                    >
                        <template slot-scope="scope">
                            {{scope.row.millName ? scope.row.millName : ''}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="时间"
                        align="center"
                        :width="isPC ? '200' : '120'"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.date | moment('y-M-d h:m') }}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="footerPagination">
                    <el-pagination
                        v-if="paginationShow"
                        layout="prev, pager, next"
                        :total="DLcontributeInfo.pages*10"
                        :currnet-page="DLcontributePage"
                        @current-change="DLcontributeCurrentChange"
                        @prev-click="DLcontributePrevPage"
                        @next-click="DLcontributeNextPage"
                    >
                    </el-pagination>
                </div>
            </div>
            <div v-show="currentIndex == 7" class="tableContent eleTable">
                <!-- 借入记录 -->
                <el-table
                    :data="borrowRecord.list"
                    stripe
                    style="width: 100%"
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
                        prop="createTime"
                        label="创建时间"
                        :width="isPC ? '170' : '100'"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.createTime | moment('y-M-d h:m') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="txid"
                        label="交易号"
                        :width="isPC ? '' : '340'"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="coinSize"
                        label="数量"
                        :width="isPC ? '100' : '60'"
                        align="center"
                    >
                        <template slot-scope="scope">
                            {{scope.row.coinSize}}BHD
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="fromAddr"
                        label="用户地址"
                        :width="isPC ? '320' : '200'"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="orderNumber"
                        label="订单号"
                        :width="isPC ? '180' : '100'"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="bizType"
                        label="业务类型"
                        width="100"
                        align="center"
                    >   
                        <template slot-scope="scope">
                            {{mapBusinessType(scope.row.bizType)}}
                        </template>
                    </el-table-column>
                </el-table>
                <div class="footerPagination">
                    <el-pagination
                        v-if="paginationShow"
                        layout="prev, pager, next"
                        :total="borrowRecord.pages*10"
                        :currnet-page="borrowRecordPage"
                        @current-change="borrowRecordCurrentChange"
                        @prev-click="borrowRecordPrevPage"
                        @next-click="borrowRecordNextPage"
                    >
                    </el-pagination>
                </div>
            </div>
            <div v-show="currentIndex == 8" class="tableContent eleTable">
                <!-- 定投明细 -->
                <el-table
                    :data="timeDepositInfo.list"
                    stripe
                    style="width: 100%"
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
                        label="单号"
                        align="center"
                        :width="isPC ? '' : '120'"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="时间"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.createTime | moment('y-M-d h:m') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="amount"
                        label="金额"
                        align="center"
                    >
                        <template slot-scope="scope">
                            {{scope.row.amount}}BHD
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="收益"
                        align="center"
                        :width="isPC ? '' : '50'"
                    >
                    </el-table-column>
                </el-table>
                <div class="footerPagination">
                    <el-pagination
                        v-if="paginationShow"
                        layout="prev, pager, next"
                        :total="timeDepositInfo.pages*10"
                        :currnet-page="timeDepositPage"
                        @current-change="getTimeDepositDetailCurrentChange"
                        @prev-click="getTimeDepositDetailPrevPage"
                        @next-click="getTimeDepositDetailNextPage"
                    >
                    </el-pagination>
                </div>
            </div>
        </div>
        <transition name="fade">
            <div v-show="showCancelPopup" class="cancelPopupWrap" @click.stop= "hideCancelPopupEvent" style="animation-duration: 0.3s;">
                <div class="cancelPopup" @click.stop>
                    <div class="cancelPopupContent">
                        <div class="popupTitle">
                            <text-title>提醒</text-title>
                        </div>
                        <div class="popupContent">
                            您确定要取消本次提现申请吗？
                        </div>
                        <div class="popupFooter">
                            <div class="confirmCancel" @click="cancelWithdrawalEvent">确定取消</div>
                            <div class="anewConsider" @click="hideCancelPopupEvent">我再考虑下</div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    //import templateName from 'path';
    export default {
        name: "",
        components: {},
        data() {
            return {
                showCancelPopup: false, // 取消提现
                cancalOrderId: '',
                loading: false,
                paginationShow: true,
                currentIndex: 0,
                startTime: '',
                endTime: '',
                endTimeDefaultShow: new Date(this.$common.getTruthTime()),
                startTimeDefaultShow: new Date(this.$common.getTruthTime()),
                navData: [
                    {
                        name: '每日总收益',
                        active: true,
                    },
                    {
                        name: '挖矿收益明细',
                        active: false,
                    },
                    {
                        name: '合作挖矿明细',
                        active: false,
                    },
                    {
                        name: '充值记录',
                        active: false,
                    },
                    {
                        name: '提现记录',
                        active: false,
                    },
                    {
                        name: '爆块记录',
                        active: false,
                    },
                    {
                        name: 'DL贡献点',
                        active: false,
                    },
                    {
                        name: '借入记录',
                        active: false,
                    },
                    {
                        name: '定投明细',
                        active: false,
                    },
                ],
                startPickerOptions: {
                    disabledDate: (time) => {
                        if(this.endTime) { // 如果已选择结束时间则   起始时间必须属于结束时间往前半年时间内   必须小于当前时间   必须小于结束时间
                            return this.$common.getTruthTime(this.endTime) -  this.$common.getTruthTime(time) > 3600 * 1000 * 24 * 180 || this.$common.getTruthTime(time) > this.$common.getTruthTime() || this.$common.getTruthTime(time) > this.$common.getTruthTime(this.endTime);
                        }
                        return this.$common.getTruthTime(time) > this.$common.getTruthTime();
                    }
                },
                endPickerOptions: {
                    disabledDate: (time) => {
                        if(this.startTime) { // 如果已选择开始时间则   结束时间必须属于开始时间往前半年时间内   必须小于当前时间   必须大于开始时间
                            return this.$common.getTruthTime(time) - this.$common.getTruthTime(this.startTime) > 3600 * 1000 * 24 * 180 || this.$common.getTruthTime(time) > this.$common.getTruthTime() || this.$common.getTruthTime(time) < this.$common.getTruthTime(this.startTime);
                        }
                        return this.$common.getTruthTime(time) > this.$common.getTruthTime();
                    }
                },
                profitPage: 1,
                profit: {},   // 收益列表
                leasePage: 1,
                lease: {},    // 租借明细
                rechargePage: 1,
                recharge: {}, // 充值记录
                cashPage: 1,
                cash: {}, // 提现记录
                blockPage: 1,
                blockInfo: {}, // 爆块记录
                sortField: 2, // 排序字段
                sortType: 1, // 排序类型 升序降序
                DLcontributePage: 1, // 
                DLcontributeInfo: {}, // DL贡献点
                sortDLField: 2, // 排序字段
                sortDLType: 1, // 排序类型 升序降序
                borrowRecord: {},// 借入记录
                borrowRecordPage: 1,
                totalIncomeNotDataImg: false,
                totalIncome: {}, // 每日总收益
                totalIncomePage: 1, // 
                timeDepositPage: 1, // 定投明细分页
                timeDepositInfo: {}, // 定投明细信息
            };
        },
        computed: { 	// 组件计算属性
            mineType() { // 币种
                return this.$store.getters.mineType;
            },
            userInfo() { // 用户信息
				return this.$store.getters.userInfo
            },
            isPC() {
                if(document.body.clientWidth <= 768) {
                    return false;
                }else{
                    return true;
                }
            },
        },
        watch: { 	// 组件监听事件
            startTime(newVal) {
                if(newVal){
                    if(this.$common.getTruthTime() - this.$common.getTruthTime(newVal) > 3600 * 1000 * 24 * 180) {
                        this.endTimeDefaultShow = this.$common.getTruthTime(newVal);
                    }else{
                        if(this.endTime) {
                            this.startTimeDefaultShow = this.$common.getTruthTime(this.endTime);
                        }else{
                            this.endTimeDefaultShow = new Date(this.$common.getTruthTime());
                            this.startTimeDefaultShow = new Date(this.$common.getTruthTime());
                        }
                    }
                }
            },
            endTime(newVal) {
                if(!newVal && !this.startTime) { // 起始和结束都空，设置成当前时间
                    this.endTimeDefaultShow = new Date(this.$common.getTruthTime());
                    this.startTimeDefaultShow = new Date(this.$common.getTruthTime());
                }
                if(newVal && !this.startTime) { // 结束时间不为空，起始时间设置为跟结束时间一样
                    this.startTimeDefaultShow = this.$common.getTruthTime(this.endTime);
                }
            },
        },
        methods: { 	// 组件方法
            navEvent(val, index) { // 查询菜单切换
                for (const item of this.navData) {
                    item.active = false;
                }
                val.active = true;
                this.currentIndex = index;
                this.startTime = '';
                this.endTime = '';
                
                switch(index){ // 当用户按时间查找是页码重置为1 时间控件清空
                    case 0:
                        this.totalIncomePage = 1;
                        this.getTotalIncome(); // 每日总收益
                        break;
                    case 1:
                        this.profitPage = 1;
                        this.getProfitData(); // 收益历史
                        break;
                    case 2:
                        this.leasePage = 1;
                        this.getLeaseData(); // 租借明细
                        break;
                    case 3:
                        this.rechargePage = 1;
                        this.getRechargeData(); // 充值记录
                        break;
                    case 4:
                        this.cashPage = 1;
                        this.getCashData(); // 提现记录
                        break;
                    case 5:
                        this.blockPage = 1;
                        this.getBlockInfo(); // 爆块记录
                        break;
                    case 6:
                        this.DLcontributePage = 1;
                        this.getDLcontributeInfo(); // DL贡献点记录
                        break;
                    case 7:
                        this.borrowRecordPage = 1;
                        this.getBorrowRecord(); // 借入记录
                        break;
                    case 8:
                        this.timeDepositPage = 1;
                        this.getTimeDepositDetail(); // 定投明细
                        break;
                    default: break;
                }
            },
            mapProfitStatus(val) { // 映射收益状态
                switch(val){
                    case 1:
                        return '未处理';
                        break;
                    case 2:
                        return '已入账';
                        break;
                    case 3:
                        return '处理失败';
                        break;
                    case 4:
                        return '已封存';
                        break;
                    case 5:
                        return '已完成';
                        break;
                    case 6:
                        return '转账失败';
                        break;
                    default:
                        return '未知';
                        break;
                }
            },
            mapRechargeStatus(val) { // 映射充值状态
                switch(val){
                    case 1:
                        return '未处理';
                        break;
                    case 2:
                        return '已入账';
                        break;
                    case 3:
                        return '处理失败';
                        break;
                    case 4:
                        return '已封存';
                        break;
                    case 5:
                        return '已完成';
                        break;
                    case 6:
                        return '转账失败';
                        break;
                    case 7:
                        return '提现成功';
                        break;
                    default:
                        return '未知';
                        break;
                }
            },
            mapIncomeExpensesType(val) { // 映射租借收支类型
                switch(val){
                    case 1:
                        return '收益分成';
                        break;
                    case 2:
                        return '投放支出';
                        break;
                    case 3:
                        return '投放返还';
                        break;
                    case 4:
                        return '违约补偿';
                        break;
                    case 5:
                        return '租用保证额';
                        break;
                    case 6:
                        return '退还保证额';
                        break;
                    case 7:
                        return '违约金';
                        break;
                    default:
                        return '未知';
                        break;
                }
            },
            mapCashStatus(val) { // 映射提现状态
                switch(val){
                    case 1:
                        return '未处理';
                        break;
                    case 2:
                        return '处理成功';
                        break;
                    case 3:
                        return '处理失败';
                        break;
                    case 4:
                        return '已封存';
                        break;
                    case 5:
                        return '已完成';
                        break;
                    case 6:
                        return '转账失败';
                        break;
                    case 7:
                        return '转账成功';
                        break;
                    case 9:
                        return '已取消提现';
                        break;
                    default:
                        return '未知';
                        break;
                }
            },
            mapColorStatus(type) {
                switch(type){
                    case 1: case 3: case 4: case 6:
                        return '#35A826';
                        break;
                    case 2: case 5: case 7:
                        return '#FF3E3E';
                        break;
                    default:
                        return '#606266';
                        break;
                }
            },
            searchEvent() { // 点击 发起查询
                this.paginationShow = false;
                // if(this.startTime && this.endTime) {
                    switch(this.currentIndex){
                        case 0:
                            this.totalIncomePage = 1;
                            this.$nextTick(function () { // 解决修改分页后视图不更新的问题  强制刷新分页组件
                                this.paginationShow = true;
                            })
                            this.getTotalIncome(); // 每日总收益
                            break;
                        case 1:
                            this.profitPage = 1;
                            this.$nextTick(function () { // 解决修改分页后视图不更新的问题  强制刷新分页组件
                                this.paginationShow = true;
                            })
                            this.getProfitData(); // 收益历史
                            break;
                        case 2:
                            this.leasePage = 1;
                            this.$nextTick(function () {
                                this.paginationShow = true;
                            })
                            this.getLeaseData(); // 租借明细
                            break;
                        case 3:
                            this.rechargePage = 1;
                            this.$nextTick(function () {
                                this.paginationShow = true;
                            })
                            this.getRechargeData(); // 充值记录
                            break;
                        case 4:
                            this.cashPage = 1;
                            this.$nextTick(function () {
                                this.paginationShow = true;
                            })
                            this.getCashData(); // 提现记录
                            break;
                        case 5:
                            this.blockPage = 1;
                            this.$nextTick(function () {
                                this.paginationShow = true;
                            })
                            this.getBlockInfo(); // 爆块记录
                            break;
                        case 6:
                            this.DLcontributePage = 1;
                            this.$nextTick(function () {
                                this.paginationShow = true;
                            })
                            this.getDLcontributeInfo(); //  DL贡献点记录
                            break;
                        case 7:
                            this.borrowRecordPage = 1;
                            this.$nextTick(function () {
                                this.paginationShow = true;
                            })
                            this.getBorrowRecord(); // 借入记录
                            break;
                        case 8:
                            this.timeDepositPage = 1;
                            this.$nextTick(function () {
                                this.paginationShow = true;
                            })
                            this.getTimeDepositDetail(); // 定投明细
                            break;
                        default: break;
                    }
                // }
            },
            getProfitData() { // 获取用户收益数据
                let data = {
                    mineType: this.mineType,
                    page: this.profitPage,
                    pageSize: 10,
                    startTime: this.startTime ? this.$common.resetTruthTime(this.startTime) : 0,
                    endTime: this.endTime ? this.$common.resetTruthTime(this.endTime) : 0,
                }
                this.$api.getProfitList(data).then( res => {
                    this.profit = res;
                    console.log('获取用户收益列表', res);
                }).catch( err => {
                    console.log('获取用户收益列表出错', err);
                })
            },
            profitCurrentChange(val) { // 点击页码
                if(this.profitPage == val) { // 解决点击上一页和下一页发送两次请求的问题
                    return
                }
                this.profitPage = val;
                this.getProfitData();
            },
            profitPrevPage() { // 点击上一页
                this.profitPage -= 1;
                this.getProfitData();
            },
            profitNextPage() { // 点击下一页
                this.profitPage += 1;
                this.getProfitData();
            },
            getRechargeData() { // 获取用户充值数据
                let data = {
                    mineType: this.mineType,
                    page: this.rechargePage,
                    pageSize: 10,
                    startTime: this.startTime ? this.$common.resetTruthTime(this.startTime) : 0,
                    endTime: this.endTime ? this.$common.resetTruthTime(this.endTime) : 0,
                }
                this.$api.getRechargeList(data).then( res => {
                    this.recharge = res;
                    console.log('获取用户充值列表', res);
                }).catch( err => {
                    console.log('获取用户充值出错', err);
                })
            },
            rechargeCurrentChange(val) { // 点击页码
                if(this.rechargePage == val) { // 解决点击上一页和下一页发送两次请求的问题
                    return
                }
                this.rechargePage = val;
                this.getRechargeData();
            },
            rechargePrevPage() { // 点击上一页
                this.rechargePage -= 1;
                this.getRechargeData();
            },
            rechargeNextPage() { // 点击下一页
                this.rechargePage += 1;
                this.getRechargeData();
            },
            getLeaseData() { // 获取租借数据
                let data = {
                    mineType: this.mineType,
                    page: this.leasePage,
                    pageSize: 10,
                    startTime: this.startTime ? this.$common.resetTruthTime(this.startTime) : 0,
                    endTime: this.endTime ? this.$common.resetTruthTime(this.endTime) : 0,
                }
                this.$api.getLeaseList(data).then( res => {
                    this.lease = res;
                    console.log('获取用户租借列表', res);
                }).catch( err => {
                    console.log('获取用户租借出错', err);
                })
            },
            leaseCurrentChange(val) { // 点击页码
                if(this.leasePage == val) { // 解决点击上一页和下一页发送两次请求的问题
                    return
                }
                this.leasePage = val;
                this.getLeaseData();
            },
            leasePrevPage() { // 点击上一页
                this.leasePage -= 1;
                this.getLeaseData();
            },
            leaseNextPage() { // 点击下一页
                this.leasePage += 1;
                this.getLeaseData();
            },
            getCashData() { // 获取提现记录
                let data = {
                    mineType: this.mineType,
                    page: this.cashPage,
                    pageSize: 10,
                    startTime: this.startTime ? this.$common.resetTruthTime(this.startTime) : 0,
                    endTime: this.endTime ? this.$common.resetTruthTime(this.endTime) : 0,
                }
                this.$api.getCashList(data).then( res => {
                    this.cash = res;
                    console.log('获取用户提现列表', res);
                }).catch( err => {
                    console.log('获取用户提现出错', err);
                })
            },
            cashCurrentChange(val) {
                if(this.cashPage == val) { // 解决点击上一页和下一页发送两次请求的问题
                    return
                }
                this.cashPage = val;
                this.getCashData();
            },
            cashPrevPage() {
                this.cashPage -= 1;
                this.getCashData();
            },
            cashNextPage() {
                this.cashPage += 1;
                this.getCashData();
            },
            getBlockInfo() {  // 获取爆块记录
                this.loading = true;
                let data = {
                    mineType: this.mineType,
                    page: this.blockPage,
                    pageSize: 10,
                    startTime: this.startTime ? this.$common.resetTruthTime(this.startTime) : 0,
                    endTime: this.endTime ? this.$common.resetTruthTime(this.endTime) : 0,
                    sortField: this.sortField,
                    sortType: this.sortType,
                }
                this.$api.getVipBlockInfo(data).then( res => {
                    this.blockInfo = res;
                    console.log('爆块列表', res);
                    this.loading = false;
                }).catch( err => {
                    this.loading = false;
                    console.log('爆块列表出错', err);
                })
                
            },
            blockCurrentChange(val) {
                if(this.blockPage == val) { // 解决点击上一页和下一页发送两次请求的问题
                    return
                }
                this.blockPage = val;
                this.getBlockInfo();
            },
            blockPrevPage() {
                this.blockPage -= 1;
                this.getBlockInfo();
            },
            blockNextPage() {
                this.blockPage += 1;
                this.getBlockInfo();
            },
            changeBlockEvent(obj) { // 爆块列表排序
                this.paginationShow = false;
                this.blockInfo = {};
                console.log(obj);
                if(obj.prop) {
                    this.sortField = 2;
                    switch(obj.prop){ // 映射列表排序字段
                        case 'height':
                            this.sortField = 1;
                            break;
                        case 'date':
                            this.sortField = 2;
                            break;
                        case 'plotterId':
                            this.sortField = 3;
                            break;
                        default: break;
                    }
                }else{
                    this.sortField = 2;
                }
                if(obj.order) { // 映射列表升序降序
                    this.sortType = 1;
                    switch(obj.order){
                        case 'ascending':
                            this.sortType = 0;
                            break;
                        case 'descending':
                            this.sortType = 1;
                            break;
                        default: break;
                    }
                }else{
                    this.sortType = 1;
                }
                this.blockPage = 1;
                this.$nextTick(function () { // 解决修改分页后视图不更新的问题  强制刷新分页组件
                    this.paginationShow = true;
                })
                this.getBlockInfo();
            },
            getDLcontributeInfo() {  // 获取爆块记录
                this.loading = true;
                let data = {
                    mineType: this.mineType,
                    page: this.DLcontributePage,
                    pageSize: 10,
                    startTime: this.startTime ? this.$common.resetTruthTime(this.startTime) : 0,
                    endTime: this.endTime ? this.$common.resetTruthTime(this.endTime) : 0,
                    sortField: this.sortDLField,
                    sortType: this.sortDLType,
                }
                if(this.userInfo.vip == 2){
                    this.$api.getEcoDlDontributionPoints(data).then( res => {
                        this.DLcontributeInfo = res;
                        console.log('生态池DL贡献列表', res);
                        this.loading = false;
                    }).catch( err => {
                        this.loading = false;
                        console.log('生态池DL贡献列表出错', err);
                    })
                }else{
                    this.$api.getMainDlDontributionPoints(data).then( res => {
                        this.DLcontributeInfo = res;
                        console.log('主矿池DL贡献列表', res);
                        this.loading = false;
                    }).catch( err => {
                        this.loading = false;
                        console.log('主矿池DL贡献列表出错', err);
                    })
                }
            },
            DLcontributeCurrentChange(val) {
                if(this.DLcontributePage == val) { // 解决点击上一页和下一页发送两次请求的问题
                    return
                }
                this.DLcontributePage = val;
                this.getDLcontributeInfo();
            },
            DLcontributePrevPage() {
                this.DLcontributePage -= 1;
                this.getDLcontributeInfo();
            },
            DLcontributeNextPage() {
                this.DLcontributePage += 1;
                this.getDLcontributeInfo();
            },
            changeDLcontributeEvent(obj) { // DL列表排序
                this.paginationShow = false;
                this.DLcontributeInfo = {};
                console.log(obj);
                this.sortDLField = 2;
                if(obj.prop) {
                    switch(obj.prop){ // 映射列表排序字段
                        case 'height':
                            this.sortDLField = 1;
                            break;
                        case 'date':
                            this.sortDLField = 2;
                            break;
                        case 'plotterId':
                            this.sortDLField = 3;
                            break;
                        default: break;
                    }
                }else{
                    this.sortDLField = 2;
                }
                if(obj.order) { // 映射列表升序降序
                    this.sortDLType = 1;
                    switch(obj.order){
                        case 'ascending':
                            this.sortDLType = 0;
                            break;
                        case 'descending':
                            this.sortDLType = 1;
                            break;
                        default: break;
                    }
                }else{
                    this.sortDLType = 1;
                }
                this.DLcontributePage = 1;
                this.$nextTick(function () { // 解决修改分页后视图不更新的问题  强制刷新分页组件
                    this.paginationShow = true;
                })
                this.getDLcontributeInfo();
            },
            getBorrowRecord() {  // 获取借入记录
                let data = {
                    mineType: this.mineType,
                    page: this.borrowRecordPage,
                    pageSize: 10,
                    startTime: this.startTime ? this.$common.resetTruthTime(this.startTime) : 0,
                    endTime: this.endTime ? this.$common.resetTruthTime(this.endTime) : 0,
                }
                this.$api.borrowRecord(data).then( res => {
                    this.borrowRecord = res;
                    console.log('借入记录', res);
                }).catch( err => {
                    console.log('借入记录出错', err);
                })
                
            },
            borrowRecordCurrentChange(val) {
                if(this.borrowRecordPage == val) { // 解决点击上一页和下一页发送两次请求的问题
                    return
                }
                this.borrowRecordPage = val;
                this.getBorrowRecord();
            },
            borrowRecordPrevPage() {
                this.borrowRecordPage -= 1;
                this.getBorrowRecord();
            },
            borrowRecordNextPage() {
                this.borrowRecordPage += 1;
                this.getBorrowRecord();
            },
            mapBusinessType(statusCode) { // 映射业务类型
                switch(statusCode){ 
                    case 1:
                        return '借入 ';
                        break;
                    case 2:
                        return '赎回 ';
                        break;
                    case 3:
                        return '异常赎回 ';
                        break;
                    default:
                        return '未知 ';
                        break;
                }
            },
            getTotalIncome() { // 获取每日总收益
                let data = {
                    mineType: this.mineType,
                    page: this.totalIncomePage,
                    pageSize: 10,
                    startTime: this.startTime ? this.$common.resetTruthTime(this.startTime) : 0,
                    endTime: this.endTime ? this.$common.resetTruthTime(this.endTime) : 0,
                }
                this.$api.totalIncome(data).then( res => {
                    this.totalIncomeNotDataImg =  true;
                    this.totalIncome = res;
                    console.log('每日总收益', res);
                }).catch( err => {
                    this.totalIncomeNotDataImg =  true;
                    console.log('每日总收益出错', err);
                })
            },
            totalIncomeCurrentChange(val) {
                if(this.totalIncomePage == val) { // 解决点击上一页和下一页发送两次请求的问题
                    return
                }
                this.totalIncomePage = val;
                this.getTotalIncome();
            },
            totalIncomePrevPage() {
                this.totalIncomePage -= 1;
                this.getTotalIncome();
            },
            totalIncomeNextPage() {
                this.totalIncomePage += 1;
                this.getTotalIncome();
            },
            getTimeDepositDetail() { // 获取定投收益明细
                let data = {
                    mineType: this.mineType,
                    page: this.timeDepositPage,
                    pageSize: 10,
                    startTime: this.startTime ? this.$common.resetTruthTime(this.startTime) : 0,
                    endTime: this.endTime ? this.$common.resetTruthTime(this.endTime) : 0,
                }
                this.$api.timeDepositDetail(data).then( res => {
                    this.timeDepositInfo = res;
                    console.log('获取定投收益明细',res);
                }).catch( err => {
                    console.log('获取定投收益明细出错',err);
                })
            },
            getTimeDepositDetailCurrentChange(val) {
                if(this.timeDepositPage == val) { // 解决点击上一页和下一页发送两次请求的问题
                    return
                }
                this.timeDepositPage = val;
                this.getTimeDepositDetail();
            },
            getTimeDepositDetailPrevPage() {
                this.timeDepositPage -= 1;
                this.getTimeDepositDetail();
            },
            getTimeDepositDetailNextPage() {
                this.timeDepositPage += 1;
                this.getTimeDepositDetail();
            },
            showCancelPopupEvent(id) { // 显示取消提现弹窗
                this.cancalOrderId = id;
                this.showCancelPopup = true;
            },
            hideCancelPopupEvent() { // 隐藏取消提现弹窗
                this.showCancelPopup = false;
                this.cancalOrderId = '';
            },
            cancelWithdrawalEvent() {
                let data = {
                    id: this.cancalOrderId,
                }
                this.$api.cancelWithdrawal(data).then( res => {
                    this.hideCancelPopupEvent();
                    this.$toast('取消提现成功！')
                    this.cashPage = 1;
                    this.getCashData(); // 提现记录
                    console.log('取消提现', res);
                }).catch( err => {
                    console.log('取消提现出错', err);
                })
            },
        },
        created() { 	//生命周期 - 创建完成
            this.getTotalIncome();
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
    //@import url(); 引入公共css类
    .dataQuery{
        .el-table__body-wrapper{
            min-height: 4.0rem;
        }
        .el-table th.is-leaf{
            height: 0.5rem;
            @font-m();
            color: @color-main;
            font-weight: 400;
            // border-bottom: 0;
        }
        .el-table td{
            height: 0.4rem;
            padding: 0;
        }
        .el-date-editor.el-input, .el-date-editor.el-input__inner{
            @media (max-width: 768px) {
                width: 3.0rem;
            }
        }
        .el-input--suffix .el-input__inner{
            padding-right: 0;
        }
        .greenFont{
            color: #35A826;
        }
        .el-table tr td:first-child,
        .el-table tr th:first-child{
            padding-left: 0.3rem;
        }
        .el-table{
            @media (max-width: 768px) {
                font-size: 0.12rem;
            }
        }
        .el-table .cell{
            @media (max-width: 768px) {
                padding: 0 0.04rem;
            }
        }
        .eleTable{
            .miningEarnings{
                display: flex;
                align-items: center;
                .flagType{
                    color: @color-default;
                    @font-xs();
                    line-height: 0.18rem;
                    padding: 0rem 0.04rem;
                    border-radius: 0.04rem;
                    background: @color-danger;
                    margin-left: 0.34rem;
                    margin-right: 0.1rem;
                    @media (max-width: 768px) {
                        line-height: 0.24rem;
                    }
                }
            }
        }
    }
</style>

<style lang="less" scoped>
    //@import url(); 引入公共css类
    @import url("./dataQuery.less");
</style>