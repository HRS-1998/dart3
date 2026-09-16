<template>
  <el-button type="primary" @click="getAgentInfo('get')">get方法</el-button>
  <el-button type="primary" @click="getAgentInfo('post')">post方法</el-button>
  <div>用户信息：{{ agentInfo }}</div>
</template>
<script setup>
import { ref, getCurrentInstance } from 'vue';

const agentInfo = ref('');
const { proxy } = getCurrentInstance();
const getAgentInfo = (method) => {
  const url = {
    get: '/api/agent/getAgentInfo',
    post: '/api/agent/changeagentInfo',
  };
  agentInfo.value = '';
  proxy.$dart.http
    .ajax({
      url: 'http://yapi.tcy365.org:3000/mock/405' + url[method],
      method: method,
    })
    .then((res) => {
      agentInfo.value = res.Data.AgentName;
    })
    .catch((res) => {
      console.log(res, 'error');
    });
};
</script>
