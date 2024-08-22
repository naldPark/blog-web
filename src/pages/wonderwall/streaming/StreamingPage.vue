<template>
  <div>
    <div v-if="!lazyShow">
      <VCard class="mx-auto pa-5" color="#121212">
        <VRow class="justify-align-center">
          <VCol class="d-flex pa-1" cols="12" sm="4">
            <VSelect
              class="input-custom"
              item-title="label"
              item-value="value"
              v-model="searchCategory"
              solo
              :items="categories"
              filled
              :label="t('category')"
            ></VSelect>
          </VCol>
          <VCol class="d-flex pa-1" cols="12" sm="8">
            <VTextField
              class="input-custom"
              solo
              :label="t('searchPlaceHolder')"
              append-icon="mdi-magnify"
              v-model="searchText"
              @keyup.enter="searchVideo"
              @click:append="searchVideo"
            ></VTextField>
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
              <VBtn
                color="primary"
                rounded
                variant="outlined"
                :disabled="currentMovie.downloadable === 'N'"
                @click="clickToDownload"
              >
                <VIcon>mdi-download</VIcon>
                {{ t('video.download') }}
              </VBtn>
            </div>
          </VCol>
        </VRow>
        <VDivider class="mt-4 mb-4"></VDivider>
        <div class="title">
          {{ t('video.synopsis') }}
        </div>
        <div class="font-weight-light subtitle-2 description text-grey pa-3">
          {{ currentMovie.fileDesc }}
        </div>
      </div>
      <VDivider class="mt-2 mb-4"></VDivider>
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

<script setup lang="ts">
import { ref, onMounted, Ref, getCurrentInstance } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import StorageService from '@/api/storageService';
import MovieItem from '@/features/wonderwall/video/MovieItem.vue';
import VideoPlayer from '@/features/wonderwall/video/VideoPlayer.vue';
import { useAppCommonStore } from '@/store/appCommonStore';
import { VideoDetailData } from '@/types/wonderwall/video';
import { useI18n } from 'vue-i18n';

/** globalConfig 사용 */
const { proxy: pxy } = getCurrentInstance()!;
const { t } = useI18n();
const categories = [
  { label: pxy!.$t('all'), value: '' },
  { label: pxy!.$t('movie'), value: 'movie' },
  { label: pxy!.$t('personal'), value: 'personal' },
  { label: pxy!.$t('etc'), value: 'etc' },
];
const searchCategory: Ref<string> = ref('');
const currentMovie: Ref<VideoDetailData> = ref({
  storageId: 0,
  fileName: '',
  fileSrc: '',
  fileSize: 0,
  fileType: '',
  createdDt: '',
  downloadable: '',
  vttSrc: '',
  fileDesc: '',
});
const movieList: Ref<VideoDetailData[]> = ref([]);
const searchText: Ref<string> = ref('');
const lazyShow: Ref<boolean> = ref(true);

const router = useRouter();
const route = useRoute();
const appStatusStore = useAppCommonStore();

const searchVideo = () => {
  router
    .push({
      name: 'StreamingListPage',
      params: {
        searchText: searchText.value,
        searchCategory: searchCategory.value,
      },
    })
    .catch((err) => err);
};

const onClickMovie = async (storageId: number) => {
  router
    .replace({
      name: 'StreamingPage',
      query: {
        movieId: storageId,
      },
    })
    .catch((err) => err);

  appStatusStore.showLoading();
  const fileId = storageId;
  lazyShow.value = true;
  await StorageService.getVideoDetail(fileId).then(async (res: any) => {
    let vttSrc = '';
    if (res.data.vttSrc) {
      await StorageService.videoVtt(fileId).then((vttRes: any) => {
        vttSrc = URL.createObjectURL(
          new Blob([vttRes.data], { type: 'text/vtt;charset=utf-8;' }),
        );
      });
    }
    const videoSrc = `/api/storage${res.data.fileSrc}`;
    currentMovie.value = {
      ...res.data,
      fileSrc: videoSrc,
      vttSrc: vttSrc,
    };
    lazyShow.value = false;
    fetchVideoList();
    appStatusStore.hideLoading();
  });
};

const clickToDownload = async () => {
  appStatusStore.showLoading();
  await StorageService.download(currentMovie.value.storageId).then(
    (res: any) => {
      const blob = new Blob([res.data]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.target = '_self';
      link.download = `${currentMovie.value.fileName}.mp4`;
      link.click();
    },
  );
  appStatusStore.hideLoading();
};

const fetchVideoList = () => {
  return new Promise((resolve) => {
    const param: any = {
      limit: 4,
      offset: 0,
      sort: 'random',
    };
    StorageService.getVideoList(param)
      .then((response: any) => {
        if (response.status_code === 200) {
          movieList.value = response.data.list;
        } else {
          appStatusStore.hideLoading();
          appStatusStore.addToastMessage({
            type: 'error',
            message: response.data.data || response.data.message,
            buttonMsg: null,
            buttonCallback: null,
          });
        }
        resolve({ finish: true });
      })
      .catch((error) => {
        resolve({ finish: true });
      });
  });
};

onMounted(() => {
  lazyShow.value = true;
  appStatusStore.showLoading();
  fetchVideoList();
  appStatusStore.hideLoading();
  const movieId: number = Number(route.query.movieId);
  if (!isNaN(movieId)) {
    onClickMovie(movieId);
  } else {
    lazyShow.value = false;
  }
});
</script>

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
