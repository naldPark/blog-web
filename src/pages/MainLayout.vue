<template>
  <div class="page" ref="page">
    <nald-header class="nald-header"></nald-header>
    <div ref="mainlayout" class="mainlayout">
      <div class="subPage" ref="subPage">
        <router-view class="mainRouter" :class="{ notMobile: !smAndDown }" />
        <v-btn class="fixed-button" icon="mdi-arrow-up" color="primary" @click="goTo(0)" />
        <nald-footer class="footer" :isMobile="smAndDown"></nald-footer>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import NaldHeader from '@/components/common/NaldHeader.vue';
import NaldFooter from '@/components/common/NaldFooter.vue';
import { isMobile as isMobileFunction } from '@/utils/common';
import { useRoute } from 'vue-router';
import { useDisplay, useGoTo } from 'vuetify';
const mainlayout = ref<any>(null);
const route = useRoute();
const goTo = useGoTo();
const isMobile = ref(isMobileFunction());
const { smAndDown } = ref(useDisplay()).value;

const showScrollTopBtn = ref(false);

watch(() => route.path, () => {
  toScrollTop();
});
onMounted(() => {
  goTo(0);
});

watch(
  () => mainlayout.value?.scrollTop || 0,
  (top) => {
    showScrollTopBtn.value = top > 20;
  },
  { immediate: true }
);


function toScrollTop() {
  if (mainlayout.value) {
    mainlayout.value.scrollTop = 0;
  }
}

</script>

<style lang="scss" scoped>
@media only screen and (max-device-width: 640px) {
  .mainlayout {
    height: calc(var(--vh, 1vh) * 100) !important;
  }
}

.page {
  height: 100%;

  .nald-header {
    z-index: 1000;
  }

  .mainlayout {
    position: relative;
    margin: auto;
    height: 100%;
    width: 100%;
    background-color: #0e0e0e;

    .subPage {
      position: relative;
      min-height: 100%;
      overflow-y: auto;
      margin-top: 48px;

      .mainRouter {
        max-width: 1500px;
        margin: auto;
        padding-bottom: 32px;

        &.notMobile {
          //상우하좌
          padding-bottom: 48px;
          margin-top: 30px;
        }
      }
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
