<template>
  <el-form :model="formData" :rules="rules" ref="formRef" label-width="100px">
    <el-form-item label="活动名称" prop="name">
      <dart-ueditor v-model="formData.name" :config="config"></dart-ueditor>
    </el-form-item>
  </el-form>
  <div>
    <el-button type="primary" size="default" @click="onSubmit">验证</el-button>
  </div>
  <div>内容：{{ formData.name }}</div>
</template>

<script setup>
import { ref } from 'vue';
const formData = ref({
  name: '',
});
const rules = {
  name: [{ required: true, message: '必填', trigger: 'change' }],
};
const formRef = ref();
const onSubmit = () => {
  formRef.value.validate((valid) => {});
};
const config = {
  maximumWords: 2000,
};
</script>
