<template>
  <el-col :span="span">
    <el-form-item :prop="getProp()" :rules="getRule()">
      <slot :row="data"></slot>
    </el-form-item>
  </el-col>
</template>
<script lang="ts">
export default {
  name: 'DartMoreConditionItem',
};
</script>
<script setup lang="ts">
import { inject } from 'vue';
import Utils from '../../utils';
const selfProps = defineProps({
  prop: String,
  span: { type: Number, default: 8 },
  rules: Array,
  label: { type: String, default: '' },
});
const data: any = inject('moreConItemData');
const other: any = inject('moreConItemOther');
const getParentRule: any = inject('getParentRule');
const attrsProp: any = inject('getAttrsProp');

const getProp = () => {
  if (!selfProps.prop) {
    return '';
  }
  const path = other.path.slice(0);

  path.push(attrsProp.value.data);
  path.push(selfProps.prop);
  return path.join('.');
};
const getRule = () => {
  if (!selfProps.prop) {
    return null;
  }
  const selfRules = selfProps.rules;
  if (selfRules) {
    if (Utils.isFunction(selfRules)) {
      return (selfRules as any)(data);
    }
    return selfRules;
  }
  const rules = getParentRule() || {};
  const rule = rules[selfProps.prop as string] || null;
  return Utils.isFunction(rule) ? rule(data) : rule;
  //return rule;
};
</script>
<style lang="scss"></style>
