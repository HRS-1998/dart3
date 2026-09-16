# VuePress → VitePress 迁移实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 ct-dart3 组件库文档从 VuePress 2 迁移到 VitePress，同时将项目重构为 pnpm monorepo 架构。

**Architecture:** 将 `dart3/` 和 `docs/` 移入 `packages/` 目录，通过 pnpm workspace 协议链接。文档使用 VitePress 替代 VuePress，demo 展示改用自定义 `<Demo>` 组件 + VitePress 原生能力。

**Tech Stack:** VitePress, pnpm workspace, Vue 3, Element Plus, Vite

---

## 文件结构总览

### 需要创建的文件

| 文件 | 职责 |
|------|------|
| `pnpm-workspace.yaml` | 声明 workspace 成员 |
| `package.json`（根目录） | workspace 根配置和快捷脚本 |
| `.npmrc` | pnpm 配置 |
| `packages/docs/.vitepress/config.ts` | VitePress 站点配置 |
| `packages/docs/.vitepress/theme/index.ts` | 主题扩展和组件注册 |
| `packages/docs/.vitepress/theme/components/Demo.vue` | 自定义 demo 展示组件 |
| `packages/docs/.vitepress/theme/style/index.scss` | 样式入口 |
| `packages/docs/.vitepress/theme/style/variables.scss` | VitePress CSS 变量映射 |
| `packages/docs/.vitepress/theme/style/common.scss` | 通用样式（迁移自原文件） |

### 需要修改的文件

| 文件 | 变更 |
|------|------|
| `dart3/vue.config.js` | 更新相对路径 alias |
| `dart3/build/rollup.config.js` | 更新 input 路径和 tsconfig include |
| `packages/docs/package.json` | 全面重写，替换为 VitePress 依赖 |
| 22 个 `guide/*.md` 文件 | `::: demo` → `<demo>` 语法替换 |
| `packages/docs/index.md` | 首页从 README.md 迁移 |

### 需要删除的内容

| 内容 | 原因 |
|------|------|
| `docs/docs/.vuepress/` 整个目录 | 被 `.vitepress/` 替代 |
| `docs/docs/.vuepress/assets/packages/` | 被 workspace 引用替代 |

---

## Task 1: 创建迁移分支

- [ ] **Step 1: 从当前分支创建迁移分支**

```bash
git checkout -b feat/vitepress-migration
```

- [ ] **Step 2: 确认分支创建成功**

```bash
git branch --show-current
```

预期输出: `feat/vitepress-migration`

---

## Task 2: 设置 Monorepo 根配置

**Files:**
- Create: `pnpm-workspace.yaml`
- Create: `package.json`（根目录）
- Create: `.npmrc`

- [ ] **Step 1: 创建 pnpm-workspace.yaml**

```yaml
packages:
  - 'packages/*'
```

- [ ] **Step 2: 创建根 package.json**

```json
{
  "name": "ct-dart3-workspace",
  "private": true,
  "scripts": {
    "dev:docs": "pnpm -C packages/docs dev",
    "build:docs": "pnpm -C packages/docs build",
    "build:dart3": "pnpm -C packages/dart3 build"
  }
}
```

- [ ] **Step 3: 创建 .npmrc**

```
shamefully-hoist=true
```

- [ ] **Step 4: 提交**

```bash
git add pnpm-workspace.yaml package.json .npmrc
git commit -m "chore: 初始化 pnpm monorepo 根配置"
```

---

## Task 3: 移动 dart3 到 packages/dart3

**Files:**
- Move: `dart3/` → `packages/dart3/`

- [ ] **Step 1: 创建 packages 目录并移动 dart3**

```bash
mkdir -p packages
git mv dart3 packages/dart3
```

- [ ] **Step 2: 确认移动成功**

```bash
ls packages/dart3/package.json
```

预期输出: `packages/dart3/package.json`

- [ ] **Step 3: 暂存（不提交，等 Task 4 路径修复后一起提交）**

---

## Task 4: 修复 dart3 构建路径

**Files:**
- Modify: `packages/dart3/vue.config.js`
- Modify: `packages/dart3/build/rollup.config.js`

移动到 `packages/dart3/` 后，以下相对路径需要更新：
- `vue.config.js` 中 `path.resolve('packages')` — 仍然有效，因为 `packages/dart3/packages/` 存在
- `rollup.config.js` 中 `../packages/index.ts` — 仍然有效，因为 `packages/dart3/packages/index.ts` 存在

**经过验证：** 由于 `dart3/packages/` 子目录在移动后变为 `packages/dart3/packages/`，相对路径 `path.resolve('packages')` 和 `../packages/index.ts` 的引用关系不变，无需修改。但需确认 rollup 中的 tsconfigOverride 路径。

- [ ] **Step 1: 读取当前 rollup.config.js 确认路径**

```bash
cat packages/dart3/build/rollup.config.js
```

- [ ] **Step 2: 如果 tsconfigOverride 中有 `typings/shims-vue.d.ts`，验证该文件仍存在于 `packages/dart3/typings/` 下**

```bash
ls packages/dart3/typings/shims-vue.d.ts
```

如果文件存在，路径无需修改。

- [ ] **Step 3: 提交 dart3 移动和路径确认**

```bash
git add packages/dart3/
git commit -m "refactor: 将 dart3 移入 packages/dart3（monorepo 结构）"
```

---

## Task 5: 移动 docs 到 packages/docs 并搭建 VitePress 骨架

**Files:**
- Move: `docs/docs/guide/` → `packages/docs/guide/`
- Move: `docs/docs/examples/` → `packages/docs/examples/`
- Create: `packages/docs/package.json`
- Create: `packages/docs/.vitepress/config.ts`
- Create: `packages/docs/.vitepress/theme/index.ts`
- Create: `packages/docs/.vitepress/theme/components/Demo.vue`
- Create: `packages/docs/.vitepress/theme/style/index.scss`
- Create: `packages/docs/.vitepress/theme/style/variables.scss`
- Create: `packages/docs/.vitepress/theme/style/common.scss`
- Create: `packages/docs/index.md`

- [ ] **Step 1: 创建 packages/docs 目录结构**

```bash
mkdir -p packages/docs/.vitepress/theme/components
mkdir -p packages/docs/.vitepress/theme/style
```

- [ ] **Step 2: 移动 guide 和 examples**

```bash
cp -r docs/docs/guide packages/docs/guide
cp -r docs/docs/examples packages/docs/examples
```

注意：先复制而非 git mv，因为后续还需要参考原 .vuepress 目录的内容。旧 docs 目录在迁移完成后统一删除。

- [ ] **Step 3: 创建 packages/docs/package.json**

```json
{
  "name": "docs",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vitepress dev",
    "build": "vitepress build",
    "preview": "vitepress preview"
  },
  "dependencies": {
    "ct-dart3": "workspace:*",
    "element-plus": "^2.11.4",
    "@element-plus/icons-vue": "^2.0.9",
    "sortablejs": "^1.15.0"
  },
  "devDependencies": {
    "vitepress": "^1.6.0",
    "sass": "^1.79.3"
  }
}
```

- [ ] **Step 4: 创建 .vitepress/config.ts**

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'ct-dart3 组件库',
  description: '后台vue3组件库',
  base: '/fd-doc/dart3/',

  sitemap: {
    hostname: 'https://your-domain.com/fd-doc/dart3/'
  },

  head: [
    ['meta', { name: 'description', content: 'ct-dart3 后台vue3组件库' }]
  ],

  themeConfig: {
    nav: [{ text: '日志', link: '/' }],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速上手', link: '/guide/quickstart' },
            { text: 'CSS 变量', link: '/guide/css' }
          ]
        },
        {
          text: '组件',
          items: [
            { text: 'Avatar 头像上传', link: '/guide/avatar' },
            { text: 'DateRange 日期范围', link: '/guide/date-range' },
            { text: 'DatePicker 日期选择', link: '/guide/date-picker' },
            { text: 'Dialog 对话框', link: '/guide/dialog' },
            { text: 'Drawer 抽屉', link: '/guide/drawer' },
            { text: 'DragTags 拖拽标签', link: '/guide/drag-tags' },
            { text: 'DragTransferTree 拖拽穿梭树', link: '/guide/drag-transfer-tree' },
            { text: 'Http 请求封装', link: '/guide/http' },
            { text: 'Input 输入框', link: '/guide/input' },
            { text: 'InputNumber 数字输入框', link: '/guide/input-number' },
            { text: 'ListTemp 列表模板', link: '/guide/list-temp' },
            { text: 'MoreCondition 更多条件', link: '/guide/more-condition' },
            { text: 'Permission 权限', link: '/guide/permission' },
            { text: 'Search 搜索', link: '/guide/search' },
            { text: 'Search2 搜索V2', link: '/guide/search2' },
            { text: 'SelectV2 选择器V2', link: '/guide/select-v2' },
            { text: 'State 状态', link: '/guide/state' },
            { text: 'Table 表格', link: '/guide/table' },
            { text: 'TextareaContent 文本域', link: '/guide/textarea-content' },
            { text: 'Tinymce 富文本', link: '/guide/tinymce' },
            { text: 'Toolbar 工具栏', link: '/guide/toolbar' },
            { text: 'TransferTree 穿梭树', link: '/guide/transfer-tree' },
            { text: 'UEditor 百度编辑器', link: '/guide/ueditor' }
          ]
        }
      ]
    },
    search: { provider: 'local' }
  },

  vite: {
    server: {
      port: 8081
    },
    ssr: {
      noExternal: ['element-plus']
    }
  }
})
```

- [ ] **Step 5: 创建 .vitepress/theme/index.ts**

```ts
import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {
  MoreCondition,
  MoreConditionItem,
  Avatar,
  Input,
  InputNumber,
  ListTempItem,
  ListTemp,
  Permission,
  Search,
  SearchItem,
  Http,
  Tinymce,
  DatePicker,
  DateRange,
  Table,
  Toolbar,
  TableColumn,
  TransferTree,
  TextareaContent,
  DragTags,
  DragTransferTree,
  Drawer,
  Search2,
  Dialog,
  Header,
  State,
  SelectV2
} from 'ct-dart3'
import Demo from './components/Demo.vue'
import './style/index.scss'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElementPlus, { zIndex: 3000, locale: zhCn })

    // 注册 dart3 组件（同原 client.ts）
    app.use(Tinymce)
    app.use(DatePicker)
    app.use(MoreCondition)
    app.use(MoreConditionItem)
    app.use(Avatar)
    app.use(Input)
    app.use(InputNumber)
    app.use(ListTempItem)
    app.use(ListTemp)
    app.use(Table)
    app.use(TableColumn)
    app.use(TransferTree)
    app.use(DateRange)
    app.use(TextareaContent)
    app.use(DragTags)
    app.use(DragTransferTree)
    app.use(Drawer)
    app.use(Search2)
    app.use(Dialog)
    app.use(Header)
    app.use(State)
    app.use(SelectV2)
    app.use(Permission as any, {
      alias: { add: 1, del: 2, edit: 3 }
    })
    app.use(Search)
    app.use(SearchItem)
    app.use(Http as any, {
      interceptError(data, opt) {
        console.log('interceptError--', data, opt)
      },
      interceptorSuccess(data, opt, data2) {
        console.log('interceptorSuccess--', data, opt, data2)
      },
      requestInterceptor(data, opt) {
        console.log('requestInterceptor--', data, opt)
      }
    })
    app.use(Toolbar)
    Permission.success([2, 3])

    // 注册 Element Plus 图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }

    // 注册全局 Demo 组件
    app.component('Demo', Demo)
  }
}
```

- [ ] **Step 6: 创建 .vitepress/theme/components/Demo.vue**

```vue
<template>
  <div class="demo-container">
    <div class="demo-preview">
      <component :is="demoComponent" />
    </div>
    <details class="demo-code-details">
      <summary>查看源码</summary>
      <div class="demo-code" v-html="highlightedCode" />
    </details>
  </div>
</template>

<script setup>
import { ref, onMounted, shallowRef } from 'vue'
import { computed } from 'vue'

const props = defineProps({
  src: { type: String, required: true }
})

const demoComponent = shallowRef(null)
const rawCode = ref('')
const highlightedCode = ref('')

onMounted(async () => {
  // 动态导入组件
  const modules = import.meta.glob('../../examples/**/*.vue')
  const path = `../../examples/${props.src}.vue`
  if (modules[path]) {
    const mod = await modules[path]()
    demoComponent.value = mod.default
  }

  // 获取源码（?raw 导入）
  const rawModules = import.meta.glob('../../examples/**/*.vue', { eager: true, query: '?raw', import: 'default' })
  if (rawModules[path]) {
    rawCode.value = rawModules[path] as string
    highlightedCode.value = `<pre><code>${escapeHtml(rawCode.value)}</code></pre>`
  }
})

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
</script>

<style scoped lang="scss">
.demo-container {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 16px 0;
  overflow: hidden;
}

.demo-preview {
  padding: 24px;
}

.demo-code-details {
  border-top: 1px solid var(--vp-c-divider);

  summary {
    padding: 8px 16px;
    cursor: pointer;
    font-size: 13px;
    color: var(--vp-c-text-2);
    user-select: none;

    &:hover {
      color: var(--vp-c-text-1);
    }
  }
}

.demo-code {
  padding: 16px;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.6;

  pre {
    margin: 0;
  }

  code {
    font-family: var(--vp-font-family-mono);
  }
}
</style>
```

- [ ] **Step 7: 创建 .vitepress/theme/style/variables.scss**

将原 `skin.scss` 中的 Element Plus 色板映射为 VitePress CSS 变量：

```scss
:root {
  // 品牌色 — 映射自 skin.scss 中 Element Plus 的 primary: #1e76f0
  --vp-c-brand-1: #1e76f0;
  --vp-c-brand-2: #4a93f3;
  --vp-c-brand-3: #6dacf5;
  --vp-c-brand-soft: rgba(30, 118, 240, 0.14);

  // 自定义 dart3 变量
  --dart-color-success: #129b76;
  --dart-color-warning: #f27e19;
  --dart-color-danger: #e84d37;
  --dart-color-info: #747c94;
  --dart-table-header-bg: #f9f9fb;
  --dart-secondary-fill-hover: #f3f3f5;
}
```

- [ ] **Step 8: 创建 .vitepress/theme/style/common.scss**

将原 `common.scss` 内容迁移，保留：
- `@font-face` 字体声明
- body 字体栈
- 滚动条样式
- 工具类（margin/padding/width）
- 响应式断点

移除 demo-block 相关样式（已由 Demo.vue 的 scoped style 替代）。

直接复制 `docs/docs/.vuepress/assets/common.scss` 内容，删除 `.demo.demo` 相关的 CSS 规则块（约 384-427 行）。

- [ ] **Step 9: 创建 .vitepress/theme/style/index.scss**

```scss
@import './variables';
@import './common';

// Element Plus 主题覆盖
@forward 'element-plus/theme-chalk/src/common/var.scss' with (
  $colors: (
    'primary': ('base': #1e76f0),
    'success': ('base': #129b76),
    'warning': ('base': #f27e19),
    'danger': ('base': #e84d37),
    'info': ('base': #747c94)
  )
);
```

- [ ] **Step 10: 创建 packages/docs/index.md**

将原 `docs/docs/README.md`（更新日志）转为 VitePress 首页格式：

```md
---
layout: home

hero:
  name: ct-dart3
  text: 后台 Vue3 组件库
  tagline: 基于 Vue 3 + Element Plus 的企业级后台组件库
  actions:
    - theme: brand
      text: 快速上手
      link: /guide/quickstart
    - theme: alt
      text: 组件列表
      link: /guide/avatar

features:
  - title: Vue 3 组件
    details: 基于 Composition API，支持 TypeScript
  - title: Element Plus 扩展
    details: 在 Element Plus 基础上封装业务组件
  - title: 开箱即用
    details: 内置权限、HTTP、搜索等后台常用功能
---

## 更新日志

| 版本 | 日期 | 说明 |
|------|------|------|
| 2.0.24 | 20260714 | 修复嵌套el-scrollbar样式问题 |
| 2.0.23 | 20260710 | 更新drawer样式 |
```

首页只保留最近几条日志，完整日志可后续单独维护到 `changelog.md`。

- [ ] **Step 11: 提交 VitePress 骨架**

```bash
git add packages/docs/
git commit -m "feat: 搭建 VitePress 文档骨架"
```

---

## Task 6: 迁移 guide markdown 文件

**Files:**
- Modify: 22 个 `packages/docs/guide/*.md` 文件

需要将所有 `::: demo` 语法替换为 `<demo>` 组件标签。

**替换规则：**
- `::: demo\n组件名/dN\n:::` → `<demo src="组件名/dN" />`
- 如果单个 md 文件中有多个 demo，逐一替换

**完整映射表（demo-block 路径 → <demo> src）：**

| 组件 | 原语法示例 | 新语法 |
|------|-----------|--------|
| avatar | `::: demo\navatar/d1\n:::` | `<demo src="avatar/d1" />` |
| date-picker | `::: demo\ndate-picker/d1\n:::` | `<demo src="date-picker/d1" />` |
| date-range | `::: demo\ndate-range/d1\n:::` | `<demo src="date-range/d1" />` |
| dialog | `::: demo\ndialog/d1\n:::` | `<demo src="dialog/d1" />` |
| drag-tags | `::: demo\ndrag-tags/d1\n:::` | `<demo src="drag-tags/d1" />` |
| drag-transfer-tree | `::: demo\ndrag-transfer-tree/d1\n:::` | `<demo src="drag-transfer-tree/d1" />` |
| drawer | `::: demo\ndrawer/d1\n:::` | `<demo src="drawer/d1" />` |
| http | `::: demo\nhttp/d1\n:::` | `<demo src="http/d1" />` |
| input | `::: demo\ninput/d1\n:::` | `<demo src="input/d1" />` |
| input-number | `::: demo\ninput-number/d1\n:::` | `<demo src="input-number/d1" />` |
| list-temp | `::: demo\nlist-temp/d1\n:::` | `<demo src="list-temp/d1" />` |
| more-condition | `::: demo\nmore-condition/d1\n:::` | `<demo src="more-condition/d1" />` |
| permission | `::: demo\npermission/d1\n:::` | `<demo src="permission/d1" />` |
| search | `::: demo\nsearch/d1\n:::` | `<demo src="search/d1" />` |
| search2 | `::: demo\nsearch2/d1\n:::` | `<demo src="search2/d1" />` |
| select-v2 | `::: demo\nselect-v2/d1\n:::` | `<demo src="select-v2/d1" />` |
| state | `::: demo\nstate/d1\n:::` | `<demo src="state/d1" />` |
| table | `::: demo\ntable/d1\n:::` | `<demo src="table/d1" />` |
| textarea-content | `::: demo\ntextarea-content/d1\n:::` | `<demo src="textarea-content/d1" />` |
| tinymce | `::: demo\ntinymce/d1\n:::` | `<demo src="tinymce/d1" />` |
| toolbar | `::: demo\ntoolbar/d1\n:::` | `<demo src="toolbar/d1" />` |
| transfer-tree | `::: demo\ntransfer-tree/d1\n:::` | `<demo src="transfer-tree/d1" />` |
| ueditor | `::: demo\nueditor/d1\n:::` | `<demo src="ueditor/d1" />` |

- [ ] **Step 1: 用 sed 或脚本批量替换所有 guide/*.md 中的 `::: demo` 语法**

使用以下脚本自动替换：

```bash
cd packages/docs/guide
for file in *.md; do
  # 替换 ::: demo\n路径\n::: 为 <demo src="路径" />
  # 需要多行匹配
  perl -i -0pe 's/:::\s*demo\s*\n(\S+)\s*\n:::/<demo src="$1" \/>/g' "$file"
done
```

- [ ] **Step 2: 手动检查替换结果**

```bash
grep -r "::: demo" packages/docs/guide/
```

预期输出：无匹配结果（所有 `::: demo` 已被替换）。

- [ ] **Step 3: 检查替换后的 demo 标签数量是否正确**

```bash
grep -rc "<demo" packages/docs/guide/ | grep -v ":0$"
```

确认每个文件中的 `<demo>` 标签数量与原 `::: demo` 数量一致。

- [ ] **Step 4: 提交**

```bash
git add packages/docs/guide/
git commit -m "feat: 迁移 guide 文档，替换 demo-block 为 Demo 组件"
```

---

## Task 7: 处理 UEditor SSR 兼容

**Files:**
- Modify: `packages/docs/.vitepress/theme/index.ts`
- Modify: `packages/docs/.vitepress/theme/components/Demo.vue`

UEditor 依赖浏览器 API，原 client.ts 中通过 `__VUEPRESS_SSR__` 条件导入。VitePress 使用 `<ClientOnly>` 处理。

- [ ] **Step 1: 在 theme/index.ts 中添加 UEditor 的客户端仅渲染**

在 `enhanceApp` 中，UEditor 不在初始化时注册（它是异步加载的），改由 demo 文件自行处理。

修改 `theme/index.ts`，在 `enhanceApp` 末尾添加动态导入：

```ts
// UEditor 仅客户端加载
if (!import.meta.env.SSR) {
  import('ct-dart3').then((modules) => {
    if (modules.DartUeditor) {
      app.use(modules.DartUeditor)
    }
  })
}
```

注意：需先确认 `ct-dart3` 的导出中是否包含 `DartUeditor`。如果 ct-dart3 的 `packages/index.ts` 未导出 UEditor，则需要在 workspace 引用后单独处理。

- [ ] **Step 2: 在 ueditor 的 guide 文档中用 ClientOnly 包裹**

编辑 `packages/docs/guide/ueditor.md`，将 `<demo src="ueditor/d1" />` 替换为：

```md
<ClientOnly>
<demo src="ueditor/d1" />
</ClientOnly>
```

对 ueditor 的所有 demo（d1、d2、d3）都做此处理。

- [ ] **Step 3: 提交**

```bash
git add packages/docs/
git commit -m "fix: 处理 UEditor SSR 兼容问题"
```

---

## Task 8: 安装依赖并验证开发服务器

**Files:**
- Modify: `packages/docs/package.json`（已创建）

- [ ] **Step 1: 在根目录运行 pnpm install**

```bash
cd d:/ctProject/ct-dart3
pnpm install
```

预期：pnpm 识别 workspace，链接 `ct-dart3` 到 docs 的 `node_modules`。

- [ ] **Step 2: 验证 workspace 链接**

```bash
ls -la packages/docs/node_modules/ct-dart3
```

预期：应为一个符号链接，指向 `packages/dart3`。

- [ ] **Step 3: 启动 VitePress 开发服务器**

```bash
pnpm dev:docs
```

预期：服务器在 `http://localhost:8081` 启动，VitePress 首页可见。

- [ ] **Step 4: 浏览器验证**

打开 `http://localhost:8081/fd-doc/dart3/`，检查：
1. 首页是否正常渲染（hero 区域 + 更新日志）
2. 侧边栏导航是否显示（指南 + 组件列表）
3. 点击一个组件文档（如 Avatar），确认页面加载
4. 确认 `<demo>` 组件渲染了实时预览

- [ ] **Step 5: 记录问题**

如果启动失败，检查错误信息，可能的问题：
- `ct-dart3` 导入失败 → 检查 workspace 链接和 dart3 的 package.json main/module 字段
- Element Plus 样式缺失 → 检查是否需要 `import 'element-plus/dist/index.css'`
- 组件注册错误 → 检查 ct-dart3 的导出名称是否与导入名称匹配

---

## Task 9: 修复 Demo 组件和样式细节

**Files:**
- Modify: `packages/docs/.vitepress/theme/components/Demo.vue`
- Modify: `packages/docs/.vitepress/theme/style/common.scss`
- Modify: `packages/docs/.vitepress/theme/style/variables.scss`

根据 Task 8 中发现的问题进行修复。

- [ ] **Step 1: 修复 Demo 组件的动态导入路径**

如果 `import.meta.glob` 的路径匹配不正确（因为 .vitepress/theme/components/ 相对路径层级），调整 Demo.vue 中的 glob 路径：

```ts
// 从 .vitepress/theme/components/Demo.vue 出发
// ../../examples/ = packages/docs/examples/
const modules = import.meta.glob('../../../examples/**/*.vue')
const rawModules = import.meta.glob('../../../examples/**/*.vue', {
  eager: true, query: '?raw', import: 'default'
})
const path = `../../../examples/${props.src}.vue`
```

注意：VitePress 中 `.vue` 文件在 markdown 中的导入路径可能需要调整。如果从 markdown 文件的角度解析，路径不同。需要实际测试确认。

- [ ] **Step 2: 添加 Element Plus 样式导入**

如果 Element Plus 样式未加载，在 `theme/index.ts` 顶部添加：

```ts
import 'element-plus/dist/index.css'
```

或在 `style/index.scss` 中导入 Element Plus 的 SCSS：

```scss
@use 'element-plus/theme-chalk/src/index' as *;
```

- [ ] **Step 3: 修复 CSS 变量映射**

根据浏览器中 VitePress 主题的实际颜色，调整 `variables.scss` 中的品牌色变量，确保与原皮肤视觉效果一致。

- [ ] **Step 4: 提交**

```bash
git add packages/docs/.vitepress/
git commit -m "fix: 修复 Demo 组件和样式细节"
```

---

## Task 10: 逐个验证组件文档

**Files:**
- 可能修改: `packages/docs/guide/*.md` 中的个别文件
- 可能修改: `packages/docs/examples/*/*.vue` 中的个别文件

- [ ] **Step 1: 逐个打开所有 22 个组件文档页面，确认渲染正常**

检查清单：
- [ ] avatar.md — 预览 + 源码
- [ ] date-picker.md
- [ ] date-range.md
- [ ] dialog.md
- [ ] drag-tags.md
- [ ] drag-transfer-tree.md
- [ ] drawer.md
- [ ] http.md
- [ ] input.md
- [ ] input-number.md
- [ ] list-temp.md
- [ ] more-condition.md
- [ ] permission.md
- [ ] search.md
- [ ] search2.md
- [ ] select-v2.md
- [ ] state.md
- [ ] table.md
- [ ] textarea-content.md
- [ ] tinymce.md
- [ ] toolbar.md
- [ ] transfer-tree.md
- [ ] ueditor.md（ClientOnly 包裹）
- [ ] quickstart.md（无 demo）
- [ ] css.md（无 demo）

- [ ] **Step 2: 修复 demo 文件中的导入路径问题**

如果 example `.vue` 文件中使用了 `@packages` alias 或相对路径导入 dart3 组件，需要调整。由于 dart3 组件已通过 `ct-dart3` 包全局注册，example 文件通常不需要显式 import 组件，只需在模板中使用 `<dart-xxx>` 标签。

如果 example 文件中有显式 import（如 `import { DartTable } from '@packages/table'`），需替换为：

```ts
import { DartTable } from 'ct-dart3'
```

或直接删除 import（因为组件已全局注册）。

- [ ] **Step 3: 提交修复**

```bash
git add packages/docs/
git commit -m "fix: 修复组件文档 demo 渲染问题"
```

---

## Task 11: 验证构建产物

- [ ] **Step 1: 运行 VitePress 构建**

```bash
pnpm build:docs
```

预期：构建成功，输出到 `packages/docs/.vitepress/dist/`。

- [ ] **Step 2: 预览构建产物**

```bash
pnpm -C packages/docs preview
```

打开预览 URL，确认所有页面正常渲染，包括：
- 首页
- 至少 3 个组件文档页面
- 搜索功能

- [ ] **Step 3: 验证 SSG 输出**

```bash
ls packages/docs/.vitepress/dist/guide/
```

预期：每个 guide 页面都有对应的 `.html` 文件，文件内容包含完整的 HTML（非空壳），利于 AI 爬取。

- [ ] **Step 4: 验证 sitemap**

```bash
cat packages/docs/.vitepress/dist/sitemap.xml | head -20
```

预期：sitemap 包含所有页面的 URL。

---

## Task 12: 清理旧 VuePress 文件

**Files:**
- Delete: `docs/` 整个旧目录

- [ ] **Step 1: 删除旧 docs 目录**

```bash
git rm -r docs/
```

- [ ] **Step 2: 确认删除完成**

```bash
ls docs/ 2>/dev/null && echo "目录仍存在" || echo "已删除"
```

预期输出: `已删除`

- [ ] **Step 3: 提交**

```bash
git add -A
git commit -m "chore: 删除旧 VuePress 文档目录"
```

---

## Task 13: 最终验证与提交

- [ ] **Step 1: 全量安装依赖**

```bash
rm -rf node_modules packages/*/node_modules
pnpm install
```

- [ ] **Step 2: 启动开发服务器做最终确认**

```bash
pnpm dev:docs
```

确认首页、导航、搜索、至少 5 个组件文档正常。

- [ ] **Step 3: 运行构建做最终确认**

```bash
pnpm build:docs
```

确认构建无错误。

- [ ] **Step 4: 确认 dart3 构建不受影响**

```bash
pnpm build:dart3
```

确认组件库构建正常，输出到 `packages/dart3/lib/` 和 `packages/dart3/es/`。

- [ ] **Step 5: 整理提交历史（可选）**

如果需要，可交互式 rebase 压缩提交。或保持当前提交历史作为迁移记录。

---

## 自查结果

### Spec 覆盖检查

| 设计文档章节 | 对应 Task | 状态 |
|-------------|-----------|------|
| 第一节：目录结构重组 | Task 2, 3, 4, 12 | 覆盖 |
| 第二节：VitePress 配置与主题 | Task 5 | 覆盖 |
| 第三节：Demo 展示方案 | Task 5 (Demo.vue), Task 6 | 覆盖 |
| 第四节：SSR 策略 | Task 7, 11 | 覆盖 |
| 第五节：迁移范围与风险 | Task 6-12 | 覆盖 |

### Placeholder 扫描

无 TBD/TODO/后续补充。

### 类型一致性

- `Demo.vue` 中 `props.src` 类型为 `String`，guide md 中 `<demo src="..." />` 传入字符串，一致。
- `theme/index.ts` 中组件导入名称与原 `client.ts` 一致。
- config.ts 中 sidebar 链接路径与 guide/ 下的文件名一致。
