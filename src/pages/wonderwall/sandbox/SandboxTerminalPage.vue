<script lang="ts" setup>
import TerminalItem from '@/features/terminal/TerminalItem.vue';

const teminalIcons = ['mdi-minus', 'mdi-checkbox-blank-outline', 'mdi-close'];
</script>

<template>
  <div>
    <div class="container">
      <div class="menubar">
        <VSystemBar window style="background-color: #0e0e0e">
          <VIcon icon="mdi-console" />
          <span>Terminal</span>
          <VSpacer />
          <VIcon v-for="icon in teminalIcons" :key="icon" :icon="icon" />
        </VSystemBar>
        <TerminalItem />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
