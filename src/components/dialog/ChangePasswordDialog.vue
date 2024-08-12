<template>
  <v-dialog
    width="444px"
    content-class="app-g-dialog"
    @update:model-value="updateShowValue"
  >
    <v-card>
      <v-toolbar density="compact" dark color="grey-darken-3">
        <v-toolbar-title>
          <v-icon class="text-primary">mdi-security</v-icon>
          {{ $t('editPassword') }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text class="mt-5">
        <v-container>
          <v-row>
            <v-col cols="12" class="pa-0">
              <v-text-field
                v-model="accountPassword"
                :label="$t('password')"
                :placeholder="$t('changePwd')"
                type="password"
                required
                @keyup.enter="onClickEdit"
                flat
              />
            </v-col>
            <v-col cols="12" class="pa-0">
              <v-text-field
                v-model="accountPasswordConfirm"
                :label="$t('passwordConfirm')"
                :placeholder="$t('changePwdConfirm')"
                type="password"
                required
                @keyup.enter="onClickEdit"
                flat
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn class="ma-2" color="primary" rounded variant="outlined">
          {{ $t('cancel') }}
        </v-btn>
        <v-btn
          class="ma-2"
          :disabled="
            accountPassword === '' || accountPassword !== accountPasswordConfirm
          "
          color="primary"
          rounded
          variant="outlined"
          dark
          @click="onClickEdit"
        >
          {{ $t('confirm') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useAppStatusStore } from '@/store/appStatusStore';
  import { useI18n } from 'vue-i18n';
  import { editPassword } from '@/api/accountService';

  const { accountId } = defineProps<{
    accountId: string;
  }>();

  const accountPassword = ref<string>('');
  const accountPasswordConfirm = ref('');
  const { t } = useI18n();
  const appStatusStore = useAppStatusStore();
  const emits = defineEmits(['update:modelValue']);
  const updateShowValue = (value: any) => {
    emits('update:modelValue', value);
  };

  const onClickEdit = async () => {
    if (
      accountPassword.value === '' ||
      accountPassword.value !== accountPasswordConfirm.value
    ) {
      appStatusStore.showDialog({
        title: t('error'),
        description: t('passwordRulesError'),
        invisibleClose: true,
        action: () => {},
      });
      return;
    }

    try {
      appStatusStore.showLoading();
      const response = await editPassword(accountId, accountPassword.value);
      if (response.status_code === 200) {
        appStatusStore.showDialog({
          title: t('complete'),
          description: t('confirmMsg'),
          invisibleClose: true,
          action: () => {},
        });
      } else {
        appStatusStore.showDialog({
          title: t('error'),
          description: response.data.data.error,
          invisibleClose: true,
          action: () => {},
        });
      }
    } catch (error) {
      appStatusStore.showDialog({
        title: t('error'),
        description: 'unknown error',
        invisibleClose: true,
        action: () => {},
      });
    }
    updateShowValue(false);
    appStatusStore.hideLoading();
  };
</script>

<style lang="scss" scoped></style>
