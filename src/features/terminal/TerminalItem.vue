<script lang="ts" setup>
  import { onMounted } from 'vue';
  import 'xterm/css/xterm.css';
  import useSocketConfig from '@/hook/useSocketConfig';
  import { useSocketTerminal } from '@/hook/useSocketTerminal';

  const socketConfig = useSocketConfig();
  const socketTerminal = useSocketTerminal(socketConfig);

  onMounted(() => {
    socketTerminal.open(document.getElementById('terminal') as HTMLElement);
    socketTerminal.fit();
  });
</script>

<template>
  <div id="terminal"></div>
</template>

<style lang="scss" scoped>
  #terminal {
    margin-top: 40px;
    height: 100dvh;
    max-height: 1000px;
    :deep(.xterm-text-layer) {
      width: 100%;
      height: 100%;
    }
  }
</style>
