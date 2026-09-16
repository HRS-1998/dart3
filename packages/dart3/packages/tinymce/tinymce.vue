<template>
  <div :id="state.id" class="tiny-textarea"></div>
  <p v-if="state.err">{{ state.err }}</p>
</template>

<script lang="ts">
export default {
  name: 'DartTinymce',
};
</script>

<script setup lang="ts">
import {
  reactive,
  watch,
  onMounted,
  onBeforeUnmount,
  onActivated,
  onDeactivated,
} from 'vue';

import {
  uuid,
  getTinymce,
  getContent,
  setContent,
  resetContent,
  setModeDisabled,
  //   getContentStyle,
  //   imageUploadHandler,
} from './utils';

import { scriptLoader } from './loader';

const props = defineProps({
  modelValue: String,
  setting: { type: Object, default: () => ({}) },
  setup: Function,
  disabled: Boolean,
  scriptSrc: String,
  debug: Boolean,
});

const emit = defineEmits(['update:modelValue', 'init', 'change']);

// 当前域名包含 ct108 时，使用当前域名+端口加载 CDN 资源（便于在 wujie 中保持同域）
const getCdnOrigin = () => {
  if (window.location.hostname.includes('ct108')) {
    return `//${window.location.host}`;
  }
  return '//admin-new.ct108.net';
};

let mounting = true;

const state = reactive<any>({
  editor: null,
  id: uuid('tinymce'),
  err: '',
});

const getModelValue = () => props.modelValue + '';

const updateValue = (val: any) => emit('update:modelValue', val);

const onChanged = (e: any, editor: any) => {
  if (!editor) {
    editor = state.editor;
  }

  const content = getContent(editor);

  updateValue(content);
  emit('change', content);
};

const onInited = (editor: any) => {
  setContent(getModelValue(), editor);

  if (props.disabled && editor.mode.get() !== 'readonly') {
    setModeDisabled(editor);
  }

  // change input undo redo keyup
  editor.on('change input undo redo', (e: any) => {
    onChanged(e, editor);
  });

  emit('init', editor);
};

const initEditor = () => {
  const tinymce: any = getTinymce();
  if (!tinymce) {
    state.err = 'tinymce is null';
    return;
  }

  const settingConfig: any = {
    language_url: `${getCdnOrigin()}/static/cdn/tinymce/6.4.2/langs/zh-Hans.js`,
    language: 'zh-Hans',
    content_style:
      'body { font-family:Microsoft YaHei,Helvetica,Arial,sans-serif; font-size:14px }',
    font_size_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
    font_family_formats:
      '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
    promotion: false,
    menubar: false,
    selector: `#${state.id}`,
  };
  const setting: any = Object.assign(settingConfig, props.setting);
  setting.setup = (editor: any) => {
    state.editor = editor;
    if (props.setup) {
      props.setup(editor);
    }
    editor.on('init', () => {
      onInited(editor);
    });
  };

  tinymce.init(setting);
  mounting = false;
};

watch(
  () => props.modelValue,
  (val: any, oldVal: any) => {
    if (!state.editor || !state.editor.initialized) {
      return;
    }
    if (oldVal === val || val === getContent(state.editor)) {
      return;
    }
    if (!val) {
      return resetContent('', state.editor);
    }
    setContent(getModelValue(), state.editor);
  }
);

watch(
  () => props.disabled,
  (val: boolean) => {
    if (!state.editor || !state.editor.initialized) {
      return;
    }
    setModeDisabled(state.editor, val);
  }
);

defineExpose({
  id: state.id,
  editor: state.editor,
});

onMounted(() => {
  if (getTinymce()) {
    initEditor();
    return;
  }
  const scriptSrc = `${getCdnOrigin()}/static/cdn/tinymce/6.4.2/tinymce.min.js`;
  scriptLoader.load(scriptSrc, initEditor);
});

onActivated(() => {
  if (!mounting) {
    initEditor();
  }
});

onDeactivated(() => {
  if (!state.editor) {
    return;
  }
  // state.editor.remove();
  const tinymce: any = getTinymce();
  tinymce && tinymce.remove(`#${state.id}`);
});

onBeforeUnmount(() => {
  if (!state.editor) {
    return;
  }
  const tinymce: any = getTinymce();
  tinymce && tinymce.remove(`#${state.id}`);
});
</script>
<style lang="scss">
.tox-statusbar__branding {
  display: none;
}
</style>
