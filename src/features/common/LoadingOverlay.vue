<template>
  <VOverlay
    :model-value="showBlocker"
    class="align-center justify-center"
    z-index="1000"
  >
    <VProgressCircular color="primary" indeterminate></VProgressCircular>
  </VOverlay>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useAppCommonStore } from '@/store';
import { storeToRefs } from 'pinia';

const appStatusStore = useAppCommonStore();
const { showBlocker } = storeToRefs(appStatusStore);
</script>

<style lang="scss" scoped>
/* Add any specific styles for the loading overlay here */
</style>
