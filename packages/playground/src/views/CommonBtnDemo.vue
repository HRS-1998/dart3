<template>
  <div style="padding: 20px; display: flex; flex-direction: column; gap: 20px">
    <div>
      <h3>成功场景（code=0，触发 success 回调）</h3>
      <dart-common-btn name="删除" :params="{ id: 1 }" :ajax="successApi" :success="onSuccess" />
    </div>

    <div>
      <h3>失败场景（code=1，静默不触发回调）</h3>
      <dart-common-btn name="禁用" :params="{ id: 2 }" :ajax="failApi" :success="onSuccess" />
    </div>

    <div>
      <h3>自定义确认提示语（title）</h3>
      <dart-common-btn
        name="归档"
        title="归档后该记录将不可编辑，确定继续吗？"
        :params="{ id: 4 }"
        :ajax="successApi"
        :success="onSuccess"
      />
    </div>

    <div>
      <h3>custom 插槽 + 自定义成功提示</h3>
      <dart-common-btn name="启用" :params="{ id: 3 }" :ajax="successApi" message="已启用" :success="onSuccess">
        <template #custom="{ loading }">
          <el-button type="danger" :loading="loading">自定义启用按钮</el-button>
        </template>
      </dart-common-btn>
    </div>

    <el-alert v-if="successCount" :title="`success 已触发 ${successCount} 次`" type="success" :closable="false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const successCount = ref(0);

const successApi = () =>
  new Promise((resolve) => setTimeout(() => resolve({ code: 0, data: null }), 800));

const failApi = () =>
  new Promise((resolve) => setTimeout(() => resolve({ code: 1, message: '操作失败' }), 800));

const onSuccess = () => {
  successCount.value++;
};
</script>
