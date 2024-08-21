<template>
  <div class="text-center">
    <div
      v-for="(toast, index) in toastMessages"
      :key="index"
      class="toast-message"
    >
      {{ toast }}
      <v-snackbar
        v-model="toast.show"
        multi-line
        vertical
        :timeout="toast.info.timeout"
        location="right top"
        variant="outlined"
        rounded="md"
        contentClass="snackbar-content"
        :tile="true"
      >
        <template v-slot:default>
          <v-alert
            color=" #212121"
            border="top"
            style="background-color: #212121"
            border-color="success "
            rounded="md"
            icon="$success"
            theme="dark"
          >
            <template v-slot:prepend>
              <VIcon color="success">mdi-check-circle-outline</VIcon>
            </template>
            <div style="color: var(--gray08)">
              {{
                toast.info.message
              }}ddddddddddddddddddddddddddddddddddddddddddd
            </div>
          </v-alert>
        </template>
        <template v-slot:actions>
          <div style="width: 100%; height: 100%">
            <v-btn color="primary" variant="text" @click="toast.show = false">
              {{ toast.info.buttonMsg }} {{ $t('close') }}
            </v-btn>
          </div>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useAppCommonStore } from '@/store';
import { storeToRefs } from 'pinia';
import router from '@/router';

const appStatusStore = useAppCommonStore();
const { toastMessages } = storeToRefs(appStatusStore);
console.log('toastMessages', toastMessages.value);
</script>

<style lang="scss" scoped>
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
</style>
