<template>
  <dart-drag-transfer-tree
    :data="leftList"
    v-model="rightList"
    :propsMap="propsMap"
    :filterable="false"
    filter-placeholder="请输入"
    :filter-method="searchFn"
    :show-total="false"
    :left-config="leftConfig"
    :right-config="rightConfig"
    class="drag-list-container"
  >
    <!-- <template #left-header>
      <h4>自定义header</h4>
    </template> -->
    <template #default="{ item }">
      <div v-if="item.idreset === 3">
        <img src="https://admin.ct108.net:777/images/dingbtn.png" />
      </div>
      <div v-if="item.idreset === 4">{{ item.titlereset }}-{{ item.idreset }}</div>
    </template>
  </dart-drag-transfer-tree>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

interface PropsMapType {
  value?: string;
  label?: string;
  disabled?: string;
}
export interface PanelConfig {
  name?: string; // 当前drag
  dragOrigin?: string; // 拖拽来源
  title?: string;
}

interface LeftPanelConfig extends PanelConfig {}

interface RightPanelConfig extends PanelConfig {
  showLeftIcon?: boolean; // 显示左侧图标
  showRightIcon?: boolean; // 显示右侧图标
}

const searchFn = (query: string, item: any): boolean => {
  return item.idreset == query || item.titlereset.toLowerCase().includes(query);
};

const propsMap: PropsMapType = {
  value: 'idreset',
  label: 'titlereset',
  disabled: 'choosereset'
};
const leftConfig: LeftPanelConfig = {
  //   searchFn: searchFn
};
const rightConfig: RightPanelConfig = {
  //   searchFn: searchFn
};

const leftList = ref<any[]>([
  {
    idreset: 1,
    titlereset: 'aaaaaaaa',
    choosereset: false
  },
  {
    idreset: 2,
    titlereset: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
    choosereset: true
  },
  { idreset: 3, titlereset: 'cccccccc', choosereset: true },
  { idreset: 4, titlereset: 'dddddddd', choosereset: true },
  { idreset: 5, titlereset: 'eeeeeeee', choosereset: true },
  { idreset: 7, titlereset: 'ffffffff', choosereset: true },
  {
    idreset: 8,
    titlereset: '超长文字tooltip测试超长文字tooltip测试超长文字tooltip测试',
    choosereset: true
  }
]);

const rightList = ref<any[]>([
  {
    idreset: 16,
    titlereset: 'ceshi',
    choosereset: false
  }
]);
</script>
<style lang="scss" scoped>
.drag-list-container {
  margin: 0 auto;
  display: flex;
}
</style>
