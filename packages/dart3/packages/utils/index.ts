import type { AppContext, Plugin, App } from 'vue';
import { ElMessage } from 'element-plus';
import type { messageType } from 'element-plus';
type SFCWithInstall<T> = T & Plugin;

type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _context: AppContext | null;
};

const looseEqual = function (a: any, b: any) {
  const isObject = function (obj: any) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  };
  const isObjectA = isObject(a);
  const isObjectB = isObject(b);

  if (isObjectA && isObjectB) {
    return JSON.stringify(a) === JSON.stringify(b);
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  }
  return false;
};
const arrayEquals = function (arrayA: any, arrayB: any) {
  arrayA = arrayA || [];
  arrayB = arrayB || [];

  if (arrayA.length !== arrayB.length) {
    return false;
  }

  for (let i = 0; i < arrayA.length; i++) {
    if (!looseEqual(arrayA[i], arrayB[i])) {
      return false;
    }
  }

  return true;
};

const merge = (target: any, ...arg: any) => {
  return arg.reduce((acc: any, cur: any) => {
    return Object.keys(cur).reduce((subAcc, key) => {
      const srcVal = cur[key];
      if (isObject(srcVal)) {
        subAcc[key] = merge(subAcc[key] ? subAcc[key] : {}, srcVal);
      } else if (isArray(srcVal)) {
        // series: []，下层数组直接赋值
        subAcc[key] = srcVal.map((item: any, idx: number) => {
          if (isObject(item)) {
            const curAccVal = subAcc[key] ? subAcc[key] : [];
            return merge(curAccVal[idx] ? curAccVal[idx] : {}, item);
          } else {
            return item;
          }
        });
      } else {
        subAcc[key] = srcVal;
      }
      return subAcc;
    }, acc);
  }, target);
};
const isObject = (value: any) => {
  return Object.prototype.toString.call(value) === '[object Object]';
};
const isArray = (value: any) => {
  return Object.prototype.toString.call(value) === '[object Array]';
};
const deepCopy = (val: any) => {
  return JSON.parse(JSON.stringify(val));
};
export default {
  isArray,
  deepCopy: deepCopy,
  isString(value: any) {
    return Object.prototype.toString.call(value) === '[object String]';
  },
  isFunction(value: any) {
    return Object.prototype.toString.call(value) === '[object Function]';
  },
  isNumber(value: any) {
    return Object.prototype.toString.call(value) === '[object Number]';
  },
  isObject,
  isNull(value: any) {
    return Object.prototype.toString.call(value) === '[object Null]';
  },
  isUndefined(value: any) {
    return Object.prototype.toString.call(value) === '[object Undefined]';
  },
  isBoolean(value: any) {
    return Object.prototype.toString.call(value) === '[object Boolean]';
  },
  valueEquals(a: any, b: any) {
    if (a === b) return true;
    if (!(a instanceof Array)) return false;
    if (!(b instanceof Array)) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i !== a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  },
  objToArray(obj: any) {
    if (Array.isArray(obj)) {
      return obj;
    }
    return this.isEmpty(obj) ? [] : [obj];
  },
  isEmpty(val: any) {
    // null or undefined
    if (val == null) return true;

    if (typeof val === 'boolean') return false;

    if (typeof val === 'number') return !val;

    if (val instanceof Error) return val.message === '';

    switch (Object.prototype.toString.call(val)) {
      // String or Array
      case '[object String]':
      case '[object Array]':
        return !val.length;

      // Map or Set or File
      case '[object File]':
      case '[object Map]':
      case '[object Set]': {
        return !val.size;
      }
      // Plain Object
      case '[object Object]': {
        return !Object.keys(val).length;
      }
    }

    return false;
  },
  isEquals(value1: any, value2: any) {
    if (Array.isArray(value1) && Array.isArray(value2)) {
      return arrayEquals(value1, value2);
    }
    return looseEqual(value1, value2);
  },
  merge,
};

export const withInstall = <T, E extends Record<string, any>>(
  main: T,
  extra?: E,
) => {
  (main as SFCWithInstall<any>).install = (app: any): void => {
    // for (const comp of [main, ...Object.values(extra ?? {})]) {
    //   app.component(comp.name, comp);
    // }
    app.component((main as any).name, main);
  };

  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      (main as any)[key] = comp;
    }
  }
  return main as SFCWithInstall<T> & E;
};
export const withInstallFunction = <T>(fn: T, name: string) => {
  (fn as SFCWithInstall<T>).install = (app: App, opts = {}) => {
    (fn as SFCInstallWithContext<T>)._context = app._context;
    if (!app.config.globalProperties.$dart) {
      app.config.globalProperties.$dart = {};
    }
    app.config.globalProperties.$dart[name] = fn;
    (fn as any).setDefaults(opts);
  };

  return fn as SFCInstallWithContext<T>;
};

export const showMessage = (msg: string, type?: messageType): void => {
  ElMessage({
    message: msg || 'error',
    type: type || 'error',
  });
};

export function to<T, U = any>(
  promise: Promise<T>,
  errorExt?: object
): Promise<[U | null, T | undefined]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err) => {
      if (errorExt) {
        Object.assign(err, errorExt);
      }

      return [err, undefined];
    });
}
