import { ref, onUnmounted, onMounted } from 'vue';
import { io, Socket as SocketIOClient } from 'socket.io-client';
import { Terminal as xterm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

const useSocketConfig = () => {
  const socket = ref<SocketIOClient | null>(null);
  const term = ref<xterm | null>(null);
  const fitAddon = new FitAddon();

  onMounted(() => {
    const url = `${location.protocol}//${location.host}/nodeterm`;
    socket.value = io(url, {
      transports: ['websocket'],
      path: '/nodeterm/',
    });
  });

  // Initialize socket connection
  const initSocket = (term: xterm) => {
    socket.value!.on('output', (message) => {
      term.write(message);
    });
  };

  // Handle terminal input and send it through the socket
  const executeCommand = (command: string) => {
    socket.value!.emit('input', command);
  };

  // Open terminal and apply FitAddon
  const openTerminal = (element: HTMLElement) => {
    if (term.value) {
      term.value.open(element);
      term.value.loadAddon(fitAddon);
      fitAddon.fit(); // Ensure this method is called from FitAddon instance
    }
  };

  // Cleanup on component unmount
  onUnmounted(() => {
    if (socket.value) {
      socket.value.off('output');
      socket.value.disconnect();
    }
  });

  // Initialize terminal instance
  term.value = new xterm({
    cursorBlink: true,
    scrollSensitivity: 2,
    allowProposedApi: true,
  });
  return {
    execute: executeCommand,
    init: initSocket,
    openTerminal,
  };
};

export default useSocketConfig;
