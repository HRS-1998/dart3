<template>
  <dart-ueditor v-model="value" :config="config"></dart-ueditor>

  <h2>当前内容</h2>
  <div>{{ value }}</div>
</template>

<script setup>
import { ref } from 'vue';
const value = ref('hellow');
const config = {
  maximumWords: 2000,
};
</script>
