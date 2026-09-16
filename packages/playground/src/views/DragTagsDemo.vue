<template>
  <h2>DragTags 拖拽标签</h2>
  <dart-drag-tags v-model="tags" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const tags = ref([
  { id: 1, label: '标签一' },
  { id: 2, label: '标签二' },
  { id: 3, label: '标签三' },
])
</script>
