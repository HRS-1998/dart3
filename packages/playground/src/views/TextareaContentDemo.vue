<template>
  <h2>TextareaContent 文本域</h2>
  <dart-textarea-content v-model="value" />
  <p style="margin-top: 8px">值: {{ value }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>
