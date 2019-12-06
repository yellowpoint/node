import Vue from "vue";
import router from "@/router";
import store from "@/store/index";
import setPopup from "./setPopup";

// 实例
let instance;
/**
 * 弹窗主体函数，将实例加载到 DOM 中
 * @param {Object} options 组件 props 值
 */
const SetPopup = (options = {}) => {
    if(document.body.clientWidth>768){
        $("body").css({"overflow":"hidden","padding-right":"17px"});
        $("html").css({"overflow":"hidden"});
        $("#longNavType").css({"right":"17px"});
        
    }else{
        $("body").css({"overflow":"hidden"});
        $("html").css({"overflow":"hidden"});
    }
    if (instance) {
        instance.$children[0].type = options.popupType;
        instance.$children[0].updateAddressCallBack = options.updateAddressCB;
        document.querySelector(".set-popup").style.display = "block";
        let vm = instance.$el;
        vm.classList.remove("fadeOut");
        vm.classList.add("fadeIn");
        return;
    }
    instance = new Vue({
    render(h) {
        return h(setPopup, {
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
SetPopup.destroy = () => {
    try {
        const el = document.querySelector(".set-popup");
        el.style.display = "none";
        return true;
    } catch (err) {
        throw err;
    }
};

Vue.prototype.$SetPopup = SetPopup; // 载入 Vue 全局中

export default SetPopup;
