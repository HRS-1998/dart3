# ct-dart3

基于 Vue 3 + Element Plus 的后台组件库。

## 环境要求

- Node.js >= 20.11.0
- pnpm >= 10.15.1

## 项目结构

```
ct-dart3/
├── packages/
│   ├── dart3/          # 组件库源码
│   ├── docs/           # VitePress 文档站
│   └── playground/     # 组件交互测试
├── pnpm-workspace.yaml
└── package.json
```

## 常用命令

```bash
# 安装依赖
pnpm install

# 文档站开发
pnpm dev:docs

# 文档站打包（输出到 packages/docs/.vitepress/dist + 根目录 dist/1505-stable/）
pnpm build:inner

# 组件库打包
pnpm build:dart3

# Playground 交互测试
pnpm dev:playground
```

## 组件库打包

使用 Vite lib mode 打包，输出两种格式：

| 格式 | 路径                   | 说明                         |
| ---- | ---------------------- | ---------------------------- |
| ESM  | `es/index.js`          | ES Module，支持 tree-shaking |
| UMD  | `lib/index.umd.min.js` | UMD，可直接 `<script>` 引入  |

类型声明输出到 `es/index.d.ts`。

外部化依赖：vue、axios、element-plus、dayjs、lodash-es、qs、@element-plus/icons-vue

内嵌依赖：sortablejs、vue-draggable-plus

## 文档站

基于 VitePress，支持 SSR。构建后自动复制到 `dist/1505-stable/`。

## Playground

基于 Vite + vue-router (hash 模式)，通过 `workspace:*` 引用组件库源码，支持 HMR 实时调试。
