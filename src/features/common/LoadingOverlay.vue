<script lang="ts" setup>
import { useAppCommonStore } from '@/store';
import { storeToRefs } from 'pinia';

const appStatusStore = useAppCommonStore();
const { showBlocker } = storeToRefs(appStatusStore);
</script>

<template>
  <VOverlay
    :model-value="showBlocker"
    class="align-center justify-center"
    z-index="1000"
  >
    <VProgressCircular color="primary" indeterminate></VProgressCircular>
  </VOverlay>
</template>

<style lang="scss" scoped></style>
