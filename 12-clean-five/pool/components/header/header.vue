<!-- 页头 -->
<template>
    <div class="headerModule">
        <!-- PC样式 -->
        <div v-if="isPC" class="pageHeader" :class="isIndex ? 'index' : 'noBg'" ref="pageHeader" :style="styleObject">
            <div class="centerBox">
                <div :class="longNavType ? 'longNavType' : 'shortNavType'" id="longNavType">
                    <div class="headerBox clearfix">
                        <h1 class="logo" @click="toIndex" alt="https://awpool.coml;爱挖矿池;重新定义'矿池'">https://awpool.com;爱挖矿池;重新定义'矿池'</h1>
                        <div class="selectKind">
                            <img
                                class="selectKind_icon"
                                :src="selectKindList[selectKind].img"
                                :alt="selectKindList[selectKind].name"
                            >
                            <el-select
                                :value="selectKindList[selectKind].name"
                                @change="selectKindFunc"
                                popper-class="selectKind_select"
                            >
                                <el-option
                                v-for="item in selectKindList"
                                :key="item.name"
                                :value="item.name"
                                >
                                <img
                                    :src="item.img"
                                    :alt="item.name"
                                >{{item.name}}
                                </el-option>
                            </el-select>
                        </div>
                        <ul class="nav" id="nav">
                            <div class="bgAnimation" ref="bgAnimation"></div>
                            <li 
                                :class="item.active ? 'active' : ''" 
                                v-for="(item, index) in navData" 
                                :key="index" 
                                @click="tabNav(item)" 
                                @mouseenter="bgAnimation($event)"
                                @mouseleave="bgRestoration()"
                            >
                                {{item.name}}
                            </li>
                        </ul>
                        <div class="headerRight">
                            <div v-if="!userInfo" class="logInBtn" @click="toLogin">登录/注册</div>
                            <div class="selectLanguage">
                                <el-select v-model="language" @change="selectLang" placeholder="">
                                    <el-option
                                        v-for="item in languages"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-if="userInfo" class="selectAccount">
                                <el-dropdown @command="userCommand">
                                    <span class="el-dropdown-link">
                                        <img class="userTypeImg" v-if="userInfo && userInfo.vip == 2" src="~assets/images/header/eco.png" />
                                        <img class="userTypeImg" v-if="userInfo && userInfo.vip != 2" src="~assets/images/header/coo.png" />
                                        <span class="userNickname">{{userInfo ? userInfo.nickname : ''}}</span>
                                        <i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="userSet">个人中心</el-dropdown-item>
                                        <el-dropdown-item command="orderManage">订单管理</el-dropdown-item>
                                        <el-dropdown-item command="logOut">退出</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                            <div v-if="userInfo" class="newMsg" @click="toMessages">
                                消息<i v-show="msgCount" class="redPoint"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 手机样式 -->
        <template v-else>    
            <div class="mobileHeader">
                <i class="icon iconfont icon-toggle showNavIcon" @click="toggleLeftNav"></i>
                <div class="mobileLogo" @click="toIndex">
                    <img src="~assets/images/home/awpool-logo.png" alt="">
                </div>
                <i class="icon iconfont icon-icon12 showNavIcon" @click="toggleRightNav"></i>
            </div>
            <div class="leftNav" ref="leftNav" @click="hideLeftNav()" @touchmove.prevent>
                <ul class="nav">
                    <li 
                        :class="item.active ? 'active' : ''" 
                        v-for="(item, index) in navData" 
                        :key="index"
                        @click="tabNav(item)"
                    >
                        {{item.name}}
                    </li>
                </ul>
            </div>
            <div class="rightNav" ref="rightNav" @click="hideRightNav()" @touchmove.prevent>
                <div class="rightNavBox">
                    <div v-if="!userInfo" class="logInBtn" @click="toLogin">登录/注册</div>
                    <div class="selectKind">
                        <img
                            class="selectKind_icon"
                            :src="selectKindList[selectKind].img"
                            :alt="selectKindList[selectKind].name"
                        >
                        <el-select
                            :value="selectKindList[selectKind].name"
                            @change="selectKindFunc"
                            popper-class="selectKind_select"
                        >
                            <el-option
                                v-for="item in selectKindList"
                                :key="item.name"
                                :value="item.name"
                            >
                                <img
                                :src="item.img"
                                :alt="item.name"
                                >{{item.name}}
                            </el-option>
                        </el-select>
                    </div>
                    <div class="selectLanguage">
                        <el-select v-model="language" @change="selectLang" placeholder="">
                            <el-option
                                v-for="item in languages"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </div>
                    <div v-if="userInfo" class="selectAccount" @click.stop>
                        <el-dropdown @command="userCommand" trigger="click">
                            <span class="el-dropdown-link">
                                <img class="userTypeImg" v-if="userInfo.vip == 2" src="~assets/images/header/eco.png" />
                                <img class="userTypeImg" v-else src="~assets/images/header/coo.png" />
                                <span class="userNickname">{{userInfo ? userInfo.nickname : ''}}</span>
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="userSet">个人中心</el-dropdown-item>
                                <el-dropdown-item command="orderManage">订单管理</el-dropdown-item>
                                <el-dropdown-item command="logOut">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <div v-if="userInfo" class="newMsg" @click="toMessages">
                        消息<i v-show="msgCount" class="redPoint"></i>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    //import templateName from 'path';
    export default {
        name: "page-header",
        components: {},
        data() {
            return {
                navData: [
                    {
                        name: '数据统计',
                        router: '/dataStatistics',
                        active: false,
                    },
                    {
                        name: '资源中心',
                        router: '/resource',
                        active: false,
                    },
                    {
                        name: '帮助',
                        router: '/help',
                        active: false,
                    },
                    {
                        name: '合作挖矿',
                        router: '/lease',
                        active: false,
                    },
                ],
                loginNavData: [
                    {
                        name: '我的首页',
                        router: '/funds',
                        active: false,
                    },
                    {
                        name: '数据查询',
                        router: '/dataQuery',
                        active: false,
                    },
                    {
                        name: '矿机管理',
                        router: '/millManage',
                        active: false,
                    },
                    {
                        name: '绑定查询',
                        router: '/bindingQuery',
                        active: false,
                    },
                    {
                        name: '数据统计',
                        router: '/dataStatistics',
                        active: false,
                    },
                    {
                        name: '资源中心',
                        router: '/resource',
                        active: false,
                    },
                    {
                        name: '帮助',
                        router: '/help',
                        active: false,
                    },
                    {
                        name: '合作挖矿',
                        router: '/lease',
                        active: false,
                    },     
                ],
                languages: [
                    {
                        value: 'zh',
                        label: '中文',
                    }, 
                    {
                        value: 'en',
                        label: 'English',
                    },
                ],
                language: '',
                bannerHeight: '0.8rem', // banner的高度
                historyEvent: true, // 标记用户是通过浏览器回退或前进
                longNavType: false, // 默认static
                isIndex: true,
                selectKind: 1,
                selectKindList: [
                    {
                        name: 'LHD',
                        img: require('assets/images/header/icon_lhd.png'),
                        url: 'https://lhd.awpool.com/#/index'
                    },
                    {
                        name: 'BHD',
                        img: require('assets/images/header/icon_bhd.png'),
                        url: 'https://awpool.com/#/index'
                    },
                    {
                        name: 'HDD',
                        img: require('assets/images/header/icon_hdd.png'),
                        url: 'https://hdd.awpool.com/#/index'
                    },
                ],
            };
        },
        computed: {	// 组件计算属性
            userInfo() { // 用户信息
                if(!this.$store.getters.userInfo) {
                    let navData = [
                        {
                            name: '数据统计',
                            router: '/dataStatistics',
                            active: false,
                        },
                        {
                            name: '资源中心',
                            router: '/resource',
                            active: false,
                        },
                        {
                            name: '帮助',
                            router: '/help',
                            active: false,
                        },
                        {
                            name: '合作挖矿',
                            router: '/lease',
                            active: false,
                        },
                    ];
                    this.navData = navData;
                }
                return this.$store.getters.userInfo
            },
            msgCount() { // 未读消息数量
                return this.$store.getters.msgCount
            },
            isPC(){
                if(document.body.clientWidth <= 768) {
                    return false;
                }else{
                    return true;
                }
            },
            styleObject() {

                if(this.longNavType) {
                    if(this.bannerHeight == '0.8rem') {
                        return {
                            height: '0.6rem',
                        }
                    }
                }else{
                    return {
                        height: '0.8rem',
                    }
                }
                
            },
        },
        watch: {
            '$route'(to, from) {
                this.resetNav();
                let resetBg = true;
                for (const item of this.navData) {
                    item.active =  false;
                    if(item.router == to.path) {
                        item.active =  true;
                        resetBg = false;
                    }
                }
                if(resetBg || this.historyEvent) {
                    if(this.isPC) {
                        this.resetBgAnimation();
                    }
                }
                sessionStorage.setItem('navData', JSON.stringify(this.navData));
                if(!this.isPC) {
                    this.bannerHeight = "70vh";
                    if(to.path === "/borrowingTreasure") {
                        document.querySelector('#app').setAttribute('style', 'background: #fec384;');
                    }else{
                        document.querySelector('#app').setAttribute('style', 'background: #F6F9FC;');
                    }
                }else{
                    if(to.path === "/" || to.path === "/index") {
                        this.longNavType = false;
                        this.isIndex = true;
                        document.querySelector('#app').setAttribute('style', 'background: @color-default;');
                    }else if(to.path === "/borrowingTreasure") {
                        this.longNavType = true;
                        this.isIndex = false;
                        document.querySelector('#app').setAttribute('style', 'background: #fec384;');
                    }else{
                        this.longNavType = true;
                        this.isIndex = false;
                        document.querySelector('#app').setAttribute('style', 'background: #F6F9FC;');
                    }
                }
                this.historyEvent = true;
            }
        },	// 组件监听事件
        methods: { 	// 组件方法
            selectLang(val) {
                // this.$i18n.locale = val;
                // this.$store.dispatch('setLangKey', val).then( () => {
                    
                // }).catch(err => {
                //     console.log(err);
                // });
            },
            getMsgCount() { // 获取未读消息的数量
                this.$api.msgCount().then( res => {
                    console.log('header消息数', res);
                    this.$store.dispatch('setMsgCount', res).then( () => {

                    }).catch(err => {
                        console.log(err);
                    });
                }).catch( err => {
                    console.log('消息数错误', err);
                })
            },
            bgAnimation(e) { // 聚焦动画
                if(document.body.clientWidth <= 768) {
                    this.bannerHeight = "70vh";
                    return
                }
                this.$refs.bgAnimation.style.width = e.target.offsetWidth + 'px';
                this.$refs.bgAnimation.style.left = e.target.offsetLeft + 'px';
            },
            bgRestoration() { // 失焦复位动画
                if(document.body.clientWidth <= 768) {
                    return
                }
                let liNode = document.getElementById("nav").getElementsByTagName("li");
                let index = -1;
                for (let i = 0; i < liNode.length; i++) {
                    if(liNode[i].getAttribute("class") === "active") {
                        index = i;
                    }
                }
                if(index !== -1) {
                    this.$refs.bgAnimation.style.left = liNode[index].offsetLeft + 'px';
                    this.$refs.bgAnimation.style.width = liNode[index].offsetWidth + 'px';
                }else{
                    this.$refs.bgAnimation.style.width = '0px';
                    this.$refs.bgAnimation.style.left = '0px';
                }
            },
            tabNav(val) { // 导航切换
                this.historyEvent = false;
                this.$router.push(val.router);
            },
            resetNav() { // 更新菜单栏
                for (const item of this.navData) {
                    item.active = false;
                }
            },
            resetBgAnimation() {
                this.$refs.bgAnimation.style.width = '0px';
                this.$refs.bgAnimation.style.left = '0px';
            },
            toLogin() { // 登录注册
                this.$RegPopup({
                    popupType: 'accountLogIn',
                });
            },
            toIndex() { // 跳转首页
                this.$router.push("/index");
            },
            mobileToIndex() {
                this.$router.push("/index");
                this.hideLeftNav();
            },
            toMessages() { // 跳转消息页
                console.log("跳转到消息页")
                this.$router.push("/messages");
                if(this.isPC) {
                    this.resetBgAnimation();
                }
            },
            userCommand(command) {
                if(command === "userSet") { // 跳转到设置
                    this.$router.push("/set");
                    if(this.isPC) {
                        this.resetBgAnimation();
                    }else{
                        this.hideRightNav();
                    }
                }else if(command === "orderManage") {
                    this.$router.push("/orderManage");
                    if(this.isPC) {
                        this.resetBgAnimation();
                    }else{
                        this.hideRightNav();
                    }
                }else{
                    if(this.isPC){
                        if(document.documentElement.clientHeight < document.documentElement.offsetHeight){
                            $("#longNavType").css({"right":"17px"});
                        }else{
                            $("#longNavType").css({"right":"0px"});
                        }
                        $("body").css({"overflow":"hidden","padding-right":"0px"});
                        $("html").css({"overflow":"hidden"});

                    }else{
                        $("body").css({"overflow":"hidden"});
                        $("html").css({"overflow":"hidden"});
                    }
                    this.$confirm('是否退出登录?', '', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        $("body").css({"overflow":"visible","padding-right":"0px"});
                        $("html").css({"overflow":"visible"});
						$("#longNavType").css({"right":"0px"});
                        this.$router.push("/index");
                        sessionStorage.removeItem('navData');
                        this.$store.dispatch('setUserInfo', -1).then(res => {
                            location.reload();
                        }).catch(err => {
                            location.reload();
                            console.log(err);
                        });
                    }).catch(err => {
                        $("body").css({"overflow":"visible","padding-right":"0px"});
                        $("html").css({"overflow":"visible"});
                        $("#longNavType").css({"right":"0px"});
                        console.log('取消退出登录', err);
                    });
                }
            },
            showLeftNav() { // 移动端--显示左侧菜单
                this.$refs.leftNav.style.width = "100vw";
                this.$refs.leftNav.style.height = "100vh";
            },
            hideLeftNav() { // 移动端--隐藏左侧菜单
                this.$refs.leftNav.style.width = "0";
                this.$refs.leftNav.style.height = "0";
            },
            toggleLeftNav() { // 左侧菜单
                if(this.$refs.leftNav.style.width == '100vw') {
                    this.hideLeftNav();
                }else{
                    this.showLeftNav();
                }
            },
            showRightNav() { // 移动端--显示右侧菜单
                this.$refs.rightNav.style.width = "100vw";
                this.$refs.rightNav.style.height = "100vh";
            },
            hideRightNav() { // 移动端--隐藏右侧菜单
                this.$refs.rightNav.style.width = "0";
                this.$refs.rightNav.style.height = "0";
            },
            toggleRightNav() { // 右侧菜单
                if(this.$refs.rightNav.style.width == '100vw') {
                    this.hideRightNav();
                }else{
                    this.showRightNav();
                }
            },
            handleScroll: function () {
                let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                if(this.isIndex) {
                    if(scrollTop>10) {
                        this.longNavType = true;
                    }else{
                        this.longNavType = false;
                    }
                }
            },
            // 切换币种
            selectKindFunc(e) {
                let item = this.selectKindList.find(item => {
                    return item.name == e
                })
                if (item && item.url) {
                    window.open(item.url)
                } else {
                    this.$toast('即将上线,敬请期待');
                }
            }
        },
        created() { 	//生命周期 - 创建完成
            if(sessionStorage.getItem('navData') && JSON.parse(sessionStorage.getItem('navData')).length > 0) { // 刷新时从session拿导航栏信息
                if(!this.userInfo) {   // 解决cookie过期 重新加载页面菜单丢失的问题
                    let navData = [
                        {
                            name: '数据统计',
                            router: '/dataStatistics',
                            active: false,
                        },
                        {
                            name: '资源中心',
                            router: '/resource',
                            active: false,
                        },
                        {
                            name: '帮助',
                            router: '/help',
                            active: false,
                        },
                        {
                            name: '合作挖矿',
                            router: '/lease',
                            active: false,
                        },
                    ];
                    let sessionNav = JSON.parse(sessionStorage.getItem('navData'));
                    for (const sessionItem of sessionNav) {
                        if(sessionItem.active) {
                            for (const item of navData) {
                                if(item.router == sessionItem.router) {
                                    item.active = sessionItem.active
                                }
                            }
                        }
                    }
                    this.navData = navData;
                }else{
                    let loginNavData= [
                        {
                            name: '我的首页',
                            router: '/funds',
                            active: false,
                        },
                        {
                            name: '数据查询',
                            router: '/dataQuery',
                            active: false,
                        },
                        {
                            name: '矿机管理',
                            router: '/millManage',
                            active: false,
                        },
                        {
                            name: '绑定查询',
                            router: '/bindingQuery',
                            active: false,
                        },
                        {
                            name: '数据统计',
                            router: '/dataStatistics',
                            active: false,
                        },
                        {
                            name: '资源中心',
                            router: '/resource',
                            active: false,
                        },
                        {
                            name: '帮助',
                            router: '/help',
                            active: false,
                        },
                        {
                            name: '合作挖矿',
                            router: '/lease',
                            active: false,
                        },
                        
                    ]
                    let sessionNav = JSON.parse(sessionStorage.getItem('navData'));
                    for (const sessionItem of sessionNav) {
                        if(sessionItem.active) {
                            for (const item of loginNavData) {
                                if(item.router == sessionItem.router) {
                                    item.active = sessionItem.active
                                }
                            }
                        }
                    }
                    this.navData = loginNavData;
                }
            }else if(this.userInfo) {
                this.navData = this.loginNavData;
            }
            if(this.userInfo) { // 登录拉取未读消息数
                this.getMsgCount();
            }
            
            if(this.$store.getters.langKey == 'zh' || this.$store.getters.langKey == '') {
                this.language = '中文';
            }else{
                this.language = 'English';
            }
        },
        mounted() {	//生命周期 - 挂载完成
            window.addEventListener('scroll', this.handleScroll, true); // 监听（绑定）滚轮滚动事件
        },
        beforeCreate() {}, //生命周期 - 创建之前
        beforeMount() {}, //生命周期 - 挂载之前
        beforeUpdate() {}, //生命周期 - 更新之前
        updated() {}, //生命周期 - 更新之后
        beforeDestroy() { //生命周期 - 销毁之前
            window.removeEventListener('scroll', this.handleScroll);   //  离开页面清除（移除）滚轮滚动事件
        }, 
        destroyed() {}, //生命周期 - 销毁完成
        activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>
<style lang="less">
    // element-ui样式重置
    .selectLanguage{
        .el-select{
            .el-input{
                .el-input__inner{
                    color: @color-default !important;
                    background: transparent !important;
                    border: 0 !important;
                    text-align: right;
                    padding-left: 0;
                }
                .el-select__caret{
                    color: @color-default !important;
                }
            }
        }
    }
    .selectAccount{
        .el-dropdown-link{
            color: @color-default !important;
            cursor: pointer;
            display: flex;
            align-items: center;
            .el-icon-arrow-down{
                margin-left: 0.05rem;
            }
        }
    }
    .el-select-dropdown__item{
        padding: 0 0.2rem !important;
    }
    .el-dropdown-menu__item{
        padding: 0 0.2rem !important;
        &:hover{
            background: #CBF5FF;
            color: #719DA8;
        }
    }
</style>

<style lang="less" scoped>
    @import url('./header.less');
   
</style>

<style lang="less">
// 修改选择币种的默认样式 开始
.headerModule {
  .selectKind {
    .el-input__inner {
      background: transparent;
      border: 0;
      color: #fff;
      font-size: 0.14rem;
      padding-left: 5px;
    }
    .el-select .el-input .el-select__caret {
      color: #fff;
    }
  }
}
body {
  .selectKind_select {
    background: @color-assistant;
    border: 0;

    .el-select-dropdown__item {
      color: #fff;
    }
    .el-select-dropdown__item.selected {
      color: #3f51b5;
    }
    .popper__arrow::after {
      border-bottom-color: @color-assistant !important;
    }
    .el-select-dropdown__item {
      display: flex;
      align-items: center;
      img {
        width: 0.16rem;
        height: 0.16rem;
        margin-right: 0.08rem;
      }
    }
    .el-select-dropdown__item.hover,
    .el-select-dropdown__item:hover {
      background-color: @color-slight;
    }
  }
}

// 修改选择币种的默认样式 结束
</style>