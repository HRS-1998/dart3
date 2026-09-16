<template>
  <h2>TransferTree 穿梭树</h2>
  <dart-transfer-tree
    :data="treeData"
    :dataMap="{ value: 'id', label: 'name', children: 'children' }"
    :titles="['可选部门', '已选部门']"
    :filterable="true"
    :height="300"
  />
</template>

<script setup lang="ts">
const treeData = [
  {
    id: 1, name: '技术部',
    children: [
      { id: 11, name: '前端组' },
      { id: 12, name: '后端组' },
      { id: 13, name: '测试组' },
    ]
  },
  {
    id: 2, name: '产品部',
    children: [
      { id: 21, name: '产品设计组' },
      { id: 22, name: 'UI设计组' },
    ]
  },
  {
    id: 3, name: '运营部',
    children: [
      { id: 31, name: '内容运营组' },
      { id: 32, name: '用户运营组' },
    ]
  },
]
</script>
