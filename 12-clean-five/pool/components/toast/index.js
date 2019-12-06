import Vue from 'vue';
import ToastComponent from './toast';

// 实例
let instance;
/**
 * 主体函数，将实例加载到 DOM 中
 * @param {Object} options 组件 props 值
 */
const Toast = (options = {}) => {
    // 字符串直接显示
    if (typeof options === 'string') {
        const obj = {};
        obj.showIcon = false;
        obj.text = options;
        options = obj;
    }

    instance = new Vue({
        render(h) {
            return h(ToastComponent, {
                props: options,
            });
        },
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

Toast.destroy = () => {
    try {
        const el = document.querySelector('.toast__container');
        if (el) {
            document.body.removeChild(el);
        }
        return true;
    } catch (err) {
        throw err;
    }
};

Vue.prototype.$toast = Toast;       // 载入 Vue 全局中

export default Toast;
