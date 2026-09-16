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
  { path: '/tool', name: 'Tool', component: () => import('./views/ToolDemo.vue') },
  { path: '/permission', name: 'Permission', component: () => import('./views/PermissionDemo.vue') },
  { path: '/textarea-content', name: 'TextareaContent', component: () => import('./views/TextareaContentDemo.vue') },
  { path: '/state', name: 'State', component: () => import('./views/StateDemo.vue') },
  { path: '/select-v2', name: 'SelectV2', component: () => import('./views/SelectV2Demo.vue') },
  { path: '/http', name: 'Http', component: () => import('./views/HttpDemo.vue') },
  { path: '/multirows', name: 'Multirows', component: () => import('./views/MultirowsDemo.vue') },
  { path: '/multitags', name: 'Multitags', component: () => import('./views/MultitagsDemo.vue') },
  { path: '/common-btn', name: 'CommonBtn', component: () => import('./views/CommonBtnDemo.vue') },
  { path: '/upload-file', name: 'UploadFile', component: () => import('./views/UploadFileDemo.vue') },
  { path: '/form-item', name: 'FormItem', component: () => import('./views/FormItemDemo.vue') },
]

export const navItems = routes.filter(r => r.path !== '/')

export default createRouter({
  history: createWebHashHistory(),
  routes
})