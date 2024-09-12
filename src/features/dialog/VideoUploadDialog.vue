<template>
  <Dialog
    v-model:visible="showDialog"
    max-width="1200"
    min-width="1000"
    @confirm="handleConfirm"
    @click:outside="handleClickOutside"
  >
    <template #header>
      <VIcon class="text-primary mr-3" icon="mdi-video" />
      {{ t('video.uploadVideo') }}
    </template>
    <template #default>
      <h4 class="mb-5">
        <VIcon class="text-primary mr-3" icon="mdi-video" />
        {{ t('video.uploadVideo') }}
      </h4>
      <ImportLocalFile
        selected-type="nan"
        :file-types="availableFileTypes"
        :is-multiple="isMultiple"
        @updated-uploadfiles="updatedUploadfiles"
      />
      <VDivider class="mt-10" />
      <FileUpload
        v-model="movieInfo"
        @close-dialog="closeDialog"
        @updated-uploadVtt="updatedUploadVtt"
        @updated-uploadCover="updatedUploadCover"
      />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, Ref } from 'vue';
import Dialog from '@/components/common/Dialog.vue';
import { useI18n } from 'vue-i18n';
import ImportLocalFile from '@/features/wonderwall/video/ImportLocalFIle.vue';
import FileUpload from '@/features/wonderwall/video/FileUpload.vue';
import { FileInfo, MovieInfoRequestData } from '@/types/wonderwall/video';
import useMutation from '@/hook/useMutation';
import storageService from '@/api/storageService';
import { useAppCommonStore } from '@/store/appCommonStore';
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

/** Video 삭제 mutation */
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

// Confirm 버튼 클릭 처리 함수
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

// 다이얼로그 외부 클릭 처리 함수
const handleClickOutside = () => {
  console.log('Clicked outside the dialog');
};

const movieInfo: Ref<MovieInfoRequestData> = ref({
  originName: '',
  fileName: '',
  fileSize: 0,
  category: 'etc',
  description: '',
  fileAuth: false,
  fileDownload: false,
});

const closeDialog = () => {
  console.log();
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

<style scoped lang="scss"></style>
