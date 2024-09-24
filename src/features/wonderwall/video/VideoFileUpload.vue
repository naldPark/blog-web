<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import InputText from '@/components/common/InputText.vue';
import SelectBox from '@/components/common/SelectBox.vue';
import { VideoDetailData } from '@/types/wonderwall/video';
import { streamimgCategories } from '@/assets/data/streaming';
import { VFileInput } from 'vuetify/lib/components/index.mjs';
import { onMounted, ref, Ref } from 'vue';
import { VideoRequestBody } from '@/types/admin';
import { filterKeysFromObject } from '@/utils/commonUtil';
const { t } = useI18n();
const emit = defineEmits(['updatedUploadCover', 'updatedUploadVtt']);

/** 업로드한 썸네일  */
const fileCover: Ref<File | undefined> = ref(undefined);
/** 업로드한 자막  */
const fileVtt: Ref<File | undefined> = ref(undefined);

const movieInfo = defineModel<VideoRequestBody>('movieInfo', {
  default: () => ({
    originName: '',
    fileName: '',
    fileSize: 0,
    fileType: 'etc',
    fileDesc: '',
    fileAuth: false,
    downloadable: false,
  }),
});

const { detailData } = defineProps<{
  isEdit: boolean;
  detailData?: VideoDetailData;
}>();

/** api에 불필요한 key filter처리 */
const editRequestKeys = [
  'originName',
  'fileName',
  'fileSize',
  'fileType',
  'fileDesc',
  'fileAuth',
  'downloadable',
];

onMounted(() => {
  if (detailData)
    movieInfo.value = filterKeysFromObject(editRequestKeys, detailData);
});

/** 검증 rules */
const rules = {
  required: (value: string) => !!value || t('required'),
  maxSize: (value: FileList | null) => {
    if (!value || value.length === 0) return true;
    const file = value[0];
    const maxSizeInBytes = 2000000; // 2MB
    return file.size < maxSizeInBytes || t('coverSizeWarning');
  },
};
</script>

<template>
  <VCard color="#161616" elevation="0">
    <VRow v-if="!isEdit">
      <VCol cols="12" sm="7">
        <InputText
          v-model="movieInfo.originName"
          :label="movieInfo.originName ? t('video.selectedFile') : ''"
          :disabled="true"
        />
      </VCol>
      <VCol cols="12" sm="5">
        <InputText
          v-model="movieInfo.fileSize"
          :label="t('video.uploadFileSize')"
          :disabled="true"
        />
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12" sm="6">
        <InputText
          class="input-aster"
          required
          :counter="40"
          :label="t('video.movieName')"
          prepend-icon="mdi-pen"
          v-model="movieInfo.fileName"
        />
      </VCol>
      <VCol cols="12" sm="6">
        <SelectBox
          v-model="movieInfo.fileType"
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
        <InputText
          :counter="100"
          :label="t('video.description')"
          prepend-icon="mdi-text-box"
          v-model="movieInfo.fileDesc"
        />
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12" sm="6">
        <VFileInput
          clearable
          v-model="fileCover"
          :rules="[rules.maxSize]"
          accept="image/png"
          :label="t('video.fileCover')"
          @change="emit('updatedUploadVtt', fileCover)"
          prepend-icon="mdi-camera"
        >
          <template v-slot:label="label">
            <div
              v-if="detailData?.fileCover && !fileCover"
              class="d-flex align-center"
            >
              <VAvatar
                class="w-30 mr-3"
                :image="detailData.fileCover"
                rounded="0"
                :tile="true"
              />
              <div>{{ detailData.fileCover }}</div>
            </div>
            <div v-else>{{ label.label }}</div>
          </template>
        </VFileInput>
      </VCol>
      <VCol cols="12" sm="6">
        <VFileInput
          clearable
          v-model="fileVtt"
          :label="t('video.subtitle')"
          accept=".vtt"
          @change="emit('updatedUploadVtt', fileVtt)"
        >
          <template v-slot:label="label">
            <v-chip
              v-if="detailData?.vttSrc && !fileVtt"
              color="primary"
              variant="outlined"
              prepend-icon="mdi-subtitles"
            >
              .vtt
            </v-chip>
            <div v-else>{{ label.label }}</div>
          </template>
        </VFileInput>
      </VCol>
    </VRow>
    <VRow justify="end" class="pa-3 gap-10">
      <VSwitch
        v-model="movieInfo.downloadable"
        inset
        color="primary"
        :label="t('video.ableToDownload')"
      />
      <VSwitch
        v-model="movieInfo.fileAuth"
        inset
        color="primary"
        :label="t('video.private')"
      />
    </VRow>
  </VCard>
</template>

<style lang="scss" scoped></style>
