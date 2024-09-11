<template>
  <VCard color="#161616" elevation="0">
    <VRow>
      <VCol md="7">
        <InputText
          v-model="movieInfo.originName"
          :label="!movieInfo.fileName ? t('video.selectedFile') : ''"
          placeholder="파일 업로드"
          :disabled="true"
          type="text"
        />
      </VCol>
      <VCol md="5">
        <InputText
          v-model="movieInfo.fileSize"
          :label="t('video.uploadFileSize')"
          :disabled="true"
          type="text"
        />
      </VCol>
    </VRow>
    <VRow>
      <VCol md="6">
        <InputText
          class="input-aster"
          required
          counter="40"
          :label="`${t('video.movieName')}`"
          prepend-icon="mdi-pen"
          v-model="movieInfo.fileName"
        />
      </VCol>
      <VCol md="6">
        <SelectBox
          v-model="movieInfo.category"
          :items="streamimgCategories"
          :rules="[rules.required]"
          item-value="value"
          item-title="label"
          :label="t('video.category')"
        />
      </VCol>
    </VRow>
    <VRow>
      <VCol md="12">
        <VTextField
          type="text"
          :label="t('video.description')"
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
          :rules="coverRules"
          accept="image/png"
          :label="`${t('video.fileCover')}`"
          prepend-icon="mdi-camera"
          @change="handleFileCoverChange"
        ></VFileInput>
      </VCol>
      <VCol md="3">
        <VFileInput
          :label="`${t('video.subtitle')}`"
          accept=".vtt"
          @change="handleFileVttChange"
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
  </VCard>
</template>

<script lang="ts" setup>
import { Ref, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import InputText from '@/components/common/InputText.vue';
import SelectBox from '@/components/common/SelectBox.vue';
import { MovieInfoRequestData } from '@/types/wonderwall/video';
import { streamimgCategories } from '@/assets/data/streaming';

const props = defineProps<{
  modelValue: MovieInfoRequestData;
}>();

const emit = defineEmits([
  'update:modelValue',
  'onSubmit',
  'updatedUploadCover',
  'updatedUploadVtt',
]);
const { t } = useI18n();

/** 검증 rules */
const rules = {
  required: (value: string) => !!value || t('required'),
};

const coverRules = ref([
  (value: File | null) =>
    !value || value.size < 2000000 || 'Cover size should be less than 2 MB!',
]);

const movieInfo: Ref<MovieInfoRequestData> = ref({
  ...props.modelValue,
});

const handleFileCoverChange = (event: Event) => {
  console.log('??!!!');
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    emit('updatedUploadCover', input.files[0]);
  }
  console.log('movieinfo', movieInfo.value);
};

const handleFileVttChange = (event: Event) => {
  console.log('movieInfo.value', movieInfo.value);
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    emit('updatedUploadVtt', input.files[0]);
  }
};

// watch(
//   props.modelValue,
//   (newValue) => {
//     movieInfo.value = {
//       ...props.modelValue,
//     };
//   },
//   { immediate: true },
// );
</script>

<style lang="scss" scoped></style>
