<template>
  <h2>Multitags 多行标签</h2>

  <h3>基础（value 为 `标题(项1、项2)` 格式字符串）</h3>
  <div class="demo-col">
    <div class="demo-cell">
      <dart-multitags value="官方渠道(H5、小程序、APP)" />
    </div>
    <div class="demo-cell">
      <dart-multitags value="三方渠道(抖音、快手)" />
    </div>
    <div class="demo-cell">
      <dart-multitags value="直营()" />
    </div>
    <div class="demo-cell">
      <dart-multitags value="无括号整体作为标题" />
    </div>
  </div>

  <h3>表格中使用（useType="multitags"，useArg 支持字符串/数组）</h3>
  <dart-table :data="tableData" style="width: 100%">
    <dart-table-column prop="name" label="姓名" width="120" />
    <dart-table-column
      label="渠道(字符串)"
      prop="channel"
      use-type="multitags"
      use-arg="channel"
      min-width="240"
      show-overflow-tooltip
    />
    <dart-table-column
      label="渠道(数组)"
      use-type="multitags"
      :use-arg="['title', 'tag1', 'tag2', 'tag3']"
      min-width="240"
      show-overflow-tooltip
    />
  </dart-table>
</template>

<script setup lang="ts">
const tableData = [
  {
    name: '张三',
    channel: '官方渠道(H5、小程序、APP)',
    title: '官方渠道',
    tag1: 'H5',
    tag2: '小程序',
    tag3: 'APP',
  },
  {
    name: '李四',
    channel: '三方渠道(抖音、快手)',
    title: '三方渠道',
    tag1: '抖音',
    tag2: '快手',
    tag3: '',
  },
];
</script>

<style scoped>
.demo-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
}

.demo-cell {
  width: 240px;
}
</style>
