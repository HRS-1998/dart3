<template>
  <div class="drag-header">
    <slot name="panel-header">
      <div v-if="config.title" class="header-left">
        <span>{{ config.title }}</span>
      </div>
      <div v-if="showTotal" class="header-right">{{ len }}</div>
    </slot>
  </div>
</template>
<script lang="ts" setup>
import type { PropType } from 'vue';
import type { PanelConfig } from '../types/index';

const props = defineProps({
  showTotal: {
    type: Boolean,
    default: true,
  },
  len: {
    type: Number,
    required: true,
  },
  config: {
    type: Object as PropType<PanelConfig>,
    default: () => ({} as PanelConfig),
    required: true,
  },
});
</script>
<style lang="scss" scoped>
.drag-header {
  position: relative;
  width: 320px;
  padding: 0 12px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background-color: #f7f5fa;
  color: #333;
  height: 40px;
  .header-left {
    position: absolute;
    left: 12px;
    color: #333;
    font-size: 14px;
    font-weight: bold;
  }
  .header-right {
    position: absolute;
    right: 12px;
    color: #909399;
    font-size: 12px;
  }
}
</style>
