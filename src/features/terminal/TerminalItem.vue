<template>
  <div
    class="console"
    id="terminal"
    style="height: 100dvh; max-height: 1000px"
  ></div>
</template>

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
<style lang="scss" scoped>
  .console {
    margin-top: 40px;

    :deep(.xterm-text-layer) {
      width: 100%;
      height: 100%;
    }
  }
</style>
