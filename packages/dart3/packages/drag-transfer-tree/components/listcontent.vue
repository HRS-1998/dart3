<template>
  <div class="field-item-content">
    <template v-if="showTooltip">
      <el-tooltip
        :content="field.label"
        :placement="placement"
        :effect="'dark'"
        :popover-width="'auto'"
      >
        <div
          class="field-item-text"
          @mouseenter="showTooltipHandle"
          @mouseleave="showTooltip = false"
        >
          <slot name="default" :field="field">{{ field.label || '' }}</slot>
        </div>
      </el-tooltip>
    </template>
    <template v-else>
      <div
        class="field-item-text"
        @mouseenter="showTooltipHandle"
        @mouseleave="showTooltip = false"
      >
        <slot name="default" :field="field">{{ field.label || '' }}</slot>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type { PropType } from 'vue';
import type { ListItem } from '../types/index';
import type { Placement } from 'element-plus';
defineProps({
  field: {
    type: Object as PropType<Partial<ListItem>>,
    default: () => ({} as ListItem),
    required: true,
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'top',
  },
});
const showTooltip = ref<boolean>(false);
// title文字超出提示
const showTooltipHandle = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target && target.scrollWidth > target.clientWidth) {
    showTooltip.value = true;
  }
};
</script>
<style lang="scss" scoped>
.field-item-content {
  display: flex;
  align-items: center;
  .field-item-text {
    flex-grow: 1;
    width: 200px;
    display: block;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
