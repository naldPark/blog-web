<script lang="ts" setup>
import useCustomQuery from '@/hook/useCustomQuery';
import { COMMON_QUERY_KEY } from '@/types/queryEnum';
import storageService from '@/api/storageService';
import { ApiResponse } from '@/types/axios';
import { ref } from 'vue';
import { VideoDetailData } from '@/types/wonderwall/video';
import Button from '@/components/common/Button.vue';
import { useI18n } from 'vue-i18n';
import { useAppCommonStore } from '@/store/appCommonStore';
import useMutation from '@/hook/useMutation';
import { clone } from 'ramda';
import VideoEditDialog from '@/features/dialog/VideoEditDialog.vue';
import { VDataTable } from 'vuetify/lib/components/index.mjs';
import { useFetch } from '@/hook/useFetch';
import { useDownloadFile } from '@/hook/useDownloadFile';
import { VideoRequestBody } from '@/types/admin';

/** 전체 비디오 리스트 */
const videoList = ref<VideoDetailData[]>([]);

const { t } = useI18n();
const { showDialog, showToast, hideDialog } = useAppCommonStore();
const selectedVideo = ref<VideoDetailData>();

const showResourceEditDialog = ref(false);

type Header = {
  title: string;
  align?: 'start' | 'center' | 'end';
  key: string;
  width?: number;
};

/** 테이블 헤더 */
const videoListHeaders: Header[] = [
  { title: 'id', align: 'start', key: 'storageId', width: 50 },
  { title: t('name'), align: 'start', key: 'fileName' },
  {
    title: t('video.synopsis'),
    align: 'start',
    key: 'fileDesc',
    width: 450,
  },
  { title: t('video.subtitle'), align: 'center', key: 'vttSrc', width: 100 },
  { title: t('createdDt'), align: 'center', key: 'createdDt', width: 120 },
  {
    title: t('video.download'),
    align: 'center',
    key: 'downloadable',
    width: 110,
  },
  { title: 'Action', key: 'actions', align: 'center', width: 150 },
];

/** VideoList Query */
const { hardFetch: videoRefetch } = useCustomQuery({
  queryKey: [COMMON_QUERY_KEY.VIDEO_LIST],
  queryFn: () => storageService.getVideoList(),
  onSuccess: (res: ApiResponse) => {
    videoList.value = res.data.list;
  },
});

/** Video 삭제 mutation */
const { mutate: deleteVideo } = useMutation({
  mutationFn: (rowData: VideoDetailData) =>
    storageService.deleteVideo([rowData.storageId]),
  onSuccess: () => {
    showToast({
      type: 'success',
      message: t('complete'),
    });
    hideDialog();
  },
});

/** Video 수정 mutation */
const { mutate: editVideo } = useMutation({
  mutationFn: (editVideo: FormData) => storageService.putEditVideo(editVideo),
  onSuccess: () => {
    showToast({
      type: 'success',
      message: t('complete'),
    });
    showResourceEditDialog.value = false;
    videoRefetch();
  },
});

const onEditVideo = (
  editVideoInfo: VideoDetailData,
  fileCover: File,
  fileVtt: File,
) => {
  const json: string = JSON.stringify({
    ...editVideoInfo,
    storageId: selectedVideo.value?.storageId,
  }); // JSON 문자열로 변환
  const blob = new Blob([json], { type: 'application/json' }); // JSON Blob 생성
  const bodyForm = new FormData();
  bodyForm.append('info', blob); // JSON 정보를 FormData에 추가
  fileVtt && bodyForm.append('vttFile', fileVtt); // VTT 파일 추가
  fileCover && bodyForm.append('coverFile', fileCover); // Cover 파일 추가
  editVideo(bodyForm);
};

/** vtt 파일 download */
const downloadVtt = async (rowData: VideoDetailData) => {
  await fetchData(() => storageService.getFileVtt(rowData.storageId));
  if (data.value)
    await downloadFile(new Blob([data.value]), `${rowData.fileName}.vtt`);
};

/** Delete Confirm Dialog */
const clickDeleteVideo = (rowData: VideoDetailData) => {
  showDialog({
    title: t('deleteUsers'),
    description: `${t('deleteRowMsg', [rowData.fileName])}`,
    showCloseButton: true,
    action: () => deleteVideo(rowData),
  });
};

const clickEditVideo = (rowData: VideoDetailData) => {
  selectedVideo.value = clone(rowData);
  showResourceEditDialog.value = true;
};

const { data, fetchData } = useFetch<BlobPart>();
const { downloadFile } = useDownloadFile();
</script>
<template>
  <VCard flat>
    <VCardTitle class="d-flex align-center pe-2">
      <VIcon icon="mdi-semantic-web" size="sm" color="secondary" />
      <span class="ml-3">{{ t('resourceManage') }}</span>
      <VSpacer />
    </VCardTitle>
    <VDivider />
    <VDataTable
      class="ps-3 pe-3"
      :headers="videoListHeaders"
      :items="videoList"
    >
      <template v-slot:item.fileDesc="{ value }">
        <div style="width: 450px" class="ellipsis">{{ value }}</div>
      </template>
      <template v-slot:item.vttSrc="{ value, item }">
        <Button
          v-if="!!value"
          icon="mdi-cloud-download"
          color="orange"
          size="xl"
          @onClick="downloadVtt(item)"
        />
      </template>
      <template v-slot:item.actions="{ item }">
        <VTooltip :text="t('edit')">
          <template v-slot:activator="{ props }">
            <Button
              color=""
              class="text-amber-lighten-1 mr-3"
              icon="mdi-pencil"
              size="sm"
              variant="text"
              v-bind="props"
              @onClick="clickEditVideo(item)"
            />
          </template>
        </VTooltip>
        <VTooltip :text="t('delete')">
          <template v-slot:activator="{ props }">
            <Button
              color=""
              class="text-grey-lighten-1"
              icon="mdi-delete"
              size="sm"
              variant="text"
              v-bind="props"
              @onClick="clickDeleteVideo(item)"
            />
          </template>
        </VTooltip>
      </template>
    </VDataTable>
  </VCard>
  <VideoEditDialog
    v-if="showResourceEditDialog"
    v-model:showDialog="showResourceEditDialog"
    :selectedVideo="selectedVideo!"
    @action-on-edit="onEditVideo"
  />
</template>

<style lang="scss" scoped></style>
