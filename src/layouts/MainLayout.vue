<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watchEffect } from 'vue';
import NaldHeader from '@/features/common/NaldHeader.vue';
import NaldFooter from '@/features/common/NaldFooter.vue';
import { useRoute } from 'vue-router';
const scrollY = ref<number>(0);
const route = useRoute();

/**  scrollWrap Element */
const scrollWrap = ref<HTMLElement | null>(null);

/** 스크롤 위치 업데이트 */
const handleScroll = (e: any) => {
  scrollY.value = e.target.scrollTop;
};

/** 스크롤 최상단 이동 */
const toTop = () => scrollWrap.value?.scrollTo({ top: 0, behavior: 'smooth' });

onMounted(() => {
  scrollWrap.value = document.querySelector('.scroll-wrap') as HTMLElement;
  scrollWrap.value?.addEventListener('scroll', handleScroll);
  toTop();
});

onUnmounted(() =>
  scrollWrap.value?.removeEventListener('scroll', handleScroll),
);

/* 라우터 변경 시 스크롤을 맨 위로 이동*/
watchEffect(() => {
  route.fullPath;
  toTop();
});
</script>

<template>
  <div class="main-wrap">
    <NaldHeader />
    <div class="main-layout">
      <div class="scroll-wrap">
        <div class="router-page">
          <RouterView />
          <Button
            v-if="scrollY > 100"
            class="fixed-button"
            icon="mdi-arrow-up"
            color="primary"
            @click="toTop()"
          />
        </div>
        <NaldFooter class="nald-footer" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@media only screen and (max-device-width: 640px) {
  .main-layout {
    height: calc(var(--vh, 1dvh) * 100) !important;
  }
}

.main-wrap {
  height: 100%;
  width: 100%;
  .main-layout {
    position: relative;
    margin: auto;
    height: 100dvh;
    width: 100%;
    background-color: #0e0e0e;
    .scroll-wrap {
      height: 100dvh;
      // padding-top: 48px;
      overflow-y: auto;
      .router-page {
        min-height: calc(100% - 100px);
        max-width: 1500px;
        margin: auto;
        margin-top: 50px;
        .fixed-button {
          position: fixed;
          z-index: 999;
          inset-block-end: 3%;
          inset-inline-end: 30px;
        }
      }
    }
  }
}
</style>
