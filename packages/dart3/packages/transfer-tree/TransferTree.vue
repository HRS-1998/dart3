<template>
  <el-row :gutter="20" class="dart-transfer-tree el-transfer">
    <el-tooltip
      v-if="showOverflowTooltip"
      :visible="toolVisible"
      placement="top"
      :effect="tooltipEffect"
      :virtual-ref="toolRef"
      virtual-triggering
      popper-class="singleton-tooltip"
    >
      <template #content>
        <span>{{ toolTip }}</span>
      </template>
    </el-tooltip>
    <el-col :span="12" v-if="leftTreeShow">
      <div class="el-transfer-panel">
        <div class="el-transfer-panel__header">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
            :disabled="data.length === 0"
          />
          <span v-if="!$slots['left-title']" class="dart-transfer-tree_title">{{ titles[0] }}</span>
          <span class="dart-transfer-tree_title" v-else><slot name="left-title"></slot></span>
          <span class="dart-transfer-tree_num">{{ checkedData.length }} / {{ allIds.length }}</span>
        </div>
        <div class="el-transfer-panel__body" v-loading="loading">
          <div class="el-transfer-panel__filter" v-if="filterable">
            <el-input
              v-model="queryLeft"
              clearable
              :placeholder="filterPlaceholder[0]"
              prefix-icon="Search"
              :validate-event="false"
              @input="onQueryChanged"
            />
          </div>
          <div class="dart-transfer-tree__body">
            <el-tree-v2
              v-show="!isSearch"
              ref="leftTree"
              class="w100"
              @check-change="onCheckChange"
              :data="_data"
              :props="dataMap"
              :default-checked-keys="defaultCheckedKeys"
              show-checkbox
              :height="height"
              v-bind="$attrs"
            >
              <template #default="{ node, data }">
                <div v-if="!!$slots.default">
                  <slot :node="node" :data="data"></slot>
                </div>
                <div v-if="!!$slots.left">
                  <slot name="left" :node="node" :data="data"></slot>
                </div>
                <div
                  v-if="!$slots.default && !$slots.left"
                  :class="{ 'dart-transfer-tree__item': showOverflowTooltip }"
                  @mouseenter="
                    (e) => {
                      showTooltip(e, data[treeLabel]);
                    }
                  "
                  @mouseleave="toolVisible = false"
                >
                  <span class="content">{{ data[treeLabel] }}</span>
                </div>
              </template>
            </el-tree-v2>

            <el-tree-v2
              v-if="isSearch"
              ref="searchRef"
              class="w100"
              @check-change="onSearchCheckChange"
              :data="searchSubTree"
              :props="dataMap"
              :default-checked-keys="searchDefaultCheckedKeys"
              show-checkbox
              :filter-method="searchFilterMethod2"
              :height="height"
            >
              <template #default="{ node, data }">
                <div v-if="!!$slots.default">
                  <slot :node="node" :data="data"></slot>
                </div>
                <div v-if="!!$slots.left">
                  <slot name="left" :node="node" :data="data"></slot>
                </div>
                <div
                  v-if="!$slots.default && !$slots.left"
                  :class="{ 'dart-transfer-tree__item': showOverflowTooltip }"
                  @mouseenter="
                    (e) => {
                      showTooltip(e, data[treeLabel]);
                    }
                  "
                  @mouseleave="toolVisible = false"
                >
                  <span class="content">{{ data[treeLabel] }}</span>
                </div>
              </template>
            </el-tree-v2>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="leftTreeShow ? 12 : 24">
      <div class="el-transfer-panel">
        <div class="el-transfer-panel__header">
          <span v-if="!$slots['right-title']" class="dart-transfer-tree_title">
            {{ titles[1] }}
          </span>
          <span class="dart-transfer-tree_title" v-else><slot name="right-title"></slot></span>
          <span class="dart-transfer-tree_num">{{ checkedData.length }}</span>
        </div>
        <div class="el-transfer-panel__body" v-loading="loading">
          <div class="el-transfer-panel__filter" v-if="filterable">
            <el-input
              v-model="queryRight"
              clearable
              prefix-icon="Search"
              :placeholder="filterPlaceholder[1]"
              :validate-event="false"
              @input="onQueryChangedRight"
            />
          </div>
          <div class="dart-transfer-tree__body">
            <el-tree-v2
              class="w100"
              ref="rightTree"
              :data="rightData"
              :props="dataMap"
              :filter-method="searchFilterMethod"
              :show-checkbox="isRightClear"
              :default-checked-keys="rightCheckData"
              @check-change="onRightCheckChange"
              :height="height"
            >
              <template #default="{ node, data }">
                <div v-if="!!$slots.default">
                  <slot :node="node" :data="data"></slot>
                </div>
                <div v-if="!!$slots.right">
                  <slot name="right" :node="node" :data="data"></slot>
                </div>
                <div
                  v-if="!$slots.default && !$slots.right"
                  :class="{ 'dart-transfer-tree__item': showOverflowTooltip }"
                  @mouseenter="
                    (e) => {
                      showTooltip(e, data[treeLabel]);
                    }
                  "
                  @mouseleave="toolVisible = false"
                >
                  <span class="content">{{ data[treeLabel] }}</span>
                </div>
              </template>
            </el-tree-v2>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script lang="ts">
export default {
  name: 'DartTransferTree'
};
</script>
<script lang="ts" setup>
import { computed, ref, inject, nextTick, watch } from 'vue';
import useDefault from './use-default';
import useCheckAll from './use-checkall';
import useSetdata from './use-setdata';
import useRight from './use-right';
import useTree from './use-tree';
import useSearch from './use-search';
import useTooltip from './use-tooltip';
import { treeProps } from './props';
import { formItemContextKey } from 'element-plus';

const elFormItem: any = inject(formItemContextKey, undefined);

const emit = defineEmits(['check-change']);
const props = defineProps(treeProps);
const {
  treeValue,
  treeLabel,
  treeDisabled,
  treeChildren,
  bodyHeight,
  searchFilterMethod,
  fixTreeData
} = useDefault(props);
const {
  allDisabledIds,
  allSearchDisabledIds,
  defaultCheckedKeys,
  getSubTree,
  getTreeBySearchQuery,
  getAllId,
  getAllSearchIds
} = useSetdata(treeValue, treeLabel, treeChildren, treeDisabled);
const { showTooltip, toolRef, toolVisible, toolTip } = useTooltip(props.showOverflowTooltip);
function handleSetCheckAll() {
  setCheckAll();
}
const _data = computed(() => fixTreeData(props.data));

const {
  checkedData,
  leftTree,
  allIds,
  allCheckedDisabledIds,
  onCheckChange,
  setCheckedKeys,
  setChecked
} = useTree(
  props,
  emit,
  elFormItem,
  getAllId,
  handleSetCheckAll,
  allDisabledIds,
  defaultCheckedKeys,
  _data
);

const {
  queryLeft,
  searchRef,
  searchDefaultCheckedKeys,
  searchCheckedIds,
  allSearchIds,
  searchSubTree,
  isSearch,
  setSearchData,
  searchFilterMethod2,
  onQueryChanged,
  onSearchCheckChange,
  clearQueryLeft
} = useSearch(
  props,
  getTreeBySearchQuery,
  getAllId,
  searchFilterMethod,
  handleSetCheckAll,
  checkedData,
  setChecked,
  allSearchDisabledIds,
  getAllSearchIds,
  defaultCheckedKeys,
  _data
);

const {
  onQueryChangedRight,
  onRightCheckChange,
  clearQueryRight,
  rightTree,
  queryRight,
  rightCheckData,
  rightData
} = useRight(
  props,
  allIds,
  checkedData,
  getSubTree,
  isSearch,
  searchCheckedIds,
  setSearchData,
  setChecked,
  allDisabledIds,
  _data
);

const { checkAll, handleCheckAllChange, setCheckAll, isIndeterminate } = useCheckAll(
  checkedData,
  isSearch,
  searchCheckedIds,
  allSearchIds,
  allIds,
  setChecked,
  setSearchData,
  defaultCheckedKeys,
  allCheckedDisabledIds
);

const getLeftTree = () => {
  return leftTree;
};
const expandedKeys = () => {
  if (!props.isExpandAll) {
    return;
  }

  watch(
    () => props.data,
    (val) => {
      setTimeout(() => {
        if (
          (!Array.isArray(props.isExpandAll) && props.isExpandAll) ||
          (Array.isArray(props.isExpandAll) && props.isExpandAll[0])
        ) {
          leftTree.value?.setExpandedKeys(allIds.value);
        }
      }, 200);
    },
    { immediate: true }
  );
  watch(
    isSearch,
    (val) => {
      if (!val) {
        return;
      }
      setTimeout(() => {
        searchRef.value?.setExpandedKeys(allIds.value);
      }, 200);
    },
    { immediate: true }
  );
  watch(
    rightData,
    (val) => {
      setTimeout(() => {
        if (
          (!Array.isArray(props.isExpandAll) && props.isExpandAll) ||
          (Array.isArray(props.isExpandAll) && props.isExpandAll[1])
        ) {
          rightTree.value?.setExpandedKeys(allIds.value);
        }
      }, 200);
    },
    { immediate: true }
  );
};

const clearQuery = () => {
  clearQueryLeft();
  clearQueryRight();
};

expandedKeys();
defineExpose({
  setCheckedKeys,
  getLeftTree,
  clearQuery,
  clearQueryLeft,
  clearQueryRight
});
</script>
<style lang="scss">
.dart-transfer-tree {
  margin-bottom: 5px;
  &__body {
    height: v-bind(bodyHeight);
  }
  .el-transfer-panel {
    width: 100%;
  }
  .el-transfer-panel__body {
    height: auto;
  }
  &__item {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 90%;
  }

  .el-transfer-panel .el-transfer-panel__header {
    .el-checkbox {
      width: fit-content;
    }
    .dart-transfer-tree_title {
      line-height: 1;
      margin-left: 5px;
      color: var(--el-text-color-primary);
      font-size: 16px;
      font-weight: normal;
    }
    .dart-transfer-tree_num {
      position: absolute;
      right: 15px;
      top: 5%;
      color: var(--el-text-color-secondary);
      font-size: 12px;
      font-weight: normal;
      transform: translate3d(0, -50%, 0);
    }
  }
}
</style>
