<script lang="ts" setup>
import { onBeforeMount, Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Button from '@/components/common/Button.vue';
import Dialog from '@/components/common/Dialog.vue';
import { VideoRequestBody } from '@/types/admin';
import { filterKeysFromObject } from '@/utils/commonUtil';
import { VideoDetailData } from '@/types/wonderwall/video';

const showDialog = defineModel('showDialog', {
  type: Boolean,
});

const props = defineProps<{
  selectedVideo: VideoDetailData | undefined;
}>();

const { t } = useI18n();

/** api에 불필요한 key filter처리 */
const editRequestKeys = [
  'storageId',
  'downloadable',
  'fileCover',
  'fileName',
  'fileDesc',
  'fileType',
  'vttSrc',
];
const editVideoInfo: Ref<VideoRequestBody> = ref({
  storageId: '',
  downloadable: false,
  fileCover: '',
  fileName: '',
  fileDesc: '',
  fileType: '',
  vttSrc: '',
});

onBeforeMount(() => {
  editVideoInfo.value = filterKeysFromObject(
    editRequestKeys,
    props.selectedVideo,
  );
});

/** data - calulating - action
 *  action은 되도록 상위 컴포넌트에 전달
 */
const emit = defineEmits(['actionOnEdit']);

/** 검증 rules */
const rules = {
  required: (value: string) => !!value || t('required'),
};

const onConfirm = () => {
  emit('actionOnEdit', editVideoInfo.value);
};
</script>

<template>
  <Dialog v-model:visible="showDialog" width="450px">
    <template #header>
      <VIcon class="text-primary" icon="mdi-account-edit" />
      {{ editVideoInfo.fileName }}
    </template>
    <template #default>
      <v-sheet :border="'md'" class="pa-6 text-white mx-auto" max-width="400">
        <div class="text-subtitle-1 font-weight-bold mb-4 d-flex">
          <VIcon class="text-grey-lighten-1 mr-2" icon="mdi-account-box" />
          ddd
        </div>
        <!-- <InputText
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
        /> -->
        <!-- <InputText
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
        /> -->
      </v-sheet>
    </template>
    <template #footer>
      <Button :label="t('cancel')" @click="showDialog = false" />
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
