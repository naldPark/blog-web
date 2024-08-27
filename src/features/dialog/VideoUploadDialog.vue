<template>
  <VDialog max-width="1200" @update:model-value="updateShowValue">
    <VCard color="#161616">
      <VCardText>
        <h4 class="mb-5">
          <VIcon class="text-primary mr-3"> mdi-video </VIcon
          >{{ t('video.uploadVideo') }}
        </h4>
        <ImportLocalFile
          selected-type="nan"
          :file-types="availableFileTypes"
          :is-multiple="isMultiple"
          @updated-uploadfiles="updatedUploadfiles"
        />
        <VDivider class="mt-10" />
        <FileUpload v-model="movieInfo" @close-dialog="closeDialog" />
      </VCardText>
      <VCardActions>
        <VSpacer />
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, Ref } from 'vue';
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

const emit = defineEmits(['close', 'fetchVideoList', 'update:modelValue']);
const updateShowValue = (value: boolean) => {
  emit('update:modelValue', value);
};

const availableFileTypes = ['.mp4'];

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
  updateShowValue(false);
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
