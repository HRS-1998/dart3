/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module 'sortablejs' {
  export default destroy;
}

declare module '*.svg' {
  export default destroy;
}
