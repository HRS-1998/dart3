# Input 输入框

通过鼠标或键盘输入字符

## 显示字符个数

<demo src="input/d1" />

## 限制输入

<demo src="input/d2" />

## 自定义正则

<demo src="input/d3" />

## 复合型输入框

<demo src="input/d4" />

## 属性

| 参数            | 说明                                                                                    | 类型             | 可选值                                                                                                                                                                                                                                 | 默认值                                                                  |
| --------------- | --------------------------------------------------------------------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| type            | 类型                                                                                    | string           | text，textarea 和其他 [原生 input 的 type 值](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types)                                                                                                  | text                                                                    |
| input-type      | 输入框中可输入数据的类型                                                                | string           | 整数:`integer` <br>正整数:`integer1`<br>负整数:`integer2`<br>数字:`num`<br>浮点数:`decmal`<br>正浮点数:`decmal1`<br>负浮点数:`decmal2`<br>英文字符:`letter`<br>大写字母:`letter_u`<br>小写字母:`letter_l`<br>自定义正则表达式:`regexp` | 分别表示 数字类型 ，英文字符，0 或者非 0 开头的数，自定义正则表达式类型 |
| show-word-limit | 是否显示输入框中已输入字符长度                                                          | boolean          | —                                                                                                                                                                                                                                      | false                                                                   |
| regexp          | 自定义正则表达式                                                                        | regexp           | —                                                                                                                                                                                                                                      | —                                                                       |
| value           | 绑定值                                                                                  | string / number  | —                                                                                                                                                                                                                                      | —                                                                       |
| maxlength       | 原生属性，最大输入长度                                                                  | number           | —                                                                                                                                                                                                                                      | —                                                                       |
| minlength       | 原生属性，最小输入长度                                                                  | number           | —                                                                                                                                                                                                                                      | —                                                                       |
| placeholder     | 输入框占位文本                                                                          | string           | —                                                                                                                                                                                                                                      | —                                                                       |
| clearable       | 是否可清空                                                                              | boolean          | —                                                                                                                                                                                                                                      | false                                                                   |
| disabled        | 禁用                                                                                    | boolean          | —                                                                                                                                                                                                                                      | false                                                                   |
| size            | 输入框尺寸，只在 `type!="textarea"` 时有效                                              | string           | medium / small / mini                                                                                                                                                                                                                  | —                                                                       |
| prefix-icon     | 输入框头部图标                                                                          | string           | —                                                                                                                                                                                                                                      | —                                                                       |
| suffix-icon     | 输入框尾部图标                                                                          | string           | —                                                                                                                                                                                                                                      | —                                                                       |
| rows            | 输入框行数，只对 `type="textarea"` 有效                                                 | number           | —                                                                                                                                                                                                                                      | 2                                                                       |
| autosize        | 自适应内容高度，只对 `type="textarea"` 有效，可传入对象，如，{ minRows: 2, maxRows: 6 } | boolean / object | —                                                                                                                                                                                                                                      | false                                                                   |
| autocomplete    | 原生属性，自动补全                                                                      | string           | on, off                                                                                                                                                                                                                                | off                                                                     |
| auto-complete   | 下个主版本弃用                                                                          | string           | on, off                                                                                                                                                                                                                                | off                                                                     |
| name            | 原生属性                                                                                | string           | —                                                                                                                                                                                                                                      | —                                                                       |
| readonly        | 原生属性，是否只读                                                                      | boolean          | —                                                                                                                                                                                                                                      | false                                                                   |
| resize          | 控制是否能被用户缩放                                                                    | string           | none, both, horizontal, vertical                                                                                                                                                                                                       | —                                                                       |
| autofocus       | 原生属性，自动获取焦点                                                                  | boolean          | true, false                                                                                                                                                                                                                            | false                                                                   |
| form            | 原生属性                                                                                | string           | —                                                                                                                                                                                                                                      | —                                                                       |
| label           | 输入框关联的 label 文字                                                                 | string           | —                                                                                                                                                                                                                                      | —                                                                       |
| tabindex        | 输入框的 tabindex                                                                       | string           | -                                                                                                                                                                                                                                      | -                                                                       |
| trim            | 失焦去除内容值的首尾空格                                                                | boolean          | -                                                                                                                                                                                                                                      | false                                                                   |

## Slots 插槽

| name    | 说明                                    |
| ------- | --------------------------------------- |
| prefix  | 输入框头部内容，只对 `type="text"` 有效 |
| suffix  | 输入框尾部内容，只对 `type="text"` 有效 |
| prepend | 输入框前置内容，只对 `type="text"` 有效 |
| append  | 输入框后置内容，只对 `type="text"` 有效 |

## 事件

| 事件名称 | 说明                                          | 回调参数                  |
| -------- | --------------------------------------------- | ------------------------- |
| blur     | 在 Input 失去焦点时触发                       | (event: Event)            |
| focus    | 在 Input 获得焦点时触发                       | (event: Event)            |
| change   | 在 Input 值改变时触发                         | (value: string \| number) |
| clear    | 在点击由 `clearable` 属性生成的清空按钮时触发 | —                         |

## 方法

| 方法名 | 说明                | 参数 |
| ------ | ------------------- | ---- |
| focus  | 使 input 获取焦点   | —    |
| blur   | 使 input 失去焦点   | —    |
| select | 选中 input 中的文字 | —    |
