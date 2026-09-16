<template>
  <div class="vp-raw">
    <dart-table :data="data.List" size="large">
      <dart-table-column label="ID" prop="id"></dart-table-column>
      <dart-table-column
        label="number"
        prop="amount1"
        useType="number"
        width="110"
        :useArg="1"
      ></dart-table-column>
      <dart-table-column
        label="number1"
        :useArg="2"
        prop="amount1"
        useType="number1"
        width="110"
      ></dart-table-column>
      <dart-table-column
        label="number2"
        :useArg="2"
        prop="amount1"
        useType="number2"
        width="110"
      ></dart-table-column>
      <dart-table-column
        label="number3"
        :useArg="4"
        prop="amount1"
        useType="number3"
        width="110"
      ></dart-table-column>
      <dart-table-column
        label="货币"
        prop="amount1"
        useType="money"
      ></dart-table-column>
      <dart-table-column
        label="日期"
        prop="amount2"
        useType="date"
        useArg="date"
        width="110"
      ></dart-table-column>
      <dart-table-column
        label="日期时间"
        prop="amount2"
        useType="date"
        width="180"
        useArg="dateTime"
      ></dart-table-column>
      <dart-table-column
        label="自定义日期"
        prop="amount2"
        useType="date"
        useArg="YYYY-MM"
        width="110"
      ></dart-table-column>
      <dart-table-column
        label="百分比"
        prop="amount3"
        useType="percentage"
        :useArg="4"
      ></dart-table-column>
    </dart-table>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
const data = reactive({
  List: [
    {
      id: '1',
      name: '王小虎1',
      amount1: 100,
      amount2: 1647845928134,
      amount3: 0.1,
    },
    {
      id: '2',
      name: '王小虎2',
      amount1: 1102,
      amount2: 1647845928134,
      amount3: 0.14444,
    },
    {
      id: '2',
      name: '王小虎2',
      amount1: 22103.224,
      amount2: 1647845928134,
      amount3: 0.15555,
    },
    {
      id: '2',
      name: '王小虎2',
      amount1: 22103.224,
      amount2: 1647845928134,
      amount3: 0.15555,
    },
  ],
});

const onPageChange = (index) => {
  data.PageIndex = index;
};
</script>
