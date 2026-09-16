<template>
  <el-col :offset="offset" :push="push" :pull="pull" :xs="24" :span="span">
    <el-form-item
      :label-width="isButton ? '0' : undefined"
      :prop="prop"
      :label="label"
      :rules="rules"
      :error="error"
      :inline-message="inlineMessage"
      :show-message="showMessage"
      :size="size"
      :class="{ 'dart-search-buttonitem': isButton }"
    >
      <slot></slot>
    </el-form-item>
  </el-col>
</template>
<script lang="ts">
export default {
  name: 'dartSearchItem',
};
</script>
<script lang="ts" setup>
const props = defineProps({
  prop: String,
  label: String,
  span: {
    type: Number,
    default: 8,
  },
  required: {
    type: Boolean,
    default: false,
  },
  rules: Object,
  error: String,
  inlineMessage: Boolean,
  showMessage: {
    type: Boolean,
    default: true,
  },
  size: String,
  offset: {
    type: Number,
    default: 0,
  },
  push: {
    type: Number,
    default: 0,
  },
  pull: {
    type: Number,
    default: 0,
  },
  isButton: Boolean,
});
</script>
<style lang="scss">
.dart-search-buttonitem {
  margin-left: 10px;
}

.dart-search-wrapper .dart-search-container .dart-search-buttonitem {
  margin-bottom: 15px;
}
</style>
