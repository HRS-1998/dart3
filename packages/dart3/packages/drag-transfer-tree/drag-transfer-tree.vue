<template>
  <div class="cross-table-container" tabindex="0" ref="containerRef">
    <!-- 左侧多选拖拽区域 -->
    <div class="left-panel">
      <left-panel
        :list="mappedLeftList"
        :config="leftConfig"
        :propsMap="propsMap"
        :show-total="showTotal"
        :filterable="filterable"
        :filter-placeholder="filterPlaceholder"
        :filter-method="filterMethod"
        @outhandleDrop="handleLeftDrop"
      >
        <template #panel-header>
          <slot name="left-header"></slot>
        </template>
        <template #default="{ field }">
          <slot name="default" :item="getRawData(field)"></slot>
        </template>
      </left-panel>
    </div>
    <!-- 右侧拖选排序侧区域 -->
    <div class="right-panel">
      <right-panel
        v-model="mappedRightList"
        :config="rightConfig"
        :show-total="showTotal"
        :propsMap="propsMap"
        :filterable="filterable"
        :filter-placeholder="filterPlaceholder"
        :filter-method="filterMethod"
        @remove="remove"
        @outhandleDrop="handleRightDrop"
      >
        <template #panel-header>
          <slot name="right-header"></slot>
        </template>
        <template #default="{ field }">
          <slot name="default" :item="getRawData(field)"></slot>
        </template>
      </right-panel>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DartDragTransferTree',
};
</script>
<script lang="ts" setup>
import { computed, ref, watch, inject } from 'vue';
import type { PropType } from 'vue';
import { formItemContextKey } from 'element-plus';
import { cloneDeep } from 'lodash-es';
import LeftPanel from './left.vue';
import RightPanel from './right.vue';
import type {
  PropsMapType,
  RightPanelConfig,
  LeftPanelConfig,
} from './types/index';
type RawItem = Record<string, any>;

const props = defineProps({
  modelValue: {
    type: Array as PropType<RawItem[]>,
    default: () => [],
    required: true,
  },
  data: {
    type: Array as PropType<RawItem[]>,
    default: () => [],
    required: true,
  },
  propsMap: {
    type: Object as PropType<PropsMapType>,
    default: () => ({} as PropsMapType),
  },
  showTotal: {
    type: Boolean,
    default: true,
  },
  filterable: {
    type: Boolean,
    default: true,
  },
  filterPlaceholder: {
    type: String as PropType<string>,
    default: '请输入',
  },
  filterMethod: {
    type: Function,
  },
  leftConfig: {
    type: Object as PropType<LeftPanelConfig>,
    default: () => ({} as LeftPanelConfig),
  },
  rightConfig: {
    type: Object as PropType<RightPanelConfig>,
    default: () => ({} as RightPanelConfig),
    required: true,
  },
});
const containerRef = ref<HTMLElement | null>(null);
const emit = defineEmits(['change', 'update:modelValue']);

// 获取表单上下文
const elFormItem = inject(formItemContextKey);

// 获取配置的字段映射，提供默认值
const {
  label = 'label',
  value = 'id',
  disabled = 'disabled',
} = props.propsMap || {};

// 原始的列表数据
const rawLeftList = ref<RawItem[]>([]);
// const rawRightList = defineModel<RawItem[]>({
//   default: () => [],
// });

const rawRightList = computed<RawItem[]>({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

// 映射后的列表数据
type DragItem = {
  id: string | number;
  label: string;
  disabled?: boolean;
};

const mappedLeftList = computed<DragItem[]>(() => {
  if (!rawLeftList.value) return [];
  return rawLeftList.value.map((item) => ({
    id: item[value],
    label: item[label],
    disabled: item[disabled] !== undefined ? item[disabled] : true,
  }));
});

// 字段映射后的列表
const mappedRightList = computed<DragItem[]>({
  get: () => {
    return rawRightList.value.map((item) => ({
      id: item[value],
      label: item[label],
      disabled: item[disabled] !== undefined ? item[disabled] : true,
    }));
  },
  set: (data) => {
    // 将映射后的数据转换回原始格式
    rawRightList.value = data.map((item) => {
      // 查找原始数据中对应的项，保留所有字段
      const originalItem = rawRightList.value.find(
        (rawItem: RawItem) => rawItem[value] === item.id
      );
      const result: RawItem = originalItem ? { ...originalItem } : {};

      // 更新映射的字段
      result[value] = item.id;
      result[label] = item.label;
      result[disabled] = item.disabled;

      return result;
    });
  },
});

const getDiffList = (leftList: DragItem[], rightList: DragItem[]) => {
  const rightIds = new Set(rightList.map((item) => item.id));
  return leftList.filter((item) => !rightIds.has(item.id));
};

// 放置左侧拖动过来的元素到右侧指定index位置
const handleRightDrop = (object?: { list: DragItem[]; index: number }) => {
  if (object) {
    // 过滤出不在右侧列中的元素，插入右侧列
    const result = getDiffList(object.list, mappedRightList.value);
    if (!result.length) return;

    // 将映射后的数据转换回原始格式并更新
    const newItems = result.map((item) => {
      // 查找原始数据中对应的项，保留所有字段
      const originalItem = rawLeftList.value.find(
        (rawItem: RawItem) => rawItem[value] === item.id
      );
      const result: RawItem = originalItem ? { ...originalItem } : {};

      // 更新映射的字段
      result[value] = item.id;
      result[label] = item.label;
      result[disabled] = item.disabled;

      return result;
    });

    const newRightList = [...rawRightList.value];
    newRightList.splice(object.index, 0, ...newItems);
    rawRightList.value = newRightList;

    // 删除左侧已拖动的元素
    const diffIds = result.map((item) => item.id);
    rawLeftList.value = rawLeftList.value.filter((item) => {
      const id = item[value];
      return !diffIds.includes(id);
    });
  }
};
const handleLeftDrop = (object?: { list: DragItem[]; index: number }) => {
  if (object) {
    // 将映射后的数据转换回原始格式并过滤
    const objectIds = object.list.map((item) => item.id);
    rawRightList.value = rawRightList.value.filter((item) => {
      const id = item[value];
      return !objectIds.includes(id);
    });

    // 将映射后的数据转换回原始格式并插入
    const newItems = object.list.map((item) => {
      // 查找原始数据中对应的项，保留所有字段
      const originalItem = rawRightList.value.find(
        (rawItem: RawItem) => rawItem[value] === item.id
      );
      const result: RawItem = originalItem ? { ...originalItem } : {};

      // 更新映射的字段
      result[value] = item.id;
      result[label] = item.label;
      result[disabled] = item.disabled;

      return result;
    });

    // 创建新数组以确保响应性
    const newLeftList = [...rawLeftList.value];
    newLeftList.splice(object.index, 0, ...newItems);
    rawLeftList.value = newLeftList;
  }
};

// 移除时更新数据
const remove = (field: DragItem) => {
  // 查找原始数据中对应的项
  const rawItemIndex = rawRightList.value.findIndex(
    (item) => item[value] === field.id
  );
  if (rawItemIndex !== -1) {
    const rawItem = { ...rawRightList.value[rawItemIndex] };
    // 从右侧列表中移除
    const newRightList = [...rawRightList.value];
    newRightList.splice(rawItemIndex, 1);
    rawRightList.value = newRightList;

    // 添加回左侧列表
    const leftItemIndex = rawLeftList.value.findIndex(
      (item) => item[value] === field.id
    );
    if (leftItemIndex === -1) {
      const newLeftList = [...rawLeftList.value];
      newLeftList.push(rawItem);
      rawLeftList.value = newLeftList;
    } else {
      // 如果已存在，更新canChoose状态,这个对应第一种情况
      const newLeftList = [...rawLeftList.value];
      newLeftList[leftItemIndex][disabled] = true;
      rawLeftList.value = newLeftList;
    }
  }
};

// 还原传入的数据格式
const getRawData = (field: Partial<DragItem>): RawItem => {
  return {
    [value]: field.id ?? '',
    [label]: field.label ?? '',
    [disabled]: field.disabled !== undefined ? field.disabled : true,
  };
};

// 监听 props.data 的变化，同步更新 leftListRef
watch(
  () => props.data,
  (newVal) => {
    rawLeftList.value = cloneDeep(newVal);
  },
  { immediate: true }
);

// 监听右侧列表变化，触发表单校验
watch(
  () => rawRightList.value,
  (newVal) => {
    // 触发表单校验
    setTimeout(() => {
      elFormItem?.validate?.('change');
      // 触发 change 事件
      emit('change', cloneDeep(newVal));
    }, 10);
  },
  { deep: true }
);
</script>
<style scoped lang="scss">
.cross-table-container {
  display: flex;
  width: 650px;
  justify-content: center;
  align-items: center;
  .left-panel {
    flex: 1;
    height: 100%;
    width: 324px;
    border: 1px solid #ddd;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    box-sizing: border-box;
  }
  .right-panel {
    flex: 1;
    height: 100%;
    width: 324px;
    border: 1px solid #ddd;
    border-left: none;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    box-sizing: border-box;
  }
}
.el-form-item.is-error {
  .cross-table-container {
    border: 1px solid #ff4949;
  }
}
</style>
<style lang="scss">
.el-form-item.is-error {
  .el-input__wrapper {
    box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color))
      inset;
  }
}
</style>
