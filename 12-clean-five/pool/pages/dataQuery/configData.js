export const getNavConfig = (tableItem) => {
  const navData = [
    {
      name: '每日总收益',
      active: true,
    },
    {
      name: '挖矿收益明细',
      active: false,
    },
    {
      name: '合作投放明细',
      active: false,
    },
    {
      name: '定投明细',
      active: false,
    },
    {
      name: '合作订单',
      active: false,
    },
    {
      name: '定投订单',
      active: false,
    },
    {
      name: 'DL贡献点',
      active: false,
    },
    {
      name: '爆块记录',
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
  ];
  if (tableItem.key == 'bhd' || tableItem.key == 'BHD') {
    navData.push({
      name: '借入记录',
      active: false,
    });
  }
  if (tableItem.key == 'xhd' || tableItem.key == 'XHD') {
    navData.push({
      name: '划转记录',
      active: false,
    });
  }
  return navData;
};

export const getTableConfig = (tableItem) => {
  const mapType = (type) => { // 合作投放明细--映射类型
    let typeText = '';
    switch (type) {
      case 1:
        typeText = '投放返回';
        break;
      case 2:
        typeText = '收益分成';
        break;
      case 3:
        typeText = '投放支出';
        break;
      default:
        break;
    }
    return typeText;
  };
  const mapBusinessType = (statusCode) => { // 借入记录--映射业务类型
    switch (statusCode) {
      case 1:
        return '借入 ';

      case 2:
        return '赎回 ';

      case 3:
        return '异常赎回 ';

      default:
        return '';
    }
  };
  const mapRechargeStatus = (statusCode) => { // 充值记录--映射充值状态
    switch (statusCode) {
      case 1:
        return '未处理';

      case 2:
        return '已入账';

      case 3:
        return '处理失败';

      case 4:
        return '已封存';

      case 5:
        return '已完成';

      case 6:
        return '转账失败';

      case 7:
        return '提现成功';

      default:
        return '';
    }
  };
  const mapWorkOrdersStatus = (statusCode) => { // 合作订单--映射状态
    switch (statusCode) {
      case 0:
        return '未生效';
      case 1:
        return '进行中';
      case 2:
        return '已到期';
      case 3:
        return '流标';
      case 4:
        return '已统计';
      default:
        return '';
    }
  };
  const mapTimeDepositOrdersStatus = (statusCode) => { // 定投订单--映射状态
    switch (statusCode) {
      case 1:
        return '进行中';
      case 2:
        return '已过期';
      case 3:
        return '流标中止';
      default:
        return '';
    }
  };
  const mapIsRepeat = (isRepeat) => { // DL贡献点--映射是否重复提交
    return isRepeat ? '是' : '否';
  };
  const mapRate = (val) => { // 映射收益率百分比
    return `${val}%`;
  };
  const mapCashStatus = (val) => { // 提现记录--映射提现状态
    switch (val) {
      case 1:
        return '未处理';

      case 2:
        return '处理成功';

      case 3:
        return '处理失败';

      case 4:
        return '已封存';

      case 5:
        return '已完成';

      case 6:
        return '转账失败';

      case 7:
        return '转账成功';

      case 9:
        return '已取消提现';

      default:
        return '未知';
    }
  };
  const mapOmitText = (text) => {
    return text ? `${text.slice(0, 10)}...${text.slice(-10)}` : '';
  };
  const mapRedeemStatus = (status) => { // 映射赎回状态
    switch (status) {
      case 0:
        return '未生效';
      case 1:
        return '进行中';
      case 2:
        return '审核失败';
      case 3:
        return '已赎回';
      default:
        return '未知';
    }
  };
  const isPC = () => {
    if (document.body.clientWidth <= 768) {
      return false;
    }
    return true;
  };
  const arr0 = [ // 每日总收益
    {
      label: '时间',
      prop: 'createTime',
      moment: 'y-M-d h:m',
      align: 'center',
    },
    {
      label: '挖矿收益',
      prop: 'miningEarnings',
      align: 'center',
      units: true,
    },
    {
      label: '增值收益',
      prop: 'valueAddedEarnings',
      align: 'center',
      units: true,
    },
    {
      label: '总收益',
      prop: 'totalEarnings',
      align: 'center',
      showAdd: true,
      units: true,
      style: {
        color: '#3cda26',
      },
    },
  ];
  const arr1 = [ // 挖矿收益明细
    {
      label: '区块高度',
      prop: 'blockHeight',
      width: isPC ? '' : '80',
      align: 'center',
    },
    {
      label: '时间',
      prop: 'createTime',
      moment: 'y-M-d h:m',
      width: isPC ? '' : '60',
      align: 'center',
    },
    {
      label: '收益率',
      prop: 'rate',
      width: isPC ? '' : '100',
      mapFn: mapRate,
      align: 'center',
    },
    {
      label: '收益',
      prop: 'conin',
      units: true,
      showAdd: true,
      width: isPC ? '400' : '220',
      align: 'left',
      style: {
        color: '#3cda26',
      },
    },
  ];
  const arr2 = [ // 合作投放明细
    {
      label: '订单编号',
      prop: 'orderNo',
    },
    {
      label: '时间',
      prop: 'createTime',
      moment: 'y-M-d h:m',
    },
    {
      label: '投放数量',
      prop: 'putAmount',
      units: true,
    },
    {
      label: '类别',
      prop: 'type',
      mapFn: mapType,
    },
    {
      label: '数量',
      prop: 'amount',
      units: true,
    },
  ];
  const arr3 = [ // 定投明细
    {
      label: '订单编号',
      prop: 'orderNo',
      width: isPC ? '200' : '120',
    },
    {
      label: '时间',
      prop: 'createTime',
      moment: 'y-M-d h:m',
    },
    {
      label: '投放数量 ',
      prop: 'putAmount',
      units: true,
    },
    {
      label: '类别',
      prop: 'type',
    },
    {
      label: '收益',
      prop: 'amount',
      units: true,
      width: isPC ? '' : '50',
    },
  ];
  const arr4 = [ // 合作订单
    {
      label: '订单编号',
      prop: 'orderNo',
      width: isPC ? '200' : '',
    },
    {
      label: '投放时间',
      prop: 'putTime',
      moment: 'y-M-d h:m',
      width: isPC ? '180' : '',
    },
    {
      label: '期数 ',
      prop: 'number',
    },
    {
      label: '投放期限 ',
      prop: 'allottedTime',
    },
    {
      label: '数量',
      prop: 'amount',
      units: true,
    },
    {
      label: '释放时间',
      prop: 'effectEndTime',
      moment: 'y-M-d h:m',
      width: isPC ? '180' : '',
    },
    {
      label: '剩余天数',
      prop: 'residueDay',
    },
    {
      label: '当前收益',
      prop: 'incomeEarned',
      width: isPC ? '140' : '',
      units: true,
    },
    {
      label: '状态',
      prop: 'status',
      mapFn: mapWorkOrdersStatus,
    },
  ];
  const arr5 = [ // 定投订单
    {
      label: '投放时间',
      prop: 'createTime',
      moment: 'y-M-d h:m',
      width: isPC ? '180' : '100',
    },
    {
      label: '期数',
      prop: 'periodsNo',
    },
    {
      label: '年化率',
      prop: 'interest',
      mapFn: mapRate,
    },
    {
      label: '数量',
      prop: 'putAmount',
      units: true,
    },
    {
      label: '期限',
      prop: 'periodTimeNum',
    },
    {
      label: '释放时间',
      prop: 'effectEndTime',
      moment: 'y-M-d h:m',
    },
    {
      label: '当前收益',
      prop: 'haveEarnings',
      units: true,
    },
    {
      label: '状态',
      prop: 'status',
      mapFn: mapTimeDepositOrdersStatus,
    },
  ];
  const arr6 = [ // DL贡献点
    {
      label: '区块高度',
      prop: 'height',
      width: isPC ? '120' : '70',
    },
    {
      label: 'DL贡献点',
      prop: 'contribute',
      width: isPC ? '120' : '70',
    },
    {
      label: 'Deadline',
      prop: 'deadline',
      width: isPC ? '120' : '70',
    },
    {
      label: '目标',
      prop: 'targetDeadline',
      width: isPC ? '100' : '70',
    },
    {
      label: '重复提交',
      prop: 'repetitionSubmit',
      mapFn: mapIsRepeat,
      width: isPC ? '100' : '60',
    },
    {
      label: 'Plotter ID',
      prop: 'plotterId',
      sortable: true,
      width: isPC ? '200' : '120',
    },
    {
      label: '上报机器',
      prop: 'millName',
      width: isPC ? '' : '200',
    },
    {
      label: '时间',
      prop: 'date',
      moment: 'y-M-d h:m',
      width: isPC ? '200' : '120',
    },
  ];
  const arr7 = [ // 爆块记录
    {
      label: '区块高度',
      prop: 'height',
      // width: isPC ? '200' : '70',
    },
    {
      label: 'Plotter ID',
      prop: 'plotterId',
      sortable: true,
      // width: isPC ? '200' : '120',
    },
    {
      label: '爆块机器',
      prop: 'millName',
      // width: isPC ? '' : '170',
    },
    {
      label: '时间',
      prop: 'date',
      moment: 'y-M-d h:m',
      // width: isPC ? '200' : '120',
    },
  ];
  const arr8 = [ // 充值记录
    {
      label: '交易号',
      prop: 'mineOrderNumber',
      align: 'center',
      width: isPC ? '260' : '120',
      mapFn: mapOmitText,
      copy: true,
    },
    {
      label: '订单编号',
      prop: 'orderNumber',
      align: 'center',
      width: isPC ? '' : '120',
    },
    {
      label: '时间',
      prop: 'createTime',
      moment: 'y-M-d h:m',
      align: 'center',
      width: isPC ? '' : '100',
    },
    {
      label: '地址',
      prop: 'coinAddress',
      units: true,
      align: 'center',
      width: isPC ? '360' : '200',
    },
    {
      label: '充值数量',
      prop: 'conin',
      units: true,
      align: 'center',
      width: isPC ? '120' : '80',
    },
    {
      label: '状态',
      prop: 'orderStatus',
      mapFn: mapRechargeStatus,
      align: 'center',
      width: isPC ? '120' : '80',
    },
  ];
  const arr9 = [ // 提现记录
    {
      label: '交易号',
      prop: 'mineOrderNumber',
      align: 'center',
      width: isPC ? '240' : '120',
      mapFn: mapOmitText,
      copy: true,
    },
    {
      label: '订单编号',
      prop: 'orderNumber',
      width: isPC ? '190' : '120',
    },
    {
      label: '时间',
      prop: 'createTime',
      width: isPC ? '150' : '100',
      moment: 'y-M-d h:m',
    },
    {
      label: '地址',
      prop: 'coinAddress',
      width: isPC ? '340' : '200',
    },
    {
      label: '数量',
      prop: 'conin',
      units: true,
    },
    {
      label: '状态',
      prop: 'orderStatus',
      mapFn: mapCashStatus,
    },
    {
      label: '操作',
      prop: 'createTime',
      width: isPC ? '100' : '80',
      handle: true,
    },
  ];
  const bhdBorrow = [ // BHD借入记录
    {
      label: '交易号',
      prop: 'txid',
      width: isPC ? '' : '340',
      mapFn: mapOmitText,
      copy: true,
    },
    {
      label: '订单编号',
      prop: 'orderNumber',
      width: isPC ? '180' : '100',
    },
    {
      label: '时间',
      prop: 'createTime',
      moment: 'y-M-d h:m',
      width: isPC ? '170' : '100',
      copy: true,
    },
    {
      label: '用户地址',
      prop: 'fromAddr',
      width: isPC ? '330' : '200',
    },
    {
      label: '数量',
      prop: 'coinSize',
      units: true,
      width: isPC ? '100' : '60',
    },
    {
      label: '类型',
      prop: 'bizType',
      width: '100',
      mapFn: mapBusinessType,
    },
  ];
  const xhdMortgage = [ // XHD划转记录
    {
      label: '划转时间',
      prop: 'createTime',
      width: isPC ? '180' : '100',
      moment: 'y-M-d h:m',
    },
    {
      label: '申请数量',
      prop: 'coinSize',
      units: true,
    },
    {
      label: '生效数量',
      prop: 'effictCoin',
      units: true,
    },
    {
      label: '投放周期',
      prop: 'cycle',
    },
    {
      label: '可赎回时间',
      prop: 'redeemableTime',
      moment: 'y-M-d h:m',
    },
    {
      label: '赎回时间',
      prop: 'orderStatus',
      moment: 'y-M-d h:m',
    },
    {
      label: '状态',
      prop: 'status',
      width: isPC ? '200' : '80',
      mapFn: mapRedeemStatus,
      rdeemHandle: true,
    },
  ];
  const config = [arr0, arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9];
  if (tableItem.key == 'bhd' || tableItem.key == 'BHD') {
    config.push(bhdBorrow);
  }
  if (tableItem.key == 'xhd' || tableItem.key == 'XHD') {
    config.push(xhdMortgage);
  }
  return config;
};

export default {
  getNavConfig,
  getTableConfig,
};
