<template>
  <dart-drag-tags v-model="tags" @change="changHandle"></dart-drag-tags>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const tags = ref([
  { id: 1, label: '111111111' },
  { id: 2, label: '22222' },
  { id: 3, label: '33333' },
  { id: 4, label: '44444' },
  { id: 5, label: '55555' },
  { id: 6, label: '66666' },
  { id: 7, label: '77777' },
  { id: 8, label: '88888' },
  { id: 9, label: '99999' },
  { id: 10, label: 'aaaaa' },
  { id: 11, label: 'bbbbb' },
  { id: 12, label: 'c' },
]);

const changHandle = (val: Record<string, any>) => {
  console.log(val);
};
</script>
