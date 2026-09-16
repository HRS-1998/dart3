<template>
  <h2>SelectV2 选择器V2</h2>
  <dart-select-v2 v-model="value" :options="options" />
  <p style="margin-top: 8px">值: {{ value }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const value = ref('');
const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
];
</script>
