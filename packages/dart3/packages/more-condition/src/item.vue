<template>
  <slot></slot>
</template>
<script lang="ts" setup>
import { provide } from 'vue';
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
  other: {
    type: Object,
    default: () => {},
  },
});
provide('moreConItemData', props.data);
provide('moreConItemOther', props.other);
</script>
<style lang="scss"></style>
