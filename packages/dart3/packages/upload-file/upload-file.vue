<template>
  <el-upload
    ref="uploadRef"
    :file-list="fileList"
    :limit="1"
    :accept="accept"
    :on-exceed="onExceed"
    :on-success="onSuccessFun"
    :on-remove="onRemove"
    :on-progress="onProgress"
    :before-upload="beforeUpload"
    :on-error="onError"
    v-bind="$attrs"
    class="upload-file"
  >
    <template #trigger>
      <el-button :type="type" :link="link" plain>{{ btnName }}</el-button>
    </template>
    <template #file="{ file }">
      <div class="upload-file-row">
        <el-button link :loading="loading" @click="onClickFile">
          <el-icon class="upload-file-doc-icon"><Document /></el-icon>
          <span class="upload-file-name">{{ file?.name || '' }}</span>
        </el-button>
        <span class="upload-file-size" v-if="_fileSize">{{ _fileSize }}</span>
        <el-icon class="upload-file-success"><SuccessFilled /></el-icon>
        <el-icon class="upload-file-remove" @click="onRemove"
          ><Close
        /></el-icon>
      </div>
    </template>
  </el-upload>
</template>

<script lang="ts">
export default {
  name: 'DartUploadFile',
};
</script>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { Close, Document, SuccessFilled } from '@element-plus/icons-vue';
import { showMessage } from '../utils';

const props = withDefaults(
  defineProps<{
    btnName?: string;
    link?: boolean;
    type?: string;
    size?: number;
    maxSize?: number;
    accept?: string;
    modelValue?: string;
    onSuccess?: Function;
    beforeUpload?: Function;
  }>(),
  {
    btnName: '选择文件',
    link: false,
    type: '',
    accept: '.zip,.txt,.csv,.xlsx',
    maxSize: 100 * 1024 * 1024,
    modelValue: '',
  },
);

const emit = defineEmits(['update:modelValue']);

// 等价于 defineModel<string>()（库目标 vue ^3.2.0 不支持）
const fileData = computed<string>({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const uploadRef = ref();
const fileList = ref<any[]>([]);
const loading = ref(false);
const fileSize = ref(0);

const _fileSize = computed(() => {
  const _size = props.size || fileSize.value;
  return _size > 1024 ? `${(_size / 1024).toFixed(2)}M` : `${_size.toFixed(2)}KB`;
});

watch(
  () => fileData.value,
  (newVal: any) => {
    if (!newVal) return;
    const parts = newVal.split('/');
    fileList.value.push({ name: parts[parts.length - 1] || '', url: newVal });
  },
  { immediate: true },
);

const onExceed = (files: any) => {
  uploadRef.value!.clearFiles();
  const file = files[0];
  uploadRef.value!.handleStart(file);
  uploadRef.value!.submit();
};

const beforeUpload = async (file: File) => {
  const parts = file.name.split('.');
  const type = parts[parts.length - 1];
  setLoading(false);
  if (props.beforeUpload && !(await props.beforeUpload(file))) {
    return false;
  }
  if (!props.accept.includes(type!)) {
    showMessage(`上传文件只支持上传 ${props.accept} 格式`);
    fileData.value = '';
    return false;
  }
  if (file.size / 1024 > props.maxSize) {
    if (props.maxSize >= 1024) {
      showMessage(`上传文件大小不能超过${props.maxSize / 1024}MB`);
    } else {
      showMessage(`上传文件大小不能超过${props.maxSize}KB`);
    }
    fileData.value = '';
    return false;
  }
  fileSize.value = file.size / 1024;
  return true;
};

const onSuccessFun = (res: any) => {
  const { code, data, message } = res;
  setLoading(false);
  if ((props.onSuccess && !props.onSuccess(res)) || code) {
    showMessage(message);
    onRemove();
    return;
  }
  if (props.onSuccess) return;
  fileData.value = data;
};

const onRemove = () => {
  setLoading(false);
  fileData.value = '';
  fileList.value = [];
  uploadRef.value!.clearFiles();
};

const onProgress = () => {
  setLoading(true);
};

const onError = () => {
  setLoading(false);
};

const setLoading = (bool: boolean) => {
  loading.value = bool;
};

const onClickFile = () => {
  window.open(fileData.value);
};
</script>

<style lang="scss">
.upload-file {
  display: inline-flex;
  align-items: center;

  .el-upload-list {
    display: inline-flex;
    align-items: center;
    margin-left: 8px;
    margin-top: 0;
  }

  .el-upload-list__item {
    transition: none;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin: 0;
    padding: 0;
  }

  .upload-file-name {
    font-size: 13px;
    color: #303133;
  }

  .upload-file-size {
    font-size: 12px;
    color: #909399;
    margin-left: 20px;
  }

  .upload-file-success {
    color: #67c23a;
    margin-left: 20px;
  }

  .upload-file-remove {
    cursor: pointer;
    color: #909399;
    margin-left: 20px;
    &:hover {
      color: #f56c6c;
    }
  }

  .upload-file-doc-icon {
    margin-right: 5px;
  }

  .upload-file-row {
    display: flex;
    align-items: center;
    width: 100%;
  }
}
</style>
