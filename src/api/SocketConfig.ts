import { io, Socket as SocketIOClient } from 'socket.io-client';
import { Terminal as xterm } from 'xterm';
// 클라이언트 측에서 소켓을 설정하고 관리.
class SocketConfig {
  socket: SocketIOClient;
  url: string;

  // 생성자에서는 환경 변수를 통해 소켓 URL을 가져와 소켓을 초기화.
  constructor() {
    console.log('??');
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

export default SocketConfig;
