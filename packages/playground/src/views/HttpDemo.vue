<template>
  <h2>Http 请求封装</h2>
  <el-descriptions :column="1" border>
    <el-descriptions-item label="ajax">发起 AJAX 请求，返回 Promise</el-descriptions-item>
    <el-descriptions-item label="all">并发请求 (axios.all)</el-descriptions-item>
    <el-descriptions-item label="setDefaults">设置全局默认配置</el-descriptions-item>
    <el-descriptions-item label="setHeaders">设置请求头</el-descriptions-item>
  </el-descriptions>
  <el-divider />
  <h4>用法示例</h4>
  <pre style="background: #f5f5f5; padding: 12px; border-radius: 4px; font-size: 13px">
import { ajax } from 'ct-dart3'

// GET 请求
ajax({ url: '/api/users', method: 'get' })

// POST 请求
ajax({ url: '/api/users', method: 'post', data: { name: 'test' } })

// 并发请求
import { all } from 'ct-dart3'
all([
  ajax({ url: '/api/a' }),
  ajax({ url: '/api/b' })
], (resA, resB) => { /* ... */ })</pre>
</template>
