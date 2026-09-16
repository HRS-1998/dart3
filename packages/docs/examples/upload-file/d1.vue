<template>
  <dart-upload-file v-model="url" :http-request="mockUpload" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const url = ref('');

const mockUpload = (opt: any) => {
  setTimeout(() => {
    opt.onSuccess({
      code: 0,
      data: `https://mock.example.com/files/${encodeURIComponent(opt.file.name)}`,
    });
  }, 800);
};
</script>
