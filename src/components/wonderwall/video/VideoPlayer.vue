<template>
  <div>
    <video ref="videoPlayer" controls :poster="posterUrl">
      <source v-if="hlsSource" :src="hlsSource" type="application/x-mpegURL" />
    </video>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Hls from 'hls.js';

const hlsSource = '/api/storage/hls/KaeNon169530701398148/KaeNon169530701398148.m3u8';
const posterUrl = 'https://upload.nald.me/nald/pinocchio.png';

const videoPlayer = ref<HTMLVideoElement | null>(null);

onMounted(() => {
  if (videoPlayer.value) {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(hlsSource);
      hls.attachMedia(videoPlayer.value);
    } else if (videoPlayer.value.canPlayType('application/vnd.apple.mpegurl')) {
      videoPlayer.value.src = hlsSource;
    }

    videoPlayer.value.addEventListener('loadedmetadata', () => {
      const track: any = videoPlayer.value?.textTracks[0];
      track.mode = 'showing'; // 자막을 표시할 모드로 설정
    });
  }
});
</script>
