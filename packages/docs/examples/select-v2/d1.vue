<template>
  <div class="dart-select-v2-doc-demo">
    <p>窄宽度下拉：第一项文案较长，悬停溢出项可查看 Tooltip 全文。</p>
    <dart-select-v2
      v-model="value"
      :options="options"
      placeholder="请选择"
      filterable
      clearable
      style="width: 180px"
    />
    <p class="meta">当前值：{{ JSON.stringify(value) }}</p>

    <p>自定义字段映射 <code>props</code>：</p>
    <dart-select-v2
      v-model="idVal"
      :options="customOptions"
      :props="{ value: 'id', label: 'name' }"
      placeholder="id / name"
      style="width: 160px"
    />
    <p class="meta">当前 id：{{ JSON.stringify(idVal) }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref<string | undefined>();

const options = Array.from({ length: 40 }).map((_, i) => ({
  value: `v-${i + 1}`,
  label:
    i === 0
      ? '这是一段很长很长很长很长很长很长的选项标签用于文档演示省略号与 Tooltip'
      : `选项 ${i + 1}`
}));

const idVal = ref<number | undefined>();

const customOptions = [
  { id: 1, name: '名称 A（同样故意写长以便观察省略）' },
  { id: 2, name: '短' }
];
</script>

<style scoped>
.dart-select-v2-doc-demo p.meta {
  margin: 8px 0 16px;
  font-size: 13px;
  color: var(--el-text-color-secondary);
}
</style>
