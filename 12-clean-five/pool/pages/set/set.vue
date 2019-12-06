<!-- 个人中心 -->
<template>
    <div class="setPage content">
        <div class="setContent">
            <div class="personal">
                <div class="titleBox">
                    <div class="title">基本资料</div>
                </div>
                <div class="detail">
                    <div class="label">用户名</div>
                    <div class="text">{{userInfo ? userInfo.nickname : ''}}</div>
                    <div class="handle" @click="changeInfo('resetUserName')">{{userInfo && userInfo.nickname ? '修改' : '设置'}}</div>
                </div>
                <div class="detail">
                    <div class="label">用户ID</div>
                    <div class="text">{{userInfo.id}}</div>
                </div>
                <div class="detail">
                    <div class="label">AccountKey</div>
                    <div class="text">{{userInfo.userCode}}</div>
                </div>
            </div>
            <div class="setBox">
                <div class="titleBox">
                    <div class="title">安全设置</div>
                </div>
                <div class="detail">
                    <div class="label">电子邮箱</div>
                    <div class="text">{{userInfo ? userInfo.email : '未绑定'}}</div>
                    <div class="handle" @click="changeInfo('resetMail')">{{userInfo.email ? '修改' : '绑定'}}</div>
                </div>
                <div class="detail">
                    <div class="label">手机号码</div>
                    <div class="text"><span v-if="userInfo">+{{userInfo.dialCode}}</span>&nbsp;{{userInfo ? userInfo.mobile : '未绑定'}}</div>
                    <div class="handle" @click="changeInfo('resetPhone')">{{userInfo.mobile ? '修改' : '设置'}}</div>
                </div>
                <div class="detail">
                    <div class="label">登录密码</div>
                    <div class="text">
                        <i v-if="userInfo.isPassword" class="iconfont icon-zhengque setPassword"></i>
                        <i v-else class="iconfont icon-wenhao noSetPassword"></i>
                        {{userInfo.isPassword ? '已设置' : '未设置'}}
                    </div>
                    <div class="handle" @click="changeInfo('resetPassword')">修改</div>
                </div>
                <div class="detail">
                    <div class="label">安全密码</div>
                    <div class="text">
                        <i v-if="userInfo.isPwd" class="iconfont icon-zhengque setPassword"></i>
                        <i v-else class="iconfont icon-wenhao noSetPassword"></i>
                        {{userInfo.isPwd ? '已设置' : '未设置'}}
                    </div>
                    <div class="handle" @click="changeInfo('payPassword')">{{userInfo.isPwd ? '修改' : '设置'}}</div>
                </div>
                <div class="detail">
                    <div class="label">提现地址</div>
                    <div class="text">{{userWalletAddr ? userWalletAddr : '暂未绑定'}}</div>
                    <div class="handle" @click="changeInfo('resetAddress')">{{userInfo.isPwd ? '修改' : '设置'}}</div>
                </div>
                <div class="detail">
                    <div class="label">只读页面链接</div>
                    <div class="text"></div>
                    <div class="handle" @click="changeInfo('readOnlyPage')">{{userInfo.isPwd ? '修改' : '设置'}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //import templateName from 'path';

    export default {
        name: "",
        components: {},
        data() {
            return {
                userWalletAddr: '',
            };
        },
        computed: { // 组件计算属性
            userInfo() { // 用户信息
				return this.$store.getters.userInfo
            },
            mineType() { // 币种
                return this.$store.getters.mineType;
            }
        },
        watch: { // 组件监听事件
            
        },
        methods: { 	// 组件方法
            changeInfo(val) {
                switch(val){
                    case 'resetPassword':
                        if(this.userInfo.email) {
                            this.$SetPopup({
                                popupType: val,
                            });
                        }else{
                            this.$toast("未绑定邮箱，请先绑定邮箱");
                        }
                    break;
                    case 'payPassword':
                        if(this.userInfo.email) {
                            this.$SetPopup({
                                popupType: val,
                            });
                        }else{
                            this.$toast("未绑定邮箱，请先绑定邮箱");
                        }
                    break;
                    case 'resetPhone':
                        if(this.userInfo.email) {
                            this.$SetPopup({
                                popupType: val,
                            });
                        }else{
                            this.$toast("未绑定邮箱，请先绑定邮箱");
                        }
                    break;
                    case 'resetUserName':
                        this.$SetPopup({
                            popupType: val,
                        });
                    break;
                    case 'resetMail':
                        if(this.userInfo.email) {
                            this.$SetPopup({
                                popupType: val,
                            });
                        }else{
                            this.$SetPopup({
                                popupType: 'setMail',
                            });
                        }
                    break;
                    case 'resetAddress':
                        if(this.userInfo.isPwd) {
                            if(this.userInfo.email) {
                                this.$SetPopup({
                                    popupType: val,
                                    updateAddressCB: this.getUserWalletAddr,
                                });
                            }else{
                                this.$toast("未绑定邮箱，请先绑定邮箱");
                            }
                        }else{
                            this.$toast("未设置安全密码，请先设置安全密码！");
                        }
                    break;
                    case 'readOnlyPage':
                        this.$SetPopup({
                            popupType: val,
                        });
                    break;
                    default: break;
                }
            },
            getUserWalletAddr() { // 获取用户钱包地址
                let data = {
                    mineType: this.mineType,
                }
                this.$api.getUserWalletAddr(data).then( res => {
                    this.userWalletAddr = res;
                    console.log('获取用户钱包地址', res);
                }).catch( err => {
                    console.log('获取用户钱包地址出错', err);
                })
            },
        },
        created() { 	//生命周期 - 创建完成
            this.getUserWalletAddr();
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
    .setPage{
        @content();
        .setContent{
            width: 100%;
            .personal,.setBox{
                padding: 0.3rem;
                box-shadow: 0px 0px 0.13rem 0 rgba(93,113,255,0.22);
                border-radius: 0.1rem;
                margin-bottom: 0.2rem;
                background: @color-default;
            }
            .titleBox{
                width: 100%;
                margin-bottom: 0.35rem;
                .title{
                    text-align: center;
                    color: #383838;
                    font-weight: bold;
                    @font-xl();
                    @allCenter();
                }
            }
            .detail{
                display: flex;
                align-items: center;
                justify-content: flex-start;
                height: 0.68rem;
                padding: 0 1.5rem;
                border-bottom: 1px solid #ededed;
                @media (max-width: 768px) {
                    padding: 0 0.2rem;
                }
                &:last-child{
                    border-bottom: 0;
                }
                .label{
                    width: 2.7rem;
                    @font-m();
                    font-weight:bold;
                    color: #4799FF;
                    display: flex;
                    align-items: center;
                    text-align: left;
                }
                .text{
                    width: 4.4rem;
                    @font-l();
                    font-weight: 300;
                    color: #333333;
                    display: flex;
                    align-items: center;
                    @media (max-width: 768px) {
                        width: auto;
                        flex: 1;
                    }
                }
                .handle{
                    width: 0.8rem;
                    height: 0.40rem;
                    border: 1px solid rgba(71, 153, 255, 1);
                    border-radius: 0.2rem;
                    @font-m();
                    font-weight: 400;
                    color: #4799FF;
                    text-align: center;
                    cursor: pointer;
                    @allCenter();
                    overflow: hidden;
                    &:hover{
                        color: @color-default;
                        border-color: @color-main;
                        box-shadow: 0 0 0rem 0.4rem @color-main inset;
                        transition: box-shadow linear 0.3s;
                    }
                    @media (max-width: 768px) {
                        margin-right: 0.2rem;
                    }
                }
                .setPassword{
                    color: #44D474;
                    margin-right: 0.14rem;
                }
                .noSetPassword{
                    color: #FF4223;
                    margin-right: 0.14rem;
                }
            }
            
        }
    }
</style>