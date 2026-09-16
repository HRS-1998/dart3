<template>
  <el-dialog
    :model-value="status"
    :width="width"
    :close-on-click-modal="!hasPermission || !isEdit"
    :before-close="onBeforeClosed"
    ref="dialogRef"
    @closed="onClosed"
    class="dart-dialog-model"
    v-bind="$attrs"
  >
    <template #header>
      <slot name="header" />
    </template>
    <slot v-if="hasPermission" />
    <NoPermission v-else />
    <template #footer>
      <div v-if="!$slots.footer && isFooter">
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
  </el-dialog>
</template>
<script lang="ts">
export default {
  name: 'DartDialog'
};
</script>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import NoPermission from '../NoPermission.vue';
import { ElMessageBox } from 'element-plus';

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  width: { type: String, default: '40%' },
  isFooter: { type: Boolean, default: true }, //显示操作
  isEdit: { type: Boolean, default: true }, //编辑模式
  cancelTitle: { type: String, default: '取消' },
  confirmTitle: { type: String, default: '确定' },
  loading: Boolean, //页面loading
  confirmLoading: Boolean, //确认loading
  showConfirmOnClose: { type: Boolean, default: false }, //是否在关闭前弹出确认框
  confirmText: { type: String, default: '当前编辑内容未保存，是否退出？' }, //确认文本
  hasPermission: { type: Boolean, default: false }
});
const emit = defineEmits(['closed', 'confirm', 'cancel', 'update:modelValue']);
const dialogRef = ref();
const status = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val)
});

const onSubmit = () => {
  emit('confirm');
};
const onClosed = () => {
  status.value = false;
  emit('closed');
};
const onCancel = () => {
  emit('cancel');
  dialogRef.value?.handleClose();
};

const onBeforeClosed = (done: (cancel?: boolean) => void): void => {
  if (props.showConfirmOnClose && props.hasPermission) {
    ElMessageBox.alert(props.confirmText, '确认', {
      showCancelButton: true,
      type: 'warning',
      callback: async (action: string) => {
        if (action === 'cancel') return;
        done(false);
      }
    });
    return;
  }
  done(false);
};

defineExpose({
  handleClose: () => dialogRef.value?.handleClose()
});
</script>

<style lang="scss"> 
.dart-dialog-model .el-dialog__body {
  max-height: var(--dialog-body-max-height);
  overflow-y: auto;
}
</style>
