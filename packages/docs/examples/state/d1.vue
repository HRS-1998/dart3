<template>
  <div class="dart-state-demo">
    <div class="row">
      <dart-state type="primary" text="可用" />
      <dart-state type="success" text="使用中" />
      <dart-state type="info" text="信息" />
      <dart-state type="warning" text="警告" />
      <dart-state type="danger" text="异常" />
    </div>
    <div class="row">
      <dart-state type="success" :dot-size="8">自定义插槽（成功）</dart-state>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.dart-state-demo .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px 24px;
  margin-bottom: 12px;
}
</style>
