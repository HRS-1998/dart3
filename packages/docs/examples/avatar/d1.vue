<template>
  <div class="form-inline">
    <div class="form-group">
      <dart-avatar
        method="get"
        v-model="url"
        action="http://yapi.tcy365.org:3000/mock/1853/api/upload"
        :on-success="handleSuccess"
        :maxSize="200"
      ></dart-avatar>
    </div>
    {{ url }}
  </div>
</template>

<script setup>
import { ref } from 'vue';
const handleSuccess = (res, uploadFile) => {
  return res.Data.url;
};
const url = ref('');
</script>
