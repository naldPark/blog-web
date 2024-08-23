<template>
  <VDialog
    width="444px"
    content-class="app-g-dialog"
    @update:model-value="updateModelValue"
  >
    <VCard>
      <VToolbar density="compact" dark color="grey-darken-3">
        <VToolbarTitle>
          <VIcon class="text-primary">mdi-key</VIcon>
          {{ t('login') }}
        </VToolbarTitle>
        <VSpacer />
      </VToolbar>
      <VCardText class="mt-5">
        <VContainer>
          <VRow>
            <VCol cols="12" class="pa-0">
              <InputText v-model="accountId" :label="t('id')" required />
            </VCol>
            <VCol cols="12" class="pa-0">
              <InputText
                v-model="accountPassword"
                :label="t('password')"
                :passwordIcon="true"
                required
                :icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                type="password"
                @enter="onClickLogin"
              />
            </VCol>
          </VRow>
        </VContainer>
        <VBtn
          class="mb-3"
          color="primary"
          variant="tonal"
          block
          @click="onClickLogin"
        >
          Log In
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { login, getRsa } from '@/api/accountService';
import { useUserStore, useAppCommonStore } from '@/store';
import { decodeToken } from '@/utils/common';
import InputText from '@/components/common/InputText.vue';
import { useCookies } from '@vueuse/integrations/useCookies';
import JSEncrypt from 'jsencrypt';
import { useMutation } from 'vue-query';

const { t } = useI18n();
const accountId = ref('');
const accountPassword = ref('');
const passwordVisible = ref(false);
const cookies = useCookies();
const userStore = useUserStore();
const appStatusStore = useAppCommonStore();
const emits = defineEmits(['update:modelValue']);

const updateModelValue = (value: boolean) => {
  emits('update:modelValue', value);
};

const { mutate: postLogin } = useMutation({
  mutationFn: (encryptedValue: string) =>
    login({
      accountId: accountId.value,
      password: encryptedValue,
    }),
  onSuccess: (res) => {
    const token = res.data.access_token;
    cookies.set('access_token', token);
    const tokenInfo = JSON.parse(decodeToken(token));
    userStore.setAuthToken(token);
    userStore.setAccountInfo({
      accountId: tokenInfo.user_id,
      accountName: tokenInfo.user_name,
      authority: tokenInfo.authority,
      email: tokenInfo.user_email,
    });
    updateModelValue(false);
  },
  onError: (error: any) => {
    console.error('에러', error);
    appStatusStore.showDialog({
      title: t('loginFailed'),
      description: error.error_i18n,
      showCloseButton: true,
      action: () => {},
    });
    userStore.resetAccountInfo();
  },
});

const onClickLogin = async () => {
  appStatusStore.showLoading();
  try {
    const rsaRes = await getRsa();
    const rsa = new JSEncrypt({ default_key_size: '2048' });
    rsa.setPublicKey(rsaRes.data);
    const chunkSize = 117;
    const chunks = [];
    for (let i = 0; i < accountPassword.value.length; i += chunkSize) {
      const chunk = accountPassword.value.slice(i, i + chunkSize);
      const encryptedChunk = rsa.encrypt(chunk);
      chunks.push(encryptedChunk);
    }
    const encryptedValue = chunks.join(':');
    postLogin(encryptedValue);
    appStatusStore.hideLoading();
  } catch (error) {
    appStatusStore.showDialog({
      title: t('error'),
      description: 'unknown error',
      showCloseButton: true,
      action: () => {},
    });
    appStatusStore.hideLoading();
  }
};
</script>

<style lang="scss" scoped>
/* 스타일 정의 부분 */
</style>
