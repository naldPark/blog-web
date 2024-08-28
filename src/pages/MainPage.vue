<template>
  <div class="main-page">
    <NaldHeader />

    <div class="main-cover">
      <VRow class="pt-5 align-center">
        <div class="main-content" :class="{ 'is-mobile': isMobile }">
          <div>
            <VIcon class="text-primary pr-3">mdi-duck</VIcon
            >{{ $t('mainTitle') }}
          </div>
          <p class="main-title">
            <b>{{ $t('mainSubTitle') }}</b>
          </p>
          <span class="main-title-sub">
            {{ $t('mainDescription') }}
            <v-btn @click="onTest()">Open Dialog</v-btn>
            <Dialog
              v-model:visible="showDialog"
              title="Dialog Header"
              @confirm="handleConfirm"
              @click:outside="handleClickOutside"
            >
              <template #header>
                <p>난헤더다</p>
              </template>
              <InputText class="mb-2" type="password" required flat />
              <template #footer>
                <p>Here's some contact info</p>
              </template>
            </Dialog>
          </span>
          <p class="typing text-right">
            . . of
            <span class="txt-type">{{ currentWord }}</span>
          </p>
          <VRow class="badges-image-wrapper mt-3" style="max-width: 600px">
            <VChip
              v-for="(item, index) in badges"
              :key="index"
              size="small"
              class="ma-1"
              :color="item.backgroundColor"
              variant="flat"
              :style="`color: ${item.color}`"
            >
              <div class="text-center d-flex align-center justify-space-around">
                <img
                  style="width: 17px; height: 17px"
                  :src="getImageUrl('/assets/svgs', item.src)"
                  alt="Badge icon"
                />
                <span class="pl-1" v-if="appSize !== 'xs'">{{
                  item.name
                }}</span>
                <VTooltip activator="parent" location="bottom">{{
                  item.name
                }}</VTooltip>
              </div>
            </VChip>
          </VRow>
          <div class="py-4"></div>
        </div>
      </VRow>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, Ref, watchEffect } from 'vue';
import NaldHeader from '@/features/common/NaldHeader.vue';
import { useAppCommonStore } from '@/store/appCommonStore';
import { useDisplay } from 'vuetify';
import { getBadgeList } from '@/api/commonService';
import { getImageUrl } from '../utils/commonUtil';
import { ApiResponse, ApiResult } from '@/types/axios';
import Dialog from '@/components/common/Dialog.vue';
import { useEffect } from '@/hook/useEffect';

interface Badge {
  backgroundColor: string;
  color: string;
  name: string;
  src: string;
  seq: number;
}

const display = useDisplay();
const appStatusStore = useAppCommonStore();
const isMobile: Ref<boolean> = display.smAndDown;
const appSize: Ref<string> = display.name;
const badges = ref<Badge[]>([]);
const words = ref<string[]>(['Odds and end.', 'Programming.', 'Operation.']);
const currentWord = ref('');
const typingSpeed = 150;
const deletingSpeed = 75;
const pauseDuration = 3000;

let wordIndex = 0;
let isDeleting = false;
let typeTimeout: number;

const typeEffect = () => {
  const current = words.value[wordIndex];
  const speed = isDeleting ? deletingSpeed : typingSpeed;

  /** 삭제중일때는 -, 추가중일때는 + 처리 */
  currentWord.value = isDeleting
    ? current.slice(0, currentWord.value.length - 1)
    : current.slice(0, currentWord.value.length + 1);

  /**상태를 업데이트 & 타이밍 설정 */
  if (!isDeleting && currentWord.value === current) {
    typeTimeout = window.setTimeout(typeEffect, pauseDuration);
    isDeleting = true;
  } else if (isDeleting && currentWord.value === '') {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.value.length;
    typeTimeout = window.setTimeout(typeEffect, typingSpeed);
  } else {
    typeTimeout = window.setTimeout(typeEffect, speed);
  }
};

// Dialog의 표시 상태를 관리하기 위한 ref
const showDialog = ref(false);

// Confirm 버튼 클릭 처리 함수
const handleConfirm = () => {
  console.log('Confirm button clicked');
  showDialog.value = false; // 다이얼로그 닫기
};

// 다이얼로그 외부 클릭 처리 함수
const handleClickOutside = () => {
  console.log('Clicked outside the dialog');
};

watch(showDialog, (current, previous) => {
  console.log('[count] watch => ', current, previous);
});

useEffect(() => {
  console.log('showdialog', showDialog.value);
}, [showDialog]);

const onTest = () => {
  showDialog.value = !showDialog.value;
};

onMounted(async () => {
  appStatusStore.showLoading();

  await getBadgeList().then((res: ApiResult) => {
    const response = res as ApiResponse;
    badges.value = response.data;
    appStatusStore.hideLoading();
  });
  typeEffect();
});

watch(words, () => {
  currentWord.value = '';
  typeEffect();
});
</script>

<style lang="scss" scoped>
html {
  overflow-y: hidden;

  .main-page {
    height: 100dvh;

    .main-cover {
      height: 100dvh;
      background:
        linear-gradient(to top, rgba(20, 20, 20, 0.8), rgb(0, 0, 0)),
        url('./../assets/images/network.gif') no-repeat;
      background-position: 60% center;
      /* GIF를 컨테이너 중간에서 오른쪽으로 배치 */
      overflow: hidden;
      display: flex;
      background-color: black;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      padding: 0 3rem;
      font-family: var(--font-Raleway) !important;
      background-position: 70% 50%;

      .main-content {
        margin-left: 10%;
        font-size: 2rem;

        .main-title {
          font-size: 3rem;
          color: #ccc;
        }

        .main-title-sub {
          margin-bottom: 0px;
          font-size: 1.2rem;
          color: #ccc;
        }

        .typing {
          font-weight: 100;
          font-size: 1.5rem;
          color: #ccc;
          .txt-type {
            display: inline-block;
            border-right: 0.2rem solid #ffb800;
            white-space: nowrap;
            overflow: hidden;
            animation: blink 0.75s step-end infinite;
            line-height: 1; /* Ensure the line-height matches the font size */
          }
        }

        button {
          width: 170px;
        }

        &.is-mobile {
          margin-left: 0;

          button {
            width: 100px;
          }

          .main-title {
            font-size: 2rem;
          }
        }
      }
    }
  }
}

@keyframes blink {
  0% {
    border-color: transparent;
  }
  100% {
    border-color: #ffb800;
  }
}
</style>
