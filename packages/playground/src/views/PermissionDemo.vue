<template>
  <h2>Permission 权限</h2>
  <el-button @click="setPermission" style="margin-bottom: 12px">模拟设置权限 [1,2,3]</el-button>
  <el-button @click="clearPermission" style="margin-bottom: 12px">清除权限</el-button>
  <div style="margin-top: 8px">
    <p>当前权限码: {{ permCodes }}</p>
    <p>是否有新增权限(1): {{ hasAdd }}</p>
    <p>是否有删除权限(2): {{ hasDel }}</p>
    <p>是否有编辑权限(3): {{ hasEdit }}</p>
    <p>是否有导出权限(4): {{ hasExport }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Permission } from 'ct-dart3'

const permCodes = ref<number[]>([])

const setPermission = () => {
  Permission.success([1, 2, 3])
  permCodes.value = Permission.getData()?.data || []
}
const clearPermission = () => {
  Permission.success([])
  permCodes.value = []
}
const hasAdd = computed(() => Permission.is(1))
const hasDel = computed(() => Permission.is(2))
const hasEdit = computed(() => Permission.is(3))
const hasExport = computed(() => Permission.is(4))
</script>
