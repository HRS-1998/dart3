<template>
  <div class="tags-container">
    <el-scrollbar :height="'100%'" always>
      <div class="tag-list" @dragend="handleDragEnd">
        <div class="tag-item" v-for="element in tags" :key="element.id">
          <span
            class="active-line-front"
            v-show="element.id === currentTabId && frontLineShow"
          ></span>

          <el-tag
            type="primary"
            effect="plain"
            class="tag-item-content"
            draggable="true"
            :class="{ selected: isSelected(element) }"
            @dragstart="handleDragStart(element, $event)"
            @click="toggleSelection(element, $event)"
            @dragover="handleDragOver(element, $event)"
          >
            <slot name="default" :item="getRawItem(element)">
              {{ element.label }}
            </slot>
          </el-tag>

          <span
            class="active-line-back"
            v-show="element.id === currentTabId && backLineShow"
          ></span>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script lang="ts">
export interface RawTabType {
  [key: string]: any;
}
export default {
  name: 'DartDragTags',
};
</script>

<script lang="ts" setup>
import { ref, computed, useSlots } from 'vue';
import type { PropType } from 'vue';
import { cloneDeep } from 'lodash-es';
import { useDragPreview } from './hooks/useDragPreview';

interface TabType {
  id: number | string;
  label: string;
}

const props = defineProps({
  modelValue: {
    type: Array as PropType<RawTabType[]>,
    default: () => [],
    required: true,
  },
  propsMap: {
    type: Object as PropType<{
      labelKey: string;
      valueKey: string;
    }>,
    default: () =>
      ({} as {
        labelKey: string;
        valueKey: string;
      }),
  },
});
const emit = defineEmits(['change', 'update:modelValue']);

// 原始数据
// const rawTabs = defineModel<RawTabType[]>({
//   default: () => [],
// });
const rawTabs = computed<RawTabType[]>({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const { valueKey = 'id', labelKey = 'label' } = props.propsMap || {};
// 映射
const tags = computed<TabType[]>({
  get() {
    return rawTabs.value.map((item: any) => ({
      id: item[valueKey],
      label: item[labelKey],
    }));
  },
  set(newValue) {
    const idToRawItem = new Map();
    rawTabs.value.forEach((rawItem) => {
      idToRawItem.set(rawItem[valueKey], rawItem);
    });

    // 更新原始数据，保留其他属性
    rawTabs.value = newValue.map((item) => {
      const rawItem = idToRawItem.get(item.id)
        ? { ...idToRawItem.get(item.id) }
        : {};

      // 更新映射的字段
      rawItem[labelKey] = item.label;
      rawItem[valueKey] = item.id;
      return rawItem;
    });
  },
});

const getRawItem = (tag: TabType) => {
  const rawItem = rawTabs.value.find((item) => item[valueKey] === tag.id);
  return rawItem || {};
};

const selectedTabIds = ref<(number | string)[]>([]);
const targetIndex = ref<number>();
const currentTabId = ref<number | string>();
const frontLineShow = ref<boolean>(false); // 当前鼠标移入元素前边线显示
const backLineShow = ref<boolean>(false); // 当前鼠标移入元素前边线显示
const {
  dragPreview,
  createDragPreview,
  removeDragPreview,
  waitForImagesAndReturnPreview,
} = useDragPreview();

// 计算选中的 tabs（用于拖拽背景显示）
const selectedTabsForDrag = computed(() => {
  return tags.value.filter((tag) => selectedTabIds.value.includes(tag.id));
});

const isSelected = (tag: TabType): boolean => {
  return selectedTabIds.value.includes(tag.id);
};

const findTabIndex = (tabList: TabType[], id: number | string) => {
  return tabList.findIndex((item) => item.id === id);
};

const toggleSelection = (tag: TabType, event: MouseEvent) => {
  const isCtrlPressed = event.ctrlKey || event.metaKey;
  if (isCtrlPressed) {
    const index = selectedTabIds.value.indexOf(tag.id);
    index === -1
      ? selectedTabIds.value.push(tag.id)
      : selectedTabIds.value.splice(index, 1);
    return;
  }
  //取消选中
  if (selectedTabIds.value.length === 1 && selectedTabIds.value[0] === tag.id) {
    selectedTabIds.value = [];
    return;
  }
  selectedTabIds.value = [tag.id];
};

const slots = useSlots();
const handleDragStart = async (tag: TabType, event: DragEvent) => {
  const dataTransfer = event.dataTransfer;
  if (!dataTransfer) return;

  // 如果当前拖拽的项未被选中，清空选择并只选择当前项
  if (!selectedTabIds.value.includes(tag.id)) {
    selectedTabIds.value = [tag.id];
  }
  createDragPreview(selectedTabsForDrag.value, (props) => {
    // 传递父组件的 default slot
    return slots['default'] ? slots['default'](props) : props.item.label;
  });
  // 等待图片加载完成后再设置拖拽图像
  if (dragPreview.value) {
    try {
      // 等待图片加载完成
      const previewElement = await waitForImagesAndReturnPreview();
      if (previewElement && dataTransfer) {
        dataTransfer.setDragImage(previewElement, 0, 0);
      }
    } catch (error) {
      // 如果等待出错，直接使用当前预览元素
      if (dragPreview.value && dataTransfer) {
        dataTransfer.setDragImage(dragPreview.value, 0, 0);
      }
    }
  }
  dataTransfer.effectAllowed = 'move';
};

// 拖拽经过更新显示分隔线
const handleDragOver = (tag: TabType, event: DragEvent) => {
  event.preventDefault();
  const target = (event.currentTarget || event.target) as HTMLElement;
  if (!target) return;
  currentTabId.value = tag.id;
  const index = findTabIndex(tags.value, tag.id);
  const rect = target.getBoundingClientRect();
  const width = rect.width;
  const centerX = width / 2 + rect.left;
  if (event.clientX >= centerX) {
    backLineShow.value = true;
    frontLineShow.value = false;
    targetIndex.value = index + 1;
  } else {
    backLineShow.value = false;
    frontLineShow.value = true;
    targetIndex.value = index;
  }
};

const multiDrag = (data: TabType[]) => {
  const selectedTabs = data.filter((item) => {
    return selectedTabIds.value.includes(item.id);
  });

  const newTabs = selectedTabs.map((item) => {
    return {
      ...item,
      isNew: true,
    };
  });

  // 先插入，多选时如果先删除会出现插入的索引是已删除的元素的位置，会找不到索引
  data.splice(targetIndex.value as number, 0, ...newTabs);

  for (let i = 0; i < selectedTabs.length; i++) {
    const tabIndex = data.findIndex(
      (item: any) => item.id === selectedTabs[i].id && !item.isNew
    );
    data.splice(tabIndex, 1);
  }
  tags.value = data.map((item) => {
    return {
      id: item.id,
      label: item.label,
    };
  });
  setTimeout(() => {
    emit('change', tags.value);
  }, 0);
  initDragParams();
};

const handleDragEnd = () => {
  removeDragPreview();
  const data = cloneDeep(tags.value);
  multiDrag(data);
};

const initDragParams = () => {
  targetIndex.value = undefined;
  currentTabId.value = undefined;
  frontLineShow.value = false;
  backLineShow.value = false;
  selectedTabIds.value = [];
};
initDragParams();
</script>

<style lang="scss" scoped>
.tags-container {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
  min-height: 100px;
  overflow: hidden;
  position: relative;
  --tag-hover-bg: #409eff;
  --tag-selected-bg: #409eff;
  .tag-list {
    display: flex;
    flex-wrap: wrap;
    padding: 15px;
    row-gap: 12px;
    column-gap: 8px;
    box-sizing: border-box;
    cursor: grab;
    .tag-item {
      position: relative;
      height: 32px;
      .tag-item-content {
        display: inline-flex;
        align-items: center;
        height: 100%;
        width: 100%;
        min-width: 60px;
        cursor: grab;
        transition: all 0.2;
        &.selected {
          background: var(--tag-selected-bg);
          color: #fff;
          border: 1px solid #fff;
        }
      }

      .active-line-back {
        position: absolute;
        right: -5px;
        top: 50%;
        transform: translateY(-50%);
        height: 80%;
        width: 2px;
        background-color: #409eff;
      }
      .active-line-front {
        position: absolute;
        left: -5px;
        top: 50%;
        transform: translateY(-50%);
        height: 80%;
        width: 2px;
        background-color: #409eff;
      }
    }
  }
}
</style>
