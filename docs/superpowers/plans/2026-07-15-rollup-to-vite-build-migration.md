# Rollup → Vite 构建迁移实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 ct-dart3 组件库的构建工具从 Rollup + vue-cli-service 统一迁移到 Vite lib 模式，保持产物格式一致。

**Architecture:** 用 Vite `build.lib` 模式同时输出 ESM (`es/`) 和 UMD (`lib/`)，配合 `vite-plugin-dts` 自动生成类型声明，外部化 vue/axios/element-plus 等依赖。

**Tech Stack:** Vite 6, @vitejs/plugin-vue, vite-plugin-dts, Vue 3

---

## 文件结构总览

### 新建

| 文件 | 职责 |
|------|------|
| `packages/dart3/vite.config.ts` | Vite 构建配置，定义 lib 模式输出 |

### 修改

| 文件 | 变更 |
|------|------|
| `packages/dart3/package.json` | 更新 scripts、devDependencies、exports |

### 删除

| 文件 | 原因 |
|------|------|
| `packages/dart3/build/rollup.config.js` | 被 vite.config.ts 替代 |
| `packages/dart3/vue.config.js` | 被 vite.config.ts 替代 |
| `packages/dart3/report-lib.html` | webpack 分析报告，不再需要 |
| `packages/dart3/stats.html` | 构建统计，不再需要 |

---

## Task 1: 创建 vite.config.ts

**Files:**
- Create: `packages/dart3/vite.config.ts`

- [ ] **Step 1: 创建 Vite 构建配置文件**

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
      external: [
        'vue',
        'axios',
        'element-plus',
        'dayjs',
        'sortablejs',
        'lodash-es',
        'qs',
        'vue-draggable-plus',
        '@element-plus/icons-vue'
      ],
      output: {
        globals: {
          vue: 'Vue',
          axios: 'axios',
          'element-plus': 'ElementPlus',
          dayjs: 'dayjs',
          sortablejs: 'SortableJS',
          'lodash-es': 'lodashEs',
          qs: 'qs',
          'vue-draggable-plus': 'VueDraggablePlus',
          '@element-plus/icons-vue': 'ElementPlusIconsVue'
        }
      }
    },
    cssCodeSplit: false,
    minify: 'terser'
  }
})
```

- [ ] **Step 2: 验证文件创建成功**

```bash
cat packages/dart3/vite.config.ts
```

预期：文件内容与上述一致。

- [ ] **Step 3: 提交**

```bash
git add packages/dart3/vite.config.ts
git commit -m "feat: 添加 Vite 构建配置（lib 模式 + dts 插件）"
```

---

## Task 2: 更新 package.json

**Files:**
- Modify: `packages/dart3/package.json`

- [ ] **Step 1: 更新构建脚本**

将 `scripts` 部分替换为：

```json
"scripts": {
  "serve": "vite",
  "build": "rimraf lib es && vite build",
  "build:clean": "rimraf lib && rimraf es",
  "dev": "vite build --watch",
  "link": "npm link"
}
```

- [ ] **Step 2: 更新 exports 字段**

将 `exports` 替换为指向构建产物（不再是源码）：

```json
"exports": {
  ".": {
    "import": "./es/index.js",
    "require": "./lib/index.umd.min.js",
    "types": "./es/index.d.ts"
  }
}
```

- [ ] **Step 3: 移除旧 devDependencies**

从 `devDependencies` 中删除以下包：

```json
"@babel/core",
"@babel/plugin-external-helpers",
"@babel/plugin-transform-runtime",
"@babel/preset-env",
"@babel/runtime",
"@babel/runtime-corejs3",
"@rollup/plugin-babel",
"@rollup/plugin-commonjs",
"@rollup/plugin-node-resolve",
"@vue/cli-plugin-babel",
"@vue/cli-plugin-typescript",
"@vue/cli-service",
"@vue/compiler-sfc",
"rollup",
"rollup-plugin-analyzer",
"rollup-plugin-babel",
"rollup-plugin-commonjs",
"rollup-plugin-postcss",
"rollup-plugin-terser",
"rollup-plugin-typescript2",
"rollup-plugin-visualizer",
"rollup-plugin-vue",
"webpack-bundle-analyzer"
```

- [ ] **Step 4: 新增 devDependencies**

在 `devDependencies` 中添加：

```json
"vite": "^6.0.0",
"@vitejs/plugin-vue": "^5.2.0",
"vite-plugin-dts": "^4.0.0"
```

- [ ] **Step 5: 验证 package.json 语法正确**

```bash
node -e "JSON.parse(require('fs').readFileSync('packages/dart3/package.json','utf8')); console.log('OK')"
```

预期输出: `OK`

- [ ] **Step 6: 提交**

```bash
git add packages/dart3/package.json
git commit -m "refactor: 更新 package.json 构建脚本和依赖（Vite 替代 Rollup）"
```

---

## Task 3: 删除旧构建配置文件

**Files:**
- Delete: `packages/dart3/build/rollup.config.js`
- Delete: `packages/dart3/vue.config.js`
- Delete: `packages/dart3/report-lib.html`
- Delete: `packages/dart3/stats.html`

- [ ] **Step 1: 删除 Rollup 配置和 vue-cli 配置**

```bash
rm packages/dart3/build/rollup.config.js
rm packages/dart3/vue.config.js
rm -f packages/dart3/report-lib.html
rm -f packages/dart3/stats.html
```

- [ ] **Step 2: 检查 build/ 目录是否为空，如果为空则删除**

```bash
ls packages/dart3/build/ 2>/dev/null && echo "not empty" || rmdir packages/dart3/build 2>/dev/null
```

- [ ] **Step 3: 删除其他不再需要的配置文件**

```bash
rm -f packages/dart3/.babelrc
rm -f packages/dart3/babel.config.js
rm -f packages/dart3/.browserslistrc
```

这些文件是 Babel 和 vue-cli 的配置，Vite 不需要它们。

- [ ] **Step 4: 提交**

```bash
git add -A
git commit -m "chore: 删除 Rollup/vue-cli/Babel 构建配置文件"
```

---

## Task 4: 安装依赖并验证构建

**Files:**
- 无新文件，仅验证

- [ ] **Step 1: 安装依赖**

```bash
cd d:/ctProject/ct-dart3
pnpm install
```

预期：pnpm 识别 workspace 变更，安装 Vite 相关依赖。

- [ ] **Step 2: 运行构建**

```bash
cd packages/dart3
npm run build
```

注意：这里用 `npm run build` 而非 `pnpm`，因为 dart3 的 package-lock.json 是 npm 格式。或者直接用：

```bash
npx vite build
```

预期：构建成功，生成 `es/index.js`、`es/index.d.ts`、`lib/index.umd.min.js`。

- [ ] **Step 3: 验证产物文件存在**

```bash
ls -la packages/dart3/es/index.js
ls -la packages/dart3/es/index.d.ts
ls -la packages/dart3/lib/index.umd.min.js
```

三个文件都应存在且非空。

- [ ] **Step 4: 验证 ESM 产物导出列表**

```bash
grep -o "export.*Dart\w*" packages/dart3/es/index.js | sort
```

预期：应包含所有 27 个组件的导出（DartInput, DartTable, DartAvatar 等）。

- [ ] **Step 5: 验证 UMD 产物格式**

```bash
head -5 packages/dart3/lib/index.umd.min.js
```

预期：以 `(function(global,factory){` 或类似 UMD 包装开头。

- [ ] **Step 6: 验证类型声明**

```bash
head -20 packages/dart3/es/index.d.ts
```

预期：包含组件的类型导出声明。

- [ ] **Step 7: 提交构建验证结果**

如果构建成功，无需额外提交。如果需要修复，提交修复。

---

## Task 5: 验证 VitePress docs 兼容性

**Files:**
- 可能修改: `packages/dart3/package.json`（如果 exports 需要调整）

- [ ] **Step 1: 确认 VitePress docs 仍能正常启动**

```bash
cd d:/ctProject/ct-dart3/packages/docs
timeout 20 pnpm dev 2>&1 | head -15
```

预期：VitePress 启动成功。由于 `exports` 现在指向构建产物而非源码，需要确认 docs 的 `ct-dart3` 引用仍能解析。

如果解析失败（因为 `es/index.js` 需要先构建），有两个解决方案：

**方案 A**：在 `exports` 中添加 `development` 条件指向源码：

```json
"exports": {
  ".": {
    "development": "./packages/index.ts",
    "import": "./es/index.js",
    "require": "./lib/index.umd.min.js",
    "types": "./es/index.d.ts"
  }
}
```

并在 VitePress 的 `config.ts` 中添加：

```ts
vite: {
  resolve: {
    conditions: ['development']
  }
}
```

**方案 B**：在 VitePress 的 `config.ts` 中用 alias 直接指向源码：

```ts
vite: {
  resolve: {
    alias: {
      'ct-dart3': resolve(__dirname, '../../dart3/packages/index.ts')
    }
  }
}
```

选择方案 A（更规范）或方案 B（更简单），根据实际情况决定。

- [ ] **Step 2: 验证 VitePress 构建也正常**

```bash
cd d:/ctProject/ct-dart3/packages/docs
pnpm build
```

预期：构建成功。

- [ ] **Step 3: 提交兼容性修复**

如果需要修改 package.json 或 config.ts：

```bash
git add packages/dart3/package.json packages/docs/.vitepress/config.ts
git commit -m "fix: 确保 VitePress docs 开发模式下引用 ct-dart3 源码"
```

---

## Task 6: 最终验证与清理

- [ ] **Step 1: 完整构建流程验证**

```bash
cd d:/ctProject/ct-dart3/packages/dart3
npm run build
```

确认无错误，产物完整。

- [ ] **Step 2: 验证产物大小合理**

```bash
ls -lh packages/dart3/es/index.js
ls -lh packages/dart3/lib/index.umd.min.js
```

ESM 产物应在 100-300KB 范围，UMD min 产物应更小。

- [ ] **Step 3: 验证外部化依赖正确**

```bash
grep -c "from 'vue'" packages/dart3/es/index.js || echo "0"
grep -c "from 'element-plus'" packages/dart3/es/index.js || echo "0"
```

预期：vue 和 element-plus 应作为 `import` 语句保留（外部化），而非内联打包。

- [ ] **Step 4: 检查 git 状态**

```bash
git status
git log --oneline -5
```

确认所有变更已提交。

---

## 自查结果

### Spec 覆盖检查

| 设计文档章节 | 对应 Task | 状态 |
|-------------|-----------|------|
| 构建配置 | Task 1 | 覆盖 |
| 构建脚本变更 | Task 2 | 覆盖 |
| 依赖变更（移除/新增） | Task 2, 3 | 覆盖 |
| package.json exports 更新 | Task 2 | 覆盖 |
| 文件变更（删除） | Task 3 | 覆盖 |
| 风险与验证 | Task 4, 5, 6 | 覆盖 |

### Placeholder 扫描

无 TBD/TODO。

### 类型一致性

- `vite.config.ts` 中 `external` 列表与 `package.json` 中 `dependencies` 对应
- `fileName` 函数输出的路径与 `package.json` 中 `main`/`module` 字段一致
