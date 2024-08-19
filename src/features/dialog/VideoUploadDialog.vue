<template>
  <VDialog @update:model-value="updateShowValue" max-width="1200">
    <VCard color="#161616">
      <VCardText>
        <h4 class="mb-5">
          <VIcon class="text-primary mr-3">mdi-video</VIcon
          >{{ $t('video.uploadVideo') }}
        </h4>
        <ImportLocalFile
          selected-type="nan"
          :fileTypes="availableFileTypes"
          :isMultiple="isMultiple"
          @updatedUploadfiles="updatedUploadfiles"
        />
        <VDivider class="mt-10"></VDivider>
        <FileUpload @closeDialog="closeDialog" v-model="movieInfo" />
      </VCardText>
      <VCardActions>
        <VSpacer></VSpacer>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import ImportLocalFile from '@/features/wonderwall/video/ImportLocalFIle.vue';
  import FileUpload from '@/features/wonderwall/video/FileUpload.vue';

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

  const movieInfo = ref({
    category: null,
    file: null,
    originName: '',
    fileSize: 0,
    description: '',
    name: '',
    status: '',
    fileType: '',
    fileCover: null,
    fileVtt: null,
    fileDownload: false,
    fileAuth: false,
  });

  const closeDialog = () => {
    console.log();
    updateShowValue(false);
    emit('fetchVideoList');
  };

  const updatedUploadfiles = (files: any) => {
    console.log('왔냐', files);
    movieInfo.value.file = files[0].file;
    movieInfo.value.originName = files[0].name;
    movieInfo.value.name = files[0].name.substring(
      0,
      files[0].name.lastIndexOf('.'),
    );
    movieInfo.value.fileSize = files[0].size;
    movieInfo.value.status = files[0].status;

    console.log(movieInfo.value);
  };
</script>

<style scoped lang="scss"></style>
