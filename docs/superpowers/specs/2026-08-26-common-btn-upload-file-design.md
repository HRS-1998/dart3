# 设计文档：common-btn 与 upload-file 组件入库

日期：2026-08-26
状态：已确认

## 背景

项目根目录下有 `common-btn.vue` 和 `upload-file.vue` 两个从业务项目（`@fd/common`）提取的组件，需迁入 `packages/dart3` 组件库，并在 playground 与 docs 中补充测试和文档。

## 源组件适配问题

| 依赖 | 处理方式 |
| :-- | :-- |
| `@fd/common/utils` 的 `showMessage` | 库内 `packages/dart3/packages/utils/index.ts` 已有同名导出，改为从 `../utils` 导入 |
| `@fd/common/utils` 的 `to` | 将用户提供的源码加入 `utils/index.ts` 导出（与 `showMessage` 并列），common-btn 从 `../utils` 导入 |
| `@fd/common/assets/js/bus` 的 `Bus` | 不再引入。删除 `bindEvents` prop 与 `Bus.emit`，新增 `refreshTable?: () => void` 回调 prop，在原 emit 时机（成功提示后 200ms）调用 |
| `defineModel<string>()`（upload-file） | 库声明 vue ^3.2.0，defineModel 需 3.4+，库内现有组件均用 props+emit 替代（defineModel 写法全部被注释弃用）。转为 `modelValue` prop + `update:modelValue` emit |

## 组件设计

### CommonBtn（`packages/dart3/packages/common-btn/`）

- `common-btn.vue`：`name: 'DartCommonBtn'`，逻辑保持不变，仅做上述依赖替换
- Props 与源组件一致，差异仅：
  - 删除 `bindEvents`
  - 新增 `refreshTable?: () => void`
- `index.ts`：`withInstall` 导出 `DartCommonBtn`

成功流程：`ajax` → code 校验 → `showMessage` 成功提示 → 200ms 后调用 `props.refreshTable?.()` → 调用 `props.success?.(name)`。

### UploadFile（`packages/dart3/packages/upload-file/`）

- `upload-file.vue`：`name: 'DartUploadFile'`，`defineModel` 转为 props+emit，其余逻辑不变
- `index.ts`：`withInstall` 导出 `DartUploadFile`

### 注册

`packages/dart3/packages/index.ts`：import + components 数组 + export 两个新组件。

## Playground 测试（packages/playground/src/views/）

- `CommonBtnDemo.vue`：模拟 `ajax`（成功 code=0 / 失败 code=1 两种 Promise），验证确认气泡、loading、成功提示、`refreshTable` 回调触发
- `UploadFileDemo.vue`：模拟上传接口，验证格式校验、大小校验、成功回显与点击打开、移除
- `router.ts` 新增 `/common-btn`、`/upload-file` 路由

## 文档（packages/docs/）

- `examples/common-btn/d1.vue`、`examples/upload-file/d1.vue`（必要时补充 d2 变体，如 custom 插槽）
- `guide/common-btn.md`、`guide/upload-file.md`：介绍/属性/插槽/事件/使用示例，格式与现有文档一致（`<demo src="..." />`）
- `.vitepress/config.ts` sidebar「组件」组新增两项

## 错误处理

组件内部错误处理与源组件一致：`to` 包装请求异常、code 不匹配静默返回、上传失败 `showMessage` 提示。

## 测试策略

playground 手动验证为主（与库内其他组件一致，无自动化测试设施）：
1. playground dev server 打开两个 demo 路由，走通成功/失败路径
2. docs dev server 确认 demo 渲染与 sidebar 链接
