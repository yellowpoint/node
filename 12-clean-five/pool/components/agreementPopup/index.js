import Vue from "vue";
import router from "@/router";
import store from "@/store/index";
import agreementPopup from "./agreementPopup";

// 实例
let instance;
/**
 * 弹窗主体函数，将实例加载到 DOM 中
 * @param {Object} options 组件 props 值
 */
const AgreementPopup = (options = {}) => {
    if (instance) {
        document.querySelector(".agreement-popup").style.display = "flex";
        let vm = instance.$el;
        vm.classList.remove("fadeOut");
        vm.classList.add("fadeIn");
        return;
    }
    instance = new Vue({
        render(h) {
            return h(agreementPopup, {
                props: options,
            });
        },
        store,
        router
    });
    // 渲染组件
    const component = instance.$mount();
    document.body.appendChild(component.$el);

    return {
        vm: instance.$children[0],
        renderComponent: component
    };
};

/**
 * 手动关闭
 */
AgreementPopup.destroy = () => {
    try {
        const el = document.querySelector(".agreement-popup");
        el.style.display = "none";
        return true;
    } catch (err) {
        throw err;
    }
};

Vue.prototype.$AgreementPopup = AgreementPopup; // 载入 Vue 全局中

export default AgreementPopup;
