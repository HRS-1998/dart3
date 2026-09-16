<template>
  <el-popconfirm
    placement="top-end"
    v-bind="$attrs"
    :title="title || `确定${name}吗`"
    :hide-after="50"
    ref="popconfirmRef"
    @show="handleShow"
    @confirm="handleApi"
  >
    <template #reference>
      <el-button
        :type="type"
        :link="link"
        :icon="btnIcon"
        :loading="loading"
        v-if="!hasAASlot"
      >
        {{ name }}
      </el-button>
      <slot name="custom" :loading="loading"></slot>
    </template>
  </el-popconfirm>
</template>

<script lang="ts">
export default {
  name: 'DartCommonBtn',
};
</script>

<script setup lang="ts">
import { ref, useSlots, computed, onMounted, onUnmounted } from 'vue';
import { showMessage, to } from '../utils';

const props = withDefaults(
  defineProps<{
    type?: string;
    link?: boolean;
    title?: string; // 弹窗提示语
    btnIcon?: any; // icon 图标
    dataMap?: { data: string; code: string };
    code?: number | boolean; // 接口返回 code
    message?: string; // 操作成功提示消息
    name: string; // 按钮名
    params: { [key: string]: any };
    ajax: (params: any) => Promise<any>;
    success?: (name: string) => any; // 成功回调，参数为按钮名称
  }>(),
  {
    type: 'primary',
    link: true,
    code: 0,
    dataMap: () => {
      return { data: 'data', code: 'code' };
    },
  },
);

const hasAASlot = computed(() => {
  const slots = useSlots();

  return !!slots.custom;
});

const loading = ref(false);
const popconfirmRef = ref<any>(null);

// 滚动时立刻关闭 popconfirm（无动画）
const handleScroll = () => {
  const el = popconfirmRef.value?.popperRef?.contentRef;
  if (el) {
    el.style.display = 'none';
    // 禁用动画后隐藏，再恢复动画
    el.style.transition = 'none';
    popconfirmRef.value?.hide?.();
    requestAnimationFrame(() => {
      el.style.transition = '';
    });
  }
};

onMounted(() => {
  // 无界环境下监听 document 和 window
  window.addEventListener('scroll', handleScroll, true);
  const target = (window as any).__POWERED_BY_WUJIE__ ? document : window;
  target.addEventListener('scroll', handleScroll, true);
});

onUnmounted(() => {
  const target = (window as any).__POWERED_BY_WUJIE__ ? document : window;
  target.removeEventListener('scroll', handleScroll, true);

  window.removeEventListener('scroll', handleScroll, true);
});

// popconfirm 弹层传送至 body 且 popper-class 被其内部硬编码覆盖，
// 只能在 show 时给弹层节点打标类，让下方样式仅作用于本组件实例
const handleShow = () => {
  popconfirmRef.value?.popperRef?.contentRef?.classList?.add(
    'dart-common-btn-popper',
  );
};

const handleApi = async () => {
  if (loading.value) return;
  loading.value = true;
  const [err, res] = await to(props.ajax({ ...props.params })).finally(() => {
    loading.value = false;
  });

  if (err) return;
  if (res[props.dataMap.code] !== props.code) return;
  const msg = props.message ? props.message : `${props.name}成功！`;

  showMessage(msg, 'success');
  setTimeout(() => {
    props.success && props.success(props.name);
  }, 200);
};
</script>

<style lang="scss">
.dart-common-btn-popper {
  .el-popconfirm__main {
    margin: 0 !important;
  }
}
</style>
