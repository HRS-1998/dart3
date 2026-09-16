<template>
  <div class="vp-raw">
    <div class="dart-multirows-demo">
      <dart-multirows
        name="某某科技有限公司"
        id="10001"
        code="ORG-001"
      />
      <dart-multirows
        name="某某集团股份有限公司"
        id="10002"
      />
      <dart-multirows name="某某贸易有限公司" code="ORG-003" />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.dart-multirows-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
