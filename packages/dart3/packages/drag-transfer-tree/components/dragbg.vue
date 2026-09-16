<template>
  <div class="drag-bg" ref="dragBgRef">
    <div v-for="(item, index) in list" :key="index">
      <slot name="default" :field="item"> {{ item.label }}</slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { ListItem } from '../types/index';
defineProps({
  list: {
    type: Array as PropType<ListItem[]>,
    default: () => [],
    required: true,
  },
});
</script>
<style lang="scss" scoped>
.drag-bg {
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  div {
    padding: 8px 12px;
    border: 1px solid #409eff;
    border-radius: 4px;
    margin: 2px;
    font-size: 12px;
    color: #409eff;
    width: 300px;
    box-sizing: border-box;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
