<template>
  <VApp>
    <RouterView />
    <div class="toast-wrapper">
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
    </VDialog>
  </VApp>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useAppCommonStore, useLanguageStore } from '@/store';
  import Config from '@/config';
  import { storeToRefs } from 'pinia';
  const appStatusStore: any = useAppCommonStore();

  const languageStatusStore = useLanguageStore();
  const showDialog = ref(false);
  // const appStatusStore = useAppCommonStore();
  const showUIBlocker = appStatusStore.showUIBlocker;
  const dialogInfo = appStatusStore.dialogInfo;
  const toastMessages = appStatusStore.toastMessages;

  const onClickDialogClose = () => {
    showDialog.value = false;
    appStatusStore.hideDialog();
  };

  const onClickDialog = () => {
    if (dialogInfo.value.action) {
      dialogInfo.value.action();
    }
    showDialog.value = true;
  };

  onMounted(() => {
    // 초기 로드
    languageStatusStore.loadLanguage(); // Pinia 스토어의 액션을 호출합니다
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener('resize', () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
  });
</script>

<style lang="scss" scoped>
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
      min-height: calc(var(--vh, 1vh) * 100) !important; // 덮어씌우기
    }
  }

  .toast-wrapper {
    position: fixed;
    display: flex;
    flex-direction: column;
    left: 0;
    top: 0;
    align-items: center;
    width: 100%;
    height: 0;
    z-index: 10000;

    .toast-message {
      background: rgba(10, 10, 10, 0.96) !important;
      padding: 10px;
      border-radius: 12px;
      margin-bottom: 20px;

      &:first-child {
        margin-top: 130px;

        &.hide {
          transition: all 0.5s ease-in-out;
          opacity: 0;
          margin-top: 50px;
        }
      }

      .message-wrapper {
        display: flex;
        align-items: center;
        float: left;
        height: 32px;

        .VIcon {
          font-size: 24px;
          margin-right: 14px;
        }

        .mdi-check-circle-outline {
          color: #ffce4c;
        }

        .mdi-close-circle-outline {
          color: #d47174;
        }

        .mdi-alert-circle-outline {
          color: #ffce4c;
        }

        .message {
          font-size: 13px;
          line-height: 18.82px;
          color: var(--gray7);
        }

        .input-message {
          font-size: 13px;
          line-height: 18.82px;
          color: var(--gray5);
        }
      }
    }
  }

  .dialog-wrapper {
    background-color: rgb(20 20 20);

    .dialog-title {
      height: 45px;
      padding: 0 24px;
      display: flex;
      align-items: center;
      font-size: 1.3rem;
      font-weight: 300;

      .icon-close {
        font-size: 26px;
        color: var(--gray5);
        cursor: pointer;
      }
    }

    .dialog-description {
      display: block;
      padding: 24px 36px 48px;
      white-space: pre-line;
      font-size: 1rem;
      line-height: 22px;
    }

    .button-wrapper {
      width: 100%;
      height: 68px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 24px;
      line-height: 20px;
    }
  }
</style>
