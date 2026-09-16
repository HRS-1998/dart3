import { defineConfig, postcssIsolateStyles } from 'vitepress';
import { resolve } from 'path';

export default defineConfig({
  lang: 'zh-CN',
  title: 'ct-dart3 组件库',
  description: '后台vue3组件库',
  base: '/ctdart3/',

  sitemap: {
    hostname: 'https://your-domain.com/ctdart3/',
  },

  head: [['meta', { name: 'description', content: 'ct-dart3 后台vue3组件库' }]],

  themeConfig: {
    nav: [{ text: '日志', link: '/log' }],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速上手', link: '/guide/quickstart' },
            { text: 'CSS 变量', link: '/guide/css' },
          ],
        },
        {
          text: '组件',
          items: [
            { text: 'Avatar 头像上传', link: '/guide/avatar' },
            { text: 'CommonBtn 通用确认操作按钮', link: '/guide/common-btn' },
            { text: 'DateRange 日期范围', link: '/guide/date-range' },
            { text: 'DatePicker 日期选择', link: '/guide/date-picker' },
            { text: 'FormItem 表单项', link: '/guide/form-item' },
            { text: 'Dialog 对话框', link: '/guide/dialog' },
            { text: 'Drawer 抽屉', link: '/guide/drawer' },
            { text: 'DragTags 拖拽标签', link: '/guide/drag-tags' },
            {
              text: 'DragTransferTree 拖拽穿梭树',
              link: '/guide/drag-transfer-tree',
            },
            { text: 'Http 请求封装', link: '/guide/http' },
            { text: 'Input 输入框', link: '/guide/input' },
            { text: 'InputNumber 数字输入框', link: '/guide/input-number' },
            { text: 'ListTemp 列表模板', link: '/guide/list-temp' },
            { text: 'MoreCondition 更多条件', link: '/guide/more-condition' },
            { text: 'Multirows 多行信息', link: '/guide/multirows' },
            { text: 'Multitags 多行标签', link: '/guide/multitags' },
            { text: 'Permission 权限', link: '/guide/permission' },
            { text: 'Search 搜索', link: '/guide/search' },
            { text: 'Search2 搜索V2', link: '/guide/search2' },
            // { text: 'SelectV2 选择器V2', link: '/guide/select-v2' },
            { text: 'State 状态', link: '/guide/state' },
            { text: 'Table 表格', link: '/guide/table' },
            { text: 'TextareaContent 文本域', link: '/guide/textarea-content' },
            { text: 'Tinymce 富文本', link: '/guide/tinymce' },
            { text: 'Tool 工具栏（新）', link: '/guide/tool' },
            // { text: 'Toolbar 工具栏', link: '/guide/toolbar' },
            { text: 'TransferTree 穿梭树', link: '/guide/transfer-tree' },
            // { text: 'UEditor 百度编辑器', link: '/guide/ueditor' },
            { text: 'UploadFile 文件上传', link: '/guide/upload-file' },
          ],
        },
      ],
    },
    search: { provider: 'local' },
  },

  vite: {
    resolve: {
      alias: {
        'ct-dart3': resolve(__dirname, '../../dart3/packages/index.ts'),
      },
    },
    css: {
      postcss: {
        // 让 vp-raw 生效：对默认主题样式注入 :not(:where(.vp-raw, .vp-raw *)) 隔离
        plugins: [
          postcssIsolateStyles({
            includeFiles: [/theme-default[\\/]styles[\\/].*\.css$/],
          }),
        ],
      },
      preprocessorOptions: {
        scss: { api: 'modern-compiler' },
      },
    },
    server: {
      port: 8081,
      open: true,
    },
    ssr: {
      noExternal: ['element-plus', '@element-plus/icons-vue'],
    },
  },
});
