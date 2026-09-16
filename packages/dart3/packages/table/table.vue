<template>
  <div class="dart-table">
    <el-table
      ref="dartTableRef"
      :data="data"
      :height="isDynamicHeight ? tableHeight : height"
      :maxHeight="maxHeight"
      :stripe="stripe"
      :border="border"
      :size="size"
      :fit="fit"
      :showHeader="showHeader"
      :highlightCurrentRow="highlightCurrentRow"
      :currentRowKey="currentRowKey"
      :rowClassName="rowClassName"
      :rowStyle="rowStyle"
      :cellClassName="cellClassName"
      :cellStyle="cellStyle"
      :headerRowClassName="headerRowClassName"
      :headerRowStyle="headerRowStyle"
      :headerCellClassName="headerCellClassName"
      :headerCellStyle="headerCellStyle"
      :rowKey="rowKey"
      :emptyText="emptyText"
      :defaultExpandAll="defaultExpandAll"
      :expandRowKeys="expandRowKeys"
      :defaultSort="defaultSort"
      :tooltipEffect="tooltipEffect"
      :showSummary="showSummary"
      :sumText="sumText"
      :summaryMethod="summaryMethod"
      :spanMethod="spanMethod"
      :selectOnIndeterminate="selectOnIndeterminate"
      :indent="indent"
      :lazy="lazy"
      :load="load"
      :treeProps="treeProps"
      :tableLayout="tableLayout"
      :scrollbarAlwaysOn="scrollbarAlwaysOn"
      :showOverflowTooltip="showOverflowTooltip"
      :flexible="flexible"
      :tooltip-options="tooltipOptions"
      v-loading="loading"
      @select="onSelect"
      @select-all="onSelectAll"
      @selection-change="onSelectionChange"
      @cell-mouse-enter="onCellMouseEnter"
      @cell-mouse-leave="onCellMouseLeave"
      @cell-contextmenu="onCellContextmenu"
      @cell-click="onCellClick"
      @cell-dblclick="onCellDblclick"
      @row-click="onRowClick"
      @row-contextmenu="onRowContextmenu"
      @row-dblclick="onRowDblclick"
      @header-click="onHeaderClick"
      @header-contextmenu="onHeaderContextmenu"
      @sort-change="onSortChange"
      @filter-change="onFilterChange"
      @current-change="onCurrentChange"
      @header-dragend="onHeaderDragend"
      @expand-change="onExpandChange"
      :class="{
        'dart-table-use-handle': isUseDragHandle,
        'dart-table-sort': isDrag,
        'dart-table-sort--start': dragStart,
        'dart-table-tree-line': treeLineStyle,
      }"
    >
      <el-table-column
        class-name="dart-table-drag"
        v-if="isDrag"
        :width="DRAG_COLUMN_WIDTH"
        fixed
        :showOverflowTooltip="false"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 28 28"
          stroke="gray"
          stroke-width="2"
          class="dart-icon"
        >
          <circle cx="11" cy="8" r="0.08"></circle>
          <circle cx="16" cy="8" r="0.08"></circle>
          <circle cx="11" cy="13" r="0.08"></circle>
          <circle cx="16" cy="13" r="0.08"></circle>
          <circle cx="11" cy="18" r="0.08"></circle>
          <circle cx="16" cy="18" r="0.08"></circle>
        </svg>
      </el-table-column>

      <slot v-if="!columnSet && !columnDataApplied" />
      <!-- 20250919 ADD -->
      <component
        v-for="item in columnData"
        :is="
          h(
            DartTableColumn,
            { ...item, showOverflowTooltip: showOverflowTooltip },
            {
              ...(item.slot
                ? { default: (scope: any) => item.slot(scope) }
                : {}),
              ...(item.headerSlot ? { header: item.headerSlot } : {}),
            },
          )
        "
        :key="item.columnKey"
        v-else
      />
      <!-- END -->

      <template #empty>
        <slot name="empty"></slot>
      </template>
      <template #append>
        <slot name="append"></slot>
      </template>
    </el-table>
    <div class="bk-table-pagination" v-if="pageTotal">
      <span class="el-pagination__total">共 {{ pageTotal }} 条</span>
      <div class="bk-table-pagination-box">
        <el-pagination
          :small="pageSmall"
          :background="pageBackground"
          :pageSize="pageSize"
          :total="pageTotal"
          :pageCount="pageCount"
          :pagerCount="pagerCount"
          :currentPage="currentPage"
          :layout="pageLayout"
          :pageSizes="pageSizes"
          :popperClass="pagePopperClass"
          :prevText="pagePrevText"
          :nextText="pageNextText"
          :disabled="pageDisabled"
          :hideOnSinglePage="pageHideOnSinglePage"
          @sizeChange="onPageSizeChange"
          @currentChange="onPageCurrentChange"
          @nextClick="onPageNextClick"
          @prevClick="onPagePrevClick"
        ></el-pagination>
      </div>
    </div>
  </div>

  <!-- 20250919 ADD -->
  <SettingColumnDialog
    v-model="drawerVisiable"
    :column-data="columnData"
    :original-column-data="originalColumnData"
    @update:column-data="updateColumnData"
  />
  <!-- END -->
</template>
<script lang="ts">
export default {
  name: 'DartTable',
};
</script>
<script lang="ts" setup>
import { ref, watch, computed, h, nextTick } from 'vue';
import type { TableInstance } from 'element-plus';
import SettingColumnDialog from './SettingColumnDialog.vue';
import DartTableColumn from './column.vue';
import useDrag from './use-drag';
import useDartTableEmit, { dartTableEmitOption } from './use-tableEmit';
import { dartTableProps } from './use-tableProps';
import createDartTableExpose from './use-tableExpose';
import useSettingColumn from './use-settingColumn';
import useClickOutside from '../hooks/use-clickOutside';
import useDynamicTableHeight from './use-dynamicTableHeight';
import useDevice from '../hooks/use-device';
import { DRAG_COLUMN_WIDTH } from './config';

const props = defineProps(dartTableProps);
const emit = defineEmits([...dartTableEmitOption]);
const dartTableRef = ref<TableInstance>();
const { isMobile } = useDevice();

const {
  onSelect,
  onSelectAll,
  onSelectionChange,
  onCellMouseEnter,
  onCellMouseLeave,
  onCellContextmenu,
  onCellClick,
  onCellDblclick,
  onRowClick,
  onRowContextmenu,
  onRowDblclick,
  onHeaderClick,
  onHeaderContextmenu,
  onSortChange,
  onFilterChange,
  onCurrentChange,
  onHeaderDragend,
  onExpandChange,
  onPageSizeChange,
  onPageCurrentChange,
  onPageNextClick,
  onPagePrevClick,
} = useDartTableEmit(emit);

// 20260422 ADD 行拖拽 hook 抽离
const tableDataComp = computed(() => props.data);

const { dragStart } = useDrag({
  tableRef: dartTableRef,
  data: tableDataComp,
  isDrag: props.isDrag,
  rowKey: props.rowKey,
  isUseDragHandle: props.isUseDragHandle,
  dragHandle: props.dragHandle,
  dragEndCallback: (newIndex: number, oldIndex: number) => {
    emit('drag-end', newIndex, oldIndex);
  },
});
// END

// 2026 0416 ADD 表格自适应高度（需在列设置 hook 之前初始化，便于高度变化时同步列配置入口）
const isPagination = computed(() => !!props.pageTotal);
const pageSize = computed(() => props.pageSize);
const extraHeight = computed(() => props.dynamicExtraHeight);
const pageLayout = computed(() => {
  return isMobile.value
    ? props.pageLayout
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s && s !== 'jumper')
        .join(', ')
    : props.pageLayout;
});
const pageSmall = computed(() => props.pageSmall || isMobile.value);
const dataLen = computed(() => {
  if (!Array.isArray(props.data)) {
    return 0;
  }
  if (props.treeProps) {
    // 树形表格，计算所有节点数量
    const countNodes = (nodes: any[]): number => {
      let count = 0;
      for (const node of nodes) {
        count += 1; // 当前节点
        if (node.children && node.children.length > 0) {
          count += countNodes(node.children); // 子节点
        }
      }
      return count;
    };
    return countNodes(props.data);
  } else {
    return props.data.length;
  }
});

const { tableHeight } = useDynamicTableHeight({
  extraHeight,
  pageSize,
  isPagination,
  isDynamicHeight: props.isDynamicHeight,
  dataLen,
  itemHeight: computed(() => props.itemHeight),
});
// END

// 20250919 ADD 列设置
const {
  drawerVisiable,
  columnData,
  originalColumnData,
  updateColumnData,
  columnDataApplied
} = useSettingColumn({
    tableRef: dartTableRef,
    columnSet: props.columnSet,
    tableHeight: props.isDynamicHeight ? tableHeight : undefined,
  });
// END

// 20260415 ADD 点击表格外取消高亮当前行
useClickOutside(dartTableRef, () => {
  if (!props.highlightCurrentRow) return;
  dartTableRef.value?.setCurrentRow(undefined);
});
// END

defineExpose(createDartTableExpose(dartTableRef, { drawerVisiable }));

watch(tableHeight, () => {
  if (!props.isDynamicHeight) return;
  nextTick(() => dartTableRef.value?.doLayout());
});
</script>

<style lang="scss">
.dart-table {
  width: 100%;

  .el-popper {
    max-width: 500px !important;
  }

  .el-table {
    transform: scale(1) !important;
    position: relative;
  }

  // 20260607 ADD 树形表格展开按钮样式 - 使用 +/- 按钮替代箭头
  .dart-table-tree-line {
    // 隐藏默认箭头，使用 +/- 按钮
    .el-table__expand-icon {
      //   display: inline- !important;
      align-items: center !important;
      justify-content: center !important;
      width: 16px !important;
      height: 16px !important;
      border: 1px solid #858a99 !important;
      border-radius: 3px !important;
      background-color: #fff !important;
      cursor: pointer !important;
      transition: all 0.3s !important;
      position: relative !important;

      &:hover {
        border-color: var(--el-color-primary) !important;
        color: var(--el-color-primary) !important;
      }

      // 隐藏 Element Plus 的默认箭头图标（包括 SVG 和内部元素）
      > * {
        display: none !important;
      }

      // 使用伪元素显示 +/- 符号
      &::after {
        content: '+' !important;
        position: absolute !important;
        width: 16px;
        height: 16px;
        left: 50% !important;
        top: calc(50% - 1px) !important;
        transform: translate(-50%, -50%) rotate(0) !important;
        font-size: 16px !important;
        font-weight: 500 !important;
        color: #858a99 !important;
        text-align: center !important;
        line-height: 16px !important;
      }

      // 展开状态显示 -
      &.el-table__expand-icon--expanded::after {
        content: '-' !important;
        position: absolute !important;
        top: 50% !important;
        left: calc(50% + 2px) !important;
        width: 16px;
        height: 16px;
        transform: translate(-50%, -50%) rotate(90deg) !important;
        font-size: 16px !important;
        font-weight: 500 !important;
        color: #858a99 !important;
        text-align: center !important;
        line-height: 16px !important;
      }
    }

    // 树形表格连接线样式
    .el-table__body {
      .el-table__row {
        // 目前只考虑一级子节点
        &.el-table__row--level-0 {
          td:first-child {
            position: relative;

            &::before {
              content: '';
              position: absolute;
              left: 23px;
              bottom: 0;
              width: 2px;
              height: 16px;
              background-color: #858a99;
              transform: scaleX(0.5);
              transform-origin: 0 0;
              z-index: 1;
            }

            .cell {
              display: flex;
              align-items: center;
              justify-content: flex-start;
            }
          }
        }

        &.el-table__row--level-1 {
          td:first-child {
            position: relative;

            &::before {
              content: '';
              position: absolute;
              top: -1px;
              left: 23px;
              width: 2px;
              height: 49px;
              background-color: #858a99;
              transform: scaleX(0.5);
              transform-origin: 0 0;
              z-index: 1;
            }
          }
        }

        // 如果level-0下一个兄弟节点是折叠状态【 level-1 节点切style显示display:none】，则不显示连接线
        &.el-table__row--level-0:has(
            + .el-table__row--level-1[style*='display: none']
          ) {
          td:first-child {
            position: relative;

            &::before {
              display: none;
            }
          }
        }

        // 如果level-1是其父节点下的最后一个子节点（紧邻下一个兄弟不是level-1），则连接线只链接一半
        &.el-table__row--level-1:not(:has(+ .el-table__row--level-1)) {
          td:first-child {
            position: relative;

            &::before {
              content: '';
              position: absolute;
              top: -1px;
              left: 23px;
              width: 2px;
              height: 26px;
              background-color: #858a99;
              transform: scaleX(0.5);
              transform-origin: 0 0;
              z-index: 1;
            }

            &::after {
              content: '';
              position: absolute;
              top: 25px;
              left: 23px;
              width: 24px;
              height: 2px;
              background-color: #858a99;
              transform: scaleY(0.5);
              transform-origin: 0 0;
              overflow: hidden;
              z-index: 1;
            }
          }
        }
      }
    }
  }

  .bk-table-pagination {
    width: 100%;
    z-index: 1000;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    font-family:
      -apple-system,
      BlinkMacSystemFont,
      Segoe UI,
      Roboto,
      Helvetica Neue,
      Arial,
      Noto Sans,
      sans-serif,
      'Apple Color Emoji',
      'Segoe UI Emoji',
      Segoe UI Symbol,
      'Noto Color Emoji';

    .el-icon {
      width: auto;
    }

    .bk-table-pagination-box {
      display: inline-block;
    }
  }

  .el-table .cell.el-tooltip {
    overflow: hidden;
  }

  .el-table__empty-text {
    margin-bottom: 10px;
  }

  .dart-table-drag {
    .cell {
      padding: 0;
      text-align: center;
    }
  }

  .dart-table-sort {
    .drag-dragclass {
      opacity: 1 !important;
    }

    .drag-ghostclass {
      visibility: hidden !important;
      opacity: 0 !important;
    }

    .drag-item {
      text-align: center;
      vertical-align: middle;
      cursor: move;
    }

    .dart-icon {
      vertical-align: middle;
      cursor: move !important;

      &:active {
        cursor: move !important;
      }
    }

    .el-table__row {
      cursor: pointer;

      .el-table__cell:first-child {
        padding: 0;

        .cell {
          padding: 0;
          text-align: center;
        }
      }
    }

    &--start {
      .el-table__body tr:hover > td.el-table__cell {
        background-color: unset;
      }
    }
  }

  .dart-table-use-handle {
    .el-table__row {
      cursor: default !important;
    }
  }

  .el-table__header-wrapper {
    position: relative;
  }

  .dart-table-column-setting {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 31px;
    cursor: pointer;
    background-color: #eff2fa;
    z-index: 3;
  }

  .flex-center {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
