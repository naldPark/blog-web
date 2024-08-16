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
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import videojs from 'video.js';
  import 'video.js/dist/video-js.css';

  // 비디오 플레이어 타입 정의
  type VideoJsPlayer = ReturnType<typeof videojs>;

  const videoPlayer = ref<VideoJsPlayer | null>(null);

  const { hlsSource, vttSrc } = defineProps<{
    hlsSource: string;
    vttSrc?: string;
  }>();

  onMounted(() => {
    const videoElement = document.querySelector(
      '.video-js',
    ) as HTMLVideoElement;
    if (videoElement) {
      const playerOptions = {
        autoplay: true,
        controls: true,
        language: 'ko',
        inactivityTimeout: 0,
        preload: 'auto',
        playbackRates: [0.5, 0.75, 1, 1.25, 1.5],
        poster: '',
        fluid: true,
        techOrder: ['html5'],
        plugins: {},
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
      };

      videoElement.setAttribute('playsinline', 'true');
      videoElement.setAttribute('webkit-playsinline', 'true');
      videoElement.setAttribute('x5-playsinline', 'true');
      videoElement.setAttribute('x5-video-player-type', 'h5');
      videoElement.setAttribute('x5-video-player-fullscreen', 'false');
      videoPlayer.value = videojs(videoElement, { playerOptions });
    }
  });

  onUnmounted(() => {
    if (videoPlayer.value) {
      videoPlayer.value.dispose();
    }
  });
</script>

<style scoped></style>
