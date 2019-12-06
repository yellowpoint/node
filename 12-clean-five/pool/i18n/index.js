import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from './langs';
import store from '@/store';
import locale from 'element-ui/lib/locale';
// 多语言支持
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: store.getters.langKey || 'zh',
  fallbackLocale: 'zh',
  messages,
});

locale.i18n((key, value) => i18n.t(key, value));


export default i18n;
