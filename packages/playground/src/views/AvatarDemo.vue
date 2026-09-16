<template>
  <h2>Avatar 头像上传</h2>
  <dart-avatar v-model="avatarUrl" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const avatarUrl = ref('')
</script>
