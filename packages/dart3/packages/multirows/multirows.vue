<template>
  <div class="dart-multirows">
    <el-tooltip :content="name" placement="top" :disabled="!isOverflow">
      <div
        ref="nameRef"
        class="dart-multirows__name"
        @mouseenter="checkNameOverflow"
      >
        {{ name }}
      </div>
    </el-tooltip>

    <el-tooltip :content="metaText" placement="top" :disabled="!isMetaOverflow">
      <div
        ref="metaRef"
        class="dart-multirows__meta"
        @mouseenter="checkMetaOverflow"
      >
        {{ metaText }}
      </div>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DartMultirows',
};
</script>
<script lang="ts" setup>
import { computed, ref, withDefaults } from 'vue';

const props = withDefaults(
  defineProps<{
    name?: string;
    id?: string | number;
    code?: string | number;
  }>(),
  { name: '' },
);

const metaText = computed(() =>
  [props.id ?? '--', props.code]
    .filter((v) => v !== undefined && v !== null && v !== '')
    .join(' · '),
);

const nameRef = ref<HTMLElement>();
const isOverflow = ref(false);
const metaRef = ref<HTMLElement>();
const isMetaOverflow = ref(false);

const checkNameOverflow = () => {
  const el = nameRef.value;
  if (el) isOverflow.value = el.scrollWidth > el.clientWidth;
};

const checkMetaOverflow = () => {
  const el = metaRef.value;
  if (el) isMetaOverflow.value = el.scrollWidth > el.clientWidth;
};
</script>

<style scoped>
.dart-multirows {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  line-height: 1.4;
}

.dart-multirows__name {
  overflow: hidden;
  color: #303133;
  font-size: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.dart-multirows__meta {
  min-width: 0;
  margin-top: 4px;
  overflow: hidden;
  color: #8a94ad;
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
