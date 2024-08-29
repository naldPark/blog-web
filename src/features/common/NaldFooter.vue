<script lang="ts" setup>
import { computed } from 'vue';
import { useDisplay } from 'vuetify';

const { smAndDown: isMobile } = useDisplay();
const currentYear = computed(() => new Date().getFullYear());
</script>

<template>
  <div class="nald-footer">
    <VRow class="overline text-center justify-center" no-gutters>
      <VCol cols="12" sm="auto">
        <VCard class="pa-2 text-xs-right" flat v-if="!isMobile">
          COPYRIGHT BY {{ currentYear }} &nbsp;
        </VCard>
      </VCol>
      <VCol cols="12" sm="auto">
        <VCard flat :class="{ 'not-mobile': !isMobile }">
          &copy; nald &nbsp;
        </VCard>
      </VCol>
      <VCol cols="12" sm="auto" v-if="!isMobile">
        <VCard class="pa-2 text-xs-left" flat> ALL RIGHTS RESERVED </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss" scoped>
.nald-footer {
  bottom: 0;
  height: 50px;
  width: 100%;
  background-color: #212121;
  left: 0;
  right: 0;
  // position: absolute;
  align-items: center;
  display: flex;
  // flex: 1 1 auto;
  // padding: 8px 16px;
  // position: relative;
}
.not-mobile {
  padding: 8px;
  &:after {
    content: ' | ';
  }
}
</style>
