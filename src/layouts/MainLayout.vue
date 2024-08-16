<template>
  <div class="main-cover">
    <nald-header />
    <div ref="mainlayout" class="main-layout">
      <div class="router-page">
        <RouterView />
        <VBtn v-if="scrollY > 100" class="fixed-button" icon="mdi-arrow-up" color="primary" @click="goTo(0)" />
        <nald-footer class="footer"></nald-footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import NaldHeader from '@/features/common/NaldHeader.vue';
import NaldFooter from '@/features/common/NaldFooter.vue';
import { useDisplay, useGoTo } from 'vuetify';
const mainlayout = ref<any>(null);
const goTo = useGoTo();
const scrollY = ref(0);
onMounted(() => {
  goTo(0);
  window.addEventListener('scroll', handleScroll);
});

const handleScroll = () => {
  scrollY.value = window.scrollY;
};
</script>

<style lang="scss" scoped>
@media only screen and (max-device-width: 640px) {
  .mainlayout {
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
      min-height: 100%;
      padding-top: 48px; //header
      overflow-y: auto;
      padding-bottom: 53px; //footer
      max-width: 1500px;
      margin: auto;
    }

    .footer {
      bottom: 0;
      left: 0;
      right: 0;
      position: absolute;
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
