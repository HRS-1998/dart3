<template>
  <h4>基础</h4>
  <div class="form-inline">
    <div class="form-group">
      <dart-date-range
        v-model="data.value1"
        value-format="timestamp"
      ></dart-date-range>
    </div>
    <div class="form-group">当前值:{{ JSON.stringify(data.value1) }}</div>
  </div>
  <h4>有默认时间</h4>
  <div class="form-inline">
    <div class="form-group">
      <dart-date-range
        v-model="data.value2"
        value-format="timestamp"
      ></dart-date-range>
    </div>
    <div class="form-group">当前值:{{ JSON.stringify(data.value2) }}</div>
  </div>
  <h4>带时分秒时间 起始日期时刻为 12:59:59，结束日期时刻为 23:59:59</h4>
  <div class="form-inline">
    <div class="form-group">
      <dart-date-range
        v-model="data.value3"
        value-format="timestamp"
        :default-time="defaultTime"
      ></dart-date-range>
    </div>
    <div class="form-group">当前值:{{ JSON.stringify(data.value3) }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const data = ref({
  value1: '',
  value2: [1546790400000, 1547222400000],
  value3: '',
});
const defaultTime = [
  new Date(2000, 1, 1, 12, 59, 59),
  new Date(2000, 2, 1, 23, 59, 59),
];
</script>
