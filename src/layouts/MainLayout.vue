<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import NaldHeader from '@/features/common/NaldHeader.vue';
import NaldFooter from '@/features/common/NaldFooter.vue';
import { useGoTo } from 'vuetify';
const goTo = useGoTo();
const scrollY = ref<number>(0);

/** TODO: 스크롤고장남 */
const handleScroll = () => {
  scrollY.value = window.scrollY;
};

onMounted(() => {
  goTo(0);
  window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="main-cover">
    <NaldHeader />
    <div class="main-layout">
      <div class="router-page">
        <RouterView />
        <Button
          v-if="scrollY > 100"
          class="fixed-button"
          icon="mdi-arrow-up"
          color="primary"
          @click="goTo(0)"
        />
      </div>
      <NaldFooter class="nald-footer" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
@media only screen and (max-device-width: 640px) {
  .main-layout {
    height: calc(var(--vh, 1dvh) * 100) !important;
  }
}

.main-cover {
  height: 100%;
  width: 100%;
  min-height: 100vh;
  .main-layout {
    position: relative;
    margin: auto;
    height: 100vh;
    width: 100%;
    background-color: #0e0e0e;
    .router-page {
      height: calc(100vh - 50px); // 50px는 header의 높이
      padding-top: 48px;
      overflow-y: auto;
      > div {
        max-width: 1500px;
        margin: auto;
      }
    }
  }
}

.fixed-button {
  position: fixed;
  z-index: 999;
  inset-block-end: 3%;
  inset-inline-end: 30px;
}
</style>
