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
      <FileUpload v-model="movieInfo" @close-dialog="closeDialog" />
    </template>
    <!-- <template #footer>
      <VSpacer />
    </template> -->
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, Ref } from 'vue';
import Dialog from '@/components/common/Dialog.vue';
import { useI18n } from 'vue-i18n';
import ImportLocalFile from '@/features/wonderwall/video/ImportLocalFIle.vue';
import FileUpload from '@/features/wonderwall/video/FileUpload.vue';
import { FileInfo, MovieInfoData } from '@/types/wonderwall/video';
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

// Confirm 버튼 클릭 처리 함수
const handleConfirm = () => {
  console.log('Confirm button clicked');
  showDialog.value = false; // 다이얼로그 닫기
};

// 다이얼로그 외부 클릭 처리 함수
const handleClickOutside = () => {
  console.log('Clicked outside the dialog');
};

const movieInfo: Ref<MovieInfoData> = ref({
  category: '',
  file: null,
  originName: '',
  fileSize: 0,
  description: '',
  name: '',
  status: '',
  fileType: '',
  fileCover: undefined,
  fileVtt: null,
  fileDownload: false,
  fileAuth: false,
});

const closeDialog = () => {
  console.log();
  showDialog.value = false;
  emit('fetchVideoList');
};

const updatedUploadfiles = (files: FileInfo[]) => {
  movieInfo.value.file = files[0].file;
  movieInfo.value.originName = files[0].name;
  movieInfo.value.name = files[0].name.substring(
    0,
    files[0].name.lastIndexOf('.'),
  );
  movieInfo.value.fileSize = files[0].size;
  movieInfo.value.status = files[0].status;
};
</script>

<style scoped lang="scss"></style>
