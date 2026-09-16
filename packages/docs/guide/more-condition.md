# MoreCondition 条件选择

MoreCondition MoreConditionItem 2 个组件组合使用

## 基础

<demo src="more-condition/d1" />

## 带验证

<demo src="more-condition/d2" />

## 属性

| 名称            | 说明                                      | 类型    | 默认值                                        | 可选值 |
| --------------- | ----------------------------------------- | ------- | --------------------------------------------- | ------ |
| value / v-model | 绑定值                                    | Array   | []                                            | —      |
| defaultData     | 默认值项数据 新增使用此项进行填充         | object  | {}                                            |        |
| maxDeep         | 最大深度                                  | number  | -                                             |        |
| maxNum          | 最大数量                                  | number  | -                                             | 0.4.11 |
| rules           | 内部验证规则 单项可用函数模式（fun(row)） | object  | {}                                            | 0.3.5  |
| isOperator      | 是否显示右侧操作                          | boolean | true                                          |        |
| isFooter        | 是否显示底部操作                          | boolean | true                                          |        |
| isView          | 是否为显示状态 不可编辑                   | boolean | false                                         |        |
| props           | 字段映射                                  | object  | {type:'type',children:'children',data:'data'} |        |

## 事件

| 事件名称 | 说明         | 回调参数 |
| -------- | ------------ | -------- |
| change   | 值变化时触发 | (arrary) |

## 方法

| 方法名称      | 说明                                             | 参数 |
| ------------- | ------------------------------------------------ | ---- |
| validate      | 验证 MoreCondition                               |      |
| validateField | 验证具体的某个字段                               |      |
| clearValidate | 移除表单项的校验结果                             |      |
| resetFields   | 重置该表单项，将其值重置为初始值，并移除校验结果 |      |

## MoreConditionItem Attributes

| 名称  | 说明                                     | 类型            | 默认值            | 可选值 | 版本  |
| ----- | ---------------------------------------- | --------------- | ----------------- | ------ | ----- |
| prop  | 表单域 model 字段                        | string          | -                 | —      |       |
| span  | 宽度                                     | number          | 8                 |        |       |
| label | 标题                                     | number          | -                 |        |       |
| rules | 验证规则 (函数时会传入当前条的数据 data) | object/function | {}/function(data) |        | 0.3.1 |
