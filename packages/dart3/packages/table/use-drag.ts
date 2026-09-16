import { ref, onMounted, onBeforeUnmount, watch, effectScope } from 'vue';
import Sortable from 'sortablejs';
import type { Ref } from 'vue';
import { DRAG_ANIMATION, DRAG_END_DELAY } from './config';

export default function useDrag(params: {
  tableRef: Ref;
  data: Ref<any[]>;
  isDrag: boolean;
  rowKey: any;
  isUseDragHandle: boolean;
  dragHandle: string;
  dragEndCallback: (newIndex: number, oldIndex: number) => void;
}) {
  const dragStart = ref(false);
  let SortableTable: any = null;
  const { tableRef, data, isDrag, rowKey, isUseDragHandle, dragHandle, dragEndCallback } = params;
  const scope = effectScope();

  const rowDrop = (dom: any) => {
    const tbody = dom.$el.querySelector('.el-table__body-wrapper tbody');
    if (SortableTable) {
      SortableTable.destroy();
    }
    SortableTable = Sortable.create(tbody, {
      dragClass: 'drag-dragclass',
      ghostClass: 'drag-ghostclass',
      animation: DRAG_ANIMATION,
      handle: `${isUseDragHandle ? dragHandle : ''}`,
      forceFallback: false,
      fallbackClass: '.drag-dragclass',
      draggable: '.el-table__row', // 允许拖拽的项目类名
      onStart() {
        dragStart.value = true;
      },
      onEnd(parm: any) {
        const currRow = data.value.splice(parm.oldIndex, 1)[0];
        data.value.splice(parm.newIndex, 0, currRow);
        setTimeout(() => {
          dragStart.value = false;
          dragEndCallback && dragEndCallback(parm.newIndex, parm.oldIndex);
        }, DRAG_END_DELAY);
      }
    });
  };

  const dragInit = () => {
    if (isDrag) {
      if (!rowKey) {
        console.warn(`table 拖拽 需要配置rowkey`);
      } else {
        rowDrop(tableRef.value);
      }
    }
  };

  scope.run(() => {
    watch(
      () => data,
      () => {
        dragInit();
      },
      { deep: true }
    );
  });

  onMounted(() => {
    dragInit();
  });

  onBeforeUnmount(() => {
    if (SortableTable) {
      SortableTable.destroy();
    }
    scope.stop();
  });

  return {
    dragStart
  };
}
