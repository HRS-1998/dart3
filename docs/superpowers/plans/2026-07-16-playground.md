# Playground 测试项目实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**目标：** 在 `packages/playground/` 下创建 Vue 3 + Vite + TypeScript 测试项目，通过 workspace 引用 ct-dart3 组件库，侧边栏导航 + 每个组件独立页面。

**架构：** Vite SPA + vue-router hash 模式。左侧边栏列出所有组件，右侧展示组件 demo。ct-dart3 通过 `workspace:*` 引用，Vite 别名指向源码实现 HMR。

**技术栈：** Vue 3, Vite, TypeScript, vue-router, Element Plus, ct-dart3

---

### 任务 1：创建 playground package.json 并安装依赖

**文件：**
- 创建：`packages/playground/package.json`

- [ ] **步骤 1：创建 package.json**

```json
{
  "name": "playground",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@element-plus/icons-vue": "^2.0.9",
    "ct-dart3": "workspace:*",
    "element-plus": "^2.11.4",
    "vue": "^3.5.0",
    "vue-router": "^4.4.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.2.0",
    "typescript": "~5.5.0",
    "vite": "^6.0.0"
  }
}
```

- [ ] **步骤 2：安装依赖**

运行：`cd d:/ctProject/ct-dart3 && pnpm install`

- [ ] **步骤 3：提交**

```bash
git add packages/playground/package.json pnpm-lock.yaml
git commit -m "feat(playground): 添加 package.json 和依赖"
```

---

### 任务 2：创建 Vite 配置和 tsconfig

**文件：**
- 创建：`packages/playground/vite.config.ts`
- 创建：`packages/playground/tsconfig.json`

- [ ] **步骤 1：创建 vite.config.ts**

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'ct-dart3': resolve(__dirname, '../dart3/packages/index.ts')
    }
  },
  server: {
    port: 5173,
    open: true
  }
})
```

- [ ] **步骤 2：创建 tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "preserve",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "lib": ["esnext", "dom", "dom.iterable"],
    "baseUrl": ".",
    "paths": {
      "ct-dart3": ["../dart3/packages/index.ts"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"],
  "exclude": ["node_modules"]
}
```

- [ ] **步骤 3：提交**

```bash
git add packages/playground/vite.config.ts packages/playground/tsconfig.json
git commit -m "feat(playground): 添加 Vite 配置和 tsconfig"
```

---

### 任务 3：创建 index.html 和 main.ts

**文件：**
- 创建：`packages/playground/index.html`
- 创建：`packages/playground/src/main.ts`

- [ ] **步骤 1：创建 index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ct-dart3 Playground</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

- [ ] **步骤 2：创建 main.ts**

```ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ctDart3 from 'ct-dart3'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(ElementPlus, { zIndex: 3000, locale: zhCn })
app.use(ctDart3)
app.use(router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
```

- [ ] **步骤 3：提交**

```bash
git add packages/playground/index.html packages/playground/src/main.ts
git commit -m "feat(playground): 添加 index.html 和 main.ts"
```

---

### 任务 4：创建路由配置

**文件：**
- 创建：`packages/playground/src/router.ts`

- [ ] **步骤 1：创建 router.ts**

```ts
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/table' },
  { path: '/table', name: 'Table', component: () => import('./views/TableDemo.vue') },
  { path: '/dialog', name: 'Dialog', component: () => import('./views/DialogDemo.vue') },
  { path: '/drawer', name: 'Drawer', component: () => import('./views/DrawerDemo.vue') },
  { path: '/search', name: 'Search', component: () => import('./views/SearchDemo.vue') },
  { path: '/search2', name: 'Search2', component: () => import('./views/Search2Demo.vue') },
  { path: '/avatar', name: 'Avatar', component: () => import('./views/AvatarDemo.vue') },
  { path: '/input', name: 'Input', component: () => import('./views/InputDemo.vue') },
  { path: '/input-number', name: 'InputNumber', component: () => import('./views/InputNumberDemo.vue') },
  { path: '/date-picker', name: 'DatePicker', component: () => import('./views/DatePickerDemo.vue') },
  { path: '/date-range', name: 'DateRange', component: () => import('./views/DateRangeDemo.vue') },
  { path: '/list-temp', name: 'ListTemp', component: () => import('./views/ListTempDemo.vue') },
  { path: '/more-condition', name: 'MoreCondition', component: () => import('./views/MoreConditionDemo.vue') },
  { path: '/transfer-tree', name: 'TransferTree', component: () => import('./views/TransferTreeDemo.vue') },
  { path: '/drag-tags', name: 'DragTags', component: () => import('./views/DragTagsDemo.vue') },
  { path: '/drag-transfer-tree', name: 'DragTransferTree', component: () => import('./views/DragTransferTreeDemo.vue') },
  { path: '/toolbar', name: 'Toolbar', component: () => import('./views/ToolbarDemo.vue') },
  { path: '/permission', name: 'Permission', component: () => import('./views/PermissionDemo.vue') },
  { path: '/textarea-content', name: 'TextareaContent', component: () => import('./views/TextareaContentDemo.vue') },
  { path: '/state', name: 'State', component: () => import('./views/StateDemo.vue') },
  { path: '/select-v2', name: 'SelectV2', component: () => import('./views/SelectV2Demo.vue') },
  { path: '/http', name: 'Http', component: () => import('./views/HttpDemo.vue') },
]

export const navItems = routes.filter(r => r.path !== '/')

export default createRouter({
  history: createWebHashHistory(),
  routes
})
```

- [ ] **步骤 2：提交**

```bash
git add packages/playground/src/router.ts
git commit -m "feat(playground): 添加路由配置"
```

---

### 任务 5：创建 App.vue 侧边栏布局

**文件：**
- 创建：`packages/playground/src/App.vue`

- [ ] **步骤 1：创建 App.vue**

```vue
<template>
  <el-container style="height: 100vh">
    <el-aside width="200px" style="border-right: 1px solid #e6e6e6; overflow-y: auto">
      <h3 style="padding: 16px; margin: 0; text-align: center">ct-dart3</h3>
      <el-menu :default-active="currentRoute" router>
        <el-menu-item v-for="item in navItems" :key="item.path" :index="item.path">
          {{ item.name }}
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main style="overflow-y: auto; padding: 24px">
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { navItems } from './router'

const route = useRoute()
const currentRoute = computed(() => route.path)
</script>
```

- [ ] **步骤 2：提交**

```bash
git add packages/playground/src/App.vue
git commit -m "feat(playground): 添加 App.vue 侧边栏布局"
```

---

### 任务 6：创建所有组件 Demo 页面

**文件：**
- 创建：`packages/playground/src/views/TableDemo.vue`
- 创建：`packages/playground/src/views/DialogDemo.vue`
- 创建：`packages/playground/src/views/DrawerDemo.vue`
- 创建：其余所有 demo 页面

- [ ] **步骤 1：创建 TableDemo.vue**（最复杂的组件，提供有意义的演示）

```vue
<template>
  <h2>Table 表格</h2>
  <dart-table :data="tableData" style="width: 100%">
    <dart-table-column prop="name" label="姓名" />
    <dart-table-column prop="age" label="年龄" />
    <dart-table-column prop="address" label="地址" />
  </dart-table>
</template>

<script setup lang="ts">
const tableData = [
  { name: '张三', age: 28, address: '北京市朝阳区' },
  { name: '李四', age: 32, address: '上海市浦东新区' },
  { name: '王五', age: 25, address: '广州市天河区' },
]
</script>
```

- [ ] **步骤 2：创建 DialogDemo.vue**

```vue
<template>
  <h2>Dialog 对话框</h2>
  <el-button @click="visible = true">打开对话框</el-button>
  <dart-dialog v-model="visible" title="测试对话框">
    <p>对话框内容</p>
  </dart-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
</script>
```

- [ ] **步骤 3：创建 DrawerDemo.vue**

```vue
<template>
  <h2>Drawer 抽屉</h2>
  <el-button @click="visible = true">打开抽屉</el-button>
  <dart-drawer v-model="visible" title="测试抽屉">
    <p>抽屉内容</p>
  </dart-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
</script>
```

- [ ] **步骤 4：创建 SearchDemo.vue**

```vue
<template>
  <h2>Search 搜索</h2>
  <dart-search :model="searchForm" @search="onSearch">
    <dart-search-item prop="keyword" label="关键词">
      <el-input v-model="searchForm.keyword" placeholder="请输入" />
    </dart-search-item>
  </dart-search>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
const searchForm = reactive({ keyword: '' })
const onSearch = () => console.log('search', searchForm)
</script>
```

- [ ] **步骤 5：创建 Search2Demo.vue**

```vue
<template>
  <h2>Search2 搜索V2</h2>
  <p>Search2 组件演示（需根据业务配置）</p>
</template>
```

- [ ] **步骤 6：创建 AvatarDemo.vue**

```vue
<template>
  <h2>Avatar 头像上传</h2>
  <dart-avatar v-model="avatarUrl" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const avatarUrl = ref('')
</script>
```

- [ ] **步骤 7：创建 InputDemo.vue**

```vue
<template>
  <h2>Input 输入框</h2>
  <dart-input v-model="value" placeholder="请输入" />
  <p style="margin-top: 8px">值: {{ value }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>
```

- [ ] **步骤 8：创建 InputNumberDemo.vue**

```vue
<template>
  <h2>InputNumber 数字输入框</h2>
  <dart-input-number v-model="value" />
  <p style="margin-top: 8px">值: {{ value }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(0)
</script>
```

- [ ] **步骤 9：创建 DatePickerDemo.vue**

```vue
<template>
  <h2>DatePicker 日期选择</h2>
  <dart-date-picker v-model="value" />
  <p style="margin-top: 8px">值: {{ value }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>
```

- [ ] **步骤 10：创建 DateRangeDemo.vue**

```vue
<template>
  <h2>DateRange 日期范围</h2>
  <dart-date-range v-model:start="start" v-model:end="end" />
  <p style="margin-top: 8px">开始: {{ start }}，结束: {{ end }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const start = ref('')
const end = ref('')
</script>
```

- [ ] **步骤 11：创建 ListTempDemo.vue**

```vue
<template>
  <h2>ListTemp 列表模板</h2>
  <p>ListTemp 组件演示（需根据业务配置）</p>
</template>
```

- [ ] **步骤 12：创建 MoreConditionDemo.vue**

```vue
<template>
  <h2>MoreCondition 更多条件</h2>
  <p>MoreCondition 组件演示（需根据业务配置）</p>
</template>
```

- [ ] **步骤 13：创建 TransferTreeDemo.vue**

```vue
<template>
  <h2>TransferTree 穿梭树</h2>
  <p>TransferTree 组件演示（需根据业务配置）</p>
</template>
```

- [ ] **步骤 14：创建 DragTagsDemo.vue**

```vue
<template>
  <h2>DragTags 拖拽标签</h2>
  <dart-drag-tags v-model="tags" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const tags = ref([
  { id: 1, label: '标签一' },
  { id: 2, label: '标签二' },
  { id: 3, label: '标签三' },
])
</script>
```

- [ ] **步骤 15：创建 DragTransferTreeDemo.vue**

```vue
<template>
  <h2>DragTransferTree 拖拽穿梭树</h2>
  <p>DragTransferTree 组件演示（需根据业务配置）</p>
</template>
```

- [ ] **步骤 16：创建 ToolbarDemo.vue**

```vue
<template>
  <h2>Toolbar 工具栏</h2>
  <p>Toolbar 组件演示（需根据业务配置）</p>
</template>
```

- [ ] **步骤 17：创建 PermissionDemo.vue**

```vue
<template>
  <h2>Permission 权限</h2>
  <p>Permission 组件演示（需根据业务配置）</p>
</template>
```

- [ ] **步骤 18：创建 TextareaContentDemo.vue**

```vue
<template>
  <h2>TextareaContent 文本域</h2>
  <dart-textarea-content v-model="value" />
  <p style="margin-top: 8px">值: {{ value }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>
```

- [ ] **步骤 19：创建 StateDemo.vue**

```vue
<template>
  <h2>State 状态</h2>
  <dart-state :data="states" />
</template>

<script setup lang="ts">
const states = [
  { label: '待处理', value: 1, type: 'warning' },
  { label: '已完成', value: 2, type: 'success' },
]
</script>
```

- [ ] **步骤 20：创建 SelectV2Demo.vue**

```vue
<template>
  <h2>SelectV2 选择器V2</h2>
  <dart-select-v2 v-model="value" :options="options" />
  <p style="margin-top: 8px">值: {{ value }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
]
</script>
```

- [ ] **步骤 21：创建 HttpDemo.vue**

```vue
<template>
  <h2>Http 请求封装</h2>
  <p>Http 组件演示（需根据业务配置）</p>
</template>
```

- [ ] **步骤 22：提交**

```bash
git add packages/playground/src/views/
git commit -m "feat(playground): 添加所有组件 Demo 页面"
```

---

### 任务 7：添加根目录工作区脚本并验证

**文件：**
- 修改：`package.json`（根目录）

- [ ] **步骤 1：在根 package.json 中添加 dev:playground 脚本**

添加 `"dev:playground": "pnpm -C packages/playground dev"` 到 scripts。

- [ ] **步骤 2：验证开发服务器启动**

运行：`cd d:/ctProject/ct-dart3 && pnpm dev:playground`
预期：Vite 开发服务器在 5173 端口启动，浏览器自动打开

- [ ] **步骤 3：提交**

```bash
git add package.json
git commit -m "feat(playground): 添加 dev:playground 工作区脚本"
```
