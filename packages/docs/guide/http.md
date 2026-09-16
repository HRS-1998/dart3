# Http 网络请求

## get post 方法

<demo src="http/d1" />

## 执行多个并发请求

<demo src="http/d2" />

## 请求响应拦截器

可在请求中带自定义参数 进行匹配操作

```js
    app.use(Http as any, {
      interceptError(data, opt) {
        console.log('interceptError--');
        console.log(data);
        console.log(opt);
        console.log('interceptError--');
      },
      interceptorSuccess(data, opt, data2) {
        console.log('interceptorSuccess--');
        console.log(data);
        console.log(opt);
        console.log(data2);
        console.log('interceptorSuccess--');
      },
      requestInterceptor(data, opt) {
        console.log('requestInterceptor--');
        console.log(data);
        console.log(opt);
        console.log('requestInterceptor--');
      },
    });
```

<demo src="http/d4" />

## 错误拦截器

断网可测试 是否显示 error

<demo src="http/d3" />

## 打断请求

<demo src="http/d5" />

## 拦截器判断接口来源

```js
//设置来源
export const apiCheckpromotioncode = (params: any): Promise<any> => {
  return Http.ajax({
    method: 'post',
    url: entranceApi.checkpromotioncode,
    data: params,
    _source: 'test' //自定义来源
  });
};

// 全局拦截器 判断

app.use(Http, {
  interceptorSuccess(res: ResponseInfo, resConfig: any) {
    const data: any = JSON.parse(JSON.stringify(res).toLowerCase());
    // 判断是否为自定义来源
    if (resConfig._source === 'test') {
      return;
    }

    // 对响应成功数据做点什么
    if (data.code !== 0) {
      showMessage(data.message);
    }
  },
  timeout: 60000
});
```

## Http 方法

| 名称        | 说明               | 参数                                        | 返回值              |
| ----------- | ------------------ | ------------------------------------------- | ------------------- |
| ajax        | ajax 单个请求      | (value:Object) value 参考 ajax 接口参数说明 | object 接口请求结果 |
| all         | 并发多个 ajax 请求 | (value:Object) value 参考 ajax 接口参数说明 | -                   |
| axios       | axios 实例         | (value:Object) value 参考 ajax 接口参数说明 | Promise  对象       |
| setDefaults | 设置接口请求配置   | (value:Object) value setDefaults 支持参数项 | -                   |

## setDefaults 支持参数项

| 名称               | 说明                                                   | 类型                           | 默认值 | 可选值 | 版本 |
| ------------------ | ------------------------------------------------------ | ------------------------------ | ------ | ------ | ---- |
| requestInterceptor | 接口请求拦截器 函数 return true 则不支持拦截器外的方法 | function(result,opts)          | -      | -      |
| interceptorSuccess | 响应成功拦截器 函数 return true 则不支持拦截器外的方法 | function(result,opts,response) | -      | -      |
| interceptError     | 响应失败拦截器 函数 return true 则不支持拦截器外的方法 | function(result,opts)          | -      | -      |
| timeout            | 接口超时时间支持设置默认配置                           | Number                         | 6000   | -      |
| headers            | 接口请求头信息 支持设置默认配置                        | Object                         | {}     | -      |
| cache              | 请求是否加时间戳 支持设置默认配置                      | Boolean                        | false  | -      | -    |
| isQs               | post 请求参数是否需要 qs 处理 支持设置默认配置         | Boolean                        | false  | -      |
| abort              | 取消接口发送的函数                                     | function(result)               | -      |
| withCredentials    | 表示跨域请求时是否需要使用凭证                         | Boolean                        | false  |
| lowercasekey       | 是否将发返回数据的键值转小写                           | Boolean                        | false  |

## ajax 接口参数说明

| 名称         | 说明                                             | 类型             | 默认值 | 版本要求 |
| ------------ | ------------------------------------------------ | ---------------- | ------ | -------- |
| url          | 接口路径                                         | string           | -      | -        |
| headers      | 请求头信息 若 headers 设置 null 则不读取全局配置 | object           | null   | -        |
| data         | 接口参数                                         | object           | ''     | -        |
| method       | 接口请求类型                                     | String           | get    | -        |
| cache        | 请求是否加时间戳                                 | Boolean          | false  | -        |
| isQs         | post 请求参数是否需要 qs 处理                    | Boolean          | false  | -        |
| timeout      | 接口超时时间 <br>支持设置默认配置                | Number           | 6000   | -        |
| beforeSend   | 请求发送前的回调函数                             | function         | -      | -        |
| complete     | 请求发送完成的回调函数                           | function         | -      | -        |
| abort        | 取消接口发送的函数                               | function(result) | -      | -        |
| lowercasekey | 是否将发返回数据的键值转小写                     | Boolean          | false  |

- 接口请求参数示例

```
Vue.$dart.http.ajax({
                    url: '/api/agent/getAgentInfo', //接口路径
                    data: { //接口参数
                        Id: '1089'
                    },
                    method: 'get', //接口请求类型 默认get
                    cache: false, // get接口请求是否加时间戳
                    isQs: false, // post 请求参数是否需要 qs 处理
                    headers: { // 请求头信息
                        userId: '40239'
                    },
                    timeout: 6000, //接口超时时间
                    isInterceptors: true, // 是否取消全局拦截器
                    beforeSend: function() { //请求发送前的回调函数

                    },
                    complete: function() { //请求发送完成的回调函数

                    },
                    abort: function(result) { //取消接口发送的函数

                    }
                })
                .then(res => {
                    console.log(res);
                })
                .catch(e => {
                    console.log(e);
                });
```

## 接口请求响应失败[默认支持以下两种，其他根据接口响应失败实际情况处理]

接口超时返回结果

```
{
        Message: 'timeout',
        Data: null,
        Code: 666
    }

```

网络错误返回结果

```
{
       Message: 'Network Error',
        Data: null,
        Code: 555
    }

```

## [axios 的说明文档](http://www.axios-js.com/zh-cn/docs/)
