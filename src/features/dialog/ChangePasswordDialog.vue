<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useAppCommonStore } from '@/store/appCommonStore';
import { useI18n } from 'vue-i18n';
import { editPassword } from '@/api/accountService';
import { ApiErrorResponse, ApiResponse } from '@/types/axios';
import { isEmpty, equals, not } from 'ramda';
import Button from '@/components/common/Button.vue';
import InputText from '@/components/common/InputText.vue';
import { passwordRegExp, passwordVerifyRegExp } from '../../utils/regExpUtil';
import useMutation from '@/hook/useMutation';
import Dialog from '@/components/common/Dialog.vue';

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

const showDialog = defineModel('showDialog', {
  type: Boolean,
});

const rules = {
  required: (v: string) => !!v || t('required'),
  passwordExp: (v: string) =>
    passwordRegExp().test(v) || t('passwordRulesError'),
  passwordVerify: (v: string) =>
    passwordVerifyRegExp(accountPassword.value).test(v) ||
    t('passwordMatchRulesError'),
};

onMounted(() => {
  console.log('마운');
});

const { mutate: onClickEdit } = useMutation({
  mutationFn: () => editPassword(accountId, accountPassword.value),
  onSuccess: () => {
    appStatusStore.addToast({
      type: 'success',
      message: t('confirmMsg'),
    });
  },
  onError: (error: ApiErrorResponse) => {
    appStatusStore.addToast({
      type: 'error',
      message: `${t(error.error_i18n)}`,
    });
  },
  onSettled: () => {
    updateShowValue(false);
  },
});

// Confirm 버튼 클릭 처리 함수
const handleConfirm = () => {
  console.log('Confirm button clicked');
};

// 다이얼로그 외부 클릭 처리 함수
const handleClickOutside = () => {
  console.log('Clicked outside the dialog');
};
</script>

<template>
  <Dialog
    v-model:visible="showDialog"
    width="450px"
    @update:model-value="updateShowValue"
    title="Dialog Header"
    @confirm="handleConfirm"
    @click:outside="handleClickOutside"
  >
    <template #header>
      <VIcon class="text-primary" icon="mdi-security" />
      {{ t('editPassword') }}
    </template>
    <template #default>
      <InputText
        class="mb-2"
        v-model="accountPassword"
        :label="t('password')"
        :placeholder="t('changePwd')"
        :rules="[rules.required, rules.passwordExp]"
        type="password"
        required
        @keyup.enter="onClickEdit"
        flat
      />
      <InputText
        v-model="accountPasswordConfirm"
        :label="t('passwordConfirm')"
        :placeholder="t('changePwdConfirm')"
        type="password"
        :rules="[rules.required, rules.passwordVerify]"
        required
        @keyup.enter="onClickEdit"
        flat
        validate-on-blur
      />
    </template>
    <template #footer>
      <Button
        rounded="xl"
        :label="t('cancel')"
        @click="updateShowValue(false)"
      />
      <Button
        color="primary"
        :disabled="
          isEmpty(accountPassword) ||
          not(equals(accountPassword, accountPasswordConfirm))
        "
        :label="t('confirm')"
        variant="flat"
        @click="onClickEdit"
      />
    </template>
  </Dialog>

  <!-- <VDialog width="450px" @update:model-value="updateShowValue">
    <VCard rounded="lg">
      <VCardTitle class="d-flex justify-space-between align-center">
        <div class="text-h6 text-medium-emphasis">
          <VIcon class="text-primary" icon="mdi-security" />
          {{ t('editPassword') }}
        </div>
        <Button
          color="gray"
          icon="mdi-close"
          variant="text"
          size="xs"
          @click="updateShowValue(false)"
        />
      </VCardTitle>
      <VDivider class="mb-4" />
      <VCardText>
        <InputText
          class="mb-2"
          v-model="accountPassword"
          :label="t('password')"
          :placeholder="t('changePwd')"
          :rules="[rules.required, rules.passwordExp]"
          type="password"
          required
          @keyup.enter="onClickEdit"
          flat
        />
        <InputText
          v-model="accountPasswordConfirm"
          :label="t('passwordConfirm')"
          :placeholder="t('changePwdConfirm')"
          type="password"
          :rules="[rules.required, rules.passwordVerify]"
          required
          @keyup.enter="onClickEdit"
          flat
          validate-on-blur
        />
      </VCardText>
      <VDivider class="mt-2" />
      <VCardActions class="ma-2 d-flex justify-end">
        <Button
          rounded="xl"
          :label="t('cancel')"
          @click="updateShowValue(false)"
        />
        <Button
          color="primary"
          :disabled="
            isEmpty(accountPassword) ||
            not(equals(accountPassword, accountPasswordConfirm))
          "
          :label="t('confirm')"
          variant="flat"
          @click="onClickEdit"
        />
      </VCardActions>
    </VCard>
  </VDialog> -->
</template>

<style lang="scss" scoped></style>
