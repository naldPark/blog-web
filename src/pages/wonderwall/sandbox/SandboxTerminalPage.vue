<script lang="ts" setup>
import TerminalItem from '@/features/terminal/TerminalItem.vue';

const teminalIcons = ['mdi-minus', 'mdi-checkbox-blank-outline', 'mdi-close'];
</script>

<template>
  <div class="sandbox-terminal-wrapper">
    <div class="container">
      <div class="menubar">
        <div
          style="background-color: #0e0e0e"
          class="d-flex justify-space-between pa-3"
        >
          <VIcon icon="mdi-console" />
          <span>Terminal</span>
          <VSpacer />
          <!-- <VIcon v-for="icon in teminalIcons" :key="icon" :icon="icon" /> -->
        </div>
        <TerminalItem />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sandbox-terminal-wrapper {
  height: 100%;
}
</style>
