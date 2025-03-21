<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAppCommonStore } from '@/store/appCommonStore';
import infraService from '@/api/infraService';
import Button from '@/components/common/Button.vue';

interface StatusItems {
  name: string;
  icon: string;
  color: string;
}
const appStatusStore = useAppCommonStore();
const { t } = useI18n();

// Router
const router = useRouter();

// State variables
const initiallyOpen = ref(['src']);
const showPwd = ref(false);
const selectedTree = ref<any[]>([]);
const selectedStatusItem = ref<any>({
  name: 'Running',
  icon: 'mdi-play',
  color: 'orange',
});

// Files and tree items data
const files: any = {
  html: 'mdi-language-html5',
  js: 'mdi-nodejs',
  ts: 'mdi-language-typescript',
  json: 'mdi-code-json',
  md: 'mdi-language-markdown',
};

// Status items data
const statusItems = ref<StatusItems[]>([
  {
    name: 'Running',
    icon: 'mdi-play',
    color: 'orange',
  },
  {
    name: 'Stop',
    icon: 'mdi-stop',
    color: '#FF0000',
  },
  {
    name: 'Start',
    icon: 'mdi-play',
    color: '#2391FF',
  },
  {
    name: 'Waiting',
    icon: 'mdi-circle-outline',
    color: '#FF9500',
  },
  {
    name: 'Stopping',
    icon: 'mdi-circle-outline',
    color: '#FF0000',
  },
  {
    name: 'Unknown',
    icon: 'mdi-circle-outline',
    color: '#868E96',
  },
]);

const treeItems = ref<any[]>([
  {
    title: 'Dockerfile',
  },
  {
    title: 'node_modules',
  },
  {
    title: 'dist',
    children: [
      {
        title: 'Pty.js',
        file: 'js',
      },
      {
        title: 'Socket.js',
        file: 'js',
      },
      {
        title: 'Pty.js',
        file: 'js',
      },
    ],
  },
  {
    title: 'src',
    children: [
      {
        title: 'Pty.ts',
        file: 'ts',
      },
      {
        title: 'Socket.ts',
        file: 'ts',
      },
      {
        title: 'Pty.ts',
        file: 'ts',
      },
    ],
  },
  {
    title: 'package-lock.json',
    file: 'json',
  },
  {
    title: 'tsconfig.json',
    file: 'json',
  },
  {
    title: 'package.json',
    file: 'json',
  },
]);

const copyClipboard = async () => {
  const text = 'qwerty1234';
  try {
    await navigator.clipboard.writeText(text);
    appStatusStore.showToast({
      type: 'success',
      message: `${t('copied')}`,
    });
  } catch (err) {
    appStatusStore.showToast({
      type: 'error',
      message: `${t('copyFailed')}`,
    });
  }
};

const onChangeStatus = (e: any) => {
  if (e === 'Start') {
    infraService.getSandboxAccessPoint().then((res: any) => {
      console.log(res);
    });
  } else if (e === 'Stop') {
    console.log('스탑');
  }
};

const accessEndpoint = () => {
  router
    .push({
      name: 'SandboxTerminalPage',
    })
    .catch((err) => err);
};
</script>
<template>
  <div class="sandbox-wrapper">
    <VCard variant="outlined" elevation="0" class="sandbox-card">
      <VCardTitle class="text-subtitle-1 text-primary">
        {{ t('sandbox.funcInfo') }}
      </VCardTitle>
      <VCardText class="mb-3">
        <p class="subtitle-2 text-white mt-3 mb-1">{{ t('sandbox.rules') }}</p>
        <h4 class="ec2-content font-weight-light" style="margin-right: 12px">
          {{ t('sandbox.rulesDesc') }}
        </h4>
        <p class="subtitle-2 text-white mt-3 mb-1">
          {{ t('sandbox.howToUse') }}
        </p>
        <div class="ec2-content font-weight-light" style="margin-right: 12px">
          {{ t('sandbox.howToUseDesc') }}
        </div>
      </VCardText>
    </VCard>
    <VCard variant="outlined" elevation="0" class="sandbox-card">
      <VCardTitle class="text-subtitle-1 text-primary">
        {{ t('sandbox.environmentInfo') }}
      </VCardTitle>
      <VCardText>
        <p class="subtitle-2 mt-3 mb-1">{{ t('sandbox.status') }}</p>
        <VSelect
          style="max-width: 300px"
          item-text="name"
          class="input-custom pt-0"
          v-model="selectedStatusItem"
          :items="statusItems"
          @change="onChangeStatus"
        >
          <template v-slot:selection="item">
            <span>
              <VIcon
                :style="{ color: item.item.value.color }"
                :icon="item.item.value.icon"
              />
              {{ item.item.value.name }}
            </span>
          </template>
          <template v-slot:item="{ item }">
            <span>
              <VIcon
                :style="{ color: item.value.color }"
                :icon="item.value.icon"
              />
              {{ item.value.name }}
            </span>
          </template>
        </VSelect>
        <VRow class="mt-3 mb-1 align-center">
          <VCol cols="12" sm="6">
            <p class="subtitle-2 text-white mt-3 mb-1">
              {{ t('sandbox.instanceInfo') }}
            </p>
            <span class="ec2-content">
              <VIcon class="text-primary mr-1" icon="mdi-ubuntu" />
              Linux
            </span>
            <Button
              small
              @click="accessEndpoint"
              :label="t('sandbox.startInstance')"
            />
          </VCol>
          <VCol cols="12" sm="6">
            <p class="subtitle-2 text-white mt-3 mb-1">
              {{ t('sandbox.instancePwd') }}
            </p>
            <span class="ec2-content" v-if="!showPwd">
              <VIcon class="text--grey" icon="mdi-eye-off-outline" />
              ******
            </span>
            <span class="ec2-content" v-else @click="copyClipboard">
              <VIcon class="text--grey" icon="mdi-eye-outline" />
              qwerty1234
            </span>
            <Button
              color="background"
              small
              variant="flat"
              @click="showPwd = !showPwd"
              :label="showPwd ? t('hide') : t('show')"
            />
          </VCol>
        </VRow>
        <p class="subtitle-2 text-white mt-3 mb-1">
          {{ t('sandbox.containerImage') }}
        </p>
        <span class="ec2-content" style="margin-right: 12px">
          /node:16.14.0
        </span>
      </VCardText>
    </VCard>
    <VCard variant="outlined" elevation="0" class="sandbox-card">
      <VCardTitle class="text-subtitle-1 text-primary">
        {{ t('sandbox.sourceFolder') }}
      </VCardTitle>
      <VCardText>
        <VTreeview
          v-model="selectedTree"
          class="source-folder"
          :opened="initiallyOpen"
          item-key="name"
          :items="treeItems"
          activatable
          open-on-click
        >
          <template v-slot:prepend="{ item }">
            <VIcon v-if="!item.file" icon="mdi-folder" />
            <VIcon v-else :icon="files[item.file]" />
          </template>
        </VTreeview>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss" scoped>
.sandbox-wrapper {
  height: 100%;

  .sandbox-card {
    color: darkgray;
    margin-top: 10px;
    background: transparent;

    .source-folder {
      font-size: 9pt !important;
      background: transparent;
    }

    .ec2-content {
      margin-left: 10px;
      margin-right: 12px;
      color: rgb(134, 134, 134) !important;
    }
  }
}
</style>
