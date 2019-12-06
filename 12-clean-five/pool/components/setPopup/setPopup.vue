<!-- 设置组件 -->
<template>
  <div
    class="set-popup fadeIn"
    ref="setPopup"
    @click="close()"
    style="animation-duration: 0.3s;"
  >
    <div
      class="content-wrap"
      ref="contentWrap"
      @click.stop=hideDropdown($event)
    >
      <div class="header">
        <div class="title">{{titleText}}</div>
        <div
          class="close"
          @click="close()"
        >&times;</div>
      </div>
      <!-- 重置用户名 -->
      <div
        v-show="type == 'resetUserName'"
        class="popupContent"
      >
        <div class="form-item form-item-level">
          <div class="item-label">用户名</div>
          <div class="item-content flex1">
            <input
              type="text"
              class="form-input"
              v-model.trim="resetUserName.newUserName"
              @blur="userNameBlur($event)"
              @input="setUserNameOninputEvent()"
              maxlength="10"
              @keyup.enter="setUserNameRequest"
              placeholder="请输入新用户名，6~10位字母数字或组合"
              @focus="clearTimer"
            >
            <button
              ref="setUserName"
              class="miniBtn"
              @click="setUserNameRequest"
            >确认修改</button>
          </div>
        </div>
      </div>
      <!-- 设置邮箱 -->
      <div
        v-show="type == 'setMail'"
        class="popupContent"
      >
        <div class="form-item form-item-level">
          <div class="item-label">邮箱</div>
          <div class="item-content">
            <input
              type="text"
              class="form-input"
              v-model.trim="setMail.newMail"
              @focus="clearTimer"
              @blur="mailBlur($event)"
              @keyup.enter="setMailRequest"
              placeholder="请输入邮箱地址"
            >
            <button
              ref="setUserName"
              class="miniBtn"
              @click="setMailRequest"
            >确定</button>
          </div>
        </div>
      </div>
      <!-- 重置邮箱 -->
      <div
        v-show="type == 'resetMail'"
        class="popupContent"
      >
        <div class="form-item form-item-level">
          <div class="item-label">手机号</div>
          <div class="item-content"><span v-if="userInfo">+{{userInfo.dialCode}}</span>&nbsp;{{userInfo ? userInfo.mobile : ''}}</div>
        </div>
        <div class="form-item">
          <div class="item-label">图形验证码</div>
          <div class="item-content">
            <input
              type="text"
              class="form-input"
              v-model.trim="resetMail.imgCode"
              @blur="imgCodeBlur($event)"
              @focus="imgCodeFocus()"
              maxlength="4"
              placeholder="请输入图形验证码"
            >
            <i
              v-show="isValidateIcon"
              class="iconfont icon"
              :class="isTrue ? 'icon-zhengque' : 'icon-cuowu'"
            >

            </i>
            <div
              class="codeImg"
              @click="setMailFreshImgCode"
            ><img
                :src="resetMailImgCode"
                alt=""
              ></div>
          </div>
        </div>
        <div class="form-item">
          <div class="item-label">手机验证码</div>
          <div class="item-content">
            <input
              type="number"
              class="form-input"
              v-model.trim="resetMail.phoneCode"
              oninput="if(value.length>6)value=value.slice(0,6)"
              pattern="[0-9]*"
              @blur="phoneCodeBlur($event)"
              maxlength="6"
              placeholder="请输入手机验证码"
              @focus="clearTimer"
            >
            <button
              ref="setMailSendCode"
              class="miniBtn"
              @click="setMailSendCode"
            >发送验证码</button>
          </div>
        </div>
        <div class="form-item">
          <div class="item-label">安全密码</div>
          <div class="item-content flex1">
            <input
              type="password"
              class="form-input longInput"
              v-model.trim="resetMail.payPassword"
              maxlength="8"
              autocomplete="new-password"
              @focus="clearTimer"
              placeholder="请输入安全密码"
              @blur="resetPosition"
            >
          </div>
        </div>
        <div class="form-item">
          <div class="item-label">新邮箱地址</div>
          <div class="item-content flex1">
            <input
              type="text"
              class="form-input longInput"
              v-model.trim="resetMail.newMail"
              @focus="clearTimer"
              @blur="mailBlur($event)"
              @keyup.enter="setMailOrPhoneRequest(1)"
              @input="listenerOninputEvent(resetMail, 'resetMailSure')"
              placeholder="请输入新邮箱地址"
            >
          </div>
        </div>
        <div class="footer">
          <button
            ref="resetMailSure"
            class="sure"
            @click="setMailOrPhoneRequest(1)"
          >确定</button>
        </div>
      </div>
      <!-- 重置手机 -->
      <div
        v-show="type == 'resetPhone'"
        class="popupContent"
      >
        <div class="form-item form-item-level">
          <div class="item-label">电子邮箱</div>
          <div class="item-content">{{userInfo ? userInfo.email : ''}}</div>
        </div>
        <div class="form-item">
          <div class="item-label">图形验证码</div>
          <div class="item-content">
            <input
              type="text"
              class="form-input"
              v-model.trim="resetPhone.imgCode"
              @blur="imgCodeBlur($event)"
              @focus="imgCodeFocus()"
              maxlength="4"
              placeholder="请输入图形验证码"
            >
            <i
              v-show="isValidateIcon"
              class="iconfont icon"
              :class="isTrue ? 'icon-zhengque' : 'icon-cuowu'"
            >

            </i>
            <div
              class="codeImg"
              @click="setPhoneFreshImgCode"
            ><img
                :src="resetPhoneImgCode"
                alt=""
              ></div>
          </div>
        </div>
        <div class="form-item">
          <div class="item-label">邮箱验证码</div>
          <div class="item-content">
            <input
              type="number"
              class="form-input"
              v-model.trim="resetPhone.mailCode"
              oninput="if(value.length>6)value=value.slice(0,6)"
              pattern="[0-9]*"
              @blur="mailCodeBlur($event)"
              maxlength="6"
              placeholder="请输入邮箱验证码"
              @focus="clearTimer"
            >
            <button
              ref="setPhoneSendCode"
              class="miniBtn"
              @click="setPhoneSendCode"
            >发送验证码</button>
          </div>
        </div>
        <div class="form-item">
          <div class="item-label">安全密码</div>
          <div class="item-content flex1">
            <input
              type="password"
              class="form-input longInput"
              v-model.trim="resetPhone.payPassword"
              maxlength="8"
              autocomplete="new-password"
              placeholder="请输入安全密码"
              @focus="clearTimer"
              @blur="resetPosition"
            >
          </div>
        </div>
        <div class="form-item">
          <div class="item-label">新手机号码</div>
          <div class="item-content flex1">
            <div class="resetTelephoneBox">
              <vue-tel-input
                v-model="resetPhone.newPhone"
                v-bind="resetTelProps"
                ref="resetTelephone"
                @blur="resetPosition"
                @input="listenerOninputEvent(resetPhone, 'resetPhone')"
              >
              </vue-tel-input>
            </div>
          </div>
        </div>
        <div class="footer">
          <button
            ref="resetPhone"
            class="sure"
            @click="setMailOrPhoneRequest(0)"
          >确定</button>
        </div>
      </div>
      <!-- 重置密码 -->
      <div
        v-show="type == 'resetPassword'"
        class="popupContent"
      >
        <div class="form-item form-item-level">
          <div class="item-label">电子邮箱</div>
          <div class="item-content">{{userInfo ? userInfo.email : ''}}</div>
        </div>
        <div class="form-item">
          <div class="item-label">图形验证码</div>
          <div class="item-content">
            <input
              type="text"
              class="form-input"
              v-model.trim="resetPassword.imgCode"
              @blur="imgCodeBlur($event)"
              @focus="imgCodeFocus()"
              maxlength="4"
              placeholder="请输入图形验证码"
            >
            <i
              v-show="isValidateIcon"
              class="iconfont icon"
              :class="isTrue ? 'icon-zhengque' : 'icon-cuowu'"
            >

            </i>
            <div
              class="codeImg"
              @click="setPasswordFreshImgCode"
            ><img
                :src="resetPasswordImgCode"
                alt=""
              ></div>
          </div>
        </div>
        <div class="form-item">
          <div class="item-label">邮箱验证码</div>
          <div class="item-content">
            <input
              type="number"
              class="form-input"
              v-model.trim="resetPassword.mailCode"
              oninput="if(value.length>6)value=value.slice(0,6)"
              pattern="[0-9]*"
              @blur="mailCodeBlur($event)"
              maxlength="6"
              placeholder="请输入邮箱验证码"
              @focus="clearTimer"
            >
            <button
              ref="setPasswordSendCode"
              class="miniBtn"
              @click="setPasswordSendCode"
            >发送验证码</button>
          </div>
        </div>
        <div class="form-item">
          <div class="item-label">新登录密码</div>
          <div class="item-content flex1">
            <input
              type="password"
              class="form-input longInput"
              v-model.trim="resetPassword.newPassword"
              @input="detectCapsLock($event, resetPassword, 'resetPassword')"
              @blur="newPasswordBlur($event)"
              maxlength="18"
              @keyup.enter="setPasswordRequest"
              autocomplete="new-password"
              placeholder="请输入新登录密码"
              @focus="clearTimer"
            >
          </div>
        </div>
        <div class="footer">
          <button
            ref="resetPassword"
            class="sure"
            @click="setPasswordRequest"
          >确定</button>
        </div>
      </div>
      <!-- 重置安全密码 -->
      <div
        v-show="type == 'payPassword'"
        class="popupContent"
      >
        <div class="form-item form-item-level">
          <div class="item-label">电子邮箱</div>
          <div class="item-content">{{userInfo ? userInfo.email : ''}}</div>
        </div>
        <div class="form-item form-item-level">
          <div class="item-label">手机号</div>
          <div class="item-content"><span v-if="userInfo">+{{userInfo.dialCode}}</span>&nbsp;{{userInfo ? userInfo.mobile : ''}}</div>
        </div>
        <div class="form-item">
          <div class="item-label">图形验证码</div>
          <div class="item-content">
            <input
              type="text"
              class="form-input"
              v-model.trim="resetPayPassword.imgCode"
              @blur="imgCodeBlur($event)"
              @focus="imgCodeFocus()"
              maxlength="4"
              placeholder="请输入图形验证码"
            >
            <i
              v-show="isValidateIcon"
              class="iconfont icon"
              :class="isTrue ? 'icon-zhengque' : 'icon-cuowu'"
            >

            </i>
            <div
              class="codeImg"
              @click="setPayPasswordFreshImgCode"
            ><img
                :src="resetPayPasswordImgCode"
                alt=""
              ></div>
          </div>
        </div>
        <div class="form-item">
          <div class="item-label">邮箱验证码</div>
          <div class="item-content">
            <input
              type="number"
              class="form-input"
              v-model.trim="resetPayPassword.mailCode"
              oninput="if(value.length>6)value=value.slice(0,6)"
              pattern="[0-9]*"
              @blur="phoneCodeBlur($event)"
              maxlength="6"
              placeholder="请输入邮箱验证码"
              @focus="clearTimer"
            >
            <button
              ref="setPayPasswordSendMailCode"
              class="miniBtn"
              @click="setPayPasswordSendMailCode"
            >发送验证码</button>
          </div>
        </div>
        <div class="form-item">
          <div class="item-label">手机验证码</div>
          <div class="item-content">
            <input
              type="number"
              class="form-input"
              v-model.trim="resetPayPassword.phoneCode"
              oninput="if(value.length>6)value=value.slice(0,6)"
              pattern="[0-9]*"
              @blur="phoneCodeBlur($event)"
              maxlength="6"
              placeholder="请输入手机验证码"
              @focus="clearTimer"
            >
            <button
              ref="setPayPasswordSendPhoneCode"
              class="miniBtn"
              @click="setPayPasswordSendPhoneCode"
            >发送验证码</button>
          </div>
        </div>
        <div class="form-item">
          <div class="item-label">新安全密码</div>
          <div class="item-content flex1">
            <input
              type="password"
              class="form-input longInput"
              v-model.trim="resetPayPassword.newPayPassword"
              @input="detectCapsLock($event, resetPayPassword, 'resetPayPassword')"
              @blur="newPayPasswordBlur($event)"
              maxlength="8"
              @keyup.enter="setPayPasswordRequest"
              autocomplete="new-password"
              placeholder="请输入安全密码(8位的字母数字组合)"
              @focus="clearTimer"
            >
          </div>
        </div>
        <div class="footer">
          <button
            ref="resetPayPassword"
            class="sure"
            @click="setPayPasswordRequest"
          >确定</button>
        </div>
      </div>

      <!-- 修改钱包地址 -->
      <div
        v-show="type == 'resetAddress'"
        class="popupContent"
      >
        <div class="form-item form-item-level">
          <div class="item-label">电子邮箱</div>
          <div class="item-content">{{userInfo ? userInfo.email : ''}}</div>
        </div>
        <div class="form-item form-item-level">
          <div class="item-label">手机号</div>
          <div class="item-content"><span v-if="userInfo">+{{userInfo.dialCode}}</span>&nbsp;{{userInfo ? userInfo.mobile : ''}}</div>
        </div>
        <div class="form-item">
          <div class="item-label">图形验证码</div>
          <div class="item-content">
            <input
              type="text"
              class="form-input"
              v-model.trim="resetBHDAddress.imgCode"
              @blur="imgCodeBlur($event)"
              @focus="imgCodeFocus()"
              maxlength="4"
              placeholder="请输入图形验证码"
            >
            <i
              v-show="isValidateIcon"
              class="iconfont icon"
              :class="isTrue ? 'icon-zhengque' : 'icon-cuowu'"
            >

            </i>
            <div
              class="codeImg"
              @click="resetBHDAddressFreshImgCode"
            ><img
                :src="resetBHDAddressImgCode"
                alt=""
              ></div>
          </div>
        </div>
        <div class="form-item">
          <div class="item-label">邮箱验证码</div>
          <div class="item-content">
            <input
              type="number"
              class="form-input"
              v-model.trim="resetBHDAddress.mailCode"
              oninput="if(value.length>6)value=value.slice(0,6)"
              pattern="[0-9]*"
              @blur="phoneCodeBlur($event)"
              maxlength="6"
              placeholder="请输入邮箱验证码"
              @focus="clearTimer"
            >
            <button
              ref="resetBHDAddressSendMailCode"
              class="miniBtn"
              @click="resetBHDAddressSendMailCode"
            >发送验证码</button>
          </div>
        </div>
        <div class="form-item">
          <div class="item-label">手机验证码</div>
          <div class="item-content">
            <input
              type="number"
              class="form-input"
              v-model.trim="resetBHDAddress.phoneCode"
              oninput="if(value.length>6)value=value.slice(0,6)"
              pattern="[0-9]*"
              @blur="phoneCodeBlur($event)"
              maxlength="6"
              placeholder="请输入手机验证码"
              @focus="clearTimer"
            >
            <button
              ref="resetBHDAddressSendPhoneCode"
              class="miniBtn"
              @click="resetBHDAddressSendPhoneCode"
            >发送验证码</button>
          </div>
        </div>
        <div class="form-item">
          <div class="item-label">安全密码</div>
          <div class="item-content flex1">
            <input
              type="password"
              class="form-input longInput"
              v-model.trim="resetBHDAddress.payPassword"
              maxlength="8"
              autocomplete="new-password"
              placeholder="请输入安全密码"
              @blur="resetPosition"
              @focus="clearTimer"
            >
          </div>
        </div>
        <div class="form-item">
          <div class="item-label">提现地址</div>
          <div class="item-content flex1">
            <input
              type="text"
              class="form-input longInput"
              v-model.trim="resetBHDAddress.BHDAddress"
              placeholder="请输入钱包地址"
              @blur="resetPosition"
              @focus="clearTimer"
              @input="listenerOninputEvent(resetBHDAddress, 'resetAddress')"
            >
          </div>
        </div>
        <div class="footer">
          <button
            ref="resetAddress"
            class="sure"
            @click="updataWalletAddress"
          >确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { host } from '@/config';
// 二维码
import QRCode from 'qrcode';
import VueTelInput from 'vue-tel-input';
import commonMixins from '@/mixins/common';

export default {

  name: 'setPopup',

  mixins: [commonMixins],

  components: {
    QRCode,
    VueTelInput,
  },

  props: {
    popupType: { // 弹窗类型
      type: String,
      default: '',
    },
    updateAddressCB: { // 修改BHD地址成功的回调
      type: [Object, Function],
      default: null,
    },
    mineType: { // 币种
      type: String,
      default: '',
    },
    userWalletAddr: { // 提现地址
      type: String,
      default: '',
    },
  },
  data() {
    return {
      type: '',
      coinType: '',
      isTrue: false,
      isValidateIcon: false, // 显示icon
      titleText: '',
      updateAddressCallBack: null, // 更新BHD地址回调
      timer: null,
      setMail: { // 设置邮箱
        newMail: '',
      },
      resetUserName: { // 重置用户名
        newUserName: '', // 新的用户名
      },
      resetMail: { // 重置邮箱
        imgCode: '',
        phoneCode: '',
        newMail: '',
        payPassword: '',
      },
      resetPhone: { // 重置用户手机号
        imgCode: '',
        mailCode: '',
        newPhone: '',
        payPassword: '',
      },
      resetPassword: { // 重置登录密码
        imgCode: '',
        mailCode: '',
        newPassword: '',
      },
      resetPayPassword: { // 重置安全密码
        imgCode: '',
        phoneCode: '',
        mailCode: '',
        newPayPassword: '',
      },
      resetBHDAddress: { // 设置BHD钱包地址
        imgCode: '',
        phoneCode: '',
        mailCode: '',
        payPassword: '',
        BHDAddress: '',
      },
      setUserNameBusy: false, // 正在设置用户名 忙碌...
      setAccountBusy: false, // 正在设置邮箱 忙碌...
      setPhoneBusy: false, // 正在设置手机 忙碌...
      setPasswordBusy: false, // 正在设置密码 忙碌...
      setMailInterval: null,
      setPhoneInterval: null,
      setPasswordInterval: null,
      setPayPasswordPhoneInterval: null,
      setPayPasswordMailInterval: null,
      resetBHDAddressPhoneInterval: null,
      isCapsLock: false,
      resetMailImgCode: '',
      resetPasswordImgCode: '',
      resetPayPasswordImgCode: '',
      resetPhoneImgCode: '',
      resetBHDAddressImgCode: '',
      random: '', // 随机数
      resetTelProps: {
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
        name: 'resetTelephone',
        inputId: 'resetTelephone',
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
    userInfo() { // 用户信息
      return this.$store.getters.userInfo;
    },
  },

  watch: {
    type(newVal) {
      switch (newVal) {
        case 'resetUserName':
          this.titleText = '修改用户名';
          break;
        case 'resetPassword':
          this.titleText = '修改登陆密码';
          this.setPasswordFreshImgCode();
          break;
        case 'resetMail':
          this.titleText = '修改电子邮箱';
          this.setMailFreshImgCode();
          break;
        case 'resetPhone':
          this.titleText = '修改手机号码';
          this.setPhoneFreshImgCode();
          break;
        case 'payPassword':
          this.titleText = '修改安全密码';
          this.setPayPasswordFreshImgCode();
          break;
        case 'resetAddress':
          this.titleText = '修改提现地址';
          this.resetBHDAddressFreshImgCode();
          break;
        default:
          this.titleText = '';
          break;
      }
    },
  },

  created() {
    this.type = this.popupType; // 只执行一次，第一次执行将静态props赋值给data,通过data实时渲染dom,静态props无法实时渲染
    this.coinType = this.mineType; // 只执行一次，第一次执行将静态props赋值给data,通过data实时渲染dom,静态props无法实时渲染
    this.updateAddressCallBack = this.updateAddressCB;
    this.resetBHDAddress.BHDAddress = this.userWalletAddr;
  },

  mounted() {
    for (const item of this.$refs.resetTelephone.sortedCountries) {
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
      document.getElementById('resetTelephone').addEventListener('focus', () => {
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
        const el = document.querySelector('.set-popup');
        if (el) {
          el.style.display = 'none';
          this.isValidateIcon = false;
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
      this.$refs.setPopup.classList.add('fadeOut');
      this.$refs.setPopup.classList.remove('fadeIn');
      setTimeout(() => { // 释放弹窗
        this.destroy();
      }, 300);
    },
    hideDropdown(e) {
      if (e.target.className != 'dropdown' && e.target.className != 'selection' && e.target.className != 'iti-flag cn' && e.target.className != 'country-code' && e.target.className != 'dropdown-arrow') {
        this.$refs.resetTelephone.open = false;
      }
    },
    clearInputValue() {
      Object.keys(this.setMail).forEach(key => {
        this.setMail[key] = '';
      });
      Object.keys(this.resetUserName).forEach(key => {
        this.resetUserName[key] = '';
      });
      Object.keys(this.resetMail).forEach(key => {
        this.resetMail[key] = '';
      });
      Object.keys(this.resetPhone).forEach(key => {
        this.resetPhone[key] = '';
      });
      Object.keys(this.resetPassword).forEach(key => {
        this.resetPassword[key] = '';
      });
      Object.keys(this.resetPayPassword).forEach(key => {
        this.resetPayPassword[key] = '';
      });
      Object.keys(this.resetBHDAddress).forEach(key => {
        if (key != 'BHDAddress') {
          this.resetBHDAddress[key] = '';
        }
      });
      this.$refs.resetMailSure.classList.remove('allow');
      this.$refs.resetPhone.classList.remove('allow');
      this.$refs.resetPassword.classList.remove('allow');
      this.$refs.resetPayPassword.classList.remove('allow');
      this.$refs.resetAddress.classList.remove('allow');
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
    userNameBlur(e) { // 用户名失焦
      if (e.target.value && e.target.value.length < 6 || e.target.value.length > 16) {
        this.$toast({
          toastType: 'warning',
          showIcon: true,
          text: '用户名为6~10位字符',
        });
      }
      this.resetPosition();
    },
    imgCodeFocus() { // 图形验证码聚焦
      this.isValidateIcon = false;
      this.clearTimer();
    },
    imgCodeBlur(e) { // 图形验证码失焦
      if (e.target.value && !/^[a-zA-Z0-9]{4}$/.test(e.target.value)) {
        this.isValidateIcon = true;
        this.isTrue = false;
      } else if (e.target.value) {
        let graphicCode = '';
        switch (this.type) {
          case 'resetPassword':
            graphicCode = this.resetPassword.imgCode;
            break;
          case 'resetMail':
            graphicCode = this.resetMail.imgCode;
            break;
          case 'resetPhone':
            graphicCode = this.resetPhone.imgCode;
            break;
          case 'payPassword':
            graphicCode = this.resetPayPassword.imgCode;
            break;
          case 'resetAddress':
            graphicCode = this.resetBHDAddress.imgCode;
            break;
          default:
            graphicCode = '';
            break;
        }
        this.validateImgCode(graphicCode);
      }
      this.resetPosition();
    },
    validateImgCode(val) { // 校验图形验证码
      const data = {
        random: this.random,
        graphicCode: val,
      };
      this.$api.validateImgCode(data).then(res => {
        this.isValidateIcon = true;
        this.isTrue = res;
        if (!res) {
          switch (this.type) {
            case 'resetPassword':
              this.setPasswordFreshImgCode();
              break;
            case 'resetMail':
              this.setMailFreshImgCode();
              break;
            case 'resetPhone':
              this.setPhoneFreshImgCode();
              break;
            case 'payPassword':
              this.setPayPasswordFreshImgCode();
              break;
            case 'resetAddress':
              this.resetBHDAddressFreshImgCode();
              break;
            default:
              break;
          }
        }
      }).catch(err => {
        console.log('校验图形验证码失败', err);
        switch (this.type) {
          case 'resetPassword':
            this.setPasswordFreshImgCode();
            break;
          case 'resetMail':
            this.setMailFreshImgCode();
            break;
          case 'resetPhone':
            this.setPhoneFreshImgCode();
            break;
          case 'payPassword':
            this.setPayPasswordFreshImgCode();
            break;
          case 'resetAddress':
            this.resetBHDAddressFreshImgCode();
            break;
          default:
            break;
        }
      });
    },
    phoneCodeBlur(e) { // 手机验证码失焦
      if (e.target.value && !/^\d{6}$/.test(e.target.value)) {
        this.$toast({
          toastType: 'error',
          showIcon: true,
          text: '手机验证码输入错误',
          duration: 2000,
        });
      }
      this.resetPosition();
    },
    mailBlur(e) { // 新邮箱失焦
      if (e.target.value && !this.$common.isMail(e.target.value)) {
        this.$toast({
          toastType: 'error',
          showIcon: true,
          text: '请输入正确的邮箱地址',
          duration: 2000,
        });
      }
      this.resetPosition();
    },
    mailCodeBlur(e) { // 邮箱验证码失焦
      if (e.target.value && !/^\d{6}$/.test(e.target.value)) {
        this.$toast({
          toastType: 'error',
          showIcon: true,
          text: '邮箱验证码输入错误',
          duration: 2000,
        });
      }
      this.resetPosition();
    },
    newPhoneBlur(e) {
      if (e.target.value && !this.$common.isPhoneNumber(e.target.value)) {
        this.$toast({
          toastType: 'error',
          showIcon: true,
          text: '请输入正确的手机号',
          duration: 2000,
        });
      }
      this.resetPosition();
    },
    newPasswordBlur(e) { // 重置密码框失焦
      if (e.target.value && !this.$common.isPassword(e.target.value)) {
        this.$toast({
          toastType: 'error', // 提示类型 String 可选值 'success'、'error、'warning'、 ''; 默认为 ''
          showIcon: true, // 是否显示图标 Boolean 可选值 true false; 默认为 false
          text: '密码为6~18位字符，<br/>只能包含英文字母、数字、下划线', // 文本内容 String ; 默认为 ''
          duration: 2000, // 窗体持续时间 Number 默认为 2000 单位毫秒 6~18位字符，只能包含英文字母、数字、下划线
        });
      }
      this.resetPosition();
    },
    newPayPasswordBlur(e) { // 重置安全密码失焦
      if (e.target.value && !/^[a-zA-Z0-9]{8}$/.test(e.target.value)) {
        this.$toast({
          toastType: 'error',
          showIcon: true,
          text: '请输入8位的字母、数字组合',
          duration: 2000,
        });
      }
      this.resetPosition();
    },
    setUserNameOninputEvent() { // 用户名
      if (this.resetUserName.newUserName) {
        if (!/^[a-zA-Z0-9]+$/.test(this.resetUserName.newUserName)) {
          this.resetUserName.newUserName = '';
        }
      }
    },
    detectCapsLock(e, obj, ref) { // 大写锁定
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
      if (obj) {
        this.listenerOninputEvent(obj, ref);
      }
    },
    /**
     * 设置用户名开始
    */
    setUserNameRequest() { // 发送设置用户名请求
      if (this.resetUserName.newUserName && this.resetUserName.newUserName.length >= 6 && this.resetUserName.newUserName.length <= 10) {
        // 调用设置用户名接口
        const data = {
          userName: this.resetUserName.newUserName,
        };
        this.$api.setUserName(data).then(res => {
          this.destroy();
          this.$toast('用户名修改成功！');
          this.resetUserName.newUserName = '';
          this.commonInitUserProfile(); // 更新用户信息
        }).catch(err => {
          console.log('修改用户名失败', err);
        });
      } else {
        if (this.$toast) {
          this.$toast.destroy();
        }
        this.$toast('请输入正确的用户名');
      }
    },
    /**
     * 设置用户名结束
    */
    /**
     * 设置新邮箱开始
    */
    getRandom(n, m) { // 生成随机数
      // n-m区间
      const c = m - n + 1;
      const number = String(Math.floor(Math.random() * c + n));
      return number;
    },
    // 得到图片验证码
    getImgCode() {
      // 4位随机数
      this.random = this.getRandom(1000, 9999);
      // 请求图片验证码
      const imgCodeSrc = host + '/vbhd/other/validatecode?random=' + this.random;
      return imgCodeSrc;
    },
    setMailFreshImgCode() { // 重置邮箱手动刷新图形验证码
      this.resetMailImgCode = this.getImgCode();
    },
    setMailSendCode() { // 设置发送验证码
      // 调用获取手机验证码接口
      const data = {
        account: 1,
        system: 'mine',
      };
      this.$api.sendPhoneCode(data).then(res => {
        this.$toast('发送成功！');
        const element = this.$refs.setMailSendCode;
        this.$common.countdown(element, this.setMailInterval);
        console.log('获取手机验证码', res);
      }).catch(err => {
        console.log('获取手机验证码失败', err);
        if (err.msg) {
          this.$toast(err.msg);
        } else {
          this.$toast('发送失败');
        }
      });
    },
    setMailOrPhoneRequest(val) { // 发送设置邮箱或者手机请求
      if (this.setAccountBusy) { // 避免双击重复发送请求
        return;
      }
      this.setAccountBusy = true;
      if (val) {
        if (!this.resetMail.imgCode || !this.resetMail.phoneCode || !this.$common.isMail(this.resetMail.newMail) || !this.resetMail.payPassword) {
          this.$toast('请填写完整的信息！');
          this.setAccountBusy = false;
          return;
        }
      } else {
        if (!this.resetPhone.imgCode || !this.resetPhone.mailCode || !this.$common.isPhoneNumber(this.resetPhone.newPhone) || !this.resetPhone.payPassword) {
          this.$toast('请填写完整的信息！');
          this.setAccountBusy = false;
          return;
        }
      }
      const data = {
        system: 'mine',
        account: val ? 1 : 2,
        graphicCode: val ? this.resetMail.imgCode : this.resetPhone.imgCode,
        random: this.random,
        code: val ? this.resetMail.phoneCode : this.resetPhone.mailCode,
        dialCode: this.$refs.resetTelephone.activeCountry.dialCode,
        newAccount: val ? this.resetMail.newMail : this.resetPhone.newPhone,
        payPwd: val ? this.$md5(this.resetMail.payPassword) : this.$md5(this.resetPhone.payPassword),
      };
      this.$api.setPhoneOrMail(data).then(res => {
        this.setAccountBusy = false;
        this.close();
        this.resetMail.imgCode = '';
        this.resetPhone.imgCode = '';
        this.resetMail.phoneCode = '';
        this.resetPhone.mailCode = '';
        this.resetMail.newMail = '';
        this.resetPhone.newPhone = '';
        this.commonInitUserProfile(); // 更新用户信息
        if (val) { // 刷新图形验证码
          this.$toast('绑定的邮箱修改成功！');
          this.setMailFreshImgCode();
        } else {
          this.$toast('绑定的手机号修改成功！');
          this.setPhoneFreshImgCode();
        }
      }).catch(err => {
        this.setAccountBusy = false;
        this.isValidateIcon = false;
        if (val) { // 刷新图形验证码
          this.setMailFreshImgCode();
        } else {
          this.setPhoneFreshImgCode();
        }
        console.log('设置邮箱或手机验失败', err);
      });
    },
    /**
     * 设置新邮箱结束
    */

    /**
     * 设置新手机开始
    */
    setPhoneFreshImgCode() { // 手动刷新图形验证码
      this.resetPhoneImgCode = this.getImgCode();
    },
    setPhoneSendCode() {
      const data = {
        account: 2,
        system: 'mine',
      };
      this.$api.sendPhoneCode(data).then(res => {
        this.$toast('发送成功！');
        const element = this.$refs.setPhoneSendCode;
        this.$common.countdown(element, this.setPhoneInterval);
        console.log('获取邮箱验证码', res);
      }).catch(err => {
        console.log('获取邮箱验证码失败', err);
        if (err.msg) {
          this.$toast(err.msg);
        } else {
          this.$toast('发送失败');
        }
      });
    },
    // setPhoneRequest() { //发送设置手机请求

    // },
    /**
     * 设置新手机结束
    */

    /**
     * 设置新密码开始
    */
    setPasswordFreshImgCode() { // 手动刷新图形验证码
      this.resetPasswordImgCode = this.getImgCode();
    },
    setPasswordSendCode() { // 发送验证码
      const data = {
        account: 2,
        system: 'mine',
      };
      this.$api.sendPhoneCode(data).then(res => {
        this.$toast('发送成功！');
        const element = this.$refs.setPasswordSendCode;
        this.$common.countdown(element, this.setPasswordInterval);
        console.log('获取邮箱验证码', res);
      }).catch(err => {
        console.log('获取邮箱验证码失败', err);
        if (err.msg) {
          this.$toast(err.msg);
        } else {
          this.$toast('发送失败');
        }
      });
    },
    setPasswordRequest() { // 发送设置密码请求
      if (!this.resetPassword.imgCode || !this.resetPassword.mailCode || !this.$common.isPassword(this.resetPassword.newPassword)) {
        return;
      }
      const data = {
        system: 'mine',
        account: this.userInfo.email ? 2 : 1,
        graphicCode: this.resetPassword.imgCode,
        random: this.random,
        code: this.resetPassword.mailCode,
        pwd: this.$md5(this.resetPassword.newPassword),
      };
      this.$api.setUserPassword(data).then(res => {
        this.resetPassword.imgCode = '';
        this.resetPassword.mailCode = '';
        this.resetPassword.newPassword = '';
        this.$toast('密码修改成功,请重新登录！');
        this.destroy();
        this.$router.push('/index');
        this.$store.dispatch('setUserInfo', -1).then(res2 => {
          this.$RegPopup({
            popupType: 'accountLogIn',
          });
        });
        this.setPasswordFreshImgCode(); // 刷新图形验证码
      }).catch(err => {
        this.resetPassword.imgCode = '';
        this.resetPassword.mailCode = '';
        this.resetPassword.newPassword = '';
        console.log('设置密码失败', err);
        this.isValidateIcon = false;
        this.setPasswordFreshImgCode(); // 刷新图形验证码
      });
    },
    /**
     * 设置新密码结束
    */
    /**
     * 设置安全密码开始
    */
    setPayPasswordFreshImgCode() { // 手动刷新图形验证码
      this.resetPayPasswordImgCode = this.getImgCode();
    },
    setPayPasswordSendMailCode() {
      const data = {
        account: 2,
        system: 'mine',
      };
      this.$api.sendPhoneCode(data).then(res => {
        this.$toast('发送成功！');
        const element = this.$refs.setPayPasswordSendMailCode;
        this.$common.countdown(element, this.setPayPasswordMailInterval);
        console.log('获取邮箱验证码', res);
      }).catch(err => {
        console.log('获取邮箱验证码失败', err);
        if (err.msg) {
          this.$toast(err.msg);
        } else {
          this.$toast('发送失败！');
        }
      });
    },
    setPayPasswordSendPhoneCode() { // 设置安全密码 发送手机验证码
      const data = {
        account: 1,
        system: 'mine',
      };
      this.$api.sendPhoneCode(data).then(res => {
        this.$toast('发送成功！');
        const element = this.$refs.setPayPasswordSendPhoneCode;
        this.$common.countdown(element, this.setPayPasswordPhoneInterval);
        console.log('获取手机验证码', res);
      }).catch(err => {
        console.log('获取手机验证码失败', err);
        if (err.msg) {
          this.$toast(err.msg);
        } else {
          this.$toast('发送失败！');
        }
      });
    },
    setPayPasswordRequest() { // 设置安全密码
      if (!this.resetPayPassword.imgCode || !this.resetPayPassword.phoneCode || !/^[a-zA-Z0-9]{8}$/.test(this.resetPayPassword.newPayPassword)) {
        return;
      }
      const data = {
        system: 'mine',
        phone: 1,
        mail: 2,
        graphicCode: this.resetPayPassword.imgCode,
        random: this.random,
        code: this.resetPayPassword.phoneCode,
        mailCode: this.resetPayPassword.mailCode,
        payPwd: this.$md5(this.resetPayPassword.newPayPassword),
      };
      this.$api.setUserPayPassword(data).then(res => {
        this.resetPayPassword.imgCode = '';
        this.resetPayPassword.phoneCode = '';
        this.resetPayPassword.mailCode = '';
        this.resetPayPassword.newPayPassword = '';
        this.commonInitUserProfile(); // 更新用户信息
        this.$toast('安全密码修改成功！');
        this.close();
        this.setPayPasswordFreshImgCode(); // 刷新图形验证码
      }).catch(err => {
        this.resetPayPassword.imgCode = '';
        this.resetPayPassword.phoneCode = '';
        this.resetPayPassword.mailCode = '';
        this.resetPayPassword.newPayPassword = '';
        console.log('设置密码失败', err);
        this.isValidateIcon = false;
        this.setPayPasswordFreshImgCode(); // 刷新图形验证码
      });
    },
    /**
     * 设置安全密码结束
    */
    setMailRequest() { // 设置邮箱
      if (!this.$common.isMail(this.setMail.newMail)) {
        return;
      }
      const data = {
        account: this.setMail.newMail,
      };
      console.log(data);
      this.$api.setMail(data).then(res => {
        console.log('设置邮箱', res);
        this.destroy();
        this.$toast('邮箱设置成功！');
        this.commonInitUserProfile(); // 更新用户信息
      }).catch(err => {
        this.$toast('发送失败！');
        console.log('设置邮箱', err);
      });
    },
    /**
     * 设置BHD钱包地址开始
    */
    resetBHDAddressFreshImgCode() { // 手动刷新图形验证码
      this.resetBHDAddressImgCode = this.getImgCode();
    },
    resetBHDAddressSendMailCode() { // 设置BHD钱包地址 发送邮箱验证码
      const data = {
        account: 2,
        system: 'mine',
      };
      this.$api.sendPhoneCode(data).then(res => {
        this.$toast('发送成功！');
        const element = this.$refs.resetBHDAddressSendMailCode;
        this.$common.countdown(element, this.resetBHDAddressMailInterval);
        console.log('获取邮箱验证码', res);
      }).catch(err => {
        console.log('获取邮箱验证码失败', err);
        if (err.msg) {
          this.$toast(err.msg);
        } else {
          this.$toast('发送失败！');
        }
      });
    },
    resetBHDAddressSendPhoneCode() { // 设置BHD钱包地址 发送手机验证码
      const data = {
        account: 1,
        system: 'mine',
      };
      this.$api.sendPhoneCode(data).then(res => {
        this.$toast('发送成功！');
        const element = this.$refs.resetBHDAddressSendPhoneCode;
        this.$common.countdown(element, this.resetBHDAddressPhoneInterval);
        console.log('获取手机验证码', res);
      }).catch(err => {
        console.log('获取手机验证码失败', err);
        if (err.msg) {
          this.$toast(err.msg);
        } else {
          this.$toast('发送失败！');
        }
      });
    },
    updataWalletAddress() { // 修改用户钱包地址
      if (!this.resetBHDAddress.imgCode) {
        this.$toast('请输入图形验证码！');
        return;
      } else if (!this.resetBHDAddress.mailCode) {
        this.$toast('请输入邮箱验证码！');
        return;
      } else if (!this.resetBHDAddress.phoneCode) {
        this.$toast('请输入手机验证码！');
        return;
      } else if (!/^[a-zA-Z0-9]{8}$/.test(this.resetBHDAddress.payPassword)) {
        this.$toast('请输入正确的安全密码！');
        return;
      }
      const data = {
        payPwd: this.$md5(this.resetBHDAddress.payPassword),
      };
      this.$api.checkPayPassword(data).then(res => { // 校验安全密码
        console.log('校验安全密码', res);
        if (res) { // 校验通过  发送修改地址的请求
          const data2 = {
            mineType: this.coinType,
            system: 'mine',
            random: this.random,
            imgCode: this.resetBHDAddress.imgCode,
            mailCode: this.resetBHDAddress.mailCode,
            phoneCode: this.resetBHDAddress.phoneCode,
            newAddress: this.resetBHDAddress.BHDAddress,
            payPwd: this.$md5(this.resetBHDAddress.payPassword),
          };
          this.$api.getUpdateWalletAddr(data2).then(res2 => {
            this.$toast('钱包地址修改成功！');
            this.resetBHDAddress.payPassword = ''; // 修改成功后清除密码
            console.log('获取用户钱包地址', res2);
            if (this.updateAddressCallBack) { // 修改成功执行回调
              this.updateAddressCallBack();
            }
            this.close();
          }).catch(err => {
            this.isValidateIcon = false;
            console.log('获取用户钱包地址出错', err);
          });
        } else {
          this.$toast('安全密码错误，请重新输入！');
        }
      }).catch(err => {
        console.log('校验安全密码出错', err);
      });
    },
    /**
     * 设置BHD钱包地址结束
    */
    listenerOninputEvent(obj, ref) {
      const length = Object.keys(obj).length;
      let count = 0;
      for (const key in obj) {
        if (obj[key]) {
          count += 1;
        }
      }
      if (count == length) {
        this.$refs[ref].classList.add('allow');
      } else {
        this.$refs[ref].classList.remove('allow');
      }
    },
  },
};
</script>

<style lang="less">
.set-popup {
  .vue-tel-input {
    outline: none !important;
    box-shadow: none !important;
    &:focus-within {
      border: 1px solid @color-main !important;
    }
  }
  .dropdown {
    &:focus {
      border: 0;
      outline: none !important;
      box-shadow: none !important;
    }
  }
}
</style>

<style lang="less" scoped>
@import url("./setPopup");
</style>
