<template>
  <el-row class="dart-date-range">
    <el-col :span="11" :xs="24">
      <el-date-picker
        style="width: 100%"
        ref="start"
        v-model="currentStartDate"
        :disabled="disabled"
        :placeholder="startPlaceholder"
        :readonly="readonly"
        :editable="editable"
        :clearable="clearable"
        :size="size"
        :default-time="defaultTime[0]"
        :teleported="teleported"
        :popper-class="popperClass"
        :disabled-date="(event:any) => disabledDate(event, 'start')"
        :default-value="startDefaultValue"
        :value-format="currentValueFormat"
        :name="name"
        :prefix-icon="prefixIcon"
        :clear-icon="clearIcon"
        :type="type"
        @change="onStartChange"
        @blur="onStartBlur"
        @focus="onStartFocus"
      ></el-date-picker>
    </el-col>
    <el-col :span="2">
      <div class="separator">{{ rangeSeparator }}</div>
    </el-col>
    <el-col :span="11" :xs="24">
      <el-date-picker
        style="width: 100%"
        ref="end"
        v-model="currentEndDate"
        :disabled="disabled"
        :placeholder="endPlaceholder"
        :readonly="readonly"
        :editable="editable"
        :clearable="clearable"
        :size="size"
        :default-time="defaultTime[1]"
        :format="currentFormat"
        :teleported="teleported"
        :popper-class="popperClass"
        :disabled-date="(event:any) => disabledDate(event, 'end')"
        :default-value="endDefaultValue"
        :value-format="currentValueFormat"
        :name="name"
        :prefix-icon="prefixIcon"
        :clear-icon="clearIcon"
        :type="type"
        @change="onEndChange"
        @blur="onEndBlur"
        @focus="onEndFocus"
      ></el-date-picker>
    </el-col>
  </el-row>
</template>
<script lang="ts">
export default {
  name: 'DartDateRange',
};
</script>
<script lang="ts" setup>
import utils from '../utils';
import dayjs from 'dayjs';
import { computed } from 'vue';
const props = defineProps({
  modelValue: { type: [Array, String], default: '' },
  readonly: Boolean,
  disabled: Boolean,
  editable: { type: Boolean, default: true },
  clearable: { type: Boolean, default: true },
  defaultTime: { type: Array, default: () => [undefined, undefined] },
  size: String,
  format: String,
  popperClass: String,
  teleported: { type: Boolean, default: true },
  type: {
    type: String,
    default: 'date',
  },
  rangeSeparator: { type: String, default: '-' },
  name: String,
  valueFormat: { type: String, default: 'timestamp' },
  clearIcon: String,
  prefixIcon: String,
  endDefaultValue: Date,
  disabledDate: { type: Function, default: () => {} },
  startDefaultValue: Date,
  startPlaceholder: String,
  endPlaceholder: String,
  unlink: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits([
  'start-change',
  'change',
  'start-blur',
  'blur',
  'start-focus',
  'focus',
  'end-blur',
  'end-change',
  'end-focus',
  'update:modelValue',
]);

const currentStartDate = computed({
  get: () => {
    return currValue.value[0];
  },
  set: (value) => {
    currValue.value = [value, currValue.value[1]];
  },
});
const currentEndDate = computed({
  get: () => {
    return currValue.value[1];
  },
  set: (value) => {
    currValue.value = [currValue.value[0], value];
  },
});
const currValue = computed({
  get: () => {
    if (!props.modelValue || !utils.isArray(props.modelValue)) {
      return ['', ''];
    }
    return props.modelValue as Array<any>;
  },
  set: (value) => {
    const v: any = _outFilter(value);

    emit('update:modelValue', v);
    emit('change', v);
  },
});
const currentValueFormat = computed(() => {
  if (props.valueFormat === 'timestamp') {
    return 'x';
  }
  return props.valueFormat;
});
const currentFormat = computed(() => {
  if (props.format) {
    return props.format;
  }
  return props.type === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss';
});
const defaultTime = computed(() => {
  if (!props.defaultTime || props.defaultTime.length < 2) {
    return [null, null];
  }
  return props.defaultTime;
});

/**
 * @function {输出值过滤}
 * @param  {array} m {当前选中值}
 * @return {string,array} {真实值}
 */

// eslint-disable-next-line complexity
const _outFilter = (m: Array<any> | string): Array<any> | string => {
  if (!m || !utils.isArray(m)) {
    return m;
  }
  if (!m[0] && !m[1]) {
    return '';
  }
  if (!props.valueFormat) {
    return [
      getFormatValue(m[0], 'toISOString'),
      getFormatValue(m[1], 'toISOString'),
    ];
  }
  if (props.valueFormat === 'timestamp') {
    return [getFormatValue(m[0], 'valueOf'), getFormatValue(m[1], 'valueOf')];
  }

  return [
    m[0] && dayjs(m[0]).format(props.valueFormat),
    m[1] && dayjs(m[1]).format(props.valueFormat),
  ];
};

const getFormatValue = (value: any, type: string) => {
  if (!value) {
    return '';
  }
  if (type === 'toISOString') {
    return dayjs(value).toISOString();
  }
  if (type === 'valueOf') {
    return dayjs(value).valueOf();
  }
};

/**
 * @function {范围重新赋值}
 * @param  {string} type {触发来源}
 */
// eslint-disable-next-line complexity
const _range = (type: string, value: any) => {
  if (!utils.isArray(currValue.value) || !props.unlink || !value) {
    return;
  }
  var newValue = currValue.value.slice(0);
  let start: any = type === 'start' ? value : newValue[0];
  let end: any = type === 'end' ? value : newValue[1];

  if (!start || !end) {
    return;
  }
  currValue.value = _getCheckValue(type, start, end);
};
/**
 * @function {获取前后对比后新的值}
 * @param  {string} pos   {时间选择的位置}
 * @param  {date} start {开始时间}
 * @param  {date} end   {结束时间}
 * @return {array|string} {前后对比后新的值}
 */
const _getCheckValue = (pos: string, start: string, end: string) => {
  const startDate = _getCleartimeTime(start);
  const startTime = dayjs(start).valueOf() - startDate;
  const endDate = _getCleartimeTime(end);
  const endTime = dayjs(end).valueOf() - endDate;
  let result: any = [start, end];

  if (pos === 'start' && startDate > endDate) {
    result = [start, startDate + endTime];
  }
  if (pos === 'end' && startDate > endDate) {
    result = [endDate + startTime, end];
  }
  return result;
};
const onStartChange = (v: any) => {
  _range('start', v);
  emit('start-change', v);
};
const onStartBlur = (e: any) => {
  emit('start-blur', e);
  emit('blur', e);
};
const onStartFocus = (e: any) => {
  emit('start-focus', e);
  emit('focus', e);
};
const onEndChange = (v: any) => {
  _range('end', v);
  emit('end-change', v);
};
const onEndBlur = (e: any) => {
  emit('end-blur', e);
  emit('blur', e);
};
const onEndFocus = (e: any) => {
  emit('end-focus', e);
  emit('focus', e);
};

/**
 * @function {获取清除时间的日期毫秒数}
 * @param  {type} date {日期毫秒数}
 * @return {number} {时间为0的日期毫秒数}
 */
const _getCleartimeTime = (date: string): number => {
  let time: any = date;

  if (!time) {
    return 0;
  }
  return getFormatValue(dayjs(time).format('YYYY-MM-DD'), 'valueOf') as number;
};
</script>

<style lang="scss">
.dart-date-range .separator {
  text-align: center;
}
</style>
