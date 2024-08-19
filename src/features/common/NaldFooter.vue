<template>
  <VFooter padless absolute dark color="grey-darken-4">
    <VRow class="overline text-center justify-center" no-gutters>
      <VCol cols="12" sm="auto">
        <VCard class="pa-2 text-xs-right" flat v-if="!isMobile">
          COPYRIGHT BY {{ currentYear }} &nbsp;
        </VCard>
      </VCol>
      <VCol cols="12" sm="auto">
        <VCard
          class="text-xs"
          flat
          :class="{ 'not-mobile': !isMobile, 'pa-2': !isMobile }"
        >
          &copy; nald &nbsp;
        </VCard>
      </VCol>
      <VCol cols="12" sm="auto" v-if="!isMobile">
        <VCard class="pa-2 text-xs-left" flat> ALL RIGHTS RESERVED </VCard>
      </VCol>
    </VRow>
  </VFooter>
</template>

<script lang="ts" setup>
  import { computed, Ref, ref } from 'vue';
  import { useDisplay } from 'vuetify';

  const display = useDisplay();
  const isMobile: Ref<boolean> = display.smAndDown;
  const currentYear = computed(() => new Date().getFullYear());
</script>

<style lang="scss" scoped>
  .not-mobile:after {
    content: ' | ';
  }
</style>
