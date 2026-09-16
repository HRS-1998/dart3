<template>
  <h2>DateRange 日期范围</h2>
  <dart-date-range v-model:start="start" v-model:end="end" />
  <p style="margin-top: 8px">开始: {{ start }}，结束: {{ end }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const start = ref('')
const end = ref('')
</script>
