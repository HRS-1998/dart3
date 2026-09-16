<template>
  <div class="vp-raw">
    <div class="dart-multitags-demo">
      <div class="dart-multitags-demo__cell">
        <dart-multitags value="官方渠道(H5、小程序、APP)" />
      </div>
      <div class="dart-multitags-demo__cell">
        <dart-multitags value="三方渠道(抖音、快手)" />
      </div>
      <div class="dart-multitags-demo__cell">
        <dart-multitags value="直营()" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.dart-multitags-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dart-multitags-demo__cell {
  width: 240px;
}
</style>
