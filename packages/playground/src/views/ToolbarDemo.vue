<template>
  <h2>Toolbar 工具栏</h2>
  <dart-toolbar>
    <template #content>
      <span style="font-size: 16px; font-weight: 600">用户管理</span>
    </template>
    <template #operate>
      <el-button type="primary" icon="Plus">新增</el-button>
      <el-button icon="Download">导出</el-button>
    </template>
  </dart-toolbar>
</template>
