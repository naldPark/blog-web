<template>
  <VApp>
    <RouterView />
    <ToastMessage />
    <LoadingOverlay />
    <CustomDialog />
    <!-- <div class="toast-wrapper">
      <div
        v-for="(info, index) in toastMessages"
        :key="index"
        :class="{ hide: info.info.hide }"
        class="toast-message"
      >
        <div class="message-wrapper">
          <VIcon v-if="info.info.type === 'success'"
            >mdi-check-circle-outline</VIcon
          >
          <VIcon v-if="info.info.type === 'error'"
            >mdi-close-circle-outline</VIcon
          >
          <VIcon v-if="info.info.type === 'warning'"
            >mdi-alert-circle-outline</VIcon
          >
          <span class="message" style="white-space: pre">
            <span v-if="info.info.inputMsg" class="input-message"
              >{{ info.info.inputMsg }}&nbsp;</span
            >
            {{ info.info.message }}
          </span>
          <VBtn
            v-if="info.info.buttonCallback"
            @click="info.info.buttonCallback"
            style="margin-left: 16px"
            class="app-g-button line-button size-xsmall"
          >
            {{ info.info.buttonMsg ? info.info.buttonMsg : $t('showNow') }}
          </VBtn>
        </div>
      </div>
    </div>
    <VOverlay
      :model-value="showUIBlocker"
      class="align-center justify-center"
      z-index="1000"
    >
      <VProgressCircular color="primary" indeterminate></VProgressCircular>
    </VOverlay>

    <VDialog
      v-model="showDialog"
      max-width="500px"
      overlay-color="black"
      overlay-opacity="0.8"
      @click:outside="onClickDialogClose"
    >
      <div class="dialog-wrapper pa-3">
        <div class="dialog-title">
          <span>
            <VIcon class="text-primary mr-3">mdi-information</VIcon
            >{{ dialogInfo.title }}
          </span>
          <VSpacer></VSpacer>
          <VBtn fab plain small right @click="onClickDialogClose">
            <VIcon dark>mdi-close-circle-outline</VIcon>
          </VBtn>
        </div>
        <VDivider></VDivider>
        <div class="dialog-description">
          {{ dialogInfo.description }}
        </div>
        <div class="button-wrapper">
          <VBtn
            class="ma-1"
            color="grey"
            plain
            v-if="!dialogInfo.invisibleClose"
            @click="onClickDialogClose"
          >
            {{ dialogInfo.cancelButtonText }}
          </VBtn>
          <VBtn class="ma-1" color="primary" plain @click="onClickDialog">
            {{ dialogInfo.buttonText }}
          </VBtn>
        </div>
      </div>
    </VDialog> -->
  </VApp>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { useLanguageStore } from '@/store';
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
