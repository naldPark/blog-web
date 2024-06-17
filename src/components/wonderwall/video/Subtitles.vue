<template>
  <div>
    <track :src="subtitlesUrl" kind="subtitles" srclang="en" label="English" default />
  </div>
</template>

<script lang="ts" setup>
const subtitlesUrl = 'https://brenopolanski.github.io/html5-video-webvtt-example/MIB2-subtitles-pt-BR.vtt';
</script>