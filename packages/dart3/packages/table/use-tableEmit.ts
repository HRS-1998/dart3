/** DartTable 对外透传的 el-table / 分页 / 拖拽事件名（须在 table.vue 的 defineEmits 中同步使用） */
export const dartTableEmitOption = [
  'select',
  'select-all',
  'selection-change',
  'cell-mouse-enter',
  'cell-mouse-leave',
  'cell-contextmenu',
  'cell-click',
  'cell-dblclick',
  'row-click',
  'row-contextmenu',
  'row-dblclick',
  'header-click',
  'header-contextmenu',
  'sort-change',
  'filter-change',
  'current-change',
  'header-dragend',
  'expand-change',
  'drag-end',
  'page-size-change',
  'page-current-change',
  'page-next-click',
  'page-prev-click'
] as const;

/**
 * 生成 el-table / 分页 事件转发函数。
 * 注意：`defineEmits` 必须在 DartTable 的 `<script setup>` 顶层调用，不能放在本文件内，否则编译器无法注册 emits。
 */
export default function useDartTableEmit(
  emit: (event: (typeof dartTableEmitOption)[number], ...args: unknown[]) => void
) {
  const forward =
    (event: (typeof dartTableEmitOption)[number]) =>
    (...args: unknown[]) =>
      emit(event, ...args);

  return {
    onSelect: forward('select'),
    onSelectAll: forward('select-all'),
    onSelectionChange: forward('selection-change'),
    onCellMouseEnter: forward('cell-mouse-enter'),
    onCellMouseLeave: forward('cell-mouse-leave'),
    onCellContextmenu: forward('cell-contextmenu'),
    onCellClick: forward('cell-click'),
    onCellDblclick: forward('cell-dblclick'),
    onRowClick: forward('row-click'),
    onRowContextmenu: forward('row-contextmenu'),
    onRowDblclick: forward('row-dblclick'),
    onHeaderClick: forward('header-click'),
    onHeaderContextmenu: forward('header-contextmenu'),
    onSortChange: forward('sort-change'),
    onFilterChange: forward('filter-change'),
    onCurrentChange: forward('current-change'),
    onHeaderDragend: forward('header-dragend'),
    onExpandChange: forward('expand-change'),
    onPageSizeChange: forward('page-size-change'),
    onPageCurrentChange: forward('page-current-change'),
    onPageNextClick: forward('page-next-click'),
    onPagePrevClick: forward('page-prev-click')
  };
}
