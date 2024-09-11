<script lang="ts" setup>
import { onBeforeMount, Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Button from '@/components/common/Button.vue';
import Dialog from '@/components/common/Dialog.vue';
import { UserManage, UserRequestBody } from '@/types/admin';
import { AUTHORITY } from '@/types/constants';
import SelectBox from '@/components/common/SelectBox.vue';
import { clone } from 'ramda';
import InputText from '@/components/common/InputText.vue';
import {
  emailRegExp,
  nameRegExp,
  passwordRegExp,
  passwordVerifyRegExp,
} from '@/utils/regExpUtil';
import ChangePasswordDialog from '@/features/dialog/ChangePasswordDialog.vue';
import { filterKeysFromObject } from '@/utils/commonUtil';

const showDialog = defineModel('showDialog', {
  type: Boolean,
});

const props = defineProps<{
  selectedUser: UserManage | undefined;
}>();

const { t } = useI18n();

/** 기존 Name 식별 & 수정  */
const userName: string = props.selectedUser?.accountName ?? '';
/** 수정 or 생성 모드 구분 목적  */
const isEdit: Ref<boolean> = ref(!!props.selectedUser?.accountId);

/** api에 불필요한 key filter처리 */
const editRequestKeys = ['accountId', 'accountName', 'authority', 'email'];
const editUserInfo: Ref<UserRequestBody> = ref({
  accountId: '',
  accountName: '',
  authority: 4,
  email: '',
  password: '',
});
const accountPasswordConfirm = ref('');

const showEditPasswordDialog = ref(false);

onBeforeMount(() => {
  if (isEdit.value)
    editUserInfo.value = filterKeysFromObject(
      editRequestKeys,
      props.selectedUser,
    );
});

/** data - calulating - action
 *  action은 되도록 상위 컴포넌트에 전달
 */
const emit = defineEmits(['actionOnEdit', 'actionOnCreate']);

/** 검증 rules */
const rules = {
  required: (value: string) => !!value || t('required'),
  email: (value: string) => emailRegExp().test(value) || t('emailValidate'),
  name: (value: string) => nameRegExp().test(value) || t('nameValidate'),
  passwordExp: (v: string) =>
    passwordRegExp().test(v) || t('passwordRulesError'),
  passwordVerify: (v: string) =>
    passwordVerifyRegExp(editUserInfo.value.password).test(v) ||
    t('passwordMatchRulesError'),
};

const onConfirm = () => {
  emit(isEdit.value ? 'actionOnEdit' : 'actionOnCreate', editUserInfo.value);
};
</script>

<template>
  <Dialog v-model:visible="showDialog" width="450px">
    <template #header>
      <VIcon class="text-primary" icon="mdi-account-edit" />
      {{ isEdit ? t('editUser') : t('addUser') }}
    </template>
    <template #default>
      <v-sheet :border="'md'" class="pa-6 text-white mx-auto" max-width="400">
        <div class="text-subtitle-1 font-weight-bold mb-4 d-flex">
          <VIcon class="text-grey-lighten-1 mr-2" icon="mdi-account-box" />
          {{ isEdit ? userName : t('registerUser') }}
        </div>
        <InputText
          :label="`${t('id')} *`"
          :rules="[rules.required]"
          v-model="editUserInfo.accountId"
          :disabled="isEdit"
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
          :label="t('authority')"
        />
        <InputText
          v-if="!isEdit"
          class="mb-2"
          v-model="editUserInfo.password"
          :label="t('password')"
          :placeholder="t('changePwd')"
          :rules="[rules.required, rules.passwordExp]"
          type="password"
          required
          flat
        />
        <InputText
          v-if="!isEdit"
          class="mb-2"
          v-model="accountPasswordConfirm"
          :label="t('passwordConfirm')"
          :placeholder="t('changePwdConfirm')"
          :rules="[rules.required, rules.passwordVerify]"
          type="password"
          required
          flat
        />
        <InputText
          v-model="editUserInfo.email"
          :rules="[rules.required, rules.email]"
          :label="`${t('email')} *`"
          :placeholder="`${t('email')} *`"
        />
        <Button
          v-if="isEdit"
          :label="t('editPassword')"
          color="grey"
          variant="tonal"
          @onClick="showEditPasswordDialog = true"
          block
        />
        <ChangePasswordDialog
          v-if="isEdit"
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
        @click="onConfirm"
      />
    </template>
  </Dialog>
</template>

<style lang="scss" scoped></style>
