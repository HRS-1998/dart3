<template>
  <div style="display: flex; align-items: center; gap: 12px">
    <dart-common-btn name="删除" :params="{ id: 1 }" :ajax="mockAjax" :success="onSuccess" />
    <span v-if="count">success 已触发 {{ count }} 次</span>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const count = ref(0);

const mockAjax = () =>
  new Promise((resolve) => setTimeout(() => resolve({ code: 0, data: null }), 800));

const onSuccess = () => {
  count.value++;
};
</script>
