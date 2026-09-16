# Dialog 对话框

基于 Element Plus 组件库开发，遵循最新设计规范，提供合理默认值并封装常用按钮的抽屉组件

## 基础

<demo src="dialog/d1" />

## 属性

| 参数                  | 说明                           | 类型    | 可选值 | 默认值                           |
| --------------------- | ------------------------------ | ------- | ------ | -------------------------------- |
| model-value           | 控制抽屉显示/隐藏              | boolean | —      | false                            |
| title                 | 抽屉标题                       | string  | —      | 'title'                          |
| width                 | 抽屉宽度                       | string  | —      | '40%'                            |
| is-footer             | 是否显示底部操作               | boolean | —      | true                             |
| is-edit               | 是否为编辑模式（显示确定按钮） | boolean | —      | true                             |
| cancel-title          | 取消按钮文本                   | string  | —      | '取消'                           |
| confirm-title         | 确定按钮文本                   | string  | —      | '确定'                           |
| loading               | 页面加载状态                   | boolean | —      | false                            |
| confirm-loading       | 确认按钮加载状态               | boolean | —      | false                            |
| show-confirm-on-close | 是否在关闭前弹出二次确认框     | boolean | —      | false                            |
| confirm-text          | 二次确认框确认文本             | string  | —      | '当前编辑内容未保存，是否退出？' |
| hasPermission         | 用户权限控制                   | boolean | —      | false                            |

本组件基于 Element Plus Dialog 开发，除上述自定义属性外，其他属性请参考 Element Plus 官方 Dialog 组件文档。

## 插槽

| name    | 说明               |
| ------- | ------------------ |
| header  | 自定义抽屉头部     |
| default | 抽屉内容区域       |
| footer  | 自定义底部操作区域 |

## 事件

| 事件名称 | 说明               | 回调参数 |
| -------- | ------------------ | -------- |
| closed   | 抽屉关闭时触发     | —        |
| confirm  | 点击确定按钮时触发 | —        |
| cancel   | 点击取消按钮时触发 | —        |

## 暴露

| 名称        | 说明                                                  |
| ----------- | ----------------------------------------------------- |
| handleClose | 用于关闭 Dialog, 该方法会调用传入的 before-close 方法 |
