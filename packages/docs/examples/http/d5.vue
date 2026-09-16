<template>
  <el-button type="primary" @click="onStart()">请求</el-button>
  <el-button type="primary" @click="onAbort()">打断</el-button>
  <div>{{ agentInfo }}</div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';

const agentInfo = ref('');
let abortCancel = null;
const { proxy } = getCurrentInstance();
const onStart = (arg) => {
  const url = '/api/abort';
  agentInfo.value = 'loading';
  proxy.$dart.http
    .ajax({
      url: 'http://yapi.tcy365.org:3000/mock/405' + url,
      method: 'get',
      abort: (t) => {
        abortCancel = t;
      },
    })
    .then((res) => {
      agentInfo.value = res.Data;
    })
    .catch((err) => {
      agentInfo.value = JSON.stringify(err);
      console.log('err', err);
    });
};
const onAbort = () => {
  abortCancel && abortCancel();
};
</script>
