# DatePicker 日期

修复 plus 组件 修改日期 无法同步 毫秒时间戳的 bug

## 基础

<demo src="date-picker/d1" />

## 时间限制

<demo src="date-picker/d2" />

## 属性

| 名称                       | 说明                                            | 类型                           | 默认值                 | 可选值 |
| -------------------------- | ----------------------------------------------- | ------------------------------ | ---------------------- | ------ |
| value / v-model            | 绑定值，如果它是数组，长度应该是 2              | Date / number / string / Array | —                      | —      |
| value-format               | 可选，绑定值的格式。 不指定则绑定值为 Date 对象 | string                         | x                      |        |
| unlink-panels              | 在范围选择器里取消两个日期面板之间的联动        | boolean                        | true                   |        |
| disabled-date-max          | 日期可选最大天数                                | number                         | infinity               |        |
| disabled-date-min          | 日期可选最小天数                                | number                         | -infinity              |        |
| disabled-date-select-range | 动态可选范围 范围选择使用                       | Array                          | [-infinity ,infinity ] |        |

其他属性 看 plus DatePicker 组件
