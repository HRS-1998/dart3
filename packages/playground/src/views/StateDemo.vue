<template>
  <h2>State 状态</h2>
  <dart-state
    :text="states[0].label"
    :type="states[0].type"
    style="margin-right: 10px"
  />
  <dart-state
    :text="states[1].label"
    :type="states[1].type"
    style="margin-right: 10px"
  />
  <dart-state
    :text="states[2].label"
    :type="states[2].type"
    style="margin-right: 10px"
  />
  <dart-state
    :text="states[3].label"
    :type="states[3].type"
    style="margin-right: 10px"
  />
  <dart-state :text="states[4].label" :type="states[4].type" />
</template>

<script setup lang="ts">
const states = [
  { label: '待处理', value: 1, type: 'warning' },
  { label: '已完成', value: 2, type: 'success' },
  { label: '待处理', value: 3, type: 'info' },
  { label: '已完成', value: 4, type: 'primary' },
  { label: '已完成', value: 5, type: 'danger' },
];
</script>
