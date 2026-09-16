<template>
  <div class="vp-raw">
    <dart-table :data="data.List">
      <dart-table-column
        label="姓名"
        prop="name"
        width="100"
      ></dart-table-column>
      <dart-table-column
        label="渠道(字符串)"
        prop="channel"
        useType="multitags"
        useArg="channel"
        width="240"
        showOverflowTooltip
      ></dart-table-column>
      <dart-table-column
        label="渠道(数组)"
        useType="multitags"
        :useArg="['title', 'tag1', 'tag2']"
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
      channel: '官方渠道(H5、小程序、APP)',
      title: '官方渠道',
      tag1: 'H5',
      tag2: '小程序',
    },
    {
      name: '王小虎2',
      channel: '三方渠道(抖音、快手)',
      title: '三方渠道',
      tag1: '抖音',
      tag2: '快手',
    },
  ],
});
</script>
