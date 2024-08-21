declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<{}, {}, any>;
  export default component;
}
// shims-vue.d.ts
import { ComponentCustomProperties } from 'vue';
import { I18n } from 'vue-i18n';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: I18n['t'];
  }
}
