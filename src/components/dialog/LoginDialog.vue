<template>
  <v-dialog
    :model-value="showValue"
    @update:model-value="updateShowValue"
    width="444px"
    content-class="app-g-dialog"
  >
    <v-card>
      <v-toolbar density="compact" dark color="grey-darken-3">
        <v-toolbar-title>
          <v-icon class="text-primary">mdi-key</v-icon>
          {{ t('login') }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text class="mt-5">
        <v-container>
          <v-row>
            <v-col cols="12" class="pa-0">
              <v-text-field
                color="primary"
                v-model="accountId"
                :label="t('id')"
                :placeholder="t('idDes')"
                flat
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pa-0">
              <v-text-field
                color="primary"
                v-model="accountPassword"
                :label="t('password')"
                :placeholder="t('pwdDes')"
                flat
                required
                @keyup.enter="onClickLogin"
                :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="passwordVisible ? 'text' : 'password'"
                @click:append-inner="passwordVisible = !passwordVisible"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-btn
          class="mb-3"
          color="primary"
          variant="tonal"
          block
          @click="onClickLogin"
        >
          Log In
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { login, getRsa } from '@/api/accountService';
  import { useAccountStatusStore } from '@/store/accountStatusStore';
  import { useAppStatusStore } from '@/store/appStatusStore';
  import { decodeToken } from '@/utils/common';
  import { useCookies } from '@vueuse/integrations/useCookies';
  import JSEncrypt from 'jsencrypt';

  const { t } = useI18n(); // t 함수 가져오기
  const accountId = ref('');
  const accountPassword = ref('');
  const passwordVisible = ref(false);
  const cookies = useCookies();
  const accountStatusStore = useAccountStatusStore();
  const appStatusStore = useAppStatusStore();
  const props = defineProps({ showValue: Boolean });
  // const emit = defineEmits(['change', 'delete'])
  const emits = defineEmits(['update:modelValue']);
  function updateShowValue(value: any) {
    emits('update:modelValue', value);
  }
  async function onClickLogin() {
    appStatusStore.showLoading();
    try {
      const rsaRes = await getRsa();
      console.log(rsaRes.data);
      const rsa = new JSEncrypt({ default_key_size: '2048' });
      rsa.setPublicKey(rsaRes.data);
      const encryptedValue = btoa(
        (rsa as JSEncrypt).encrypt(accountPassword.value) as string,
      );
      const res = await login(accountId.value, encryptedValue);
      console.log('res', res);
      if (res.status_code === 200) {
        const token = res.data.access_token;
        cookies.set('access_token', token);
        const tokenInfo = JSON.parse(decodeToken(token));

        // cookies.set('accountId', tokenInfo.user_id);
        // cookies.set('accountName', tokenInfo.user_name);
        // cookies.set('authority', tokenInfo.authority);
        // cookies.set('email', tokenInfo.user_email);

        accountStatusStore.setAuthToken(token);
        accountStatusStore.setAccountInfo({
          accountId: tokenInfo.user_id,
          accountName: tokenInfo.user_name,
          authority: tokenInfo.authority,
          email: tokenInfo.user_email,
        });
      } else {
        appStatusStore.showDialog({
          title: t('loginFailed'),
          description: res.data.error,
          invisibleClose: true,
          action: () => {},
        });
        accountStatusStore.resetAccountInfo();
      }
      updateShowValue(false);
      appStatusStore.hideLoading();
    } catch (error) {
      appStatusStore.showDialog({
        title: t('error'),
        description: 'unknown error',
        invisibleClose: true,
        action: () => {},
      });
      updateShowValue(false);
      appStatusStore.hideLoading();
    }
  }
</script>

<style lang="scss" scoped></style>
