<template>
  <div class="el-upload-list el-upload-list--picture-card dart-avatar">
    <VueDraggable
      v-model="imgList"
      @update="onDragUpdate"
      :disabled="!draggable"
    >
      <div
        v-for="(url, index) in imgList"
        :key="url + index"
        @click.stop
        class="el-upload-list__item mr10"
      >
        <el-image
          preview-teleported
          :src="url"
          :fit="fit"
          :preview-src-list="[url]"
          :ref="(el) => setRef(el, index)"
          class="dart-avatar"
        />
        <span
          :class="[
            'el-upload-list__item-actions',
            draggable ? 'is-drag-avatar' : '',
          ]"
        >
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(index)"
            v-if="operate.includes('preview')"
          >
            <el-icon><zoom-in /></el-icon>
          </span>
          <span
            class="el-upload-list__item-delete"
            @click="handleRemove(index)"
            v-if="operate.includes('delete')"
          >
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </VueDraggable>
    <el-upload
      class="dart-avatar-uploader"
      v-bind="$attrs"
      :accept="accept"
      :multiple="multiple"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :on-success="handleSuccess"
      :on-progress="handleProgress"
      :on-error="handleError"
    >
      <template
        v-if="
          (!isMultiple && !imgList.length) ||
          (isMultiple && imgList.length < limit)
        "
      >
        <div class="dart-avatar-uploader-add">
          <el-icon v-if="loading" class="is-loading dart-avatar-uploader-icon">
            <Loading />
          </el-icon>
          <el-icon v-if="!loading" class="dart-avatar-uploader-icon">
            <Plus />
          </el-icon>
        </div>
      </template>
    </el-upload>
  </div>
</template>
<script lang="ts">
export default {
  name: 'DartAvatar',
};
</script>
<script lang="ts" setup>
import { computed, ref, useAttrs, watch } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
import type { UploadProps } from 'element-plus';
import { showMessage } from '../utils';

const props = withDefaults(
  defineProps<{
    modelValue: string | Array<string>;
    accept?: string;
    maxSize?: number;
    width?: number | string;
    height?: number | string;
    onSuccess: Function;
    onError?: Function;
    beforeUpload?: Function;
    fit?: string;
    multiple?: boolean;
    limit?: number;
    draggable?: boolean;
    operate?: string[];
  }>(),
  {
    modelValue: '',
    accept: '.jpg,.jpeg,.png,.gif',
    maxSize: 100,
    width: 100,
    height: 100,
    fit: 'cover',
    limit: 999,
    operate: () => ['preview', 'delete'],
  },
);

const emit = defineEmits(['update:modelValue']);
const attrs = useAttrs();
const imageRefs = ref<any[]>([]);
const loading = ref(false);
const imgList = ref<string[]>([]);

const pw = computed(() => {
  return props.width + 'px';
});
const ph = computed(() => {
  return props.height + 'px';
});
const isMultiple = computed(() => !!props.multiple);

watch(
  () => props.modelValue,
  (newVal: any) => {
    if (!newVal) {
      imgList.value = [];
      return;
    }
    if (isMultiple.value && Array.isArray(newVal)) {
      imgList.value = [...newVal];
      return;
    }
    imgList.value = [newVal];
  },
  {
    immediate: true,
  },
);

const onDragUpdate = () => {
  emit('update:modelValue', imgList.value);
};
const handleSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  setLoading(false);
  if (!props.onSuccess) {
    emit('update:modelValue', URL.createObjectURL(uploadFile.raw!));
    return;
  }

  const data: string = props.onSuccess(response, uploadFile);

  if (imgList.value.length < props.limit) {
    imgList.value.push(data);
  }
  if (isMultiple.value) {
    emit('update:modelValue', imgList.value);
    return;
  }
  emit('update:modelValue', data);
};
const handleRemove = (index: number) => {
  setLoading(false);

  if (isMultiple.value) {
    imgList.value.splice(index, 1);
    emit('update:modelValue', imgList.value);
    return;
  }
  imgList.value = [];
  emit('update:modelValue', '');
};

const handlePictureCardPreview = (index: number) => {
  if (index !== -1 && imageRefs.value[index]) {
    (imageRefs.value[index] as any).showPreview();
  }
};

// 设置 ref 到数组中
const setRef = (el: any, index: number) => {
  if (el) {
    imageRefs.value[index] = el;
  }
};

const setLoading = (bool: boolean) => {
  loading.value = bool;
};
const getAcceptType = () => {
  const acceptMap: any = {
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.bmp': 'image/bmp',
    '.png': 'image/png',
    '.ico': 'image/x-icon', // 新增 ICO 格式
  };
  const list = props.accept.split(',');
  const result: Array<any> = [];
  for (const item of list) {
    if (acceptMap[item]) {
      result.push(acceptMap[item]);
    }
  }
  return result;
};
const beforeAvatarUpload: UploadProps['beforeUpload'] = async (rawFile) => {
  setLoading(false);

  const picTypes = getAcceptType();

  if (picTypes.indexOf(rawFile.type) < 0) {
    showMessage(`图片只支持上传 ${props.accept} 格式`);
    return false;
  }
  if (rawFile.size / 1024 > props.maxSize) {
    if (props.maxSize >= 1024) {
      showMessage(`图片大小不能超过${props.maxSize / 1024}M`);
    } else {
      showMessage(`图片大小不能超过${props.maxSize}KB`);
    }
    return false;
  }
  if (props.beforeUpload && !(await props.beforeUpload(rawFile))) {
    return false;
  }
  return true;
};
const handleProgress = () => {
  setLoading(true);
};
const handleError = (err: any) => {
  setLoading(false);
  props.onError && props.onError(err);
};
</script>
<style lang="scss">
.dart-avatar {
  .is-drag-avatar {
    cursor: grab !important;
    &:active {
      cursor: grabbing !important;
    }
    &::after {
      content: '';
      position: absolute;
      top: -3px;
      left: -3px;
      padding: 0 4px 4px 0;
      width: 100%;
      height: 100%;
      border: 1px dashed var(--el-color-primary);
      border-radius: 3px;
    }
  }

  .el-upload-list__item-preview,
  .el-upload-list__item-delete {
    z-index: 999;
  }

  .dart-avatar {
    width: v-bind(pw);
    height: v-bind(ph);
  }

  .el-upload--picture-card,
  .el-upload-list__item {
    width: v-bind(pw) !important;
    height: v-bind(ph) !important;
    overflow: visible !important;
  }

  .el-upload-list__item-actions {
    width: v-bind(pw) !important;
    height: v-bind(ph) !important;
  }

  .dart-avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .dart-avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .dart-avatar-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    margin: auto;
  }
  .dart-avatar-uploader-add {
    width: v-bind(pw);
    height: v-bind(ph);
    display: flex;
    justify-items: center;
    align-items: center;
  }
  .dart-avatar-uploader-progress {
    margin: auto;
  }
  .dart-avatar-uploader-preview {
    text-align: center;
  }
}
</style>
