<template>
  <template v-for="(option, optionIndex) in modelValue" :key="option.id">
    <template v-if="option[props.type]">
      <div class="more-con" ref="dom">
        <div class="more-con__andor">
          <el-button circle @click="onSetAO(option)">
            {{ getAO(option[props.type]) }}
          </el-button>
        </div>
        <div class="more-con__content">
          <MoreConditionWrap
            :key="option.id"
            v-model="option[props.children]"
            :other="getOtherData(true, optionIndex)"
            :props="props"
            :deep="deep + 1"
            :isMaxNum="isMaxNum"
            :isOperator="isOperator"
            :isView="isView"
          >
            <slot :row="option[props.children]"></slot>
          </MoreConditionWrap>
        </div>
      </div>
    </template>
    <template v-if="!option[props.type]">
      <div class="more-con-item">
        <div class="more-con__sub">
          <el-row :gutter="10">
            <MItem
              :data="option[props.data]"
              :other="getOtherData(false, optionIndex)"
              :key="`id=${option.id}i=${optionIndex}`"
            >
              <slot></slot>
            </MItem>
          </el-row>
        </div>
        <div class="more-con__oper" v-if="isOperator && !isView">
          <el-dropdown class="mr10">
            <el-button icon="Plus" circle></el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :disabled="isMaxNum" @click="onAdd(option, 1)">
                  兄弟结点
                </el-dropdown-item>
                <el-dropdown-item
                  :disabled="!isAddTodeep(deep) || isMaxNum"
                  @click="onAdd(option, 2, deep)"
                >
                  子结点
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <el-button icon="Minus" circle @click="onClear(option.id)"></el-button>
        </div>
      </div>
    </template>
  </template>
</template>
<script lang="ts">
export interface MoreConditionWrapProps {
  modelValue: Array<any>;
  deep: number;
  isMaxNum: boolean;
  other: any;
  props: any;
  isOperator: boolean;
  isView: boolean;
}
export default {
  name: 'MoreConditionWrap'
};
</script>
<script setup lang="ts">
import { inject } from 'vue';
import MItem from './item.vue';
const selfProps = withDefaults(defineProps<MoreConditionWrapProps>(), {
  modelValue: () => [],
  deep: 0,
  other: () => {},
  props: () => {},
  isOperator: true
});
const clearItem: any = inject('clearItem');
const addItem: any = inject('addItem');
const isAddTodeep: any = inject('isAddTodeep');

const onClear = (id: number) => {
  clearItem(id);
};
const onAdd = (item: any, type: number, deep?: number) => {
  addItem(item, type, deep);
};
const onSetAO = (item: any) => {
  if (selfProps.isView) {
    return;
  }
  item[selfProps.props.type] = item[selfProps.props.type] === 1 ? 2 : 1;
};
const getAO = (type: number) => {
  return type === 1 ? '且' : '或';
};
const getOtherData = (type: boolean, index: any) => {
  const data = {
    deep: selfProps.other.deep,
    path: selfProps.other.path.slice(0)
  };
  data.path.push(index);
  if (type) {
    data.deep += 1;
    data.path.push(selfProps.props.children);
  }
  return data;
};
</script>
