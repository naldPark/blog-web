<template>
  <v-dialog @update:model-value="updateShowValue" max-width="1200">
    <v-card color="#161616">
      <v-card-title>
        <h4 class="mb-5">
          <v-icon class="text-primary mr-3">mdi-video</v-icon>{{ $t('video.uploadVideo') }}
        </h4>
      </v-card-title>
      <v-card-text>
        <ImportLocalFile selected-type="nan" :fileTypes="availableFileTypes" :isMultiple="isMultiple"
          @updatedUploadfiles="updatedUploadfiles" />
        <v-divider class="mt-10"></v-divider>
        <FileUpload @closeDialog="closeDialog" v-model="movieInfo" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import ImportLocalFile from "@/components/wonderwall/video/ImportLocalFIle.vue";
import FileUpload from "@/components/wonderwall/video/FileUpload.vue";


const { isMultiple } = defineProps({
  isMultiple: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['close', 'fetchVideoList', 'update:modelValue']);
function updateShowValue(value: any) {
  emit('update:modelValue', value);
}

const availableFileTypes = ['.mp4'];




const movieInfo = ref({
  category: null,
  file: null,
  originName: "",
  fileSize: 0,
  description: "",
  name: "",
  status: "",
  fileType: "",
  fileCover: null,
  fileVtt: null,
  fileDownload: false,
  fileAuth: false,
});

const closeDialog = () => {
  // lazyShow.value = false;
  emit('fetchVideoList');
}

const updatedUploadfiles = (files: any) => {
  movieInfo.value.file = files[0].file;
  movieInfo.value.originName = files[0].name;
  movieInfo.value.name = files[0].name.substring(0, files[0].name.lastIndexOf('.'));
  movieInfo.value.fileSize = files[0].size;
  movieInfo.value.status = files[0].status;
}
</script>

<style scoped lang="scss"></style>
