import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
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
  Tool,
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
  SelectV2,
  Multirows,
  Multitags,
  Ueditor,
  CommonBtn,
  UploadFile,
  FormItem
} from 'ct-dart3'
import Demo from './components/Demo.vue'
import ChangelogTable from './components/ChangelogTable.vue'
import './style/index.scss'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElementPlus, { zIndex: 3000, locale: zhCn })

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
    app.use(Multirows)
    app.use(Multitags)
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
    app.use(Tool)
    app.use(CommonBtn)
    app.use(UploadFile)
    app.use(FormItem)
    Permission.success([2, 3])

    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }

    app.component('Demo', Demo)
    app.component('ChangelogTable', ChangelogTable)

    // UEditor 仅客户端加载
    if (!import.meta.env.SSR) {
      app.use(Ueditor)
    }
  }
}
