<template>
  <v-dialog v-model="lazyShow" width="444px" content-class="app-g-dialog" style="justify-content: flex-start">
    <v-card>
      <v-toolbar dense dark color="grey darken-3">
        <v-toolbar-title>
          <v-icon class="primary--text">mdi-key</v-icon>
          {{ t('login') }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text class="mt-5">
        <v-container>
          <v-row>
            <v-col cols="12" class="pa-0">
              <v-text-field v-model="accountId" :label="t('id')" :placeholder="t('idDes')" flat required
                @keyup.enter="onClickLogin"></v-text-field>
            </v-col>
            <v-col cols="12" class="pa-0">
              <v-text-field v-model="accountPassword" :label="t('password')" :placeholder="t('pwdDes')" type="password"
                flat required @keyup.enter="onClickLogin"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="ma-2" @click="lazyShow = false" color="primary" outlined rounded variant="outlined">
          {{ t('cancel') }}
        </v-btn>
        <v-btn class="ma-2" color="primary" outlined rounded variant="outlined" dark @click="onClickLogin">
          {{ t('confirm') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { login } from '@/api/AccountService';
import { useAccountStatusStore } from '@/store/accountStatusStore';
import { useAppStatusStore } from  '@/store/appStatusStore';
import { decodeToken } from '@/utils/common';
import { useCookies } from '@vueuse/integrations/useCookies';

export default defineComponent({
  name: 'LoginDialog',
  setup(_, { emit }) {
    const { t } = useI18n(); // t 함수 가져오기
    const accountId = ref('');
    const accountPassword = ref('');
    const lazyShow = ref(false);
    const cookies = useCookies();
    const accountStatusStore = useAccountStatusStore();
    const appStatusStore = useAppStatusStore();

    async function onClickLogin() {
      appStatusStore.showLoading();
      await login(accountId.value, accountPassword.value)
        .then((res: any) => {
          if (res.data.statusCode === 200) {
            const token = "Bearer " + res.data.data.access_token;
            cookies.set("access_token", token);
            const tokenInfo = JSON.parse(decodeToken(token));

            cookies.set("accountId", tokenInfo.user_id);
            cookies.set("accountName", tokenInfo.user_name);
            cookies.set("authority", tokenInfo.authority);
            cookies.set("email", tokenInfo.user_email);

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
              description: res.data.data.error,
              invisibleClose: true,
              action: () => { },
            });
            accountStatusStore.resetAccountInfo();
          }
          lazyShow.value = false;
          appStatusStore.hideLoading();
        })
        .catch((error: any) => {
          appStatusStore.showDialog({
            title: t('error'),
            description: 'unknown error',
            invisibleClose: true,
            action: () => { },
          });
          lazyShow.value = false;
          appStatusStore.hideLoading();
        });
    
    }

    watch(() => lazyShow.value, (newValue) => {
      emit("input", newValue);
    });

    return {
      accountId,
      accountPassword,
      lazyShow,
      onClickLogin,
      t,
    };
  }
});
</script>

<style lang="scss" scoped></style>
