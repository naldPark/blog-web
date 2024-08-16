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
        <TerminalItem></TerminalItem>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import 'xterm/css/xterm.css';
import 'xterm/lib/xterm.js';
import { ref } from 'vue';
import TerminalItem from '@/features/terminal/TerminalItem.vue';

const message = ref('');

const action = (type: string, data: Record<string, any>) =>
  JSON.stringify({
    type,
    ...data,
  });
</script>

<style lang="scss" scoped>
//   @import 'xterm/css/xterm.css';</style>
