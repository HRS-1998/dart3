<template>
  <h2>Table 表格</h2>
  <dart-table
    :data="tableData"
    style="width: 100%"
    is-dynamic-height
    :item-height="20"
    :page-total="tableData.length"
    :page-size="10"
  >
    <dart-table-column prop="name" label="姓名" />
    <dart-table-column prop="age" label="年龄" />
    <dart-table-column prop="address" label="地址" />
  </dart-table>

  <h2>Table 多行标签列</h2>
  <dart-table :data="tableData2" style="width: 100%">
    <dart-table-column prop="name" label="姓名" width="120" />
    <dart-table-column
      label="渠道(字符串)"
      prop="channel"
      use-type="multitags"
      use-arg="channel"
      min-width="200"
      show-overflow-tooltip
    />
    <dart-table-column
      label="渠道(数组)"
      use-type="multitags"
      :use-arg="['title', 'tag1', 'tag2', 'tag3']"
      min-width="200"
      show-overflow-tooltip
    />
  </dart-table>

  <h2>Table 多行信息列</h2>
  <dart-table :data="tableData3" style="width: 100%">
    <dart-table-column prop="name" label="姓名" width="120" />
    <dart-table-column
      label="机构信息"
      use-type="multirows"
      :use-arg="['orgName', 'orgId', 'orgCode']"
      min-width="200"
      show-overflow-tooltip
    />
  </dart-table>

  <h2>Table 多行日期时间列</h2>
  <dart-table :data="tableData4" style="width: 100%">
    <dart-table-column prop="name" label="姓名" width="120" />
    <dart-table-column
      label="创建时间"
      prop="createTime"
      use-type="multidatetime"
      use-arg="dateTime"
      min-width="160"
      show-overflow-tooltip
    />
  </dart-table>

  <h2>Table useType 汇总示例</h2>
  <dart-table :data="tableData5" style="width: 100%">
    <dart-table-column prop="name" label="姓名" width="90" fixed="left" />
    <dart-table-column
      label="number"
      prop="amount"
      use-type="number"
      :use-arg="1"
      width="100"
    />
    <dart-table-column
      label="number1"
      prop="amount"
      use-type="number1"
      :use-arg="2"
      width="110"
    />
    <dart-table-column
      label="number2"
      prop="amount"
      use-type="number2"
      :use-arg="2"
      width="100"
    />
    <dart-table-column
      label="number3"
      prop="amount"
      use-type="number3"
      :use-arg="4"
      width="130"
    />
    <dart-table-column
      label="money"
      prop="amount"
      use-type="money"
      width="120"
    />
    <dart-table-column
      label="date"
      prop="createTime"
      use-type="date"
      use-arg="date"
      width="110"
    />
    <dart-table-column
      label="percentage"
      prop="ratio"
      use-type="percentage"
      :use-arg="2"
      width="100"
    />
    <dart-table-column
      label="multitags(字符串)"
      prop="channel"
      use-type="multitags"
      use-arg="channel"
      min-width="180"
      show-overflow-tooltip
    />
    <dart-table-column
      label="multitags(数组)"
      use-type="multitags"
      :use-arg="['title', 'tag1', 'tag2']"
      min-width="180"
      show-overflow-tooltip
    />
    <dart-table-column
      label="multirows"
      use-type="multirows"
      :use-arg="['orgName', 'orgId', 'orgCode']"
      min-width="180"
      show-overflow-tooltip
    />
    <dart-table-column
      label="multidatetime"
      prop="createTime"
      use-type="multidatetime"
      use-arg="dateTime"
      width="140"
      show-overflow-tooltip
    />
  </dart-table>
</template>

<script setup lang="ts">
const tableData = [
  { name: '张三', age: 28, address: '北京市朝阳区' },
  { name: '李四', age: 32, address: '上海市浦东新区' },
  { name: '王五', age: 25, address: '广州市天河区' },
];

const tableData2 = [
  {
    name: '张三',
    channel: '官方渠道(H5、小程序、APP)',
    title: '官方渠道',
    tag1: 'H5',
    tag2: '小程序',
    tag3: 'APP',
  },
  {
    name: '李四',
    channel: '三方渠道(抖音、快手)',
    title: '三方渠道',
    tag1: '抖音',
    tag2: '快手',
    tag3: '',
  },
  {
    name: '王五',
    channel: '直营()',
    title: '直营',
    tag1: null,
    tag2: undefined,
    tag3: '',
  },
];

const tableData3 = [
  {
    name: '张三',
    orgName: '某某科技有限公司',
    orgId: '10001',
    orgCode: 'ORG-001',
  },
  {
    name: '李四',
    orgName: '某某集团股份有限公司',
    orgId: '10002',
    orgCode: '',
  },
  {
    name: '王五',
    orgName: '某某贸易有限公司',
    orgId: null,
    orgCode: 'ORG-003',
  },
];

const tableData4 = [
  { name: '张三', createTime: '2022-01-22 12:22:00' },
  { name: '李四', createTime: 1706582400000 },
  { name: '王五', createTime: null },
];

const tableData5 = [
  {
    name: '张三',
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
    name: '李四',
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
    name: '王五',
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
];
</script>
