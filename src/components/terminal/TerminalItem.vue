<template>
    <div id="terminal" :style="style"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import SocketTerminal from './SocketTerminal';
import SocketConfig from '@/api/SocketConfig';

// Reactive style object
const style = ref({
    height: '100vh',
});

onMounted(() => {
    const socketConfig = new SocketConfig();
    const terminal = new SocketTerminal(socketConfig);

    terminal.open(document.getElementById('terminal') as HTMLElement);
    terminal.fit();
});
</script>

<style lang="scss" scoped></style>
