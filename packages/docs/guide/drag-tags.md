# DragTags 拖拽组件

## tag 拖拽组件介绍

描述：tag 拖拽组件
版本：1.0.0
功能： 实现 tag 拖拽，支持 ctrl 多选

## 类型定义

```ts
export interface ListItem {
  id: string | number;
  label: string;
}
```

## 属性

| 属性       | 类型                 | 默认值                            | 描述     | 版本  |
| :--------- | :------------------- | :-------------------------------- | :------- | :---- |
| `v-model`  | `默认类型ListItem[]` | -                                 | 数据源   | 1.0.0 |
| `propsMap` | `PropsMapType`       | `{ value: 'id', label: 'label' }` | 字段别名 | 1.0.0 |

## 插槽

| 插槽名称  | 描述     | 版本  |
| :-------- | :------- | :---- |
| `default` | 自定义项 | 1.0.0 |

## 事件

| 名称   | 说明         | 参数            | 版本  |
| :----- | :----------- | :-------------- | :---- |
| change | 数据变化触发 | value(列表数据) | 1.0.0 |

##### 使用示例

1: 默认使用

<demo src="drag-tags/d1" />

2: 自定义

<demo src="drag-tags/d2" />
