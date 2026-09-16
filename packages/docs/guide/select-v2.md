# SelectV2 虚拟化选择器

基于 Element Plus `el-select-v2` 的封装，**属性、事件、插槽与官方文档一致**（通过透传实现）。在未自定义 `#default` 选项插槽时，下拉项文案单行省略；**仅当真实溢出**时，悬停通过 `el-tooltip` 展示全文。

官方能力说明见：[Virtualized Select | Element Plus](https://element-plus.org/zh-CN/component/select-v2.html)。

## 基础用法

<demo src="select-v2/d1" />

## 扩展属性（相对 el-select-v2）

| 参数             | 说明                                                         | 类型    | 默认值 |
| ---------------- | ------------------------------------------------------------ | ------- | ------ |
| model-value / v-model | 绑定值，与 `el-select-v2` 一致                          | string / number / boolean / object / array / undefined | — |
| ellipsis-tooltip | 未自定义 `#default` 时，选项被截断是否用 Tooltip 显示全文     | boolean | true   |

## 插槽

与 `el-select-v2` 相同，包括 `default`、`header`、`footer`、`empty`、`prefix`、`tag`、`loading`、`label` 等。提供 **`#default`** 时，关闭内置省略与 Tooltip，由业务自行渲染选项。

## 暴露（ref）

与 `el-select-v2` 一致，常用：`focus()`、`blur()`、`selectedLabel`（2.8.5+）。

## 其余 API

其它属性、事件、插槽参数请参阅 Element Plus **Select V2** 文档；本组件使用 `inheritAttrs: false` 将未声明的属性全部绑定至内部的 `el-select-v2`。
