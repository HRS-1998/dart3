# DragTransferTree 类穿梭框拖拽

## 拖拽组件介绍

描述：拖拽组件
版本：1.0.0
功能： 实现左侧列表与右侧列表相互拖拽的功能，左侧列表支持 ctrl,shift 多选拖拽,右侧列表支持内部排序拖拽

## 类型定义

```ts
export interface ListItem {
  id: string | number;
  label: string;
  disabled: boolean;
  selected?: boolean;
}

export interface PanelConfig {
  name?: string; // 当前drag
  dragOrigin?: string; // 拖拽来源
  title?: string; // 头部左侧标题
}

export interface PropsMapType {
  value?: string;
  label?: string;
  disabled?: string;
}

export interface LeftPanelConfig extends PanelConfig {}

export interface RightPanelConfig extends PanelConfig {
  showLeftIcon?: boolean; // 显示左侧图标
  showRightIcon?: boolean; // 显示右侧图标
}
```

## 属性

| 属性                 | 类型                 | 默认值                                                  | 描述             | 版本  |
| :------------------- | :------------------- | :------------------------------------------------------ | :--------------- | :---- |
| `data`               | `默认类型ListItem[]` | -                                                       | 数据源           | 1.0.0 |
| `v-model`            | `默认类型ListItem[]` | -                                                       | 右侧列表数据     | 1.0.0 |
| `propsMap`           | `PropsMapType`       | `{ value: 'id', label: 'label', disabled: 'disabled' }` | 字段别名         | 1.0.0 |
| `filterable`         | `boolean`            | `true`                                                  | 是否可搜索       | 1.0.0 |
| `filter-placeholder` | `string`             | `请搜索`                                                | 搜索框默认占位符 | 1.0.0 |
| `filter-method`      | `Function`           | -                                                       | 自定义搜索函数   | 1.0.0 |
| `show-total`         | `boolean`            | `true`                                                  | 展示列表总数     | 1.0.0 |
| `left-config`        | `LeftPanelConfig`    | -                                                       | 左侧列表配置     | 1.0.0 |
| `right-config`       | `RightPanelConfig`   | -                                                       | 右侧列表配置     | 1.0.0 |

## 插槽

| 插槽名称       | 描述         | 版本  |
| :------------- | :----------- | :---- |
| `left-header`  | 左侧列表头部 | 1.0.0 |
| `rigth-header` | 右侧列表头部 | 1.0.0 |
| `default`      | 自定义项     | 1.0.0 |

## 事件

| 名称   | 说明         | 参数                | 版本  |
| :----- | :----------- | :------------------ | :---- |
| change | 数据变化触发 | value(右侧列表数据) | 1.0.0 |

##### 使用示例

1: 默认使用

<demo src="drag-transfer-tree/d1" />

2: 自定义

<demo src="drag-transfer-tree/d2" />
