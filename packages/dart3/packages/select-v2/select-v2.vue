<template>
  <el-select-v2 ref="selectRef" v-model="boundValue" v-bind="attrs">
    <template v-if="$slots.default" #default="slotProps">
      <slot name="default" v-bind="slotProps" />
    </template>
    <template v-else #default="{ item }">
      <div
        class="dart-select-v2__option-text"
        @mouseenter="onOptionMouseEnter($event, item)"
        @mouseleave="onOptionMouseLeave"
      >
        {{ getOptionLabel(item) }}
      </div>
    </template>
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
    <template v-if="$slots.empty" #empty>
      <slot name="empty" />
    </template>
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix" />
    </template>
    <template v-if="$slots.tag" #tag="slotProps">
      <slot name="tag" v-bind="slotProps" />
    </template>
    <template v-if="$slots.loading" #loading>
      <slot name="loading" />
    </template>
    <template v-if="$slots.label" #label="slotProps">
      <slot name="label" v-bind="slotProps" />
    </template>
  </el-select-v2>

  <el-tooltip
    v-if="ellipsisTooltip && tooltip.visible"
    :visible="tooltip.visible"
    :content="tooltip.content"
    :virtual-ref="tooltip.ref"
    virtual-triggering
    placement="right"
  />
</template>

<script lang="ts">
export default {
  name: 'DartSelectV2',
  inheritAttrs: false
};
</script>

<script lang="ts" setup>
import { computed, useAttrs, nextTick, ref } from 'vue';

type DartSelectV2Model =
  | string
  | number
  | boolean
  | Record<string, unknown>
  | unknown[]
  | undefined;

const props = withDefaults(
  defineProps<{
    modelValue?: DartSelectV2Model;
    /** 未自定义 #default 时，选项文本被截断是否在悬浮层展示全文 */
    ellipsisTooltip?: boolean;
  }>(),
  {
    ellipsisTooltip: true
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: DartSelectV2Model): void;
}>();

const boundValue = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
});

const attrs = useAttrs();

const selectRef = ref<any>(null);

const tooltip = ref<{
  visible: boolean;
  content: string;
  ref: HTMLElement | null;
}>({
  visible: false,
  content: '',
  ref: null
});

function getOptionLabel(item: unknown): string {
  const rawProps = attrs.props as Record<string, string> | undefined;
  const labelKey = rawProps?.label ?? 'label';
  if (item != null && typeof item === 'object' && labelKey in item) {
    const v = (item as Record<string, unknown>)[labelKey];
    return v != null ? String(v) : '';
  }
  return '';
}

function isEll(el: HTMLElement) {
  return el.scrollWidth > el.clientWidth;
}

async function onOptionMouseEnter(e: MouseEvent, item: unknown) {
  if (!props.ellipsisTooltip) return;
  const target = e.currentTarget as HTMLElement;
  if (!isEll(target)) return;
  tooltip.value.content = getOptionLabel(item);
  tooltip.value.ref = target;
  await nextTick();
  tooltip.value.visible = true;
}

function onOptionMouseLeave() {
  tooltip.value.visible = false;
}

defineExpose({
  focus: () => selectRef.value?.focus?.(),
  blur: () => selectRef.value?.blur?.(),
  get selectedLabel() {
    return selectRef.value?.selectedLabel;
  }
});
</script>

<style lang="scss" scoped>
.dart-select-v2__option-text {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 34px;
}
</style>
