<template>
  <dart-search label-position="right" :model="searchForm">
    <template #search-form>
      <dart-search-item label="姓名" prop="name">
        <el-input v-model="searchForm.name"></el-input>
      </dart-search-item>
      <dart-search-item label="年龄" prop="age">
        <el-input v-model="searchForm.age"></el-input>
      </dart-search-item>
      <dart-search-item label="密码" prop="password">
        <el-input v-model="searchForm.password"></el-input>
      </dart-search-item>
      <dart-search-item label="这是六个字了" prop="sex">
        <el-select v-model="searchForm.sex" placeholder="请选择性别">
          <el-option label="男" value="man"></el-option>
          <el-option label="女" value="women"></el-option>
        </el-select>
      </dart-search-item>
      <dart-search-item label="日期2">
        <el-date-picker
          v-model="searchForm.number"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </dart-search-item>
    </template>
    <template #search-btn>
      <el-button
        type="primary"
        native-type="submit"
        icon="search"
        :loading="searchLoading"
        @click="submitForm"
        >查询</el-button
      >
    </template>
  </dart-search>
</template>
<script setup>
import { ref } from 'vue';

const searchLoading = ref(false);
const searchForm = ref({});

searchForm.value = {
  name: '',
  age: '',
  password: '',
  sex: '',
  date: '',
  address: '',
  email: '',
  acount: '',
  number: '',
};
const setSearchLoading = (type) => {
  searchLoading.value = type;
};
const submitForm = () => {
  setSearchLoading(true);
  setTimeout(() => {
    setSearchLoading(false);
  }, 1000);
};
</script>
