<template>
  <dart-search2 :model="searchCondition" ref="searchRef">
    <template #default>
      <el-form-item label="配置值">
        <dart-input v-model="searchCondition.ConfigValue" maxlength="32" clearable trim />
      </el-form-item>
      <el-form-item label="配置值值">
        <dart-input v-model="searchCondition.ConfigValue" maxlength="32" clearable trim />
      </el-form-item>
    </template>
    <template #button>
      <el-button type="primary" native-type="submit" :loading="loading" @click="search">
        查询
      </el-button>
    </template>
  </dart-search2>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const emit = defineEmits(['search']);
const loading = ref(false);
const searchCondition = ref<any>({ ConfigValue: '' }); // search 事件
const arr = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' }
];
const search = (): void => {
  emit('search', { ...searchCondition.value });
};

const setLoading = (val: boolean) => {
  loading.value = val;
};

defineExpose({ search, setLoading });
</script>
