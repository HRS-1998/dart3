<template>
  <span class="dart-state" :class="rootClass">
    <span class="dart-state__dot" aria-hidden="true" />
    <span class="dart-state__text">
      <slot>{{ text }}</slot>
    </span>
  </span>
</template>
<script lang="ts">
export default {
  name: 'DartState',
};
</script>
<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    /** 与 el-tag 的 type 一致，用于取 Element Plus 主题色 */
    type?: 'primary' | 'success' | 'info' | 'warning' | 'danger';
    /** 无默认插槽时的文案 */
    text?: string;
    /** 圆点直径（px），默认 6 */
    dotSize?: number;
  }>(),
  {
    type: 'info',
    text: '',
    dotSize: 6,
  },
);

const rootClass = computed(() => [`dart-state__${props.type}`]);

const dotPx = computed(() => `${props.dotSize}px`);
</script>
<style lang="scss">
.dart-state {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  gap: 6px;
  line-height: 1.25;
  font-size: inherit;
  color: var(--el-text-color-regular);
}

.dart-state__dot {
  flex-shrink: 0;
  width: v-bind(dotPx);
  height: v-bind(dotPx);
  border-radius: 50%;
  background-color: currentColor;
  margin-right: 2px;
}

.dart-state__text {
  flex: 1;
  min-width: 0;
}

.dart-state__primary {
  color: var(--el-color-primary);
  .dart-state__dot {
    box-shadow: 0 0 0 5px rgba(var(--el-color-primary-rgb), 0.08);
  }
}

.dart-state__success {
  color: var(--el-color-success);
  .dart-state__dot {
    box-shadow: 0 0 0 5px rgba(var(--el-color-success-rgb), 0.08);
  }
}

.dart-state__info {
  color: var(--el-color-info);
  .dart-state__dot {
    box-shadow: 0 0 0 5px rgba(var(--el-color-info-rgb), 0.08);
  }
}

.dart-state__warning {
  color: var(--el-color-warning);
  .dart-state__dot {
    box-shadow: 0 0 0 5px rgba(var(--el-color-warning-rgb), 0.08);
  }
}

.dart-state__danger {
  color: var(--el-color-danger);
  .dart-state__dot {
    box-shadow: 0 0 0 5px rgba(var(--el-color-danger-rgb), 0.08);
  }
}
</style>
