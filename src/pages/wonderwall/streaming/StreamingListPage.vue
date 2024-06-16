<template>
  <v-container class="main">
    <div class="movie-poster">
      <div class="movie-poster-blur">
        <div class="movie-poster-box">
          <h3><v-icon class="text-primary">mdi-duck</v-icon> NAL TV</h3>
          <h2 class="text-md-h2 mb-5">WATCH ANYWHERE</h2>
          <h4 class="text-grey">{{ t('video.videoPageSubTitle') }}</h4>
          <div class="mt-10 movie-btn-area">
            <v-btn color="btnPrimary mb-5" dark @click="playAny()">
              <v-icon class="mr-2">mdi-play-circle-outline</v-icon>{{ t('video.playAny') }}
            </v-btn>
            <v-btn color="background" @click="showResourceManageDialog = true">
              <v-icon class="mr-2">mdi-cloud-upload-outline</v-icon>{{ t('video.uploadVideo') }}
            </v-btn>
          </div>
        </div>
      </div>
    </div>
    <v-card class="mx-auto pa-5" color="#121212">
      <v-row class="align-center">
        <v-col class="d-flex pa-1" cols="12" sm="4">
          <v-select class="input-custom" item-text="label" item-value="value" v-model="searchCategory" solo
            :items="categories" filled :label="t('category')" @change="fetchVideoList"></v-select>
        </v-col>
        <v-col class="d-flex pa-1" cols="12" sm="8">
          <v-text-field class="input-custom" solo :label="t('searchPlaceHolder')" append-icon="mdi-magnify"
            v-model="searchText" @keyup.enter="fetchVideoList" @click:append="fetchVideoList"></v-text-field>
        </v-col>
      </v-row>
    </v-card>
    <v-divider class="mb-10"></v-divider>
    <h2 class="text-primary mb-3">{{ t('video.nald') }}</h2>
    <VideoSlider :category="'nald'" :cardList="movieList.filter((f: any) => f.fileType === 'nald')"
      @onClickMovie="onClickMovie($event)"></VideoSlider>
    <v-divider class="mb-10 mt-10"></v-divider>
    <h2 class="text-primary mb-3 ml-2">{{ t('video.movie') }}</h2>
    <VideoSlider :category="'movie'" :cardList="movieList.filter((f: any) => f.fileType === 'movie')"
      @onClickMovie="onClickMovie($event)"></VideoSlider>
    <v-divider class="mb-10 mt-10"></v-divider>
    <h2 class="text-primary mb-3">{{ t('video.tomAndJerry') }}</h2>
    <VideoSlider :category="'ani'" :cardList="movieList.filter((f: any) => f.fileType === 'ani')"
      @onClickMovie="onClickMovie($event)"></VideoSlider>
    <v-divider class="mb-10 mt-10"></v-divider>
    <resource-manage-dialog v-if="showResourceManageDialog" v-model="showResourceManageDialog"
      @fetchVideoList="fetchVideoList"></resource-manage-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import storageService from '@/api/storageService';
import { useI18n } from 'vue-i18n';
import VideoSlider from '@/components/wonderwall/video/VideoSlider.vue'
import { shuffleArray } from '@/utils/common';
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

const showResourceManageDialog: any = ref(false);
const movieList: any = ref([]);
const searchText: any = ref('');
const searchCategory: any = ref('');

const router = useRouter();

onMounted(() => {
  fetchVideoList();
  console.log(movieList.value);
});

const fetchVideoList = async () => {
  try {
    const param = {
      type: searchCategory.value,
      searchText: searchText.value,
    };
    const response = await storageService.getVideoList(param);
    if (response.status === 200) {
      movieList.value = response.data.list;
    }
  } catch (error) {
    console.error('Error fetching video list:', error);
  }
};

const playAny = () => {
  const list: any[] = movieList.value.filter(
    (f: any) => f.fileSrc !== null && f.fileSrc !== '',
  );
  console.log('list', list)
  console.log('shuffleArray(list),', shuffleArray(list))
  router.push({
    name: 'StreamingPage',
    query: {
      movieId: shuffleArray(list)[0].storageId,
    },
  })
    .catch((err) => err);
};

const onClickMovie = (item: any) => {
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

// watchEffect(() => {
//   fetchVideoList();
// });

// // 초기 마운트 시 실행
// fetchVideoList();
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
  background-image: linear-gradient(140deg,
      rgba(10, 10, 10, 0.8),
      rgba(10, 10, 10, 0.8)),
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
