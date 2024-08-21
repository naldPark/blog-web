<template>
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
          <VIcon class="text-primary mr-3">mdi-information</VIcon>
          {{ dialogInfo.title }}
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
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useAppCommonStore } from '@/store';
  import { storeToRefs } from 'pinia';

  const appStatusStore = useAppCommonStore();
  const showDialog = ref(false);
  const { dialogInfo } = storeToRefs(appStatusStore);

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
    // Your initialization code here
  });
</script>

<style lang="scss" scoped>
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
