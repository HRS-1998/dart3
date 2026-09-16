<template>
  <h2>Tool 工具栏</h2>

  <div :class="['tool-demo-screen', { 'is-fullscreen': isFullscreen }]">
    <dart-tool
      :show-full-screen="true"
      @fullscreen-change="onFullscreenChange"
      @border-change="onBorderChange"
      @columnset="onColumnset"
    >
      <template #content>
        <span style="font-size: 16px; font-weight: 600">用户管理</span>
      </template>
      <template #operate>
        <template v-if="operateVisible">
          <el-button type="primary" icon="Plus">新增</el-button>
          <el-button icon="Download">导出</el-button>
        </template>
      </template>
    </dart-tool>

    <el-switch
      v-model="operateVisible"
      active-text="operate 插槽内容"
      style="margin-bottom: 16px"
    />

    <dart-table
      ref="tableRef"
      :data="tableData"
      :border="borderVisible"
      row-key="date"
    >
      <dart-table-column prop="date" label="日期" width="180" />
      <dart-table-column prop="name" label="姓名" width="180" />
      <dart-table-column prop="address" label="地址" />
    </dart-table>
  </div>

  <h2 style="margin-top: 24px">隐藏默认按钮（show-default-btn=false）</h2>
  <dart-tool :show-default-btn="true">
    <template #content>
      <span style="font-size: 16px; font-weight: 600">仅操作区</span>
    </template>
    <template #operate>
      <el-button type="primary" icon="Plus">新增</el-button>
    </template>
  </dart-tool>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const tableRef = ref<any>();
const isFullscreen = ref(false);
const borderVisible = ref(false);
const operateVisible = ref(true);

const tableData = [
  {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
  },
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄',
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄',
  },
];

const onFullscreenChange = (val: boolean) => {
  isFullscreen.value = val;
  ElMessage.success(val ? '进入全屏' : '退出全屏');
};

const onBorderChange = (val: boolean) => {
  borderVisible.value = val;
};

const onColumnset = () => {
  tableRef.value?.openColumnSet();
};
</script>

<style scoped>
.tool-demo-screen {
  padding: 16px;
  background-color: #fff;
}

.tool-demo-screen.is-fullscreen {
  position: fixed;
  inset: 0;
  z-index: 100;
  overflow: auto;
}
</style>
