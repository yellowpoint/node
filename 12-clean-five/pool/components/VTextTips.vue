<!-- 公共文案提示组件 -->
<template>
  <div class="VTextTips">{{textArr[0]}}<el-popover
      v-if="showPopover"
      placement="right"
      trigger="hover"
    >
      <div
        class="consultTips"
      >
        <img
          v-for="(item,index) of serviceType"
          :key="index"
          :src="picsInfo[item].pic_url"
          alt="客服"
        >
      </div>
      <el-button
        class="VTextTips_kefu"
        slot="reference"
      >{{keyText}}</el-button>
    </el-popover>{{textOther}}
  </div>

</template>

<script>
export default {
  name: '',
  components: {

  },
  props: {
    text: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      keyText: '联系客服',
      textArr: [],
      showPopover: false,
      textOther: '',
      serviceType: [],
    };
  },
  computed: {
    picsInfo() {
      return this.$store.getters.picsInfo.kefu;
    },
  },
  created() {

  },
  mounted() {
    // 当有关键字出现的时候，显示客服图片
    this.textArr = this.text.writeValue.split(this.keyText);
    this.textOther = this.textArr.slice(1).join('');
    // 清理数组中的空值
    this.serviceType = this.text.serviceType.filter((s) => {
      return s && s.trim();
    });
    this.serviceType = this.serviceType.concat(this.serviceType);
    if (this.textArr.length > 1 && this.serviceType.length) {
      this.showPopover = true;
    }
  },
  methods: {

  },
};
</script>

<style lang='less' scoped>
.VTextTips {
  @font-s();
  white-space: pre-wrap;
  line-height: 2;
  .VTextTips_kefu {
    display: inline;
    padding: 0;
    border: none;
    background: transparent;
    color: @color-main;
    margin: 0 0.05rem;
    text-decoration: underline;
  }
}
</style>
