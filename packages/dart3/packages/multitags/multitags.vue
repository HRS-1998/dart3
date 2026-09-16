<template>
  <div class="dart-multitags">
    <div class="dart-multitags__title">
      {{ title }}
    </div>

    <div class="dart-multitags__tags">
      <el-tag
        v-for="item in items"
        :key="item"
        class="dart-multitags__tag"
        effect="plain"
      >
        <span class="dart-multitags__tag-text">
          {{ item }}
        </span>
      </el-tag>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DartMultitags',
};
</script>
<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  /** `标题(项1、项2)` 格式，括号内以 、/,/， 分割为标签 */
  value?: string;
}>();

const title = computed(() => {
  if (!props.value) return '';

  const match = props.value.match(/^(.+?)[(（]/);

  return match?.[1]?.trim() || props.value;
});

const items = computed(() => {
  if (!props.value) return [];

  const match = props.value.match(/[(（](.*?)[)）]/);

  if (!match?.[1]) return [];

  return match[1]
    .split(/[、,，]/)
    .map((item) => item.trim())
    .filter(Boolean);
});
</script>

<style scoped lang="scss">
.dart-multitags {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 6px;

  &__title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__tags {
    min-width: 0;
    line-height: 24px;
    // 行内排列 + 单行省略：行末超出的 tag 显示 "…"
    // 被省略的内容仍在文档流中，外层 show-overflow-tooltip 可正常触发并展示全部 tag
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__tag {
    // 行内流不支持 gap，用右间距代替
    vertical-align: top;
    margin-right: 6px;
    font-size: 12px;
    color: #7b869f;
    background: #f2f5fa;
    padding: 2px 5px;

    &:last-child {
      margin-right: 0;
    }

    max-width: 120px;
  }

  &__tag-text {
    display: block;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
