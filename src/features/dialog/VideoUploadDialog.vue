<script setup lang="ts">
import { ref, computed, watch, Ref } from 'vue';
import Dialog from '@/components/common/Dialog.vue';
import { useI18n } from 'vue-i18n';
import ImportVideoFile from '@/features/wonderwall/video/ImportVideoFile.vue';
import VideoFileUpload from '@/features/wonderwall/video/VideoFileUpload.vue';
import { FileInfo } from '@/types/wonderwall/video';
import useMutation from '@/hook/useMutation';
import storageService from '@/api/storageService';
import { useAppCommonStore } from '@/store/appCommonStore';
import { VideoRequestBody } from '@/types/admin';
const { t } = useI18n();
const { isMultiple } = defineProps({
  isMultiple: {
    type: Boolean,
    required: true,
  },
});

const showDialog = defineModel('showDialog', {
  type: Boolean,
});

const emit = defineEmits(['close', 'fetchVideoList']);

const availableFileTypes = ['.mp4'];
const appStatusStore = useAppCommonStore();

const vttFile: Ref<File | null> = ref(null);
const coverFile: Ref<File | null> = ref(null);
const videoFile: Ref<File | null> = ref(null);

/** Video upload mutation */
const { mutate: uploadVideo } = useMutation({
  mutationFn: (bodyForm: FormData) => storageService.localUploadFiles(bodyForm),
  onSuccess: () => {
    appStatusStore.showToast({
      type: 'success',
      message: t('complete'),
    });
    showDialog.value = false;
  },
});

/**  Confirm 버튼 클릭 처리 함수*/
const handleConfirm = () => {
  const json: string = JSON.stringify(movieInfo.value); // JSON 문자열로 변환
  const blob = new Blob([json], { type: 'application/json' }); // JSON Blob 생성
  const bodyForm = new FormData();
  bodyForm.append('info', blob); // JSON 정보를 FormData에 추가
  vttFile.value && bodyForm.append('vttFile', vttFile.value); // VTT 파일 추가
  coverFile.value && bodyForm.append('coverFile', coverFile.value); // Cover 파일 추가
  videoFile.value && bodyForm.append('videoFile', videoFile.value);
  uploadVideo(bodyForm);
};

const movieInfo: Ref<VideoRequestBody> = ref({
  originName: '',
  fileName: '',
  fileSize: 0,
  fileType: 'etc',
  fileDesc: '',
  fileAuth: false,
  downloadable: false,
});

const closeDialog = () => {
  showDialog.value = false;
  emit('fetchVideoList');
};

const updatedUploadCover = (upload: File) => {
  coverFile.value = upload;
};

const updatedUploadVtt = (upload: File) => {
  vttFile.value = upload;
};

const updatedUploadfiles = (files: FileInfo[]) => {
  videoFile.value = files[0].file;
  movieInfo.value.originName = files[0].name;
  movieInfo.value.fileName = files[0].name.substring(
    0,
    files[0].name.lastIndexOf('.'),
  );
  movieInfo.value.fileSize = files[0].size;
};
</script>

<template>
  <Dialog v-model:visible="showDialog" width="1000px" @confirm="handleConfirm">
    <template #header>
      <VIcon class="text-primary mr-3" icon="mdi-video" />
      {{ t('video.uploadVideo') }}
    </template>
    <template #default>
      <ImportVideoFile
        selected-type="nan"
        :file-types="availableFileTypes"
        :is-multiple="isMultiple"
        @updated-uploadfiles="updatedUploadfiles"
      />
      <VDivider class="mt-10" />
      <VideoFileUpload
        class="pa-5"
        :is-edit="false"
        v-model:movieInfo="movieInfo"
        @close-dialog="closeDialog"
        @updated-uploadVtt="updatedUploadVtt"
        @updated-uploadCover="updatedUploadCover"
      />
    </template>
  </Dialog>
</template>

<style scoped lang="scss"></style>
