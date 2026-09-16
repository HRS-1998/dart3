# Search 搜索栏

用于搜索栏的快速搭建 需要引入`Search SearchItem`组件

## 基础

label 长度可放置最多 6 个文字

<demo src="search/d1" />

## 固定高度

过多的选项可使用固定高度的方式

<demo src="search/d2" />

## Search 属性

| 名称                    | 说明                                                                                  | 类型    | 默认值 | 可选值             | 版本 |
| ----------------------- | ------------------------------------------------------------------------------------- | ------- | ------ | ------------------ | ---- |
| model                   | 表单数据对象                                                                          | object  | —      | —                  | —    |
| rules                   | 表单验证规则                                                                          | object  | —      | —                  |
| inline                  | 行内表单模式                                                                          | boolean | true   | true / false       |
| label-position          | 表单域标签的位置                                                                      | string  | right  | right / left / top | —    |
| label-suffix            | 表单域标签的后缀                                                                      | string  | —      | —                  | —    |
| label-width             | 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto | string  | —      | —                  | —    |
| hide-required-asterisk  | 是否显示必填字段的标签旁边的红色星号                                                  | boolean | false  | —                  | —    |
| show-message            | 是否显示校验错误信息                                                                  | boolean | true   | —                  | —    |
| inline-message          | 是否以行内形式展示校验信息                                                            | boolean | false  | —                  | —    |
| status-icon             | 是否在输入框中显示校验结果反馈图标                                                    | boolean | false  | —                  | —    |
| validate-on-rule-change | 是否在 `rules` 属性改变后立即触发一次验证                                             | boolean | true   | —                  | —    |
| size                    | 用于控制该表单内组件的尺寸                                                            | string  | mini   |                    | —    |
| form-span               | 左边表单区域栅格占据的列数                                                            | number  | 20     | —                  | —    |
| btn-span                | 右边按钮区域栅格占据的列数                                                            | number  | 4      | —                  | —    |
| gutter                  | 栅格间隔                                                                              | number  | 0      | —                  | —    |
| show-arrow              | 展示展开箭头                                                                          | Boolean | false  | true / false       |      |
| height                  | 配合 showArrow 属性一起使用,定义组件高度                                              | string  | auto   | —                  |      |
| label-text-length       | 用于控制表单 label 区域的宽度                                                         | number  | 6      | 6 / 4              |      |

## 事件

| 事件名称      | 说明                                             | 参数 | 版本  |
| ------------- | ------------------------------------------------ | ---- | ----- |
| validate      | 验证                                             |      |       |
| validateField | 验证具体的某个字段                               |      | 0.2.2 |
| clearValidate | 移除表单项的校验结果                             |      | 0.2.2 |
| resetFields   | 重置该表单项，将其值重置为初始值，并移除校验结果 |      | 0.2.2 |

## Search-Item 属性

| 参数           | 说明                                                                         | 类型    | 默认值 | 可选值                              | 版本 |
| -------------- | ---------------------------------------------------------------------------- | ------- | ------ | ----------------------------------- | ---- |
| prop           | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | string  | —      | 传入 Search 组件的 `model` 中的字段 | —    |
| span           | 栅格占据的列数                                                               | Number  | 8      | 8 / 16 / 24                         | —    |
| offset         | 栅格左侧的间隔格数                                                           | Number  | 0      | —                                   | —    |
| push           | 栅格向右移动格数                                                             | Number  | 0      | —                                   | —    |
| pull           | 栅格向左移动格数                                                             | Number  | 0      | —                                   | —    |
| label          | 标签文本                                                                     | string  | —      | —                                   | —    |
| label-width    | 表单域标签的的宽度，例如 '50px'。支持 auto。                                 | string  | —      | —                                   | —    |
| required       | 是否必填，如不设置，则会根据校验规则自动生成                                 | boolean | false  | —                                   | —    |
| rules          | 表单验证规则                                                                 | object  | —      | —                                   | —    |
| error          | 表单域验证错误信息, 设置该值会使表单验证状态变为`error`，并显示该错误信息    | string  | —      | —                                   | —    |
| show-message   | 是否显示校验错误信息                                                         | boolean | true   | —                                   | —    |
| inline-message | 以行内形式展示校验信息                                                       | boolean | false  | —                                   | —    |
| size           | 用于控制该表单域下组件的尺寸                                                 | string  | —      |                                     | —    |
| is-button      | 特定放置按钮的位置标识                                                       | boolean | false  | true / false                        |      |
