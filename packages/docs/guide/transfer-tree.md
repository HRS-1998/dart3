# TransferTree 穿梭树

## 基本用法

<demo src="transfer-tree/d1" />

## 自定义内容

<demo src="transfer-tree/d2" />

## loading

<demo src="transfer-tree/d3" />

## 查询

<demo src="transfer-tree/d4" />

## 只显示结果

<demo src="transfer-tree/d5" />

## 开启右侧删除功能

<demo src="transfer-tree/d6" />

## 单级模式

<demo src="transfer-tree/d7" />

## 属性

| 参数                  | 说明                                                                                             | 类型                      | 可选值 | 默认值                           | 版本   |
| --------------------- | ------------------------------------------------------------------------------------------------ | ------------------------- | ------ | -------------------------------- | ------ |
| data                  | 展示数据                                                                                         | array                     | —      |                                  |        |
| dataMap               | 数据映射                                                                                         | object                    | —      |                                  |        |
| titles                | 标题                                                                                             | array                     | —      | ['Title1', 'Title2']             |        |
| filterPlaceholder     | 搜索提示                                                                                         | array                     | —      | ['请输入关键字', '请输入关键字'] |        |
| height                | 内容高度                                                                                         | number                    | —      | 300                              |        |
| leftTreeShow          | 左侧是否显示                                                                                     | boolean                   | —      | true                             |        |
| isRightClear          | 是否开启右侧删除功能                                                                             | boolean                   | —      | false                            |        |
| filterable            | 是否可搜索                                                                                       | boolean                   | —      | false                            |        |
| filter-method         | 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示， 返回 false 则表示这个节点会被隐藏 | Function(value, data)     | —      |                                  |        |
| tooltip-effect        | 溢出的 tooltip 的 effect                                                                         | string                    | —      | dark                             | 0.4.5  |
| show-overflow-tooltip | 是否隐藏额外内容并在单元格悬停时使用 Tooltip 显示它们                                            | boolean                   | —      | false                            | 0.4.5  |
| is-expand-all         | 是否全展开                                                                                       | boolean 或 Array[boolean] | —      | false                            | 0.4.17 |
| is-search-branch      | 是否支持搜索枝节点，只针对树节点初始绑定的 label 值搜索，使用当前功能时不支持使用自定义搜索      | boolean                   | —      | true                             | 1.0.16 |

## dataMap

| 属性     | 说明                                                     | 类型              | 默认值   |
| -------- | -------------------------------------------------------- | ----------------- | -------- |
| value    | 每个树节点用来作为唯一标识的属性，在整棵树中应该是唯一的 | string, number id |          |
| label    | 指定节点标签为节点对象的某个属性值                       | string            | label    |
| children | 指定子树为节点对象的某个属性值                           | string            | children |
| disabled | 指定节点选择框是否禁用为节点对象的某个属性值             | string            | disabled |

## 插槽 slot

| 参数        | 说明                                                                             | Scope                                  |
| ----------- | -------------------------------------------------------------------------------- | -------------------------------------- |
| default     | 左树和右树通用默认树节点的内容。                                                 | { node: TreeNode, data: TreeNodeData } |
| left        | 自定义左树节点的内容。注意：is-search-branch 只增对树节点初始绑定的 label 值起效 | { node: TreeNode, data: TreeNodeData } |
| right       | 自定义右树节点的内容。注意：is-search-branch 只增对树节点初始绑定的 label 值起效 | { node: TreeNode, data: TreeNodeData } |
| left-title  | 左树 自定义 title                                                                |                                        |
| right-title | 右树 自定义 title                                                                |                                        |

## 事件

| 事件名称     | 说明                         | 回调参数             |
| ------------ | ---------------------------- | -------------------- |
| check-change | 节点选中状态发生变化时的回调 | (data: TreeNodeData) |

## 方法

| 方法名          | 说明                         | 参数              |
| --------------- | ---------------------------- | ----------------- |
| setCheckedKeys  | 通过 keys 设置目前勾选的节点 | (keys: TreeKey[]) |
| getLeftTree     | 获取未搜索前的左树实例       | Ref               |
| clearQuery      | 同时置空左右两侧树的搜索条件 | -                 |
| clearQueryLeft  | 置空左侧树的搜索条件         | -                 |
| clearQueryRight | 置空右侧树的搜索条件         | -                 |
