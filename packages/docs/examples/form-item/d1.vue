<template>
  <el-form label-width="140px">
    <dart-form-item label="设备名称" prop="name">
      <el-input v-model="form.name" />
    </dart-form-item>
    <dart-form-item label="所属公司组织机构编码" prop="orgCode">
      <el-input v-model="form.orgCode" />
    </dart-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const form = reactive({ name: '', orgCode: '' });
</script>
