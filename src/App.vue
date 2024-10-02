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
</style>
