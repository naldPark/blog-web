<template>
  <div class="d-flex justify-end px-6 py-3">
    <div class="arrow-left">
      <VBtn block variant="plain" color="primary" @click="onClickMove('left')">
        <VIcon>mdi-chevron-left</VIcon>
      </VBtn>
    </div>
    <div class="arrow-right">
      <VBtn block variant="plain" color="primary" @click="onClickMove('right')">
        <VIcon>mdi-chevron-right</VIcon>
      </VBtn>
    </div>
  </div>

  <div class="movie-scoll">
    <ul
      class="movie-items"
      :id="`movie-items-${category}`"
      :class="{ 'scroll-smooth': !isDraggingMode }"
    >
      <li
        class="movie-item"
        @click="onClickMovie(item)"
        v-for="item in videoList"
        :key="item.storageId"
        :class="{ disabled: !item.fileSrc, 'is-mobile': isMobile }"
        :style="{ 'background-image': `url('${item.fileCover}')` }"
      >
        <div class="movie-content" v-if="!item.fileSrc">
          <VChip class="mb-2 mr-2" color="lightgrey">
            not converted yet
            <VIcon>mdi-upload-off</VIcon>
          </VChip>
        </div>
        <div class="movie-content movie-desc" v-else>{{ item.fileDesc }}</div>
        <div class="movie-title" v-if="item.fileName">
          <VIcon small class="text-secondary mr-1">mdi-play</VIcon
          >{{ item.fileName }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue';
import { useDisplay } from 'vuetify';
import { VideoDetailData } from '@/types/wonderwall/video';

const props = defineProps<{
  category: string;
  videoList: Array<VideoDetailData>;
}>();
const emits = defineEmits(['onClickMovie']);
const isMouseDown = ref(false);
const scrollLeft = ref(0);
const isDraggingMode = ref(false);
const { smAndDown: isMobile } = useDisplay();

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
    console.log('start');
    isMouseDown.value = true;
    const slider = document.getElementById(`movie-items-${props.category}`);
    if (!slider) return;
    slider.classList.add('active');
    startX =
      e instanceof MouseEvent
        ? e.pageX
        : e.touches[0].pageX - slider.clientLeft;
    scrollLeft.value = slider.scrollLeft;
  };

  const move = (e: MouseEvent | TouchEvent) => {
    if (!isMouseDown.value) return;
    const slider = document.getElementById(`movie-items-${props.category}`);
    if (!slider) return;
    e.preventDefault();
    const x =
      e instanceof MouseEvent
        ? e.pageX
        : e.touches[0].pageX - slider.clientLeft;
    const dist = x - startX;
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
    slider.addEventListener('mousedown', (e) => {
      isMouseDown.value = true;
      start(e);
    });
    slider.addEventListener('touchstart', start, { passive: true });
    slider.addEventListener('touchmove', move, { passive: true });

    slider.addEventListener('mousemove', (e) => {
      if (isMouseDown.value) {
        doingDragging(true);
      } else {
        doingDragging(false);
      }
      move(e);
    });
    slider.addEventListener('mouseleave', end);
    slider.addEventListener('touchend', end);
    slider.addEventListener('mouseup', () => {
      isMouseDown.value = false;
      doingDragging(false);
      end();
    });
  }
});
</script>
<style scoped lang="scss">
.arrow-left,
.arrow-right {
  button {
    // width: 50px;
    // background-color: transparent !important;
    // min-width: 0 !important;
    font-size: 40px !important;
    padding: 0 !important;
  }
}

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
      flex: 1;
      min-width: 200px;
      height: 300px;
      padding: 1rem;
      animation:
        auto ease-in-out intro forwards,
        auto ease-in-out outro forwards;
      animation-timeline: view(inline);
      animation-range: entry, exit;
      transform-origin: bottom center;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
      font-weight: 300;

      &.is-mobile {
        min-width: 100px;
        height: 150px;
      }

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
        content: '';
        position: absolute;
        inset: -20px;
        background-size: cover;
        transform: scale(1);
        transition:
          transform 0.5s ease-out,
          opacity 0.4s linear;
        opacity: 0;
        z-index: -1;
      }

      &:hover:not(.disabled) {
        .movie-desc {
          visibility: visible !important;
        }

        .movie-title {
          color: #ffb800;
        }

        &::after {
          transform: scale(1.1) rotate(4deg);
          opacity: 1;
        }
      }
    }
  }
}
</style>
