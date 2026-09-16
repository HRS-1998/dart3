<template>
  <dart-input
    v-model="input"
    :show-word-limit="true"
    :maxlength="10"
    placeholder="请输入内容"
  ></dart-input>
  <div style="margin: 20px 0"></div>
  <dart-input
    v-model="inputarea"
    type="textarea"
    :show-word-limit="true"
    :maxlength="30"
    placeholder="请输入内容"
  ></dart-input>
</template>

<script setup>
import { ref } from 'vue';

const input = ref('');
const inputarea = ref('');
</script>
