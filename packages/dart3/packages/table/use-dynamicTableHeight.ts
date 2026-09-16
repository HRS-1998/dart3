import {
  onMounted,
  onBeforeUnmount,
  ref,
  watch,
  effectScope,
  computed,
} from 'vue';
import type { Ref } from 'vue';
import {
  TABLE_HEADER_HEIGHT,
  PAGINATION_HEIGHT,
  MIN_ITEM_NUM,
  FIXED_HEIGHT,
} from './config';

interface UseDynamicTableHeightParams {
  isPagination: Ref<boolean>;
  pageSize: Ref<number>;
  isDynamicHeight: boolean;
  extraHeight: Ref<number>;
  dataLen: Ref<number>;
  itemHeight: Ref<number>;
}

/** 不依赖全局 `ResizeObserver` 类型名，避免部分构建/校验未带 lib.dom 时报错 */
type ResizeObserverInstance = {
  observe(target: Element): void;
  disconnect(): void;
};
type ResizeObserverCtor = new (
  callback: (
    entries: ReadonlyArray<{ contentRect: { height: number } }>,
  ) => void,
) => ResizeObserverInstance;

export default function useDynamicTableHeight(
  params: UseDynamicTableHeightParams,
) {
  const { isPagination, isDynamicHeight, extraHeight, dataLen, itemHeight } =
    params;
  const isClient =
    typeof window !== 'undefined' && typeof document !== 'undefined';
  const tableHeight = ref<number>(0);
  const MIN_HEIGHT = computed(
    () => itemHeight.value * MIN_ITEM_NUM + TABLE_HEADER_HEIGHT,
  );
  let resizeObserver: ResizeObserverInstance | null = null;
  const scope = effectScope();

  const calculateTableHeight = (containerHeight: number) => {
    const currentPaginationHeight = isPagination.value ? PAGINATION_HEIGHT : 0;
    let contentHeight = Math.max(
      0,
      containerHeight - extraHeight.value - currentPaginationHeight,
    );
    const currentTableHeight =
      itemHeight.value * dataLen.value + TABLE_HEADER_HEIGHT;
    // 如果是分页且当前表格高度小于内容高度，则使用当前表格高度，这里加6将横向滚动条下移，(主要目的)去除el-scroll的移入时竖向滚动。否则使用body剩余的内容高度
    if (currentPaginationHeight && currentTableHeight < contentHeight) {
      return Math.max(MIN_HEIGHT.value, currentTableHeight + FIXED_HEIGHT);
    }
    return Math.max(MIN_HEIGHT.value, contentHeight);
  };

  const recalculateHeight = () => {
    if (!isClient) return;
    const parentElement = document.querySelector('body');
    if (!parentElement) return;
    tableHeight.value = calculateTableHeight(parentElement.clientHeight);
  };

  const initResizeObserver = () => {
    if (!isClient) return;
    const parentElement = document.querySelector('body');

    if (!parentElement) return;

    const ResizeObserverImpl = (globalThis as Record<string, unknown>)[
      'ResizeObserver'
    ] as ResizeObserverCtor | undefined;
    if (!ResizeObserverImpl) return;

    const ro = new ResizeObserverImpl((entries) => {
      const list = entries ?? [];
      for (const entry of list) {
        tableHeight.value = calculateTableHeight(entry.contentRect.height);
      }
    });
    resizeObserver = ro;
    ro.observe(parentElement);
  };

  const destoryResizeObserver = () => {
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
    }
  };

  onMounted(() => {
    if (!isDynamicHeight) return;
    initResizeObserver();
  });

  onBeforeUnmount(() => {
    if (!isDynamicHeight) return;
    destoryResizeObserver();
    scope.stop();
  });

  if (isClient) {
    scope.run(() => {
      watch(
        [isPagination, extraHeight, itemHeight],
        () => {
          recalculateHeight();
        },
        { immediate: true },
      );

      watch(
        dataLen,
        (val) => {
          recalculateHeight();
        },
        { immediate: true },
      );
    });
  }

  return {
    tableHeight,
  };
}
