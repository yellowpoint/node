<!-- 列表加表格模块 -->
<template>
  <div class="listTable">
    <div class="listTableContent">
      <ul class="nav">
        <li
          class="navItem"
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
            placeholder="选择开始时间(北京时间)"
          >
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
            placeholder="选择结束时间(北京时间)"
          >
          </el-date-picker>
        </div>
        <div
          class="searchBtn"
          @click="searchEvent"
        >
          <i class="icon iconfont iconziyuan searchIcon"></i>
        </div>
      </div>
      <div class="tableBox">
        <user-defined-table
          v-loading="loading"
          :loading="loading"
          :columnData="tableColumnData[currentIndex]"
          :listData="tableData"
          :tableItem="tableItem"
          :paginationShow="paginationShow"
          :stripe="false"
          @childCurrentChange="tableCurrentChange"
          @childPrevPage="tablePrevPage"
          @childNextPage="tableNextPage"
          @changeSortEvent="changeSortEvent"
          @showCancelPopupEvent="showCancelPopupEvent"
          @redeemEvent="redeemEvent"
          @remindEvent="remindEvent"
        >
        </user-defined-table>
      </div>
    </div>
    <!-- 取消提现弹窗 -->
    <transition name="fade">
      <div
        v-show="showCancelPopup"
        class="cancelPopupWrap"
        @click.stop="hideCancelPopupEvent"
        style="animation-duration: 0.3s;"
      >
        <div
          class="cancelPopup"
          @click.stop
        >
          <div class="cancelPopupContent">
            <div class="popupTitle">
              <text-title>提醒</text-title>
            </div>
            <div class="popupContent">
              您确定要取消本次提现申请吗？
            </div>
            <div class="popupFooter">
              <div
                class="confirmCancel"
                @click="cancelWithdrawalEvent"
              >确定取消</div>
              <div
                class="anewConsider"
                @click="hideCancelPopupEvent"
              >我再考虑下</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 赎回弹窗 -->
    <transition name="fade">
      <div
        v-show="showRedeemPopup"
        class="redeemPopupWrap"
        style="animation-duration: 0.3s;"
        @click="closeRedeemPopup"
      >
        <div
          class="redeemPopup"
          @click.stop
        >
          <div class="popupTitle">
            赎回
            <div class="close" @click="closeRedeemPopup">&times;</div>
          </div>
          <div class="popupContent">
            <div class="labelItem">可赎回额度：{{redeemObject.coinSize}} {{tableItem.name}}</div>
            <div class="labelItem">安全密码</div>
            <div class="inputBox">
              <input
                v-if="userInfo.isPwd"
                type="password"
                v-model.trim="toApplyPayPassword"
                maxlength="8"
                autocomplete="new-password"
                placeholder="请输入安全密码"
                @input="onPayPassword($event)"
              >
              <div
                v-if="!userInfo.isPwd"
                class="toSetPwd"
                @click="toSetPwd"
              >设置</div>
            </div>
            <div class="tipsBox">
              提示：您将要赎回{{redeemObject.coinSize}} {{tableItem.name}}
            </div>
            <div ref="confirmRedeem" class="confirm" @click="toRedeemEvent">确定</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

import { getNavConfig, getTableConfig } from './configData';
import commonMixins from '@/mixins/common';

export default {
  name: 'listTable',
  mixins: [commonMixins],
  components: {},
  props: {
    tableItem: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      loading: false,
      paginationShow: true,
      currentIndex: 0,
      startTime: '',
      endTime: '',
      cacheData: {}, // 暂存数据
      endTimeDefaultShow: new Date(this.$common.getTruthTime()),
      startTimeDefaultShow: new Date(this.$common.getTruthTime()),
      tableColumnData: getTableConfig(this.tableItem),
      navData: getNavConfig(this.tableItem),
      page: 1, // 页码
      tableData: {}, // 表格数据
      sortField: 2, // 排序字段
      sortType: 1, // 排序类型 升序降序
      cancalOrderId: '',
      showCancelPopup: false,
      showRedeemPopup: false,
      redeemObject: {}, // 赎回对象
      toApplyPayPassword: '', // 支付密码
      startPickerOptions: {
        disabledDate: (time) => {
          if (this.endTime) { // 如果已选择结束时间则   起始时间必须属于结束时间往前半年时间内   必须小于当前时间   必须小于结束时间
            return this.$common.getTruthTime(this.endTime) - this.$common.getTruthTime(time) > 3600 * 1000 * 24 * 180 || this.$common.getTruthTime(time) > this.$common.getTruthTime() || this.$common.getTruthTime(time) > this.$common.getTruthTime(this.endTime);
          }
          return this.$common.getTruthTime(time) > this.$common.getTruthTime();
        },
      },
      endPickerOptions: {
        disabledDate: (time) => {
          if (this.startTime) { // 如果已选择开始时间则   结束时间必须属于开始时间往前半年时间内   必须小于当前时间   必须大于开始时间
            return this.$common.getTruthTime(time) - this.$common.getTruthTime(this.startTime) > 3600 * 1000 * 24 * 180 || this.$common.getTruthTime(time) > this.$common.getTruthTime() || this.$common.getTruthTime(time) < this.$common.getTruthTime(this.startTime);
          }
          return this.$common.getTruthTime(time) > this.$common.getTruthTime();
        },
      },
    };
  },
  computed: { // 组件计算属性
    userInfo() { // 用户信息
      return this.$store.getters.userInfo;
    },
    isPC() {
      if (document.body.clientWidth <= 768) {
        return false;
      }
      return true;
    },
  },
  watch: { // 组件监听事件
    startTime(newVal) {
      if (newVal) {
        if (this.$common.getTruthTime() - this.$common.getTruthTime(newVal) > 3600 * 1000 * 24 * 180) {
          this.endTimeDefaultShow = this.$common.getTruthTime(newVal);
        } else {
          if (this.endTime) {
            this.startTimeDefaultShow = this.$common.getTruthTime(this.endTime);
          } else {
            this.endTimeDefaultShow = new Date(this.$common.getTruthTime());
            this.startTimeDefaultShow = new Date(this.$common.getTruthTime());
          }
        }
      }
    },
    endTime(newVal) {
      if (!newVal && !this.startTime) { // 起始和结束都空，设置成当前时间
        this.endTimeDefaultShow = new Date(this.$common.getTruthTime());
        this.startTimeDefaultShow = new Date(this.$common.getTruthTime());
      }
      if (newVal && !this.startTime) { // 结束时间不为空，起始时间设置为跟结束时间一样
        this.startTimeDefaultShow = this.$common.getTruthTime(this.endTime);
      }
    },
  },
  methods: { // 组件方法
    tableCurrentChange(val) {
      if (this.page == val) { // 解决点击上一页和下一页发送两次请求的问题
        return;
      }
      this.page = val;
      this.getListData();
    },
    tablePrevPage() {
      this.page -= 1;
      this.getListData();
    },
    tableNextPage() {
      this.page += 1;
      this.getListData();
    },
    resetSort() {
      this.sortField = 2; // 排序字段
      this.sortType = 1; // 排序类型 升序降序
    },
    changeSortEvent(obj) {
      console.log('修改排序', obj);
      this.paginationShow = false;
      this.tableData = {};
      if (obj.prop) {
        switch (obj.prop) { // 映射列表排序字段
          case 'height':
            this.sortField = 1;
            break;
          case 'date':
            this.sortField = 2;
            break;
          case 'plotterId':
            this.sortField = 3;
            break;
          default:
            this.sortField = 2;
            break;
        }
      } else {
        this.sortField = 2;
      }
      if (obj.order) { // 映射列表升序降序
        switch (obj.order) {
          case 'ascending':
            this.sortType = 0;
            break;
          case 'descending':
          default:
            this.sortType = 1;
            break;
        }
      } else {
        this.resetSort();
      }
      this.page = 1;
      this.$nextTick(function () { // 解决修改分页后视图不更新的问题  强制刷新分页组件
        this.paginationShow = true;
      });
      this.getListData();
    },
    getListData() {
      switch (this.currentIndex) { // 当用户按时间查找是页码重置为1 时间控件清空
        case 0:
          this.getTotalIncome(this.currentIndex); // 每日总收益
          break;
        case 1:
          this.getProfitData(this.currentIndex); // 收益明细
          break;
        case 2:
          this.getLeaseData(this.currentIndex); // 合作投放明细
          break;
        case 3:
          this.getTimeDepositDetail(this.currentIndex); // 定投明细
          break;
        case 4:
          this.getWorkOrders(this.currentIndex); // 合作订单
          break;
        case 5:
          this.getTimeDepositOrders(this.currentIndex); // 定投订单
          break;
        case 6:
          this.getDLcontributeInfo(this.currentIndex); // DL贡献点记录
          break;
        case 7:
          this.getBlockInfo(this.currentIndex); // 爆块记录
          break;
        case 8:
          this.getRechargeData(this.currentIndex); // 充值记录
          break;
        case 9:
          this.getCashData(this.currentIndex); // 提现记录
          break;
        case 10:
          if (this.tableItem.key == 'xhd' || this.tableItem.key == 'XHD') {
            this.getMortgageRecord(this.currentIndex); // 划转记录
          } else {
            this.getBorrowRecord(this.currentIndex); // 借入记录
          }
          break;
        default:
          break;
      }
    },
    savaCacheData(queryIndex, res) { // 暂存数据
      // console.log('queryIndex', queryIndex, 'this.currentIndex', this.currentIndex);
      if (queryIndex == this.currentIndex) { // 解决接口数据缓慢 慢的接口数据覆盖快的接口数据
        if (!this.cacheData[queryIndex]) {
          this.cacheData[queryIndex] = res;
          this.tableData = res;
        } else {
          this.tableData = res;
        }
      } else {
        if (!this.cacheData[queryIndex]) {
          this.cacheData[queryIndex] = res;
        }
      }
    },
    navEvent(val, index) { // 查询菜单切换
      // eslint-disable-next-line no-restricted-syntax
      for (const item of this.navData) {
        item.active = false;
      }
      val.active = true;
      // this.savaCacheData();
      this.currentIndex = index;
      this.startTime = '';
      this.endTime = '';
      this.paginationShow = false;
      this.page = 1;
      this.$nextTick(function () { // 解决修改分页后视图不更新的问题  强制刷新分页组件
        this.paginationShow = true;
      });
      this.resetSort(); // 重置排序
      this.tableData = {};
      // this.getListData();
      if (this.cacheData[index]) { // 有缓存使用缓存
        this.loading = true;
        setTimeout(() => { // 延时一下 再赋值不然页面会莫名其妙抖动
          this.tableData = this.cacheData[index];
          this.loading = false;
        }, 100);
      } else {
        this.tableData = {};
        this.getListData();
      }
    },
    searchEvent() { // 点击 发起查询
      this.paginationShow = false;
      this.page = 1;
      this.$nextTick(function () { // 解决修改分页后视图不更新的问题  强制刷新分页组件
        this.paginationShow = true;
      });
      this.getListData();
    },
    getProfitData(queryIndex) { // 获取用户收益数据
      this.loading = true;
      const data = {
        mineType: this.tableItem.key,
        page: this.page,
        pageSize: 10,
        startTime: this.startTime ? this.$common.resetTruthTime(this.startTime) : 0,
        endTime: this.endTime ? this.$common.resetTruthTime(this.endTime) : 0,
      };
      this.$api.getProfitList(data).then(res => {
        this.savaCacheData(queryIndex, res);
        this.loading = false;
        console.log('获取用户收益列表', res);
      }).catch(err => {
        this.loading = false;
        console.log('获取用户收益列表出错', err);
      });
    },
    getRechargeData(queryIndex) { // 获取用户充值记录
      this.loading = true;
      const data = {
        mineType: this.tableItem.key,
        page: this.page,
        pageSize: 10,
        startTime: this.startTime ? this.$common.resetTruthTime(this.startTime) : 0,
        endTime: this.endTime ? this.$common.resetTruthTime(this.endTime) : 0,
      };
      this.$api.getRechargeList(data).then(res => {
        this.savaCacheData(queryIndex, res);
        this.loading = false;
        console.log('获取用户充值列表', res);
      }).catch(err => {
        this.loading = false;
        console.log('获取用户充值出错', err);
      });
    },
    getLeaseData(queryIndex) { // 获取用户合作挖矿明细
      this.loading = true;
      const data = {
        mineType: this.tableItem.key,
        page: this.page,
        pageSize: 10,
        startTime: this.startTime ? this.$common.resetTruthTime(this.startTime) : 0,
        endTime: this.endTime ? this.$common.resetTruthTime(this.endTime) : 0,
      };
      this.$api.getLeaseList(data).then(res => {
        this.savaCacheData(queryIndex, res);
        this.loading = false;
        console.log('获取用户租借列表', res);
      }).catch(err => {
        this.loading = false;
        console.log('获取用户租借出错', err);
      });
    },
    getCashData(queryIndex) { // 获取提现记录
      this.loading = true;
      const data = {
        mineType: this.tableItem.key,
        page: this.page,
        pageSize: 10,
        startTime: this.startTime ? this.$common.resetTruthTime(this.startTime) : 0,
        endTime: this.endTime ? this.$common.resetTruthTime(this.endTime) : 0,
      };
      this.$api.getCashList(data).then(res => {
        this.savaCacheData(queryIndex, res);
        this.loading = false;
        console.log('获取用户提现列表', res);
      }).catch(err => {
        this.loading = false;
        console.log('获取用户提现出错', err);
      });
    },
    getBlockInfo(queryIndex) { // 获取爆块记录
      this.loading = true;
      const data = {
        mineType: this.tableItem.key,
        page: this.page,
        pageSize: 10,
        startTime: this.startTime ? this.$common.resetTruthTime(this.startTime) : 0,
        endTime: this.endTime ? this.$common.resetTruthTime(this.endTime) : 0,
        sortField: this.sortField,
        sortType: this.sortType,
      };
      this.$api.getVipBlockInfo(data).then(res => {
        this.savaCacheData(queryIndex, res);
        this.loading = false;
        console.log('爆块列表', res);
      }).catch(err => {
        this.loading = false;
        console.log('爆块列表出错', err);
      });
    },
    getDLcontributeInfo(queryIndex) { // 获取DL贡献点
      this.loading = true;
      const data = {
        mineType: this.tableItem.key,
        page: this.page,
        pageSize: 10,
        startTime: this.startTime ? this.$common.resetTruthTime(this.startTime) : 0,
        endTime: this.endTime ? this.$common.resetTruthTime(this.endTime) : 0,
        sortField: this.sortField,
        sortType: this.sortType,
      };
      if (this.userInfo.vip == 2) {
        this.$api.getEcoDlDontributionPoints(data).then(res => {
          this.savaCacheData(queryIndex, res);
          console.log('生态池DL贡献列表', res);
          this.loading = false;
        }).catch(err => {
          this.loading = false;
          console.log('生态池DL贡献列表出错', err);
        });
      } else {
        this.$api.getMainDlDontributionPoints(data).then(res => {
          this.savaCacheData(queryIndex, res);
          console.log('主矿池DL贡献列表', res);
          this.loading = false;
        }).catch(err => {
          this.loading = false;
          console.log('主矿池DL贡献列表出错', err);
        });
      }
    },
    getBorrowRecord(queryIndex) { // 获取借入记录
      this.loading = true;
      const data = {
        mineType: this.tableItem.key,
        page: this.page,
        pageSize: 10,
        startTime: this.startTime ? this.$common.resetTruthTime(this.startTime) : 0,
        endTime: this.endTime ? this.$common.resetTruthTime(this.endTime) : 0,
      };
      this.$api.borrowRecord(data).then(res => {
        this.savaCacheData(queryIndex, res);
        this.loading = false;
        console.log('借入记录', res);
      }).catch(err => {
        this.loading = false;
        console.log('借入记录出错', err);
      });
    },
    getTotalIncome(queryIndex) { // 获取每日总收益
      this.loading = true;
      const data = {
        mineType: this.tableItem.key,
        page: this.page,
        pageSize: 10,
        startTime: this.startTime ? this.$common.resetTruthTime(this.startTime) : 0,
        endTime: this.endTime ? this.$common.resetTruthTime(this.endTime) : 0,
      };
      this.$api.totalIncome(data).then(res => {
        this.savaCacheData(queryIndex, res);
        this.loading = false;
        console.log('每日总收益', res);
      }).catch(err => {
        this.loading = false;
        console.log('每日总收益出错', err);
      });
    },
    getTimeDepositDetail(queryIndex) { // 获取定投收益明细
      this.loading = true;
      const data = {
        mineType: this.tableItem.key,
        page: this.page,
        pageSize: 10,
        startTime: this.startTime ? this.$common.resetTruthTime(this.startTime) : 0,
        endTime: this.endTime ? this.$common.resetTruthTime(this.endTime) : 0,
      };
      this.$api.timeDepositDetail(data).then(res => {
        this.savaCacheData(queryIndex, res);
        this.loading = false;
        console.log('获取定投收益明细', res);
      }).catch(err => {
        this.loading = false;
        console.log('获取定投收益明细出错', err);
      });
    },
    getWorkOrders(queryIndex) { // 获取合作订单
      this.loading = true;
      const data = {
        mineType: this.tableItem.key,
        page: this.page,
        pageSize: 10,
        startTime: this.startTime ? this.$common.resetTruthTime(this.startTime) : 0,
        endTime: this.endTime ? this.$common.resetTruthTime(this.endTime) : 0,
      };
      this.$api.getWorkOrders(data).then(res => {
        this.savaCacheData(queryIndex, res);
        this.loading = false;
        console.log('获取合作订单', res);
      }).catch(err => {
        this.loading = false;
        console.log('获取合作订单出错', err);
      });
    },
    getTimeDepositOrders(queryIndex) { // 获取定投订单
      this.loading = true;
      const data = {
        mineType: this.tableItem.key,
        page: this.page,
        pageSize: 10,
        startTime: this.startTime ? this.$common.resetTruthTime(this.startTime) : 0,
        endTime: this.endTime ? this.$common.resetTruthTime(this.endTime) : 0,
      };
      this.$api.getTimeDepositOrders(data).then(res => {
        this.savaCacheData(queryIndex, res);
        this.loading = false;
        console.log('获取定投订单', res);
      }).catch(err => {
        this.loading = false;
        console.log('获取定投订单出错', err);
      });
    },
    getMortgageRecord(queryIndex) { // 获取用户划转记录
      this.loading = true;
      const data = {
        mineType: this.tableItem.key,
        page: this.page,
        pageSize: 10,
        startTime: this.startTime ? this.$common.resetTruthTime(this.startTime) : 0,
        endTime: this.endTime ? this.$common.resetTruthTime(this.endTime) : 0,
      };
      this.$api.getMortgageRecord(data).then(res => {
        console.log('queryIndex', queryIndex, res);
        this.savaCacheData(queryIndex, res);
        this.loading = false;
        console.log('获取划转记录', res);
      }).catch(err => {
        this.loading = false;
        console.log('获取划转记录出错', err);
      });
    },
    showCancelPopupEvent(id) { // 显示取消提现弹窗
      this.cancalOrderId = id;
      this.showCancelPopup = true;
      console.log('显示取消提现弹窗id', id);
    },
    hideCancelPopupEvent() { // 隐藏取消提现弹窗
      this.showCancelPopup = false;
      this.cancalOrderId = '';
    },
    cancelWithdrawalEvent() { // 取消提现
      const data = {
        id: this.cancalOrderId,
        mineType: this.tableItem.key,
      };
      this.$api.cancelWithdrawal(data).then(res => {
        this.hideCancelPopupEvent();
        this.$toast('取消提现成功！');
        this.page = 1;
        this.getCashData(); // 提现记录
        console.log('取消提现', res);
      }).catch(err => {
        console.log('取消提现出错', err);
      });
    },
    redeemEvent(obj) { // 显示赎回弹框
      this.redeemObject = obj;
      this.showRedeemPopup = true;
    },
    remindEvent(obj) { // 提醒审核
      console.log('提醒审核', obj);
      const data = {
        id: obj.id,
        mineType: this.tableItem.key,
      };
      this.$api.doReviewed(data).then(res => {
        this.$toast('已发送！');
        console.log('划转到余额', res);
      }).catch(err => {
        console.log('划转到余额出错', err);
      });
    },
    toSetPwd() {
      this.$SetPopup({
        popupType: 'payPassword',
        mineType: this.tableItem.key,
      });
    },
    onPayPassword(e) { // 修改按钮状态
      if (e.target.value) {
        this.$refs.confirmRedeem.classList.add('allow');
      } else {
        this.$refs.confirmRedeem.classList.remove('allow');
      }
    },
    closeRedeemPopup() { // 关闭赎回弹窗
      this.showRedeemPopup = false;
      this.toApplyPayPassword = '';
    },
    toRedeemEvent() { // 划转余额
      if (!this.toApplyPayPassword) {
        this.$toast('请输入密码');
        return;
      }
      this.commonVerifyPayPassword(this.toApplyPayPassword).then(res => {
        if (res) {
          this.toRedeemRequest(); // 校验通过发起请求
        } else {
          this.toApplyPayPassword = '';
        }
      }).catch(err => {
        console.log('提现校验密码出错', err);
      });
    },
    toRedeemRequest() { // 发起划转到余额的请求
      const data = {
        id: this.redeemObject.id,
        mineType: this.tableItem.key,
        conin: this.redeemObject.coinSize,
        payPwd: this.$md5(this.toApplyPayPassword),
      };
      this.$api.getToRedeem(data).then(res => {
        this.closeRedeemPopup();
        this.getMortgageRecord(this.currentIndex);
        this.$toast('赎回成功！');
        console.log('划转到余额', res);
      }).catch(err => {
        console.log('划转到余额出错', err);
      });
    },
  },
  created() { // 生命周期 - 创建完成
    this.getListData();
  },
  mounted() { // 生命周期 - 挂载完成
  },
  beforeCreate() { }, // 生命周期 - 创建之前
  beforeMount() { }, // 生命周期 - 挂载之前
  beforeUpdate() { }, // 生命周期 - 更新之前
  updated() { }, // 生命周期 - 更新之后
  beforeDestroy() { }, // 生命周期 - 销毁之前
  destroyed() { }, // 生命周期 - 销毁完成
  activated() { }, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang="less">
//@import url(); 引入公共css类
.listTable {
  .el-table__body-wrapper {
    width: 100%;
    min-height: 4.8rem;
  }
  .el-table th.is-leaf {
    height: 0.5rem;
    @font-s();
    color: @color-font-default;
    font-weight: 400;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    @media (max-width: 768px) {
      width: 3rem;
    }
  }
  .el-table td, .el-table th.is-leaf{
    border: 0;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background: #f5f9ff;
  }
  .el-input--suffix .el-input__inner {
    padding-right: 0;
  }
  .greenFont {
    color: #35a826;
  }
  .el-table tr td:first-child,
  .el-table tr th:first-child {
    padding-left: 0.3rem;
  }
  .el-table {
    @media (max-width: 768px) {
      font-size: 0.12rem;
    }
  }
  .eleTable {
    .miningEarnings {
      display: flex;
      align-items: center;
      .flagType {
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
  .el-table__header-wrapper{
    max-height: 0.5rem;
    overflow: hidden;
  }
  .copyBtn{
    color: @color-main;
  }
}
</style>

<style lang="less" scoped>
//@import url(); 引入公共css类
@import url("./listTable.less");
</style>
