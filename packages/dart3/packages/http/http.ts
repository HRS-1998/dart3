/* eslint-disable*/
import axios from 'axios';
import qs from 'qs';

const interceptor: any = {
  requestInterceptor: function () {}, //请求拦截器
  interceptorSuccess: function () {}, //响应成功拦截器
  interceptError: function () {} // 响应失败拦截器
};
const emptyFn = function () {};
let interceptInstance: any = null;
let isInterceptors = true;
var defaultConfig: any = {
  isQs: false, // 接口参数是否需要qs处理
  cache: false, // 接口是否缓存F
  timeout: 6000, //接口请求时间
  headers: null, // 默认请求头
  abort: null, // 全局取消请求
  withCredentials: false, // 表示跨域请求时是否需要使用凭证
  lowercasekey: false // 是否将发返回数据的键值转小写
};
/**
 * @function _addInterceptors 添加拦截方法
 * @param  {object} options {接口请求参数}
 * @return {Object} {接口请求或响应结果}
 */
const _addInterceptors = function (options: any) {
  interceptInstance = axios.create(); //创建axios实例
  // 添加请求拦截器
  interceptInstance.interceptors.request.use(
    (config: any) => {
      if (isInterceptors && _interceptorCore('requestInterceptor', options, config)) {
        return config;
      }
      return config;
    },
    function (error: any) {
      return Promise.reject(error);
    }
  );
  // 添加响应拦截器
  interceptInstance.interceptors.response.use(
    (response: any) => {
      const result = response.data || response;
      if (isInterceptors && _interceptorCore('interceptorSuccess', options, result, response)) {
        return;
      }

      return response;
    },
    (thrown: any) => {
      return Promise.reject(thrown);
    }
  );
  return interceptInstance;
};
/**
 * @function _interceptorCore 拦截器处理函数
 * @param  {String} key      {拦截类型}
 * @param  {Object} options  {接口请求参数}
 * @param  {Object} response {接口响应结果}
 * @return {Boolean} {返回是否执行拦截后逻辑状态}
 */
const _interceptorCore = function (key: any, options: any, response: any, sourceResponse?: any) {
  // 接口是否存在局部拦截方法
  if (options.hasOwnProperty(key) && typeof options[key] === 'function') {
    if (options[key](response, options, sourceResponse)) {
      return true;
    }
    return false;
  }
  // 接口是否存在全局拦截方法
  if (
    interceptor.hasOwnProperty(key) &&
    typeof interceptor[key] === 'function' &&
    interceptor[key](response, options, sourceResponse)
  ) {
    return true;
  }
  return false;
};

// 对象键值转小写
const _convertKeysToLowerCase = function (obj: any) {
  return Object.keys(obj).reduce((acc: any, key) => {
    acc[key.toLowerCase()] = obj[key];
    return acc;
  }, {});
};

/**
 * @function _sendCore 发送接口请求核心逻辑
 * @param  {function} instance {axios实例方法}
 * @param  {Object} options  {接口请求参数}
 * @return {Object} {接口响应结果}
 */
const _sendCore = function (options: any) {
  const CancelToken = axios.CancelToken;
  const _url = options.url;
  const _headers = options.headers || defaultConfig.headers;
  const _data = options.data || null;
  const _method = options.method || 'get';
  const _beforeSend = options.beforeSend || emptyFn;
  const _complete = options.complete || emptyFn;
  const _abort = options.abort || defaultConfig.abort || emptyFn;
  const _cache = options.hasOwnProperty('cache') ? options.cache : defaultConfig.cache;
  const _isQs = options.hasOwnProperty('isQs') ? options.isQs : defaultConfig.isQs;
  //if (options.url === '') return null;

  const method = _method.toLocaleLowerCase();
  const config: any = {
    method: method,
    url: _url,
    data: _data,
    cancelToken: new CancelToken(function executor(c) {
      _abort(c);
    }),
    timeout: options.timeout || defaultConfig.timeout
  };

  const time = {
    _: +new Date()
  };

  if (method === 'post' && config.data && isObject(config.data) && _isQs) {
    config.data = qs.stringify(config.data);
  }
  if (method === 'get') {
    if (_cache) {
      config.data = config.data ? Object.assign(config.data, time) : time;
    }

    config.params = config.data;
    delete config.data;
  }
  if (_headers) {
    config.headers = _headers;
  }

  _beforeSend();
  return new Promise(function (resolve, reject) {
    interceptInstance
      .request(config)
      .then(function (response: any) {
        _complete();
        if (!response || !response.data) reject(`error，response：${response}`);
        if (options.lowercasekey || defaultConfig.lowercasekey) {
          resolve(_convertKeysToLowerCase(response.data));
        }
        resolve(response.data);
      })
      .catch(function (thrown: any) {
        _complete();
        const result = getResponseErrorType(thrown);

        if (result) {
          if (isInterceptors && _interceptorCore('interceptError', options, result)) {
            return;
          }
          reject(result);
        }
        if (!(interceptInstance.isCancel && interceptInstance.isCancel(thrown))) {
          reject(thrown);
        }
      });
  });
};
/**
 * @function Ajax 单个接口请求
 * @param  {Object} options {接口请求参数}
 * @return {Object} {接口响应结果}
 */
const ajax = function (options: any): Promise<unknown> {
  isInterceptors = options.hasOwnProperty('isInterceptors')
    ? options.isInterceptors
    : isInterceptors;
  _addInterceptors(options);
  return _sendCore(options);
};
/**
 * @function All 同步接口请求
 * @param  {Arrary} list {接口列表}
 * @param  {Function} back {接口响应回调函数}
 *
 */
const all = function (list: any, back: any) {
  const _back = typeof back === 'function' ? back : emptyFn();

  if (typeof list === 'function') {
    list = [list];
  }
  axios
    .all(list)
    .then(
      axios.spread(function (acct, perms) {
        const paramsArray: Array<any> = [];

        for (var i = 0; i < arguments.length; i++) {
          paramsArray[i] = arguments[i];
        }
        _back(Array.prototype.slice.call(arguments));
      })
    )
    .catch(function (thrown) {
      back(thrown);
    });
};
/**
 * @function getResponseErrorType 获取自定义接口响应失败类型
 * @param  {Object} thrown {接口响应失败内容}
 * @return {Object} {接口响应失败数据}
 */
const getResponseErrorType = function (thrown: any) {
  let obj: any = null;
  let timeoutObj = {
    Message: 'timeout',
    Data: null,
    Code: 666
  };
  let networkError = {
    Message: 'Network Error',
    Data: null,
    Code: 555
  };
  if (thrown && thrown.message && thrown.message.indexOf('timeout') > -1) {
    obj = timeoutObj;
  }
  if (thrown && thrown.message && thrown.message.indexOf('Network Error') > -1) {
    obj = networkError;
  }
  obj = !!obj ? obj : thrown;
  return obj;
};
/**
 * @function isNoEmptyObject 判断对象是否为空
 * @param  {Object} obj {参数}
 * @return {Boolean} { true 对象为空 false对象不为空}
 */
const isNoEmptyObject = function (obj: any) {
  for (const key in obj) {
    return false; // only for eslint
  }
  return true;
};
/**
 * @function isObject 判断是否是对象
 * @param  {Object} obj {参数}
 * @return {Boolean} {true 是对象 false 不是对象}
 */
const isObject = function (obj: any) {
  return Object.prototype.toString.call(obj) === '[object Object]';
};
/**
 * @function setDefaults 设置默认数据
 * @param  {Object} obj {默认数据}
 *
 */
let setDefaults = function (obj: any) {
  if (isObject(obj) && !isNoEmptyObject(obj)) {
    for (var i in interceptor) {
      interceptor[i] = obj[i] || interceptor[i];
    }
    for (var i in defaultConfig) {
      defaultConfig[i] = obj[i] || defaultConfig[i];
    }
    axios.defaults.withCredentials = obj.hasOwnProperty('withCredentials')
      ? obj.withCredentials
      : !!axios.defaults.withCredentials;
  }
};
/**
 * @function setHeaders
 * @param  {Object} params {请求参数}
 *
 */
//此方法v1.6.6+版本将不支持
var setHeaders = function (params: any) {
  defaultConfig.headers = params || null;
};
const Http = { ajax, all, setDefaults, setHeaders, axios };
export default Http;
