<template>
  <el-row class="dart-tool">
    <el-col :span="span[0]" :xs="spanXS[0]">
      <div class="dart-tool__content">
        <slot name="content"></slot>
      </div>
    </el-col>
    <el-col :span="span[1]" :xs="spanXS[1]">
      <div class="dart-tool__operate">
        <div ref="operateRef" class="dart-tool__operate-slot">
          <slot name="operate"></slot>
        </div>
        <dart-tool-btn
          :show-default-btn="showDefaultBtn"
          :show-full-screen="showFullScreen"
          :show-border="showBorder"
          :show-columnset="showColumnset"
          :divider="hasOperateContent"
          @fullscreen-change="onFullscreenChange"
          @border-change="onBorderChange"
          @columnset="emit('columnset')"
        />
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
export default {
  name: 'DartTool',
};
</script>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import DartToolBtn from './tool-btn.vue';

const operateRef = ref<HTMLElement>();
const hasOperateContent = ref(false);

// operate 插槽内容可能被 v-if 隐藏（渲染为注释节点），需检测实际 DOM 内容；
// 稳定插槽下父组件切换 v-if 不会触发本组件重渲染，故用 MutationObserver 监听 DOM 变化
const checkOperateContent = () => {
  const el = operateRef.value;
  hasOperateContent.value =
    !!el &&
    (el.childElementCount > 0 ||
      Array.from(el.childNodes).some(
        (node) =>
          node.nodeType === Node.TEXT_NODE && !!node.textContent?.trim(),
      ));
};

let operateObserver: MutationObserver | undefined;

onMounted(() => {
  checkOperateContent();
  const el = operateRef.value;
  if (el) {
    operateObserver = new MutationObserver(checkOperateContent);
    operateObserver.observe(el, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }
});

onBeforeUnmount(() => {
  operateObserver?.disconnect();
});

withDefaults(
  defineProps<{
    /** PC 端屏幕分栏占比 */
    span?: number[];
    /** 移动端小屏幕分栏占比 */
    spanXS?: number[];
    /** 显示默认操作按钮（全屏/竖线/表格设置，隐藏时含分隔竖线） */
    showDefaultBtn?: boolean;
    /** 显示全屏按钮 */
    showFullScreen?: boolean;
    /** 显示竖线按钮 */
    showBorder?: boolean;
    /** 显示表格设置按钮 */
    showColumnset?: boolean;
  }>(),
  {
    span: () => [12, 12],
    spanXS: () => [24, 24],
    showDefaultBtn: true,
    showFullScreen: false,
    showBorder: true,
    showColumnset: true,
  },
);

const emit = defineEmits<{
  (e: 'fullscreen-change', val: boolean): void;
  (e: 'border-change', val: boolean): void;
  (e: 'columnset'): void;
}>();

const onFullscreenChange = (val: boolean) => {
  emit('fullscreen-change', val);
};

const onBorderChange = (val: boolean) => {
  emit('border-change', val);
};
</script>

<style lang="scss">
.dart-tool {
  margin-bottom: 16px;

  .dart-tool__content {
    min-height: 32px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .dart-tool__operate {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
    min-height: 32px;
  }

  .dart-tool__operate-slot {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
}
</style>
