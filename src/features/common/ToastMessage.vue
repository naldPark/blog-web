<script lang="ts" setup>
import { useAppCommonStore } from '@/store/appCommonStore';
import { storeToRefs } from 'pinia';
import Button from '@/components/common/Button.vue';

const { toasts } = storeToRefs(useAppCommonStore());

const getIconAndColor = (type: string) =>
  ({
    success: { icon: 'mdi-check-circle', color: '#4CAF50' },
    error: { icon: 'mdi-close-circle', color: '#c24c4f' },
    warning: { icon: 'mdi-alert-circle', color: '#6ed7f5' },
    info: { icon: 'mdi-information-outline', color: '#fcd97c' },
  })[type] || { icon: 'mdi-alert-circle', color: '#6ed7f5' };

const getColor = (type: string) => getIconAndColor(type).color;
const getIcon = (type: string) => getIconAndColor(type).icon;

const handleButtonClick = (toast: {
  info: { buttonCallback?: () => void };
  show: boolean;
}) => {
  toast.info.buttonCallback?.() ?? (toast.show = false);
};
</script>

<template>
  <div class="text-center">
    <VSnackbar
      v-for="(toast, index) in toasts"
      :key="index"
      v-model="toast.show"
      multi-line
      vertical
      :timeout="toast.info.timeout"
      location="right top"
      variant="outlined"
      rounded="md"
      content-class="snackbar-content"
      tile
      max-width="100%"
      class="ml-3"
    >
      <VAlert
        :color="getColor(toast.info.type)"
        :border="'top'"
        style="background-color: #212121"
        :border-color="getColor(toast.info.type)"
        rounded="sm"
        class="text-white"
        width="400"
        theme="dark"
      >
        <template v-slot:prepend>
          <VIcon :size="28" :color="getColor(toast.info.type)">
            {{ getIcon(toast.info.type) }}
          </VIcon>
        </template>
        <template v-slot:title>
          <div :style="{ color: getIcon(toast.info.type) }">
            {{ toast.info.title ?? toast.info.type }}
          </div>
        </template>
        <template v-slot:text>
          <div class="message">{{ toast.info.message }}</div>
        </template>
      </VAlert>
      <template v-slot:actions v-if="toast.info.showButton">
        <Button
          color="grey"
          variant="text"
          @click="handleButtonClick(toast)"
          :label="toast.info.buttonMsg ?? $t('close')"
        />
      </template>
    </VSnackbar>
  </div>
</template>

<style lang="scss" scoped></style>
