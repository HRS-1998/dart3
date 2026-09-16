import { ref, onMounted, useSlots, watch, nextTick, Comment, Fragment } from 'vue';
import type { Ref, VNode, VNodeChild } from 'vue';
import { cloneDeep } from 'lodash-es';
import {
  COLUMN_SETTING_ICON_WIDTH as ICON_WIDTH,
  TABLE_HEADER_HEIGHT,
} from './config';

/** 展开 Fragment，跳过 v-if 为 false 时的 Comment 等，避免 columnSet 下仍收集到已隐藏的列 */
function normalizeColumnVnodes(input: VNodeChild | VNodeChild[]): VNode[] {
  const list = Array.isArray(input) ? input : input == null ? [] : [input as VNode];
  const out: VNode[] = [];
  for (const n of list) {
    if (n == null || typeof n === 'boolean') continue;
    if (typeof n === 'string' || typeof n === 'number') continue;
    const v = n as VNode;
    if (v.type === Comment) continue;
    if (v.type === Fragment) {
      const ch = v.children;
      if (ch != null) {
        out.push(...normalizeColumnVnodes(ch as VNodeChild | VNodeChild[]));
      }
      continue;
    }
    out.push(v);
  }
  return out;
}

export default function useSettingColumn(params: {
  tableRef: Ref;
  columnSet: boolean;
  tableHeight?: Ref<number> /** 动态高度变化时表头可能重绘，需重新挂载列配置入口 */;
}): any {
  const { tableRef, columnSet, tableHeight } = params;
  /** 须在 setup 同步获取，勿在 onMounted 内再调用 useSlots */
  const slots = useSlots();
  const drawerVisiable = ref(false);
  const columnData = ref<any[]>([]);
  const originalColumnData = ref<any[]>([]); // 原始列数据
  /**
   * column-set=false 时初始渲染走默认插槽；
   * 外部通过 openColumnSet 打开弹窗并保存后，切换为 columnData 驱动渲染，保存结果才能生效
   */
  const columnDataApplied = ref(false);

  const columnSetBtn = () => {
    const create = () => {
      const iconContainer = document.createElement('div');

      iconContainer.className = 'dart-table-column-setting';
      iconContainer.innerHTML = `
          <svg t="1758248742874" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1489" width="15" height="15"><path d="M899.2 379.2a439.68 439.68 0 0 0-19.52-47.04 137.28 137.28 0 0 0-187.84-187.84 439.68 439.68 0 0 0-47.04-19.52 137.28 137.28 0 0 0-265.6 0 439.68 439.68 0 0 0-47.04 19.52 137.28 137.28 0 0 0-187.84 187.84 439.68 439.68 0 0 0-19.52 47.04 137.28 137.28 0 0 0 0 265.6 439.68 439.68 0 0 0 19.52 47.04 137.28 137.28 0 0 0 187.84 187.84 439.68 439.68 0 0 0 47.04 19.52 137.28 137.28 0 0 0 265.6 0 439.68 439.68 0 0 0 47.04-19.52 137.28 137.28 0 0 0 187.84-187.84 439.68 439.68 0 0 0 19.52-47.04 137.28 137.28 0 0 0 0-265.6z m-33.6 186.88a41.6 41.6 0 0 0-38.72 32 314.24 314.24 0 0 1-32 77.76 41.92 41.92 0 0 0 5.12 48A54.08 54.08 0 0 1 723.84 800a41.92 41.92 0 0 0-49.28-5.76 314.24 314.24 0 0 1-77.76 32 41.6 41.6 0 0 0-32 38.72 54.08 54.08 0 0 1-108.16 0 41.6 41.6 0 0 0-32-38.72 314.24 314.24 0 0 1-77.76-32 43.84 43.84 0 0 0-20.8-5.44 42.24 42.24 0 0 0-28.48 11.2A54.08 54.08 0 0 1 224 723.84a41.92 41.92 0 0 0 5.76-49.28 314.24 314.24 0 0 1-32-77.76 41.6 41.6 0 0 0-38.72-32 54.08 54.08 0 0 1 0-108.16 41.6 41.6 0 0 0 38.72-32 314.24 314.24 0 0 1 32-77.76A41.92 41.92 0 0 0 224 300.16 54.08 54.08 0 0 1 300.16 224a41.92 41.92 0 0 0 49.28 5.76 314.24 314.24 0 0 1 77.76-32 41.6 41.6 0 0 0 32-38.72 54.08 54.08 0 0 1 108.16 0 41.6 41.6 0 0 0 32 38.72 314.24 314.24 0 0 1 77.76 32A41.92 41.92 0 0 0 723.84 224 54.08 54.08 0 0 1 800 300.16a41.92 41.92 0 0 0-5.76 49.28 314.24 314.24 0 0 1 32 77.76 41.6 41.6 0 0 0 38.72 32 54.08 54.08 0 0 1 0 108.16z" p-id="1490" fill="#707070"></path><path d="M512 310.4a201.6 201.6 0 1 0 201.6 201.6A201.92 201.92 0 0 0 512 310.4z m0 320a118.4 118.4 0 1 1 118.4-118.4 118.4 118.4 0 0 1-118.4 118.4z" p-id="1491" fill="#707070"></path></svg>
          `;

      iconContainer.addEventListener('click', () => {
        drawerVisiable.value = true;
      });

      return iconContainer;
    };

    const remove = () => {
      const tableEl = tableRef.value.$el;
      const columnSetBtn = tableEl.querySelector('.dart-table-column-setting');

      columnSetBtn && columnSetBtn.remove();
    };

    return { create, remove };
  };

  // 添加列设置入口（悬浮在表头右侧，挂载到 .el-table 避免横向滚动时跟随移动）
  const modifyLastSlotElement = () => {
    const tableEl = tableRef.value.$el;

    requestAnimationFrame(() => {
      // 清理上次的图标和 padding 标记
      columnSetBtn().remove();
      tableEl.querySelectorAll('.dart-table-column-setting-pad').forEach((el) => {
        (el as HTMLElement).style.paddingRight = '';
        el.classList.remove('dart-table-column-setting-pad');
      });

      const iconContainer = columnSetBtn().create();

      // 表头实际渲染高度在 Element Plus 内部列宽修正前会偏高（如 71px），
      // 直接测量不可靠，使用与动态高度计算一致的标准表头高度常量。
      iconContainer.style.height = `${TABLE_HEADER_HEIGHT}px`;

      tableEl.appendChild(iconContainer);

      const headerWrapper = tableEl.querySelector('.el-table__header-wrapper');

      // 给最后一列表头 cell 加右 padding，防止文字被悬浮图标遮挡
      const padLastCell = (row: Element | null) => {
        if (!row) return;
        const ths = Array.from(row.children).filter(
          (child: any) => !child.classList.contains('dart-table-drag')
        );
        if (!ths.length) return;
        const cell = ths[ths.length - 1].querySelector('.cell');
        if (cell) {
          (cell as HTMLElement).style.paddingRight = `${ICON_WIDTH}px`;
          cell.classList.add('dart-table-column-setting-pad');
        }
      };

      // 右侧固定列优先（图标覆盖在固定列区域上方）
      const fixedRight = tableEl.querySelector('.el-table__fixed-right');
      if (fixedRight) {
        const fixedRow =
          fixedRight.querySelector('.el-table__fixed-header-wrapper tr') ||
          fixedRight.querySelector('tr');
        padLastCell(fixedRow);
      } else {
        padLastCell(headerWrapper?.querySelector('tr') || null);
      }
    });
  };

  // 初始化原始列数据
  const initColumnData = () => {
    const defaultFn = slots.default;
    if (!defaultFn) return;

    const defaultSlot = normalizeColumnVnodes(defaultFn());
    const next: any[] = [];

    defaultSlot.forEach((item) => {
      next.push({
        ...item.props,
        slot: (item.children as any)?.default,
        headerSlot: (item.children as any)?.header,
        columnKey: String(Math.random()),
        fixed: getColumnFixedState(item.props?.fixed)
      });
    });

    columnData.value = next;
    originalColumnData.value = cloneDeep(columnData.value);
  };

  const getColumnFixedState = (val: string | boolean) => {
    if (typeof val === 'string' && val) return val;
    if ((typeof val === 'string' && !val) || (typeof val === 'boolean' && val)) return 'left';
    return false;
  };

  // 更新列数据
  const updateColumnData = (value: any[]) => {
    columnData.value = value.map((item: any) => {
      return {
        ...item,
        columnKey: String(Math.random()) // 更新columnKey
      };
    });
    columnDataApplied.value = true;

    // 表头悬浮图标仅在 columnSet=true 时维护
    if (columnSet) {
      modifyLastSlotElement();
    }
  };

  onMounted(() => {
    // 列数据始终初始化，外部按钮打开弹窗也需要它
    initColumnData();
    // 表头悬浮图标仅在 columnSet=true 时挂载
    if (!columnSet) return;
    modifyLastSlotElement();
  });

  if (columnSet && tableHeight) {
    watch(tableHeight, () => {
      if (!tableRef.value) return;
      nextTick(() => modifyLastSlotElement());
    });
  }

  return {
    drawerVisiable,
    columnData,
    originalColumnData,
    updateColumnData,
    columnDataApplied
  };
}
