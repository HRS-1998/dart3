export interface ListItem {
  id?: string | number;
  label?: string;
  disabled?: boolean;
  selected?: boolean;
}

export interface PanelConfig {
  name?: string; // 当前drag
  dragOrigin?: string; // 拖拽来源
  title?: string;
}

export interface PropsMapType {
  value?: string;
  label?: string;
  disabled?: string;
}

export interface LeftPanelConfig extends PanelConfig {}

export interface RightPanelConfig extends PanelConfig {
  showLeftIcon?: boolean; // 显示左侧图标
  showRightIcon?: boolean; // 显示右侧图标
}
