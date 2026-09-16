<template>
  <h2>MoreCondition 更多条件</h2>
  <dart-more-condition v-model="conditions" :maxNum="5" ref="mcRef">
    <dart-more-condition-item prop="field1" label="字段1" :span="8">
      <template #default="{ row }">
        <el-input v-model="row.data.field1" placeholder="请输入" />
      </template>
    </dart-more-condition-item>
    <dart-more-condition-item prop="field2" label="字段2" :span="8">
      <template #default="{ row }">
        <el-select v-model="row.data.field2" placeholder="请选择" clearable>
          <el-option label="选项A" value="a" />
          <el-option label="选项B" value="b" />
        </el-select>
      </template>
    </dart-more-condition-item>
    <dart-more-condition-item prop="field3" label="字段3" :span="8">
      <template #default="{ row }">
        <el-input-number v-model="row.data.field3" :min="0" size="small" />
      </template>
    </dart-more-condition-item>
  </dart-more-condition>
  <el-button type="primary" style="margin-top: 16px" @click="onValidate">验证</el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const mcRef = ref()
const conditions = ref([
  { id: 1, type: 0, children: [], data: { field1: '测试', field2: 'a', field3: 10 } }
])
const onValidate = () => {
  mcRef.value?.validate((valid: boolean) => {
    console.log('验证结果', valid)
  })
}
</script>
