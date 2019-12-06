<!-- 个人中心 -->
<template>
  <div class="setPage content">
    <div class="setContent">
      <div class="userInfoBox">
        <div class="personal">
          <div class="titleBox">
            <text-title class="title">基本资料</text-title>
          </div>
          <div class="detail border0">
            <div class="label baseLabel">用户名</div>
            <div class="text">{{userInfo ? userInfo.nickname : ''}}</div>
            <div
              class="handle"
              @click="changeInfo('resetUserName')"
            >{{userInfo && userInfo.nickname ? '修改' : '设置'}}</div>
          </div>
          <div class="detail">
            <div class="label baseLabel">用户ID</div>
            <div class="text">{{userInfo.id}}</div>
          </div>
          <div class="detail accKeyBox">
            <div class="label baseLabel">AccountKey</div>
            <div class="accKeyTextBox">
              <div class="accKeyText">{{userInfo.userCode}}</div>
              <i
                class="icon iconfont iconfuzhi copyBtn"
                v-clipboard:copy="userInfo.userCode"
                v-clipboard:success="copy"
                v-clipboard:error="onError">
              </i>
            </div>
          </div>
        </div>
        <div class="setBox">
          <div class="titleBox">
            <text-title class="title">安全设置</text-title>
          </div>
          <div class="detail">
            <div class="label">电子邮箱</div>
            <div class="text">{{userInfo ? userInfo.email : '未绑定'}}</div>
            <div
              class="handle"
              @click="changeInfo('resetMail')"
            >{{userInfo.email ? '修改' : '绑定'}}</div>
          </div>
          <div class="detail">
            <div class="label">手机号码</div>
            <div class="text"><span v-if="userInfo">+{{userInfo.dialCode}}</span>&nbsp;{{userInfo ? userInfo.mobile : '未绑定'}}</div>
            <div
              class="handle"
              @click="changeInfo('resetPhone')"
            >{{userInfo.mobile ? '修改' : '设置'}}</div>
          </div>
          <div class="detail">
            <div class="label">登录密码</div>
            <div class="text">
              <i
                v-if="userInfo.isPassword"
                class="icon iconfont iconzhengque setPassword"
              ></i>
              <i
                v-else
                class="icon iconfont icon-wenhao noSetPassword"
              ></i>
              {{userInfo.isPassword ? '已设置' : '未设置'}}
            </div>
            <div
              class="handle"
              @click="changeInfo('resetPassword')"
            >修改</div>
          </div>
          <div class="detail">
            <div class="label">安全密码</div>
            <div class="text">
              <i
                v-if="userInfo.isPwd"
                class="icon iconfont iconzhengque setPassword"
              ></i>
              <i
                v-else
                class="icon iconfont icon-wenhao noSetPassword"
              ></i>
              {{userInfo.isPwd ? '已设置' : '未设置'}}
            </div>
            <div
              class="handle"
              @click="changeInfo('payPassword')"
            >{{userInfo.isPwd ? '修改' : '设置'}}</div>
          </div>
        </div>
      </div>
      <div class="readOnlyWrap">
        <div class="titleBox">
          <text-title class="title">只读页面链接</text-title>
          <div
            class="handle"
            @click="updateApiKeyEvent"
          >
            更新
          </div>
        </div>
        <div class="readOnlyContent">
          <div class="readOnlyLeft">
            <div class="detail">
              <div class="label">API Key</div>
              <div class="text">{{observerData.apiKey}}</div>
            </div>
            <div class="detail">
              <div class="label">创建时间</div>
              <div class="text">{{observerData.createTime | moment('y-M-d h:m:s')}}</div>
            </div>
            <div class="detail">
              <div class="label">链接</div>
              <div class="text linkBox">
                <span class="link" @click="openReadOnlyLink(observerData.apiUrl)">
                  {{observerData.apiUrl}}
                </span>
                <i
                  class="icon iconfont iconfuzhi copyLinkBtn"
                  v-clipboard:copy="observerData.apiUrl"
                  v-clipboard:success="copy"
                  v-clipboard:error="onError">
              </i>
              </div>
            </div>
          </div>
          <div class="readOnlyRight">
            <div class="QRcode">
              <canvas
                class="QRcodeLink"
                id="QRcodeLink"
              ></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import templateName from 'path';
// 二维码
import QRCode from 'qrcode';

export default {
  name: '',
  components: {},
  data() {
    return {
      showUpdateMsgBox: false, // 显示更新API提示框
      observerData: {},
    };
  },
  computed: { // 组件计算属性
    userInfo() { // 用户信息
      return this.$store.getters.userInfo;
    },
  },
  watch: { // 组件监听事件

  },
  methods: { // 组件方法
    changeInfo(val) {
      switch (val) {
        case 'resetPassword':
          if (this.userInfo.email) {
            this.$SetPopup({
              popupType: val,
            });
          } else {
            this.$toast('未绑定邮箱，请先绑定邮箱');
          }
          break;
        case 'payPassword':
          if (this.userInfo.email) {
            this.$SetPopup({
              popupType: val,
            });
          } else {
            this.$toast('未绑定邮箱，请先绑定邮箱');
          }
          break;
        case 'resetPhone':
          if (this.userInfo.email) {
            this.$SetPopup({
              popupType: val,
            });
          } else {
            this.$toast('未绑定邮箱，请先绑定邮箱');
          }
          break;
        case 'resetUserName':
          this.$SetPopup({
            popupType: val,
          });
          break;
        case 'resetMail':
          if (this.userInfo.email) {
            this.$SetPopup({
              popupType: val,
            });
          } else {
            this.$SetPopup({
              popupType: 'setMail',
            });
          }
          break;
        default:
          break;
      }
    },
    copy(e) {
      this.$toast('复制成功');
    },
    onError(e) {
      this.$toast('复制失败');
    },
    useqrcode() {
      const canvas = document.getElementById('QRcodeLink');
      QRCode.toCanvas(canvas, this.observerData.apiUrl, err => {
        if (err) {
          console.error(err);
        } else {
          console.log('QRCode success!');
        }
      });
    },
    updateApiKeyEvent() { // 更新 apiKey
      this.$api.updateApiKey().then(res => {
        this.observerData = res;
        console.log('更新ApiKey', res);
        this.$toast('更新成功！');
        this.useqrcode();
        this.showUpdateMsgBox = false; // 隐藏提示框
      }).catch(err => {
        console.log('更新ApiKey出错', err);
      });
    },
    getObserverLinkEvent() {
      this.$api.getObserverLink().then(res => {
        console.log('获取观察者链接', res);
        this.observerData = res;
        this.useqrcode();
      }).catch(err => {
        console.log('获取观察者链接出错', err);
      });
    },
    showUpdateBox() {
      this.showUpdateMsgBox = true;
    },
    openReadOnlyLink() { // 跳转观察者页面
      window.open(this.observerData.apiUrl, '_blank');
    },
  },
  created() { // 生命周期 - 创建完成
    this.getObserverLinkEvent(); // 获取链接
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

<style lang="less" scoped>
//@import url(); 引入公共css类
.setPage {
  @content();
  .setContent {
    width: 100%;
    margin-bottom: 0.2rem;
    .userInfoBox{
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.2rem;
    }
    .personal,
    .setBox {
      height: 3.2rem;
      padding: 0 0.3rem;
      @shadow();
      background: @color-default;
    }
    .personal{
      width: 4.5rem;
    }
    .setBox{
      width: 7.3rem;
    }
    .titleBox {
      width: 100%;
      height: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ececec;
      .title {
        text-align: left;
        color: #383838;
        font-weight: bold;
        @font-xl();
      }
    }
    .handle {
      width: 0.5rem;
      height: 0.2rem;
      border: 1px solid @color-main;
      border-radius: 0.04rem;
      @font-s();
      font-weight: 400;
      color: @color-main;
      text-align: center;
      cursor: pointer;
      @allCenter();
      overflow: hidden;
      &:hover {
        color: @color-default;
        border-color: @color-main;
        box-shadow: 0 0 0rem 0.4rem @color-main inset;
        transition: box-shadow linear 0.3s;
      }
      @media (max-width: 768px) {
        margin-right: 0.2rem;
      }
    }
    .detail {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 0.54rem;
      @media (max-width: 768px) {
        padding: 0 0.2rem;
      }
      &:last-child {
        border-bottom: 0;
      }
      &.border0{
        border: 0;
      }
      .linkBox{
        .link{
          color: @color-main;
          cursor: pointer;
          text-decoration: underline;
        }
        .copyLinkBtn{
          margin-left: 0.28rem;
          cursor: pointer;
          @active();
        }
      }
      &.accKeyBox{
        height: auto;
        align-items: flex-start;
        flex-direction: column;
        padding-bottom: 0.25rem;
        border-top: 1px solid #ececec;
        .label{
          height: 0.48rem;
        }
        .accKeyTextBox{
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .accKeyText{
            width: 3.3rem;
            height: 0.48rem;
            @allCenter();
            @font-xl();
            font-weight: 800;
            color: @color-main;
            background: #e6f1ff;
          }
          .copyBtn{
            @font-xl();
            color: @color-main;
            cursor: pointer;
            @active();
          }
        }
      }
      .label {
        width: 2.7rem;
        @font-s();
        font-weight: 400;
        color: @color-font-light;
        display: flex;
        align-items: center;
        text-align: left;
        &.baseLabel{
          width: 0.8rem;
        }
      }
      .text {
        @font-s();
        font-weight: 500;
        color: #333333;
        display: flex;
        align-items: center;
        flex: 1;
        @media (max-width: 768px) {
          width: auto;
          flex: 1;
        }
      }
      .setPassword {
        @font-m();
        color: #44d474;
        margin-right: 0.14rem;
      }
      .noSetPassword {
        @font-m();
        color: #ff4223;
        margin-right: 0.14rem;
      }
    }
    .readOnlyWrap{
      padding: 0 0.3rem;
      background: @color-default;
      @shadow();
      .readOnlyContent{
        min-height: 1.84rem;
        display: flex;
        align-items: center;
        .readOnlyLeft{
          width: 8.7rem;
        }
        .readOnlyRight{
          flex: 1;
        }
      }
    }
  }
}
</style>
