# Tinymce 富文本

## 基础

<demo src="tinymce/d1" />

## 自定义事件

字符数限制
<demo src="tinymce/d2" />

## 弹窗层级提升

<style>
/* 在el-dialog中tinymce z-index 被太小而被遮挡时要加这两句 */
.tox-tinymce-aux {
  z-index: 99999 !important;
}
.tinymce.ui.FloatPanel {
  z-index: 99;
}
</style>

## 属性

| 名称            | 说明     | 类型     | 默认值 | 可选值 |
| --------------- | -------- | -------- | ------ | ------ |
| value / v-model | 绑定值   | string   | —      | —      |
| setting         | 配置     | object   | 见下表 | —      |
| setup           | 初始回调 | function | -      | —      |
| disabled        | 禁用     | boolean  | false  | —      |

## Setting 默认值

```js
{
    language_url: '//static.tcy365.com/cdn/tinymce/6.4.2/langs/zh-Hans.js',
    language: 'zh-Hans',
    content_style:
      'body { font-family:Microsoft YaHei,Helvetica,Arial,sans-serif; font-size:14px }',
    font_size_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
    font_family_formats:
      '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
    promotion: false,
    menubar: false
}

```

## 图片上传 Setting 设置

```js
// 6.x 版本的TinyMCE 自定义上传图片需要返回 一个promise
{
  images_upload_handler: async (blobInfo: any) =>
    new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', blobInfo.blob());
      apiUpload(formData).then((res: any) => {
        const { Code, Data } = res;
        if (Code) {
          reject('上传失败');
          return;
        }
        resolve(Data);
      });
    });
}
```

## 官网

https://www.tiny.cloud/docs/tinymce/6/
