<template>
  <dart-common-btn name="启用" :params="{ id: 1 }" :ajax="mockAjax" message="自定义成功提示">
    <template #custom="{ loading }">
      <el-button type="danger" :loading="loading">自定义按钮</el-button>
    </template>
  </dart-common-btn>
</template>

<script lang="ts" setup>
const mockAjax = () =>
  new Promise((resolve) => setTimeout(() => resolve({ code: 0, data: null }), 800));
</script>
