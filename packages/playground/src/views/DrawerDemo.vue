<template>
  <h2>Drawer 抽屉</h2>
  <el-button @click="visible = true">打开抽屉</el-button>
  <dart-drawer v-model="visible" title="测试抽屉" :hasPermission="true">
    <p>抽屉内容</p>
    <dart-table :data="tableData" style="width: 100%">
      <dart-table-column prop="name" label="姓名" width="180" />
      <dart-table-column prop="age" label="年龄" width="180" />
      <dart-table-column prop="address" label="地址" min-width="300" />
      <dart-table-column prop="remark" label="备注" min-width="300" />
      <dart-table-column label="操作" width="120" fixed="right">
        <template #default="{ row }">
          <el-button link type="primary" @click="onEdit(row)">编辑</el-button>
          <el-button link type="danger">删除</el-button>
        </template>
      </dart-table-column>
    </dart-table>
  </dart-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const visible = ref(false);
const onEdit = (row: any) => console.log(row);
const tableData = [
  {
    name: '张三',
    age: 28,
    address: '北京市朝阳区某某街道100号',
    remark: '备注信息1',
  },
  {
    name: '李四',
    age: 32,
    address: '上海市浦东新区某某路200号',
    remark: '备注信息2',
  },
  {
    name: '王五',
    age: 25,
    address: '广州市天河区某某大道300号',
    remark: '备注信息3',
  },
];
</script>
