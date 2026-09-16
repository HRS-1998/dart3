<template>
  <el-table-column
    :width="width"
    :min-width="minWidth"
    :header-align="headerAlign"
    :align="align"
    :show-overflow-tooltip="showOverflowTooltip"
    :class-name="className"
    :label-class-name="labelClassName"
  >
    <template v-slot:header="scope">
      <slot name="header" :item="scope" :row="scope.row" :$index="scope.$index"></slot>
      <template v-if="!$slots.header">
        {{ label }}
      </template>
    </template>

    <template v-slot:default="scope">
      <el-form-item :prop="getProp(scope.$index)" :rules="getRule(scope)">
        <slot :item="scope" :row="scope.row" :$index="scope.$index"></slot>
      </el-form-item>
    </template>
  </el-table-column>
</template>

<script lang="ts">
import Utils from '../utils';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'dartListTempItem',
  inject: ['ctListTemp'],
  props: {
    label: String,
    width: String,
    prop: String,
    headerAlign: String,
    align: String,
    showOverflowTooltip: Boolean,
    minWidth: String,
    className: String,
    labelClassName: String
  },
  data() {
    return {};
  },
  methods: {
    getProp(index: any): any {
      return 'data.' + index + '.' + this.prop;
    },
    getRule(scope: any): any {
      const rule = (this as any).ctListTemp.rules[(this as any).prop] || null;

      return Utils.isFunction(rule) ? rule(scope) : rule;
    }
  }
});
</script>
