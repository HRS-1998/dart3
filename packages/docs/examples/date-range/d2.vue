<template>
  <h4>基础</h4>
  <div class="form-inline">
    <div class="form-group">
      <dart-date-range
        v-model="data.value4"
        type="datetime"
        value-format="timestamp"
      ></dart-date-range>
    </div>
    <div class="form-group">当前值:{{ JSON.stringify(data.value4) }}</div>
  </div>
  <h4>有默认时间</h4>
  <div class="form-inline">
    <div class="form-group">
      <dart-date-range
        v-model="data.value5"
        type="datetime"
        value-format="timestamp"
      ></dart-date-range>
    </div>
    <div class="form-group">当前值:{{ JSON.stringify(data.value5) }}</div>
  </div>
  <h4>带限制 带时分秒时间 起始日期时刻为 12:59:59，结束日期时刻为 23:59:59</h4>
  <div class="form-inline">
    <div class="form-group">
      <dart-date-range
        v-model="data.value6"
        type="datetime"
        range-separator="/"
        value-format="timestamp"
        :disabled-date="disabledDate"
        :default-time="defaultTime"
      ></dart-date-range>
    </div>
    <div class="form-group">当前值:{{ JSON.stringify(data.value6) }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const data = ref({
  value4: '',
  value5: [1542277316000, 1547834522000],
  value6: '',
});
const defaultTime = [
  new Date(2000, 1, 1, 12, 59, 59),
  new Date(2000, 2, 1, 23, 59, 59),
];
const disabledDate = (time) => {
  console.log(time.getTime() > Date.now());
  return time.getTime() > Date.now();
};
</script>
