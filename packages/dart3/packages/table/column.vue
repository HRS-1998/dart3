<template>
  <el-table-column
    ref="dom"
    :type="type"
    :index="index"
    :label="label"
    :columnKey="columnKey"
    :prop="prop"
    :width="width"
    :minWidth="minWidth"
    :fixed="fixed"
    :renderHeader="renderHeader"
    :sortable="sortable"
    :sortMethod="sortMethod"
    :sortBy="sortBy"
    :sortOrders="sortOrders"
    :resizable="resizable"
    :formatter="useType ? onFormatter : formatter"
    :showOverflowTooltip="columnShowOverflowTooltip"
    :align="align"
    :headerAlign="headerAlign"
    :className="className"
    :labelClassName="labelClassName"
    :selectable="selectable"
    :reserveSelection="reserveSelection"
    :filters="filters"
    :filterPlacement="filterPlacement"
    :filterMultiple="filterMultiple"
    :filterMethod="filterMethod"
    :filteredValue="filteredValue"
  >
    <template #default="scope">
      <slot
        v-if="slots.default"
        name="default"
        :row="scope.row"
        :$index="scope.$index"
      ></slot>
      <div
        class="cell dart-table-column-tooltip"
        :class="{ 'dart-table-column-tooltip--copy-fixed': copyFixed }"
        @mouseenter="onCellMouseEnter($event, scope.$index)"
        @mouseleave="onCopyCellMouseLeave"
        v-if="
          !slots.default &&
          useType !== 'multitags' &&
          useType !== 'multirows' &&
          useType !== 'multidatetime' &&
          isCopy &&
          showOverflowTooltip
        "
      >
        <template
          v-if="
            textOverflowByRow[scope.$index] &&
            (copyFixed || (copyState && scope.$index === columnIndex))
          "
        >
          <el-tooltip
            content="复制"
            effect="light"
            placement="top-start"
            popper-class="dart-table-column-tooltip-popper"
          >
            <span
              class="dart-table-column-copy-wrap"
              @mouseenter.stop
              @click.stop
            >
              <el-icon
                size="16"
                class="dart-table-column-copy"
                @click="onCopy(getCellDisplayText(scope))"
              >
                <CopyDocument />
              </el-icon>
            </span>
          </el-tooltip>
        </template>
        <el-tooltip
          placement="top"
          :content="getCellDisplayText(scope)"
          :disabled="!textOverflowByRow[scope.$index]"
          popper-class="dart-table-column-tooltip-popper"
        >
          <span
            class="dart-table-column-tooltip-text"
            :ref="(el) => bindCopyTextOverflow(el, scope.$index)"
            >{{ getCellDisplayText(scope) }}</span
          >
        </el-tooltip>
      </div>
      <Multitags
        v-if="!slots.default && useType === 'multitags'"
        :value="getMultitagsValue(scope.row)"
      />
      <Multirows
        v-if="!slots.default && useType === 'multirows'"
        :name="getMultirowsField(scope.row, 0)"
        :id="getMultirowsField(scope.row, 1)"
        :code="getMultirowsField(scope.row, 2)"
      />
      <Multirows
        v-if="!slots.default && useType === 'multidatetime'"
        v-bind="getMultidatetimeParts(scope.row)"
      />
    </template>
    <template #header>
      <slot v-if="slots.header" name="header"></slot>
      <span style="word-break: break-all" v-else>{{ label }} </span>
    </template>
  </el-table-column>
</template>
<script lang="ts">
export default {
  name: 'DartTableColumn',
};
</script>
<script lang="ts" setup>
import {
  ref,
  reactive,
  computed,
  useSlots,
  inject,
  getCurrentInstance,
  nextTick,
  onBeforeUnmount,
} from 'vue';
import type { ComponentInternalInstance, ComponentPublicInstance } from 'vue';
import { round } from 'lodash-es';
import dayjs from 'dayjs';
import { TABLE_INJECTION_KEY } from 'element-plus/es/components/table/src/tokens';
import Multitags from '../multitags/multitags.vue';
import Multirows from '../multirows/multirows.vue';
import { showMessage } from '../utils';

type TableLikeInstance = ComponentInternalInstance & {
  tableId?: unknown;
  store?: unknown;
  layout?: unknown;
};

/**
 * 内层 ElTableColumn（render-helper）用 `instance.parent.store` 判断树表 → 中间多一层 DartTableColumn 时须在 Dart 列实例上挂 `store`。
 * 仅靠 inject(TABLE_INJECTION_KEY) 在「应用与组件库各打一份 element-plus」时会因 Symbol 不是同一个而失败；沿 parent 找 ElTable 内部实例可拿到同一份 store。
 */
function patchDartColumnStore(dart: TableLikeInstance | null) {
  if (!dart) return;
  let p: ComponentInternalInstance | null | undefined = dart.parent;
  while (p) {
    const t = p as TableLikeInstance;
    if (t.tableId != null && t.store != null && t.layout != null) {
      dart.store = t.store;
      return;
    }
    p = p.parent;
  }
}

const dartInst = getCurrentInstance() as TableLikeInstance | null;
patchDartColumnStore(dartInst);
const elTableUi = inject(TABLE_INJECTION_KEY, undefined) as
  | TableLikeInstance
  | undefined;
if (dartInst && dartInst.store == null && elTableUi?.store != null) {
  dartInst.store = elTableUi.store;
}

const slots: any = useSlots() || {};
const props = defineProps({
  type: String,
  index: [Number, Function],
  label: String,
  columnKey: String,
  prop: String,
  width: [Number, String],
  minWidth: [Number, String],
  fixed: [String, Boolean],
  renderHeader: Function,
  sortable: [String, Boolean],
  sortMethod: Function,
  sortBy: [Function, String, Array],
  sortOrders: Array,
  resizable: { type: Boolean, default: true },
  formatter: Function,
  showOverflowTooltip: Boolean,
  align: { type: String, default: 'left' },
  headerAlign: String,
  className: String,
  labelClassName: String,
  selectable: Function,
  reserveSelection: Boolean,
  filters: Array,
  filterPlacement: String,
  filterMultiple: { type: Boolean, default: true },
  filterMethod: Function,
  filteredValue: Array,
  isCopy: Boolean,
  /** 为 true 时在文本溢出（省略号）前提下复制图标常显在左侧；为 false 时仅悬停当前行且溢出时显示 */
  copyFixed: { type: Boolean, default: true },
  useType: { type: String, default: '' },
  useArg: { type: [Number, String, Array], default: '' },
});
const copyState = ref(false); // 复制按钮状态（非 copyFixed 时仅悬停行）
/** -1 表示未悬停 copy 单元格；勿用 0，否则会与第 0 行 $index 误判为同一行 */
const columnIndex = ref(-1);

function onCopyCellMouseLeave() {
  if (props.copyFixed) return;
  copyState.value = false;
  columnIndex.value = -1;
}
/** isCopy 列关闭表格 td 级溢出 tooltip，改由仅包裹文字的 el-tooltip 实现 */
const columnShowOverflowTooltip = computed(
  () => !!(props.showOverflowTooltip && !props.isCopy),
);
const textOverflowByRow = reactive<Record<number, boolean>>({});

const overflowMeasureByIndex = new Map<
  number,
  { ro: ResizeObserver; mo: MutationObserver }
>();

function isGreaterThanDelta(a: number, b: number, epsilon = 0.03) {
  return a - b > epsilon;
}

function getElementPadding(el: HTMLElement) {
  const style = window.getComputedStyle(el, null);
  return {
    left: Number.parseInt(style.paddingLeft, 10) || 0,
    right: Number.parseInt(style.paddingRight, 10) || 0,
    top: Number.parseInt(style.paddingTop, 10) || 0,
    bottom: Number.parseInt(style.paddingBottom, 10) || 0,
  };
}

/** 与单元格省略号一致：全文尺寸相对可见区域是否溢出 */
function computeTextOverflow(cellChild: HTMLElement): boolean {
  if (!cellChild?.childNodes.length) return false;
  const range = document.createRange();
  range.setStart(cellChild, 0);
  range.setEnd(cellChild, cellChild.childNodes.length);

  const { width: rangeWidth, height: rangeHeight } =
    range.getBoundingClientRect();
  const { width: cellChildWidth, height: cellChildHeight } =
    cellChild.getBoundingClientRect();
  const { top, left, right, bottom } = getElementPadding(cellChild);
  const horizontalPadding = left + right;
  const verticalPadding = top + bottom;

  return (
    isGreaterThanDelta(rangeWidth + horizontalPadding, cellChildWidth) ||
    isGreaterThanDelta(rangeHeight + verticalPadding, cellChildHeight) ||
    isGreaterThanDelta(cellChild.scrollWidth, cellChildWidth)
  );
}

function runTextOverflowMeasure(el: HTMLElement, index: number) {
  nextTick(() => {
    if (!el.isConnected) return;
    const overflow = computeTextOverflow(el);
    textOverflowByRow[index] = overflow;
    // 仅在当前仍悬停于该行时同步（columnIndex 离开后会被置为 -1，避免未悬停时 Resize 把 copyState 拉回 true）
    if (!props.copyFixed && columnIndex.value === index) {
      copyState.value = overflow;
    }
  });
}

function resolveRefHTMLElement(
  el: Element | ComponentPublicInstance | null,
): HTMLElement | null {
  if (el == null) return null;
  if (el instanceof HTMLElement) return el;
  const root = (el as ComponentPublicInstance).$el;
  return root instanceof HTMLElement ? root : null;
}

function bindCopyTextOverflow(
  el: Element | ComponentPublicInstance | null,
  index: number,
) {
  const prev = overflowMeasureByIndex.get(index);
  if (prev) {
    prev.ro.disconnect();
    prev.mo.disconnect();
    overflowMeasureByIndex.delete(index);
  }
  const cellChild = resolveRefHTMLElement(el);
  if (!cellChild) return;

  const run = () => runTextOverflowMeasure(cellChild, index);
  run();
  const ro = new ResizeObserver(run);
  ro.observe(cellChild);
  const mo = new MutationObserver(run);
  mo.observe(cellChild, {
    childList: true,
    characterData: true,
    subtree: true,
  });
  overflowMeasureByIndex.set(index, { ro, mo });
}

onBeforeUnmount(() => {
  overflowMeasureByIndex.forEach(({ ro, mo }) => {
    ro.disconnect();
    mo.disconnect();
  });
  overflowMeasureByIndex.clear();
});

type typeDateType = 'date' | 'date1' | 'dateTime' | 'dateTime1';
const onFormatter = (row: any) => {
  return getUseValue(props.useType, row, props.useArg);
};
/**
 * multitags：useArg 为数组时 [0] 为 title 列名、其余为 tag 列名，
 * 拼成 `标题(项1、项2)` 交给 multitags 组件解析；为字符串时取 row[prop] 直接解析。
 */
const getMultitagsValue = (row: any): string => {
  const arg = props.useArg;
  if (Array.isArray(arg)) {
    const [titleKey, ...tagKeys] = arg as string[];
    const tags = tagKeys
      .map((key) => row?.[key])
      .filter(
        (v) => v !== undefined && v !== null && String(v).trim() !== '',
      )
      .map((v) => String(v).trim());
    const title = row?.[titleKey] ?? '';
    return tags.length ? `${title}(${tags.join('、')})` : String(title);
  }
  return props.prop ? row?.[props.prop] ?? '' : '';
};
/**
 * multirows：useArg 数组仅取前三项列名 [名称列, ID列, 编码列]，按 row[列名] 取值交给 DartMultirows 组件展示。
 */
const getMultirowsField = (row: any, index: number) => {
  const arg = props.useArg;
  const key = Array.isArray(arg) ? (arg as string[])[index] : '';
  return key ? row?.[key] : undefined;
};
/**
 * multidatetime：useArg 固定为 dateTime，按 `YYYY-MM-DD HH:mm:ss` 格式化后拆为 上=日期、下=时间 交给 DartMultirows 上下两行展示。
 */
const getMultidatetimeParts = (row: any): {
  name: string;
  id: string;
} => {
  const value = props.prop ? row?.[props.prop] : undefined;
  const formatted = String(useFuns.date(value, 'dateTime'));
  const [date = '', time = ''] = formatted.split(' ');
  return { name: date, id: time };
};
//千分位
function thousands(num: number | string) {
  var str = num.toString();
  var reg =
    str.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
  return str.replace(reg, '$1,');
}

const useFuns: any = {};

useFuns.number = (value: any, arg: number | string) => {
  if (arg === '') {
    return value;
  }
  return round(value, Number(arg));
};
useFuns.number1 = (value: any, arg: number | string) => {
  if (arg === '') {
    return thousands(value);
  }
  return thousands(round(value, Number(arg)));
};
useFuns.number2 = (value: any, arg: number | string) => {
  if (arg === '') {
    return value;
  }
  const nArg = Number(arg);
  if (nArg > 0) {
    return round(value, nArg).toFixed(nArg);
  }
  return round(value, nArg);
};
useFuns.number3 = (value: any, arg: number | string) => {
  if (arg === '') {
    return thousands(value);
  }
  const nArg = Number(arg);
  if (nArg > 0) {
    return thousands(round(value, nArg).toFixed(nArg));
  }
  return thousands(round(value, Number(arg)));
};
useFuns.money = (value: number, arg: number | string) => {
  if (arg === '') {
    return thousands(round(value, 2).toFixed(2));
  }
  const nArg = Number(arg);
  if (nArg > 0) {
    return thousands(round(value, nArg).toFixed(nArg));
  }
  return thousands(round(value, nArg));
};
useFuns.date = (value: any, arg: string) => {
  const dateTypes = {
    date: 'YYYY-MM-DD',
    date1: 'YYYY/MM/DD',
    dateTime: 'YYYY-MM-DD HH:mm:ss',
    dateTime1: 'YYYY/MM/DD HH:mm:ss',
  };
  let dateRe = arg;
  if (arg === '') {
    dateRe = dateTypes.date;
  } else {
    dateRe = dateTypes[arg as typeDateType] || arg;
  }

  if (!value || value === 'Invalid Date') return '--';
  const date = dayjs(value);
  if (!date.isValid()) return '--';

  return date.format(dateRe);
};
useFuns.percentage = (value: any, arg: number | string) => {
  const w = arg === '' ? 2 : Number(arg);
  const str = round(Number(value * 100), w).toFixed(w);
  return `${str}%`;
};
/** isCopy + 无自定义 default 槽时渲染文本，须与传给 el-table-column 的 formatter 逻辑一致（含仅用 formatter、无 prop 场景） */
function getCellDisplayText(scope: {
  row: any;
  column: any;
  $index: number;
}): string {
  const { row, column, $index } = scope;
  const key = props.prop;
  const cellValue =
    key !== undefined && key !== null && String(key).length
      ? row[key as keyof typeof row]
      : undefined;

  let raw: unknown;
  if (props.useType) {
    raw = onFormatter(row);
  } else if (typeof props.formatter === 'function') {
    raw = props.formatter(row, column, cellValue, $index);
  } else if (key) {
    raw = row[key as keyof typeof row];
  } else {
    raw = '';
  }
  if (raw === null || raw === undefined) return '';
  return String(raw);
}

const getUseValue = (
  type: string,
  row: any,
  arg: string | number | unknown[],
) => {
  const types = [
    'number', //数值
    'number1', //千分为
    'number2', //强补0
    'number3', //千分为+强补0
    'money', //千分为+强补0
    'date', //日期
    'percentage', //百分比
  ];
  const prop = props.prop;
  let value = '';
  if (prop) {
    value = row[prop];
  }
  if (types.indexOf(type) < 0 || typeof value === 'undefined') {
    return value;
  }

  return useFuns[type](value, arg);
};

function onCopy(text: string) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.readOnly = true;
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  const success = document.execCommand('copy');

  document.body.removeChild(textarea);
  showMessage('复制成功', 'success');
}

const onCellMouseEnter = (event: MouseEvent, index: number) => {
  const node = event.currentTarget as HTMLElement;
  columnIndex.value = index;
  const cellChild = node.querySelector(
    '.dart-table-column-tooltip-text',
  ) as HTMLElement | null;
  const overflow = cellChild ? computeTextOverflow(cellChild) : false;
  copyState.value = overflow;
  textOverflowByRow[index] = overflow;
};
</script>

<style lang="scss">
.dart-table-column-tooltip {
  display: flex;
  align-items: center;
  padding-left: 0 !important;
  min-width: 0;
}

.dart-table-column-tooltip-text {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dart-table-column-copy-wrap {
  display: inline-flex;
  flex-shrink: 0;
  margin-right: 5px;
}

.dart-table-column-copy {
  cursor: pointer;
  &:hover {
    color: var(--el-color-primary);
  }
}

.dart-table-column-tooltip-popper {
  max-width: 500px !important;
}

.dart-table-column-pin {
  position: absolute;
  top: 50%;
  left: 1px;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>
