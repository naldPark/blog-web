<template>
  <div>
    <div class="container">
      <div class="menubar">
        <v-system-bar window style="background-color: #0e0e0e">
          <v-icon>mdi-console</v-icon>
          <span>Terminal</span>
          <v-spacer></v-spacer>
          <v-icon>mdi-minus</v-icon>
          <v-icon>mdi-checkbox-blank-outline</v-icon>
          <v-icon>mdi-close</v-icon>
        </v-system-bar>
        <terminal-item></terminal-item>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import 'xterm/css/xterm.css';
  import 'xterm/lib/xterm.js';
  import { ref } from 'vue';
  import TerminalItem from '@/components/terminal/TerminalItem.vue';

  const message = ref('');

  const action = (type: string, data: Record<string, any>) =>
    JSON.stringify({
      type,
      ...data,
    });
</script>

<style lang="scss" scoped>
  //   @import 'xterm/css/xterm.css';
</style>
