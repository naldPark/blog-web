<template>
  <div class="page" ref="page">
    <nald-header class="nald-header"></nald-header>
    <div ref="mainlayout" class="mainlayout" @scroll="onScroll">
      <div class="subPage" ref="subPage">
        <transition name="fade">
          <router-view name="main" class="mainRouter" :class="{ notMobile: !isMobile }"></router-view>
        </transition>
        <nald-footer class="footer" :isMobile="isMobile"></nald-footer>
        <v-btn v-show="showScrollTopBtn" fab dark fixed bottom small right color="primary" @click="toScrollTop">
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import NaldHeader from '@/components/common/NaldHeader.vue';
import NaldFooter from '@/components/common/NaldFooter.vue';
import { isMobile as isMobileFunction } from '@/utils/common';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'MainLayout',
  components: { NaldHeader, NaldFooter },
  setup() {
    const mainlayout = ref<any>(null);
    const route = useRoute();
    const isMobile = ref(isMobileFunction());
    const showScrollTopBtn = ref(false);

    watch(() => route.path, () => {
      toScrollTop();
    });

    watch(
      () => mainlayout.value?.scrollTop || 0,
      (top) => {
        showScrollTopBtn.value = top > 20;
      },
      { immediate: true }
    );

    function onScroll() {
      const top = mainlayout.value?.scrollTop || 0;
      showScrollTopBtn.value = top > 20;
    }

    function toScrollTop() {
      if (mainlayout.value) {
        mainlayout.value.scrollTop = 0;
      }
    }

    return {
      mainlayout,
      isMobile,
      showScrollTopBtn,
      onScroll,
      toScrollTop,
    };
  },
});
</script>

<style lang="scss" scoped>
@media only screen and (max-device-width: 640px) {
  .mainlayout {
    height: calc(var(--vh, 1vh) * 100) !important;
  }
}

.page {
  .nald-header {
    z-index: 1000;
  }

  .mainlayout {
    position: relative;
    margin: auto;
    height: 100%;
    width: 100%;
    background-color: #0e0e0e;
    overflow-y: auto !important;

    .subPage {
      position: relative;
      overflow: hidden;
      overflow-y: auto;
      min-height: 100%;
      padding-top: 50px;

      .fade-enter-active,
      .fade-leave-active {
        transition-property: opacity;
        transition-duration: .35s;
      }

      .fade-enter-active {
        transition-delay: .35s;
      }

      .fade-enter,
      .fade-leave-active {
        opacity: 0;
      }

      .mainRouter {
        max-height: calc(100% - 32px);
        max-width: 1500px;
        margin: auto;
        padding: 0px 0px 32px 0px;

        &.notMobile {
          padding: 0px 30px 48px 30px;
          margin-top: 0px;
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
</style>
