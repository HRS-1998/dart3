<template>
  <el-button type="primary" @click="sendMoreRequest"
    >获取用户账户信息和欢乐币数据</el-button
  >
  <div>用户信息：{{ agentInfo }}</div>
  <div>用户欢乐币数据：{{ agentBalance }}</div>
</template>
<script setup>
import { ref, getCurrentInstance } from 'vue';

const domain = 'http://yapi.tcy365.org:3000/mock/405';
const agentInfo = ref('');
const agentBalance = ref('');
const { proxy } = getCurrentInstance();
const getAgentInfo2 = () => {
  return proxy.$dart.http.ajax({
    url: domain + '/api/agent/getAgentInfo',
  });
};

const getagentcountdetail = () => {
  return proxy.$dart.http.ajax({
    url: domain + '/api/happycoin/getagentcountdetail',
  });
};
const sendMoreRequest = () => {
  proxy.$dart.http.all([getAgentInfo2(), getagentcountdetail()], (result) => {
    if (result) {
      agentInfo.value = result[0].Data.AgentName;
      agentBalance.value = result[1].Data.AgentBalance;
    }
  });
};
</script>
