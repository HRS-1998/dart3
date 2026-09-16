<template>
  <dart-input
    v-model="input"
    input-type="regexp"
    :regexp="/[^a-zA-Z]/g"
    placeholder="只能输入a-zA-Z"
  ></dart-input>
</template>

<script setup>
import { ref } from 'vue';

const input = ref('');
</script>
