<template>
  <pre class="dart-textarea-content">{{ value }}</pre>
</template>
<script lang="ts">
export default {
  name: 'DartTextareaContent',
};
</script>
<script lang="ts" setup>
defineProps({
  value: {
    type: String,
    default: '',
  },
});
</script>
<style lang="scss">
.dart-textarea-content {
  margin: 0;
  white-space: pre-wrap;
  font-family: auto;
  word-break: break-all;
}
</style>
