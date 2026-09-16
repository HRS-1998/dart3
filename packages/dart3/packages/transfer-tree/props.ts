export const treeProps = {
  titles: {
    type: Array,
    default: () => ['Title1', 'Title2']
  },
  filterPlaceholder: {
    type: Array,
    default: () => ['请输入关键字', '请输入关键字']
  },
  isExpandAll: {
    type: [Boolean, Array],
    default: false
  },
  //查询
  filterable: {
    type: Boolean,
    default: false
  },
  //查询方法
  filterMethod: Function,
  leftTreeShow: {
    type: Boolean,
    default: true
  },
  //右侧开启删除联动
  isRightClear: {
    type: Boolean,
    default: false
  },
  height: {
    type: Number,
    default: 300
  },
  data: {
    type: Array,
    default: () => []
  },
  dataMap: {
    type: Object,
    default: () => {}
  },
  showOverflowTooltip: {
    type: Boolean || Object,
    default: false
  },
  tooltipEffect: {
    type: String,
    default: 'dark'
  },
  loading: Boolean,
  isSearchBranch: {
    type: Boolean,
    default: true
  }
};
