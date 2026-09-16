<template>
  <el-drawer
    :model-value="status"
    :size="isMobile ? '90%' : size"
    :close-on-click-modal="!hasPermission || !isEdit"
    :before-close="onBeforeClosed"
    destroy-on-close
    @closed="onClosed"
    class="dart-drawer"
    ref="drawerRef"
    v-bind="$attrs"
  >
    <template #header>
      <slot name="header" />
    </template>

    <el-scrollbar v-loading="loading" v-if="hasPermission">
      <div class="mb10">
        <slot />
      </div>
    </el-scrollbar>
    <NoPermission v-else />

    <template #footer>
      <div class="flex-end" v-if="!$slots.footer && isFooter">
        <el-button @click="onCancel">{{ cancelTitle }}</el-button>
        <el-button
          type="primary"
          @click="onSubmit"
          :loading="confirmLoading"
          v-if="isEdit && hasPermission"
        >
          {{ confirmTitle }}
        </el-button>
      </div>
      <slot name="footer" />
    </template>
  </el-drawer>
</template>
<script lang="ts">
export default {
  name: 'DartDrawer',
};
</script>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import NoPermission from '../NoPermission.vue';
import { ElMessageBox } from 'element-plus';
import useDevice from '../hooks/use-device';

const drawerRef = ref();

const { isMobile } = useDevice();
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  isFooter: { type: Boolean, default: true }, //显示底部操作
  isEdit: { type: Boolean, default: true }, //编辑模式
  cancelTitle: { type: String, default: '取消' },
  confirmTitle: { type: String, default: '确定' },
  size: { type: String, default: '60%' },
  loading: { type: Boolean, default: false }, //页面loading
  confirmLoading: { type: Boolean, default: false }, //确认loading
  showConfirmOnClose: { type: Boolean, default: false }, //是否在关闭前弹出确认框
  confirmText: { type: String, default: '当前编辑内容未保存，是否退出？' }, //确认文本
  hasPermission: { type: Boolean, default: false },
});
const emit = defineEmits(['closed', 'confirm', 'cancel', 'update:modelValue']);
const status = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val),
});
const onSubmit = (): void => {
  emit('confirm');
};
const onClosed = (): void => {
  emit('closed');
};
const onCancel = (): void => {
  emit('cancel');
  drawerRef.value?.handleClose();
};
const onBeforeClosed = (done: (cancel?: boolean) => void): void => {
  if (props.showConfirmOnClose && props.hasPermission) {
    ElMessageBox.alert(props.confirmText, '确认', {
      showCancelButton: true,
      type: 'warning',
      callback: async (action: string) => {
        if (action === 'cancel') return;
        done(false);
      },
    });
    return;
  }
  done(false);
};

defineExpose({
  handleClose: () => drawerRef.value?.handleClose(),
});
</script>
<style lang="scss">
.dart-drawer {
  .el-drawer__header {
    h4 {
      margin: 0 !important;
      padding: 0 !important;
    }
  }

  .el-drawer__body {
    padding: 24px 0px 0px 32px !important;
    > .el-scrollbar {
      padding-right: 32px;
      // 必须用 > 直接子选择器：el-table 内部也用 el-scrollbar，
      // 后代选择器会命中表格内部 .el-scrollbar__view，使其成为横向滚动容器，
      // 导致 fixed 列的 sticky 单元格绑定到不滚动的外层而失效（表头不受影响）
      > .el-scrollbar__view {
        overflow-x: hidden !important;
      }
    }
  }

  .flex-end {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
