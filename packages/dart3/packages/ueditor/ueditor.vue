<template>
  <iframe
    :src="iframeSrc"
    :id="randomId"
    class="dart-editor-iframe"
    :height="props.height"
    :width="props.width"
    :class="{ 'dart-editor--full': fullscreen }"
  ></iframe>
</template>
<script lang="ts">
export default {
  name: 'DartUeditor',
};
</script>
<script lang="ts" setup>
import { inject, onBeforeUnmount, computed, ref, onMounted } from 'vue';
import { formItemContextKey } from 'element-plus';
import Utils from '../utils';

const props = defineProps({
  config: {
    // UEditor 配置项
    type: Object,
    default: () => {},
  },
  height: {
    type: [String, Number],
    default: 260,
  },
  width: {
    type: [String, Number],
    default: '100%',
  },
  fontSize: { type: Number, default: 12 },
  modelValue: { type: String, default: '' },
});
const fullscreen = ref(false);
const emit = defineEmits(['change', 'update:modelValue']);
const value = computed({
  get: () => {
    setEditorValue();
    return props.modelValue;
  },
  set: (value) => {
    emit('update:modelValue', value);
  },
});

// const iframeUrl =
//   '//admin-new.ct108.net/static/cdn/ueditor/1433.1/editor/index.html?id=';
const iframeUrl = `//admin-new.ct108.net/static/cdn/ueditor/1433.2/editor/index.html?fontsize=${
  props.fontSize as any
}&id=`;
const actionList = {
  editorInit: 'editorInit', //父页面触发编辑器初始化
  editorSetValue: 'editorSetValue', //父页面触发赋值
  iframeChangeValue: 'iframeChangeValue', //编辑器改变值
  iframeLoad: 'iframeLoad', //页面load完成
  beforefullscreenchange: 'beforefullscreenchange',
};
const defaultConfig = {
  // ueditor 配置项
  serverUrl: '', //图片上传地址
  initialFrameWidth: '100%', // 初始化宽度
  initialFrameHeight: 230, // 初始化高度 px
  elementPathEnabled: false, // 是否显示元素路径
  autoClearinitialContent: false, // 是否自动清除编辑器初始内容
  wordCountMsg: '当前已输入{#count}个字符, 您还可以输入{#leave}个字符&emsp;', // 字数统计
  toolbars: [
    // 默认工具栏
    [
      'fullscreen',
      'bold', // 加粗
      'italic', // 斜体
      'fontsize', // 字号
      'underline', // 下划线
      'forecolor', // 字体颜色
      'justifyleft', // 居左对齐
      'justifycenter', // 居中对齐
      'justifyright', // 居右对齐
      'justifyjustify', // 两端对齐
      'lineheight', // 行间距
      'removeformat', // 清除格式
      'source', // 查看源码
    ],
  ],
};
//获取唯一id
const getRandomCode = (length: number): string => {
  if (length > 0) {
    const data = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
    ];
    let nums = '';
    let i = 0;
    for (i = 0; i < length; i++) {
      const r = parseInt(`${Math.random() * 61}`);

      nums += data[r];
    }
    return nums;
  }
  return '';
};
const randomId = 'editor_' + getRandomCode(10);
const iframeSrc = iframeUrl + randomId;

const elFormItem = inject(formItemContextKey, undefined);

const handleDispatch = () => {
  (elFormItem as any).validate('change');
};
const sendMessage = (action: any, data: any) => {
  const iframe = document.getElementById(randomId);

  if (!iframe) {
    return;
  }
  (iframe as any).contentWindow.postMessage(
    JSON.stringify({
      from: randomId,
      action: action,
      data: data,
    }),
    '*'
  );
};
// eslint-disable-next-line complexity
const dealIframeMessage = (obj: any) => {
  const newConfig = props.config || {};
  if (obj.action === actionList.iframeLoad) {
    const config = Object.assign({}, defaultConfig, newConfig);

    sendMessage(actionList.editorInit, {
      value: value.value,
      config: config,
    });
    return;
  }
  if (obj.action === actionList.iframeChangeValue) {
    value.value = obj.data;
    emit('change', obj.data);
    handleDispatch();
    return;
  }
  if (obj.action === actionList.beforefullscreenchange) {
    const body = document.querySelector('body');
    fullscreen.value = obj.data;
    if (obj.data) {
      body && body.classList.add('el-popup-parent--hidden');
    } else {
      body && body.classList.remove('el-popup-parent--hidden');
    }
  }
};
const setEditorValue = () => {
  sendMessage(actionList.editorSetValue, value.value);
};

const messageListener = (e: any) => {
  try {
    const obj = Utils.isString(e.data) ? JSON.parse(e.data) : e.data; //转换json字符
    if (obj.from === randomId) {
      dealIframeMessage(obj);
    }
  } catch (er) {
    console.log(er);
  }
};

onBeforeUnmount(() => {
  console.log(window.removeEventListener);
  window.removeEventListener('message', messageListener, true);
});
onMounted(() => {
  window.addEventListener('message', messageListener);
});
</script>
<style lang="scss">
.dart-editor--full {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.dart-editor-iframe {
  border: 0;
}
</style>
