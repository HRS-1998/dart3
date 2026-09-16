import { unref } from 'vue';
import type { Ref } from 'vue';

/**
 * 生成待 defineExpose 的对象（勿在本文件调用 defineExpose，须在 DartTable 的 script setup 顶层执行）。
 */
export default function createDartTableExpose(
  tableRef: Ref<any>,
  columnSetState?: { drawerVisiable: Ref<boolean> }
) {
  return {
    /** 原生 el-table 实例，未封装的 API 可直接从这里调用 */
    elTableRef: tableRef,
    clearSelection: () => tableRef.value?.clearSelection(),
    getSelectionRows: () => tableRef.value?.getSelectionRows(),
    toggleRowSelection: (row: any, selected?: boolean, ignoreSelectable?: boolean) =>
      tableRef.value?.toggleRowSelection(row, selected, ignoreSelectable),
    toggleAllSelection: () => tableRef.value?.toggleAllSelection(),
    toggleRowExpansion: (row: any, expanded?: boolean) =>
      tableRef.value?.toggleRowExpansion(row, expanded),
    /** 不传 row 时清除当前行高亮（与 Element Plus 文档一致） */
    setCurrentRow: (row?: any) => tableRef.value?.setCurrentRow(row),
    clearSort: () => tableRef.value?.clearSort(),
    clearFilter: (columnKeys?: string | string[]) => tableRef.value?.clearFilter(columnKeys),
    doLayout: () => tableRef.value?.doLayout(),
    /** 手动排序：prop 为列字段，order 为 `ascending` / `descending` / `null` */
    sort: (prop: string, order: string) => tableRef.value?.sort(prop, order),
    scrollTo: (options: any, yCoord?: number) => tableRef.value?.scrollTo(options, yCoord),
    setScrollLeft: (left?: number) => tableRef.value?.setScrollLeft(left),
    setScrollTop: (top?: number) => tableRef.value?.setScrollTop(top),
    /** 当前列配置数组（内部为 ComputedRef，此处已解包） */
    getColumns: () => unref(tableRef.value?.columns) ?? [],
    updateKeyChildren: (key: string, data: any[]) => tableRef.value?.updateKeyChildren(key, data),
    /** 打开列设置弹窗（外部按钮触发，配合 column-set=false 使用） */
    openColumnSet: () => {
      if (columnSetState) columnSetState.drawerVisiable.value = true;
    },
    closeColumnSet: () => {
      if (columnSetState) columnSetState.drawerVisiable.value = false;
    },
    toggleColumnSet: () => {
      if (columnSetState)
        columnSetState.drawerVisiable.value = !columnSetState.drawerVisiable.value;
    }
  };
}
