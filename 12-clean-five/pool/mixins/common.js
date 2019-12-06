export default {
    computed: { // 组件计算属性
        mineType() { // 币种
            return this.$store.getters.mineType;
        },
        userInfo() { // 用户信息
            return this.$store.getters.userInfo
        },
    },
    methods: {
        commonVerifyPayPassword(payPassword) { // 校验安全密码
            return new Promise((resolve, reject) => {
                if(!/^[a-zA-Z0-9]{8}$/.test(payPassword)) {
                    this.$toast("安全密码错误，请重新输入！");
                    return
                }
                let data = {
                    payPwd: this.$md5(payPassword),
                }
                this.$api.checkPayPassword(data).then( res => {
                    console.log('校验安全密码通过', res);
                    if(!res) {
                        this.$toast('安全密码错误，请重新输入！');
                    }
                    resolve(res);
                }).catch( err => {
                    console.log('校验安全密码出错', err);
                    reject(err);
                })
            })
        },
        commonInitUserProfile() { // 获取用户信息
            return new Promise((resolve, reject) => {
                this.$api.userInfo().then( res => {
                    let newInfo = Object.assign(this.userInfo, res);
                    this.$store.dispatch('setUserInfo', newInfo).then( () => {
                    }).catch(err => {
                        console.log(err);
                    });
                    resolve(res);
                }).catch( err => {
                    console.log(err);
                    reject(err);
                })
            })
        },
        getCommonBorrowInfo() { // 获取余额借入金额信息
            return new Promise((resolve, reject) => {
                let data = {
                    mineType: this.mineType,
                }
                this.$api.newBorrowInfo(data).then( res => {
                    this.$store.dispatch('setUserBorrowInfo', res).then( () => {
                    }).catch(err => {
                        console.log(err);
                    });
                    console.log('获取余额信息', res);
                    resolve(res);
                }).catch( err => {
                    console.log('获取余额信息出错', err);
                    reject(err)
                })
            })
        },
    }
}