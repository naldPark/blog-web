<script lang="ts" setup>
import { onBeforeMount, Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Button from '@/components/common/Button.vue';
import Dialog from '@/components/common/Dialog.vue';
import { filterKeysFromObject } from '@/utils/commonUtil';
import { VideoDetailData } from '@/types/wonderwall/video';
import VideoFileUpload from '@/features/wonderwall/video/VideoFileUpload.vue';
import { VideoRequestBody } from '@/types/admin';

const showDialog = defineModel('showDialog', {
  type: Boolean,
});

const props = defineProps<{
  selectedVideo: VideoDetailData;
}>();

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
  // coverFile.value = upload;
  console.log('cover왔다');
};

const updatedUploadVtt = (upload: File) => {
  // vttFile.value = upload;
  console.log('업로드왔다');
};

/** data - calulating - action
 *  action은 되도록 상위 컴포넌트에 전달
 */
const emit = defineEmits(['actionOnEdit']);

const onConfirm = () => {
  emit('actionOnEdit', {
    ...editVideoInfo.value,
    vttFile: editVideoInfo.value.vttSrc, // 필요한 경우 vttFile 추가
    fileCover: editVideoInfo.value.fileCover, // 필요한 경우 fileCover 추가
  });
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
