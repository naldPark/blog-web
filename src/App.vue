<script lang="ts" setup>
import { onMounted } from 'vue';
import { useLanguageStore } from '@/store/languageStore';
import ToastMessage from '@/features/common/ToastMessage.vue';
import LoadingOverlay from '@/features/common/LoadingOverlay.vue';
import CustomDialog from '@/features/dialog/CustomDialog.vue';

const languageStatusStore = useLanguageStore();
onMounted(() => {
  /** 저장된 언어 설정 호출 */
  languageStatusStore.loadLanguage();
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  // 리사이즈 이벤트 리스너 등록
  window.addEventListener('resize', () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
});
</script>

<template>
  <VApp>
    <RouterView />
    <ToastMessage />
    <LoadingOverlay />
    <CustomDialog />
  </VApp>
</template>

<style lang="scss">
$sm-breakpoint: 340px;
$md-breakpoint: 600px;
$lg-breakpoint: 960px;
$xl-breakpoint: 1264px;

$display-breakpoints: (
  'xs': 0,
  'sm': 340px,
  'md': 540px,
  'lg': 800px - 24px,
  'xl': 1280px - 24px,
);

#app {
  height: calc(var(--vh, 1vh) * 100);
  overflow: unset;

  .v-application--wrap {
    min-height: calc(var(--vh, 1vh) * 100) !important; // override
  }
}
</style>
