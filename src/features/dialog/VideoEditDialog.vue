<script lang="ts" setup>
import { onBeforeMount, Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Button from '@/components/common/Button.vue';
import Dialog from '@/components/common/Dialog.vue';
import { VideoDetailData } from '@/types/wonderwall/video';
import VideoFileUpload from '@/features/wonderwall/video/VideoFileUpload.vue';
import { VideoRequestBody } from '@/types/admin';

const showDialog = defineModel('showDialog', {
  type: Boolean,
});

const props = defineProps<{
  selectedVideo: VideoDetailData;
}>();

/** 업로드한 썸네일  */
const fileCover: Ref<File | undefined> = ref(undefined);
/** 업로드한 자막  */
const fileVtt: Ref<File | undefined> = ref(undefined);

const { t } = useI18n();

const movieInfo: Ref<VideoRequestBody> = ref({
  originName: '',
  fileName: '',
  fileSize: 0,
  fileType: 'etc',
  fileDesc: '',
  fileAuth: false,
  downloadable: false,
});

const editVideoInfo: Ref<VideoDetailData> = ref({
  storageId: '',
  fileCover: '',
  fileName: '',
  fileDesc: '',
  fileType: '',
  vttSrc: '',
  fileSrc: '',
  fileSize: 0,
  downloadable: false,
  fileAuth: false,
});

onBeforeMount(() => {
  editVideoInfo.value = props.selectedVideo;
});

const closeDialog = () => {
  showDialog.value = false;
};

const updatedUploadCover = (upload: File) => {
  fileCover.value = upload;
};

const updatedUploadVtt = (upload: File) => {
  fileVtt.value = upload;
};

/** data - calculating - action
 *  action은 되도록 상위 컴포넌트에 전달
 */
const emit = defineEmits(['actionOnEdit']);

const onConfirm = () => {
  emit('actionOnEdit', movieInfo.value, fileCover.value, fileVtt.value);
};
</script>

<template>
  <Dialog v-model:visible="showDialog" width="1000px">
    <template #header>
      <VIcon class="text-primary" icon="mdi-movie-edit-outline" />
      {{ editVideoInfo.fileName }}
    </template>
    <template #default>
      <VideoFileUpload
        class="pa-5 pt-10"
        :is-edit="true"
        :detailData="editVideoInfo"
        v-model:movieInfo="movieInfo"
        @close-dialog="closeDialog"
        @updated-uploadVtt="updatedUploadVtt"
        @updated-uploadCover="updatedUploadCover"
      />
    </template>
    <template #footer>
      <Button :label="t('cancel')" @click="showDialog = false" />
      <Button
        color="primary"
        :label="t('edit')"
        variant="flat"
        @click="onConfirm"
      />
    </template>
  </Dialog>
</template>

<style lang="scss" scoped></style>
