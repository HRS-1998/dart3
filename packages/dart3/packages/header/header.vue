<template>
  <el-row class="dart-header">
    <el-col :span="12">
      <div class="title mb16 f18">
        <div v-if="!$slots.title">
          <span v-if="!isSubPage">{{ title }}</span>
          <div class="sub-title" @click="goBack" v-else>
            <el-icon size="16" style="margin-top: 2px" class="mr5"><ArrowLeftBold /></el-icon>
            <span>{{ title }}</span>
          </div>
        </div>
        <slot name="title" />
      </div>
    </el-col>
    <el-col :span="12" class="tr">
      <slot name="button" />
    </el-col>
  </el-row>
</template>
<script lang="ts">
export default {
  name: 'DartHeader'
};
</script>
<script lang="ts" setup>
defineProps({
  title: { type: String, default: 'title' },
  isSubPage: { type: Boolean, default: false }
});
const emit = defineEmits(['back']);

const goBack = (): void => {
  emit('back');
};
</script>

<style lang="scss">
.dart-header {
  .title {
    min-height: 32px;
    display: flex;
    align-items: center;
    font-weight: 500;
    color: var(--el-text-color-primary);
  }

  .sub-title {
    display: flex;
    align-items: center;
    width: fit-content;
    cursor: pointer;
    &:hover {
      color: var(--el-color-primary-light-3);
    }
  }
}
</style>
