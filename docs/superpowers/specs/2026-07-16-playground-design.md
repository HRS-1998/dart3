# Playground 测试项目设计

## 目标

在 `packages/playground/` 下创建 Vue 3 + Vite + TypeScript 项目，通过 workspace 引用 ct-dart3 组件库，用于独立测试各组件功能。

## 架构

- Vite SPA + vue-router (hash 模式)
- 侧边栏导航 + 每个组件独立页面
- ct-dart3 通过 `workspace:*` 引用，开发时 Vite 别名指向源码实现 HMR
- ElementPlus 全量注册 + 中文

## 项目结构

```
packages/playground/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── src/
    ├── main.ts
    ├── App.vue
    ├── router.ts
    └── views/
        ├── TableDemo.vue
        ├── DialogDemo.vue
        └── ...
```

## 依赖

- runtime: vue, vue-router, element-plus, @element-plus/icons-vue, ct-dart3 (workspace:*)
- dev: vite, @vitejs/plugin-vue, typescript

## 根目录脚本

`package.json` 添加 `"dev:playground": "pnpm -C packages/playground dev"`
