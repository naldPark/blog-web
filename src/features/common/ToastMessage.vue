<script lang="ts" setup>
import { useAppCommonStore } from '@/store';
import { storeToRefs } from 'pinia';
import Button from '@/components/common/Button.vue';

const { toastMessages } = storeToRefs(useAppCommonStore());

const getIconAndColor = (type: string) =>
  ({
    success: { icon: 'mdi-check-circle', color: '#4CAF50' },
    error: { icon: 'mdi-close-circle', color: '#c24c4f' },
    warning: { icon: 'mdi-alert-circle', color: '#6ed7f5' },
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
    <v-snackbar
      v-for="(toast, index) in toastMessages"
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
    >
      <v-alert
        :color="getColor(toast.info.type)"
        :border="'top'"
        style="background-color: #212121"
        :border-color="getColor(toast.info.type)"
        rounded="sm"
        width="400"
        theme="dark"
      >
        <template v-slot:prepend>
          <v-icon :size="28" :color="getColor(toast.info.type)">
            {{ getIcon(toast.info.type) }}
          </v-icon>
        </template>
        <template v-slot:title>
          <div :style="{ color: getIcon(toast.info.type) }" class="title">
            {{ toast.info.title ?? toast.info.type }}
          </div>
        </template>
        <template v-slot:text>
          <div class="message">{{ toast.info.message }}</div>
        </template>
      </v-alert>
      <template v-slot:actions v-if="toast.info.showButton">
        <Button
          color="grey"
          variant="text"
          @click="handleButtonClick(toast)"
          :label="toast.info.buttonMsg ?? $t('close')"
        />
      </template>
    </v-snackbar>
  </div>
</template>

<style lang="scss" scoped></style>
