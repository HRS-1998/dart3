<template>
  <el-form :model="ruleForm" :rules="formRules" ref="form" label-width="100px">
    <el-form-item label="活动名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="产品" prop="list">
      <dart-list-temp
        v-model="ruleForm.list"
        @change="onChange"
        is-copy
        :rules="rules"
        :max="5"
        ref="list"
        style="width: 100%"
      >
        <dart-list-temp-item prop="a">
          <template #header> 自定义标头 </template>
          <template #default="scope">
            <el-input v-model="scope.row.a" placeholder="请输入内容"></el-input>
          </template>
        </dart-list-temp-item>
        <dart-list-temp-item prop="b" label="bb">
          <template #default="scope">
            <el-input v-model="scope.row.b" placeholder="请输入内容"></el-input>
          </template>
        </dart-list-temp-item>
      </dart-list-temp>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">验证</el-button>
    </el-form-item>
  </el-form>
  {{ ruleForm }}
</template>

<script setup>
import { reactive, ref } from 'vue';

const ruleForm = reactive({
  list: [
    { a: '123', b: '' },
    { a: '345', b: '' }
  ],
  name: ''
});

const form = ref(null);
const list = ref(null);
const onChange = () => {
  form.value?.clearValidate('list');
};
//函数形式rule
const bVali = (scope) => {
  const vali = (rule, value, callback, scope) => {
    if (scope.row.a === '123') {
      callback(new Error('自定义错误'));
      return;
    }
    callback();
  };
  return [
    {
      validator: (rule, value, callback) => vali(rule, value, callback, scope),
      trigger: 'blur'
    }
  ];
};
const rules = {
  a: [
    { required: true, message: '请输入内容', trigger: 'blur' },
    {
      min: 3,
      max: 5,
      message: '长度在 3 到 5 个字符',
      trigger: 'blur'
    }
  ],
  b: bVali
};
const formRules = {
  name: [
    { required: true, message: '请输入活动名称', trigger: 'blur' },
    {
      min: 3,
      max: 5,
      message: '长度在 3 到 5 个字符',
      trigger: 'blur'
    }
  ],
  list: [
    { required: true, message: '请输入活动名称', trigger: 'change' },
    { type: 'array', min: 3, message: '长度在 3', trigger: 'change' },
    {
      validator: (rule, value, callback) => {
        list.value
          .validate()
          .then(() => {
            console.log(11);

            callback();
          })
          .catch(() => {
            callback(new Error('商品配置有错误'));
          });
      },
      trigger: 'blur'
    }
  ]
};
const submitForm = () => {
  form.value.validate();
};
</script>
