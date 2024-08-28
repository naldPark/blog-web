<template>
  <Dialog v-model:visible="showDialog" width="450px">
    <template #header>
      <VIcon class="text-primary" icon="mdi-key" />
      {{ t('login') }}
    </template>
    <template #default>
      <InputText v-model="accountId" :label="t('id')" required />
      <InputText
        v-model="accountPassword"
        :label="t('password')"
        :passwordIcon="true"
        required
        :icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
        type="password"
        @enter="onClickLogin"
      />
    </template>
    <template #footer>
      <Button
        :disabled="any(isEmpty, [accountId, accountPassword])"
        label="Log In"
        class="mb-3"
        block
        color="primary"
        variant="tonal"
        @click="onClickLogin"
      />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Dialog from '@/components/common/Dialog.vue';
import { login, getRsa } from '@/api/accountService';
import { useAppCommonStore } from '@/store/appCommonStore';
import { useUserStore } from '@/store/userStore';
import { decodeToken, encryptPassword } from '@/utils/commonUtil';
import InputText from '@/components/common/InputText.vue';
import { useCookies } from '@vueuse/integrations/useCookies';
import useMutation from '@/hook/useMutation';
import Button from '@/components/common/Button.vue';
import { isEmpty, any } from 'ramda';
import { ApiErrorResponse } from '@/types/axios';

const { t } = useI18n();
const accountId = ref('');
const accountPassword = ref('');
const passwordVisible = ref(false);
const cookies = useCookies();
const userStore = useUserStore();
const appStatusStore = useAppCommonStore();

const showDialog = defineModel('showDialog', {
  type: Boolean,
});

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
    userStore.setAccountInfo(
      {
        accountId: tokenInfo.user_id,
        accountName: tokenInfo.user_name,
        authority: tokenInfo.authority,
        email: tokenInfo.user_email,
      },
      token,
    );
    showDialog.value = false;
  },
  onError: (error: ApiErrorResponse) => {
    appStatusStore.showToast({
      type: 'error',
      message: t(`error_code.${error.error_i18n}`),
    });
    userStore.resetAccountInfo();
  },
});

const onClickLogin = async () => {
  try {
    const rsaRes = (await getRsa()) as any;
    const encryptedValue = encryptPassword(rsaRes.data, accountPassword.value);
    postLogin(encryptedValue);
  } catch (error) {
    appStatusStore.showDialog({
      title: t('error'),
      description: 'unknown error',
      showCloseButton: true,
      action: () => {},
    });
  }
};
</script>

<style lang="scss" scoped>
/* 스타일 정의 부분 */
</style>
