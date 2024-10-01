<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAppCommonStore } from '@/store/appCommonStore';
import infraService from '@/api/infraService';
import Button from '@/components/common/Button.vue';
import { SandboxStatusItem, sandboxStatusItems } from '@/assets/data/sandbox';
const appStatusStore = useAppCommonStore();
const { t } = useI18n();

const router = useRouter();

const showPwd = ref(false);
const selectedStatusItem = ref<SandboxStatusItem>({
  label: 'Running',
  icon: 'mdi-play',
  color: 'orange',
});

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

const accessEndpoint = () =>
  router.push({
    name: 'SandboxTerminalPage',
  });
</script>
<template>
  <div class="sandbox-wrapper">
    <VCard variant="outlined" elevation="0" class="sandbox-card">
      <VCardTitle class="text-subtitle-1 text-primary">
        {{ t('sandbox.funcInfo') }}
      </VCardTitle>
      <VCardText class="mb-3">
        <p class="subtitle-2 text-white mt-3 mb-1">{{ t('sandbox.rules') }}</p>
        <h4 class="ec2-content font-weight-light">
          {{ t('sandbox.rulesDesc') }}
        </h4>
        <p class="subtitle-2 text-white mt-5 mb-5">
          {{ t('sandbox.howToUse') }}
        </p>
        <div class="ec2-content font-weight-light">
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
        <SelectBox
          style="max-width: 300px"
          class="input-custom pt-0"
          v-model="selectedStatusItem"
          :items="sandboxStatusItems"
          item-title="label"
          item-value="label"
        >
          <template #list="{ item }">
            <div>
              <VIcon :style="{ color: item.raw.color }" :icon="item.raw.icon" />
              {{ item.title }}
            </div>
          </template>
          <template #selection="{ item }">
            <div>
              <VIcon :style="{ color: item.raw.color }" :icon="item.raw.icon" />
              {{ item.title }}
            </div>
          </template>
        </SelectBox>
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
  </div>
</template>

<style lang="scss" scoped>
.sandbox-wrapper {
  height: 100%;

  .sandbox-card {
    color: darkgray;
    margin-top: 10px;
    background: transparent;

    .ec2-content {
      margin-left: 10px;
      margin-right: 12px;
      color: rgb(134, 134, 134) !important;
    }
  }
}
</style>
