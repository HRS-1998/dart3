# 设计文档：FormItem 表单项组件

日期：2026-08-26
状态：已确认（用户口头确认设计）

## 需求

`dart-form-item` 完全复用 el-form-item，仅接管 label：当 label 文字超过最大字数（默认 6）时，label 截断显示并在其后展示 `QuestionFilled` 图标，hover 图标用 el-tooltip 显示完整 label。最大字数可通过 props 配置。

## 已确认的决策

| 问题       | 决策                                                      |
| :--------- | :-------------------------------------------------------- |
| 截断形式   | 前 N 字 + 无省略号，icon 紧跟其后                         |
| hover 提示 | el-tooltip 包裹 QuestionFilled 图标，content 为完整 label |
| label 插槽 | 使用者传 `#label` 插槽时原样透传，不截断不加 icon         |

## 组件设计

**`packages/dart3/packages/form-item/form-item.vue`**（`name: 'DartFormItem'`，`inheritAttrs: false`）

- Props：
  - `label?: string` — 接管 el-form-item 的 label
  - `maxLen?: number` — 默认 `6`
- 其余属性（prop/rules/required/label-width 等）`v-bind="$attrs"` 透传给内部 el-form-item
- label 渲染：
  - `label.length <= maxLen`：原样字符串 label
  - 超长：`label.slice(0, maxLen)` + `<el-tooltip :content="label">` 包裹的 `<el-icon><QuestionFilled /></el-icon>`
  - 有 `#label` 插槽：透传
- 插槽：默认插槽与 `#error` 透传；icon 样式 scoped（cursor: help）

**配套**：index.ts withInstall 导出 `DartFormItem`；注册 `packages/index.ts`；版本 2.1.12；playground `FormItemDemo.vue`（短/长 label、自定义 maxLen、#label 插槽四场景）+ 路由；docs `examples/form-item/d1.vue、d2.vue` + `guide/form-item.md` + sidebar「FormItem 表单项」。

## 约束

遵循用户工作流要求：全部改动只 `git add` 暂存，不 commit。
