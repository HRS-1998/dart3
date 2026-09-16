<template>
  <div class="vp-raw">
    <dart-table :data="data.List">
      <dart-table-column label="姓名" prop="name" width="90" fixed="left" />
      <dart-table-column
        label="number"
        prop="amount"
        useType="number"
        :useArg="1"
        width="100"
      />
      <dart-table-column
        label="number1"
        prop="amount"
        useType="number1"
        :useArg="2"
        width="110"
      />
      <dart-table-column
        label="number2"
        prop="amount"
        useType="number2"
        :useArg="2"
        width="100"
      />
      <dart-table-column
        label="number3"
        prop="amount"
        useType="number3"
        :useArg="4"
        width="130"
      />
      <dart-table-column
        label="money"
        prop="amount"
        useType="money"
        width="120"
      />
      <dart-table-column
        label="date"
        prop="createTime"
        useType="date"
        useArg="date"
        width="110"
      />
      <dart-table-column
        label="percentage"
        prop="ratio"
        useType="percentage"
        :useArg="2"
        width="100"
      />
      <dart-table-column
        label="multitags(字符串)"
        prop="channel"
        useType="multitags"
        useArg="channel"
        width="180"
        showOverflowTooltip
      />
      <dart-table-column
        label="multitags(数组)"
        useType="multitags"
        :useArg="['title', 'tag1', 'tag2']"
        width="180"
        showOverflowTooltip
      />
      <dart-table-column
        label="multirows"
        useType="multirows"
        :useArg="['orgName', 'orgId', 'orgCode']"
        width="180"
        showOverflowTooltip
      />
      <dart-table-column
        label="multidatetime"
        prop="createTime"
        useType="multidatetime"
        useArg="dateTime"
        width="130"
        showOverflowTooltip
      />
    </dart-table>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
const data = reactive({
  List: [
    {
      name: '王小虎1',
      amount: 22103.224,
      ratio: 0.14444,
      createTime: 1647845928134,
      channel: '官方渠道(H5、小程序、APP)',
      title: '官方渠道',
      tag1: 'H5',
      tag2: '小程序',
      orgName: '某某科技有限公司',
      orgId: '10001',
      orgCode: 'ORG-001',
    },
    {
      name: '王小虎2',
      amount: 1102,
      ratio: 0.15555,
      createTime: '2022-01-22 12:22:00',
      channel: '三方渠道(抖音、快手)',
      title: '三方渠道',
      tag1: '抖音',
      tag2: '快手',
      orgName: '某某集团股份有限公司',
      orgId: '10002',
      orgCode: '',
    },
    {
      name: '王小虎3',
      amount: 100,
      ratio: 0.1,
      createTime: null,
      channel: '直营()',
      title: '直营',
      tag1: null,
      tag2: undefined,
      orgName: '某某贸易有限公司',
      orgId: null,
      orgCode: 'ORG-003',
    },
  ],
});
</script>
