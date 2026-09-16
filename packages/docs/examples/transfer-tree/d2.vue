<template>
  <dart-transfer-tree
    :data="data"
    :dataMap="props"
    @check-change="onCheckChange"
    ref="treeRef"
  >
    <template #default="{ node }">
      <span>{{ node.label }} 自定义</span>
    </template>
  </dart-transfer-tree>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
interface Tree {
  id: string;
  label: string;
  children?: Tree[];
}
const treeRef = ref();
const loading = ref(true);
const getKey = (prefix: string, id: number) => {
  return `${prefix}-${id}`;
};

const createData = (
  maxDeep: number,
  maxChildren: number,
  minNodesNumber: number,
  deep = 1,
  key = 'node'
): Tree[] => {
  let id = 0;
  return Array.from({ length: minNodesNumber })
    .fill(deep)
    .map(() => {
      const childrenNumber =
        deep === maxDeep ? 0 : Math.round(Math.random() * maxChildren);
      const nodeKey = getKey(key, ++id);
      return {
        id: nodeKey,
        label: nodeKey,
        children: childrenNumber
          ? createData(maxDeep, maxChildren, childrenNumber, deep + 1, nodeKey)
          : undefined,
      };
    });
};

const props = {
  value: 'id',
  label: 'label',
  children: 'children',
};
const data = ref<any[]>([]);
const onCheckChange = (d: any) => {
  console.log(d, 123);
};
data.value = createData(3, 10, 20);
</script>
