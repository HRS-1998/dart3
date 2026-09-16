<template>
  <el-button type="primary" @click="getAgentInfo()">响应拦截</el-button>
  <el-button type="primary" @click="getAgentInfo()">请求拦截</el-button>
  <el-button type="primary" @click="getAgentInfo('go')"
    >自定义参数响应拦截</el-button
  >
  <div>用户信息：{{ agentInfo }}</div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';

const agentInfo = ref('');
const { proxy } = getCurrentInstance();
const getAgentInfo = (arg) => {
  const url = '/api/agent/getAgentInfo';
  agentInfo.value = '';
  proxy.$dart.http
    .ajax({
      url: 'http://yapi.tcy365.org:3000/mock/405' + url,
      method: 'get',
      _useType: arg,
    })
    .then((res) => {
      console.log('res', res);
      agentInfo.value = res.Data.AgentName;
    })
    .catch((err) => {
      agentInfo.value = 'error';
      console.log('err', err);
    });
};
</script>
