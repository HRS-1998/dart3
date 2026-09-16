<template>
  {{ num }}
  <dart-input-number
    v-model="num"
    :min="1"
    :max="10"
    :value-on-clear="1"
    @change="handleChange"
  ></dart-input-number>
</template>

<script setup>
import { ref } from 'vue';
const num = ref(1);
const handleChange = (value) => {
  console.log(value);
};
</script>
