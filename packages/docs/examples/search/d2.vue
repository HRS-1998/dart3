<template>
  <dart-search
    label-position="right"
    :model="searchForm"
    :rules="rules"
    ref="search"
    height="125px"
    :show-arrow="true"
  >
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
      <dart-search-item label="日期" prop="date" :span="16">
        <el-date-picker v-model="searchForm.date" type="daterange" />
      </dart-search-item>
      <dart-search-item label="地址">
        <el-input v-model="searchForm.address"></el-input>
      </dart-search-item>
      <dart-search-item label="邮箱">
        <el-input v-model="searchForm.email"></el-input>
      </dart-search-item>
      <dart-search-item label="账号">
        <el-input v-model="searchForm.acount"></el-input>
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
  <el-button @click="clearValidate">清除错误校验</el-button>
</template>
<script setup>
import { ref, reactive } from 'vue';

const searchLoading = ref(false);
const search = ref(null);
const rules = {
  name: [{ required: false, message: '请输入姓名', trigger: 'blur' }],
  age: [{ required: false, message: '请输入年龄', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
};
const searchForm = reactive({
  name: '',
  age: '',
  password: '',
  sex: '',
  date: '',
  address: '',
  email: '',
  acount: '',
  number: '',
});
const setSearchLoading = (type) => {
  searchLoading.value = type;
};
const clearValidate = () => {
  search.value.clearValidate();
};
const submitForm = () => {
  search.value.validate((valid) => {
    setSearchLoading(true);
    setTimeout(() => {
      setSearchLoading(false);
    }, 2000);
  });
};
</script>
