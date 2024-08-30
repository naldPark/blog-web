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

  /** 소켓 init */
  const initSocket = (term: xterm) => {
    socket.value!.on('output', (message) => {
      term.write(message);
    });
  };

  /** 소켓 command */
  const executeCommand = (command: string) => {
    socket.value!.emit('input', command);
  };

  /** 터미널 fit 화면에 적용  */
  const openTerminal = (element: HTMLElement) => {
    if (term.value) {
      term.value.open(element);
      term.value.loadAddon(fitAddon);
      fitAddon.fit();
    }
  };

  /** 마운트 해제시 소켓 off */
  onUnmounted(() => {
    if (socket.value) {
      socket.value.off('output');
      socket.value.disconnect();
    }
  });

  /** 터미널 초기화 */
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
