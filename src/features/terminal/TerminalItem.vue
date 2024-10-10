<script lang="ts" setup>
import { onMounted } from 'vue';
import '@xterm/xterm/css/xterm.css';
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
  height: calc(90dvh - 150px);
  max-height: 90%;
  :deep(.xterm-text-layer) {
    width: calc(90dvh - 150px);
    height: 90%;
  }
}
</style>
