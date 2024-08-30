<script lang="ts" setup>
import { onMounted, Ref, ref, watch } from 'vue';
import { useAppCommonStore } from '@/store/appCommonStore';
import { useI18n } from 'vue-i18n';
import Button from '@/components/common/Button.vue';
import useMutation from '@/hook/useMutation';
import Dialog from '@/components/common/Dialog.vue';
import { UserManage } from '@/types/admin';
import { AUTHORITY } from '@/types/constants';
import SelectBox from '@/components/common/SelectBox.vue';
import { clone } from 'ramda';
import InputText from '@/components/common/InputText.vue';

const showDialog = defineModel('showDialog', {
  type: Boolean,
});

const props = defineProps<{
  selectedUser: UserManage;
}>();

const { t } = useI18n();
const appStatusStore = useAppCommonStore();
const editUserInfo: Ref<UserManage> = ref(props.selectedUser);

const rules = {
  required: (v: string) => !!v || t('required'),
};

const { mutate: onClickEdit } = useMutation({
  mutationFn: async () => {
    // const rsaRes = (await getRsa()) as any;
    // return editPassword(accountId, encryptedValue);
  },
  onSuccess: () => {
    appStatusStore.showToast({
      type: 'success',
      message: t('confirmMsg'),
    });
    showDialog.value = false;
  },
});
const select = 0;
</script>

<template>
  <Dialog v-model:visible="showDialog" width="450px">
    <template #header>
      <VIcon class="text-primary" icon="mdi-account-edit" />
      {{ t('editUser') }}
    </template>
    <template #default>
      <v-sheet :border="'md'" class="pa-6 text-white mx-auto" max-width="400">
        <h4 class="text-h5 font-weight-bold mb-4">
          {{ editUserInfo.accountName }}z
        </h4>
        <SelectBox
          v-model="editUserInfo.authority"
          :items="clone(AUTHORITY)"
          item-value="value"
          item-title="label"
          label="권한"
        />
        <InputText
          v-model="editUserInfo.accountName"
          required
          flat
          validate-on-blur
        />
        <InputText
          v-model="editUserInfo.email"
          required
          flat
          validate-on-blur
        />

        <p class="mb-8">
          {{ editUserInfo.authority }}

          Please read our
          <a class="text-red-accent-2" href="#">Privacy Policy</a> to learn
          about our privacy practices or click "Your Preferences" to exercise
          control over your data.
        </p>

        <v-btn
          class="text-none text-black mb-4"
          color="red-accent-2"
          size="x-large"
          variant="flat"
          block
        >
          Accept
        </v-btn>

        <v-btn
          class="text-none text-black"
          color="red-accent-2"
          size="x-large"
          variant="outlined"
          block
        >
          Your Preferences
        </v-btn>
      </v-sheet>
      <!-- <InputText
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
      /> -->
    </template>
    <template #footer>
      <Button rounded="xl" :label="t('cancel')" @click="showDialog = false" />
      <!-- <Button
        color="primary"
        :disabled="
          isEmpty(accountPassword) ||
          not(equals(accountPassword, accountPasswordConfirm))
        "
        :label="t('confirm')"
        variant="flat"
        @click="onClickEdit"
      /> -->
    </template>
  </Dialog>
</template>

<style lang="scss" scoped></style>
