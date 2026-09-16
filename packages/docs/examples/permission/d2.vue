<template>
  <el-button @click="onClick"> 无权限提示 </el-button>
</template>

<script setup>
import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();
const onClick = () => {
  proxy.$dart.permission.go403();
};
</script>
