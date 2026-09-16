# DateRage 日期范围选择 （不推荐）

## 基础

<demo src="date-range/d1" />

## 带时间日期

<demo src="date-range/d2" />

## 属性

| 名称                  | 说明                                                                                       | 类型           | 默认值      | 可选值              | 版本 |
| --------------------- | ------------------------------------------------------------------------------------------ | -------------- | ----------- | ------------------- | ---- |
| model-value / v-model | 绑定值                                                                                     | array/string   | -           | -                   |
| readonly              | 完全只读                                                                                   | boolean        | false       | -                   | -    |
| disabled              | 禁用                                                                                       | boolean        | false       | -                   | -    |
| editable              | 文本框可输入                                                                               | boolean        | true        |                     | -    |
| clearable             | 是否显示清除按钮                                                                           | boolean        | true        | -                   | -    |
| size                  | 输入框尺寸                                                                                 | string         | -           | large/default/small | -    |
| startPlaceholder      | 开始时间占位内容                                                                           | string         | ''          | -                   | -    |
| endPlaceholder        | 结束时间占位内容                                                                           | string         | ''          | -                   | -    |
| type                  | 显示类型                                                                                   | string         | 'date'      | date/datetime       | -    |
| format                | 显示在输入框中的格式                                                                       | string         | yyyy-MM-dd  | 见日期格式          | -    |
| disabled-date         | 一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值。 | Function(Date) |             |                     | -    |
| popperClass           | DatePicker 下拉框的类名                                                                    | string         | -           | -                   | -    |
| rangeSeparator        | 选择范围时的分隔符                                                                         | string         | '-'         | -                   | -    |
| startDefaultValue     | 可选，开始时间选择器打开时默认显示的时间                                                   | [Date, Date]   | -           | -                   | -    |
| endDefaultValue       | 可选，结束时间选择器打开时默认显示的时间                                                   | [Date, Date]   | -           |                     | -    |
| defaultTime           | 范围选择时选中日期所使用的当日内具体时刻                                                   | [Date, Date]   | -           | -                   | -    |
| valueFormat           | 可选，绑定值的格式                                                                         | string         | -           | -                   | -    |
| name                  | 原生属性                                                                                   | string         | -           | -                   | -    |
| unlink                | 是否最大最小值超出覆盖联动                                                                 | boolean        | true        | -                   | -    |
| prefixIcon            | 自定义头部图标的类名                                                                       | string         | Date        | -                   | -    |
| clearIcon             | 自定义清空图标的类名                                                                       | string         | CircleClose | -                   | -    |
| teleported            | 是否将 datetime-picker 的下拉列表插入至 body 元素                                          | boolean        | true        | -                   | -    |

## 事件

| 名称   | 说明                                                            | 参数               | 版本 |
| ------ | --------------------------------------------------------------- | ------------------ | ---- |
| change | 用户确认选定的值时触发 格式与绑定值一致，可受 value-format 控制 | (value:组件绑定值) | -    |
| blur   | 当 input 失去焦点时触发                                         | (value:组件实例)   | -    |
| focus  | 当 input 获得焦点时触发                                         | (value:组件)       | -    |
