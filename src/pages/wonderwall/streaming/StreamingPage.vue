<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import storageService from '@/api/storageService';
import MovieItem from '@/features/wonderwall/video/MovieItem.vue';
import VideoPlayer from '@/features/wonderwall/video/VideoPlayer.vue';
import { VideoDetailData } from '@/types/wonderwall/video';
import { useI18n } from 'vue-i18n';
import { streamimgCategories } from '@/assets/data/streaming';
import Button from '@/components/common/Button.vue';
import useCustomQuery from '@/hook/useCustomQuery';
import { COMMON_QUERY_KEY } from '@/types/queryEnum';
import { ApiResponse } from '@/types/axios';
import { useFetch } from '@/hook/useFetch';
import { downloadFile } from '@/utils/fileUtil';
const { t } = useI18n();
const searchCategory: Ref<string> = ref('');
const currentMovie: Ref<VideoDetailData> = ref({
  storageId: '0',
  fileName: '',
  fileSrc: '',
  fileSize: 0,
  fileType: '',
  createdDt: '',
  downloadable: false,
  vttSrc: '',
  fileDesc: '',
  fileAuth: false,
});
const movieList: Ref<VideoDetailData[]> = ref([]);
const searchText: Ref<string> = ref('');
const lazyShow: Ref<boolean> = ref(true);

const router = useRouter();
const route = useRoute();

const searchVideo = () => {
  router.push({
    name: 'StreamingListPage',
    params: {
      searchText: searchText.value,
      searchCategory: searchCategory.value,
    },
  });
};
const { data, fetchData } = useFetch<BlobPart>();

/** VideoDetail  Query */
const { hardFetch: videoDetailRefetch } = useCustomQuery({
  queryKey: [COMMON_QUERY_KEY.VIDEO_DETAIL],
  queryFn: () => storageService.getVideoDetail(String(route.query.movieId)),
  onSuccess: async (res: ApiResponse) => {
    let vttSrc = '';
    if (res.data.vttSrc) {
      await fetchData(() => storageService.getFileVtt(res.data.storageId));
      if (data.value)
        vttSrc = URL.createObjectURL(
          new Blob([data.value], { type: 'text/vtt;charset=utf-8;' }),
        );
    }
    currentMovie.value = {
      ...res.data,
      fileSrc: `/api/storage/${res.data.fileSrc}`,
      vttSrc: vttSrc,
    };
    lazyShow.value = false;
  },
});

const onClickMovie = (storageId: string) => {
  router
    .replace({
      name: 'StreamingPage',
      query: {
        movieId: storageId,
      },
    })
    .finally(() => {
      lazyShow.value = true;
      videoDetailRefetch();
      videoListRefetch();
    });
};

/** video 파일 download */
const clickToDownload = async () => {
  await fetchData(() => storageService.download(currentMovie.value.storageId));
  if (data.value)
    await downloadFile(
      new Blob([data.value]),
      `${currentMovie.value.fileName}.mp4`,
    );
};

/** VideoList random  */
const { hardFetch: videoListRefetch } = useCustomQuery({
  queryKey: [COMMON_QUERY_KEY.VIDEO_LIST],
  queryFn: () =>
    storageService.getVideoList({
      pageSize: 4,
      pageNumber: 0,
      sort: 'random',
    }),
  onSuccess: async (res: ApiResponse) => {
    movieList.value = res.data.list;
  },
});
</script>

<template>
  <div>
    <div v-if="!lazyShow">
      <VCard class="mx-auto pa-5" color="#121212">
        <VRow class="justify-align-center">
          <VCol class="d-flex pa-1" cols="12" sm="4">
            <SelectBox
              class="input-custom"
              item-title="label"
              item-value="value"
              v-model="searchCategory"
              solo
              :items="streamimgCategories"
              filled
              :label="t('category')"
            />
          </VCol>
          <VCol class="d-flex pa-1" cols="12" sm="8">
            <InputText
              class="input-custom"
              solo
              :label="t('searchPlaceHolder')"
              append-icon="mdi-magnify"
              v-model="searchText"
              @keyup.enter="searchVideo"
              @click:append="searchVideo"
            />
          </VCol>
        </VRow>
      </VCard>
      <div
        id="vue-core-video-player-box"
        class="movie-player text-center"
        :preload="'metadata'"
        style="vertical-align: middle"
      >
        <VideoPlayer
          :hlsSource="currentMovie.fileSrc"
          :vttSrc="currentMovie.vttSrc"
        />
      </div>
      <div class="movie-detail pl-3">
        <VChip small color="grey" variant="outlined" class="mb-2">
          {{ currentMovie.fileType }}
        </VChip>
        <VRow>
          <VCol cols="12" sm="8">
            <h1 class="title">{{ currentMovie.fileName }}</h1>
            <div class="body-2">
              {{ t('registDt') }}: {{ currentMovie.createdDt }}
            </div>
          </VCol>
          <VCol cols="12" sm="4">
            <div class="download mb-5">
              <Button
                color="primary"
                rounded
                variant="outlined"
                :disabled="!currentMovie.downloadable"
                @click="clickToDownload"
                :label="t('video.download')"
                append-icon="mdi-download"
              />
            </div>
          </VCol>
        </VRow>
        <VDivider class="mt-4 mb-4" />
        <div class="title">
          {{ t('video.synopsis') }}
        </div>
        <div class="font-weight-light subtitle-2 description text-grey pa-3">
          {{ currentMovie.fileDesc }}
        </div>
      </div>
      <VDivider class="mt-2 mb-4" />
      <div class="movie-list pa-2">
        <div class="title">
          {{ t('video.recommendedMovie') }}
        </div>
        <MovieItem
          v-for="movie in movieList"
          :key="movie.storageId"
          :item="movie"
          @selectMovie="onClickMovie(movie.storageId)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.movie-player {
  position: relative;
  background-color: #000;
  font-weight: normal;
  z-index: 2;
}

.movie-detail {
  padding-top: 20px;

  .download {
    padding-right: 20px;
    text-align: right;
  }
}

.title {
  font-size: 1.25rem;
}
</style>
