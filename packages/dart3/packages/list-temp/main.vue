<template>
  <div v-if="isFoot && addButtonPlacement === 'top'">
    <div class="dart-list-temp-top">
      <el-tooltip
        v-if="isAdd"
        class="item"
        effect="dark"
        content="已到最大数量"
        placement="top-start"
        :disabled="!isMax"
      >
        <span>
          <el-button
            :icon="addButtonIcon"
            @click="handleAdd"
            :disabled="isMax"
            :type="addButtonType"
          >
            {{ addButtonText }}
          </el-button>
        </span>
      </el-tooltip>
    </div>
  </div>
  <div
    :class="[
      'dart-list-temp',
      { 'dart-list-temp-fix-style': isFoot && addButtonPlacement === 'top' },
    ]"
  >
    <div v-show="isMainHide">
      <el-form :model="source" ref="dltForm">
        <el-table
          :data="source.data"
          :border="isBorder"
          :row-key="columnKey"
          :height="height"
          :maxHeight="maxHeight"
          :class="{
            'dart-list-use-handle': isUseDragHandle,
            'dart-list-sort': isDrag,
            'dart-list-sort--start': dragStart,
          }"
          size="large"
          ref="dartListTable"
        >
          <el-table-column v-if="isDrag" width="30">
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
          <el-table-column label="序号" width="50" v-if="isNo">
            <template v-slot="scope">
              <el-form-item>
                {{ scope.$index + 1 }}
              </el-form-item>
            </template>
          </el-table-column>

          <slot></slot>
          <el-table-column
            label="操作"
            :width="operationWidth"
            v-if="isOperation"
            fixed="right"
          >
            <template v-slot="scope">
              <el-form-item>
                <el-button
                  v-if="isDel"
                  icon="Close"
                  :disabled="scope.row.disabledDel"
                  @click="handleDel(scope.$index)"
                  circle
                ></el-button>
                <el-button
                  v-if="isCopy"
                  icon="CopyDocument"
                  @click="handleCopy(scope.$index)"
                  circle
                  :disabled="isMax || scope.row.disabledCopy"
                  title="复制"
                ></el-button>
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </div>
    <div v-if="isFoot && addButtonPlacement === 'bottom'">
      <div class="dart-list-temp-foot">
        <el-tooltip
          v-if="isAdd"
          class="item"
          effect="dark"
          content="已到最大数量"
          placement="top-start"
          :disabled="!isMax"
        >
          <span>
            <el-button
              :icon="addButtonIcon"
              @click="handleAdd"
              :disabled="isMax"
              :type="addButtonType"
            >
              {{ addButtonText }}
            </el-button>
          </span>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Utils from '../utils';
import Sortable from 'sortablejs';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'dartListTemp',
  provide() {
    return {
      ctListTemp: this,
    };
  },
  props: {
    modelValue: {
      type: Array,
      default: () => {
        return [];
      },
    },
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    beforeDelete: Function,
    defaultData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    isValidate: {
      type: Boolean,
      default: true,
    },
    addButtonText: { type: String, default: '新增' },
    addButtonType: String,
    addButtonIcon: { type: String, default: 'Plus' },
    addButtonPlacement: { type: String, default: 'bottom' },
    emptyText: String,
    max: Number,
    height: [String, Number],
    maxHeight: [String, Number],
    isBorder: Boolean,
    isNo: Boolean,
    isDrag: Boolean,
    isUseDragHandle: Boolean,
    dragHandle: { type: String, default: '.dart-icon' },
    isOperation: {
      type: Boolean,
      default: true,
    },
    operationWidth: {
      type: Number,
      default: 110,
    },
    emptyHide: Boolean,
    isAdd: {
      type: Boolean,
      default: true,
    },
    isCopy: {
      type: Boolean,
      default: false,
    },
    isDel: {
      type: Boolean,
      default: true,
    },
    isFoot: {
      type: Boolean,
      default: true,
    },
    rules: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      source: {
        data: [],
      },
      dragStart: false,
      hasValidate: false,
      columnKey: 'DLTKEY',
      SortableTbale: null,
    };
  },
  methods: {
    rowDrop(dom: any) {
      if (!dom) {
        return;
      }

      const tbody = dom.$el.querySelector('.el-table__body-wrapper tbody');
      const tableData = this.source.data;
      const _this = this as any;
      if (this.SortableTbale) {
        (this as any).SortableTbale.destroy();
      }
      (this as any).SortableTbale = Sortable.create(tbody, {
        dragClass: 'drag-dragclass',
        ghostClass: 'drag-ghostclass',
        animation: 300,
        forceFallback: false,
        handle: `${this.isUseDragHandle ? this.dragHandle : ''}`,
        draggable: '.el-table__row', // 允许拖拽的项目类名
        onStart() {
          _this.dragStart = true;
        },
        onEnd(item: any) {
          const currRow = tableData.splice(item.oldIndex, 1)[0];
          tableData.splice(item.newIndex, 0, currRow);
          setTimeout(() => {
            _this.dragStart = false;
          }, 200);
        },
      });
    },
    //获取唯一码
    getGguid() {
      return Number(
        Math.random().toString().substr(3, 3) + Date.now(),
      ).toString(36);
    },
    deepCopy(value: any) {
      return JSON.parse(JSON.stringify(value));
    },
    handleAdd() {
      this.hasValidate = true;
      const newItem: any = this.deepCopy(this.defaultData);
      newItem[this.columnKey] = this.getGguid();
      (this.source.data as Array<any>).push(newItem);
      this.$emit('add', newItem);
    },
    async handleDel(index: number) {
      const currItem = this.source.data[index];
      let closeResult = true;
      if (this.beforeDelete) {
        closeResult = await this.beforeDelete(currItem, index);
      }

      if (!closeResult) {
        return;
      }
      const item = this.source.data.splice(index, 1);
      this.hasValidate = true;

      this.$emit('delete', item);
    },
    handleCopy(index: number) {
      this.hasValidate = true;
      const newItem = this.deepCopy(this.source.data[index]);
      newItem[this.columnKey] = this.getGguid();
      (this.source.data as Array<any>).splice(index + 1, 0, newItem);
    },
    emitChange() {
      const value = this.getClearKeyValue();
      this.$emit('update:modelValue', value);

      this.$emit('change', value);
      this.$emit('dataChange', value);
    },
    emitDispatch() {
      this.$emit('dispatch');
    },
    validate() {
      return new Promise((resolve, reject) => {
        if (this.isValidate) {
          (this as any).$refs.dltForm.validate((valid: boolean) => {
            if (valid) {
              resolve(valid);
            } else {
              reject(valid);
            }
          });
        } else {
          resolve(true);
        }
      });
    },
    clearValidate(prop: any) {
      (this as any).$refs.dltForm.clearValidate(prop);
    },
    resetFields(props: any, callback: any) {
      (this as any).$refs.dltForm.resetFields(props, callback);
    },
    validateField() {
      (this as any).$refs.dltForm.validateField();
    },
    getClearKeyValue() {
      const items = this.deepCopy(this.source.data);
      return items.map((item: any) => {
        delete item[this.columnKey];
        return item;
      });
    },
    dragInit() {
      if (this.isDrag) {
        this.rowDrop((this as any).$refs.dartListTable);
      }
    },
  },
  mounted() {
    this.dragInit();
  },
  computed: {
    isMax() {
      return this.max ? this.source.data.length >= this.max : false;
    },
    isMainHide() {
      if (this.emptyHide) {
        return this.source.data.length > 0;
      }
      return true;
    },
  },
  watch: {
    'source.data': {
      deep: true,
      handler() {
        this.emitChange();
        this.emitDispatch();
        this.hasValidate = false;
        this.dragInit();
      },
    },
    modelValue: {
      immediate: true,
      deep: true,
      handler(val: any) {
        //console.log(val);
        if (Utils.isEquals(val, this.getClearKeyValue())) {
          return;
        }
        const data = JSON.parse(JSON.stringify(val));
        this.source.data = data.map((item: any) => {
          item[this.columnKey] = this.getGguid();
          return item;
        });
      },
    },
    data: {
      immediate: true,
      deep: true,
      handler(val: any) {
        if (this.modelValue && this.modelValue.length) {
          return;
        }
        const data = JSON.parse(JSON.stringify(val));
        this.source.data = data.map((item: any) => {
          item[this.columnKey] = this.getGguid();
          return item;
        });
      },
    },
  },
});
</script>
<style lang="scss">
.dart-list-temp-top {
  margin-bottom: 8px;
}
.dart-list-temp-foot {
  padding: 7px;
}
.el-form-item.is-error .dart-list-temp {
  border-color: #f56c6c;
  .el-input__wrapper,
  .el-select__wrapper,
  .el-textarea__inner {
    box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color))
      inset;
  }
}
.dart-list-temp .el-form-item.is-error {
  .el-input__wrapper,
  .el-select__wrapper,
  .el-textarea__inner {
    box-shadow: 0 0 0 1px var(--el-color-danger) inset;
  }
}
.dart-list-temp {
  border: 1px solid #ebeef5;
  margin-bottom: 5px;
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
  .cell {
    height: auto !important;
  }
  .el-form-item {
    margin: 14px 0;
  }
  .el-form-item__content {
    color: var(--el-table-text-color) !important;
  }
  .el-table .el-table__cell {
    padding: 0 !important;
  }
  .el-form-item__error {
    padding-top: 0 !important;
  }
  .el-table__header {
    .cell {
      padding: 12.5px !important;
    }
  }
  .dart-list-use-handle {
    .el-table__row {
      cursor: default !important;
    }
  }
  .dart-list-sort {
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
      margin-left: 2px;
      cursor: grab;
      &:active {
        cursor: grabbing;
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
}
// 当按钮在上方时样式修复
.dart-list-temp-fix-style {
  border: 1px solid #ebeef5;
  border-bottom: none;
  .el-table__empty-block {
    border-bottom: 1px solid #ebeef5 !important;
  }
  .el-table__inner-wrapper:before {
    height: 0 !important;
  }
}
</style>
