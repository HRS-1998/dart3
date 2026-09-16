<template>
  <el-form-item v-bind="$attrs" :label="showLabel">
    <template v-if="isOverflow" #label>
      <span class="dart-form-item-label">
        {{ label.slice(0, maxLen) }}
        <el-tooltip :content="label" placement="top">
          <el-icon class="dart-form-item-more"><QuestionFilled /></el-icon>
        </el-tooltip>
      </span>
    </template>
    <template v-else-if="hasLabelSlot" #label><slot name="label"></slot></template>
    <template v-if="$slots.error" #error><slot name="error"></slot></template>
    <slot></slot>
  </el-form-item>
</template>

<script lang="ts">
export default {
  name: 'DartFormItem',
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { computed, useSlots } from 'vue';
import { QuestionFilled } from '@element-plus/icons-vue';

const props = withDefaults(
  defineProps<{
    label?: string;
    maxLen?: number; // label 最大字数，超过时截断并显示 tooltip 图标
  }>(),
  {
    label: '',
    maxLen: 6,
  },
);

const slots = useSlots();
const hasLabelSlot = computed(() => !!slots.label);

// 超长时改用 #label 结构渲染（截断文字 + tooltip 图标），此时字符串 label 置空
const isOverflow = computed(
  () => !hasLabelSlot.value && props.label.length > props.maxLen,
);
const showLabel = computed(() => (isOverflow.value ? '' : props.label));
</script>

<style lang="scss" scoped>
.dart-form-item-label {
  display: inline-flex;
  align-items: center;
}
.dart-form-item-more {
  margin-left: 2px;
  cursor: help;
  color: #909399;
}
</style>
