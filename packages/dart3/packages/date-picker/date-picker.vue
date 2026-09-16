<template>
  <el-date-picker
    v-model="pickerValue"
    v-bind="$attrs"
    :type="type"
    :default-time="defaultTime"
    :value-format="valueFormat"
    :unlink-panels="unlinkPanels"
    :disabled-date="sysDisabledDate"
    @calendar-change="onCalendar"
    @visible-change="onVisibleChange"
  />
</template>
<script lang="ts">
export default {
  name: 'DartDatePicker',
};
</script>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import { dayjs } from 'element-plus';
import type { Dayjs } from 'dayjs';
const emit = defineEmits([
  'update:modelValue',
  'change',
  'calendar-change',
  'visible-change',
]);
const props = defineProps({
  modelValue: {
    type: [Date, Number, String, Array],
    default: '',
  },
  type: {
    type: String,
    default: 'date',
  },
  defaultTime: [Date, Array],
  valueFormat: {
    type: String,
    default: 'x',
  },
  unlinkPanels: {
    type: Boolean,
    default: true,
  },
  disabledDateMax: {
    type: Number,
    default: Infinity,
  },
  disabledDateMin: {
    type: Number,
    default: -Infinity,
  },
  disabledDateSelectRange: {
    type: Array,
    default: () => [],
  },
  disabledDate: Function,
});
const firstSelectedDayRef = ref();
const pickerValue = computed({
  get: () => {
    return props.modelValue;
  },
  set: (val: any) => {
    let newVal: any = val;
    if (val && props.valueFormat === 'x') {
      if (props.type === 'date' || props.type === 'datetime') {
        newVal = formatDate(val, props.defaultTime as Date);
      }
      if (props.type === 'datetimerange' || props.type === 'daterange') {
        newVal = formatDateRange(val);
      }
    }

    emit('update:modelValue', newVal);
    emit('change', newVal);
  },
});
const formatDate = (val: Date, defaultTime?: Date) => {
  const currentDay = dayjs(val);
  let newVal = formatTimeDate(currentDay, defaultTime);

  if (props.valueFormat) {
    const formatVal = newVal.format(props.valueFormat);

    return /\d+/.test(formatVal) ? Number(formatVal) : formatVal;
  }
  return newVal;
};
const formatTimeDate = (emitDayjs: Dayjs, defaultTime?: Date) => {
  if (!defaultTime) {
    return emitDayjs;
  }
  const defaultTimeD = dayjs(defaultTime);

  if (props.type === 'datetime' || props.type === 'datetimerange') {
    return defaultTimeD
      .year(emitDayjs.year())
      .month(emitDayjs.month())
      .date(emitDayjs.date())
      .hour(emitDayjs.hour())
      .minute(emitDayjs.minute())
      .second(emitDayjs.second());
  }
  return defaultTimeD
    .year(emitDayjs.year())
    .month(emitDayjs.month())
    .date(emitDayjs.date());
};
const formatDateRange = (emitDayjs: Array<Date>) => {
  if (!emitDayjs) return '';
  if (props.defaultTime) {
    const startD = formatDate(
      emitDayjs[0],
      (props.defaultTime as Array<Date>)[0]
    );
    const endD = formatDate(
      emitDayjs[1],
      (props.defaultTime as Array<Date>)[1]
    );
    return [startD, endD];
  }
  return emitDayjs;
};

const sysDisabledDate = (time: Date) => {
  if (props.disabledDate) {
    return props.disabledDate(time);
  }
  if (
    props.disabledDateSelectRange &&
    props.disabledDateSelectRange.length === 2
  ) {
    return dynamicsDate(time);
  }
  if (
    Number.isFinite(props.disabledDateMax) ||
    Number.isFinite(props.disabledDateMin)
  ) {
    return lockDate(time);
  }
  return false;
};

const getAddDate = (time: Date | number, num: number) => {
  return dayjs(time).add(num, 'day').endOf('date').valueOf();
};
const getSubtractDate = (time: Date | number, num: number) => {
  return dayjs(time).subtract(num, 'day').startOf('date').valueOf();
};
//获取当前大小范围
const getCurrentDateRange = (): Array<number> => {
  const nowTime = Date.now();
  const maxNum = Number.isFinite(props.disabledDateMax)
    ? getAddDate(nowTime, props.disabledDateMax)
    : Infinity;
  const minNum = Number.isFinite(props.disabledDateMin)
    ? getSubtractDate(nowTime, props.disabledDateMin)
    : -Infinity;
  return [minNum, maxNum];
};
//固定日期限制
const lockDate = (time: Date): boolean => {
  if (
    !Number.isFinite(props.disabledDateMax) &&
    !Number.isFinite(props.disabledDateMin)
  ) {
    return false;
  }
  const rangeDate = getCurrentDateRange();

  return time.getTime() > rangeDate[1] || time.getTime() < rangeDate[0];
};

//动态日期限制
const dynamicsDate = (time: Date): boolean => {
  const firstSelectedDay = firstSelectedDayRef.value;
  if (firstSelectedDay) {
    const rangeDate = getCurrentDateRange();
    const dMax = getAddDate(
      firstSelectedDay,
      props.disabledDateSelectRange[1] as number
    );
    const dMin = getSubtractDate(
      firstSelectedDay,
      props.disabledDateSelectRange[0] as number
    );
    const maxDate = Math.min(rangeDate[1], dMax);
    const minDate = Math.max(rangeDate[0], dMin);
    return time.getTime() < minDate || time.getTime() > maxDate;
  }
  return lockDate(time);
};

const onCalendar = (date: Array<Date>) => {
  emit('calendar-change', date);
  const [minDate, maxDate] = date;
  if (minDate && !maxDate) {
    firstSelectedDayRef.value = minDate; //记录选中的首个日期
  } else {
    firstSelectedDayRef.value = null;
  }
};
const onVisibleChange = (visible: boolean) => {
  if (!visible) {
    firstSelectedDayRef.value = null;
  }
  emit('visible-change', visible);
};
</script>
<style lang="scss"></style>
