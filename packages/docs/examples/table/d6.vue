<template>
  <div class="vp-raw">
    <dart-table :data="data.List">
      <dart-table-column
        label="姓名"
        prop="name"
        width="100"
      ></dart-table-column>
      <dart-table-column
        label="机构信息"
        useType="multirows"
        :useArg="['orgName', 'orgId', 'orgCode']"
        width="240"
        showOverflowTooltip
      ></dart-table-column>
    </dart-table>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
const data = reactive({
  List: [
    {
      name: '王小虎1',
      orgName: '某某科技有限公司',
      orgId: '10001',
      orgCode: 'ORG-001',
    },
    {
      name: '王小虎2',
      orgName: '某某集团股份有限公司',
      orgId: '10002',
      orgCode: '',
    },
  ],
});
</script>
