<template>
  <div
    class="dart-search-wrapper"
    :class="{ 'dart-search-wrapper--arrow': !showArrow }"
  >
    <div
      class="dart-search-container"
      :class="{ autoHeight: isExpand }"
      :style="{ height: height }"
      ref="dartSearch"
    >
      <el-form
        :model="model"
        :rules="rules"
        :label-position="labelPosition"
        :label-width="labelWidth"
        :label-suffix="labelSuffix"
        :hide-required-asterisk="hideRequiredAsterisk"
        :validate-on-rule-change="validateOnRuleChange"
        :show-message="showMessage"
        :status-icon="statusIcon"
        :inline-message="inlineMessage"
        :inline="inline"
        :size="size"
        ref="ruleForm"
        :class="{ w4: labelTextLength === 4 }"
        @submit="handleSubmit"
      >
        <el-row>
          <el-col :span="formSpan" :xs="24">
            <el-row :gutter="gutter">
              <slot name="search-form"></slot>
            </el-row>
          </el-col>
          <el-col :span="btnSpan" :xs="24" class="dart-search-operation">
            <slot name="search-btn"></slot>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div
      class="dart-search-down"
      @click="handleDown"
      v-if="showArrow"
      title="更多"
    >
      <el-icon class="icon" v-if="isExpand"><ArrowUp /></el-icon>
      <el-icon class="icon" v-else><ArrowDown /></el-icon>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'dartSearch',
};
</script>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import type { FormInstance } from 'element-plus';
const ruleForm = ref<FormInstance>();
const isExpand = ref(false);
const props = defineProps({
  showArrow: Boolean,
  height: {
    type: String,
    default: 'auto',
  },
  model: Object,
  rules: Object,
  labelPosition: String,
  labelSuffix: {
    type: String,
    default: '',
  },
  size: String,
  inline: {
    type: Boolean,
    default: true,
  },
  inlineMessage: Boolean,
  statusIcon: Boolean,
  showMessage: {
    type: Boolean,
    default: true,
  },
  validateOnRuleChange: {
    type: Boolean,
    default: true,
  },
  hideRequiredAsterisk: {
    type: Boolean,
    default: false,
  },
  formSpan: {
    type: Number,
    default: 20,
  },
  btnSpan: {
    type: Number,
    default: 4,
  },
  gutter: {
    type: Number,
    default: 0,
  },
  labelTextLength: {
    type: Number,
    default: 6,
  },
});
const labelWidth = computed(() => {
  return props.labelTextLength === 6 ? '115px' : '90px';
});

const handleDown = () => {
  isExpand.value = !isExpand.value;
};

const handleSubmit = (event: any) => {
  event.preventDefault();
};

defineExpose({
  validate: async (callback: any) => {
    return (ruleForm.value as any).validate(callback);
  },
  validateField: (props: any, callback: any) => {
    (ruleForm.value as any).validateField(props, callback);
  },
  resetFields: (props: any) => {
    (ruleForm.value as any).resetFields(props);
  },
  clearValidate: (props: any) => {
    (ruleForm.value as any).clearValidate(props);
  },
});
</script>
<style lang="scss">
.dart-search-wrapper {
  &--arrow {
    margin-bottom: 10px;
  }

  .dart-search-container {
    overflow: hidden;
    padding: 14px 15px 1px 0;
    background-color: #f7f7f7;
    border: 1px solid #e3e3e3;
    &.autoHeight {
      height: auto !important;
    }
    .dart-search-operation {
      box-sizing: border-box;
      text-align: right;
      padding-bottom: 16px;
    }
    .el-form-item {
      margin-bottom: 13px;
      min-height: 30px;
      width: 100%;
    }
    .el-form-item__label {
      color: #444;
    }
    .el-form-item__content {
      width: calc(100% - 115px);
    }
    .el-select {
      width: 100%;
    }

    .el-autocomplete {
      width: 100%;
    }

    .el-date-editor.el-input {
      width: 100%;
    }
    .el-date-editor.el-input__inner {
      width: 100%;
    }
    .dart-ml {
      margin-left: 16px;
    }
    .w4 {
      .el-form-item__content {
        width: calc(100% - 90px);
      }
    }
    .dart-search-item {
      .el-form-item__content {
        width: auto;
      }
      .el-form-item__label:after {
        content: '';
        margin: 0;
      }
    }
  }
  .dart-search-down {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 12px;
    background: #ffffff;
    border: 1px solid #e3e3e3;
    border-top: none;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    text-align: center;
    cursor: pointer;
    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 12px;
      color: #000000;
    }
    &:hover {
      .icon {
        color: var(--el-color-primary);
      }
    }
  }
}
</style>
