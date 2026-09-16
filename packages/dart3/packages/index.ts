import { App } from 'vue';
import CommonBtn from './common-btn';
import UploadFile from './upload-file';
import FormItem from './form-item';
import Input from './input';
import InputNumber from './input-number';
import ListTempItem from './list-temp-item';
import ListTemp from './list-temp';
import Http from './http';
import Permission from './permission';
import Toolbar from './toolbar';
import Tool from './tool';
import Search from './search';
import SearchItem from './search-item';
import Table from './table';
import TableColumn from './table-cloumn';
import Ueditor from './ueditor';
import DateRange from './date-range';
import Avatar from './avatar';
import MoreCondition from './more-condition';
import MoreConditionItem from './more-condition-item';
import DatePicker from './date-picker';
import Tinymce from './tinymce';
import TransferTree from './transfer-tree';
import TextareaContent from './textarea-content';
import DragTags from './drag-tags';
import DragTransferTree from './drag-transfer-tree';
import Drawer from './drawer';
import Search2 from './search2';
import Dialog from './dialog';
import Header from './header';
import State from './state';
import SelectV2 from './select-v2';
import Multirows from './multirows';
import Multitags from './multitags';

// 所有组件列表
const components = [
  CommonBtn,
  UploadFile,
  FormItem,
  Input,
  InputNumber,
  ListTempItem,
  ListTemp,
  Permission,
  Search,
  SearchItem,
  Http,
  Toolbar,
  Tool,
  Table,
  TableColumn,
  Ueditor,
  DateRange,
  Avatar,
  MoreCondition,
  MoreConditionItem,
  DatePicker,
  Tinymce,
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
  Multitags
];

// 定义 install 方法， App 作为参数
const install = (app: App): void => {
  // 遍历注册所有组件
  components.map((component: any) => {
    if (!component.name) {
      component.install(app);
      return;
    }
    app.component(component.name, component);
  });
};

export {
  CommonBtn,
  UploadFile,
  FormItem,
  Input,
  InputNumber,
  ListTempItem,
  ListTemp,
  Permission,
  Search,
  SearchItem,
  Http,
  Toolbar,
  Tool,
  Table,
  TableColumn,
  Ueditor,
  DateRange,
  Avatar,
  MoreCondition,
  MoreConditionItem,
  DatePicker,
  Tinymce,
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
  Multitags
};

export default { install };

export type { DartStateType } from './state';
