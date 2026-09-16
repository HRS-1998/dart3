# Search2 搜索栏（新）

基于 Element Plus 组件库开发，自动检测表单内容高度，超过一行时显示展开/收起按钮的搜索栏组件

## 少搜索项

<demo src="search2/d2" />

## 多搜索项

<demo src="search2/d1" />

## 属性

| 参数            | 说明                       | 类型    | 可选值 | 默认值 |
| --------------- | -------------------------- | ------- | ------ | ------ |
| row-fold        | 收起时显示的行数           | number  | —      | 1      |
| label-width     | 控制抽屉显示/隐藏          | boolean | —      | 'auto' |
| label-position  | 抽屉标题                   | string  | —      | 'left' |
| inline          | 是否显示底部操作           | boolean | —      | true   |
| defaultExpanded | 初始化是搜索栏展开还是收起 | boolean | —      | false  |

本组件基于 Element Plus Form 开发，除上述赋予默认值的属性外，其他属性请参考 Element Plus 官方 Form 组件文档。

## 插槽

| name    | 说明         |
| ------- | ------------ |
| default | 表单内容区域 |
| button  | 操作按钮区域 |

## 方法

| 方法名         | 说明                                | 参数  |
| -------------- | ----------------------------------- | ----- |
| search2FormRef | 表单引用                            | —     |
| validate       | 表单验证                            | cb    |
| resetFields    | 重置表单，移除校验结果              | —     |
| clearValidate  | 清除表单项的校验结果                | props |
| refreshLayout  | 刷新布局，重新计算是否需要展开/收起 | —     |
