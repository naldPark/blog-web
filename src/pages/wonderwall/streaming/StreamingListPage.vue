<script setup lang="ts">
import Button from '@/components/common/Button.vue';
import { Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import SelectBox from '@/components/common/SelectBox.vue';
import VideoUploadDialog from '@/features/dialog/VideoUploadDialog.vue';
import storageService from '@/api/storageService';
import { useI18n } from 'vue-i18n';
import VideoSlider from '@/features/wonderwall/video/VideoSlider.vue';
import InputText from '@/components/common/InputText.vue';
import { shuffleArray } from '@/utils/commonUtil';
import { VideoDetailData } from '@/types/wonderwall/video';
import { ApiResponse } from '@/types/axios';
import { streamimgCategories } from '@/assets/data/streaming';
import useCustomQuery from '@/hook/useCustomQuery';
import { COMMON_QUERY_KEY } from '@/types/queryEnum';

const { t } = useI18n();
const router = useRouter();

const movieList = ref<VideoDetailData[]>([]);
const searchText = ref<string>('');
const searchCategory = ref<string>('');
const showUploadDialog = ref<boolean>(false);

const updateShowUploadDialog = (newValue: boolean) => {
  showUploadDialog.value = newValue;
};

/** VideoList Query */
const { hardFetch: videoRefetch } = useCustomQuery({
  queryKey: [COMMON_QUERY_KEY.VIDEO_LIST],
  queryFn: () =>
    storageService.getVideoList({
      type: searchCategory.value,
      searchText: searchText.value,
    }),
  onSuccess: (res: ApiResponse) => {
    movieList.value = res.data.list;
  },
});

const playAny = () => {
  const filteredList = movieList.value.filter(
    (f: VideoDetailData) => f.fileSrc,
  );
  if (filteredList.length) {
    router.push({
      name: 'StreamingPage',
      query: { movieId: shuffleArray(filteredList)[0].storageId },
    });
  }
};

const onClickMovie = (item: VideoDetailData) => {
  if (item.fileSrc) {
    router.push({
      name: 'StreamingPage',
      query: { movieId: item.storageId },
    });
  }
};
</script>

<template>
  <VContainer>
    <div class="movie-poster">
      <div class="movie-poster-blur">
        <div class="movie-poster-box">
          <h3>
            <VIcon class="text-primary" icon="mdi-duck" />
            <span>NAL TV</span>
          </h3>
          <h2 class="text-md-h2 mb-5">WATCH ANYWHERE</h2>
          <h4 class="text-grey">{{ t('video.videoPageSubTitle') }}</h4>
          <div class="mt-10 movie-btn-area">
            <Button
              color="btnPrimary"
              class="mb-3"
              dark
              prepend-icon="mdi-play-circle-outline"
              variant="flat"
              :rounded="false"
              @click="playAny()"
              :label="t('video.playAny')"
            />
            <Button
              color="background"
              dark
              prepend-icon="mdi-cloud-upload-outline"
              variant="flat"
              :rounded="false"
              @click="updateShowUploadDialog(true)"
              :label="t('video.uploadVideo')"
            />
          </div>
        </div>
      </div>
    </div>
    <VCard class="mx-auto pa-5" color="#121212">
      <VRow class="align-center">
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
            @change="videoRefetch"
          />
        </VCol>
        <VCol class="d-flex pa-1" cols="12" sm="8">
          <InputText
            class="input-custom"
            solo
            :label="t('searchPlaceHolder')"
            append-icon="mdi-magnify"
            v-model="searchText"
            @keyup.enter="videoRefetch"
            @click:append="videoRefetch"
          />
        </VCol>
      </VRow>
    </VCard>
    <template v-for="(category, index) in streamimgCategories" :key="index">
      <VDivider class="mb-10 mt-10" />
      <h2 class="text-primary mb-3">{{ category.label }}</h2>
      <VideoSlider
        :category="category.value"
        :videoList="
          movieList.filter(
            (f: VideoDetailData) => f.fileType === category.value,
          )
        "
        @onClickMovie="onClickMovie"
      />
    </template>
    <VideoUploadDialog
      v-if="showUploadDialog"
      :isMultiple="true"
      v-model:showDialog="showUploadDialog"
      @fetchVideoList="videoRefetch"
    />
  </VContainer>
</template>

<style lang="scss" scoped>
@keyframes movieSilde {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 500px 0;
  }
}

.movie-poster {
  height: 500px;
  background:
    linear-gradient(140deg, rgba(10, 10, 10, 0.8), rgba(26, 22, 22, 0.8)),
    url('../../../assets/images/moviePoster.jpg') center/cover repeat;
  animation: movieSilde 50s alternate infinite;

  .movie-poster-blur {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
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
