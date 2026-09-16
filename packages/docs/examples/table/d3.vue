<template>
  <div class="vp-raw">
    <dart-table
      :data="data.List"
      row-key="id"
      is-drag
      size="large"
      class="vp-raw"
    >
      <dart-table-column prop="id" label="id" width="50" />
      <dart-table-column prop="date" label="Date" width="110" />
      <dart-table-column prop="name" label="Name" width="100" />
      <dart-table-column prop="state" label="State" width="100" />
      <dart-table-column prop="city" label="City" width="110" />
      <dart-table-column prop="address" label="Address" width="250" />
    </dart-table>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
const data = reactive({
  List: [
    {
      id: 1,
      date: '2016-05-03',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036',
      tag: 'Home',
    },
    {
      id: 2,
      date: '2016-05-02',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036',
      tag: 'Office',
    },
    {
      id: 3,
      date: '2016-05-04',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036',
      tag: 'Home',
    },
    {
      id: 4,
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
</script>
