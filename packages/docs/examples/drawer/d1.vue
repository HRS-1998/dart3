<template>
  <el-button type="primary" @click="status = true">打开抽屉</el-button>
  <dart-drawer
    v-model="status"
    title="抽屉"
    :loading="loading"
    :confirmLoading="confirmLoading"
    @confirm="onClosed"
    @cancel="onClosed"
  >
    <el-form :label-width="80" :model="formData" ref="formRef">
      <el-form-item label="Id">
        <dart-input
          v-model="formData.Id"
          input-type="integer1"
          placeholder="只能输入正整数"
          clearable
          :maxlength="6"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="多选">
        <el-checkbox-group v-model="formData.Checks">
          <el-checkbox label="Option A" value="Value A" />
          <el-checkbox label="Option B" value="Value B" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="备注" prop="Remark">
        <dart-input
          v-model="formData.Remark"
          type="textarea"
          trim
          placeholder="多个值之间用,隔开"
          maxlength="500"
          show-word-limit
          :autosize="{ minRows: 5, maxRows: 10 }"
        />
      </el-form-item>
    </el-form>
  </dart-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const status = ref(false); // 抽屉开关状态
const loading = ref(false);
const confirmLoading = ref(false);
const formData = ref<any>({
  Id: '',
  Type: '',
  Checks: [],
  Remark: ''
});

const onClosed = (): void => {
  status.value = false;
};
</script>
