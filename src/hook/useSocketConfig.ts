import { ref, onUnmounted } from 'vue';
import { io, Socket as SocketIOClient } from 'socket.io-client';
import { Terminal as xterm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

class SocketConfig {
  socket: SocketIOClient;
  url: string;

  // 생성자에서는 환경 변수를 통해 소켓 URL을 가져와 소켓을 초기화.
  constructor() {
    this.url = `${location.protocol}//${location.host}/nodeterm`;
    this.socket = io(this.url, {
      transports: ['websocket'],
      path: '/nodeterm/',
    });
  }

  //메서드는 터미널을 초기화하고, 소켓으로부터 받은 메시지를 터미널에 출력.
  init(term: xterm) {
    console.log('socketinit');
    this.socket.on('output', (message) => {
      term.write(message);
    });
  }
  //메서드는 입력된 명령을 소켓을 통해 서버로 전송.
  execute(command: string) {
    console.log('socketexecute', command);
    this.socket.emit('input', command);
  }
}

const useSocketConfig = () => {
  const socketConfig = new SocketConfig();
  // Reactive references
  let socket: SocketIOClient | null = null;
  const term = ref<xterm | null>(null);
  const fitAddon = new FitAddon();
  const url = `${location.protocol}//${location.host}/nodeterm`;

  // Initialize socket connection
  const initSocket = (term: xterm) => {
    socketConfig.init(term);
  };

  // Handle terminal input and send it through the socket
  const executeCommand = (command: string) => {
    socketConfig.execute(command);
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
  // onUnmounted(() => {
  //   const currentSocket = socket;
  //   if (currentSocket) {
  //     currentSocket.off('output');
  //     currentSocket.disconnect();
  //   }
  // });

  // Initialize terminal instance
  term.value = new xterm({
    cursorBlink: true,
    scrollSensitivity: 2,
    allowProposedApi: true,
  });
  return {
    execute: executeCommand,
    init: initSocket,
    url,
    openTerminal,
  };
};
export default useSocketConfig;
