<!-- LHD 推广页-->
<template>
  <div class="content lhd">
    <img
      class="lhd_header"
      src="@/assets/images/lhd/header.png"
      alt="LHD"
    >
    <section class="lhd_calc">
      <p class="fontRed">收益率计算：</p>
      <p>指向和撤回指向当天均不计算收益，指向第二天（T+1日）开始计算收益。满30天后（T+30日）按照年化收益率90%计算总收益并发放收益，<span class="fontRed">T+1日30天内撤回指向按照年化收益率30%计算总收益并发放收益。</span></p>
      <p>例如：2019年8月28日指向或充值1000LHD，（T+30天）2019年9月29日计算收益：1000*90%/365*30=73.9726027LHD<br />
        *以上利率从2019年09月12日开始执行（超过2000个的指向建议拆分为多笔指向，方便单独单笔撤回）详情可扫该页面底部客服二维码咨询</p>
    </section>
    <section class="lhd_step">
      <div class="ls_address">
        抵押地址：
        <div class="lsa_code">{{lhdCode}}</div>
        <div
          class="lsa_copy"
          :data-clipboard-text="lhdCode"
          @click="copy"
        >复制</div>
      </div>
      <div class="ls_tips fontRed">支持100%充值</div>
      <div class="ls_step fontRed">操作步骤</div>
      <div class="ls_img">
        <img
          src="@/assets/images/lhd/step/1.png"
          alt="LHD"
        >
        <img
          src="@/assets/images/lhd/step/2.png"
          alt="LHD"
        >
        <img
          src="@/assets/images/lhd/step/3.png"
          alt="LHD"
        >
        <img
          src="@/assets/images/lhd/step/4.png"
          alt="LHD"
        >
      </div>
    </section>
    <section class="lhd_contact">
      <p>如果您有富足的LHD，请添加爱挖矿池客服微信</p>
      <div class="imgBox">
        <img
          src="@/assets/images/anytimeStorage/Wechat1.png"
          alt="客服"
        />
        <img
          src="@/assets/images/anytimeStorage/Wechat2.png"
          alt="客服"
        />
      </div>
    </section>
  </div>
</template>

<script>
import Clipboard from 'clipboard';

export default {
  name: "lhd",
  components: {},
  data() {
    return {
      lhdCode: '3HQbnz8zaQg26NkXVVPdung5p2sXmL65rT'
    };
  },
  created() {
  },
  mounted() {

  },
  watch: {},
  computed: {
    isPC() {
      if (document.body.clientWidth <= 768) {
        return false
      } else {
        return true
      }
    },
  },
  methods: {
    copy() {
      let clipboard = new Clipboard('.lsa_copy')
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
    }
  },


}
</script>

<style lang="less" scoped>
.lhd {
  @font-m();
}
.lhd_header {
  width: 100%;
}
section {
  padding: 0 0.4rem 0.3rem;
  margin-top: 0.22rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 14px 0px rgba(212, 212, 212, 0.6);
  border-radius: 10px;
  overflow: hidden;
}

.fontRed {
  color: #ff3535;
  font-weight: bold;
}
.lhd_calc {
  p {
    margin-top: 0.2rem;
  }
}
.lhd_step {
  min-height: 11.2rem;
  padding-top: 0.32rem;

  .ls_address {
    display: flex;
    align-items: center;
    .lsa_code {
      @allCenter();
      min-width: 3.8rem;
      height: 0.32rem;
      padding: 0 0.2rem;
      margin: 0 0.35rem 0 0.15rem;
      background: rgba(239, 243, 255, 1);
      color: #445aff;
      font-weight: bold;
    }
    .lsa_copy {
      @allCenter();
      @active();
      width: 0.8rem;
      height: 0.4rem;
      background: rgba(68, 90, 255, 1);
      border-radius: 0.2rem;
      @font-s();
      color: #fff;
    }
  }
  .ls_tips {
    padding-left: 1rem;
    margin: 0.1rem 0;
  }
  .ls_step {
    margin-bottom: -0.2rem;
  }
  .ls_img {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    @media (max-width: 768px){
      justify-content: center;
    }
    img {
      width: 5.2rem;
      height: 4.4rem;
      margin-top: 0.5rem;
    }
  }
}
.lhd_contact {
  padding: 0.4rem;
  .imgBox {
    display: flex;
    margin-top: 0.3rem;
    img {
      width: 2.26rem;
      height: 2.22rem;
      margin-right: 0.6rem;
    }
  }
}
</style>