<template>
  <div class="vp-raw">
    <dart-table
      size="large"
      highlight-current-row
      :data="data.List"
      :page-size="data.pageSize"
      :page-total="data.RecordCount"
      :current-page="data.PageIndex"
      @page-current-change="onPageChange"
    >
      <dart-table-column prop="date" label="Date" width="150" />
      <dart-table-column prop="name" label="Name" width="120" />
      <dart-table-column prop="state" label="State" width="120" />
      <dart-table-column prop="city" label="City" width="120" />
      <dart-table-column prop="address" label="Address" width="300" />
      <dart-table-column prop="zip" label="Zip" width="120" />
      <dart-table-column fixed="right" label="Operations" width="120">
        <template #default>
          <el-button link type="primary">Detail</el-button>
          <el-button link type="primary">Edit</el-button>
        </template>
      </dart-table-column>
    </dart-table>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
const data = reactive({
  RecordCount: 10,
  PageSize: 10,
  PageIndex: 1,
  List: [
    {
      date: '2016-05-03',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036',
      tag: 'Home',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036',
      tag: 'Office',
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036',
      tag: 'Home',
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036',
      tag: 'Office',
    },
  ],
});

const onPageChange = (index) => {
  data.PageIndex = index;
};
</script>
