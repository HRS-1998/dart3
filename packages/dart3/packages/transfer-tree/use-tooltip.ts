import { ref } from 'vue';

export default function useTooltip(showOverflowTooltip: boolean) {
  const toolRef = ref();
  const toolVisible = ref(false);
  const toolTip = ref('');
  const checkEllipsis = (boxEl: HTMLElement) => {
    if (!boxEl) {
      return false;
    }
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

  function showTooltip(el: any, text: string = '') {
    if (!showOverflowTooltip) {
      return;
    }
    toolRef.value = el.currentTarget;
    if (checkEllipsis(el.target)) {
      toolVisible.value = true;
      toolTip.value = text;
    }
    return '';
  }
  return {
    showTooltip,
    toolRef,
    toolVisible,
    toolTip
  };
}
