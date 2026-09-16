<template>
  <dart-transfer-tree
    :data="data"
    :dataMap="props"
    filterable
    isRightClear
    @check-change="onCheckChange"
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

const createData = (num: number) => {
  const result: any[] = [];
  for (let i = 0; i < num; i++) {
    result.push({
      id: i,
      label: `node${i}`,
    });
  }
  return result;
};

const props = {
  value: 'id',
  label: 'label',
  children: 'children',
};
const data = ref<any[]>([]);
const onCheckChange = (d: any) => {
  //console.log(d, 123);
};
data.value = createData(50000);
onMounted(() => {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([1]);
  });
});
</script>
