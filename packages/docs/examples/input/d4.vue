<template>
  <div>prepend:</div>
  <dart-input v-model="input1">
    <template #prepend>Http://</template>
  </dart-input>
  <div>append:</div>
  <dart-input v-model="input2">
    <template #append>.com</template>
  </dart-input>
</template>

<script setup>
import { ref } from 'vue';

const input1 = ref('');
const input2 = ref('');
</script>
