/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent;
  export default component;
}

// fix i18n
declare module 'element-plus/dist/locale/en.mjs';
declare module 'element-plus/dist/locale/zh-cn.mjs';
