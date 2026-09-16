import { onMounted, onUnmounted, ref } from 'vue';

/**
 * @param {Ref} targetRef - 想要监听的 DOM 元素或组件的 ref
 * @param {Function} callback - 点击外部时的回调函数
 */
export function useClickOutside(targetRef: any, callback: any) {
  const elRef = ref<HTMLElement>();

  const handler = (event: any) => {
    const el = elRef.value;
    if (!el || el.contains(event.target)) return;
    callback(event);
  };

  onMounted(() => {
    const target = targetRef.value;
    elRef.value = target?.$el ?? target;
    document.addEventListener('pointerdown', handler);
  });

  onUnmounted(() => {
    document.removeEventListener('pointerdown', handler);
  });
}

export default useClickOutside;
