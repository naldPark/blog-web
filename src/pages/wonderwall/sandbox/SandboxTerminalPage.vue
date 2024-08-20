<template>
  <div>
    <div class="container">
      <div class="menubar">
        <VSystemBar window style="background-color: #0e0e0e">
          <VIcon>mdi-console</VIcon>
          <span>Terminal</span>
          <VSpacer></VSpacer>
          <VIcon>mdi-minus</VIcon>
          <VIcon>mdi-checkbox-blank-outline</VIcon>
          <VIcon>mdi-close</VIcon>
        </VSystemBar>
        <TerminalItem />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import TerminalItem from '@/features/terminal/TerminalItem.vue';
</script>

<style lang="scss" scoped></style>
