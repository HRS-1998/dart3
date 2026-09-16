export interface LogEntry {
  version: string;
  date: string;
  description: string;
}

export const tagBaseUrl = 'http://192.168.101.244/FrontendDev/ct-dart3/tree/';

export const changelog: LogEntry[] = [
  {
    version: '2.1.15',
    date: '20260915',
    description:
      '更改富文本资源域名地址支持同域加载，穿梭框组件标题字体大小调整',
  },
  {
    version: '2.1.14',
    date: '20260910',
    description:
      '更改富文本资源域名地址，头像支持溢出隐藏',
  },
  {
    version: '2.1.13',
    date: '20260902',
    description:
      '修复表格高度计算出现小数点的异常，更改表格内容区tag样式，新增search区域 el-input-number 样式',
  },
  {
    version: '2.1.12',
    date: '20260827',
    description:
      '新增commonbtn,upload,form-item组件，tool组件增加默认按钮统一显隐属性：showDefaultBtn',
  },
  {
    version: '2.1.11',
    date: '20260819',
    description: '去除search2的padding样式,tool工具栏左侧居中方式修改',
  },
  {
    version: '2.1.10',
    date: '20260819',
    description:
      '新增Tool工具组件，新增用于table的multirows,multitags组件，新增useType为multidatetime值设置时间格式',
  },
  {
    version: '2.1.9',
    date: '202608012',
    description: '新后台过渡版本',
  },
  {
    version: '2.1.8',
    date: '20260806',
    description:
      'search2控制初始化展开还是折叠属性defaultExpanded；在分页状态下table内容区域的行高度自定设置item-height',
  },
  {
    version: '2.1.7',
    date: '20260805',
    description: '去除table组件的魔法数字，对树结构table动态计算高度',
  },
  {
    version: '2.1.6',
    date: '20260726',
    description:
      '修复Search2组件，修复组件库拼写错误，收集组件库问题清单zerror.md',
  },
  {
    version: '2.1.5',
    date: '20260724',
    description: '更新table高度计算逻辑由pageSize改为data.length，调整分页位置',
  },
  {
    version: '2.1.4',
    date: '20260723',
    description: '调整table分页位置,调整列设置按钮为悬浮',
  },
  {
    version: '2.1.3',
    date: '20260722',
    description: '兼容对非Pagination表格直接使用剩余高度作为table高度',
  },
  {
    version: '2.1.2',
    date: '20260721',
    description: 'table滚动条位置优化，search2搜索优化',
  },
  {
    version: '2.1.1',
    date: '20260721',
    description: '修复search缩放问题，table高度问题',
  },
  {
    version: '2.1.0',
    date: '20260720',
    description: '组件库重构新版本',
  },
  {
    version: '2.0.25',
    date: '20260720',
    description: '重构新版本测试',
  },
  {
    version: '2.0.24',
    date: '20260714',
    description: '修复嵌套el-scrollbar样式问题',
  },
  { version: '2.0.23', date: '20260710', description: '更新drawer样式' },
  {
    version: '2.0.22',
    date: '20260610',
    description: '修复ListTemp 设置空数据时样式问题',
  },
  {
    version: '2.0.21',
    date: '20260610',
    description: '修复无界下table的tooltip错位问题',
  },
  {
    version: '2.0.20',
    date: '20260609',
    description: 'ListTemp 添加 addButtonPlacement属性,table线条颜色更新',
  },
  { version: '2.0.19', date: '20260608', description: '修复线条问题' },
  { version: '2.0.18', date: '20260608', description: '修复1px线条问题' },
  {
    version: '2.0.17',
    date: '20260608',
    description: 'table树形表格展开收起样式修改',
  },
  {
    version: '2.0.16',
    date: '20260608',
    description:
      'table 新增tree-line-style配置，实现树形表格展开收起样式自定义；修改drawer组件padding增',
  },
  {
    version: '2.0.15',
    date: '20260604',
    description: 'dialog和drawer补充hasPermission文档描述',
  },
  {
    version: '2.0.14',
    date: '20260527',
    description: '新增 Dialog Drawer hasPermission 权限验证属性',
  },
  {
    version: '2.0.13',
    date: '20260520',
    description: '优化 Table 组件动态列设置功能；修复 Dialog 组件显示bug',
  },
  {
    version: '2.0.12',
    date: '20260520',
    description: '修复 Table 组件动态高度 bug',
  },
  {
    version: '2.0.10',
    date: '20260513',
    description: '优化部分组件样式，新增 Table Column 组件 copyFixed 属性',
  },
  {
    version: '2.0.8',
    date: '20260512',
    description: '优化部分组件样式，去除 Header 组件',
  },
  {
    version: '2.0.7',
    date: '20260511',
    description: '修复 Table 组件已知 bug，新增 SelectV2 组件',
  },
  {
    version: '2.0.6',
    date: '20260509',
    description: '修复 Table 组件已知 bug，新增 State 组件',
  },
  {
    version: '2.0.5',
    date: '20260429',
    description: '修复 Table 组件已知 bug',
  },
  {
    version: '2.0.4',
    date: '20260427',
    description:
      "Table 组件 pageLayout 默认值 'total, prev, pager, next, sizes, jumper'",
  },
  {
    version: '2.0.3',
    date: '20260422',
    description: '修复 Table 组件已知 bug',
  },
  {
    version: '2.0.0',
    date: '20260417',
    description:
      '组件皮肤更新，新增 Table 组件动态高度配置功能，新增 Header 组件，新增 Dialog 组件',
  },
  {
    version: '1.0.47',
    date: '20260408',
    description: '优化 Drawer 内部逻辑，暴露 handleClose 方法',
  },
  { version: '1.0.46', date: '20260407', description: '优化 Drawer 内部逻辑' },
  {
    version: '1.0.45',
    date: '20260327',
    description: '新增 Drawer show-confirm-on-close, confirm-text 属性',
  },
  { version: '1.0.43', date: '20260325', description: '修复 Drawer 样式' },
  {
    version: '1.0.40',
    date: '20260319',
    description: '修复 Avatar 部分逻辑错误',
  },
  { version: '1.0.39', date: '20260318', description: '修复 Drawer 样式' },
  {
    version: '1.0.38',
    date: '20260312',
    description: '【ElementPlus 组件升级 2.11.4 版本】',
  },
  { version: '1.0.37', date: '20260312', description: '修复 Avatar 样式' },
  {
    version: '1.0.36',
    date: '20260311',
    description:
      '新增 Search2 row-fold 属性，修复 Search2 Drawer 移动端竖屏显示问题',
  },
  {
    version: '1.0.35',
    date: '20260309',
    description: '修复 Table 日期列非法值场景',
  },
  {
    version: '1.0.34',
    date: '20260305',
    description: '新增 Drawer Search2 组件 ，修复 Table 日期列非法值场景',
  },
  {
    version: '1.0.33',
    date: '20260115',
    description: '修复 依赖升级 导致的组件引入问题',
  },
  {
    version: '1.0.32',
    date: '20260109',
    description: '修复 Table column-set 样式',
  },
  {
    version: '1.0.31',
    date: '20260108',
    description: '修复 Table column-set 属性，自定义列头内容消失',
  },
  {
    version: '1.0.30',
    date: '20251112',
    description: '修复 DragTags DragTransferTree 组件打包问题',
  },
  {
    version: '1.0.29',
    date: '20251111',
    description: '新增 DragTags DragTransferTree 组件',
  },
  {
    version: '1.0.28',
    date: '20251028',
    description: '修复 dart-table-column-setting 样式问题',
  },
  {
    version: '1.0.27',
    date: '20251013',
    description: '修复 is-drag 样式覆盖问题',
  },
  {
    version: '1.0.25',
    date: '20250926',
    description: '修复 Table column-set 属性，自定义列弹框列点击失效问题',
  },
  {
    version: '1.0.24',
    date: '20250925',
    description: '修复 Table column-set 属性，默认作用域插槽默认参数',
  },
  {
    version: '1.0.23',
    date: '20250923',
    description: '新增 Table column-set 属性，是否开启列配置功能',
  },
  {
    version: '1.0.22',
    date: '20250728',
    description: '修复 TransferTree title 样式',
  },
  {
    version: '1.0.19',
    date: '20250728',
    description: '新增 TransferTree left-title right-title 插槽',
  },
  {
    version: '1.0.18',
    date: '20250722',
    description: '新增 TransferTree 左树 left 自定义插槽',
  },
  {
    version: '1.0.17',
    date: '20250612',
    description: '修复 TransferTree 搜索 bug',
  },
  {
    version: '1.0.16',
    date: '20250612',
    description: '新增 TransferTree is-search-branch 属性',
  },
  {
    version: '1.0.15',
    date: '20250611',
    description: '修复 input type 属性 默认 text 值',
  },
  {
    version: '1.0.14',
    date: '20250605',
    description: '修复 TableColumn isCopy 复制功能，兼容低版本浏览器',
  },
  {
    version: '1.0.13',
    date: '20250522',
    description: '修复 TableColumn 图钉位置',
  },
  {
    version: '1.0.12',
    date: '20250520',
    description: '修复 TableColumn isCopy 复制功能',
  },
  {
    version: '1.0.11',
    date: '20250507',
    description:
      '新增 TransferTree clearQueryLeft clearQueryRight 方法，分别置空左右两侧树的搜索条件',
  },
  {
    version: '1.0.9',
    date: '20250430',
    description:
      '新增 TransferTree clearQuery 方法，同时置空左右两侧树的搜索条件',
  },
  {
    version: '1.0.8',
    date: '20250427',
    description:
      '修改 TransferTree 两侧树支持单独扩展节点，isExpandAll 支持传数组',
  },
  {
    version: '1.0.7',
    date: '20250411',
    description: '新增 avator operate 属性',
  },
  {
    version: '1.0.5',
    date: '20250310',
    description:
      '新增 TableColumn 图钉功能，新增 TableColumn 使用 showoverflowtip 出现省略号时复制功能，默认 isCopy 为 false',
  },
  {
    version: '1.0.4',
    date: '20250310',
    description: '修复 avatar 最大限制，提示文案',
  },
  {
    version: '1.0.2',
    date: '20250307',
    description:
      '【ElementPlus 组件升级 2.9.5 版本】，新增 avatar 多选拖拽功能，更换拖拽标志',
  },
  {
    version: '0.4.19',
    date: '20250218',
    description: '新增 Http lowercasekey 属性',
  },
  {
    version: '0.4.17',
    date: '20241114',
    description: '新增 TransferTree isExpandAll 属性',
  },
  {
    version: '0.4.15',
    date: '20241017',
    description:
      '【ElementPlus 组件升级 2.8.5 版本】，修复 date-picker 范围选择 失去焦点 无法正确显示时间的 bug；修复 MoreCondition props 映射失败 增加 select textarea 红框显示；修复 list-temp 增加 select textarea 红框显示',
  },
  {
    version: '0.4.12',
    date: '20240924',
    description: '修复 TransferTree 搜索 bug',
  },
  {
    version: '0.4.11',
    date: '20240923',
    description: '新增 MoreCondition maxNum 属性',
  },
  {
    version: '0.4.10',
    date: '20240919',
    description: '新增 list-temp table 拖拽新属性',
  },
  {
    version: '0.4.9',
    date: '20240914',
    description: '修复 TransferTree disabled 无法使用 bug',
  },
  {
    version: '0.4.8',
    date: '20240912',
    description:
      '修复 input-number 无法使用的 bug；修复 list-temp 验证内部颜色显示；修复 MoreCondition 验证内部颜色显示 删除会遗留多个且或的 bug；修复 date-picker vaule-format 无法使用的 bug',
  },
  {
    version: '0.4.5',
    date: '20240905',
    description: '修复 TransferTree bug 新增属性',
  },
  { version: '0.4.3', date: '20240904', description: '修复 list-temp bug' },
  {
    version: '0.4.2',
    date: '20240813',
    description: '新增 list-temp 属性 新增 input-number 组件',
  },
  { version: '0.4.1', date: '20240603', description: '新增 TransferTree 属性' },
  {
    version: '0.4.0',
    date: '20240603',
    description: '新增 TextareaContent TransferTree 组件',
  },
  {
    version: '0.3.7',
    date: '20240131',
    description: '修复 input 字母大小写限制错误',
  },
  {
    version: '0.3.6',
    date: '20231106',
    description: '新增 ListTemp 属性 单独控制按钮可操作',
  },
  {
    version: '0.3.5',
    date: '20231102',
    description: '新增 MoreCondition 增加 rules 函数模式 （在主 rules 内）',
  },
  {
    version: '0.3.4',
    date: '20231101',
    description: '修复 ListTemp 到达最大数量时可复制的 bug',
  },
  {
    version: '0.3.2',
    date: '20231019',
    description: '修复 MoreCondition 删除新增 props 错误',
  },
  {
    version: '0.3.1',
    date: '20231013',
    description: '新增 MoreCondition rules 函数模式 （在 item rules 内）',
  },
  {
    version: '0.3.0',
    date: '20230818',
    description:
      '修复 DatePicker format 错误；新增 table show-overflow-tooltip 属性 修改 page-hide-on-single-page 为 false；修改 search 下拉箭头 颜色 为 Primary 色',
  },
  { version: '0.2.4', date: '20230622', description: 'bug 修复' },
  {
    version: '0.2.2',
    date: '20230522',
    description: '新增 Avatar DatePicker MoreCondition Tinymce 组件',
  },
  { version: '0.1.14', date: '20221130', description: '初始版' },
];
