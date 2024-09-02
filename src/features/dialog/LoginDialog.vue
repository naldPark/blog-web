<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Dialog from '@/components/common/Dialog.vue';
import { login, getRsa } from '@/api/accountService';
import { useUserStore } from '@/store/userStore';
import { encryptPassword } from '@/utils/commonUtil';
import InputText from '@/components/common/InputText.vue';
import useMutation from '@/hook/useMutation';
import Button from '@/components/common/Button.vue';
import { isEmpty, any } from 'ramda';
import { ApiResponse } from '@/types/axios';

const { t } = useI18n();
const accountId = ref('');
const accountPassword = ref('');
const passwordVisible = ref(false);
const userStore = useUserStore();

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
    userStore.setAuthToken(token);
    showDialog.value = false;
  },
  onError: () => {
    userStore.resetAccountInfo();
  },
});

const onClickLogin = async () => {
  const rsaRes: ApiResponse = await getRsa();
  const encryptedValue = encryptPassword(rsaRes.data, accountPassword.value);
  postLogin(encryptedValue);
};
</script>

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

<style lang="scss" scoped></style>
