<template>
  <div>data:{{ data }}</div>

  <dart-more-condition v-model="data" :defaultData="defaultData">
    <dart-more-condition-item :span="10" label="规则名称">
      <template #default="scope">
        <el-input v-model="scope.row.a"></el-input>
      </template>
    </dart-more-condition-item>
    <dart-more-condition-item :span="6" label="操作符">
      <template #default="scope">
        <el-input v-model="scope.row.b"></el-input>
      </template>
    </dart-more-condition-item>
    <dart-more-condition-item :span="8" label="值">
      <template #default="scope">
        <el-input v-model="scope.row.c"></el-input>
      </template>
    </dart-more-condition-item>
  </dart-more-condition>
</template>

<script setup>
import { ref } from 'vue';
const data = ref([]);
const defaultData = { a: 'a', b: 'b', c: 'c' };
</script>
