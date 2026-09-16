import { ref } from 'vue';

const MOBILE_MAX_WIDTH = 768; // 视口窄于此宽度视为移动端（响应式断点）

// 模块级单例：所有调用方共享同一份 ref 与监听，避免每个组件重复挂载
const isMobile = ref(false);
const isPortrait = ref(false);
let initialized = false;

const checkDevice = () => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return;

  const userAgent = navigator.userAgent;
  // 检测是否为手机端（排除 iPad）
  const isMobileUA =
    /Android|webOS|iPhone|iPod|BlackBerry/i.test(userAgent) &&
    !/iPad/i.test(userAgent);

  const isPortraitMode = window.matchMedia('(orientation: portrait)').matches;
  const isNarrowViewport = window.matchMedia(
    `(max-width: ${MOBILE_MAX_WIDTH}px)`,
  ).matches;

  // 手机端竖屏，或视口窄于断点（覆盖桌面浏览器拖窄场景）→ mobile
  // 手机端横屏视为非手机端（保留原兜底降级语义）
  isMobile.value = (isMobileUA && isPortraitMode) || isNarrowViewport;
  isPortrait.value = isPortraitMode;
};

const initListeners = () => {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;

  checkDevice();
  window.addEventListener('resize', checkDevice);
  window
    .matchMedia('(orientation: portrait)')
    .addEventListener('change', checkDevice);
  window
    .matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`)
    .addEventListener('change', checkDevice);
};

const useDevice = () => {
  initListeners();
  return { isMobile, isPortrait };
};

export default useDevice;
