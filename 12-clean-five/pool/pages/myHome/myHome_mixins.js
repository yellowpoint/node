import myHomeStore from './store';
import commonMixins from '@/mixins/common';

const getStore = (key) => {
  return {
    get() {
      return myHomeStore.getters.myHome[key];
    },
    set(newValue) {
      this.setStore({
        [key]: newValue,
      });
    },
  };
};
export default {
  mixins: [commonMixins],
  inject: ['tableItem', 'myHomeDetail_this'],
  data() {
    return {
      tipsText: [],
    };
  },
  computed: {
    isPC() {
      if (document.body.clientWidth <= 768) {
        return false;
      }
      return true;
    },
    borrowAddress: getStore('borrowAddress'), // 用户借入金额钱包地址
    newBorrowAddress: getStore('newBorrowAddress'), // 修改用户借入金额钱包地址（临时）
    mineType() {
      return this.tableItem.key;
    },
  },
  created() {

  },
  mounted() {},
  watch: {

  },
  methods: {
    switchTable(index) {
      this.switchIndex = index;
    },
    toSetPwd() {
      this.$SetPopup({
        popupType: 'payPassword',
        mineType: this.mineType,
      });
    },
    setStore(obj) {
      let myHome = myHomeStore.getters.myHome;
      myHome = Object.assign({}, myHome, obj);
      myHomeStore.commit('myHome', myHome);
    },
    updateData(args) {
      this.myHomeDetail_this.updateData(args);
    },
    // 获取文案数据
    async getWrite(writeType = 1) {
      const res = (await this.$api.getWrite({
        writeType,
        mineType: this.mineType,
      }));
      if (res && res.writeValue) {
        this.$set(this.tipsText, writeType, res.writeValue);
      }
    },
  },
};
