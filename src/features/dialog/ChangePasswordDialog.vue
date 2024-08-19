<template>
  <VDialog
    width="444px"
    content-class="app-g-dialog"
    @update:model-value="updateShowValue"
  >
    <VCard>
      <VToolbar density="compact" dark color="grey-darken-3">
        <VToolbarTitle>
          <VIcon class="text-primary">mdi-security</VIcon>
          {{ $t('editPassword') }}
        </VToolbarTitle>
        <VSpacer></VSpacer>
      </VToolbar>
      <VCardText class="mt-5">
        <VContainer>
          <VRow>
            <VCol cols="12" class="pa-0">
              <VTextField
                v-model="accountPassword"
                :label="$t('password')"
                :placeholder="$t('changePwd')"
                type="password"
                required
                @keyup.enter="onClickEdit"
                flat
              />
            </VCol>
            <VCol cols="12" class="pa-0">
              <VTextField
                v-model="accountPasswordConfirm"
                :label="$t('passwordConfirm')"
                :placeholder="$t('changePwdConfirm')"
                type="password"
                required
                @keyup.enter="onClickEdit"
                flat
              />
            </VCol>
          </VRow>
        </VContainer>
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn class="ma-2" color="primary" rounded variant="outlined">
          {{ $t('cancel') }}
        </VBtn>
        <VBtn
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
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useAppCommonStore } from '@/store/appCommonStore';
  import { useI18n } from 'vue-i18n';
  import { editPassword } from '@/api/accountService';

  const { accountId } = defineProps<{
    accountId: string;
  }>();

  const accountPassword = ref<string>('');
  const accountPasswordConfirm = ref('');
  const { t } = useI18n();
  const appStatusStore = useAppCommonStore();
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
