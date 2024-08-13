<template>
  <div class="sandbox-wrapper">
    <v-card variant="outlined" elevation="0" class="sandbox-card">
      <v-card-title class="text-subtitle-1 text-primary">{{
        $t('sandbox.funcInfo')
      }}</v-card-title>
      <v-card-text class="mb-3">
        <p class="subtitle-2 text-white mt-3 mb-1">{{ $t('sandbox.rules') }}</p>
        <h4 class="ec2-content font-weight-light" style="margin-right: 12px">
          {{ $t('sandbox.rulesDesc') }}
        </h4>
        <p class="subtitle-2 text-white mt-3 mb-1">
          {{ $t('sandbox.howToUse') }}
        </p>
        <div class="ec2-content font-weight-light" style="margin-right: 12px">
          {{ $t('sandbox.howToUseDesc') }}
        </div>
      </v-card-text>
    </v-card>
    <v-card variant="outlined" elevation="0" class="sandbox-card">
      <v-card-title class="text-subtitle-1 text-primary">
        {{ $t('sandbox.environmentInfo') }}
      </v-card-title>
      <v-card-text>
        <p class="subtitle-2 mt-3 mb-1">{{ $t('sandbox.status') }}</p>
        <v-select
          style="max-width: 300px"
          item-text="name"
          class="input-custom pt-0"
          v-model="selectedStatusItem"
          :items="statusItems"
          @change="onChangeStatus"
        >
          <template v-slot:selection="item">
            <span>
              <v-icon :style="{ color: item.item.value.color }">{{
                item.item.value.icon
              }}</v-icon>
              {{ item.item.value.name }}
            </span>
          </template>
          <template v-slot:item="{ item }">
            <span>
              <v-icon :style="{ color: item.value.color }">{{
                item.value.icon
              }}</v-icon>
              {{ item.value.name }}
            </span>
          </template>
        </v-select>
        <v-row class="mt-3 mb-1 align-center">
          <v-col cols="12" sm="6">
            <p class="subtitle-2 text-white mt-3 mb-1">
              {{ $t('sandbox.instanceInfo') }}
            </p>
            <span class="ec2-content">
              <v-icon class="text-primary mr-1">mdi-ubuntu</v-icon>
              Linux
            </span>
            <v-btn color="error" rounded small @click="accessEndpoint">{{
              $t('sandbox.startInstance')
            }}</v-btn>
          </v-col>
          <v-col cols="12" sm="6">
            <p class="subtitle-2 text-white mt-3 mb-1">
              {{ $t('sandbox.instancePwd') }}
            </p>
            <span class="ec2-content" v-if="!showPwd">
              <v-icon class="text--grey">mdi-eye-off-outline</v-icon>
              ******
            </span>
            <span class="ec2-content" v-else @click="copyClipboard">
              <v-icon class="text--grey">mdi-eye-outline</v-icon>
              qwerty1234
            </span>
            <v-btn color="background" rounded small @click="showPwd = !showPwd">
              {{ showPwd ? $t('hide') : $t('show') }}
            </v-btn>
          </v-col>
        </v-row>
        <p class="subtitle-2 text-white mt-3 mb-1">
          {{ $t('sandbox.containerImage') }}
        </p>
        <span class="ec2-content" style="margin-right: 12px"
          >/node:16.14.0</span
        >
      </v-card-text>
    </v-card>
    <v-card variant="outlined" elevation="0" class="sandbox-card">
      <v-card-title class="text-subtitle-1 text-primary">
        {{ $t('sandbox.sourceFolder') }}
      </v-card-title>
      <v-card-text>
        <v-treeview
          v-model="selectedTree"
          class="source-folder"
          :opened="initiallyOpen"
          item-key="name"
          :items="treeItems"
          activatable
          open-on-click
        >
          <template v-slot:prepend="{ item }">
            <!-- {{ JSON.stringify(item) }} -->
            <v-icon v-if="!item.file">
              {{ 'mdi-folder' }}
            </v-icon>
            <v-icon v-else>
              {{ files[item.file] }}
            </v-icon>
          </template>
        </v-treeview>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';
  import { useAppStatusStore } from '@/store/appStatusStore';
  import infraService from '@/api/infraService';

  interface StatusItems {
    name: string;
    icon: string;
    color: string;
  }
  const appStatusStore = useAppStatusStore();
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

  // Computed properties
  const sandboxMessage = computed(() => ({
    howToUseDesc: t('sandbox.howToUseDesc'),
    rulesDesc: t('sandbox.rulesDesc'),
  }));

  // Methods
  const copyClipboard = () => {
    const text = 'qwerty1234';
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    textarea.value = text;
    textarea.select();
    textarea.focus();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    appStatusStore.addToastMessage({
      type: 'success',
      message: `${t('copied')}`,
      buttonMsg: null,
      timeout: null,
      buttonCallback: null,
    });
  };

  const onChangeStatus = (e: any) => {
    console.log('e는 ', e);
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
