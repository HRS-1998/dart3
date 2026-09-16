# Table 表格

需要引入`Table TableCloumn`组件

使用方式与 `el-table` 一致 可使用`el-table-cloumn`混用

## 带分页

<demo src="table/d1" />

## 单元格格式化

<demo src="table/d2" />

## useType 汇总示例

一个表格内演示全部 `useType`（number 系列、money、date、percentage、multitags、multirows、multidatetime）：

<demo src="table/d7" />

## 多行日期时间列

`useType="multidatetime"` 时单元格渲染为「日期 + 时间」上下两行展示（复用 multirows 组件），`useArg` 固定为 `dateTime`，按 `YYYY-MM-DD HH:mm:ss` 格式化后拆分。

## 多行标签列

`useType="multitags"` 时单元格渲染为「标题 + 标签组」两行展示（multitags 组件）`这里要注意table行高itemHeight的设置`。

- `useArg` 为**字符串**：取 `prop` 对应的行值，按 `标题(项1、项2、项3)` 格式解析，括号内以 `、`/`,`/`，` 分割为标签
- `useArg` 为**数组**：`[0]` 为标题列名，其余为标签列名，按 `row[列名]` 取值；空值(`null`/`undefined`/空串)自动过滤

<demo src="table/d5" />

## 多行信息列

`useType="multirows"` 时单元格渲染为「名称 + ID/编码」两行展示（multirows 组件），`这里要注意table行高itemHeight的设置`。

- `useArg` 为**数组**：仅取前三项列名 `[名称列, ID列, 编码列]`，按 `row[列名]` 取值；ID 缺省显示 `--`，编码为空时不展示

<demo src="table/d6" />

## 拖动排序

<demo src="table/d3" />

## 动态修改列

<demo src="table/d4" />

## 属性说明

以下为新增的属性 方法 ，原生属性方法可直接使用

## 属性

| 参数                     | 说明                                                                  | 类型     | 可选值                                                            | 默认值                                    | 版本   |
| ------------------------ | --------------------------------------------------------------------- | -------- | ----------------------------------------------------------------- | ----------------------------------------- | ------ |
| page-small               | 是否使用小型分页样式                                                  | boolean  | —                                                                 | false                                     |
| page-background          | 是否为分页按钮添加背景色                                              | boolean  | —                                                                 | false                                     |
| page-size                | 每页显示条目个数 需要配置 page-sizes                                  | number   | —                                                                 | 10                                        |
| page-total               | 总条目                                                                | number   | —                                                                 | —                                         |
| page-count               | 总页数，page-total 和 page-count 设置任意一个就可以达到显示页码的功能 | Number   | —                                                                 | —                                         |
| pager-count              | 页码按钮的数量，当总页数超过该值时会折叠                              | number   | 大于等于 5 且小于等于 21 的奇数                                   | 7                                         |
| current-page             | 当前页数，支持 .sync 修饰符                                           | number   | —                                                                 | 1                                         |
| page-layout              | 组件布局，子组件名用逗号分隔                                          | String   | `sizes`, `prev`, `pager`, `next`, `jumper`, `->`, `total`, `slot` | 'total, prev, pager, next, sizes, jumper' |
| page-sizes               | 每页显示个数选择器的选项设置                                          | number[] | —                                                                 | [10, 20, 30, 40, 50, 100]                 |
| popper-class             | 每页显示个数选择器的下拉框类名                                        | string   | —                                                                 | —                                         |
| prev-text                | 替代图标显示的上一页文字                                              | string   | —                                                                 | —                                         |
| next-text                | 替代图标显示的下一页文字                                              | string   | —                                                                 | —                                         |
| page-disabled            | 是否禁用                                                              | boolean  | —                                                                 | false                                     |
| page-hide-on-single-page | 只有一页时是否隐藏                                                    | boolean  | —                                                                 | true                                      |
| is-drag                  | 是否需要行拖拽 必须配置 row-key                                       | boolean  | —                                                                 | false                                     |        |
| is-use-drag-handle       | 是否使用拖拽元素 使用 drag-handle 进行拖拽                            | boolean  | —                                                                 | false                                     | 0.4.10 |
| drag-handle              | 拖拽元素样式名                                                        | string   | —                                                                 | '.dart-icon'                              | 0.4.10 |
| column-set               | 列动态配置开关                                                        | boolean  | —                                                                 | false                                     | 1.0.23 |
| isDynamicHeight          | 是否开启动态高度配置                                                  | boolean  | —                                                                 | false                                     | 2.0.0  |
| dynamicExtraHeight       | 除表格外其余高度                                                      | number   | —                                                                 | 0                                         | 2.0.0  |
| tree-line-style          | 树形表格展开收起样式                                                  | boolean  | false                                                             |                                           | 2.0.16 |
| item-height              | 分页状态下，table的body中每一项行高，行高默认48px                     | boolean  | false                                                             |                                           | 2.1.8  |

## 事件

| 事件名              | 说明                               | 参数                      | 版本 |
| ------------------- | ---------------------------------- | ------------------------- | ---- |
| page-size-change    | pageSize 改变时会触发              | 每页条数                  |
| page-current-change | currentPage 改变时会触发           | 当前页                    |
| page-prev-click     | 用户点击上一页按钮改变当前页后触发 | 当前页                    |
| page-next-click     | 用户点击下一页按钮改变当前页后触发 | 当前页                    |
| dragEnd             | 拖拽结束后事件                     | array [newIndex,oldIndex] |      |

## Table-column 属性

| 参数      | 说明                                          | 类型          | 可选值 | 默认值 |
| --------- | --------------------------------------------- | ------------- | ------ | ------ |
| useType   | 系统类型 内容见见下表                         | string        |        | —      |
| useArg    | 系统类型参数 数 内容见见下表                  | string/number/array |        | —      |
| isCopy    | 使用 showoverflowtip 功能时，是否开启复制内容 | boolean       |        | false  |
| copyFixed | 开启复制功能时，是否固定复制 icon             | boolean       |        | true   |

## Table-column useType 具体说明

| useType    | useType 说明                    | 默认 useArg | useArg 说明                                        |
| ---------- | ------------------------------- | ----------- | -------------------------------------------------- |
| number     | 数值                            | 0           | 四舍五入 可为负整数                                |
| number1    | 千分位数值                      | 0           | 四舍五入 可为负整数                                |
| number2    | 补 0 数值                       | 0           | 补 0 位数                                          |
| number3    | 千分位加补 0 数值               | 0           | 补 0 位数                                          |
| money      | 货币                            | 2           | 补 0 位数                                          |
| date       | 日期 可使用 `YYYY MM`进行自定义 | date        | `date (2022-01-01) dateTime (2022-01-01 17:00:00)` |
| multidatetime | 日期+时间 上下两行展示（复用 multirows 组件） | dateTime | 固定为 `dateTime`，按 `YYYY-MM-DD HH:mm:ss` 格式化后拆分：上=日期、下=时间 |
| percentage | 百分比                          | 2           | 补 0 位数                                          |
| multitags  | 标题+标签组 多行展示            | —           | 字符串：取 `prop` 值按 `标题(项1、项2)` 解析；数组：`[0]` 为标题列名、其余为标签列名，按 `row[列名]` 取值 |
| multirows  | 名称+ID/编码 多行展示（multirows 组件） | —        | 数组：仅取前三项，`[0]` 名称列、`[1]` ID 列、`[2]` 编码列，按 `row[列名]` 取值 |
