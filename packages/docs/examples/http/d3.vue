<template>
  <el-button type="primary" @click="getAgentInfo">获取用户账户信息</el-button>
  <div>用户信息：{{ agentInfo }}</div>
</template>
<script setup>
import { ref, getCurrentInstance } from 'vue';

const agentInfo = ref('');
const { proxy } = getCurrentInstance();
const getAgentInfo = (method) => {
  const url = {
    get: '/api/agent/getAgentInfo',
  };
  agentInfo.value = '';
  proxy.$dart.http
    .ajax({
      url: 'http://yapi.tcy365.org:3000/mock/405' + url.get,
      method: 'post',
    })
    .then((res) => {
      agentInfo.value = res.Data.AgentName;
    })
    .catch((res) => {
      agentInfo.value = JSON.stringify(res);
      console.log(res, 'error');
    });
};
</script>
