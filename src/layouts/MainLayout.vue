<template>
  <div class="main-cover">
    <NaldHeader />
    <div ref="mainlayout" class="main-layout">
      <div class="router-page">
        <RouterView />
        <VBtn
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

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import NaldHeader from '@/features/common/NaldHeader.vue';
import NaldFooter from '@/features/common/NaldFooter.vue';
import { useGoTo } from 'vuetify';
const mainlayout = ref<HTMLElement | null>(null);
const goTo = useGoTo();
const scrollY = ref<number>(0);
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

<style lang="scss" scoped>
@media only screen and (max-device-width: 640px) {
  .main-layout {
    height: calc(var(--vh, 1vh) * 100) !important;
  }
}

.main-cover {
  height: 100%;

  .main-layout {
    position: relative;
    margin: auto;
    height: 100%;
    width: 100%;
    background-color: #0e0e0e;

    .router-page {
      min-height: calc(100% - 50px);
      padding-top: 48px; //header
      overflow-y: auto;
      // padding-bottom: 53px; //footer
      max-width: 1500px;
      margin: auto;
    }

    // .nald-footer {
    //   bottom: 0;
    //   left: 0;
    //   right: 0;
    //   // position: absolute;
    //   align-items: center;
    //   display: flex;
    //   // flex: 1 1 auto;
    //   // padding: 8px 16px;
    //   position: relative;
    //   // transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    //   // transition-property: height, width, transform, max-width, left, right, top,
    //   //   bottom;
    // }
  }
}

.fixed-button {
  position: fixed;
  z-index: 999;
  inset-block-end: 3%;
  inset-inline-end: 30px;
}
</style>
