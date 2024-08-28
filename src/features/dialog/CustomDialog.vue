<template>
  <VDialog
    v-model="dialogInfo.show"
    max-width="500px"
    overlay-color="black"
    overlay-opacity="0.8"
    @click:outside="onClickDialogClose"
  >
    <VCard
      rounded="lg"
      max-width="400"
      prepend-icon="mdi-information"
      :text="dialogInfo.description"
      :title="dialogInfo.title"
    >
      <template v-slot:actions>
        <VBtn
          variant="text"
          class="ma-1"
          color="grey"
          shape=""
          v-if="dialogInfo.showCloseButton"
          @click="onClickDialogClose"
        >
          {{ dialogInfo.cancelButtonText }}
        </VBtn>
        <VBtn class="ma-1" color="primary" plain @click="onClickDialog">
          {{ dialogInfo.buttonText }}
        </VBtn>
      </template>
    </VCard>
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
};
</script>

<style lang="scss" scoped></style>
