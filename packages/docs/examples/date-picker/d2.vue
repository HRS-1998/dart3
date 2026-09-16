<template>
  <h4>date 只能选 小于等于 今天的日期</h4>
  <div class="form-inline">
    <div class="form-group">
      <dart-date-picker
        v-model="data.value1"
        :disabledDateMax="0"
      ></dart-date-picker>
    </div>
    <div class="form-group">当前值:{{ JSON.stringify(data.value1) }}</div>
  </div>
  <h4>date 只能选 大于等于 今天的日期</h4>
  <div class="form-inline">
    <div class="form-group">
      <dart-date-picker
        v-model="data.value2"
        :disabledDateMin="0"
      ></dart-date-picker>
    </div>
    <div class="form-group">当前值:{{ JSON.stringify(data.value2) }}</div>
  </div>
  <h4>date 只能选 今天内 7天的范围</h4>
  <div class="form-inline">
    <div class="form-group">
      <dart-date-picker
        v-model="data.value3"
        :disabledDateMax="0"
        :disabledDateMin="6"
      ></dart-date-picker>
    </div>
    <div class="form-group">当前值:{{ JSON.stringify(data.value3) }}</div>
  </div>
  <h4>daterange 只能选 今天内 7天的范围</h4>
  <div class="form-inline">
    <div class="form-group">
      <dart-date-picker
        v-model="data.value4"
        :disabledDateMax="0"
        :disabledDateMin="6"
        type="daterange"
      ></dart-date-picker>
    </div>
    <div class="form-group">当前值:{{ JSON.stringify(data.value4) }}</div>
  </div>
  <h4>动态 只能选中日期 7天的范围</h4>
  <div class="form-inline">
    <div class="form-group">
      <dart-date-picker
        v-model="data.value5"
        :disabledDateSelectRange="[6, 6]"
        type="daterange"
      ></dart-date-picker>
    </div>
    <div class="form-group">当前值:{{ JSON.stringify(data.value5) }}</div>
  </div>
  <h4>动态 加固定 只能选中日期 7天的范围</h4>
  <div class="form-inline">
    <div class="form-group">
      <dart-date-picker
        v-model="data.value6"
        :disabledDateSelectRange="[6, 6]"
        :disabledDateMax="0"
        :disabledDateMin="20"
        type="daterange"
      ></dart-date-picker>
    </div>
    <div class="form-group">当前值:{{ JSON.stringify(data.value6) }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const data = ref({
  value1: '',
  value2: '',
  value3: '',
  value4: '',
  value5: '',
  value6: '',
});
</script>
