# Permission 权限

## 基础

元素无权限 编辑无权限

```js
app.use(Permission, {
  //设置权限别名
  alias: {
    add: 1,
    del: 2,
    edit: 3,
  },
});

Permission.success([2, 3]);
```

<demo src="permission/d1" />

## 路由控制

```js

app.use(Permission, {
  //设置权限别名
  alias: {
    add: 1,
    del: 2,
    edit: 3,
  },
  route:route
});

Permission.success([2, 3]);
const routes = [{
        {
            path: '/add',
            component: add,
            meta: {
                permission: 'add' //路由页面增加权限 相当于 元素 $dart.permission.is('add')
            }
        },
        {
            path: '/edit',
            component: edit,
            meta: {
                permission: 'edit' //路由页面增加权限 相当于 元素 $dart.permission.is('add')
            }
        }
    ];

```

## 错误提示

<demo src="permission/d2" />

## setDefaults

| 名称   | 说明             | 类型   | 默认值                            | 可选值 | 版本 |
| ------ | ---------------- | ------ | --------------------------------- | ------ | ---- |
| alias  | 权限别名         | object | {}                                | -      | -    |
| router | 路由             | object | -                                 | -      | -    |
| url    | 错误提示页面地址 | string | 'http://admin.ct108.net/403.html' | -      |      |

## 路由属性

| 名称       | 说明                                   | 类型   | 默认值 | 可选值 | 版本 |
| ---------- | -------------------------------------- | ------ | ------ | ------ | ---- |
| permission | 与`is`功能类似 直接填写`alias`属性别名 | string | ''     | -      | -    |

## 方法

| 名称    | 说明                                                                             | 参数           | 返回值                            | 版本 |
| ------- | -------------------------------------------------------------------------------- | -------------- | --------------------------------- | ---- |
| is      | 判断是否有权限 【使用`alias`属性值去成功数组内查询，如一致返回 true 否则 false】 | (value:string) | boolean[true:有权限 false:无权限] | -    |
| success | 权限接口成功赋值 【只能使用一维数组】                                            | (value:array)  | -                                 | -    |
| go403   | 去无权限页面                                                                     | -              | -                                 | -    |
