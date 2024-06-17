<template>
  <div class="movie-scoll">
    <div class="arrow-left">
      <v-btn variant="plain" color="primary" @click="onClickMove('left')">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </div>
    <ul class="movie-items" :id="`movie-items-${category}`" :class="{ 'scroll-smooth': !isDraggingMode }">
      <li class="movie-item" @click="onClickMovie(item)" v-for="item in cardList" :key="item.fileId"
        :class="{ 'disabled': !item.fileSrc }" :style="{
          'background-image': `url('${item.fileCover}')`
        }">
        <div class="movie-content" v-if="!item.fileSrc">
          <v-chip class="mb-2 mr-2" color="rgb(30, 30, 30)" :disabled="true">
            not converted yet
            <v-icon right>mdi-upload-off</v-icon>
          </v-chip>
        </div>
        <div class="movie-content movie-desc" v-else>{{ item.fileDesc }}</div>
        <div class="movie-title" v-if="item.fileName">
          <v-icon small class="text-secondary mr-1">mdi-play</v-icon>{{ item.fileName }}
        </div>
      </li>
    </ul>
    <div class="arrow-right">
      <v-btn variant="plain" color="primary" @click="onClickMove('right')">
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  category: string;
  cardList: Array<any>;
}>();
const emits = defineEmits(['onClickMovie']);
let isMouseDown = ref(false);
let scrollLeft = ref(0);
let isDraggingMode = ref(false);

const onClickMove = (direction: 'left' | 'right') => {
  const slider = document.getElementById(`movie-items-${props.category}`);
  if (!slider) return;

  if (direction === 'left') {
    slider.scrollLeft -= 270;
  } else {
    slider.scrollLeft += 270;
  }
};

const onClickMovie = (item: any) => {
  if (!isDraggingMode.value) {
    emits('onClickMovie', item);
  }
};


onMounted(() => {

  let startX: any;

  const start = (e: MouseEvent | TouchEvent) => {
    console.log('start')
    isMouseDown.value = true;
    const slider = document.getElementById(`movie-items-${props.category}`);
    if (!slider) return;
    slider.classList.add('active');
    startX = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX - slider.clientLeft;
    scrollLeft.value = slider.scrollLeft;
  };

  const move = (e: MouseEvent | TouchEvent) => {
    if (!isMouseDown.value) return;
    const slider = document.getElementById(`movie-items-${props.category}`);
    if (!slider) return;
    e.preventDefault();
    const x = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX - slider.clientLeft;
    const dist = (x - startX);
    slider.scrollLeft = scrollLeft.value - dist;
  };

  const end = () => {
    isMouseDown.value = false;
    const slider = document.getElementById(`movie-items-${props.category}`);
    if (!slider) return;
    slider.classList.remove('active');
  };

  const doingDragging = (isDragging: boolean) => {
    if (isDragging === false) {
      setTimeout(() => {
        isDraggingMode.value = isDragging;
      }, 200);
    } else {
      isDraggingMode.value = isDragging;
    }
  };

  // Event listeners setup
  const slider = document.getElementById(`movie-items-${props.category}`);
  if (slider) {
    slider.addEventListener("mousedown", (e) => {
      isMouseDown.value = true;
      start(e);
    });
    slider.addEventListener('touchstart', start, { passive: true });
    slider.addEventListener('touchmove', move, { passive: true });

    slider.addEventListener("mousemove", (e) => {
      if (isMouseDown.value) {
        doingDragging(true);
      } else {
        doingDragging(false);
      }
      move(e);
    });
    slider.addEventListener('mouseleave', end);
    slider.addEventListener('touchend', end);
    slider.addEventListener("mouseup", () => {
      isMouseDown.value = false;
      doingDragging(false);
      end();
    });
  }
});


</script>

<style scoped lang="scss">
.movie-scoll {
  overflow: auto;
  padding: 1rem;
  scroll-timeline-name: --scroller;
  scroll-timeline-axis: inline;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  .arrow-left,
  .arrow-right {
    button {
      width: 50px;
      background-color: transparent !important;
      min-width: 0px !important;
      font-size: 50px !important;
      padding: 0px 0px !important;
    }
  }

  .movie-items {
    display: flex;
    gap: 1rem;
    list-style: none;
    padding-left: 0;
    counter-reset: list-item;
    perspective: 9000px;
    transform-style: preserve-3d;
    perspective-origin: 50% 50%;
    position: relative;
    overflow: hidden;
    cursor: pointer;


    &.scroll-smooth {
      scroll-behavior: smooth;
    }

    .movie-item {
      border-radius: 20px;
      background-size: cover;
      background-position: center;
      flex: 1 1 240px;
      min-width: 200px;
      width: 200px;
      min-height: 300px;
      height: 300px;
      padding: 1rem;
      animation: auto ease-in-out intro forwards, auto ease-in-out outro forwards;
      animation-timeline: view(inline);
      animation-range: entry, exit;
      transform-origin: bottom center;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
      font-weight: 300;

      &.disabled {
        cursor: default !important;
        background-color: black;
      }

      .movie-title {
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        display: -webkit-box;
        bottom: 5%;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        font-size: 1.2rem;
        color: rgb(210, 210, 210);

      }

      .movie-content {
        width: 100%;
        height: 200px;
        max-height: 200px;
        color: rgb(210, 210, 210);
        line-height: 1.7;
        font-size: 11pt;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 8;
        -webkit-box-orient: vertical;
        word-break: break-all;
        margin-bottom: 10px;

        &.movie-desc {
          visibility: hidden;
        }

        .movie-item-loading {
          align-items: center;
          height: 100%;
          display: flex;
          justify-content: center;
        }
      }

      &::after {
        content: "";
        position: absolute;
        inset: -20px;
        background-size: cover;
        transform: scale(1);
        transition: transform 0.5s ease-out, opacity 0.4s linear;
        opacity: 0;
        z-index: -1;
      }

      &:hover:not(.disabled) {
        .movie-desc {
          visibility: visible !important;
        }

        .movie-title {
          color: #FFB800;
        }

        &::after {
          transform: scale(1.1) rotate(4deg);
          opacity: 1;
        }
      }
    }
  }
}

@keyframes intro {
  from {
    transform-origin: center left;
    opacity: 0;
    scale: 0;
  }

  to {
    transform-origin: center left;
    opacity: 1;
    scale: 1;
  }
}

@keyframes outro {
  from {
    transform-origin: center right;
    opacity: 1;
    scale: 1;
  }

  to {
    transform-origin: center right;
    opacity: 0;
    scale: 0;
  }
}
</style>
