<template>
  <div style="padding: 20px; display: flex; flex-direction: column; gap: 20px; max-width: 600px">
    <el-form label-width="120px">
      <div>
        <h3>短 label（≤6 字，原样显示）</h3>
        <dart-form-item label="设备名称" prop="name">
          <el-input v-model="form.name" placeholder="短 label 无 icon" />
        </dart-form-item>
      </div>

      <div>
        <h3>长 label（>6 字，截断 + icon + tooltip）</h3>
        <dart-form-item label="所属公司组织机构编码" prop="orgCode">
          <el-input v-model="form.orgCode" placeholder="hover icon 看完整 label" />
        </dart-form-item>
      </div>

      <div>
        <h3>自定义 maxLen（4）</h3>
        <dart-form-item label="设备名称类型" :max-len="4" prop="type">
          <el-input v-model="form.type" placeholder="maxLen=4，4 字即截断" />
        </dart-form-item>
      </div>

      <div>
        <h3>#label 插槽（原样透传）</h3>
        <dart-form-item prop="remark">
          <template #label>
            <span style="color: #f56c6c">自定义label插槽</span>
          </template>
          <el-input v-model="form.remark" placeholder="插槽 label 不截断" />
        </dart-form-item>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const form = reactive({ name: '', orgCode: '', type: '', remark: '' });
</script>
