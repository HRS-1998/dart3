# common-btn / upload-file 组件入库实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将根目录的 `common-btn.vue`、`upload-file.vue` 迁入 `packages/dart3` 组件库（适配库内依赖约定），并在 playground 添加测试页面、在 docs 添加演示文档。

**Architecture:** 遵循库内现有组件模式：每组件一个目录（`<name>.vue` + `index.ts` withInstall），注册到 `packages/index.ts`；外部依赖（`showMessage`/`to`/`Bus`/`defineModel`）替换为库内等价实现；playground 与 docs 均通过 vite alias 直接引用库源码，无需构建即可验证。

**Tech Stack:** Vue 3（库目标 ^3.2.0，故不用 defineModel）、Element Plus、Vite、VitePress。

**关键事实（执行者必读）：**
- 组件命名写法：`<script lang="ts">export default { name: 'DartXxx' }</script>` + `<script setup lang="ts">`（参考 `packages/dart3/packages/drag-tags/drag-tags.vue`）
- `showMessage` 已存在于 `packages/dart3/packages/utils/index.ts`（从 `'../utils'` 导入）
- `packages/dart3/es`、`packages/dart3/lib` 已被 gitignore，构建产物不进 git
- playground（端口 5173）与 docs（端口 8081）的 vite alias 均指向 `packages/dart3/packages/index.ts`，改源码即时生效
- 无自动化测试设施，验证方式为 `pnpm -F playground build`、`pnpm -F docs build` 编译验证 + dev server 手动验证
- git 提交命令一律加 `rtk` 前缀（如 `rtk git add ... && rtk git commit -m "..."`）

---

### Task 1: utils 添加 `to` 函数

**Files:**
- Modify: `packages/dart3/packages/utils/index.ts`（文件末尾，`showMessage` 之后追加）

- [ ] **Step 1: 在文件末尾追加 `to` 导出**

在 `packages/dart3/packages/utils/index.ts` 最后一行（`export const showMessage = ...` 函数结尾）之后追加：

```ts
export function to<T, U = any>(
  promise: Promise<T>,
  errorExt?: object
): Promise<[U | null, T | undefined]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err) => {
      if (errorExt) {
        Object.assign(err, errorExt);
      }

      return [err, undefined];
    });
}
```

- [ ] **Step 2: 提交**

```bash
rtk git add packages/dart3/packages/utils/index.ts && rtk git commit -m "feat: utils 新增 to 错误优先 Promise 包装"
```

---

### Task 2: CommonBtn 组件入库

**Files:**
- Create: `packages/dart3/packages/common-btn/common-btn.vue`
- Create: `packages/dart3/packages/common-btn/index.ts`

- [ ] **Step 1: 创建 `common-btn.vue`**

相对根目录源文件的差异（逻辑不变）：
- 删除 `import { showMessage, to } from '@fd/common/utils/index'` 与 `import Bus from '@fd/common/assets/js/bus'`，改为 `import { showMessage, to } from '../utils'`
- 删除 `bindEvents` prop 及其默认值；新增 `refreshTable?: () => void` prop
- `Bus.emit(props.bindEvents)` 改为 `props.refreshTable && props.refreshTable()`
- 增加 `name: 'DartCommonBtn'` 的普通 script 块

完整文件内容：

```vue
<template>
  <el-popconfirm
    placement="top-end"
    v-bind="$attrs"
    :title="title || `确定${name}吗`"
    :hide-after="50"
    ref="popconfirmRef"
    @confirm="handleApi"
  >
    <template #reference>
      <el-button
        :type="type"
        :link="link"
        :icon="btnIcon"
        :loading="loading"
        v-if="!hasAASlot"
      >
        {{ name }}
      </el-button>
      <slot name="custom" :loading="loading"></slot>
    </template>
  </el-popconfirm>
</template>

<script lang="ts">
export default {
  name: 'DartCommonBtn',
};
</script>

<script setup lang="ts">
import { ref, useSlots, computed, onMounted, onUnmounted } from 'vue';
import { showMessage, to } from '../utils';

const props = withDefaults(
  defineProps<{
    type?: string;
    link?: boolean;
    title?: string; // 弹窗提示语
    btnIcon?: any; // icon 图标
    refreshTable?: () => void; // 操作成功后刷新表格回调
    dataMap?: { data: string; code: string };
    code?: number | boolean; // 接口返回 code
    message?: string; // 操作成功提示消息
    name: string; // 按钮名
    params: { [key: string]: any };
    ajax: (params: any) => Promise<any>;
    success?: (name: string) => any; // 成功回调，参数为按钮名称
  }>(),
  {
    type: 'primary',
    link: true,
    code: 0,
    dataMap: () => {
      return { data: 'data', code: 'code' };
    },
  },
);

const hasAASlot = computed(() => {
  const slots = useSlots();

  return !!slots.custom;
});

const loading = ref(false);
const popconfirmRef = ref<any>(null);

// 滚动时立刻关闭 popconfirm（无动画）
const handleScroll = () => {
  const el = popconfirmRef.value?.popperRef?.contentRef;
  if (el) {
    el.style.display = 'none';
    // 禁用动画后隐藏，再恢复动画
    el.style.transition = 'none';
    popconfirmRef.value?.hide?.();
    requestAnimationFrame(() => {
      el.style.transition = '';
    });
  }
};

onMounted(() => {
  // 无界环境下监听 document 和 window
  window.addEventListener('scroll', handleScroll, true);
  const target = (window as any).__POWERED_BY_WUJIE__ ? document : window;
  target.addEventListener('scroll', handleScroll, true);
});

onUnmounted(() => {
  const target = (window as any).__POWERED_BY_WUJIE__ ? document : window;
  target.removeEventListener('scroll', handleScroll, true);

  window.removeEventListener('scroll', handleScroll, true);
});

const handleApi = async () => {
  loading.value = true;
  const [err, res] = await to(props.ajax({ ...props.params })).finally(() => {
    loading.value = false;
  });

  if (err) return;
  if (res[props.dataMap.code] !== props.code) return;
  const msg = props.message ? props.message : `${props.name}成功！`;

  showMessage(msg, 'success');
  setTimeout(() => {
    props.refreshTable && props.refreshTable();
  }, 200);
  props.success && props.success(props.name);
};
</script>

<style lang="scss">
.el-popconfirm__main {
  margin: 0 !important;
}
</style>
```

- [ ] **Step 2: 创建 `index.ts`**

```ts
import { withInstall } from '../utils';
import commonBtn from './common-btn.vue';

export const DartCommonBtn = withInstall(commonBtn);
export default DartCommonBtn;
```

- [ ] **Step 3: 提交**

```bash
rtk git add packages/dart3/packages/common-btn && rtk git commit -m "feat: 新增 CommonBtn 通用确认操作按钮组件"
```

---

### Task 3: UploadFile 组件入库

**Files:**
- Create: `packages/dart3/packages/upload-file/upload-file.vue`
- Create: `packages/dart3/packages/upload-file/index.ts`

- [ ] **Step 1: 创建 `upload-file.vue`**

相对根目录源文件的差异（逻辑不变）：
- `import { showMessage } from '@fd/common/utils'` 改为 `import { showMessage } from '../utils'`
- `defineModel<string>()` 转为 `modelValue` prop + `computed` get/set（emit `update:modelValue`），库目标 vue ^3.2.0 不支持 defineModel（库内现有组件均为此写法）
- 增加 `name: 'DartUploadFile'` 的普通 script 块

完整文件内容：

```vue
<template>
  <el-upload
    ref="uploadRef"
    :file-list="fileList"
    :limit="1"
    :accept="accept"
    :on-exceed="onExceed"
    :on-success="onSuccessFun"
    :on-remove="onRemove"
    :on-progress="onProgress"
    :before-upload="beforeUpload"
    :on-error="onError"
    v-bind="$attrs"
    class="upload-file"
  >
    <template #trigger>
      <el-button :type="type" :link="link" plain>{{ btnName }}</el-button>
    </template>
    <template #file="{ file }">
      <div class="upload-file-row">
        <el-button link :loading="loading" @click="onClickFile">
          <el-icon class="upload-file-doc-icon"><Document /></el-icon>
          <span class="upload-file-name">{{ file?.name || '' }}</span>
        </el-button>
        <span class="upload-file-size" v-if="_fileSize">{{ _fileSize }}</span>
        <el-icon class="upload-file-success"><SuccessFilled /></el-icon>
        <el-icon class="upload-file-remove" @click="onRemove"
          ><Close
        /></el-icon>
      </div>
    </template>
  </el-upload>
</template>

<script lang="ts">
export default {
  name: 'DartUploadFile',
};
</script>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { Close, Document, SuccessFilled } from '@element-plus/icons-vue';
import { showMessage } from '../utils';

const props = withDefaults(
  defineProps<{
    btnName?: string;
    link?: boolean;
    type?: string;
    size?: number;
    maxSize?: number;
    accept?: string;
    modelValue?: string;
    onSuccess?: Function;
    beforeUpload?: Function;
  }>(),
  {
    btnName: '选择文件',
    link: false,
    type: '',
    accept: '.zip,.txt,.csv,.xlsx',
    maxSize: 100 * 1024 * 1024,
    modelValue: '',
  },
);

const emit = defineEmits(['update:modelValue']);

// 等价于 defineModel<string>()（库目标 vue ^3.2.0 不支持）
const fileData = computed<string>({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const uploadRef = ref();
const fileList = ref<any[]>([]);
const loading = ref(false);
const fileSize = ref(0);

const _fileSize = computed(() => {
  const _size = props.size || fileSize.value;
  return _size > 1024 ? `${_size / 1024}M` : `${_size}KB`;
});

watch(
  () => fileData.value,
  (newVal: any) => {
    if (!newVal) return;
    const parts = newVal.split('/');
    fileList.value.push({ name: parts[parts.length - 1] || '', url: newVal });
  },
  { immediate: true },
);

const onExceed = (files: any) => {
  uploadRef.value!.clearFiles();
  const file = files[0];
  uploadRef.value!.handleStart(file);
  uploadRef.value!.submit();
};

const beforeUpload = async (file: File) => {
  const parts = file.name.split('.');
  const type = parts[parts.length - 1];
  setLoading(false);
  if (props.beforeUpload && !(await props.beforeUpload(file))) {
    return false;
  }
  if (!props.accept.includes(type!)) {
    showMessage(`上传文件只支持上传 ${props.accept} 格式`);
    fileData.value = '';
    return false;
  }
  if (file.size / 1024 > props.maxSize) {
    if (props.maxSize >= 1024) {
      showMessage(`上传文件大小不能超过${props.maxSize / 1024}MB`);
    } else {
      showMessage(`上传文件大小不能超过${props.maxSize}KB`);
    }
    fileData.value = '';
    return false;
  }
  fileSize.value = file.size / 1024;
  return true;
};

const onSuccessFun = (res: any) => {
  const { code, data, message } = res;
  setLoading(false);
  if ((props.onSuccess && !props.onSuccess(res)) || code) {
    showMessage(message);
    onRemove();
    return;
  }
  if (props.onSuccess) return;
  fileData.value = data;
};

const onRemove = () => {
  setLoading(false);
  fileData.value = '';
  uploadRef.value!.clearFiles();
};

const onProgress = () => {
  setLoading(true);
};

const onError = () => {
  setLoading(false);
};

const setLoading = (bool: boolean) => {
  loading.value = bool;
};

const onClickFile = () => {
  window.open(fileData.value);
};
</script>

<style lang="scss">
.upload-file {
  display: inline-flex;
  align-items: center;

  .el-upload-list {
    display: inline-flex;
    align-items: center;
    margin-left: 8px;
    margin-top: 0;
  }

  .el-upload-list__item {
    transition: none;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin: 0;
    padding: 0;
  }

  .upload-file-name {
    font-size: 13px;
    color: #303133;
  }

  .upload-file-size {
    font-size: 12px;
    color: #909399;
    margin-left: 20px;
  }

  .upload-file-success {
    color: #67c23a;
    margin-left: 20px;
  }

  .upload-file-remove {
    cursor: pointer;
    color: #909399;
    margin-left: 20px;
    &:hover {
      color: #f56c6c;
    }
  }

  .upload-file-doc-icon {
    margin-right: 5px;
  }

  .upload-file-row {
    display: flex;
    align-items: center;
    width: 100%;
  }
}
</style>
```

- [ ] **Step 2: 创建 `index.ts`**

```ts
import { withInstall } from '../utils';
import uploadFile from './upload-file.vue';

export const DartUploadFile = withInstall(uploadFile);
export default DartUploadFile;
```

- [ ] **Step 3: 提交**

```bash
rtk git add packages/dart3/packages/upload-file && rtk git commit -m "feat: 新增 UploadFile 单文件上传组件"
```

---

### Task 4: 注册到组件库入口

**Files:**
- Modify: `packages/dart3/packages/index.ts`
- Modify: `packages/dart3/package.json`（版本号 2.1.11 → 2.1.12，遵循仓库按 feature 升版本的惯例）

- [ ] **Step 1: `packages/index.ts` 三处新增**

import 区（第 2 行 `import Input from './input';` 之前）加：

```ts
import CommonBtn from './common-btn';
import UploadFile from './upload-file';
```

`components` 数组（`Input,` 之前）加：

```ts
  CommonBtn,
  UploadFile,
```

底部 `export {`（`Input,` 之前）加：

```ts
  CommonBtn,
  UploadFile,
```

- [ ] **Step 2: `package.json` 版本号改为 `2.1.12`**

- [ ] **Step 3: 提交**

```bash
rtk git add packages/dart3/packages/index.ts packages/dart3/package.json && rtk git commit -m "feat: 2.1.12 注册 CommonBtn/UploadFile 组件"
```

---

### Task 5: Playground 测试页面

**Files:**
- Create: `packages/playground/src/views/CommonBtnDemo.vue`
- Create: `packages/playground/src/views/UploadFileDemo.vue`
- Modify: `packages/playground/src/router.ts`

- [ ] **Step 1: 创建 `CommonBtnDemo.vue`**

组件经 `app.use(ctDart3)` 全局注册，模板用 `<dart-common-btn>`（参考 `main.ts`）。

```vue
<template>
  <div style="padding: 20px; display: flex; flex-direction: column; gap: 20px">
    <div>
      <h3>成功场景（code=0，触发 refreshTable）</h3>
      <dart-common-btn name="删除" :params="{ id: 1 }" :ajax="successApi" :refresh-table="onRefresh" />
    </div>

    <div>
      <h3>失败场景（code=1，静默不触发回调）</h3>
      <dart-common-btn name="禁用" :params="{ id: 2 }" :ajax="failApi" :refresh-table="onRefresh" />
    </div>

    <div>
      <h3>custom 插槽 + 自定义成功提示</h3>
      <dart-common-btn name="启用" :params="{ id: 3 }" :ajax="successApi" message="已启用" :refresh-table="onRefresh">
        <template #custom="{ loading }">
          <el-button type="danger" :loading="loading">自定义启用按钮</el-button>
        </template>
      </dart-common-btn>
    </div>

    <el-alert v-if="refreshCount" :title="`refreshTable 已触发 ${refreshCount} 次`" type="success" :closable="false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const refreshCount = ref(0);

const successApi = () =>
  new Promise((resolve) => setTimeout(() => resolve({ code: 0, data: null }), 800));

const failApi = () =>
  new Promise((resolve) => setTimeout(() => resolve({ code: 1, message: '操作失败' }), 800));

const onRefresh = () => {
  refreshCount.value++;
};
</script>
```

- [ ] **Step 2: 创建 `UploadFileDemo.vue`**

用 `http-request` 自定义上传函数 mock 接口（el-upload 约定：自定义请求需自行调用 `opt.onSuccess` 才会走组件的 `on-success` 回调）。

```vue
<template>
  <div style="padding: 20px; display: flex; flex-direction: column; gap: 20px">
    <div>
      <h3>默认用法（mock 上传接口）</h3>
      <dart-upload-file v-model="url" :http-request="mockUpload" />
      <p>当前文件地址：{{ url || '无' }}</p>
    </div>

    <div>
      <h3>自定义按钮文案与大小限制（2MB）</h3>
      <dart-upload-file
        v-model="url2"
        btn-name="上传附件"
        :max-size="2 * 1024"
        accept=".zip,.txt"
        :http-request="mockUpload"
      />
      <p>当前文件地址：{{ url2 || '无' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const url = ref('');
const url2 = ref('');

const mockUpload = (opt: any) => {
  setTimeout(() => {
    opt.onSuccess({
      code: 0,
      data: `https://mock.example.com/files/${encodeURIComponent(opt.file.name)}`,
    });
  }, 800);
};
</script>
```

- [ ] **Step 3: `router.ts` 新增路由**

在 `routes` 数组末尾（`multitags` 之后）加：

```ts
  { path: '/common-btn', name: 'CommonBtn', component: () => import('./views/CommonBtnDemo.vue') },
  { path: '/upload-file', name: 'UploadFile', component: () => import('./views/UploadFileDemo.vue') },
```

- [ ] **Step 4: 编译验证**

```bash
pnpm -F playground build
```

Expected: 构建成功，无 TypeScript / 编译错误。

- [ ] **Step 5: 提交**

```bash
rtk git add packages/playground/src && rtk git commit -m "feat: playground 新增 CommonBtn/UploadFile 测试页"
```

---

### Task 6: Docs 演示文档

**Files:**
- Create: `packages/docs/examples/common-btn/d1.vue`
- Create: `packages/docs/examples/common-btn/d2.vue`
- Create: `packages/docs/examples/upload-file/d1.vue`
- Create: `packages/docs/guide/common-btn.md`
- Create: `packages/docs/guide/upload-file.md`
- Modify: `packages/docs/.vitepress/config.ts`（sidebar「组件」组）

- [ ] **Step 1: 创建 `examples/common-btn/d1.vue`**

```vue
<template>
  <dart-common-btn name="删除" :params="{ id: 1 }" :ajax="mockAjax" :refresh-table="onRefresh" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const count = ref(0);

const mockAjax = () =>
  new Promise((resolve) => setTimeout(() => resolve({ code: 0, data: null }), 800));

const onRefresh = () => {
  count.value++;
};
</script>
```

- [ ] **Step 2: 创建 `examples/common-btn/d2.vue`**

```vue
<template>
  <dart-common-btn name="启用" :params="{ id: 1 }" :ajax="mockAjax" message="自定义成功提示">
    <template #custom="{ loading }">
      <el-button type="danger" :loading="loading">自定义按钮</el-button>
    </template>
  </dart-common-btn>
</template>

<script lang="ts" setup>
const mockAjax = () =>
  new Promise((resolve) => setTimeout(() => resolve({ code: 0, data: null }), 800));
</script>
```

- [ ] **Step 3: 创建 `examples/upload-file/d1.vue`**

```vue
<template>
  <dart-upload-file v-model="url" :http-request="mockUpload" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const url = ref('');

const mockUpload = (opt: any) => {
  setTimeout(() => {
    opt.onSuccess({
      code: 0,
      data: `https://mock.example.com/files/${encodeURIComponent(opt.file.name)}`,
    });
  }, 800);
};
</script>
```

- [ ] **Step 4: 创建 `guide/common-btn.md`**

````markdown
# CommonBtn 通用确认操作按钮

## 通用确认操作按钮介绍

描述：带 el-popconfirm 二次确认的操作按钮，确认后调用接口，成功后提示并可触发刷新回调
版本：2.1.12
功能：二次确认、接口调用、loading、成功提示、自定义按钮插槽

## 属性

| 属性 | 类型 | 默认值 | 描述 | 版本 |
| :-- | :-- | :-- | :-- | :-- |
| `name` | `string` | -（必填） | 按钮名/操作名 | 2.1.12 |
| `params` | `{ [key: string]: any }` | -（必填） | 接口请求参数 | 2.1.12 |
| `ajax` | `(params: any) => Promise<any>` | -（必填） | 接口请求函数 | 2.1.12 |
| `type` | `string` | `primary` | 按钮类型 | 2.1.12 |
| `link` | `boolean` | `true` | 是否链接按钮 | 2.1.12 |
| `title` | `string` | `确定${name}吗` | 确认弹窗提示语 | 2.1.12 |
| `btnIcon` | `any` | - | 按钮图标 | 2.1.12 |
| `code` | `number \| boolean` | `0` | 接口成功返回的 code 值 | 2.1.12 |
| `dataMap` | `{ data: string; code: string }` | `{ data: 'data', code: 'code' }` | 接口返回字段映射 | 2.1.12 |
| `message` | `string` | `${name}成功！` | 成功提示消息 | 2.1.12 |
| `refreshTable` | `() => void` | - | 成功提示 200ms 后的刷新回调 | 2.1.12 |
| `success` | `(name: string) => any` | - | 成功回调，参数为按钮名 | 2.1.12 |

## 插槽

| 插槽名称 | 作用域 | 描述 | 版本 |
| :-- | :-- | :-- | :-- |
| `custom` | `loading` | 自定义按钮内容（传入后替换默认按钮） | 2.1.12 |

##### 使用示例

1: 默认使用

<demo src="common-btn/d1" />

2: 自定义按钮插槽

<demo src="common-btn/d2" />
````

- [ ] **Step 5: 创建 `guide/upload-file.md`**

````markdown
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
````

- [ ] **Step 6: `config.ts` sidebar 新增两项**

在「组件」组 items 中：
- `{ text: 'Avatar 头像上传', link: '/guide/avatar' },` 之前加：

```ts
            { text: 'CommonBtn 通用操作按钮', link: '/guide/common-btn' },
```

- `{ text: 'UEditor 百度编辑器', link: '/guide/ueditor' }` 之后加（注意给 UEditor 行补逗号）：

```ts
            { text: 'UploadFile 文件上传', link: '/guide/upload-file' }
```

- [ ] **Step 7: 编译验证**

```bash
pnpm -F docs build
```

Expected: vitepress build 成功（demo 组件在 SSR 阶段编译通过）。

- [ ] **Step 8: 提交**

```bash
rtk git add packages/docs && rtk git commit -m "doc: 新增 CommonBtn/UploadFile 组件文档"
```

---

### Task 7: 端到端验证与源文件清理

- [ ] **Step 1: 启动 playground dev server 手动验证**

```bash
pnpm -F playground dev
```

浏览器验证：
- `#/common-btn`：三个按钮场景 —— 成功场景出现确认气泡 → 点击确认 → loading 800ms → 成功提示 → 200ms 后出现 alert 计数；失败场景确认后无提示无回调；custom 插槽渲染红色按钮且 loading 正常
- `#/upload-file`：选择非 accept 格式文件（如 .png）→ 提示格式错误；选择 .txt 上传 → 800ms loading → 回显文件名/大小/成功图标 → `url` 更新 → 点击文件名打开 mock 地址 → 点 × 移除后 url 清空

- [ ] **Step 2: 启动 docs dev server 手动验证**

```bash
pnpm -F docs dev
```

浏览器验证：sidebar 出现两项新链接，两个页面 demo 正常渲染交互。

- [ ] **Step 3: 删除根目录源文件（向用户确认后执行）**

```bash
rm common-btn.vue upload-file.vue
rtk git status
```

Expected: 两个未跟踪文件消失，无其他变更。

- [ ] **Step 4: 最终提交（如有残留变更）**

```bash
rtk git add -A && rtk git commit -m "chore: 移除根目录已入库的组件源文件"
```
