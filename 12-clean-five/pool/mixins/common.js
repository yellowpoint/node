export default {
  computed: {
    // 组件计算属性
    userInfo() {
      // 用户信息
      return this.$store.getters.userInfo;
    },
  },
  methods: {
    commonVerifyPayPassword(payPassword) {
      // 校验安全密码
      return new Promise((resolve, reject) => {
        if (!/^[a-zA-Z0-9]{8}$/.test(payPassword)) {
          this.$toast('安全密码错误，请重新输入！');
          return;
        }
        const data = {
          payPwd: this.$md5(payPassword),
        };
        this.$api
          .checkPayPassword(data)
          .then(res => {
            console.log('校验安全密码通过', res);
            if (!res) {
              this.$toast('安全密码错误，请重新输入！');
            }
            resolve(res);
          })
          .catch(err => {
            console.log('校验安全密码出错', err);
            reject(err);
          });
      });
    },
    commonInitUserProfile() {
      // 获取用户信息
      return new Promise((resolve, reject) => {
        this.$api
          .userInfo()
          .then(res => {
            const newInfo = Object.assign(this.userInfo, res);
            this.$store
              .dispatch('setUserInfo', newInfo)
              .then(() => {})
              .catch(err => {
                console.log(err);
              });
            resolve(res);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    },
  },
};
