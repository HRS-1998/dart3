<template>
  <h2>DragTransferTree 拖拽穿梭树</h2>
  <dart-drag-transfer-tree
    v-model="selected"
    :data="sourceData"
    :propsMap="{ value: 'id', label: 'name' }"
    :rightConfig="{
      title: '已选人员',
      showLeftIcon: true,
      showRightIcon: true,
    }"
    :filterable="true"
    filterPlaceholder="搜索人员"
  />
  <p style="margin-top: 12px">
    已选: {{ selected.map((i: any) => i.name).join(', ') || '无' }}
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const sourceData = ref([
  { id: 1, name: '张三' },
  { id: 3, name: '王五' },
  { id: 4, name: '赵六' },
  { id: 5, name: '钱七' },
  { id: 6, name: '孙八' },
]);
const selected = ref([{ id: 2, name: '李四' }]);
</script>
