<template>
  <h4>date</h4>
  <div class="form-inline">
    <div class="form-group">
      <dart-date-picker v-model="data.value1"></dart-date-picker>
    </div>
    <div class="form-group">当前值:{{ JSON.stringify(data.value1) }}</div>
  </div>

  <h4>date 结束日期时刻为 23:59:59:999</h4>
  <div class="form-inline">
    <div class="form-group">
      <dart-date-picker
        v-model="data.value3"
        :default-time="defaultTime"
      ></dart-date-picker>
    </div>
    <div class="form-group">当前值:{{ JSON.stringify(data.value3) }}</div>
  </div>
  <h4>datetime 结束日期时刻为 23:59:59:999</h4>
  <div class="form-inline">
    <div class="form-group">
      <dart-date-picker
        v-model="data.value5"
        :default-time="defaultTime"
        type="datetime"
      ></dart-date-picker>
    </div>
    <div class="form-group">当前值:{{ JSON.stringify(data.value5) }}</div>
  </div>

  <h4>daterange 日期时刻为00:00:00 23:59:59:999</h4>
  <div class="form-inline">
    <div class="form-group">
      <dart-date-picker
        v-model="data.value6"
        type="daterange"
        :default-time="defaultTime2"
        @blur="onBlur"
      ></dart-date-picker>
    </div>
    <div class="form-group">当前值:{{ JSON.stringify(data.value6) }}</div>
  </div>
  <h4>datetimerange 日期时刻为00:00:00 23:59:59:999</h4>
  <div class="form-inline">
    <div class="form-group">
      <dart-date-picker
        v-model="data.value7"
        type="datetimerange"
        :default-time="defaultTime2"
      ></dart-date-picker>
    </div>
    <div class="form-group">当前值:{{ JSON.stringify(data.value7) }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const data = ref({
  value1: '',
  value3: '',
  value5: '',
  value6: '',
  value7: '',
});
const defaultTime = new Date(2000, 1, 1, 23, 59, 59, 999);
const defaultTime2 = ref([
  new Date(2000, 1, 1, 0, 0, 0),
  new Date(2000, 2, 1, 23, 59, 59, 999),
]);
const onBlur = () => {
  console.log(123);
};
</script>
