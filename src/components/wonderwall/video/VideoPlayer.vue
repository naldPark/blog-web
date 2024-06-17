<template>
  <div>
    <div v-if="reseted">
      <video class="video-js vjs-default-skin vjs-big-play-centered" ref="videoObj" data-setup='{}'
        :crossOrigin="crossOrigin">
        <track v-for="(crtTrack, index) in trackList" :key="index" :kind="crtTrack.kind" :label="crtTrack.label"
          :src="crtTrack.src" :srcLang="crtTrack.srcLang" :default="crtTrack.default" />
      </video>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';

const props = defineProps({
  crossOrigin: {
    type: String,
    default: ''
  },
  playsinline: {
    type: Boolean,
    default: false
  },
  customEventName: {
    type: String,
    default: 'statechanged'
  },
  options: {
    type: Object,
    required: true
  },
  events: {
    type: Array<any>,
    default: () => []
  },
  globalOptions: {
    type: Object,
    default: () => ({
      autoplay: true,
      controls: true,
      language: 'ko',
      inactivityTimeout: 0,
      preload: 'auto',
      fluid: true,
      techOrder: ['html5'],
      plugins: {}
    })
  },
  globalEvents: {
    type: Array<any>,
    default: () => []
  },
  trackList: {
    type: Array<any>,
    default: () => []
  }
});
const emit = defineEmits(['ready', 'statechanged']);

let player = null as any; // Define player variable
const reseted = ref(true);
const videoObj = ref<any>(null); // Define ref for the video element
const initialize = () => {
  if (!videoObj.value) return; // Check if videoObj has a valid value

  const emitPlayerState = (event: any, value: any) => {
    if (event) {
      emit(event, player);
    }
    if (value) {
      emit('statechanged', { [event]: value });
    }
  };

  player = videojs(videoObj.value, { ...props.globalOptions, ...props.options }, function () {
    const DEFAULT_EVENTS = [
      'loadeddata',
      'canplay',
      'canplaythrough',
      'play',
      'pause',
      'waiting',
      'playing',
      'ended',
      'error'
    ];

    const events = DEFAULT_EVENTS.concat(props.events).concat(props.globalEvents);

    for (let i = 0; i < events.length; i++) {
      if (typeof events[i] === 'string') {
        player.on(events[i], () => {
          emitPlayerState(events[i], true);
        });
      }
    }

    emit('ready', player);
  });

  if (props.playsinline) {
    videoObj.value.setAttribute('playsinline', props.playsinline);
    videoObj.value.setAttribute('webkit-playsinline', props.playsinline);
    videoObj.value.setAttribute('x5-playsinline', props.playsinline);
    videoObj.value.setAttribute('x5-video-player-type', 'h5');
    videoObj.value.setAttribute('x5-video-player-fullscreen', false);
  }

  if (props.crossOrigin !== '') {
    videoObj.value.crossOrigin = props.crossOrigin;
    videoObj.value.setAttribute('crossOrigin', props.crossOrigin);
  }
};


const dispose = (callback?: any) => {
  if (player && player.dispose) {
    player.pause && player.pause();
    player.dispose();
    player = null;
    nextTick(() => {
      reseted.value = false;
      nextTick(() => {
        reseted.value = true;
        nextTick(() => {
          callback && callback();
        });
      });
    });
  }
};
watch(() => props.options, (options, oldOptions) => {
  dispose(() => {
    if (options && options.sources && options.sources.length) {
      initialize();
    }
  });
}, { deep: true });

onMounted(() => {
  if (!player) {
    initialize();
  }
});

onBeforeUnmount(() => {
  if (player) {
    dispose();
  }
});
</script>

<style scoped></style>
