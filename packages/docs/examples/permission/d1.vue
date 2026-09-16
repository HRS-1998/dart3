<template>
  <el-button type="danger" :disabled="!proxy.$dart.permission.is('del')">
    删除
  </el-button>
  <el-button type="success" :disabled="!proxy.$dart.permission.is('add')">
    增加
  </el-button>
  <el-button type="primary" :disabled="!proxy.$dart.permission.is('edit')">
    编辑
  </el-button>
</template>

<script setup>
import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();
</script>
