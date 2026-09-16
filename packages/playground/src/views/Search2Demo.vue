<template>
  <h2>Search2 搜索V2</h2>
  <dart-search2 :rowFold="1" ref="searchRef" :defaultExpanded="true">
    <el-form-item label="输入框">
      <el-input v-model="form.name" placeholder="请输入姓名" />
    </el-form-item>
    <el-form-item label="下拉框">
      <el-select v-model="form.status" placeholder="请选择" clearable>
        <el-option label="启用" value="1"></el-option>
        <el-option label="禁用" value="0"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="下拉框v2">
      <el-select-v2
        v-model="form.status1"
        placeholder="请选择"
        :options="options"
        clearable
      />
    </el-form-item>
    <el-form-item label="树形下拉">
      <el-tree-select
        v-model="form.status2"
        :data="options1"
        multiple
        :render-after-expand="false"
        style="width: 240px"
      />
    </el-form-item>
    <el-form-item label="日期范围">
      <el-date-picker
        v-model="form.date"
        type="daterange"
        start-placeholder="开始"
        end-placeholder="结束"
      />
    </el-form-item>
    <el-form-item label="单个日期">
      <dart-date-picker
        v-model="form.date1"
        :disabledDateMax="0"
      ></dart-date-picker>
    </el-form-item>
    <template #button>
      <el-button type="primary" @click="onSearch">查询</el-button>
      <el-button @click="onReset">重置</el-button>
    </template>
  </dart-search2>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
const searchRef = ref();
const form = reactive({
  name: '',
  status: '',
  date: null,
  dept: '',
  date1: null,
  status1: '',
  status2: '',
});
const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
const options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`,
}));
const options1 = [
  {
    value: '1',
    label: '选项1',
    children: [
      {
        value: '1-1',
        label: '选项1-1',
      },
      {
        value: '1-2',
        label: '选项1-2',
      },
    ],
  },
  {
    value: '2',
    label: '选项2',
  },
];
const onSearch = () => console.log('搜索', form);
const onReset = () => {
  Object.assign(form, {
    name: '',
    status: '',
    status1: '',
    status2: '',
    date: null,
    dept: '',
    date1: null,
  });
};
</script>
