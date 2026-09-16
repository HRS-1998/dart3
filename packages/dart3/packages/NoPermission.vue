<template>
  <div class="no-permission">
    <div class="no-permission__title">无编辑权限</div>
    <div>请联系管理员分配编辑权限</div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.no-permission {
  height: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.no-permission__title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
}
</style>
