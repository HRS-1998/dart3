<template>
  <dart-tool
    :show-full-screen="true"
    @fullscreen-change="isFullscreen = $event"
    @border-change="borderVisible = $event"
    @columnset="tableRef?.openColumnSet()"
    :span="[8, 16]"
  >
    <template #content>
      <span style="font-size: 16px; font-weight: 600">用户管理</span>
    </template>
    <template #operate>
      <el-button plain icon="Plus">新增</el-button>
      <el-button icon="Download" plain>导出</el-button>
    </template>
  </dart-tool>
  <div class="vp-raw">
    <dart-table
      ref="tableRef"
      :data="tableData"
      :border="borderVisible"
      row-key="date"
    >
      <dart-table-column prop="date" label="日期" width="180" />
      <dart-table-column prop="name" label="姓名" width="180" />
      <dart-table-column prop="address" label="地址" />
    </dart-table>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const tableRef = ref();
const isFullscreen = ref(false);
const borderVisible = ref(false);
const tableData = [
  {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
  },
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄',
  },
];
</script>
