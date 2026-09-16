<template>
  <h2>DatePicker 日期选择</h2>
  <dart-date-picker
    v-model="value"
    type="datetimerange"
    :shortcuts="shortcuts"
  />
  <p style="margin-top: 8px">值: {{ value }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const value = ref('');
const shortcuts = ref([
  {
    text: '今天',
    value: new Date(),
  },
  {
    text: '昨天',
    value: new Date(new Date().getTime() - 3600 * 1000 * 24),
  },
]);
</script>
