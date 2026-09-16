<template>
  <el-input-number
    ref="inputNumberRef"
    v-model="inputValue"
    class="dart-input-number"
    :min="min"
    :max="max"
    :value-on-clear="valueOnClear"
    :precision="precision"
    :readonly="readonly"
    :disabled="disabled"
    :step="step"
    :controls="controls"
    :controlsPosition="controlsPosition"
    :placeholder="placeholder"
    :validateEvent="validateEvent"
    @keydown="onKeyDown"
    @keyup="onKeyUp"
    @change="onChange"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>
<script lang="ts">
export default {
  name: 'DartInputNumber',
};
</script>
<script lang="ts" setup>
import { computed, ref, watch, inject } from 'vue';
import { isNil, isString, isUndefined, debounce } from 'lodash-es';
import { formItemContextKey } from 'element-plus';
type typeInputValue = number | undefined | string;

const elFormItem: any = inject(formItemContextKey, undefined);
const props = defineProps({
  modelValue: Number,
  valueOnClear: [Number, String, Object],
  stepStrictly: Boolean,
  min: { type: Number, default: -Infinity },
  max: { type: Number, default: Infinity },
  step: { type: Number, default: 1 },
  precision: Number,
  readonly: Boolean,
  disabled: Boolean,
  controls: { type: Boolean, default: true },
  controlsPosition: { type: String, default: 'right' },
  placeholder: String,
  validateEvent: { type: Boolean, default: true },
  isValidate: Boolean,
});
const emit = defineEmits(['update:modelValue', 'change', 'focus', 'blur']);
const inputNumberRef = ref();
let currentValue: typeInputValue;
const inputValue = ref<typeInputValue>();
watch(
  () => props.modelValue,
  (newVal: typeInputValue) => {
    if (newVal === currentValue) {
      return;
    }
    inputValue.value = newVal;
  },
  { immediate: true }
);
watch(
  () => inputValue.value,
  (newVal: typeInputValue) => {
    emit('update:modelValue', newVal);
  }
);
const onChange = (v: any, old: any) => {
  emit('change', v, old);
  if (props.validateEvent) {
    setTimeout(() => {
      elFormItem?.validate?.('change');
    }, 10);
  }
};
const onFocus = () => {
  emit('focus', true);
};
const onBlur = () => {
  emit('blur', true);
};
const getPrecision = (value: typeInputValue) => {
  if (isNil(value)) return 0;
  const valueString = value.toString();
  const dotPosition = valueString.indexOf('.');
  let precision = 0;
  if (dotPosition !== -1) {
    precision = valueString.length - dotPosition - 1;
  }
  return precision;
};
const numPrecision = computed(() => {
  const stepPrecision = getPrecision(props.step);
  if (!isUndefined(props.precision)) {
    return props.precision;
  } else {
    return Math.max(getPrecision(props.modelValue), stepPrecision);
  }
});
const toPrecision = (num: number, pre?: number) => {
  if (isUndefined(pre)) pre = numPrecision.value;
  if (pre === 0) return Math.round(num);
  let snum = String(num);
  const pointPos = snum.indexOf('.');
  if (pointPos === -1) return num;
  const nums = snum.replace('.', '').split('');
  const datum = nums[pointPos + pre];
  if (!datum) return num;
  const length = snum.length;
  if (snum.charAt(length - 1) === '5') {
    snum = `${snum.slice(0, Math.max(0, length - 1))}6`;
  }
  return Number.parseFloat(Number(snum).toFixed(pre));
};
// eslint-disable-next-line complexity
const verifyValue = (value: typeInputValue): typeInputValue => {
  const { max, min, step, precision, stepStrictly, valueOnClear } = props;
  let newVal: any = Number(value);
  if (isNil(value) || value === '' || Number.isNaN(newVal)) {
    return undefined;
  }
  if (typeof value === 'undefined') {
    if (valueOnClear === null) {
      return undefined;
    }
    newVal = isString(valueOnClear) ? { min, max }[valueOnClear] : valueOnClear;
  }
  if (stepStrictly) {
    newVal = toPrecision(Math.round(newVal / step) * step, precision);
  }
  if (!isUndefined(precision)) {
    newVal = toPrecision(newVal, precision);
  }

  if (newVal > max || newVal < min) {
    newVal = newVal > max ? max : min;
  }

  return newVal;
};
const valueChange = (e: any): any => {
  const v = e.srcElement.value;

  const newVal = verifyValue(v);
  if (inputValue.value === v) return;
  if (v !== newVal) {
    e.srcElement.value = newVal;
  }
  currentValue = newVal;
  emit('update:modelValue', newVal);
  onChange(newVal, inputValue.value);
};
const onKeyUp = debounce(valueChange, 300);
const onKeyDown = (e: any) => {
  let key = e.key;
  if (props.precision === 0 && Number(props.min) >= 0) {
    if (key === '.') {
      e.returnValue = false;
      return false;
    }
  }
  if (key === 'e') {
    e.returnValue = false;
    return false;
  }
  return true;
};
</script>
<style lang="scss">
.el-input-number.is-controls-right.dart-input-number .el-input__wrapper {
  padding-left: 5px;
  padding-right: 32px;
}
</style>
