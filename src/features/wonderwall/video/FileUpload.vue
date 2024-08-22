<template>
  <VCard color="#161616" elevation="0">
    <VRow>
      <VCol md="7">
        <VTextField
          type="text"
          :label="movieInfo?.file ? `${t('video.selectedFile')}` : ''"
          :disabled="true"
          v-model="movieInfo.originName"
        />
      </VCol>
      <VCol md="5">
        <VTextField
          type="text"
          :label="`${t('video.uploadFileSize')}`"
          :disabled="true"
          v-model="movieInfo.fileSize"
        />
      </VCol>
    </VRow>
    <VRow>
      <VCol md="6">
        <VTextField
          class="input-aster"
          required
          counter="40"
          :label="`${t('video.movieName')}`"
          prepend-icon="mdi-pen"
          v-model="movieInfo.name"
        >
        </VTextField>
      </VCol>
      <VCol md="6">
        <VSelect
          required
          v-model="movieInfo.category"
          :label="`${t('video.category')}`"
          prepend-icon="mdi-shape"
          item-title="label"
          item-value="value"
          :items="categories"
          persistent-hint
          return-object
          single-line
        >
        </VSelect>
      </VCol>
    </VRow>
    <VRow>
      <VCol md="12">
        <VTextField
          type="text"
          :label="`${t('video.description')}`"
          counter="100"
          prepend-icon="mdi-text-box"
          v-model="movieInfo.description"
        >
        </VTextField>
      </VCol>
    </VRow>
    <VRow>
      <VCol md="3">
        <VFileInput
          v-model="movieInfo.fileCover"
          :rules="coverRules"
          accept="image/png"
          :label="`${t('video.fileCover')}`"
          prepend-icon="mdi-camera"
        ></VFileInput>
      </VCol>
      <VCol md="3">
        <VFileInput
          v-model="movieInfo.fileVtt"
          :label="`${t('video.subtitle')}`"
          accept=".vtt"
        ></VFileInput>
      </VCol>
      <VCol md="3">
        <VSwitch
          v-model="movieInfo.fileDownload"
          inset
          :label="`${t('video.ableToDownload')}`"
        ></VSwitch>
      </VCol>
      <VCol md="3">
        <VSwitch
          v-model="movieInfo.fileAuth"
          inset
          :label="`${t('video.private')}`"
        ></VSwitch>
      </VCol>
    </VRow>
    <VCardActions>
      <VSpacer></VSpacer>
      <VBtn
        outlined
        rounded
        variant="text"
        color="grey lighten-1"
        min-width="100"
        @click="$emit('closeDialog')"
      >
        {{ t('cancel') }}
      </VBtn>
      <VBtn
        outlined
        rounded
        variant="text"
        color="btnPrimary"
        :disabled="movieInfo.name === '' || movieInfo.file === null"
        min-width="100"
        @click="onSubmit"
      >
        {{ t('confirm') }} <VIcon right dark>mdi-cloud-upload</VIcon>
      </VBtn>
    </VCardActions>
  </VCard>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import storageService from '@/api/storageService';
import { useAppCommonStore } from '@/store';

const { modelValue } = defineProps({
  modelValue: {
    type: Object,
    required: false,
    default: () => ({
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
    }),
  },
});

const emit = defineEmits(['update:modelValue', 'closeDialog']);
const appStatusStore = useAppCommonStore();
const { t } = useI18n();

const categories = [
  { label: t('video.movie'), value: 'movie', hint: t('video.movie') },
  {
    label: t('video.tomAndJerry'),
    value: 'ani',
    hint: t('video.tomAndJerry'),
  },
  { label: t('video.nald'), value: 'nald', hint: t('video.nald') },
];

const coverRules = ref([
  (value: File | null) =>
    !value || value.size < 2000000 || 'Cover size should be less than 2 MB!',
]);

// 초기 props 모델 값이 정의되지 않았을 경우에 대한 방어 코드
const movieInfo = ref({
  ...(modelValue || {
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
  }),
});

watch(
  modelValue,
  (newValue) => {
    movieInfo.value = modelValue;
  },
  { immediate: true },
);

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
    category: movieInfo.value.category
      ? movieInfo.value.category.value
      : categories[0].value,
    fileAuth: movieInfo.value.fileAuth,
    fileCover: thumbnail.value,
  };
  appStatusStore.showLoading();
  await storageService
    .localUploadFiles(info, movieInfo.value)
    .then((res: any) => {
      appStatusStore.hideLoading();
      let title = `${t('complete')}`;
      let msg = `${t('confirmMsg')}`;
      if (res.status_code !== 200) {
        title = `${t('error')}`;
        msg = res.data.message;
      }

      appStatusStore.showDialog({
        title: title,
        description: msg,
        showCloseButton: true,
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
