<template>
  <div class="page" ref="page">
    <nald-header />
    <div ref="mainlayout" class="main-layout">
      <div class="sub-page" ref="subPage">
        <router-view class="main-router" :class="{ 'is-mobile': isMobile }" />
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
import { useRoute } from 'vue-router';
import { useDisplay, useGoTo } from 'vuetify';
const mainlayout = ref<any>(null);
const route = useRoute();
const goTo = useGoTo();
const display = useDisplay();
const isMobile: Ref<boolean> = display.smAndDown;
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

  .main-layout {
    position: relative;
    margin: auto;
    height: 100%;
    width: 100%;
    background-color: #0e0e0e;

    .sub-page {
      position: relative;
      min-height: 100%;
      overflow-y: auto;

      .main-router {
        max-width: 1500px;
        margin: auto;
        padding-bottom: 48px;
        margin-top: 30px;
        height: 100%;

        &.is-mobile {
          margin-top: 0px;
          padding-bottom: 32px;
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
