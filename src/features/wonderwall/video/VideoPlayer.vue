<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { useI18n } from 'vue-i18n';
import { useAppCommonStore } from '@/store/appCommonStore';

type VideoJsPlayer = ReturnType<typeof videojs>;
const videoPlayer = ref<VideoJsPlayer | null>(null);
const { hlsSource, vttSrc } = defineProps<{
  hlsSource: string;
  vttSrc?: string;
}>();
const { t } = useI18n();
const { showToast } = useAppCommonStore();
const errorMessage = ref<string | null>(null);

onMounted(() => {
  const videoElement = document.querySelector('.video-js') as HTMLVideoElement;
  if (videoElement) {
    videoPlayer.value = videojs(videoElement, {
      autoplay: true,
      controls: true,
      language: 'ko',
      inactivityTimeout: 0,
      preload: 'auto',
      playbackRates: [0.5, 0.75, 1, 1.25, 1.5],
      poster: '',
      fluid: true,
      techOrder: ['html5'],
      html5: {
        hls: {
          overrideNative: true,
        },
      },
      controlBar: {
        playToggle: true,
        pictureInPictureToggle: true,
        remainingTimeDisplay: true,
        progressControl: true,
        qualitySelector: true,
      },
    });
    handleVideoPlayError();
    if (vttSrc) {
      videoPlayer.value.addRemoteTextTrack({
        kind: 'subtitles',
        src: vttSrc,
        srclang: 'ko',
        label: 'Korean',
        default: true,
      });
    }
  }
});

const handleVideoPlayError = () => {
  videoPlayer.value?.on('error', (e: any) => {
    const error = videoPlayer.value?.error();
    errorMessage.value = t('video.playError');
    const errorDisplay = document.querySelector('.vjs-error-display');
    const bigPlayButton = document.querySelector('.vjs-big-play-button');
    if (errorDisplay)
      errorDisplay.setAttribute('style', 'display: none !important;');
    if (bigPlayButton)
      bigPlayButton.setAttribute('style', 'display: none !important;');
    if (error)
      showToast({
        type: 'error',
        message: t('video.playError'),
      });
  });
};

onUnmounted(() => {
  if (videoPlayer.value) videoPlayer.value.dispose();
});
</script>

<template>
  <div class="video-container">
    <video
      ref="videoPlayer"
      class="video-js vjs-default-skin vjs-big-play-centered"
      data-setup="{}"
      crossorigin="anonymous"
    >
      <track
        v-if="vttSrc"
        :src="vttSrc"
        kind="subtitles"
        srclang="ko"
        label="Korean"
        default
      />
      <source :src="hlsSource" type="application/x-mpegURL" />
    </video>
    <div v-if="errorMessage" class="custom-error-message">
      <VIcon icon="mdi-alert-outline" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.video-container {
  position: relative;
}

.custom-error-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--error);
  font-size: 3.5em;
}

.vjs-error .vjs-big-play-button {
  display: none !important;
}
</style>
