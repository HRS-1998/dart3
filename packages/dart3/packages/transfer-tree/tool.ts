export const deepCopy = (data: any) => {
  return JSON.parse(JSON.stringify(data));
};
//一维数组 转 对象
export const arrayToObject = (arr: any[]) => {
  const obj: any = {};
  arr.forEach((item: any) => {
    obj[item] = item;
  });
  return obj;
};
//数组合并去重
export const arrayConcatClear = (data1: any[], data2: any[]) => {
  const data = data1.concat(data2);
  return Array.from(new Set(data));
};

//判断是否超出长度
export const checkEllipsis = (boxEl: HTMLElement) => {
  const contentEl = boxEl.querySelector('.content');
  const computedStyle = getComputedStyle(boxEl);
  const pLeft = computedStyle.paddingLeft;
  const pRight = computedStyle.paddingRight;
  const horizontalPadding = parseFloat(pLeft) + parseFloat(pRight);
  if (!boxEl || !contentEl) {
    return false;
  }
  if (boxEl.clientWidth <= (contentEl as HTMLElement).offsetWidth + horizontalPadding) {
    return true;
  } else {
    return false;
  }
};
