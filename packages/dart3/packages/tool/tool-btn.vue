<template>
  <div v-if="showDefaultBtn" class="dart-tool-default-ops">
    <span v-if="divider" class="dart-tool-default-ops__divider"></span>
    <el-tooltip
      v-if="showFullScreen"
      :content="isFullscreen ? '退出表格全屏' : '全屏显示表格'"
      placement="bottom"
    >
      <el-button class="dart-tool-op" @click="toggleScreen" plain>
        <svg
          v-if="!isFullscreen"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
          <path d="M4 16v2a2 2 0 0 0 2 2h2" />
          <path d="M16 4h2a2 2 0 0 1 2 2v2" />
          <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M15 19v-2a2 2 0 0 1 2 -2h2" />
          <path d="M15 5v2a2 2 0 0 0 2 2h2" />
          <path d="M5 15h2a2 2 0 0 1 2 2v2" />
          <path d="M5 9h2a2 2 0 0 0 2 -2v-2" />
        </svg>
      </el-button>
    </el-tooltip>

    <el-tooltip v-if="showBorder" content="设置显示列竖线" placement="bottom">
      <el-button class="dart-tool-op" @click="toggleBorder" plain>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"
          />
          <path
            d="M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"
          />
          <path
            d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"
          />
          <path
            d="M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"
          />
        </svg>
      </el-button>
    </el-tooltip>

    <el-tooltip v-if="showColumnset" content="表格设置" placement="bottom">
      <el-button class="dart-tool-op" @click="toggleColumnset" plain>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"
          />
          <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
        </svg>
      </el-button>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DartToolBtn',
};
</script>

<script lang="ts" setup>
import { ref } from 'vue';

defineProps({
  /** 是否显示默认操作按钮（隐藏时含分隔竖线） */
  showDefaultBtn: {
    type: Boolean,
    default: true,
  },
  showFullScreen: {
    type: Boolean,
    default: false,
  },
  showBorder: {
    type: Boolean,
    default: true,
  },
  showColumnset: {
    type: Boolean,
    default: true,
  },
  /** operate 插槽有内容时显示左侧分隔竖线 */
  divider: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits<{
  (e: 'fullscreen-change', val: boolean): void;
  (e: 'border-change', val: boolean): void;
  (e: 'columnset'): void;
}>();
const isFullscreen = ref(false);
const borderVisible = ref(false);

const blurTarget = (e?: MouseEvent) => {
  (e?.currentTarget as HTMLElement | undefined)?.blur();
};

const toggleScreen = (e?: MouseEvent) => {
  isFullscreen.value = !isFullscreen.value;
  emit('fullscreen-change', isFullscreen.value);
  blurTarget(e);
};

const toggleBorder = (e?: MouseEvent) => {
  borderVisible.value = !borderVisible.value;
  emit('border-change', borderVisible.value);
  blurTarget(e);
};

const toggleColumnset = (e?: MouseEvent) => {
  emit('columnset');
  blurTarget(e);
};
</script>

<style lang="scss" scoped>
.dart-tool-default-ops {
  margin-left: 12px;
  display: inline-flex;
  align-items: center;
}

.dart-tool-default-ops__divider {
  width: 1px;
  height: 20px;
  margin-right: 12px;
  background-color: #e9eef4;
}

.dart-tool-op {
  width: 32px;
  height: 32px;
  border: 1px solid transparent;
  border-radius: 6px;
  background-color: #f3f6f9;
  color: #4f5b75;
  font-weight: 700;
  transition:
    border-color 0.18s ease,
    color 0.18s ease,
    background 0.18s ease,
    box-shadow 0.18s ease;

  :deep(.el-icon) {
    color: inherit;
  }

  &:hover,
  &:focus {
    border-color: #2f6cf6;
    background-color: #f8faff;
  }
}
</style>
