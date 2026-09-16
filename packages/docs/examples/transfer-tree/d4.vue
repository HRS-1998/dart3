<template>
  <dart-transfer-tree
    :data="data"
    :dataMap="props"
    filterable
    :filterMethod="filterMethod"
    @check-change="onCheckChange"
    :isExpandAll="true"
    ref="treeRef"
  >
  </dart-transfer-tree>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue';
interface Tree {
  id: string;
  label: string;
  children?: Tree[];
}
const treeRef = ref();
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
const filterMethod = (query: string, node: any) => {
  return node.label!.includes(query);
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
onMounted(() => {
  nextTick(() => {
    treeRef.value?.setCheckedKeys(['node-2-1-1']);
  });
});
</script>
