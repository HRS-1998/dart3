<template>
  <dart-drag-tags
    v-model="tags1"
    :props-map="{ labelKey: 'names', valueKey: 'ids' }"
    @change="changHandle"
  >
    <template #default="{ item }">
      <div v-if="item.ids === 3">
        <div class="custom">
          <el-icon><House /></el-icon>
          <span>{{ item.names }}-{{ item.ids }}</span>
          <el-icon><Loading /></el-icon>
        </div>
      </div>
      <div v-if="item.ids === 4">{{ item.names }}-{{ item.ids }}</div>
    </template>
  </dart-drag-tags>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const tags1 = ref([
  { ids: 1, names: '11111' },
  { ids: 2, names: '22222' },
  { ids: 3, names: '33333' },
  { ids: 4, names: '44444' },
  { ids: 5, names: '55555' },
  { ids: 6, names: '66666' },
  { ids: 7, names: '77777' },
  { ids: 8, names: '88888' },
  { ids: 9, names: '99999' },
  { ids: 10, names: 'aaaaa' },
  { ids: 11, names: 'bbbbb' },
  { ids: 12, names: 'ccccc' },
]);

const changHandle = (val: Record<string, any>) => {
  console.log(val);
};
</script>
<style lang="scss" scoped>
.custom {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  font-size: 12px;
  border-radius: 5px;
}
</style>
```
