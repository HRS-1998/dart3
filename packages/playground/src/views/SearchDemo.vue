<template>
  <h2>Search 搜索</h2>
  <dart-search :model="searchForm" @search="onSearch">
    <dart-search-item prop="keyword" label="关键词">
      <el-input v-model="searchForm.keyword" placeholder="请输入" />
    </dart-search-item>
  </dart-search>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
const searchForm = reactive({ keyword: '' })
const onSearch = () => console.log('search', searchForm)
</script>
