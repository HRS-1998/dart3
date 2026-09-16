# Avatar 头像上传

## 基础

<demo src="avatar/d1" />

## 多选且可拖拽

<demo src="avatar/d3" />

## 尺寸变化

<demo src="avatar/d2" />

## 属性

| 名称            | 说明                                | 类型     | 默认值                 | 可选值 |
| --------------- | ----------------------------------- | -------- | ---------------------- | ------ |
| value / v-model | 绑定值 使用 onsuccess 方法 提供 url | string   | —                      | —      |
| accept          | 接受上传的文件类型                  | string   | '.jpg,.jpeg,.png,.gif' |        |
| width           | 图片宽度                            | number   | 100                    |        |
| height          | 图片高度                            | number   | 100                    |        |
| maxSize         | 最大 KB 数                          | number   | 100                    |        |
| fit             | 图片撑满格式                        | string   | 'cover'                |        |
| multiple        | 是否支持多选文件                    | boolean  | false                  |
| limit           | 允许上传文件的最大数量              | number   | 999                    |        |
| draggable       | 是否支持拖拽排序                    | boolean  | false                  |        |
| operate         | 图片操作                            | string[] | ['preview', 'delete']  |        |

其他属性 看 plus upload 组件
