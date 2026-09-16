<template>
  <dart-drag-transfer-tree :data="leftList" v-model="rightList">
  </dart-drag-transfer-tree>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
interface ListItem {
  id?: string | number;
  label?: string;
  disabled?: boolean;
  selected?: boolean;
}
const leftList = ref<ListItem[]>([
  { id: 1, label: 'aaaaaaaa', disabled: false },
  { id: 2, label: 'bbbbbbb', disabled: true },
  { id: 3, label: 'cccccc', disabled: true },
  {
    id: 4,
    label: '超长文字tooltip测试超长文字tooltip测试超长文字tooltip测试',
    disabled: true,
  },
]);
const rightList = ref<ListItem[]>([]);
</script>
<style lang="scss" scoped>
.drag-list-container {
  margin: 0 auto;
  display: flex;
}
</style>
