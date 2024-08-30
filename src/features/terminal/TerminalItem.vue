<script lang="ts" setup>
  import { onMounted } from 'vue';
  import '@xterm/xterm/css/xterm.css'
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
    height: calc( 100dvh - 150px );
    max-height: 100%;
    :deep(.xterm-text-layer) {
      width: calc( 100dvh - 150px );
      height: 100%;
    }
  }
</style>
