<script lang="ts" setup>
import { Ref, ref } from 'vue';
import { useAppCommonStore } from '@/store/appCommonStore';
import { useI18n } from 'vue-i18n';
import Button from '@/components/common/Button.vue';
import useMutation from '@/hook/useMutation';
import Dialog from '@/components/common/Dialog.vue';
import { PutUserRequestBody, UserManage } from '@/types/admin';
import { AUTHORITY } from '@/types/constants';
import SelectBox from '@/components/common/SelectBox.vue';
import { clone } from 'ramda';
import InputText from '@/components/common/InputText.vue';
import { ValidationRule } from '@/types/common';
import { emailRegExp, nameRegExp } from '@/utils/regExpUtil';
import ChangePasswordDialog from '@/features/dialog/ChangePasswordDialog.vue';
import { editUser } from '@/api/accountService';
import { filterKeysFromObject } from '@/utils/commonUtil';

const showDialog = defineModel('showDialog', {
  type: Boolean,
});

const props = defineProps<{
  selectedUser: UserManage;
}>();

const { t } = useI18n();
const appStatusStore = useAppCommonStore();

/** api에 불필요한 key filter처리 */
const editRequestKeys = ['accountId', 'accountName', 'authority', 'email'];
const editUserInfo: Ref<PutUserRequestBody> = ref(
  filterKeysFromObject(editRequestKeys, props.selectedUser),
);
const userName: string = props.selectedUser.accountName;
const showEditPasswordDialog = ref(false);

// Emits 정의
const emit = defineEmits(['confirm']);

/** 검증 rules */
const rules: {
  required: ValidationRule;
  email: ValidationRule;
  name: ValidationRule;
} = {
  required: (value: string) => !!value || t('required'),
  email: (value: string) => emailRegExp().test(value) || t('emailValidate'),
  name: (value: string) => nameRegExp().test(value) || t('nameValidate'),
};

/** 유저 정보 수정 mutation */
const { mutate: onClickEdit } = useMutation({
  mutationFn: () => editUser(editUserInfo.value),
  onSuccess: () => {
    appStatusStore.showToast({
      type: 'success',
      message: t('confirmMsg'),
    });
    emit('confirm');
  },
});
</script>

<template>
  <Dialog v-model:visible="showDialog" width="450px">
    <template #header>
      <VIcon class="text-primary" icon="mdi-account-edit" />
      {{ t('editUser') }}
    </template>
    <template #default>
      <v-sheet :border="'md'" class="pa-6 text-white mx-auto" max-width="400">
        <div class="text-subtitle-1 font-weight-bold mb-4 d-flex">
          <VIcon class="text-grey-lighten-1 mr-2" icon="mdi-account-box" />
          {{ userName }}
        </div>
        <InputText
          :label="`${t('id')} *`"
          v-model="editUserInfo.accountId"
          disabled
        />
        <InputText
          flat
          v-model="editUserInfo.accountName"
          :rules="[rules.required]"
          :label="`${t('name')} *`"
          :placeholder="`${t('name')} *`"
        />
        <SelectBox
          v-model="editUserInfo.authority"
          :items="clone(AUTHORITY)"
          :rules="[rules.required]"
          item-value="value"
          item-title="label"
          label="권한"
        />
        <InputText
          v-model="editUserInfo.email"
          :rules="[rules.required, rules.email]"
          :label="`${t('email')} *`"
          :placeholder="`${t('email')} *`"
        />
        <Button
          :label="t('editPassword')"
          color="grey"
          variant="tonal"
          @onClick="showEditPasswordDialog = true"
          block
        />
        <ChangePasswordDialog
          v-model:showDialog="showEditPasswordDialog"
          :accountId="editUserInfo.accountId"
        />
      </v-sheet>
    </template>
    <template #footer>
      <Button rounded="xl" :label="t('cancel')" @click="showDialog = false" />
      <Button
        color="primary"
        :label="t('confirm')"
        variant="flat"
        @click="onClickEdit"
      />
    </template>
  </Dialog>
</template>

<style lang="scss" scoped></style>
