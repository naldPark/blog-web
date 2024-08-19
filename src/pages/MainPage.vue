<template>
  <div class="main-page">
    <NaldHeader />
    <div class="main-cover">
      <VRow class="pt-5 align-center">
        <div class="main-content" :class="{ 'is-mobile': isMobile }">
          <div>
            <VIcon class="text-primary pr-3">mdi-duck</VIcon>{{ $t('hello') }}
          </div>
          <p class="main-title">
            <b>{{ $t('nald') }}</b>
          </p>
          <span class="main-title-sub">
            인테리어 확장공사중 (소음심한날: 빨간날, 칼퇴한날)
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
  import { ref, onMounted, watch, Ref } from 'vue';
  import NaldHeader from '@/features/common/NaldHeader.vue';
  import { useUserStore } from '@/store/userStore';
  import { useAppCommonStore } from '@/store/appCommonStore';
  import { useDisplay } from 'vuetify';
  import { getBadgeList } from '@/api/commonService';
  import { getImageUrl } from '../utils/common';
  import { ApiResponse } from '@/types/axios.type';

  interface Badge {
    backgroundColor: string;
    color: string;
    name: string;
    src: string;
    seq: number;
  }

  const display = useDisplay();
  const appStatusStore = useAppCommonStore();
  const accountName: Ref<string | null> = ref(
    useUserStore().accountInfo.accountName,
  );
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
    if (isDeleting) {
      currentWord.value = current.substring(0, currentWord.value.length - 1);
    } else {
      currentWord.value = current.substring(0, currentWord.value.length + 1);
    }

    let speed = typingSpeed;
    if (isDeleting) {
      speed = deletingSpeed;
    }

    if (!isDeleting && currentWord.value === current) {
      speed = pauseDuration;
      isDeleting = true;
    } else if (isDeleting && currentWord.value === '') {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.value.length;
      speed = typingSpeed;
    }

    typeTimeout = window.setTimeout(typeEffect, speed);
  };

  onMounted(async () => {
    appStatusStore.showLoading();
    await getBadgeList().then((res: ApiResponse) => {
      badges.value = res.data;
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
