<template>
  <v-dialog max-width="1200">
    <v-card color="#161616">
      <v-card-title>
        <h4 class="mb-5">
          <v-icon class="primary--text mr-3">mdi-video</v-icon>{{ $t('video.uploadVideo') }}
        </h4>
      </v-card-title>
      <v-card-text>
        <import-local-file selected-type="nan" :fileTypes="availableFileTypes" :isMultiple="multiple"
          @updatedUploadfiles="updatedUploadfiles" />
        <v-divider class="mt-10"></v-divider>
        <upload-file-form @closeDialog="closeDialog" v-model="movieInfo" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from 'vue';
import ImportLocalFile from "@/components/admin/ImportLocalFile.vue";
import UploadFileForm from "@/components/admin/UploadFileForm.vue";

defineProps({
  showResourceManageDialog: {
    type: Boolean,
    required: true,
  },
  isMobile: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:showResourceManageDialog', 'fetchVideoList']);

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

function closeDialog() {
  // lazyShow.value = false;
  emit('fetchVideoList');
}

function updatedUploadfiles(files: any) {
  movieInfo.value.file = files[0].file;
  movieInfo.value.originName = files[0].name;
  movieInfo.value.name = files[0].name.substring(0, files[0].name.lastIndexOf('.'));
  movieInfo.value.fileSize = files[0].size;
  movieInfo.value.status = files[0].status;
}
</script>

<style scoped lang="scss"></style>
