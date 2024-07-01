<template>
  <div>
    <div v-if="!lazyShow">
      <v-card class="mx-auto pa-5" color="#121212">
        <v-row class="justify-align-center">
          <v-col class="d-flex pa-1" cols="12" sm="4">
            <v-select
              class="input-custom"
              item-title="label"
              item-value="value"
              v-model="searchCategory"
              solo
              :items="categories"
              filled
              :label="$t('category')"
            ></v-select>
          </v-col>
          <v-col class="d-flex pa-1" cols="12" sm="8">
            <v-text-field
              class="input-custom"
              solo
              :label="$t('searchPlaceHolder')"
              append-icon="mdi-magnify"
              v-model="searchText"
              @keyup.enter="searchVideo"
              @click:append="searchVideo"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
      <div
        id="vue-core-video-player-box"
        class="movie-player text-center"
        :preload="'metadata'"
        style="vertical-align: middle"
      >
        <VideoPlayer
          :hlsSource="currentMovie.fileSrc"
          :posterUrl="currentMovie.fileCover"
          :vttSrc="currentMovie.vttSrc"
        />
      </div>
      <div class="movie-detail pl-3">
        <v-chip small color="grey" veriant="outlined" class="mb-2">
          {{ currentMovie.fileType }}
        </v-chip>
        <v-row>
          <v-col cols="12" sm="8">
            <h1 class="title">{{ currentMovie.fileName }}</h1>
            <div class="body-2">
              {{ $t('registDt') }}: {{ currentMovie.createdDt }}
            </div>
          </v-col>
          <v-col cols="12" sm="4">
            <div class="download mb-5">
              <v-btn
                color="primary"
                rounded
                variant="outlined"
                :disabled="currentMovie.downloadable === 'N'"
                @click="clickToDownload()"
              >
                <v-icon>mdi-download</v-icon>
                {{ $t('video.download') }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
        <v-divider class="mt-4 mb-4"></v-divider>
        <div class="title">
          {{ $t('video.synopsis') }}
        </div>
        <div class="font-weight-light subtitle-2 description text-grey pa-3">
          {{ currentMovie.fileDesc }}
        </div>
      </div>
      <v-divider class="mt-2 mb-4"></v-divider>
      <div class="movie-list pa-2">
        <div class="title">
          {{ $t('video.recommendedMovie') }}
        </div>
        <movie-item
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
  import { ref, watch, onMounted, nextTick } from 'vue';
  import { useRouter } from 'vue-router';
  import StorageService from '@/api/storageService';
  import MovieItem from '@/components/wonderwall/video/MovieItem.vue';
  import { useDisplay } from 'vuetify';
  import { useI18n } from 'vue-i18n';
  import VideoPlayer from '@/components/wonderwall/video/VideoPlayer.vue';
  import { useAppStatusStore } from '@/store/appStatusStore';
  const playerOptions = ref({
    autoplay: false,
    controls: true,
    playbackRates: [0.5, 0.75, 1, 1.25, 1.5],
    preload: 'auto',
    poster: '',
    controlBar: {
      playToggle: true,
      pictureInPictureToggle: true,
      remainingTimeDisplay: true,
      progressControl: true,
      qualitySelector: true,
    },
  });

  const { t } = useI18n();

  const categories = [
    { label: t('all'), value: '' },
    { label: t('movie'), value: 'movie' },
    { label: t('personal'), value: 'personal' },
    { label: t('etc'), value: 'etc' },
  ];
  const searchCategory = ref('');

  const videoPlayer: any = ref(null);
  const currentMovie: any = ref(null);
  const movieList: any = ref([]);
  const searchText: Ref<string> = ref('');
  const lazyShow = ref(true);

  const router = useRouter();
  const appStatusStore = useAppStatusStore();

  function player() {
    return videoPlayer.value.player;
  }

  function onPlayerPlay(player: any) {
    // console.log("온플레이어플레이", player);
  }

  function onPlayerReady(player: any) {
    // console.log("온플레이어레디", player);
    player().play;
  }

  function playVideo(movieSrc: any, vttSrc: any) {
    const video = {
      withCredentials: true,
      type: 'application/x-mpegurl',
      src: movieSrc,
    };
    player().reset();
    player().addRemoteTextTrack(
      {
        kind: 'subtitles',
        language: 'ko',
        label: 'Korean',
        src: vttSrc,
        default: true,
        mode: 'showing',
      },
      true,
    );
    player().src(video);
    const tracks = player().remoteTextTracks();
    // console.log("날드!!!", tracks.length); // print out greater than 0
    player().play;
  }

  function loaded(data: any, event: any) {
    // console.log("로디드", data);
  }

  function searchVideo() {
    router
      .push({
        name: 'StreamingListPage',
        params: {
          searchText: searchText.value,
          searchCategory: searchCategory.value,
        },
      })
      .catch((err) => err);
  }

  async function onClickMovie(storageId: any) {
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
      if (res.data.data.vttSrc) {
        await StorageService.videoVtt(fileId).then((res: any) => {
          vttSrc = URL.createObjectURL(
            new Blob([res.data], { type: 'text/vtt;charset=utf-8;' }),
          );
        });
      }
      const videoSrc = `/api/storage${res.data.data.fileSrc}`;
      console.log('videoSrc', videoSrc);
      currentMovie.value = {
        ...res.data.data,
        fileSrc: videoSrc,
        vttSrc: vttSrc,
      };
      lazyShow.value = false; // 비디오 컴포넌트 먼저 만들고
      console.log('22222');
      // nextTick(() => {
      //   playVideo(videoSrc, vttSrc); // 컴포넌트 플레이하라고 보냄
      // });
      fetchVideoList();
      console.log('3333', currentMovie.value);
      appStatusStore.hideLoading();
    });
  }

  async function clickToDownload() {
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
  }

  function fetchVideoList() {
    return new Promise((resolve) => {
      const param: any = {
        limit: 4,
        offset: 0,
        sort: 'random',
      };
      StorageService.getVideoList(param)
        .then((response: any) => {
          if (response.status == 200) {
            movieList.value = response.data.list;
          } else {
            appStatusStore.hideLoading();
            appStatusStore.addToastMessage({
              type: 'error',
              message: response.data.data || response.data.message,
              buttonMsg: null,
              timeout: null,
              buttonCallback: null,
            });
          }
          resolve({ finish: true });
        })
        .catch((error) => {
          resolve({ finish: true });
        });
    });
  }

  onMounted(() => {
    lazyShow.value = true;
    appStatusStore.showLoading();
    // onChangeSize();
    fetchVideoList();
    appStatusStore.hideLoading();
    if (!currentMovie.value) {
      onClickMovie(Number(router.currentRoute.value.query.movieId));
    } else {
      lazyShow.value = false;
    }
    console.log('currentMovie', currentMovie);
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
