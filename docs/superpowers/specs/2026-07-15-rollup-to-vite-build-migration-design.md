---
name: rollup-to-vite-build-migration
description: 将 ct-dart3 组件库构建工具从 Rollup + vue-cli-service 迁移到 Vite lib 模式
---

# Rollup → Vite 构建迁移设计

## 背景

ct-dart3 组件库当前使用两套构建工具：
- `vue-cli-service build --target lib` 生成 UMD 产物（`lib/index.umd.min.js`）
- `rollup` 生成 ESM 产物（`es/index.js`）和类型声明（`es/index.d.ts`）

迁移目标：
- 统一为 Vite `build.lib` 模式，一次构建同时输出 ESM + UMD
- 使用 `vite-plugin-dts` 自动生成类型声明
- 保持产物格式与原构建一致（外部化依赖、不提取 CSS、ESM + UMD 双格式）
- 清理 Rollup/vue-cli 相关依赖，简化维护

## 方案：Vite lib 模式 + vite-plugin-dts

### 构建配置（`vite.config.ts`）

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      outDir: 'es',
      include: ['packages/**/*']
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'packages/index.ts'),
      name: 'CtDart3',
      formats: ['es', 'umd'],
      fileName: (format) => format === 'es' ? 'es/index.js' : 'lib/index.umd.min.js'
    },
    rollupOptions: {
      external: ['vue', 'axios', 'element-plus', 'dayjs', 'sortablejs', 'lodash-es', 'qs', 'vue-draggable-plus'],
      output: {
        globals: {
          vue: 'Vue',
          axios: 'axios',
          'element-plus': 'ElementPlus',
          dayjs: 'dayjs',
          sortablejs: 'SortableJS',
          'lodash-es': 'lodashEs',
          qs: 'qs'
        }
      }
    },
    cssCodeSplit: false,
    minify: 'terser'
  }
})
```

### 构建脚本变更

| 原脚本 | 新脚本 |
|--------|--------|
| `build:clean` → `rimraf lib && rimraf es` | 保持不变 |
| `build:lib` → `vue-cli-service build --target lib` | 删除 |
| `build:esm-bundle` → `rollup --config` | 删除 |
| `build` → 三步串联 | `build` → `rimraf lib es && vite build` |
| `dev` → `npm run build:esm-bundle -- --watch` | `dev` → `vite build --watch` |

### 产物对比

| 产物 | 原方式 | 新方式 |
|------|--------|--------|
| `es/index.js` | Rollup ESM | Vite lib ESM |
| `es/index.d.ts` | rollup-plugin-typescript2 | vite-plugin-dts |
| `lib/index.umd.min.js` | vue-cli-service UMD | Vite lib UMD |

## 依赖变更

### 移除的 devDependencies

- `rollup`、`rollup-plugin-analyzer`、`rollup-plugin-babel`、`rollup-plugin-commonjs`、`rollup-plugin-postcss`、`rollup-plugin-terser`、`rollup-plugin-typescript2`、`rollup-plugin-visualizer`、`rollup-plugin-vue`
- `@rollup/plugin-babel`、`@rollup/plugin-commonjs`、`@rollup/plugin-node-resolve`
- `@vue/cli-plugin-babel`、`@vue/cli-plugin-typescript`、`@vue/cli-service`
- `@babel/core`、`@babel/plugin-external-helpers`、`@babel/plugin-transform-runtime`、`@babel/preset-env`、`@babel/runtime`、`@babel/runtime-corejs3`
- `webpack-bundle-analyzer`
- `@vue/compiler-sfc`（Vite 内置）

### 新增的 devDependencies

- `vite`（^6.0）
- `@vitejs/plugin-vue`（^5.0）
- `vite-plugin-dts`（^4.0）

### package.json exports 更新

```json
"exports": {
  ".": {
    "import": "./es/index.js",
    "require": "./lib/index.umd.min.js",
    "types": "./es/index.d.ts"
  }
}
```

`main`/`module`/`typings` 字段保持不变，确保向后兼容。

## 文件变更

### 新建

- `packages/dart3/vite.config.ts` — Vite 构建配置

### 删除

- `packages/dart3/build/rollup.config.js` — Rollup 配置
- `packages/dart3/vue.config.js` — vue-cli 配置
- `packages/dart3/report-lib.html` — webpack 分析报告
- `packages/dart3/stats.html` — 构建统计

### 修改

- `packages/dart3/package.json` — scripts、dependencies、exports

## 风险与验证

### 主要风险

1. **产物格式差异** — Vite lib 模式的 ESM 输出可能与原 Rollup 有细微差异（如 re-export 方式、模块 ID 处理）
2. **CSS 处理差异** — 原 rollup `css: false` 完全不处理 CSS，Vite 可能自动注入 CSS import
3. **类型声明差异** — `vite-plugin-dts` 生成的 `.d.ts` 路径结构可能与原 `rollup-plugin-typescript2` 不同

### 验证策略

- 构建后对比 `es/index.js` 的导出列表与原产物一致
- 在 VitePress docs 中验证组件仍正常渲染
- 验证 `package.json` 的 `main`/`module`/`exports` 均可正确解析
- 验证 UMD 产物在浏览器 `<script>` 标签中可用
