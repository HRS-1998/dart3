<template>
  <h2>Input 输入框</h2>
  <dart-input v-model="value" placeholder="请输入" input-type="integer1" />
  <p style="margin-top: 8px">值: {{ value }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const value = ref('');
</script>
