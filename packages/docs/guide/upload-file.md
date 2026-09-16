# UploadFile 文件上传

## 单文件上传组件介绍

描述：基于 el-upload 的单文件上传，内置格式/大小校验、上传进度 loading、成功回显与移除
版本：2.1.12
功能：单文件上传、格式校验、大小校验、文件回显（点击打开）、超限自动替换

## 属性

| 属性 | 类型 | 默认值 | 描述 | 版本 |
| :-- | :-- | :-- | :-- | :-- |
| `v-model` | `string` | - | 文件地址（上传成功后为接口返回 data，回显时作为文件 url） | 2.1.12 |
| `btnName` | `string` | `选择文件` | 触发上传按钮文案 | 2.1.12 |
| `link` | `boolean` | `false` | 按钮是否为链接样式 | 2.1.12 |
| `type` | `string` | `''` | 按钮类型 | 2.1.12 |
| `size` | `number` | - | 展示用文件大小（KB），不传则取实际上传大小 | 2.1.12 |
| `maxSize` | `number` | `104857600` | 文件大小上限（KB） | 2.1.12 |
| `accept` | `string` | `.zip,.txt,.csv,.xlsx` | 允许的文件后缀 | 2.1.12 |
| `onSuccess` | `Function` | - | 自定义成功处理（返回 false 走默认失败提示逻辑） | 2.1.12 |
| `beforeUpload` | `Function` | - | 上传前钩子（返回 false 中止上传） | 2.1.12 |

## 事件

| 名称 | 说明 | 参数 | 版本 |
| :-- | :-- | :-- | :-- |
| update:modelValue | 文件地址变化 | value(文件地址) | 2.1.12 |

其余属性（如 `action`、`http-request`、`headers`）透传给 el-upload。

##### 使用示例

1: 默认使用（自定义 http-request mock 上传）

<demo src="upload-file/d1" />
