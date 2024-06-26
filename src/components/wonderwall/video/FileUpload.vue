<template>
  <v-card color="#161616" elevation="0">
    <v-row>
      <v-col md='7'>
        <v-text-field type="text" :label="movieInfo?.file ? `${$t('video.selectedFile')}` : ''" :disabled="true"
          v-model="movieInfo.originName">
        </v-text-field>
      </v-col>
      <v-col md='5'>
        <v-text-field type="text" :label="`${$t('video.uploadFileSize')}`" :disabled="true"
          v-model="movieInfo.fileSize">
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col md='6'>
        <v-text-field class=" input-aster" required counter="40" :label="`${$t('video.movieName')}`"
          prepend-icon="mdi-pen" v-model="movieInfo.name">
        </v-text-field>
      </v-col>
      <v-col md='6'>
        <v-select required v-model="movieInfo.category" :label="`${$t('video.category')}`" prepend-icon="mdi-shape"
          item-title="label" item-value="value" :items="categories" persistent-hint return-object single-line>
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col md='12'>
        <v-text-field type="text" :label="`${$t('video.description')}`" counter="100" prepend-icon="mdi-text-box"
          v-model="movieInfo.description">
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col md='3'>
        <v-file-input v-model="movieInfo.fileCover" :rules="coverRules" accept="image/png"
          :label="`${$t('video.fileCover')}`" prepend-icon="mdi-camera"></v-file-input>
      </v-col>
      <v-col md='3'>
        <v-file-input v-model="movieInfo.fileVtt" :label="`${$t('video.subtitle')}`" accept=".vtt"></v-file-input>
      </v-col>
      <v-col md='3'>
        <v-switch v-model="movieInfo.fileDownload" inset :label="`${$t('video.ableToDownload')}`"></v-switch>
      </v-col>
      <v-col md='3'>
        <v-switch v-model="movieInfo.fileAuth" inset :label="`${$t('video.private')}`"></v-switch>
      </v-col>
    </v-row>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn outlined rounded text color="grey lighten-1" min-width="100" @click="$emit('closeDialog')">
        {{ $t('cancel') }}
      </v-btn>
      <v-btn outlined rounded text color="btnPrimary" :disabled="movieInfo.name === '' || movieInfo.file === null"
        min-width="100" @click="onSubmit">
        {{ $t('confirm') }} <v-icon right dark>mdi-cloud-upload</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import storageService from '@/api/storageService';
import { useAppStatusStore } from '@/store';


const { modelValue } = defineProps({
  modelValue: {
    type: Object,
    required: false,
    default: () => ({
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
    })
  }
});

const emit = defineEmits(['update:modelValue', 'closeDialog']);
const appStatusStore = useAppStatusStore();
const { t } = useI18n();

const categories = [
  { label: t('video.movie'), value: 'movie', hint: t('video.movie') },
  { label: t('video.tomAndJerry'), value: 'ani', hint: t('video.tomAndJerry') },
  { label: t('video.personal'), value: 'personal', hint: t('video.personal') },
  { label: t('video.nald'), value: 'nald', hint: t('video.nald') },
  { label: t('video.etc'), value: 'etc', hint: t('video.etc') }
];

const coverRules = ref([
  (value: File | null) => !value || value.size < 2000000 || 'Cover size should be less than 2 MB!',
]);

// 초기 props 모델 값이 정의되지 않았을 경우에 대한 방어 코드
const movieInfo = ref({
  ...modelValue || {
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
  }
});

watch(modelValue, (newValue) => {
  movieInfo.value = modelValue;
}, { immediate: true });

const thumbnail = ref(null);

async function onSubmit() {
  if (movieInfo.value.fileCover) {
    await fileToBase64(movieInfo.value.fileCover).then((result: any) => {
      thumbnail.value = result;
    });
  }
  const info = {
    fileName: movieInfo.value.name,
    fileSize: movieInfo.value.fileSize,
    fileDownload: movieInfo.value.fileDownload,
    description: movieInfo.value.description,
    category: movieInfo.value.category ? movieInfo.value.category.value : categories[0].value,
    fileAuth: movieInfo.value.fileAuth,
    fileCover: thumbnail.value
  };
  appStatusStore.showLoading();
  await storageService.localUploadFiles(info, movieInfo.value).then((res: any) => {
    appStatusStore.hideLoading();
    let title = `${t('complete')}`;
    let msg = `${t('confirmMsg')}`;
    if (res.status !== 200) {
      title = `${t('error')}`;
      msg = res.data.message;
    }

    appStatusStore.showDialog({
      title: title,
      description: msg,
      invisibleClose: true
    });
    emit('closeDialog');
  });
}

function fileToBase64(file: any) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}
</script>

<style lang="scss" scoped></style>
