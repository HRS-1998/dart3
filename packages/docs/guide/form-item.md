# FormItem 表单项

## 表单项介绍

描述：完全复用 el-form-item，label 超过最大字数（默认 6）时截断显示，并在其后展示问号图标，hover 显示完整 label
版本：2.1.12
功能：label 超长截断、tooltip 展示完整内容、最大字数可配置、#label 插槽透传

## 属性

| 属性     | 类型     | 默认值 | 描述                                        | 版本   |
| :------- | :------- | :----- | :------------------------------------------ | :----- |
| `label`  | `string` | `''`   | 表单项标签（超过 maxLen 时截断 + 问号图标） | 2.1.12 |
| `maxLen` | `number` | `6`    | label 最大字数                              | 2.1.12 |

其余属性（`prop`、`rules`、`required`、`label-width` 等）透传给 el-form-item。

## 插槽

| 插槽名称  | 描述                                     | 版本   |
| :-------- | :--------------------------------------- | :----- |
| `default` | 表单内容（透传）                         | 2.1.12 |
| `label`   | 自定义 label（传入后不做截断，原样透传） | 2.1.12 |
| `error`   | 自定义错误信息（透传）                   | 2.1.12 |

##### 使用示例

1: 默认使用（短 label 原样、长 label 截断 + tooltip）

<demo src="form-item/d1" />

2: 自定义 maxLen 与 #label 插槽

<demo src="form-item/d2" />
