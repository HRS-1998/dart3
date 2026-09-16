<template>
  <el-form label-width="140px">
    <dart-form-item label="设备名称类型" :max-len="4">
      <el-input v-model="form.name" placeholder="maxLen=4" />
    </dart-form-item>
    <dart-form-item>
      <template #label>
        <span style="color: #f56c6c">自定义label插槽</span>
      </template>
      <el-input v-model="form.remark" placeholder="插槽不截断" />
    </dart-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const form = reactive({ name: '', remark: '' });
</script>
