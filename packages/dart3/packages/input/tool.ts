/* eslint-disable */
export default {
  /**
   * @function {过滤数字 控制结尾位数的浮点数}
   * @param  {string} str {过滤的数据}
   * @param  {number} n   {过滤类型}
   * @return {string} {浮点数/整数/有点号结尾的数字}
   */
  numberToFixed(str: string, n: number) {
    var patter = /^-{0,1}0\.\d{0,}|^-{0,1}[1-9]{1}\d*\.{0,1}\d{0,}/; //浮点数
    var result = str.replace(/[^\d\.]/g, '');
    var type = '';
    if (str === '') {
      return '';
    }
    if (n === 0) {
      if (str.charAt(0) === '-') {
        type = '-';
      }
    }

    if (n === 2) {
      type = '-';
    }
    if (result.charAt(0) === '.') {
      result = '0' + result;
    }

    result = type + result;
    //result = result.replace(/^(-{0,1})0{1,}(\d+)/, '$1$2');

    return result.match(patter) === null
      ? result
      : (result.match(patter) as Array<any>)[0];
  },
  /**
   * @function {整数过滤}
   * @param  {string} str {过滤的数据}
   * @param  {number} n   {过滤类型 {0:整数,1:正整数,2:负整数}}
   * @return {string} {整数}
   */
  integeFilter(str: string, n: number) {
    var type = '';
    var value;
    if (str === '') {
      return '';
    }
    if (str.charAt(0) === '-') {
      type = '-';
    }
    if (n === 1) {
      type = '';
    }
    if (n === 2) {
      type = '-';
    }
    value = str.replace(/[^\d]/g, '');
    value = value.replace(/^0*/, '');
    return type + '' + value;
  },
};
