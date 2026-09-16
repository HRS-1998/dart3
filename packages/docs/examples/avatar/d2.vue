<template>
  <div class="form-inline">
    <div class="form-group">
      <el-row :gutter="20">
        <el-col :span="12">
          <dart-avatar
            v-model="url"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :on-success="handleSuccess"
            :width="200"
            :height="100"
          ></dart-avatar>
        </el-col>
        <el-col :span="12">
          <dart-avatar
            v-model="url2"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :on-success="handleSuccess"
            :width="200"
            :height="200"
          ></dart-avatar>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const handleSuccess = (res, uploadFile) => {
  return 'https://img.yaodou.com/game/jmxy/2022111611590.jpg';
};
const url = ref('');
const url2 = ref('');
</script>
