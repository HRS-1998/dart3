# 组件库问题清单

> 🟢 已解决  🔴 未解决

---

## P0 — 必须修复的 Bug 和内存泄漏

### http.ts

- 🔴 `lowercasekey` 为 true 时 Promise 双重 resolve，缺少 `return`（行 147-150）
- 🔴 reject 后未 return，导致既 reject 又 resolve（行 146）
- 🔴 `emptyFn()` 误加括号，`_back` 为 `undefined` 而非函数引用（行 187）
- 🔴 catch 中用 `back` 而非 `_back`，当 back 不是函数时会崩溃（行 206）
- 🔴 每次请求创建新 axios 实例，旧实例未清理（行 28）
- 🔴 模块级 `isInterceptors` 被单个请求修改，影响并发请求（行 11-12）
- 🔴 `for...in` 遍历未检查 `hasOwnProperty`，且 `obj[i] || interceptor[i]` 短路逻辑会错误处理 falsy 值（行 260-264）
- 🔴 `var defaultConfig` 应使用 `const`（行 13）
- 🔴 `/* eslint-disable */` 全局禁用 lint，应针对性禁用（行 1）
- 🔴 `axios.spread` 已弃用，`all` 函数使用 `arguments` 过于复杂（行 195）
- 🔴 `any` 类型泛滥，全文件无类型安全

### table/table.vue

- 🔴 CSS `display: inline-` 语法错误，树形展开图标样式无效（行 289）
- 🔴 `<style>` 缺少 `scoped`，样式全局泄漏（行 272）
- 🔴 大量 `!important` 滥用，树形展开图标样式超过 20 处（行 281-341）

### table/SettingColumnDialog.vue

- 🔴 `v-else="item.headerSlot"` 语法无效，`v-else` 不接受值（行 30）
- 🔴 `<style>` 缺少 `scoped`，样式全局泄漏（行 159）
- 🔴 `document.querySelector('.column-checkbox-group')` 多实例时获取到错误元素（行 87）
- 🔴 依赖 `item.label` 作为 checkbox value，相同 label 列无法区分（行 131, 75）

### table/column.vue

- 🔴 `<style>` 缺少 `scoped`，样式全局泄漏（行 450）
- 🔴 `document.execCommand('copy')` 已废弃 API（行 432）
- 🔴 ResizeObserver/MutationObserver 在行索引变化时可能未清理（行 197-283）
- 🔴 `reactive<Record<number, boolean>>({})` 行数多时 key 不断累积不会自动清理（行 195）
- 🔴 `useFuns` 系列函数未校验输入，`undefined`/`null` 会显示 "NaN"（行 307-373）

### table/use-drag.ts

- 🔴 `deep: true` 监听整个数据数组，大表格性能差（行 56-64）
- 🔴 `data.value.splice` 直接修改 props 数据（行 36）
- 🔴 `setTimeout` 硬编码 200ms 且未在卸载时清理（行 38）

### table/use-settingColumn.ts

- 🔴 `Math.random()` 作为 Vue key，每次更新重生成导致整表重渲染（行 127, 146）
- 🔴 `getColumnFixedState('')` 返回 `'left'`，空字符串不应默认固定（行 136-139）
- 🔴 组件卸载时悬浮按钮可能残留在 DOM 中（行 47）

### table/use-dynamicTableHeight.ts

- 🔴 遗留 `console.log('ppp')`（行 91）
- 🔴 监听 `<body>` 高度变化，任何 body 高度变化都会触发表格重算（行 57, 64）

### input/tool.ts

- 🔴 `integeFilter` 输入 "0" 返回空字符串，整数模式无法输入 0（行 57-58）
- 🔴 `result.match(patter)` 重复调用两次（行 32-34）
- 🔴 `var` 应改为 `const`/`let`（行 10, 11, 12, 43, 44）
- 🔴 `/* eslint-disable */` 全局禁用 lint（行 1）

### input/input-number.vue

- 🔴 `1 === "1"` 类型不同的 `===` 比较永远为 false（行 149）
- 🔴 `isNil` 之后的 `typeof undefined` 检查为死代码（行 126-130）
- 🔴 debounce 未在卸载时 cancel，内存泄漏（行 157）
- 🔴 setTimeout 未清理（行 75-78）
- 🔴 使用非标准 `e.srcElement`（行 146, 151）
- 🔴 使用过时的 `e.returnValue = false` 和 `return false`（行 162-163, 168-169）
- 🔴 `numPrecision` computed 定义但从未使用，死代码（行 96-103）
- 🔴 `isValidate` prop 定义但从未使用，死代码（行 50）
- 🔴 `onFocus`/`onBlur` 事件 emit `true` 而非原始 Event（行 80-85）
- 🔴 `<style>` 缺少 `scoped`，样式全局泄漏（行 173）

### drawer/drawer.vue

- 🟢 emit 名 `'cancle'` 拼写错误，已改为 `'cancel'`（行 67, 79）
- 🔴 `<style>` 缺少 `scoped`，样式全局泄漏（行 101）
- 🔴 `!important` 滥用（行 105, 106, 111, 115）

### ueditor/ueditor.vue

- 🔴 addEventListener/removeEventListener 第三个参数不匹配，事件监听器永远无法移除，**内存泄漏**（行 235, 238）
- 🔴 computed getter 中有副作用 `setEditorValue()`，导致大量不必要的 `postMessage`（行 41-44）
- 🔴 `postMessage` 使用 `origin '*'`，安全风险（行 188）
- 🔴 `console.log(window.removeEventListener)` 调试代码未清理（行 234）
- 🔴 `getRandomCode` 实现低效，`parseInt` 解析浮点数可能产生 NaN（行 90-166）
- 🔴 `parseInt(\`${Math.random() * 61}\`)` 永远取不到索引 61（行 159）
- 🔴 body 类操作可能导致页面滚动永久锁定（行 209-215）

### tinymce/tinymce.vue

- 🔴 `defineExpose({ editor: state.editor })` 暴露的不是响应式引用，外部拿到的仍是 null（行 144-147）
- 🔴 `onActivated` 后 `state.editor` 未重置，指向已销毁实例（行 158-171）
- 🔴 `props.modelValue + ''` 对 null/undefined 产生 `"null"`/`"undefined"`（行 54）
- 🔴 `Object.assign(settingConfig, props.setting)` 可能覆盖 `setup` 回调（行 103）
- 🔴 `<style>` 缺少 `scoped`，`.tox-statusbar__branding` 全局生效（行 181-185）

### tinymce/loader.ts

- 🟢 `creactScriptElm` 拼写错误，已改为 `createScriptElm`（行 10, 66）

### tinymce/utils.ts

- 🔴 `typeof window !== 'undefined' ? window : window.global` 可能抛 ReferenceError（行 11-12）
- 🔴 `Date.now() + Math.floor(Math.random() * 1000000)` uuid 碰撞风险（行 7）

### avatar/avatar.vue

- 🔴 `URL.createObjectURL` 未 revoke，内存泄漏（行 137）
- 🔴 `imageRefs` 数组在列表项移除时对应位置未清理（行 15）
- 🔴 `<style>` 缺少 `scoped`，Element Plus 组件样式全局覆盖（行 229）
- 🔴 `!important` 滥用，6 处（行 232, 234, 261-268）
- 🔴 `onSuccess` 类型为 `Function`，过于宽泛（行 78）
- 🔴 `pw`/`ph` computed 对 string 类型 `width`/`height` 可能产生 `'50%px'`（行 105-110）
- 🔴 `handleSuccess` 中 `onSuccess` 返回空值时仍 push 到 `imgList`（行 143）
- 🔴 `getAcceptType` 每次调用都重建 Map，应提取为组件外常量（行 180-197）

### drag-transfer-tree/drag-transfer-tree.vue

- 🔴 `handleLeftDrop` 先 `filter` 删除再 `find`，被删项永远找不到，原始数据属性丢失（行 218-247）
- 🔴 `mappedRightList` setter 中 `find` 操作 O(n²)（行 161-175）
- 🔴 `watch` 中 `setTimeout` 未清理，组件卸载后回调仍执行（行 299-310）
- 🔴 遗留 `console.log` 调试代码（行 371）
- 🔴 非 `scoped` 的全局样式泄漏（行 344-351）

### list-temp/main.vue

- 🔴 Sortable 实例在组件卸载时未 `destroy()`，内存泄漏（行 227-229）
- 🔴 `source.data` deep watcher 每次变化都 `JSON.parse(JSON.stringify())` + 重建 Sortable（行 347-354）
- 🔴 `modelValue` 与 `source.data` watcher 可能形成循环更新（行 356-369）
- 🔴 `JSON.parse(JSON.stringify(val))` 对 `null`/`undefined` 会崩溃（行 365, 374-379）
- 🔴 `getGguid()` 使用 `Math.random()` 碰撞概率高，`substr` 已 deprecated（行 249-253）
- 🔴 `deepCopy` 重复定义（行 254-256）
- 🔴 `<style>` 缺少 `scoped`，样式全局泄漏（行 388-493）
- 🔴 大量 `!important` 滥用（行 417-431）

### more-condition/more-condition.vue

- 🔴 `setTimeout` 未清理，组件销毁后回调仍执行（行 289-295）
- 🔴 同一 watcher 中 `deepCopy` 调用两次（行 289-296）
- 🔴 两个 watcher `deep: true` + `immediate: true`，初始化时就 emit（行 283-297）
- 🔴 `let id = 1000` 模块级变量，多实例共享导致 ID 冲突（行 90）
- 🔴 `clearEmptyData` 递归 + splice 重头遍历，O(n²)（行 178-215）
- 🔴 `<style>` 缺少 `scoped`，样式全局泄漏（行 327-405）
- 🔴 `default: () => {}` 箭头函数返回 undefined 而非空对象，应为 `() => ({})`（行 64）
- 🔴 `MoreConditionWrapProps` 接口重复定义（行 64-72）

---

## P1 — 高风险问题

### 全局样式泄漏（共性）

- 🔴 avatar.vue `<style>` 缺少 `scoped`
- 🔴 date-range.vue `<style>` 缺少 `scoped`
- 🔴 header.vue `<style>` 缺少 `scoped`
- 🔴 search.vue `<style>` 缺少 `scoped`
- 🔴 search-item.vue `<style>` 缺少 `scoped`
- 🔴 toolbar.vue `<style>` 缺少 `scoped`
- 🔴 transfer-tree/TransferTree.vue `<style>` 缺少 `scoped`
- 🔴 textarea-content.vue `<style>` 缺少 `scoped`
- 🔴 NoPermission.vue `<style>` 缺少 `scoped`

### 拖拽预览未清理

- 🔴 drag-tags.vue 拖拽预览 DOM 未在 `onUnmounted` 中清理
- 🔴 drag-transfer-tree/left.vue 拖拽预览 DOM 未在 `onUnmounted` 中清理
- 🔴 drag-transfer-tree/right.vue 拖拽预览 DOM 未在 `onUnmounted` 中清理
- 🔴 useDragPreview.ts (drag-tags) hook 内未自动注册 `onUnmounted` 清理
- 🔴 useDragPreview.ts (drag-transfer-tree) hook 内未自动注册 `onUnmounted` 清理

### 响应式丢失

- 🔴 drag-tags.vue `props.propsMap` 解构后失去响应性（行 88）
- 🔴 drag-transfer-tree.vue `props.propsMap` 解构后失去响应性（行 113-117）
- 🔴 drag-transfer-tree/left.vue `props.propsMap` 解构后失去响应性（行 136-139）
- 🔴 drag-transfer-tree/right.vue `props.propsMap` 解构后失去响应性（行 153-157）
- 🔴 more-condition/item.vue `provide('moreConItemData', props.data)` 非响应式，下游不更新（行 16-17）

### 逻辑缺陷

- 🔴 drag-transfer-tree/right.vue `disabled: true` 实际语义为"可拖拽/可删除"，命名与行为矛盾（行 59, 183-185）
- 🔴 transfer-tree/props.ts `type: Boolean || Object` 是 JS 逻辑或，等价于 `type: Boolean`，应为 `type: [Boolean, Object]`（行 43）

### utils/index.ts

- 🔴 `isEmpty(0)` 返回 `true`，数字 0 不应被视为空（行 117）
- 🔴 `deepCopy` 无法处理循环引用、Date、Map、undefined 等（行 71）
- 🔴 `JSON.stringify` 比较对象不保证 key 顺序，可能误判（行 18）
- 🔴 `isArray` 应使用原生 `Array.isArray()`（行 67）
- 🔴 `isObject` 重复定义，局部版与模块版相同（行 11 vs 64）
- 🔴 `objToArray` 中 `this.isEmpty` 解构后丢失上下文（行 109）
- 🔴 `...arg: any` rest 参数类型应为 `any[]`（行 41）
- 🔴 `withInstall`/`withInstallFunction` 大量 `as any` 类型断言（行 150-179）

### permission/permission.ts

- 🔴 `beforeEach` 回调中 `this` 可能丢失（行 39）
- 🔴 `forEach` 做存在性检查，应使用 `includes`（行 23-27）
- 🔴 硬编码内部 URL `http://admin.ct108.net/403.html`（行 9）
- 🔴 `alias` 为非对象值时可能崩溃（行 17）
- 🔴 `data: []` 被推断为 `never[]`（行 7-8）

### NoPermission.vue

- 🔴 `getCurrentInstance()` 未做 null 检查（行 18-23）
- 🔴 URL 替换逻辑脆弱，应使用 `location.origin + pathname + search`（行 20）

### 对外 API 拼写错误（需考虑兼容）

- 🔴 `DartTableCloumn` 拼写错误（Cloumn→Column），table-cloumn/index.ts
- 🔴 `DartlLstTemp` 拼写错误（DartlLst→DartList），list-temp/index.ts 已修正但需确认外部使用
- 🔴 list-temp-item/index.ts 跨包引用 `list-temp` 内部文件
- 🔴 search-item/index.ts 跨包引用 `search` 内部文件
- 🔴 more-condition-item/index.ts 跨包引用 `more-condition` 内部 `src` 目录

---

## P2 — 中等问题

### hooks/use-device.ts

- 🔴 `resize` 事件无防抖/节流（行 34）
- 🔴 `userAgent` 检查在每次 resize 时重复执行，应缓存（行 9-13）
- 🔴 无 SSR 兼容，`navigator.userAgent` 在服务端不存在（行 10）

### hooks/use-clickOutside.ts

- 🔴 `elRef` 仅在 `onMounted` 时设置一次，`v-if` 切换后失效（行 16-19）
- 🔴 用 `onUnmounted` 而非 `onBeforeUnmount`，DOM 可能已不存在（行 22）

### date-picker/date-picker.vue

- 🔴 `formatDateRange` 未检查数组元素为 null（范围选择只选一端时）（行 112-126）
- 🔴 computed setter 中手动 emit change，与 el-date-picker 本身的 change 重复触发（行 77）
- 🔴 `pickerValue` setter 只处理 4 种类型，month/year/week 等不处理（行 69-74）
- 🔴 `sysDisabledDate` 每次渲染每个日期单元格都调用，应缓存（行 128-145）

### date-range/date-range.vue

- 🔴 `<style>` 缺少 `scoped`（行 284）
- 🔴 `defaultTime` prop 默认 `[undefined, undefined]` 不会被 computed 拦截（行 76）
- 🔴 `defaultTime` computed 与 props 同名遮蔽（行 155-160）
- 🔴 `currValue` computed 的 setter 依赖 `props.modelValue` 的引用，可能数据不一致（行 130-142）
- 🔴 使用 `var` 声明变量（行 213）
- 🔴 `_outFilter`/`getFormatValue` 大量 `any`（行 169, 192）

### dialog/dialog.vue

- 🔴 `onClosed` 中 `status.value = false` 可能导致双重 emit（行 67-69）
- 🔴 `$slots.footer` 判断逻辑，同时传入 footer slot 和 isFooter 时默认按钮和自定义内容都渲染（行 18）
- 🔴 `class="dart-dialog-model"` 无对应 style 定义（行 9）

### input/input.vue

- 🔴 `inputStyle` prop 已声明但未绑定到模板（行 83）
- 🔴 `case 'num'` 正则 `/\D*/g` 应改为 `/\D/g`（行 144）
- 🔴 `letter_u` 正则 `/[^a-zA-Z]/g` 允许小写再转大写，应为 `/[^A-Z]/g`（行 158）
- 🔴 `letter_l` 正则同理应为 `/[^a-z]/g`（行 161）
- 🔴 `handleInput` 中直接赋值 currValue 可能导致光标位置异常（行 173）
- 🔴 `trim` 默认 `true` 可能意外去空格（行 94, 194）
- 🔴 注释掉的废弃代码未清理（行 110-123）

### drag-transfer-tree/left.vue

- 🔴 `dragover` 高频事件无节流（行 289-349）
- 🔴 `event.dataTransfer!` 非空断言不安全（行 290-291）
- 🔴 `dragOverItemId.value!` 非空断言不安全（行 373）
- 🔴 `JSON.parse(result)` 无 try-catch（行 367）
- 🔴 `watch` 使用 `deep: true` 对大列表性能有影响（行 386-401）

### drag-transfer-tree/right.vue

- 🔴 `dragover` 高频事件无节流（行 230-298）
- 🔴 `item.label!.toLowerCase()` 非空断言，label 可选可能崩溃（行 178）
- 🔴 `JSON.parse(data)` 无 try-catch（行 320）

### drag-tags/drag-tags.vue

- 🔴 `targetIndex.value` 可能为 `undefined` 时强制 `as number` 断言（行 229）
- 🔴 `setTimeout` 延迟触发事件未清理（行 243-245）
- 🔴 CSS `transition: all 0.2` 缺少时间单位 `s`（行 293）
- 🔴 `selectedTabIds` 用数组，`includes`/`indexOf` 为 O(n)，应考虑用 `Set`（行 150-153）

### drag-tags/components/dragbg.vue & drag-transfer-tree/components/dragbg.vue

- 🔴 使用 `index` 作为 `v-for` 的 `key`，列表变化时 diff 异常（行 3）

### transfer-tree/TransferTree.vue

- 🔴 `setTimeout(() => {...}, 200)` 硬编码延迟，应使用 `nextTick`（行 307, 321, 335）
- 🔴 模板中左右树的 slot/default 逻辑完全重复，应抽取子组件（行 53-71, 87-105）

### transfer-tree/tool.ts

- 🔴 `checkEllipsis` 空值检查在 DOM 操作之后，应移到最前面（行 20-27）
- 🔴 `checkEllipsis` 返回值可简化为 `return condition`（行 28-32）
- 🔴 `deepCopy` 与 utils/index.ts 中重复定义（行 1-3）

### transfer-tree/use-tooltip.ts

- 🔴 `checkEllipsis` 与 tool.ts 中完全重复（行 7-24）

### transfer-tree/use-setdata.ts

- 🔴 `cloneDeep` 与 tool.ts/utils/index.ts 重复定义（行 12-14）
- 🔴 `newNode = null` 手动置空无实际意义（行 22）

### transfer-tree/use-right.ts

- 🔴 `rightTree.value!.filter(query)` 非空断言不安全（行 46）

### transfer-tree/use-tree.ts

- 🔴 `leftTree.value.getCheckedKeys(true)` 未做空值保护（行 45）

### transfer-tree/use-default.ts

- 🔴 `fixTreeData` 每次 computed 触发都深拷贝，大数据集性能差（行 44-65）

### more-condition/item.vue

- 🔴 `default: () => {}` 箭头函数返回 undefined 而非空对象，应为 `() => ({})`（行 7-9）
- 🔴 所有 `inject` 无默认值，非预期上下文使用会崩溃（行 22-25, 27-36）

### more-condition/more-condition-item.vue

- 🔴 所有 `inject` 无默认值/空值保护（行 22-25）
- 🔴 `other.path.slice(0)` 浅拷贝意图不清晰（行 31）

### more-condition/more-condition-wrap.vue

- 🔴 `onSetAO` 直接修改 props 引用的嵌套对象属性，违反单向数据流（行 101）
- 🔴 所有 `inject` 无默认值（行 87-89）

### search/search.vue

- 🔴 `defineExpose` 中 `validate` 未检查 `ruleForm.value` 是否存在（行 124-125）
- 🔴 `labelWidth` 硬编码两个值仅根据 `labelTextLength === 6` 切换（行 111-113）

### search/search-item.vue

- 🔴 `required` prop 定义但未使用（行 32-34）

### drag-transfer-tree/components/leftsearch.vue

- 🔴 debounce 函数在组件卸载后仍可能执行，应在 `onUnmounted` 中 cancel（行 41-43）
- 🔴 `v-model` 绑定单向，`computed` 的 `set` 不会触发父组件更新（行 33-40）

### drag-transfer-tree/components/header.vue

- 🔴 `width: 320px` 硬编码与实际面板宽度 324px 不一致（行 35）
- 🔴 `.header-left` 使用 `position: absolute`，父容器已是 flex 没有必要（行 43-45）

### select-v2/select-v2.vue

- 🔴 `getOptionLabel` 对原始类型 item 返回空字符串（行 100-108）

### toolbar/toolbar.vue

- 🔴 `<style>` 缺少 `scoped`（行 66-101）
- 🔴 Props 校验在 `onMounted` 中用 `console.error`，应使用 `validator`（行 40-61）

### drag-transfer-tree/hooks/useMergeConfig.ts

- 🔴 遗留 `console.log`（行 14）

### table/use-tableExpose.ts

- 🔴 `tableRef: Ref<any>` 缺少精确类型（行 7）
- 🔴 多个参数为 `any`（行 13, 19, 25, 30）

---

## P3 — 轻微问题和代码规范

### 拼写错误

- 🟢 `cancle` → `cancel`（drawer.vue）
- 🟢 `numberTofixed` → `numberToFixed`（tool.ts, input.vue 3处）
- 🟢 `creactScriptElm` → `createScriptElm`（loader.ts 2处）
- 🟢 `expanedKeys` → `expandedKeys`（TransferTree.vue 2处）
- 🟢 `geTreeBySearchQuery` → `getTreeBySearchQuery`（use-setdata.ts 4处, TransferTree.vue 2处, use-search.ts 2处）
- 🟢 `refrashMaxItemNum` → `refreshMaxItemNum`（use-more.ts 2处, more-condition.vue 2处）
- 🟢 `isRighClear` → `isRightClear`（props.ts, use-right.ts 2处, TransferTree.vue, 文档+2示例）
- 🟢 `precentage` → `percentage`（column.vue 2处, 文档, 示例）
- 🟢 `DartlLstTemp` → `DartListTemp`（list-temp/index.ts）

### any 类型泛滥

- 🔴 http.ts — 全文件
- 🔴 permission.ts — 全文件
- 🔴 tool.ts — 全文件
- 🔴 useDragPreview.ts（drag-tags + drag-transfer-tree 两份）
- 🔴 column.vue — `slots`, `useFuns`, props
- 🔴 use-drag.ts — `SortableTable`, `data`, `rowKey`
- 🔴 use-tableExpose.ts — `tableRef`, 多个参数
- 🔴 more-condition 全系列 — `MoreConditionWrapProps`, inject 值
- 🔴 transfer-tree 全系列 — `deepCopy`, `arrayToObject`, `ListItem` 索引签名

### !important 滥用

- 🔴 drawer.vue — 4 处（行 105, 106, 111, 115）
- 🔴 table.vue — 20+ 处（行 281-341）
- 🔴 main.vue — 7 处（行 417-431）
- 🔴 column.vue — 2 处（行 454, 480）
- 🔴 avatar.vue — 6 处（行 232, 234, 261-268）
- 🔴 SettingColumnDialog.vue — 4 处（行 179, 182, 193, 197-198）
- 🔴 more-condition.vue — 1 处（行 399）

### 遗留 console.log

- 🔴 drag-transfer-tree.vue:371
- 🔴 useMergeConfig.ts:14
- 🔴 use-dynamicTableHeight.ts:91
- 🔴 ueditor.vue:234

### 重复代码

- 🔴 `deepCopy` 在 utils/index.ts、tool.ts、use-setdata.ts、main.vue 各自定义一份
- 🔴 `checkEllipsis` 在 tool.ts 和 use-tooltip.ts 重复
- 🔴 `isObject` 在 utils 内部局部版和模块版重复
- 🔴 类型检查函数 `isString`/`isFunction`/`isNumber` 等模式重复，可抽为工厂函数

### 死代码/未使用

- 🔴 input.vue 行 110-123 注释代码未清理
- 🔴 search-item.vue `required` prop 未使用
- 🔴 input-number.vue `numPrecision` computed 未使用
- 🔴 input-number.vue `isValidate` prop 未使用
- 🔴 button.vue `$slots.default` 检查多余，span 包裹无意义

### CSS 问题

- 🔴 textarea-content.vue `font-family: auto` 无效 CSS 值（行 20）
- 🔴 drag-tags.vue `transition: all 0.2` 缺少时间单位 `s`（行 293）
- 🔴 button.vue 缺少 `v-bind="$attrs"`，属性无法透传

### 代码风格

- 🔴 date-range.vue 使用 `var` 声明变量（行 213）
- 🔴 tool.ts 使用 `var` 声明变量（行 10, 11, 12, 43, 44）
- 🔴 http.ts 使用 `var` 声明变量（行 13）
- 🔴 input-number.vue 类型别名 `type typeInputValue` 应为 `type TypeInputValue`（PascalCase）（行 33）
