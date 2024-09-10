<template>
  <VContainer class="main">
    <div class="movie-poster">
      <div class="movie-poster-blur">
        <div class="movie-poster-box">
          <h3><VIcon class="text-primary">mdi-duck</VIcon> NAL TV</h3>
          <h2 class="text-md-h2 mb-5">WATCH ANYWHERE</h2>
          <h4 class="text-grey">{{ t('video.videoPageSubTitle') }}</h4>
          <div class="mt-10 movie-btn-area">
            <VBtn color="btnPrimary mb-5" dark @click="playAny()">
              <VIcon class="mr-2">mdi-play-circle-outline</VIcon
              >{{ t('video.playAny') }}
            </VBtn>
            <VBtn color="background" @click="updateShowUploadDialog(true)">
              <VIcon class="mr-2">mdi-cloud-upload-outline</VIcon
              >{{ t('video.uploadVideo') }}
            </VBtn>
          </div>
        </div>
      </div>
    </div>
    <VCard class="mx-auto pa-5" color="#121212">
      <VRow class="align-center">
        <VCol class="d-flex pa-1" cols="12" sm="4">
          <VSelect
            class="input-custom"
            item-text="label"
            item-value="value"
            v-model="searchCategory"
            solo
            :items="categories"
            filled
            :label="t('category')"
            @change="fetchVideoList"
          ></VSelect>
        </VCol>
        <VCol class="d-flex pa-1" cols="12" sm="8">
          <VTextField
            class="input-custom"
            solo
            :label="t('searchPlaceHolder')"
            append-icon="mdi-magnify"
            v-model="searchText"
            @keyup.enter="fetchVideoList"
            @click:append="fetchVideoList"
          ></VTextField>
        </VCol>
      </VRow>
    </VCard>
    <template v-for="(category, index) in categories" :key="index">
      <VDivider class="mb-10 mt-10"></VDivider>
      <h2 class="text-primary mb-3">{{ category.label }}</h2>
      <VideoSlider
        :category="category.value"
        :videoList="
          movieList.filter(
            (f: VideoDetailData) => f.fileType === category.value,
          )
        "
        @onClickMovie="onClickMovie($event)"
      ></VideoSlider>
    </template>
    <VideoUploadDialog
      :isMultiple="true"
      v-model:showDialog="showUploadDialog"
      @fetchVideoList="fetchVideoList"
    />
  </VContainer>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import VideoUploadDialog from '@/features/dialog/VideoUploadDialog.vue';
import storageService from '@/api/storageService';
import { useI18n } from 'vue-i18n';
import VideoSlider from '@/features/wonderwall/video/VideoSlider.vue';
import { shuffleArray } from '@/utils/commonUtil';
import {
  VideoDetailData,
  VideoListRequestData,
} from '@/types/wonderwall/video';
import { ApiResponse } from '@/types/axios';
const { t } = useI18n();
const categories: any = [
  { label: t('video.movie'), value: 'movie', hint: t('video.movie') },
  {
    label: t('video.tomAndJerry'),
    value: 'ani',
    hint: t('video.tomAndJerry'),
  },
  { label: t('video.nald'), value: 'nald', hint: t('video.nald') },
];

const movieList: Ref<VideoDetailData[]> = ref([]);
const searchText: Ref<string> = ref('');
const searchCategory: Ref<string> = ref('');

const showUploadDialog = ref(false);
// v-model에 대한 update 이벤트를 처리하는 함수 정의
const updateShowUploadDialog = (newValue: boolean) => {
  showUploadDialog.value = newValue;
};

const router = useRouter();

onMounted(() => {
  fetchVideoList();
  console.log(movieList.value);
});

const fetchVideoList = async () => {
  try {
    const param: VideoListRequestData = {
      type: searchCategory.value,
      searchText: searchText.value,
    };
    const response = (await storageService.getVideoList(param)) as ApiResponse;
    if (response.status_code === 200) {
      movieList.value = response.data.list;
    }
  } catch (error) {
    console.error('Error fetching video list:', error);
  }
};

const playAny = () => {
  const list: VideoDetailData[] = movieList.value.filter(
    (f: VideoDetailData) => f.fileSrc !== null && f.fileSrc !== '',
  );
  console.log('list', list);
  console.log('shuffleArray(list),', shuffleArray(list));
  router
    .push({
      name: 'StreamingPage',
      query: {
        movieId: shuffleArray(list)[0].storageId,
      },
    })
    .catch((err) => err);
};

const onClickMovie = (item: VideoDetailData) => {
  if (item.fileSrc !== null && item.fileSrc !== '') {
    router
      .push({
        name: 'StreamingPage',
        query: {
          movieId: item.storageId,
        },
      })
      .catch((err) => err);
  }
};
</script>

<style lang="scss" scoped>
@keyframes movieSilde {
  from {
    background-position: 0px 0px;
  }

  to {
    background-position: 500px 0px;
  }
}

.movie-poster {
  height: 500px;
  background-image: linear-gradient(
      140deg,
      rgba(10, 10, 10, 0.8),
      rgba(10, 10, 10, 0.8)
    ),
    url('../../../assets/images/moviePoster.jpg');
  background-position: center center;
  background-repeat: repeat;
  background-size: cover;
  animation-name: movieSilde;
  animation-duration: 50s;
  animation-iteration-count: infinite;
  animation-direction: alternate;

  .movie-poster-blur {
    width: 100%;
    height: 100%;
    align-items: center;
    display: flex;
    justify-content: center;

    .movie-poster-box {
      height: 300px;

      h2 {
        text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.424);
        font-size: 2rem;
        font-weight: bold;
      }

      .movie-btn-area {
        max-width: 400px;
      }
    }
  }

  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    .movie-poster-blur {
      -webkit-backdrop-filter: blur(5px);
      backdrop-filter: blur(5px);
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
}
</style>
