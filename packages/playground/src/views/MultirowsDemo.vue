<template>
  <h2>Multirows 多行信息</h2>

  <h3>基础</h3>
  <div class="demo-col">
    <dart-multirows name="某某科技有限公司" id="10001" code="ORG-001" />
    <dart-multirows name="某某集团股份有限公司" id="10002" />
    <dart-multirows name="某某贸易有限公司" code="ORG-003" />
  </div>

  <h3>溢出提示（宽度不足时省略，悬停显示全文）</h3>
  <div class="demo-cell">
    <dart-multirows
      name="某某集团股份有限公司华东分公司"
      id="10001"
      code="ORG-001-SH-2026"
    />
  </div>

  <h3>表格中使用（useType="multirows"，useArg 数组前三项为列名）</h3>
  <dart-table :data="tableData" style="width: 100%">
    <dart-table-column prop="name" label="姓名" width="120" />
    <dart-table-column
      label="机构信息"
      use-type="multirows"
      :use-arg="['orgName', 'orgId', 'orgCode']"
      min-width="240"
      show-overflow-tooltip
    />
  </dart-table>
</template>

<script setup lang="ts">
const tableData = [
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
</script>

<style scoped>
.demo-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
}

.demo-cell {
  width: 220px;
  margin-bottom: 16px;
}
</style>
