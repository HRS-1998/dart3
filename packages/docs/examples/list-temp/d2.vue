<template>
  <dart-list-temp v-model="ruleForm.list" is-copy :max="5" is-drag style="width: 100%">
    <dart-list-temp-item prop="a">
      <template #header> 自定义标头 </template>
      <template #default="scope">
        <el-input v-model="scope.row.a" placeholder="请输入内容"></el-input>
      </template>
    </dart-list-temp-item>
  </dart-list-temp>
  {{ ruleForm }}
</template>

<script setup>
import { reactive } from 'vue';

const ruleForm = reactive({
  list: [{ a: '123' }, { a: '345' }, { a: '545' }]
});
</script>
