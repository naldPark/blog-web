<template>
  <div>
    <video ref="videoPlayer" controls :poster="posterUrl">
      <source type="application/x-mpegURL" />
    </video>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Hls from 'hls.js';
const videoPlayer = ref<HTMLVideoElement | null>(null);

const { hlsSource, posterUrl } = defineProps<{
  hlsSource: string;
  posterUrl: string;
}>();

onMounted(() => {
  console.log('videoPlayer.value', videoPlayer.value)
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
