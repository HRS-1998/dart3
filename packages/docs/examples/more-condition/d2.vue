<template>
  <div>data:{{ formData.data.SubActivityRules }}</div>
  <el-form
    :label-width="100"
    :model="formData.data"
    :rules="formRules"
    ref="formRef"
  >
    <el-form-item label="规则" prop="SubActivityRules">
      <dart-more-condition
        ref="modRef"
        v-model="formData.data.SubActivityRules"
        :rules="moreRules"
        :defaultData="defaultData"
      >
        <dart-more-condition-item :span="10" label="规则名称" prop="a">
          <template #default="scope">
            <el-input v-model="scope.row.a"></el-input>
          </template>
        </dart-more-condition-item>
        <dart-more-condition-item :span="6" label="操作符" prop="b">
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
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit"> 保存 </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue';
const defaultData = { a: '', b: '', c: '' };
const modRef = ref();
const formRef = ref();
const formData = ref({
  data: { SubActivityRules: [] },
});
//函数形式rule
const bVali = (row) => {
  const vali = (rule, value, callback, row) => {
    console.log(row);
    if (row.a === '123') {
      callback(new Error('自定义错误'));
      return;
    }
    callback();
  };
  return [
    {
      validator: (rule, value, callback) => vali(rule, value, callback, row),
      trigger: 'blur',
    },
  ];
};
const moreRules = {
  a: [{ required: true, trigger: 'change', message: '请填写' }],
  b: bVali,
};
const checkSubActivityRules = async (rule, value, callback) => {
  try {
    const result = await modRef.value.validate();
    callback();
  } catch (error) {
    callback(new Error('验证错误'));
  }
};
const formRules = {
  SubActivityRules: [
    { required: true, message: '请添加', trigger: 'change' },
    { asyncValidator: checkSubActivityRules, trigger: 'change' },
  ],
};
const onSubmit = async () => {
  if (!formRef.value) {
    return;
  }
  console.log(formData.value);

  await formRef.value.validate((val) => {
    console.log(val);
    if (val) {
      alert('ok');
      return;
    }

    alert('error');
  });
};
</script>
