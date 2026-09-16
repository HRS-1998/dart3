<template>
  <dart-toolbar :brand-visible="true">
    <template #content>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </template>
    <template #operate>
      <el-button type="primary" icon="message">消息</el-button>
      <el-button type="primary" icon="download">下载</el-button>
    </template>
  </dart-toolbar>
</template>
