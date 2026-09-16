<template>
  <el-dialog
    v-model="visible"
    width="40%"
    top="5vh"
    destroy-on-close
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    class="dart-dialog-model setting-column-dialog"
  >
    <template #header>
      <div>
        <span class="title">自定义列</span>
        <span class="content"
          >管理表格展示字段，可调整显示、顺序及固定方式</span
        >
      </div>
    </template>

    <el-table
      :data="columnList"
      row-key="columnKey"
      class="column-table"
      :row-class-name="rowClassName"
    >
      <el-table-column label="显示" width="80" align="center">
        <template #default="{ row }">
          <el-checkbox
            :model-value="columnCheckList.includes(row.label)"
            :disabled="Boolean(row.fixed)"
            @change="(val) => onCheckChange(row, val)"
          />
        </template>
      </el-table-column>
      <el-table-column label="列名">
        <template #default="{ row }">
          <component v-if="!row.label && row.headerSlot" :is="row.headerSlot" />
          <span v-else>{{ row.label }}</span>
        </template>
      </el-table-column>
      <el-table-column label="固定方式" width="180" align="left">
        <template #default="{ row }">
          <el-select
            v-model="row.fixed"
            clearable
            placeholder="请选择"
            style="width: 120px"
            :empty-values="[false]"
            :value-on-clear="false"
          >
            <el-option value="left" label="左固定" />
            <el-option value="right" label="右固定" />
          </el-select>
        </template>
      </el-table-column>
    </el-table>

    <template #footer>
      <div class="setting-column-dialog__footer">
        <el-button @click="onResetDefault">恢复默认</el-button>
        <div class="setting-column-dialog__footer-right">
          <el-button @click="onClose">取消</el-button>
          <el-button type="primary" @click="onSave">保存</el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch, computed, onBeforeUnmount, nextTick } from 'vue';
import Sortable from 'sortablejs';
import { cloneDeep } from 'lodash-es';
import { DRAG_ANIMATION } from './config';

const props = defineProps<{
  modelValue: boolean;
  columnData: any[];
  originalColumnData: any[];
}>();
const emits = defineEmits(['update:modelValue', 'update:columnData']);
const columnList = ref<any[]>([]);
const columnCheckList = ref<string[]>([]);
let SortableColumn: any = null;

const visible = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits('update:modelValue', value);
  },
});

const onSave = () => {
  const _data = columnList.value.filter((item: any) =>
    columnCheckList.value.includes(item.label),
  );

  emits('update:columnData', _data);
  onClose();
};

const onCheckChange = (row: any, val: boolean | string | number) => {
  const checked = Boolean(val);
  if (checked) {
    if (!columnCheckList.value.includes(row.label)) {
      columnCheckList.value.push(row.label);
    }
  } else {
    columnCheckList.value = columnCheckList.value.filter(
      (label) => label !== row.label,
    );
  }
};

const rowClassName = ({ row }: { row: any }) => {
  return row.fixed ? 'no-drag' : '';
};

const onClose = () => {
  emits('update:modelValue', false);
};

/** 恢复默认：用原始列设置重置 columnList 与 columnCheckList */
const onResetDefault = () => {
  columnList.value = cloneDeep(props.originalColumnData).map((item: any) => {
    if (item.type === 'selection') {
      item.label = '复选框';
    }
    return item;
  });
  columnCheckList.value = columnList.value.map((item: any) =>
    item.type === 'selection' ? '复选框' : item.label,
  );
};

// 初始化拖拽
const initSortableColumn = () => {
  const columnGroupEl = document.querySelector(
    '.column-table .el-table__body-wrapper tbody',
  ) as HTMLElement;

  if (SortableColumn) {
    SortableColumn.destroy();
  }
  SortableColumn = Sortable.create(columnGroupEl, {
    dragClass: 'drag-dragclass',
    ghostClass: 'drag-ghostclass',
    animation: DRAG_ANIMATION,
    handle: '',
    forceFallback: false,
    fallbackClass: 'drag-dragclass',
    draggable: '.el-table__row', // el-table 数据行
    filter: '.no-drag',
    onStart() {},
    onEnd(parm: any) {
      const currRow = columnList.value.splice(parm.oldIndex, 1)[0];

      columnList.value.splice(parm.newIndex, 0, currRow);
    },
  });
};

onBeforeUnmount(() => {
  if (SortableColumn) {
    SortableColumn.destroy();
  }
});

watch(
  () => props.modelValue,
  (newVal: any) => {
    if (!newVal) return;
    nextTick(() => {
      initSortableColumn();
    });
  },
);

watch(
  () => props.columnData,
  (newVal: any) => {
    columnCheckList.value = [];
    (newVal || []).forEach((item: any) => {
      if (item.type === 'selection') {
        columnCheckList.value.push('复选框');
      } else {
        columnCheckList.value.push(item.label);
      }
    });
  },
  {
    deep: true,
  },
);

watch(
  () => props.originalColumnData,
  (newVal: any[]) => {
    columnList.value = cloneDeep(newVal).map((item: any) => {
      if (item.type === 'selection') {
        item.label = '复选框';
      }
      return item;
    });
  },
  {
    deep: true,
  },
);
</script>

<style lang="scss">
.setting-column-dialog {
  .title {
    font-size: 16px;
    font-weight: 500;
    margin-right: 15px;
  }
  .content {
    font-size: 14px;
    color: rgba(var(--color-gray-500-rgb), var(--tw-text-opacity));
  }
  .setting-column-dialog__footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-right {
      display: inline-flex;
      /* gap: 12px; */
    }
  }
  .column-table {
    th.el-table__cell {
      background-color: #eff2fa !important;
    }
    .el-table__row {
      cursor: move;
      &:hover > td {
        background-color: #f5f7fa !important;
      }
    }
    // 固定列行不允许拖动
    .el-table__row.no-drag {
      cursor: default;
      td {
        background-color: #f4f5f7 !important;
      }
    }
    .drag-dragclass {
      opacity: 1 !important;
    }
    .drag-ghostclass {
      visibility: hidden !important;
      opacity: 0 !important;
    }
  }
}
</style>
