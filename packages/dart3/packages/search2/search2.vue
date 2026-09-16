<template>
  <div :class="['dart-search2-wrapper', { 'flex-between': !isMobile }]">
    <div
      :class="['content-container', { 'is-collapsed': !isShowHideItem }]"
      :style="{
        '--dart-item-height': `${
          FORM_ITEM_HEIGHT * props.rowFold || FORM_ITEM_HEIGHT
        }px`,
        '--dart-expanded-height':
          expandedHeight > 0 && isShowHideItem
            ? `${expandedHeight}px`
            : undefined,
        overflow: isMobile && isShowHideItem ? 'auto' : undefined,
      }"
    >
      <el-form
        label-width="auto"
        label-position="left"
        inline
        ref="search2FormRef"
        v-bind="$attrs"
      >
        <slot></slot>
      </el-form>
    </div>
    <div
      :class="['button-wrapper', 'mb15', { mt15: isMobile && isShowHideItem }]"
    >
      <slot name="button"></slot>
      <el-button
        v-if="needsCollapse"
        type="primary"
        size="small"
        link
        @click="isShowHideItem = !isShowHideItem"
      >
        {{ isShowHideItem ? '收起' : '展开' }}
        <el-icon class="ml5"
          ><ArrowUpBold v-if="isShowHideItem" /><ArrowDownBold v-else
        /></el-icon>
      </el-button>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'DartSearch2',
};
</script>
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
import useDevice from '../hooks/use-device';

const props = withDefaults(
  defineProps<{ rowFold?: number; defaultExpanded?: boolean }>(),
  {
    rowFold: 1,
    defaultExpanded: false,
  },
);

const { isMobile } = useDevice();
const search2FormRef = ref();
const isShowHideItem = ref(props.defaultExpanded);
const needsCollapse = ref(false);
const expandedHeight = ref(0);
const needsRemeasure = ref(false);
const FORM_ITEM_HEIGHT = 48;

const checkHeight = () => {
  const formEl = search2FormRef.value?.$el;
  if (!formEl) return;
  const container = formEl.parentElement;
  if (!container) return;

  const collapsedHeight = FORM_ITEM_HEIGHT * props.rowFold;

  // 临时展开测量真实高度，抑制视觉副作用
  const savedTransition = container.style.transition;
  const savedVisibility = container.style.visibility;
  container.style.visibility = 'hidden';
  container.style.transition = 'none';
  // 强制解除所有高度约束，确保测量准确
  container.classList.remove('is-collapsed');
  container.style.setProperty('grid-template-rows', '1fr', 'important');
  container.style.setProperty('overflow', 'visible', 'important');

  const realHeight = formEl.scrollHeight;

  // 恢复原始状态
  container.style.removeProperty('grid-template-rows');
  container.style.removeProperty('overflow');
  if (!isShowHideItem.value) container.classList.add('is-collapsed');
  // 先强制回流让收起样式生效，再恢复 transition；否则浏览器会以测量时的
  // 1fr 为起点播放收起过渡动画，导致收起态下缩放屏幕时内容闪现
  void container.offsetHeight;
  container.style.transition = savedTransition;
  container.style.visibility = savedVisibility;

  if (realHeight <= 0) return;
  needsCollapse.value = realHeight > collapsedHeight;
  expandedHeight.value = realHeight;
};

// 展开时，若收起期间宽度有变化则重新测量
watch(isShowHideItem, (expanded) => {
  if (expanded && needsRemeasure.value) {
    needsRemeasure.value = false;
    checkHeight();
  }
});

// rowFold 变化时重新计算折叠高度
watch(
  () => props.rowFold,
  () => {
    if (isShowHideItem.value) {
      checkHeight();
    } else {
      needsRemeasure.value = true;
    }
  },
);

let resizeObserver: ResizeObserver | null = null;
let resizeTimer: ReturnType<typeof setTimeout> | null = null;
let windowResizeHandler: (() => void) | null = null;

onMounted(async () => {
  await nextTick();
  checkHeight();
  const container = search2FormRef.value?.$el?.parentElement;
  if (container && typeof ResizeObserver !== 'undefined') {
    let lastWidth = container.clientWidth;
    resizeObserver = new ResizeObserver((entries) => {
      const width =
        entries[0]?.contentBoxSize?.[0]?.inlineSize ??
        entries[0]?.contentRect?.width;
      if (width !== undefined && Math.round(width) !== Math.round(lastWidth)) {
        lastWidth = Math.round(width);
        if (!isShowHideItem.value) {
          // 收起态：仍需重新测量，否则内容换行后 needsCollapse 不会更新，
          // 展开按钮不出现且换行表单项被裁掉；needsRemeasure 供展开时刷新高度
          needsRemeasure.value = true;
          if (resizeTimer) clearTimeout(resizeTimer);
          resizeTimer = setTimeout(checkHeight, 150);
        } else {
          // 展开态：立即重新测量
          if (resizeTimer) clearTimeout(resizeTimer);
          resizeTimer = setTimeout(checkHeight, 150);
        }
      }
    });
    resizeObserver.observe(container);
  }
  if (!resizeObserver) {
    windowResizeHandler = () => {
      if (!isShowHideItem.value) {
        needsRemeasure.value = true;
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(checkHeight, 150);
      } else {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(checkHeight, 150);
      }
    };
    window.addEventListener('resize', windowResizeHandler);
  }
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  resizeObserver = null;
  if (resizeTimer) clearTimeout(resizeTimer);
  if (windowResizeHandler)
    window.removeEventListener('resize', windowResizeHandler);
});

defineExpose({
  search2FormRef,
  validate: (cb: any) => search2FormRef.value?.validate(cb),
  resetFields: () => search2FormRef.value?.resetFields(),
  clearValidate: (props: any) => search2FormRef.value?.clearValidate(props),
  refreshLayout: checkHeight,
});
</script>

<style lang="scss">
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.dart-search2-wrapper {
  --form-item-label-color: #4f5b75;
  padding: var(--spacing-base) var(--spacing-base) 0;
  background-color: #fff;
  border-radius: 8px;
  border-radius: var(--el-border-radius-base);
  background: var(--el-bg-color);
  box-shadow: var(--card-shadow);
  .content-container {
   
    display: grid;
    grid-template-rows: var(--dart-expanded-height, 1fr);
    transition: grid-template-rows 0.35s ease;
    overflow: hidden;

    --shadow-safe-area: 2px;
    // 将裁剪边界向上扩展，但保持表单和组件占用位置不变
    padding-top: var(--shadow-safe-area);
    margin-top: calc(-1 * var(--shadow-safe-area));

    &.is-collapsed {
      grid-template-rows: var(--dart-item-height);
    }

    > * {
      min-height: 0;
    }
  }

  .button-wrapper {
    display: flex;
    align-items: center;
  }
  .el-form-item {
    width: 320px;
  }
  .el-form-item:has(.el-date-editor) {
    width: 440px;
  }
  //  content中两个 输入框或下拉
  .el-form-item.mulity-content {
    .el-form-item__content {
      border: none;

      flex-wrap: nowrap;
      > :first-child {
        width: 100px;
        //border: 1px solid #dce4f2;
        border-radius: 0 6px 6px 0;
        transition: border-color 0.2s;
      }
      > :last-child {
        margin-left: 8px;
        flex: 1;
        //border: 1px solid #dce4f2;
        border-radius: 6px;
        transition: border-color 0.2s;
        &.el-input {
          .el-input__wrapper {
            border-radius: 6px !important;
          }
        }
        &.el-select {
          .el-select__wrapper {
            border-radius: 6px !important;
          }
        }
      }
      // 子元素聚焦时高亮自身边框
      > :first-child:focus-within,
      > :last-child:focus-within {
        border-color: var(--el-color-primary, #2f6cf6);
      }
    }
  }

  .el-form-item__label-wrap {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    height: 32px;
    margin: 0 !important;
    box-sizing: border-box;
    border: 1px solid #dce4f2;
    border-right: none;
    border-radius: 6px 0 0 6px;
    color: var(--form-item-label-color);
    transition: border-color 0.2s;
    .el-form-item__label {
      text-align: center;
    }
  }
  .el-form-item__content {
    box-sizing: border-box;
    height: 32px;
    // border: 1px solid #dce4f2;
    border-radius: 0 6px 6px 0;
    flex: 1;
    transition: border-color 0.2s;

    // 输入框样式
    .el-input {
      width: 100%;
      height: 100%;
      border: none;
      .el-input__wrapper {
        width: 100%;
        height: 100%;
        padding: 0 16px 0;
        border-radius: 0 6px 6px 0;
        // box-shadow: none;
      }
    }
    // select 样式
    .el-select {
      width: 100%;
      height: 100%;
      border: none;
      .el-select__wrapper {
        width: 100%;
        height: 100%;
        border-radius: 0 6px 6px 0;
        // box-shadow: none;
      }
    }
    //   cascader 样式
    .el-cascader {
      width: 100%;
      height: 100%;
      border: none;
    }

    // 单个日期 ，多个日期 样式
    .el-date-editor.el-input__wrapper {
      // box-shadow: none;
      border-radius: 0 6px 6px 0;
    }
  }

  // 聚焦时只高亮 content 边框
  .el-form-item:focus-within {
    .el-form-item__content {
      border-color: var(--el-color-primary, #2f6cf6);
    }
  }

  .el-form--inline .el-form-item {
    margin-right: 16px !important;
    margin-bottom: 16px !important;
  }

  .el-input-number {
    width: 100%;
  }
}
</style>
