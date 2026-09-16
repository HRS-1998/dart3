// deep合并传递的参数,对未传递参数使用默认值

import { computed } from 'vue';
import { merge } from 'lodash-es';
import type { LeftPanelConfig, RightPanelConfig } from '../types/index';
export const useMergeConfig = <T extends LeftPanelConfig | RightPanelConfig>(
  defaultConfig: T,
  propsConfig: T,
) => {
  if (!propsConfig) propsConfig = {} as T;
  const mergedConfig = computed(() => {
    return merge({}, defaultConfig, propsConfig || {});
  });

  return {
    mergedConfig,
  };
};
