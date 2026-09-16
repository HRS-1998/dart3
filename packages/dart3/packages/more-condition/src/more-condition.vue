<template>
  <div class="more-con-box">
    <el-table class="more-con-table" border v-show="ruleFromData.list.length">
      <el-table-column header-align="center">
        <template #header>
          <el-row>
            <el-col
              v-for="(menuItem, index) in slotsDefault"
              :span="menuItem.props.span"
              :key="index"
            >
              {{ menuItem.props.label }}
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column
        v-if="isOperator && !isView"
        label="操作"
        width="100"
        header-align="center"
      ></el-table-column>
      <template #append>
        <div class="more-con-form">
          <el-form ref="dom" :model="ruleFromData">
            <MoreConditionWrap
              v-model="ruleFromData.list"
              :deep="0"
              :other="otherData"
              :props="attrsProp"
              :isOperator="isOperator"
              :isView="isView"
              :isMaxNum="isMaxNum"
            >
              <slot></slot>
            </MoreConditionWrap>
          </el-form>
        </div>
      </template>
    </el-table>
    <div
      v-if="isFooter && !isView"
      class="more-con-add"
      :class="{ 'more-con-add--notopline': ruleFromData.list.length }"
    >
      <el-button icon="plus" :disabled="isMaxNum" @click="onAdd">新增</el-button>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'DartMoreCondition'
};
</script>
<script setup lang="ts">
import { ref, provide, watch, inject, useSlots, computed } from 'vue';
import Utils from '../../utils';
import { isEqual } from 'lodash-es';
import MoreConditionWrap from './more-condition-wrap.vue';
import { formItemContextKey } from 'element-plus';
import UseMore from './use-more';
const moreProps = defineProps({
  modelValue: { type: Array, default: () => [] },
  defaultData: { type: Object, default: () => {} },
  maxDeep: Number,
  maxNum: { type: Number, default: 0 },
  rules: { type: Object, default: () => {} },
  isOperator: { type: Boolean, default: true },
  isFooter: { type: Boolean, default: true },
  isView: Boolean,
  props: {
    type: Object,
    default: () => {}
  }
});
const attrsProp = computed(() => {
  const defaultProps = {
    children: 'children',
    type: 'type',
    data: 'data',
    id: 'id'
  };
  return Object.assign({}, defaultProps, moreProps.props);
});
const ruleFromData = ref<{ list: Array<any> }>({ list: [] });
const emit = defineEmits(['update:modelValue', 'change']);
const slots = useSlots();
const slotsDefault: any = slots.default && slots.default({});
const dom = ref();
let id = 1000;
const otherData = {
  deep: 0, //深度
  path: ['list'] //路径
};
const getId = () => {
  return ++id;
};
//获取结点模板
const getItemTemp = (isMainTemp: boolean = false) => {
  const id = getId();

  const leafItme = { id: id, [attrsProp.value.data]: {} };
  leafItme[attrsProp.value.data] = Utils.merge({}, moreProps.defaultData);
  const item = {
    id: id,
    [attrsProp.value.type]: 1,
    [attrsProp.value.children]: []
  };
  return isMainTemp ? item : leafItme;
};
const getParentNodeToId = (id: number, data: any, parentData: any) => {
  for (const item of data) {
    if (item.id === id) {
      return parentData;
    }
    if (item[attrsProp.value.children]) {
      const value: any = getParentNodeToId(id, item[attrsProp.value.children], item);
      if (value) {
        return value;
      }
    }
  }
};
//根据深度 判断 是否添加
const isAddTodeep = (deep: number) => {
  if (!moreProps.maxDeep) {
    return true;
  }

  return moreProps.maxDeep >= deep + 1;
};

const { isMaxNum, refreshMaxItemNum } = UseMore(attrsProp, moreProps.maxNum);
//1 兄弟节点 2 子节点
// eslint-disable-next-line complexity
const addItem = (node: any, type: number, deep: number) => {
  const parentData = getParentNodeToId(node.id, ruleFromData.value.list, ruleFromData.value.list);
  if (!parentData) {
    return;
  }
  if (type === 1) {
    if (parentData[attrsProp.value.type]) {
      const index = parentData[attrsProp.value.children].findIndex((item: any) => {
        return item.id === node.id;
      });
      parentData[attrsProp.value.children].splice(index + 1, 0, getItemTemp());
      return;
    }

    const itemNew = getItemTemp(true);
    (itemNew[attrsProp.value.children] as Array<any>).push(node);
    (itemNew[attrsProp.value.children] as Array<any>).push(getItemTemp());
    parentData.splice(0, parentData.length);
    parentData.push(itemNew);
    return;
  }
  if (type === 2) {
    if (!isAddTodeep(deep)) {
      return;
    }
    if (parentData[attrsProp.value.type] && parentData[attrsProp.value.children].length > 1) {
      const index = parentData[attrsProp.value.children].findIndex((item: any) => {
        return item.id === node.id;
      });
      const itemNew = getItemTemp(true);
      (itemNew[attrsProp.value.children] as Array<any>).push(node);
      (itemNew[attrsProp.value.children] as Array<any>).push(getItemTemp());
      parentData[attrsProp.value.children].splice(index, 1, itemNew);
      return;
    }

    (parentData[attrsProp.value.children] as Array<any>).push(getItemTemp());
  }
};

//删除空结点
// eslint-disable-next-line complexity
const clearEmptyData = (data: any) => {
  if (!data || !data.length) {
    return;
  }
  const list = ruleFromData.value.list;

  if (
    list.length === 1 &&
    list[0][attrsProp.value.children].length === 1 &&
    !list[0][attrsProp.value.children][0][attrsProp.value.type]
  ) {
    return;
  }
  for (const item of data) {
    const children = item[attrsProp.value.children];
    if (children && children.length === 0) {
      const index = data.findIndex((o: any) => {
        return o.id === item.id;
      });
      data.splice(index, 1);
      clearEmptyData(data);
      return;
    }
    if (children && children.length === 1) {
      const index = data.findIndex((o: any) => {
        return o.id === item.id;
      });

      const content = children[0];
      data.splice(index, 1, content);
      clearEmptyData(data);
      return;
    }
    if (children && children.length > 1) {
      clearEmptyData(item[attrsProp.value.children]);
    }
  }
};
const clearItem = (id: number) => {
  const list: Array<any> = ruleFromData.value.list;
  const parentData = getParentNodeToId(id, list, list);

  //   if (parentData[attrsProp.value.type]) {
  const index = parentData[attrsProp.value.children].findIndex((item: any) => {
    return item.id === id;
  });
  parentData[attrsProp.value.children].splice(index, 1);

  clearEmptyData(list);
};
const getParentRule = () => {
  return moreProps.rules;
};
provide('addItem', addItem);
provide('clearItem', clearItem);
provide('isAddTodeep', isAddTodeep);
provide('getParentRule', getParentRule);
provide('getAttrsProp', attrsProp);
const getMaxId = (n: number) => {
  if (id < n) {
    id = n;
  }
};
//list id 初始化
const addId = (arr: any) => {
  if (!Utils.isArray(arr)) {
    return arr;
  }

  const result = arr.map((element: any) => {
    if (!element.id) {
      element.id = getId();
    } else {
      getMaxId(element.id);
    }

    if (element[attrsProp.value.children]) {
      element[attrsProp.value.children] = addId(element[attrsProp.value.children]);
    }
    return element;
  });
  return result;
};

//清除校验
const elFormItem: any = inject(formItemContextKey, undefined);
const handleDispatch = () => {
  elFormItem && elFormItem.clearValidate();
};
watch(
  () => moreProps.modelValue,
  (newVal: Array<any>) => {
    if (!Utils.isArray(newVal)) {
      ruleFromData.value.list = [];
      return;
    }

    if (isEqual(newVal, ruleFromData.value.list)) {
      return;
    }

    ruleFromData.value.list = addId(newVal);
  },
  { deep: true, immediate: true }
);
watch(
  () => ruleFromData.value.list,
  (newVal: any[]) => {
    if (!Utils.isArray(newVal)) {
      return;
    }
    setTimeout(() => {
      emit('update:modelValue', Utils.deepCopy(newVal));
      emit('change', Utils.deepCopy(newVal));
      handleDispatch();
      refreshMaxItemNum(newVal);
    }, 10);
  },
  { deep: true, immediate: true }
);
const onAdd = () => {
  const list: Array<any> = ruleFromData.value.list;
  if (list.length) {
    const item: any = list[0];

    (item[attrsProp.value.children] as Array<any>).push(getItemTemp());

    return;
  }
  const rootItem = getItemTemp(true);
  (rootItem[attrsProp.value.children] as Array<any>).push(getItemTemp());
  list.push(rootItem);
};

defineExpose({
  validate: async (callback: any) => {
    return (dom.value as any).validate(callback);
  },
  validateField: (props: any, callback: any) => {
    (dom.value as any).validateField(props, callback);
  },
  resetFields: (props: any) => {
    (dom.value as any).resetFields(props);
  },
  clearValidate: (props: any) => {
    (dom.value as any).clearValidate(props);
  }
});
</script>
<style lang="scss">
.el-form-item.is-error .more-con {
  .el-input__wrapper,
  .el-select__wrapper,
  .el-textarea__inner {
    box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
  }
}
.more-con .el-form-item.is-error {
  .el-input__wrapper,
  .el-select__wrapper,
  .el-textarea__inner {
    box-shadow: 0 0 0 1px var(--el-color-danger) inset;
  }
}

.el-form-item.is-error .more-con-box {
  border-color: var(--el-color-danger);
}
.more-con {
  border-top: solid 1px #ebeef5;
  border-bottom: solid 1px #ebeef5;
  &-box {
    padding-bottom: 2px;
    border: solid 1px transparent;
  }
  &__andor,
  &__oper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  display: flex;
  &__andor {
    width: 60px;
    border-right: solid 1px #ebeef5;
  }
  &-add {
    border: solid 1px #ebeef5;
    padding: 10px;
    &--notopline {
      border-top: 0;
    }
  }
  &__content {
    & > .more-con:first-child {
      border-top: 0;
    }
    & > .more-con:last-child {
      border-bottom: 0;
    }
    flex: 1;
  }
  &-item {
    display: flex;
    margin: 15px 0;
  }
  &-table {
    .el-table__empty-block {
      display: none;
    }
  }
  &-form {
    .el-form-item--small {
      margin: 5px 0;
    }
  }
  &__sub {
    flex: 1;
    padding: 0 10px;
    .el-form-item {
      margin-bottom: 0 !important;
    }
  }
  &__oper {
    width: 100px;
  }
}
</style>
