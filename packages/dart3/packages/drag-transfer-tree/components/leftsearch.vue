<template>
  <div class="search-box">
    <dart-input
      v-model="searchQuery"
      :placeholder="filterPlaceholder"
      @input="filterFieldHandle"
      :prefix-icon="Search"
      size="default"
      tabindex="-1"
      clearable
    >
    </dart-input>
  </div>
</template>
<script lang="ts" setup>
import { debounce } from 'lodash-es';
import { Search } from '@element-plus/icons-vue';
import { computed } from 'vue';
const emit = defineEmits(['search', 'update:modelValue']);

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  filterPlaceholder: {
    type: String,
    default: '请输入',
  },
});

// const searchQuery = defineModel<string>();
const searchQuery = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
const filterFieldHandle = debounce(() => {
  emit('search');
}, 300);
</script>
<style lang="scss" scoped>
.search-box {
  width: 300px;
  margin: 12px auto;
}
</style>
