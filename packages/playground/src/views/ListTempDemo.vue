<template>
  <h2>ListTemp 列表模板</h2>
  <dart-list-temp v-model="list" :defaultData="{ name: '', age: '', address: '' }" addButtonText="新增行">
    <dart-list-temp-item label="姓名" prop="name" width="180">
      <template #default="{ row }">
        <el-input v-model="row.name" placeholder="请输入" />
      </template>
    </dart-list-temp-item>
    <dart-list-temp-item label="年龄" prop="age" width="120">
      <template #default="{ row }">
        <el-input-number v-model="row.age" :min="0" :max="150" size="small" />
      </template>
    </dart-list-temp-item>
    <dart-list-temp-item label="地址" prop="address">
      <template #default="{ row }">
        <el-input v-model="row.address" placeholder="请输入" />
      </template>
    </dart-list-temp-item>
  </dart-list-temp>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const list = ref([
  { name: '张三', age: 28, address: '北京市朝阳区' },
  { name: '李四', age: 32, address: '上海市浦东新区' },
])
</script>
