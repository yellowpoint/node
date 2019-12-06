import Vue from 'vue';
import router from '@/router';
import store from '@/store/index';
import throwIn from './throwIn';

// 实例
let instance;
/**
 * 弹窗主体函数，将实例加载到 DOM 中
 * @param {Object} options 组件 props 值
 */
const ThrowIn = (options = {}) => {
  if (document.body.clientWidth > 768) {
    $('body').css({
      overflow: 'hidden',
      'padding-right': '17px',
    });
    $('html').css({
      overflow: 'hidden',
    });
    $('#longNavType').css({
      right: '17px',
    });
  } else {
    $('body').css({
      overflow: 'hidden',
    });
    $('html').css({
      overflow: 'hidden',
    });
  }
  if (instance && document.querySelector('.throwIn-popup')) {
    instance.$children[0].orderInfo = options.popupInfo;
    instance.$children[0].cbFun = options.cb;
    document.querySelector('.throwIn-popup').style.display = 'flex';
    const vm = instance.$el;
    vm.classList.remove('fadeOut');
    vm.classList.add('fadeIn');
    return;
  }
  instance = new Vue({
    render(h) {
      return h(throwIn, {
        props: options,
      });
    },
    store,
    router,
  });
  // 渲染组件
  const component = instance.$mount();
  document.body.appendChild(component.$el);

  return {
    vm: instance.$children[0],
    renderComponent: component,
  };
};

/**
 * 手动关闭
 */
ThrowIn.destroy = () => {
  try {
    const el = document.querySelector('.throwIn-popup');
    el.style.display = 'none';
    el.remove();
    return true;
  } catch (err) {
    throw err;
  }
};

export default ThrowIn;
