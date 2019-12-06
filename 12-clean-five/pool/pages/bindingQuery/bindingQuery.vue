<!-- 模块名称 -->
<template>
    <div class="content bindingQuerayPage">
        <div>
            <div class="greenBox" v-if="userInfo.vip == 2">
                <img src="~assets/images/bindingQuery/green.png" alt="">
            </div>
            <div class="listBox">
                <div class="listTitle">
                    <text-title>绑定查询</text-title>
                </div>
                <div class="tableContent eleTable">
                    <!-- 绑定查询列表 -->
                    <el-table
                        :data="bindQueryList.list"
                        stripe
                        style="width: 100%"
                        :row-class-name="tableRowClassName"
                        :row-style="rowStyle"
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
                            prop="minerCode"
                            label="Plotter ID"
                            :width="isPC ? '' : '140'"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="createTime"
                            label="时间"
                        >
                        <template slot-scope="scope">
                            <span class="createDate">{{ scope.row.createTime | moment('y-M-d h:m:s')}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                            prop="coinAddr"
                            label="地址"
                            :width="isPC ? '340' : '220'"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="auth"
                            label="绑定情况"
                        >
                            <template slot-scope="scope">
                                <span :class="scope.row.auth ? '' : 'notBind'">{{ scope.row.auth ? '已绑定' : '未绑定'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
						prop=""
						label="操作"
					>
						<template slot-scope="scope">
							<i class="deleteBtn icon iconfont icon-shanchu" v-if="!scope.row.auth" @click="delListItem(scope.row)"></i>
						</template>
					</el-table-column>
                    </el-table>
                    <div class="footerPagination">
                        <el-pagination
                            layout="prev, pager, next"
                            :total="bindQueryList.pages*10"
                            @current-change="bindQueryCurrentChange"
                            @prev-click="bindQueryPrevPage"
                            @next-click="bindQueryNextPage"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="bindOperation listBox">
                <div class="listTitle">
                    <text-title>绑定操作</text-title>
                </div>
                <div class="handleBox">
                    <div class="bindMsg">钱包生成的绑定字符串(16进制)</div>
                    <div class="bindActive">
                        <input type="text" v-model.trim="walletAddress" placeholder="钱包生成的绑定字符串(16进制)" class="bindInput"><div class="bindBtn" :style="walletAddress.length ? '' : 'backgroundColor: #cdcdcd'" @click="bindWalletHandleEvent">提交绑定数据</div>
                    </div>
                    <div class="bindAddressBox">
                        <div class="bindLabel">绑定地址</div>
                        <div class="copyPoolAddress poolAddress"
                            @click="copyPoolAddress" 
                            :data-clipboard-text="userInfo.vip == 2 ? '3DdjeKBPoRFDqqwHJY4Zi2eJEtomsomufa' : '37ahFaegsA5662VVCt4dgy2fS1Rz8w9Csg'"
                            :style="userInfo.vip == 2 ? 'background: #ECFFEB; color:#37916E;' : ''">
                            {{userInfo.vip == 2 ? '3DdjeKBPoRFDqqwHJY4Zi2eJEtomsomufa' : '37ahFaegsA5662VVCt4dgy2fS1Rz8w9Csg'}}
                        </div>
                    </div>
                    <div class="textMsg">
                        <div class="msgTitle">请升级到官网最新钱包版本(v1.2.2.6以上),然后按如下步骤生成绑定数据：</div>
                        <p>1. 确保钱包区块数据已经同步完成，否则生成的绑定数据可能无效；</p>
                        <p>2.钱包点击发送，选择左下角的绑定到选项，绑给栏里输入矿池地址{{userInfo.vip == 2 ? '3DdjeKBPoRFDqqwHJY4Zi2eJEtomsomufa' : '37ahFaegsA5662VVCt4dgy2fS1Rz8w9Csg'}}输入您的 (Plotter ID) 相关联的12位脑密码，点击“生成绑定数据”；</p>
                        <p>3. 复制已生成的数据串，在上面的输入框输入点击确定进行提交；</p>
                        <p v-if="userInfo.vip != 2">4. 联系爱挖客服进行绑定。</p>
                    </div>
                </div>
                <div class="courseBox">
                    <div class="stepBox">
                        <div class="stepTitle">一、生成绑定数据</div>
                        <div v-if="userInfo.vip == 2" class="stepList">
                            <div class="imgBox">
                                <img src="~assets/images/bindingQuery/eco_step1.png" alt="">
                            </div>
                            <div class="imgBox">
                                <img src="~assets/images/bindingQuery/eco_step2.png" alt="">
                            </div>
                            <div class="imgBox">
                                <img src="~assets/images/bindingQuery/eco_step3.png" alt="">
                            </div>
                            <div class="imgBox">
                                <img src="~assets/images/bindingQuery/eco_step4.png" alt="">
                            </div>
                        </div>
                        <div v-else class="stepList">
                            <div class="imgBox">
                                <img src="~assets/images/bindingQuery/step1.png" alt="">
                            </div>
                            <div class="imgBox">
                                <img src="~assets/images/bindingQuery/step2.png" alt="">
                            </div>
                            <div class="imgBox">
                                <img src="~assets/images/bindingQuery/step3.png" alt="">
                            </div>
                            <div class="imgBox">
                                <img src="~assets/images/bindingQuery/step4.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="stepBox">
                        <div class="stepTitle">二、提交绑定数据</div>
                        <div v-if="userInfo.vip == 2" class="stepList">
                            <div class="imgBox">
                                <img src="~assets/images/bindingQuery/eco_step5.png" alt="">
                            </div>
                        </div>
                        <div v-else class="stepList">
                            <div class="imgBox">
                                <img src="~assets/images/bindingQuery/step5.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="stepBox">
                        <div class="stepTitle">三、联系客服绑定</div>
                        <div class="stepList">
                            <div class="imgBox">
                                <img class="wechatImg" src="~assets/images/anytimeStorage/Wechat1.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <transition name="fade">
            <div class="bind-popup popup" v-show="showPopup" @click="closeBindPopup" style="animation-duration: 0.3s;">
                <div class="content-wrap" @click.stop>
                    <div class="headerTitle">
                        <text-title>绑定</text-title>
                        <div class="close" @click="closeBindPopup">&times;</div>
                    </div>
                    <div class="bindInfoMsg">
                        请注意，您现在进行的是 <span class="danger">{{userInfo.vip == 2 ? '生态池' : '主矿池'}} </span>
                        算力绑定，一旦绑定成功7天之内无法解绑。如果您无法确定操作，可以
                        <el-popover
                            placement="top"
                            width="260"
                            trigger="hover">
                            <div class="consultTips">
                                <img src="~assets/images/anytimeStorage/Wechat1.png" alt="">
                                <div class="awQR">爱挖客服二维码</div>
                            </div>
                            <el-button class="consultService" slot="reference">咨询客服</el-button>
                        </el-popover>
                    </div>
                    <div class="msgContent">把plotterid:{{bindInfo.plotterId}}<br/>绑定到钱包地址:{{bindInfo.address}}</div>
                    <div class="footer">
                        <div class="cancel" @click="closeBindPopup">取消退出</div>
                        <button :class="disabledClick ? 'confirm disabledClick' : 'confirm'" @click="bindHandle" :disabled="disabledClick">确定进行<span v-if="count">({{count}})</span></button>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div class="remind-popup popup" v-show="showRemindPopup" @click="showRemindPopup=false" style="animation-duration: 0.3s;">
                <div class="content-wrap" @click.stop>
                    <div class="headerTitle">
                        <text-title>提醒</text-title>
                        <div class="close" @click="showRemindPopup=false">&times;</div>
                    </div>
                    <div class="remindContent">
                        <div class="textMsg">
                            您进行的是<span class="danger"> 主矿池 </span>的算路ID绑定，请联系您身边的客服“审核”在未“审核”之前请勿切入机器。
                        </div>
                        <div class="imgBox">
                            <img src="~assets/images/anytimeStorage/Wechat1.png" alt="">
                        </div>
                        <div>爱挖客服微信</div>
                    </div>
                    <div class="footer">
                        <div class="confirm" @click="showRemindPopup=false">我知道了</div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div class="succeed-popup popup" v-show="showSucceedPopup" @click="showSucceedPopup=false" style="animation-duration: 0.3s;">
                <div class="content-wrap" @click.stop>
                    <div class="headerTitle">
                        <text-title>提示</text-title>
                        <div class="close" @click="showSucceedPopup=false">&times;</div>
                    </div>
                    <div class="succeedContent">
                        绑定成功，等6个区块成熟后生效，预计30分钟
                    </div>
                    <div class="footer">
                        <div class="confirm" @click="showSucceedPopup=false">我知道了</div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div class="error-popup popup" v-show="showErrorPopup" @click="showErrorPopup=false" style="animation-duration: 0.3s;">
                <div class="content-wrap" @click.stop>
                    <div class="headerTitle">
                        <text-title>提示</text-title>
                        <div class="close" @click="showErrorPopup=false">&times;</div>
                    </div>
                    <div class="errorContent">
                        数据有误，确保钱包区块数据已经同步完成后，请重新生成绑定数据，
                        如有疑问，可以
                        <el-popover
                            placement="top"
                            width="260"
                            trigger="hover">
                            <div class="consultTips">
                                <img src="~assets/images/anytimeStorage/Wechat1.png" alt="">
                                <div class="awQR">爱挖客服二维码</div>
                            </div>
                            <el-button class="consultService" slot="reference">咨询客服</el-button>
                        </el-popover>
                    </div>
                    <div class="footer">
                        <div class="confirm" @click="showErrorPopup=false">我知道了</div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    //import templateName from 'path';
    import Clipboard from 'clipboard';

    export default {
        name: "bindingQuerayPage",
        components: {},
        data() {
            return {
                bindQueryList: {}, // 绑定查询列表
                bindQueryPage: 1, // 绑定查询列表页码
                walletAddress: '', // 钱包生成的绑定字符串
                showPopup: false, // 显示绑定弹窗
                showRemindPopup: false, // 显示提醒弹窗
                showSucceedPopup: false, // 显示绑定成功弹窗
                showErrorPopup: false, // 显示数据错误弹窗
                bindInfo: {}, // 绑定信息
                bindInvitation: false, // 是否绑定邀约
                timer: null, // 
                disabledClick: true, // 禁止点击
                count: 10,
            };
        },
        computed: {	// 组件计算属性
            isPC() {
                if(document.body.clientWidth <= 768) {
                    return false
                }else{
                    return true
                }
            },
            mineType() { // 币种 默认BHD
                return this.$store.getters.mineType;
            },
            userInfo() { // 用户信息
				return this.$store.getters.userInfo
            },
        },
        watch: {},	// 组件监听事件
        methods: { 	// 组件方法
            tableRowClassName({row, rowIndex}) {
                return 'animated flipInX';
            },
            rowStyle({row, rowIndex}){
                return `animation-delay: ${rowIndex * 0.1}s`
            },
            copyPoolAddress() {
                console.log('点击了');
                let clipboard = new Clipboard('.copyPoolAddress')
				clipboard.on('success', e => {
					this.$toast('复制成功');
					// 释放内存 
					clipboard.destroy()
				})
				clipboard.on('error', e => {
					// 不支持复制
					this.$toast('该浏览器不支持自动复制,请长按复制')
					// 释放内存 
					clipboard.destroy()
				})
            },
            bindQueryEvent() { // 绑定查询列表
                let data = {
                    mineType: this.mineType,
                    page: this.bindQueryPage,
                    pageSize: 5,
                }
                this.$api.bindQuery(data).then( res => {
                    this.bindQueryList = res;
                    console.log('绑定查询列表', res);
                }).catch( err => {
                    console.log('绑定查询', err);
                })
            },
            bindQueryCurrentChange(val) { // 点击页码  绑定查询
                if(this.bindQueryPage == val) { // 解决点击上一页和下一页发送两次请求的问题
                    return
                }
                this.bindQueryPage = val;
                this.bindQueryEvent();
            },
            bindQueryPrevPage(val) { // 上一页
                this.bindQueryPage -= 1;
                this.bindQueryEvent();
            },
            bindQueryNextPage(val) { // 下一页
                this.bindQueryPage += 1;
                this.bindQueryEvent();
            },
            delListItem(itemData) {
                 console.log('删除数据', itemData);
                let data = {
                    id: itemData.id,
                }
                this.$api.deleteAddress(data).then( res => {
                    this.$toast("删除成功");
                    this.bindQueryList = {},
                    this.bindQueryPage = 1;
					this.bindQueryEvent(); // 更新列表信息
                }).catch( err => {
                    console.log('删除数据出错', err);
                })
            },
            bindWalletHandleEvent() { // 绑定钱包操作
                if(this.userInfo.isAgreement){ // 是否签约协议
                    if(this.walletAddress && !/^[0-9a-fA-F]+$/.test(this.walletAddress)) {
                        this.$toast('字符串为16进制，请重新输入！');
                        return
                    }
                    if(this.walletAddress) {
                        // if(!this.bindInvitation) { // 是否是邀约用户
                        //     this.showRemindPopup = true;
                        //     return
                        // }
                        let data = {
                            mineType: this.mineType,
                            prePwd: this.walletAddress,
                        }
                        this.$api.bindVerify(data).then( res => {
                            console.log('绑定校验', res);
                            if(res){
                                this.bindInfo = res;
                            }
                            if(res && res.address && res.plotterId) {
                                this.showPopup = true;
                                this.countDown();
                            }else {
                                this.showErrorPopup = true; // 数据有误弹窗
                            }
                        }).catch( err => {
                            if(err.msg) {
                                this.$toast(err.msg);
                            }else{
                                this.$toast('提交出错！');
                            }
                        })
                    }else{
                        this.$toast("请输入正确的绑定字符串");
                    }
                }else{
                    this.$AgreementPopup(); // 协议弹窗
                }
            },
            bindHandle() { // 绑定操作
                this.disabledClick = true;
                let data = {
                    mineType: this.mineType,
                    prePwd: this.walletAddress,
                }
                this.$api.bindWalletHandle(data).then( res => {
                    this.disabledClick = false;
                    this.showPopup = false;
                    this.walletAddress = '';
                    this.bindQueryPage = 1;
                    this.bindQueryEvent();
                    if(this.userInfo.vip == 2) { // 生态池用户
                        this.showSucceedPopup = true;
                    }else{
                        this.$toast('提交成功！'); // 主矿池用户
                        this.showRemindPopup = true;
                    }
                }).catch( err => {
                    this.disabledClick = false;
                    this.walletAddress = '';
                    this.showPopup = false; // 绑定出错关闭弹窗
                    if(err.msg) {
                        this.$toast(err.msg);
                    }else{
                        this.$toast('提交失败！');
                    }
                })
            },
            countDown() {
                this.disabledClick = true;
                let count = 10;
                this.timer = setInterval(() => {
                    count -= 1;
                    if(count <= 0) {
                        clearInterval(this.timer);
                        this.disabledClick = false;
                        this.count = 0;
                    } else {
                        this.count = count;
                    }
                }, 1000)
            },
            closeBindPopup() {
                this.showPopup = false;
                clearInterval(this.timer);
            },
        },
        created() { 	//生命周期 - 创建完成
            this.bindQueryEvent();
        },
        mounted() {	//生命周期 - 挂载完成
            // this.showPopup = true;
            // this.showRemindPopup = true;
            // this.showSucceedPopup = true;
            // this.showErrorPopup = true;
            // this.showPopup = true;
            // this.countDown();
        },
        beforeCreate() { //生命周期 - 创建之前
            document.querySelector('#app').setAttribute('style', 'background: rgba(246,249,252,0.5);');
        },
        beforeMount() {}, //生命周期 - 挂载之前
        beforeUpdate() {}, //生命周期 - 更新之前
        updated() {}, //生命周期 - 更新之后
        beforeDestroy() { //生命周期 - 销毁之前
            document.querySelector('#app').setAttribute('style', '');
        },
        destroyed() {}, //生命周期 - 销毁完成
        activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>

<style lang="less">
.bindingQuerayPage{
    .el-table .cell{
        @font-s();
        font-weight: 400;
        color: #666;
        text-align: center;
        padding-left: 0.05rem;
        padding-right: 0.05rem;
    }
    .el-table .el-table__row--striped{
        background: #EDEDED;
    }
    .el-table__header-wrapper{
        padding-top: 0.24rem;
    }
    .el-table__body-wrapper{
        min-height: 3.0rem;
        @media (max-width: 768px) {
            min-height: 5.0rem;
        }
    }
    .el-table{
        th{
            height: 1.0rem;
            .cell{
                @font-m();
                font-weight: 400;
                color: @color-main;
                text-align: center;
            }
        }
        td{
            height: 0.6rem;
        }
    }
    .el-table::before{
        height: 0;
    }
    .popup{
        .el-button{
            padding:0;
            border: 0;
        }
        
    }
}
.el-popper&.el-popover{
    background: #333;
    padding: 0.3rem 0.5rem;
    border: 1px solid #999;
    border-radius: 0.1rem;
    .consultTips{
        text-align: center;
        .awQR{
            color: @color-default;
            @font-m();
            padding-top: 0.16rem;
        }
    }
    .popper__arrow{
        border-top-color: #333 !important;
        border-bottom-color: #333 !important;
        &::after{
            border-top-color:#333 !important;
            border-bottom-color:#333 !important;
        }
    }
}
</style>


<style lang="less" scoped>
    //@import url(); 引入公共css类
.bindingQuerayPage{
    background: transparent;
    .greenBox{
        margin-bottom: 0.2rem;
        box-shadow:  0 0 0.13rem 0 rgba(219,223,255,1);
    }
    .deleteBtn{
        cursor: pointer;
    }
    .defineNotData{
        padding-bottom: 0;
    }
    .listBox{
        padding: 0.3rem 0;
        background: @color-default;
        box-shadow:  0 0 0.13rem 0 rgba(219,223,255,1);
        border-radius: 0.1rem;
        margin-bottom: 0.2rem;
        .tableContent{
            .tablePagination{
                display: flex;
                justify-content: flex-end;
                margin-top: 0.25rem;
            }
            .notBind{
                color: #FF4242;
            }
        }
        
    }
    .listTitle{
        padding-left: 0.5rem;
    }
    .bindOperation{
        .handleBox{
            padding: 0 0.7rem;
            .bindAddressBox{
                display: flex;
                align-items: center;
                padding-top: 0.5rem;
                .bindLabel{
                    color: #383838;
                    margin-right: 0.34rem;
                }
                .poolAddress{
                    display: inline-block;
                    color: @color-main;
                    background: #EFF3FF;
                    padding: 0.1rem 0.15rem;
                    cursor: pointer;
                }
            }
        }
        .bindMsg{
            font-size: 0.22rem;
            font-weight: 400;
            color: @color-main;
            padding: 0.4rem 0 0.2rem 0;

        }
        .bindActive{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding-right: 0.43rem;
            @media (max-width: 768px) {
                padding-right: 0;
            }
            .bindInput{
                width: 5.0rem;
                height: 0.4rem;
                color: #B5B5B5;
                border:1px solid rgba(181,181,181,1);
                border-radius:4px;
                text-indent: 0.1rem;
                @media (max-width: 768px) {
                    width: 65%;
                }
            }
            .bindBtn{
                height: 0.4rem;
                color: @color-default;
                background:@color-main;
                @allCenter();
                cursor: pointer;
                margin-left: 0.5rem;
                border-radius: 0.2rem;
                padding: 0 0.15rem;
                @media (max-width: 768px) {
                    height: 0.64rem;
                    border-radius: 0.32rem;
                }
            }
        }
        .textMsg{

            .msgTitle{
                color: #383838;
                @font-m();
                font-weight: 900;
                padding-top: 0.3rem;
                padding-bottom: 0.2rem;
            }
            p{
                color: #383838;
                @font-m();
                line-height: 0.36rem;
            }
        }
        .courseBox{
            padding: 0 0.7rem;
            .stepBox{
                .stepTitle{
                    @font-m();
                    color: @color-main;
                    font-weight: bold;
                    padding: 0.26rem 0;
                }
                .stepList{
                    display: flex;
                    flex-wrap: wrap;
                    
                    .imgBox{
                        width: 48%;
                        margin-bottom: 0.24rem;
                        &:nth-child(odd){
                            margin-right: 4%;
                        }
                        @media (max-width: 768px) {
                            width: 100%;
                            margin-right: 0 !important;
                        }
                        .wechatImg{
                            width: 2.9rem;
                            height: 2.9rem;
                        }
                    }
                }
            }
        }
    }
    .footerPagination{
        margin-top: 0.3rem;
        display: flex;
        justify-content: center;
    }
    .popup{
        @allCenter();
        width: 100%;
		height: 100%;
        position: fixed;
        z-index: 99;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
        background: rgba(0, 0, 0, 0.4);
        .content-wrap{
			width: 6.6rem;
			margin: 0 auto;
            background: @color-default;
            padding: 0.4rem;
            padding-top: 0;
            border-radius: 0.1rem;
        }
        .headerTitle{
            display: flex;
            align-items: center;
            height: 0.6rem;
            justify-content: space-between;
            .close{
                color: @color-main;
                font-size: 0.3rem;
                cursor: pointer;
            }
        }
        span.danger{
            font-weight: bold;
        }
        .consultService{
            position: relative;
            @font-m();
            color: @color-main;
            text-decoration:underline;
            cursor: pointer;
        }
    }
    .bind-popup{
        .content-wrap{
            @media (max-width: 768px) {
                width: 85%;
            }
            .msgContent{
                margin-top: 0.2rem;
                @font-m();
                font-weight: 300;
                color: #333;
                line-height: 0.28rem;
                min-height: 1.0rem;
                max-height: 2.0rem;
                padding-top: 0.2rem;
                overflow-y: auto;
                font-weight: 500;
            }
            .footer{
                display: flex;
                justify-content: center;
                .confirm{
                    width: 1.2rem;
                    height: 0.4rem;
                    background: @color-main;
                    @font-m();
                    font-weight: 300;
                    color: @color-default;
                    cursor: pointer;
                    @allCenter();
                    border-radius: 0.2rem;
                    margin-left: 0.6rem;
                }
                .disabledClick{
                    background: #bbb;
                    color: #fffefe;
                    span{
                        color: #fffefe;
                    }
                }
                .cancel{
                    width: 1.2rem;
                    height: 0.4rem;
                    @font-m();
                    font-weight: 300;
                    color: @color-main;
                    border: 1px solid @color-main;
                    cursor: pointer;
                    @allCenter();
                    border-radius: 0.2rem;
                }
            }
        }
    }
    .remind-popup{
        .content-wrap{
            @media (max-width: 768px) {
                width: 85%;
            }
            .remindContent{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 0.4rem 0.2rem;
                .imgBox{
                    width: 2.25rem;
                    padding: 0.14rem 0;
                }
                .textMsg{
                    line-height: 2;
                }
            }
            .footer{
                
                .confirm{   
                    @allCenter();
                    width: 4.2rem;
                    height: 0.48rem;
                    color: @color-default;
                    background: @color-main;
                    border-radius: 0.24rem;
                    margin: 0 auto;
                    cursor: pointer;
                }
            }
        }
    }
    .succeed-popup,.error-popup{
        .content-wrap{
            @media (max-width: 768px) {
                width: 85%;
            }
            .succeedContent{
                padding: 0.4rem 0 0.6rem;
                text-align: center;
            }
            .errorContent{
                padding: 0.4rem 0 0.6rem;
                text-align: left;
            }
            .footer{
                .confirm{   
                    @allCenter();
                    width: 4.2rem;
                    height: 0.48rem;
                    color: @color-main;
                    background: @color-default;
                    border: 1px solid @color-main;
                    border-radius: 0.24rem;
                    margin: 0 auto;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>