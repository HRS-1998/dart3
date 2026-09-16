<template>
  <dart-tool
    :show-full-screen="true"
    :show-border="false"
    :show-columnset="false"
  >
    <template #content>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      </el-breadcrumb>
    </template>
    <template #operate>
      <el-button plain icon="Message">消息</el-button>
    </template>
  </dart-tool>
</template>
