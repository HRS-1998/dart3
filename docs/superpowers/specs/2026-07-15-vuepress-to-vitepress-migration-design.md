---
name: vuepress-to-vitepress-migration
description: 将 ct-dart3 组件库文档从 VuePress 2 迁移到 VitePress，并重构为 monorepo 架构
---

# VuePress → VitePress 迁移设计

## 背景

ct-dart3 是一个基于 Vue 3 + Element Plus 的组件库，包含 27 个组件。其文档站点运行在 VuePress 2 beta.51 上，使用了自定义 demo-block 插件和组件源码的本地拷贝。本次迁移的目标：

- 提升构建性能（VitePress 基于 Vite，速度显著更快）
- 采用更现代的默认主题，内置暗色模式和搜索
- 迁移到维护更活跃的生态（VuePress 2 仍为 beta）
- 启用 SSR/SSG，支持 RAG 知识库和 AI 爬取
- 重构为 pnpm monorepo，实现更清晰的依赖管理

## 方案：Monorepo + VitePress（方案 C）

在三种候选方案中选择此方案，优于原地替换（方案 A）和并行双系统（方案 B）。monorepo 方案通过 workspace 协议实现源码自动链接，彻底消除手动拷贝同步的问题。

## 第一节：目录结构重组

### 当前结构

```
ct-dart3/
├── dart3/          # 组件库源码
├── docs/           # VuePress 文档
```

### 目标结构

```
ct-dart3/
├── packages/
│   ├── dart3/      # 组件库（当前 dart3/ 的内容整体移入）
│   └── docs/       # VitePress 文档（基于当前 docs/ 重构）
├── pnpm-workspace.yaml
├── package.json    # 根 workspace 配置
└── .npmrc          # pnpm 配置
```

### 根目录配置

**pnpm-workspace.yaml**:
```yaml
packages:
  - 'packages/*'
```

**根 package.json**:
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

**.npmrc**:
```
shamefully-hoist=true
```

### Workspace 依赖

`packages/docs/package.json` 通过 workspace 协议引用 dart3：
```json
{
  "dependencies": {
    "ct-dart3": "workspace:*"
  }
}
```

这样不再需要 `.vuepress/assets/packages/` 的本地拷贝，文档直接从 `ct-dart3` 包导入。

## 第二节：VitePress 配置与主题

### 配置文件（`.vitepress/config.ts`）

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
          items: [{ text: '快速上手', link: '/guide/quickstart' }]
        },
        {
          text: '组件',
          items: [
            { text: 'Avatar', link: '/guide/avatar' },
            { text: 'Table', link: '/guide/table' },
            // ... 全部 27 个组件
          ]
        }
      ]
    },
    search: { provider: 'local' }
  },

  vite: {
    resolve: {
      alias: {
        '@packages': '../dart3/packages'
      }
    }
  }
})
```

### 主题（`.vitepress/theme/index.ts`）

替代 `.vuepress/client.ts`：

```ts
import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as DartComponents from 'ct-dart3'
import Demo from './components/Demo.vue'
import './style/index.scss'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElementPlus, { zIndex: 3000, locale: zhCn })
    app.use(DartComponents)
    // Permission 和 Http 配置（同原 client.ts）
  }
}
```

### 主题定制

- `skin.scss` 色板 → 映射为 VitePress CSS 变量（`--vp-c-brand`、`--vp-c-brand-light` 等）
- `common.scss` 通用样式 → `.vitepress/theme/style/common.scss`
- 自定义字体（CT-SourceHanSans）→ 通过 `head` 配置或 CSS `@font-face` 加载

## 第三节：Demo 展示方案

### 当前：`@ddongui/vuepress-plugin-demo-block`

自定义 VuePress 插件，在 markdown 中渲染 `.vue` demo 文件，包含预览和可折叠源码。

### 目标：VitePress 原生组件

**`<Demo>` 组件**（`.vitepress/theme/components/Demo.vue`）：

- 接收 `src` 属性，指向 `.vue` 示例文件路径
- 将组件渲染为实时预览
- 在可折叠区域展示源码，带语法高亮
- 使用 Vite 的 `import.meta.glob` 实现动态导入

**在 markdown 中的使用方式**：
```md
# Table 表格

带分页的表格组件。

## 基础用法

<demo src="../../examples/table/d1.vue" />

## API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
```

**源码展示**：通过 Vite 的 `?raw` 导入读取 `.vue` 文件内容，使用 VitePress 内置代码高亮渲染。

**无需自定义 markdown 插件** — VitePress 原生支持在 markdown 中使用 Vue 组件。

## 第四节：SSR 策略与 RAG/AI 爬取支持

### 默认：SSG 启用

VitePress 在构建时为每个页面生成完整的静态 HTML，这是默认行为，无需额外配置。

### 仅客户端组件

依赖浏览器 API 的组件（UEditor、Tinymce）必须用 `<ClientOnly>` 包裹：

```vue
<ClientOnly>
  <Ueditor />
</ClientOnly>
```

在 demo 文件中同样适用。`<Demo>` 组件应对已知的仅客户端组件自动处理。

### SSR 开关

如果 SSR 导致大范围问题，可在配置中设置 `ssr: false` 关闭。建议：保持 SSR 开启，仅对问题组件用 `<ClientOnly>` 隔离。

### RAG/AI 爬取收益

- 每个页面输出完整语义化 HTML（无需 JS 渲染即可获取内容）
- Sitemap 自动生成，方便爬虫发现
- 清晰的 URL 结构，便于内容索引
- Meta 标签提供内容描述

## 第五节：迁移范围与风险

### 需要迁移的内容

| 类别 | 来源 | 目标 | 处理方式 |
|------|------|------|----------|
| 配置 | `.vuepress/config.ts` | `.vitepress/config.ts` | 重写为 VitePress defineConfig |
| 客户端设置 | `.vuepress/client.ts` | `.vitepress/theme/index.ts` | enhanceApp 模式 |
| 主题样式 | `skin.scss` + `common.scss` | `.vitepress/theme/style/` | 映射为 CSS 变量 + 自定义样式 |
| 源码拷贝 | `.vuepress/assets/packages/` | 删除 | 由 workspace 引用替代 |
| Demo 插件 | `@ddongui/vuepress-plugin-demo-block` | 自定义 `<Demo>` 组件 | 重新实现 |
| 组件文档 | 22 个 `guide/*.md` 文件 | 同一位置 | 语法调整（demo-block → `<demo>`） |
| 示例文件 | 22 个 `examples/*/d*.vue` | 同一位置 | 导入路径调整 |
| 首页 | `README.md`（更新日志） | `index.md` | VitePress frontmatter 格式 |

### 需要删除的内容

- `.vuepress/.cache/` 和 `.vuepress/.temp/`
- `vuepress` 依赖
- `vuepress2-plugin-demo-block` 依赖
- `@ddongui/vuepress-plugin-demo-block` 依赖
- `@vuepress/plugin-register-components` 依赖
- `.vuepress/assets/packages/` 本地拷贝

### 主要风险

1. **dart3 目录移动** → 所有构建脚本（vue.config.js、rollup.config.js）中的相对路径需要更新
2. **组件 SSR 兼容性** → 部分组件可能 SSR 报错，需逐个用 `<ClientOnly>` 隔离
3. **Demo 导入路径** → 目录重组后，示例 `.vue` 文件中对 dart3 组件的引用路径需要调整
4. **Element Plus SSR** → Element Plus 有已知的 SSR 注意事项，可能需要 `ssr.noExternal` 配置

### 回滚策略

- 在独立分支上执行迁移
- 保留原始 VuePress 版本，直到 VitePress 版本完全验证通过
- 仅在全部 27 个组件文档正确渲染（含实时 demo）后才合并
