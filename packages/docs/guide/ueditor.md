# Ueditor 富文本（不推荐）

用于在线编辑文本

## 基础

<ClientOnly>
<demo src="ueditor/d1" />
</ClientOnly>

## form 验证

<ClientOnly>
<demo src="ueditor/d2" />
</ClientOnly>

## 复杂

<ClientOnly>
<demo src="ueditor/d3" />
</ClientOnly>

## 属性

| 名称     | 说明                                     | 类型          | 默认值 | 可选值 | 版本 |
| -------- | ---------------------------------------- | ------------- | ------ | ------ | ---- |
| v-model  | 绑定值                                   | string        | ''     | -      | -    |
| config   | 配置项目 见下表【config 默认配置】       | object        | 见下表 | -      |
| height   | 编辑器高度 带图片上传的高度 需要大于 500 | string,number | 260    | -      |
| width    | 编辑器宽度                               | string,number | '100%' | -      |
| fontSize | 默认字体大小                             | number        | 12     | -      |

## 标准属性

[官方 ueditor 标准属性](http://fex.baidu.com/ueditor/#start-config)

## config 默认配置项

```js
config={
        serverUrl:'',//图片上传地址
		initialFrameWidth: '100%', // 初始化宽度
		initialFrameHeight: 200, // 初始化高度 px
		elementPathEnabled: false, // 是否显示元素路径
		autoClearinitialContent: false, // 是否自动清除编辑器初始内容
		wordCountMsg:
		'当前已输入{#count}个字符, 您还可以输入{#leave}个字符&emsp;', // 字数统计
		toolbars: [
			// 默认工具栏 【完整配置见下表】
			[
            'fullscreen',//全屏
			'bold', // 加粗
			'italic', // 斜体
			'fontsize', // 字号
			'underline', // 下划线
			'forecolor', // 字体颜色
			'justifyleft', // 居左对齐
			'justifycenter', // 居中对齐
			'justifyright', // 居右对齐
			'justifyjustify', // 两端对齐
			'lineheight', // 行间距
			'removeformat', // 清除格式
			'source', // 查看源码
			'fullscreen' //全屏
			]
		]
	}
}

```

## toolars 完整配置

```js
toolbars: [
  [
    'source',
    '|',
    'undo',
    'redo',
    '|',
    'bold',
    'italic',
    'underline',
    'fontborder',
    'strikethrough',
    'superscript',
    'subscript',
    'removeformat',
    'formatmatch',
    'autotypeset',
    'blockquote',
    'pasteplain',
    '|',
    'forecolor',
    'backcolor',
    'insertorderedlist',
    'insertunorderedlist',
    'selectall',
    'cleardoc',
    '|',
    'rowspacingtop',
    'rowspacingbottom',
    'lineheight',
    '|',
    'customstyle',
    'paragraph',
    'fontfamily',
    'fontsize',
    '|',
    'directionalityltr',
    'directionalityrtl',
    'indent',
    '|',
    'justifyleft',
    'justifycenter',
    'justifyright',
    'justifyjustify',
    '|',
    'touppercase',
    'tolowercase',
    '|',
    'link',
    'unlink',
    'anchor',
    '|',
    'imagenone',
    'imageleft',
    'imageright',
    'imagecenter',
    '|',
    'simpleupload',
    'insertimage',
    'emotion',
    'scrawl',
    'insertvideo',
    'music',
    'attachment',
    'map',
    'gmap',
    'insertframe',
    'insertcode',
    'webapp',
    'pagebreak',
    'template',
    'background',
    '|',
    'horizontal',
    'date',
    'time',
    'spechars',
    'snapscreen',
    'wordimage',
    '|',
    'inserttable',
    'deletetable',
    'insertparagraphbeforetable',
    'insertrow',
    'deleterow',
    'insertcol',
    'deletecol',
    'mergecells',
    'mergeright',
    'mergedown',
    'splittocells',
    'splittorows',
    'splittocols',
    'charts',
    '|',
    'print',
    'preview',
    'searchreplace',
    'drafts',
    'help',
  ],
];
```

## 服务端配置

当使用图片上传功能时需要服务端配合修改

1、版本使用 1.4.3.3 的版本 net 文件

2、修改`net\config.json`文件

搜索'UrlPrefix' 全部替换成全路径 示例如下

```js
/* 前后端通信相关的配置,注释只允许使用多行方式 */
{
    /* 上传图片配置项 */
    "imageActionName": "uploadimage", /* 执行上传图片的action名称 */
    "imageFieldName": "upfile", /* 提交的图片表单名称 */
    "imageMaxSize": 2048000, /* 上传大小限制，单位B */
    "imageAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"], /* 上传图片格式显示 */
    "imageCompressEnable": true, /* 是否压缩图片,默认是true */
    "imageCompressBorder": 1600, /* 图片压缩最长边限制 */
    "imageInsertAlign": "none", /* 插入的图片浮动方式 */
    "imageUrlPrefix": "//abc.tcy365.com/ueditor/1.4.3.3/utf8-net/net/", /* 图片访问路径前缀 */
    "imagePathFormat": "upload/image/{yyyy}{mm}{dd}/{time}{rand:6}", /* 上传保存路径,可以自定义保存路径和文件名格式 */
                                /* {filename} 会替换成原文件名,配置这项需要注意中文乱码问题 */
                                /* {rand:6} 会替换成随机数,后面的数字是随机数的位数 */
                                /* {time} 会替换成时间戳 */
                                /* {yyyy} 会替换成四位年份 */
                                /* {yy} 会替换成两位年份 */
                                /* {mm} 会替换成两位月份 */
                                /* {dd} 会替换成两位日期 */
                                /* {hh} 会替换成两位小时 */
                                /* {ii} 会替换成两位分钟 */
                                /* {ss} 会替换成两位秒 */
                                /* 非法字符 \ : * ? " < > | */
                                /* 具请体看线上文档: fex.baidu.com/ueditor/#use-format_upload_filename */

    /* 涂鸦图片上传配置项 */
    "scrawlActionName": "uploadscrawl", /* 执行上传涂鸦的action名称 */
    "scrawlFieldName": "upfile", /* 提交的图片表单名称 */
    "scrawlPathFormat": "upload/image/{yyyy}{mm}{dd}/{time}{rand:6}", /* 上传保存路径,可以自定义保存路径和文件名格式 */
    "scrawlMaxSize": 2048000, /* 上传大小限制，单位B */
    "scrawlUrlPrefix": "//abc.tcy365.com/ueditor/1.4.3.3/utf8-net/net/", /* 图片访问路径前缀 */
    "scrawlInsertAlign": "none",

    /* 截图工具上传 */
    "snapscreenActionName": "uploadimage", /* 执行上传截图的action名称 */
    "snapscreenPathFormat": "upload/image/{yyyy}{mm}{dd}/{time}{rand:6}", /* 上传保存路径,可以自定义保存路径和文件名格式 */
    "snapscreenUrlPrefix": "/ueditor/1.4.3.3/utf8-net/net/", /* 图片访问路径前缀 */
    "snapscreenInsertAlign": "none", /* 插入的图片浮动方式 */

    /* 抓取远程图片配置 */
    "catcherLocalDomain": ["127.0.0.1", "localhost", "img.baidu.com"],
    "catcherActionName": "catchimage", /* 执行抓取远程图片的action名称 */
    "catcherFieldName": "source", /* 提交的图片列表表单名称 */
    "catcherPathFormat": "upload/image/{yyyy}{mm}{dd}/{time}{rand:6}", /* 上传保存路径,可以自定义保存路径和文件名格式 */
    "catcherUrlPrefix": "//abc.tcy365.com/ueditor/1.4.3.3/utf8-net/net/", /* 图片访问路径前缀 */
    "catcherMaxSize": 2048000, /* 上传大小限制，单位B */
    "catcherAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"], /* 抓取图片格式显示 */

    /* 上传视频配置 */
    "videoActionName": "uploadvideo", /* 执行上传视频的action名称 */
    "videoFieldName": "upfile", /* 提交的视频表单名称 */
    "videoPathFormat": "upload/video/{yyyy}{mm}{dd}/{time}{rand:6}", /* 上传保存路径,可以自定义保存路径和文件名格式 */
    "videoUrlPrefix": "//abc.tcy365.com/ueditor/1.4.3.3/utf8-net/net/", /* 视频访问路径前缀 */
    "videoMaxSize": 102400000, /* 上传大小限制，单位B，默认100MB */
    "videoAllowFiles": [
        ".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg",
        ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid"], /* 上传视频格式显示 */

    /* 上传文件配置 */
    "fileActionName": "uploadfile", /* controller里,执行上传视频的action名称 */
    "fileFieldName": "upfile", /* 提交的文件表单名称 */
    "filePathFormat": "upload/file/{yyyy}{mm}{dd}/{time}{rand:6}", /* 上传保存路径,可以自定义保存路径和文件名格式 */
    "fileUrlPrefix": "//abc.tcy365.com/ueditor/1.4.3.3/utf8-net/net/", /* 文件访问路径前缀 */
    "fileMaxSize": 51200000, /* 上传大小限制，单位B，默认50MB */
    "fileAllowFiles": [
        ".png", ".jpg", ".jpeg", ".gif", ".bmp",
        ".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg",
        ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid",
        ".rar", ".zip", ".tar", ".gz", ".7z", ".bz2", ".cab", ".iso",
        ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".pdf", ".txt", ".md", ".xml"
    ], /* 上传文件格式显示 */

    /* 列出指定目录下的图片 */
    "imageManagerActionName": "listimage", /* 执行图片管理的action名称 */
    "imageManagerListPath": "upload/image", /* 指定要列出图片的目录 */
    "imageManagerListSize": 20, /* 每次列出文件数量 */
    "imageManagerUrlPrefix": "//abc.tcy365.com/ueditor/1.4.3.3/utf8-net/net/", /* 图片访问路径前缀 */
    "imageManagerInsertAlign": "none", /* 插入的图片浮动方式 */
    "imageManagerAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"], /* 列出的文件类型 */

    /* 列出指定目录下的文件 */
    "fileManagerActionName": "listfile", /* 执行文件管理的action名称 */
    "fileManagerListPath": "upload/file", /* 指定要列出文件的目录 */
    "fileManagerUrlPrefix": "//abc.tcy365.com/ueditor/1.4.3.3/utf8-net/net/", /* 文件访问路径前缀 */
    "fileManagerListSize": 20, /* 每次列出文件数量 */
    "fileManagerAllowFiles": [
        ".png", ".jpg", ".jpeg", ".gif", ".bmp",
        ".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg",
        ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid",
        ".rar", ".zip", ".tar", ".gz", ".7z", ".bz2", ".cab", ".iso",
        ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".pdf", ".txt", ".md", ".xml"
    ] /* 列出的文件类型 */

}
```

3、修改 `net\App_Code\Handler.cs`

找到 21 行修改如下 增加单图跨域修改

```js
protected void WriteJson(object response)
    {
        string jsonpCallback = Request["callback"],
            json = JsonConvert.SerializeObject(response);
        if (String.IsNullOrWhiteSpace(jsonpCallback))
        {
            //单图跨域
            var issimple = Request["IsSimpleUpload"];

            if (issimple != null && issimple.ToString()=="true")
            {
                Response.Redirect("//static.tcy365.com/cdn/ueditor/result.html?result=" + json); //把json传递到下面去呈现结果。
            }else{
                Response.AddHeader("Content-Type", "text/plain");
                Response.Write(json);
            }
            //单图跨域

        }
        else
        {
            Response.AddHeader("Content-Type", "application/javascript");
            Response.Write(String.Format("{0}({1});", jsonpCallback, json));
        }
        Response.End();
    }

```

4、给 net 文件夹加 http 响应标头

```js
Access-Control-Allow-Origin：*
Access-Control-Allow-Headers：X-Requested-With,X_Requested_With
```
