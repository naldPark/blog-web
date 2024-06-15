/// <reference types="vite/client" />

interface ImportMetaEnv {
  [key: string]: any;
  BASE_URL: string;
  MODE: string;
  DEV: boolean;
  PROD: boolean;
  SSR: boolean;
}
interface ImportMeta {
  url: string;

  readonly hot?: import('./hot').ViteHotContext;

  readonly env: ImportMetaEnv;

  glob: import('./importGlob').ImportGlobFunction;
}

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// declare module '*.css' {
//   const content: { [className: string]: string };
//   export default content;
// }
