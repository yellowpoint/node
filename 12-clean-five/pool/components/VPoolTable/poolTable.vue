<!-- 矿池列表 -->
<template>
  <div class="pool_table">
    <div class="pool_table_title"></div>
    <div class="pool_table_thead">
      <div
        class="pool_table_thead_item"
        :class="align"
        v-for="(theadItem,theadIndex) of pool_table_thead_list"
        :key="theadIndex"
        :style="`${width[theadIndex] ? 'width:' + width[theadIndex] +'px' : 'flex: 1'}`"
      >{{theadItem}}</div>

    </div>
    <div
      class="pool_table_tbody"
      v-loading="isLoading"
    >
      <div
        class="pool_table_item"
        v-for="(tableItem,tableIndex) of pool_table_item_list"
        :key="tableIndex"
      >

        <transition name="el-fade-in">
          <div
            v-if="pool_table_thead_list_data[tableItem.key]"
            class="pool_table_info"
            :class="{open:pool_table_detail_show===tableItem.key}"
            @click="fn_show_pool_table_detail(tableItem)"
          >
            <img
              class="pool_table_info_icon"
              :src="tableItem.icon"
            >
            <div
              class="pool_table_info_item"
              :class="align"
              :key="pool_table_info_index"
              :style="`${width[pool_table_info_index] ? 'width:' + width[pool_table_info_index] +'px' : 'flex: 1'}`"
              v-for="(pool_table_info_item,pool_table_info_index) of pool_table_thead_list_data[tableItem.key]"
              v-html="pool_table_info_item"
            ></div>
            <div
              class="pool_table_item_arrows"
              :class="{open:pool_table_detail_show===tableItem.key}"
            ><img
                src="@/assets/images/common/unfold.png"
                alt="展开"
              /></div>
          </div>
        </transition>
        <el-collapse-transition>
          <keep-alive>
            <slot
              v-if="pool_table_detail_show===tableItem.key"
              :tableItem="tableItem"
            ></slot>
          </keep-alive>
        </el-collapse-transition>

      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '@/utils/eventBus';
import commonMixins from '@/mixins/common';

export default {
  name: '',
  mixins: [commonMixins],
  components: {

  },
  props: {
    // 币种列表
    pool_table_item_list: {
      type: Array,
      default: () => [],
    },
    // table未展开时的简要数据
    pool_table_thead_list_data: {
      type: Object,
      default: () => ({}),
    },
    // table的头部文案
    pool_table_thead_list: {
      type: Array,
      default: () => [],
    },
    isLoading: {
      type: Boolean,
      default: true,
    },
    align: {
      type: String,
      default: 'center',
    },
    width: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      pool_table_detail_show: '',
    };
  },
  computed: {

  },
  created() {

  },
  mounted() {

  },
  methods: {
    fn_show_pool_table_detail(tableItem) {
      const mineType = tableItem.key;
      this.pool_table_detail_show = this.pool_table_detail_show === mineType ? '' : mineType;
      tableItem = this.pool_table_detail_show === '' ? '' : tableItem;
      EventBus.$emit('changeMine', tableItem);
    },
  },
  destroyed() {
    // 组件销毁会取消选中的币种，告诉粒子组件使用默认图案
    EventBus.$emit('changeMine', '');
  },
};
</script>

<style lang="less">
.pool_table {
  .pool_table_info_item {
    .units {
      color: @color-font-light;
      @font-s();
      font-weight: 500;
      margin-left: 0.1rem;
    }
  }
}
</style>
<style lang='less' scoped>
@import "./poolTable.less";
</style>
