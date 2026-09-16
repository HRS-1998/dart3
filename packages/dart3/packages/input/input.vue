<template>
  <el-input
    v-model="currValue"
    :type="type"
    :maxlength="maxlength"
    :minlength="minlength"
    :show-word-limit="showWordLimit"
    :placeholder="placeholder"
    :clearable="clearable"
    :show-password="showPassword"
    :disabled="disabled"
    :size="size"
    :prefixIcon="prefixIcon"
    :suffixIcon="suffixIcon"
    :rows="rows"
    :autosize="autosize"
    :autocomplete="autocomplete"
    :name="name"
    :formatter="formatter"
    :parser="parser"
    :readonly="readonly"
    :resize="resize"
    :autofocus="autofocus"
    :form="form"
    :label="label"
    :tabindex="tabindex"
    :validateEvent="validateEvent"
    @change="handleChange"
    @select="handleSelect"
    @blur="handleBlur"
    @focus="handleFocus"
    @input="handleInput"
    @clear="handleClear"
  >
    <template #prepend v-if="$slots.prepend">
      <slot name="prepend"></slot>
    </template>
    <template #append v-if="$slots.append">
      <slot name="append"></slot>
    </template>
  </el-input>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import inputMain from './tool';
export default defineComponent({
  name: 'DartInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    maxlength: [String, Number],
    minlength: Number,
    showWordLimit: Boolean,
    placeholder: String,
    clearable: Boolean,
    formatter: Function,
    parser: Function,
    showPassword: Boolean,
    disabled: Boolean,
    size: String,
    suffixIcon: String,
    prefixIcon: String,
    rows: Number,
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    autocomplete: String,
    name: String,
    readonly: Boolean,
    resize: String,
    autofocus: Boolean,
    form: String,
    label: String,
    tabindex: [String, Number],
    inputStyle: Object,
    validateEvent: {
      type: Boolean,
      default: true
    },
    regexp: RegExp,
    inputType: {
      type: String,
      default: ''
    },
    trim: {
      type: Boolean,
      default: true
    },
    valueFormat: String
  },
  emits: ['update:modelValue', 'focus', 'change', 'select', 'clear', 'blur'],
  setup(props, { emit }) {
    const currValue = computed({
      get: () => {
        return props.modelValue;
      },
      set: (value: any) => {
        emit('update:modelValue', value);
      }
    });

    // const modelValueChange = (value: any) => {
    //   emit('update:modelValue', value);
    // };

    // watch(currValue, (val) => {
    //   modelValueChange(val);
    // });

    // watch(
    //   () => props.modelValue,
    //   (val) => {
    //     currValue.value = val;
    //   }
    // );

    // eslint-disable-next-line complexity
    const handleInput = (cv: any) => {
      if (!props.inputType) {
        return;
      }
      let result = '';
      const cValue = cv + '';
      switch (props.inputType) {
        case 'integer': // 只能输入整数 已完成
          result = inputMain.integeFilter(cValue, 0);
          break;
        case 'integer1': // 只能输入正整数 已完成
          result = inputMain.integeFilter(cValue, 1);
          break;
        case 'integer2': // 只能输入负整数 已完成
          result = inputMain.integeFilter(cValue, 2);
          break;
        case 'num': // 只能输入数字 已完成
          result = cValue.replace(/\D*/g, '');
          break;
        case 'decmal': // 只能输入浮点数
          result = inputMain.numberToFixed(cValue, 0);
          break;
        case 'decmal1': // 只能输入正浮点数
          result = inputMain.numberToFixed(cValue, 1);
          break;
        case 'decmal2': // 只能输入负浮点数
          result = inputMain.numberToFixed(cValue, 2);
          break;
        case 'letter': // 只能输入英文字母 已完成
          result = cValue.replace(/[^A-Za-z]/g, '');
          break;
        case 'letter_u': // 只能输入大写英文字母  已完成
          result = cValue.replace(/[^a-zA-Z]/g, '');
          result = result.toUpperCase();
          break;
        case 'letter_l': // 只能输入小写英文字母 已完成
          result = cValue.replace(/[^a-zA-Z]/g, '');
          result = result.toLowerCase();
          break;
        case 'regexp': // 通过传入正则表达式来进行校验
          if (props.regexp) {
            result = cValue.replace(props.regexp, '');
          }
          break;
        default:
          break;
      }
      currValue.value = result;
      //modelValueChange(currValue);
    };
    // eslint-disable-next-line complexity
    const numberSignClear = () => {
      const types = ['integer', 'integer1', 'integer2', 'decmal', 'decmal1', 'decmal2'];
      const cValue = currValue.value + '';
      if (types.indexOf(props.inputType) >= 0) {
        if (cValue === '-') {
          currValue.value = '';
        }
        if (cValue.charAt(cValue.length - 1) === '.') {
          currValue.value = cValue.replace('.', '');
        }
      }
      if (props.valueFormat === 'number') {
        if (currValue.value !== '') {
          currValue.value = Number(currValue.value);
        }
        return;
      }
      if ((props.type === 'text' || props.type === 'textarea') && props.trim) {
        currValue.value = cValue.trim();
      }
    };
    const handleFocus = (event: any) => {
      emit('focus', event);
    };
    const handleChange = (event: any) => {
      emit('change', event);
    };
    const handleSelect = (event: any) => {
      emit('select', event);
    };
    const handleClear = () => {
      emit('clear');
    };
    const handleBlur = (event: any) => {
      numberSignClear();
      emit('blur', event);
    };

    return {
      handleFocus,
      handleChange,
      handleSelect,
      handleClear,
      handleBlur,
      handleInput,
      currValue
    };
  }
});
</script>
