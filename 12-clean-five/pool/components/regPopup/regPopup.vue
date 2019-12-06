<!-- 注册组件 -->
<template>
  <div
    class="reg-popup fadeIn"
    ref="regPopup"
    @click="close"
    style="animation-duration: 0.3s;"
  >
    <div
      class="contentWrap"
      ref="contentWrap"
      @click.stop="hideDropdown($event)"
    >
      <div class="headerTitle">
        <div class="title">{{option.typeText}}</div>
        <div class="rightBox">
          <div
            class="callout"
            @click="toggleType()"
          >{{option.toggleText}}</div>
          <div
            class="toggleTypeIcon"
            @click="toggleType()"
          >
            <img
              v-show="option.type != 'accountLogIn'"
              src="~assets/images/register/pc.png"
              class="pcIcon"
              alt=""
            >
            <img
              v-show="option.type == 'accountLogIn'"
              src="~assets/images/register/phone.png"
              class="phoneIcon"
              alt=""
            >
          </div>
        </div>
      </div>
      <div class="rightContent">
        <div class="formList">
          <!-- 注册 -->
          <div v-show="option.type == 'signIn'">
            <div class="inputBox">
              <div class="label">电子邮箱</div>
              <input
                type="text"
                v-model.trim="signInOption.mail"
                @blur="mailBlur($event)"
                @focus="inputFocus"
                placeholder="请输入电子邮箱地址"
              >
            </div>
            <div class="textMsgBox">
              <p class="textMsg">输入格式错误，请重新检查</p>
            </div>
            <div class="getCodeBox">
              <div class="inputBox">
                <div class="label">邮箱验证码</div>
                <input
                  type="text"
                  v-model.trim="signInOption.mailCode"
                  oninput="if(value.length>6)value=value.slice(0,6)"
                  pattern="[0-9]*"
                  @blur="codeBlur($event)"
                  @focus="codeFocus"
                  placeholder="请输入邮箱验证码"
                >
              </div>
              <button
                class="getCodeBtn"
                ref="codeSignInGetCode"
                @click="codeSignInGetCode"
              >获取验证码</button>
            </div>
            <div class="textMsgBox">
              <p class="textMsg">输入格式错误，请重新检查</p>
            </div>
            <div class="inputBox">
              <div class="label">手机号码</div>
              <vue-tel-input
                v-model="signInOption.phone"
                v-bind="signInTelProps"
                ref="signInTel"
                @blur="resetPosition"
              >
              </vue-tel-input>
            </div>
            <div class="textMsgBox">
              <p class="textMsg">输入格式错误，请重新检查</p>
            </div>
            <div class="passwordBox">
              <div class="label">登陆密码</div>
              <input
                type="password"
                v-model.trim="signInOption.passwordOne"
                @blur="passwordBlur($event, 1)"
                @input="detectCapsLock($event)"
                @focus="passwordFocus"
                autocomplete="new-password"
                placeholder="请输入登陆密码"
                maxlength="18"
              >
              <i
                class="icon iconfont icon-xianshi"
                @click="changeInputType($event)"
              ></i>
            </div>
            <div class="textMsgBox">
              <p class="textMsg">6~18位字符，只能包含英文字母、数字、下划线</p>
            </div>
            <div class="passwordBox">
              <div class="label">确认密码</div>
              <input
                type="password"
                v-model.trim="signInOption.passwordTwo"
                @blur="passwordBlur($event, 2)"
                @input="detectCapsLock($event)"
                @focus="passwordFocus"
                @keyup.enter="signInEvent"
                autocomplete="new-password"
                placeholder="请再次输入登陆密码"
                maxlength="18"
              >
              <i
                class="icon iconfont icon-xianshi"
                @click="changeInputType($event)"
              ></i>
            </div>
            <div class="textMsgBox">
              <p class="textMsg">两次输入的内容不符，请重新检查</p>
            </div>
            <div
              class="goBtn"
              @click="signInEvent"
            >注册</div>
          </div>
          <!-- 账号登录 -->
          <div v-show="option.type == 'accountLogIn'">
            <!-- 账号密码登录 -->
            <div class="passwordLoginBox">
              <div class="inputBox">
                <div class="label">账号</div>
                <input
                  type="text"
                  v-model.trim="accountLoginOption.account"
                  @blur="accountBlur($event)"
                  @focus="inputFocus"
                  placeholder="邮箱/用户名/已验证手机号"
                >
              </div>
              <div class="textMsgBox">
                <p class="textMsg">输入格式错误，请重新检查</p>
              </div>
              <div class="inputBox">
                <div class="label">密码</div>
                <input
                  type="password"
                  v-model.trim="accountLoginOption.password"
                  @blur="passwordLoginBlur($event)"
                  @input="detectCapsLock($event)"
                  @focus="inputFocus"
                  maxlength="18"
                  @keyup.enter="passwordLoginEvent"
                  autocomplete="new-password"
                  placeholder="请输入密码"
                >
                <div
                  class="forgetBox"
                  @click="forgetPasswordEvent"
                ><i class="iconfont icon-wenhao"></i>&nbsp;忘记密码</div>
              </div>
              <div class="textMsgBox">
                <p class="textMsg">输入格式错误，请重新检查</p>
              </div>
              <div
                class="goBtn"
                @click="passwordLoginEvent"
              >登录</div>
              <!-- <div class="toggle positionHeight"><span @click="option.type = 'backTo'">忘记密码？</span></div> -->
              <div class="quickRegister"><span @click="option.type = 'signIn'">快速注册</span></div>
            </div>
          </div>
          <!-- 验证码登录 -->
          <div v-show="option.type == 'codeLogIn'">
            <div>
              <div class="inputBox">
                <div class="label">手机号码</div>
                <input
                  type="number"
                  v-model.trim="codeLoginOption.phone"
                  pattern="[0-9]*"
                  @blur="phoneBlur($event)"
                  @focus="inputFocus"
                  placeholder="请输入手机号码"
                >
                <!-- <vue-tel-input
                  v-model="codeLoginOption.phone"
                  v-bind="codeLogInTelProps"
                  ref="codeLogInTel"
                >
                </vue-tel-input> -->
              </div>
              <div class="textMsgBox">
                <p class="textMsg">输入格式错误，请重新检查</p>
              </div>
              <div class="getCodeBox">
                <div class="inputBox shortBox">
                  <div class="label">验证码</div>
                  <input
                    type="text"
                    v-model.trim="codeLoginOption.code"
                    oninput="if(value.length>6)value=value.slice(0,6)"
                    pattern="[0-9]*"
                    @blur="codeBlur($event)"
                    @focus="codeFocus"
                    @keyup.enter="codeLoginEvent"
                    placeholder="请输入验证码"
                  >
                </div>
                <button
                  class="getCodeBtn"
                  ref="codeLoginGetCode"
                  @click="codeLoginGetCode"
                >获取验证码</button>
              </div>
              <div class="textMsgBox">
                <p class="textMsg">验证码错误，请重新检查</p>
              </div>
              <div
                class="goBtn"
                @click="codeLoginEvent"
              >登录</div>
              <div class="quickRegister"><span @click="option.type = 'signIn'">快速注册</span></div>
            </div>
          </div>
          <!-- 找回密码 -->
          <div v-show="option.type == 'backTo'">
            <div>
              <div class="inputBox">
                <div class="label">账号</div>
                <input
                  type="text"
                  v-model.trim="backToOption.account"
                  @blur="accountBlur($event)"
                  @focus="inputFocus"
                  placeholder="邮箱/已验证手机号"
                >
              </div>
              <div class="textMsgBox">
                <!-- <p class="textMsg">该{{signInFor}}还没被注册。<span class="toSignIn" @click="option.type = 'signIn'">立即注册？</span></p> -->
                <p class="textMsg">输入格式错误，请重新检查</p>
              </div>
              <div class="getCodeBox">
                <div class="inputBox shortBox">
                  <div class="label">验证码</div>
                  <input
                    type="text"
                    v-model.trim="backToOption.code"
                    oninput="if(value.length>6)value=value.slice(0,6)"
                    pattern="[0-9]*"
                    @blur="codeBlur($event)"
                    @focus="codeFocus"
                    placeholder="请输入收到的验证码"
                  >
                </div>
                <button
                  class="getCodeBtn"
                  ref="backToGetCode"
                  @click="backToGetCode"
                >获取验证码</button>
              </div>
              <div class="textMsgBox">
                <p class="textMsg">验证码错误，请重新检查</p>
              </div>
              <div class="inputBox">
                <div class="label">新密码</div>
                <input
                  type="password"
                  v-model.trim="backToOption.newPassword"
                  @blur="backToPasswordBlur($event)"
                  @input="detectCapsLock($event)"
                  @focus="inputFocus"
                  maxlength="18"
                  @keyup.enter="backToEvent"
                  autocomplete="new-password"
                  placeholder="请输入登陆密码，至少6位字符"
                >
              </div>
              <div class="textMsgBox">
                <p class="textMsg">6~18位字符，只能包含英文字母、数字、下划线</p>
              </div>
              <div
                class="goBtn"
                @click="backToEvent"
              >确定</div>
              <div class="toggle"><span @click="option.type = 'accountLogIn'">登录账号</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueTelInput from 'vue-tel-input';

export default {
  name: 'resPopup',
  mixins: [],
  components: {
    VueTelInput,
  },
  props: {
    popupType: { // 弹窗类型
      type: String,
      default: '',
    },
  },
  data() {
    return {
      timer: null,
      option: {
        type: '',
        typeText: '',
        toggleText: '',
      },
      loginTypeList: [
        {
          text: '验证码登录',
          active: true,
        },
        {
          text: '账号密码登录',
          active: false,
        },
      ],
      signInOption: {
        mail: '',
        mailCode: '',
        phone: '',
        passwordOne: '',
        passwordTwo: '',
      },
      codeLoginOption: {
        phone: '',
        code: '',
      },
      accountLoginOption: {
        account: '',
        password: '',
      },
      backToOption: {
        type: '',
        account: '',
        code: '',
        newPassword: '',
      },
      signInBusy: false, // 注册防止重复请求
      codeLoginBusy: false, // 验证码防止重复请求
      acountLoginBusy: false, // 账户登录防止重复请求
      backToBusy: false, // 账户登录防止重复请求
      codeLoginGetCodeInterval: null,
      codeSignInGetCodeInterval: null,
      backToGetCodeInterval: null,
      signInFor: '手机号',
      isCapsLock: false,
      signInTelProps: {
        defaultCountry: '',
        disabledFetchingCountry: false,
        disabled: false,
        disabledFormatting: true,
        placeholder: '请输入电话号码',
        required: false,
        enabledCountryCode: true,
        enabledFlags: true,
        preferredCountries: ['cn', 'hk', 'mo', 'tw'],
        onlyCountries: [],
        ignoredCountries: [],
        autocomplete: 'off',
        name: 'signInTelephone',
        inputId: 'signInTelephone',
        maxLen: 13,
        wrapperClasses: '',
        inputClasses: '',
        dropdownOptions: {
          disabledDialCode: false,
        },
        inputOptions: {
          showDialCode: false,
        },
      },
      codeLogInTelProps: {
        defaultCountry: '',
        disabledFetchingCountry: false,
        disabled: false,
        disabledFormatting: true,
        placeholder: '请输入电话号码',
        required: false,
        enabledCountryCode: true,
        enabledFlags: true,
        preferredCountries: ['cn', 'hk'],
        onlyCountries: [],
        ignoredCountries: [],
        autocomplete: 'off',
        name: 'codeLogInTelephone',
        inputId: 'codeLogInTelephone',
        maxLen: 13,
        wrapperClasses: '',
        inputClasses: '',
        dropdownOptions: {
          disabledDialCode: false,
        },
        inputOptions: {
          showDialCode: false,
        },
      },
    };
  },
  computed: {

  },

  watch: {
    'option.type'(newVal, oldVal) {
      if (this.$common.iosVersion()) {
        $('body').scrollTop(0);
      }
      switch (newVal) {
        case 'signIn':
          this.option.type = newVal;
          this.option.typeText = '账号注册';
          this.option.toggleText = '已有账号登录';
          break;
        case 'accountLogIn':
          this.option.type = newVal;
          this.option.typeText = '账号密码登录';
          this.option.toggleText = '验证码登录';
          break;
        case 'codeLogIn':
          this.option.type = newVal;
          this.option.typeText = '验证码登录';
          this.option.toggleText = '账号密码登录';
          break;
        case 'backTo':
          this.option.type = newVal;
          this.option.typeText = '忘记密码';
          this.option.toggleText = '已有账号登录';
          break;
        default:
      }
    },
  },

  created() {
    this.option.type = this.popupType; // 只执行一次，第一次执行将静态props赋值给data,通过data实时渲染dom,静态props无法实时渲染
  },

  mounted() {
    for (const item of this.$refs.signInTel.sortedCountries) {
      if (item.dialCode == '86') {
        item.name = 'China (中国大陆)';
      } else if (item.dialCode == '853') {
        item.name = 'Macau (中国澳門)';
      } else if (item.dialCode == '886') {
        item.name = 'Taiwan (中国台灣)';
      } else if (item.dialCode == '852') {
        item.name = 'Hong Kong (中国香港)';
      }
    }
    setTimeout(() => {
      document.getElementById('signInTelephone').addEventListener('focus', () => {
        this.clearTimer();
      });
    }, 0);
  },

  beforeDestroy() { },

  destroyed() { },

  methods: {
    /**
     * 手动清除弹窗
    */
    destroy() {
      try {
        const el = document.querySelector('.reg-popup');
        if (el) {
          el.style.display = 'none';
          this.clearInputValue();
          $('body').css({ overflow: 'visible', 'padding-right': '0px' });
          $('html').css({ overflow: 'visible' });
          $('#longNavType').css({ right: '0px' });
        }
        return true;
      } catch (err) {
        throw err;
      }
    },
    /**
     * 关闭弹窗
    */
    close() {
      this.$refs.regPopup.classList.add('fadeOut');
      this.$refs.regPopup.classList.remove('fadeIn');
      setTimeout(() => { // 释放弹窗
        this.destroy();
      }, 300);
    },
    hideDropdown(e) {
      if (e.target.className != 'dropdown' && e.target.className != 'selection' && e.target.className != 'iti-flag cn' && e.target.className != 'country-code' && e.target.className != 'dropdown-arrow') {
        this.$refs.signInTel.open = false;
        // this.$refs.codeLogInTel.open = false;
      }
    },
    resetPosition() {
      this.timer = setTimeout(() => {
        if (this.$common.iosVersion()) {
          $('body').scrollTop(0);
        }
      }, 100);
    },
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    },
    clearInputValue() {
      Object.keys(this.signInOption).forEach(key => {
        this.signInOption[key] = '';
      });
      Object.keys(this.codeLoginOption).forEach(key => {
        this.codeLoginOption[key] = '';
      });
      Object.keys(this.accountLoginOption).forEach(key => {
        this.accountLoginOption[key] = '';
      });
      Object.keys(this.accountLoginOption).forEach(key => {
        this.accountLoginOption[key] = '';
      });
      Object.keys(this.backToOption).forEach(key => {
        this.backToOption[key] = '';
      });
      const msgNodes = this.$refs.contentWrap.getElementsByClassName('textMsg');
      for (const item of msgNodes) {
        item.style.display = 'none';
      }
    },
    resetNavData() {
      this.$router.push('/index');
      const navData = [
        {
          name: '我的首页',
          router: '/myHome',
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
        // {
        //   name: '合作挖矿',
        //   router: '/lease',
        //   active: false,
        // },
      ];
      sessionStorage.setItem('navData', JSON.stringify(navData));
    },
    toggleType() { // 切换类型
      switch (this.option.type) {
        case 'signIn':
          this.option.type = 'accountLogIn';
          break;
        case 'accountLogIn':
          this.option.type = 'codeLogIn';
          break;
        case 'codeLogIn':
          this.option.type = 'accountLogIn';
          break;
        case 'backTo':
          this.option.type = 'accountLogIn';
          break;
        default:
      }
    },
    forgetPasswordEvent() {
      this.option.type = 'backTo';
    },
    inputFocus(e) {
      e.target.parentNode.nextElementSibling.children[0].style.display = 'none';
      this.clearTimer();
    },
    mailBlur(e) { // 邮箱失焦
      if (e.target.value && !this.$common.isMail(e.target.value)) {
        e.target.parentNode.nextElementSibling.children[0].style.display = 'block';
      }
      this.resetPosition();
    },
    phoneBlur(e) { // 手机号失焦
      if (e.target.value && !this.$common.isPhoneNumber(e.target.value)) {
        e.target.parentNode.nextElementSibling.children[0].style.display = 'block';
      }
      this.resetPosition();
    },
    passwordBlur(e, index) { // 密码框失焦
      if (index === 1) {
        if (e.target.value && !this.$common.isPassword(e.target.value)) {
          e.target.parentNode.nextElementSibling.children[0].style.display = 'block';
        }
      } else if (index === 2) {
        if (this.signInOption.passwordOne !== this.signInOption.passwordTwo) { // 两次密码不一致
          e.target.parentNode.nextElementSibling.children[0].style.display = 'block';
        }
      }
      this.isCapsLock = false;
      this.resetPosition();
    },
    passwordFocus(e) { // 密码框聚焦
      e.target.parentNode.nextElementSibling.children[0].style.display = 'none';
      this.clearTimer();
    },
    changeInputType(e) { // 修改文本框类型
      const inputNode = e.target.previousElementSibling;
      const inputType = inputNode.getAttribute('type');
      if (inputType == 'text') {
        inputNode.setAttribute('type', 'password');
        e.target.className = 'icon iconfont icon-xianshi';
      } else {
        inputNode.setAttribute('type', 'text');
        e.target.className = 'icon iconfont icon-yincang';
      }
    },
    codeSignInGetCode() { // 注册时获取邮箱验证码
      if (!this.$common.isMail(this.signInOption.mail)) {
        this.$toast('请输入正确的邮箱！');
        return;
      }
      const data = {
        mail: this.signInOption.mail,
      };
      this.$api.getUserRegisterMialCode(data).then(res => {
        const element = this.$refs.codeSignInGetCode;
        this.$common.countdown(element, this.codeSignInGetCodeInterval);
        this.$toast('发送成功，验证码十分钟内有效!');
        console.log('获取邮箱验证码成功', res);
      }).catch(err => {
        if (err.msg) {
          this.$toast(err.msg);
        }
      });
    },
    signInEvent() { // 注册
      this.signInBusy = true;
      if (!this.signInOption.mail || !this.signInOption.mailCode || !this.signInOption.phone || !this.signInOption.passwordOne || !this.signInOption.passwordTwo) {
        this.$toast('请完善注册信息！');
        return;
      }
      if (!this.$common.isPhoneNumber(this.signInOption.phone)) {
        this.signInBusy = true;
        this.$toast('请输入正确的手机号');
        return;
      }
      if (!this.$common.isCode(this.signInOption.mailCode)) {
        this.signInBusy = true;
        this.$toast('请输入正确的验证码');
        return;
      }
      if (this.signInOption.passwordOne === this.signInOption.passwordTwo) {
        // 两次密码一致发送请求
        const data = {
          system: 'mine',
          dialCode: this.$refs.signInTel.activeCountry.dialCode,
          mobile: this.signInOption.phone,
          mail: this.signInOption.mail,
          mailCode: this.signInOption.mailCode,
          password: this.$md5(this.signInOption.passwordOne),
        };
        this.$api.userRegister(data).then(res => {
          console.log('正确', res);
          this.$toast({
            toastType: 'success',
            text: '账号注册成功',
            showIcon: true,
          });
          this.$store.dispatch('setUserInfo', res).then(() => {
            this.resetNavData();
            setTimeout(() => {
              location.reload();
            }, 2000);
          }).catch(err => {
            console.log(err);
          });
        }).catch(err => {
          this.$toast.destroy();
          this.$toast({
            toastType: 'error',
            text: err.msg,
            showIcon: true,
          });
          console.log('错误', err);
        });
      } else {
        this.$toast({
          toastType: 'error',
          showIcon: true,
          text: '两次的密码不一致，请重新输入~',
          duration: 2000,
        });
      }
    },
    detectCapsLock(e) { // 大写锁定
      if (/^[A-Z]$/.test(e.data)) {
        if (this.isCapsLock === true) {
          return;
        }
        this.isCapsLock = true;
        this.$toast({
          toastType: 'warning',
          showIcon: true,
          text: '您的大写已锁定~',
          duration: 2000,
        });
      } else if (/^[a-z]$/.test(e.data)) {
        this.isCapsLock = false;
      }
    },
    codeBlur(e) {
      if (e.target.value && !/^\d{6}$/.test(e.target.value)) {
        e.target.parentNode.parentNode.nextElementSibling.children[0].style.display = 'block';
      }
      this.resetPosition();
    },
    codeFocus(e) {
      e.target.parentNode.parentNode.nextElementSibling.children[0].style.display = 'none';
      this.clearTimer();
    },
    codeLoginGetCode() { // 获取验证码(手机验证码登录)
      if (this.$common.isPhoneNumber(this.codeLoginOption.phone)) { // 合法手机号
        const data = {
          account: this.codeLoginOption.phone,
          // dialCode: this.$refs.codeLogInTel.activeCountry.dialCode,
          // system: 'mine',
        };
        this.$api.sendPhoneCode(data).then(res => { // 获取验证码
          const element = this.$refs.codeLoginGetCode;
          this.$common.countdown(element, this.codeLoginGetCodeInterval);
          this.$toast('发送成功，验证码十分钟内有效!');
        }).catch(err => {
          if (err.msg) {
            this.$toast(err.msg);
          } else {
            this.$toast('发送失败');
          }
        });
      } else {
        this.$toast('请输入正确的手机号');
      }
    },
    codeLoginEvent() { // 验证码登录
      if (this.codeLoginOption.phone && this.codeLoginOption.code) {
        this.codeLoginBusy = true;
        const data = {
          system: 'mine',
          mineType: 'bhd',
          // dialCode: this.$refs.codeLogInTel.activeCountry.dialCode,
          code: this.codeLoginOption.code,
          phone: this.codeLoginOption.phone,
        };
        this.loading = true;
        this.$api.userCodeLogin(data).then(res => {
          this.codeLoginBusy = false;
          this.$store.dispatch('setUserInfo', res).then(() => {
            this.$toast('登录成功');
            this.close();
            this.resetNavData();
            setTimeout(() => {
              location.reload();
            }, 2000);
          }).catch(err => {
            console.log(err);
          });
        }).catch(err => {
          this.codeLoginBusy = false;
          if (err.msg) {
            this.$toast(err.msg);
          }
        });
      } else {
        this.$toast('请输入手机号及验证码！');
      }
    },
    passwordLoginEvent() { // 账号密码登录
      // accountLoginOption.account accountLoginOption.password
      if (this.accountLoginOption.account && this.accountLoginOption.password) {
        this.acountLoginBusy = true;
        const data = {
          system: 'mine',
          mineType: 'bhd',
          account: this.accountLoginOption.account,
          pwd: this.$md5(this.accountLoginOption.password),
        };
        this.$api.userAcountLogin(data).then(res => {
          this.acountLoginBusy = false;
          this.$store.dispatch('setUserInfo', res).then(() => {
            this.$toast('登录成功');
            this.close();
            this.resetNavData();
            setTimeout(() => {
              location.reload();
            }, 500);
          }).catch(err => {
            console.log(err);
          });
        }).catch(err => {
          this.acountLoginBusy = false;
          if (err.msg) {
            this.$toast(err.msg);
          }
        });
      } else {
        this.$toast('请输入账号密码！');
      }
    },
    passwordLoginBlur(e) {
      if (e.target.value && !this.$common.isPassword(e.target.value)) {
        e.target.parentNode.nextElementSibling.children[0].style.display = 'block';
      }
      this.isCapsLock = false;
      this.resetPosition();
    },
    accountBlur(e) {
      if (e.target.value && this.$common.isPhoneNumber(e.target.value)) {
        // 发送请求判断该手机是否有注册过 同步请求
        this.backToOption.type = 'phone';
        this.signInFor = '手机号';
      } else if (e.target.value && this.$common.isMail(e.target.value)) {
        // 发送请求判断该邮箱是否有注册过 同步请求
        this.backToOption.type = 'mail';
        this.signInFor = '邮箱';
      } else if (e.target.value) {
        // this.$toast("请输入正确的手机号或邮箱");
        e.target.parentNode.nextElementSibling.children[0].style.display = 'block';
      }
      this.resetPosition();
    },
    backToGetCode() {
      const data = {
        account: this.backToOption.account,
      };
      if (this.backToOption.type == 'phone') { // 发送手机验证码
        console.log('发送手机验证码');
        console.log(this.backToOption.account);
        this.$api.sendPhoneCode(data).then(res => { // 获取验证码
          const element = this.$refs.backToGetCode;
          this.$common.countdown(element, this.backToGetCodeInterval);
          this.$toast('发送成功，验证码十分钟内有效!');
        }).catch(err => {
          if (err.msg) {
            this.$toast(err.msg);
          } else {
            this.$toast('发送失败');
          }
        });
      } else if (this.backToOption.type == 'mail') { // 发送邮箱验证码
        this.$api.sendPhoneCode(data).then(res => { // 获取验证码
          const element = this.$refs.backToGetCode;
          this.$common.countdown(element, this.backToGetCodeInterval);
          this.$toast('发送成功，验证码十分钟内有效!');
        }).catch(err => {
          if (err.msg) {
            this.$toast(err.msg);
          } else {
            this.$toast('发送失败');
          }
        });
      } else {
        this.$toast('请输入正确的手机号或邮箱');
      }
    },
    backToPasswordBlur(e) {
      if (e.target.value && !this.$common.isPassword(e.target.value)) {
        e.target.parentNode.nextElementSibling.children[0].style.display = 'block';
      }
      this.isCapsLock = false;
      this.resetPosition();
    },
    backToEvent() { // 找回密码
      console.log('找回密码');
      if (this.backToOption.account && this.backToOption.newPassword) {
        this.backToBusy = true;
        const data = {
          system: 'mine',
          account: this.backToOption.account,
          code: this.backToOption.code,
          pwd: this.$md5(this.backToOption.newPassword),
        };
        console.log(data);
        this.$api.userRetrievePassword(data).then(res => {
          this.$toast('设置成功，请重新登录！');
          this.option.type = 'accountLogIn';
          this.backToBusy = false;
        }).catch(err => {
          this.backToBusy = false;
          this.$toast(err.msg);
        });
      } else {
        this.$toast('请输入账号密码！');
      }
    },
  },
};
</script>
<style lang="less">
.reg-popup {
  .vue-tel-input {
    border: 0 !important;
    outline: none !important;
    box-shadow: none !important;
    &:focus {
      outline: none !important;
      box-shadow: none !important;
    }
    .dropdown {
      &:focus {
        border: 0;
        outline: none !important;
        box-shadow: none !important;
      }
    }
  }
}
</style>

<style lang="less" scoped>
@import url("./regPopup");
</style>
