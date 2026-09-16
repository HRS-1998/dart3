# ListTemp 拷贝项

需引入`ListTemp ListTempItem`组件

## 基础用法

<demo src="list-temp/d1" />

## 拖拽

<demo src="list-temp/d2" />

## 传值校验

```js
//支持函数形式
//默认参数为当前项值
const publicRules = {
  a: [
    { required: true, message: '请输入批次编号', trigger: 'blur' },
    { validator: checkID, trigger: 'blur' },
  ],
  c: (item: any) => {
    return [
      { required: true, message: '请输入发放数量', trigger: 'change' },
      {
        validator: (rule: any, value: any, callback: any) => {
          checkNum(rule, value, callback, item.row as VendibilityValue);
        },
        trigger: 'change',
      },
    ];
  },
};
```

## ListTemp 属性

| 名称               | 说明                                                   | 类型          | 默认值 | 可选值       | 版本   |
| ------------------ | ------------------------------------------------------ | ------------- | ------ | ------------ | ------ |
| value / v-model    | 绑定值                                                 | array         | —      | —            |        |
| data               | 绑定值                                                 | array         | —      | —            | 0.4.2  |
| default-data       | 默认值项数据 新增使用此项进行填充 (特殊属性 看下面)    | object        | {}     |              |        |
| is-validateEvent   | 是否触发表单的校验                                     | object        |        |              |        |
| max                | 最大数量                                               | number        |        |              |        |
| is-border          | 显示边框                                               | boolean       | false  |              |        |
| is-no              | 显示序号                                               | boolean       | false  |              |        |
| is-operation       | 显示操作区                                             | boolean       | true   |              |        |
| is-add             | 显示新增按钮                                           | boolean       | true   |              |        |
| is-copy            | 显示拷贝按钮                                           | boolean       | false  |              |        |
| is-del             | 显示删除按钮                                           | boolean       | true   |              |        |
| is-foot            | 显示 foot                                              | boolean       | true   |              |        |
| empty-hide         | 无内容时将隐藏内容区域                                 | boolean       | fals   |              |        |
| rules              | 内部验证规则 单项可用函数模式（fun(scope)）            | object        | {}     |              |        |
| empty-text         | 空数据时显示的文本内容                                 | string        |        |              |        |
| is-drag            | 是否拖拽                                               | boolean       | false  |              |        |
| height             | 固定高度                                               | string/number | -      |              |        |
| max-height         | Table 的最大高度。合法的值为数字或者单位为 px 的高度。 | string/number | -      |              |        |
| is-use-drag-handle | 是否使用拖拽元素 使用 drag-handle 进行拖拽             | boolean       | —      | false        | 0.4.10 |
| drag-handle        | 拖拽元素样式名                                         | string        | —      | '.dart-icon' | 0.4.10 |
| addButtonPlacement | 新增按钮位置                                           | string        | bottom | bottom,top   | 2.0.20 |

## default-data 指定属性

| 名称         | 说明               | 默认值 | 版本  |
| ------------ | ------------------ | ------ | ----- |
| disabledCopy | 拷贝按钮是否不可用 | false  | 0.3.6 |
| disabledDel  | 删除按钮是否不可用 | false  | 0.3.6 |

## ListTemp 事件

| 名称           | 说明         | 参数       | 版本  |
| -------------- | ------------ | ---------- | ----- |
| dataChange     | 值变化时触发 | 当前值     | 0.4.2 |
| change(不推荐) | 值变化时触发 | 当前值     |       |
| delete         | 删除         | 删除的数据 |       |
| add            | 新增         | 新增的数据 |       |

## ListTemp 方法

| 名称          | 说明                                                    | 参数   |
| ------------- | ------------------------------------------------------- | ------ |
| clearValidate | 清除指定验证 prop 使用`data.0.xx`的形式 data 为固定内容 | (prop) |
| validate      | 验证                                                    |        |
| validateField | 验证具体的某个字段                                      |        |
| resetFields   | 重置该表单项，将其值重置为初始值，并移除校验结果        |        |

## ListTempItem 属性

| 名称  | 说明                                   | 类型   | 默认值 | 可选值 |
| ----- | -------------------------------------- | ------ | ------ | ------ |
| label | 标签文本                               | string |        |        |
| width | 标签的的宽度，例如 '50px'。支持 auto。 | string |        |        |
| prop  | 表单域 model 字段 验证时必填           | string |        |        |

## ListTempItem slot

| 名称   | 说明                                            |     |
| ------ | ----------------------------------------------- | --- |
| -      | 自定义列的内容，参数为 { row, column, \$index } |
| header | 自定义表头的内容. 参数为 { column, \$index }    |
