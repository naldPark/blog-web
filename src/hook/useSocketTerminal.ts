import { ref, onUnmounted, watch, onMounted } from 'vue';
import { Terminal as xterm, ITerminalOptions } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

type SocketCommand = {
  init: (term: xterm) => void;
  execute: (command: string) => void;
};

export function useSocketTerminal(socketCommand: SocketCommand) {
  // Reactivity for input tracking
  const input = ref(0);
  const fitAddon = new FitAddon();
  const term = new xterm();

  onMounted(() => {
    const options: ITerminalOptions = {
      cursorBlink: true,
      scrollSensitivity: 2,
      allowProposedApi: true,
    };

    term.options = options;
    socketCommand.init(term);

    initWebTerminal();
  });

  const initWebTerminal = () => {
    term.onKey((e) => handleKey(e));
    term.onData((e) => handleData(e));
    term.loadAddon(fitAddon);
    term.write("Hello Welcome to Nald's Sandbox world\r\n$ ");
  };

  // Open terminal in a given element
  const open = (element: HTMLElement) => {
    term.open(element);
  };

  // Handle terminal input
  const handleKey = (e: { key: string; domEvent: KeyboardEvent }) => {
    const printable: boolean =
      !e.domEvent.altKey && !e.domEvent.ctrlKey && !e.domEvent.metaKey;

    if (e.domEvent.key === 'Enter') {
      enter();
    } else if (e.domEvent.key === 'Backspace') {
      backSpace();
    } else if (e.domEvent.key === 'ArrowRight') {
      moveRight();
    } else if (e.domEvent.key === 'ArrowLeft') {
      moveLeft();
    } else if (printable) {
      input.value++;
    }
  };

  const handleData = (data: string) => {
    console.log('_onDataHandler', data);
    socketCommand.execute(data);
  };

  const enter = () => {
    input.value = 0;
  };

  const fit = () => {
    fitAddon.fit();
  };

  const backSpace = () => {
    if (term.buffer.active.cursorX >= 10) {
      term.write('\x1B[0J');
      input.value--;
    }
  };

  const moveRight = () => {
    const isEnd: boolean = term.buffer.active.cursorX - 10 <= input.value;
    if (!isEnd) {
      term.write('\x1B[C');
    }
  };

  const moveLeft = () => {
    const isStart: boolean = term.buffer.active.cursorX >= 10;
    if (!isStart) {
      term.write('\x1B[D');
    }
  };

  // Watch for changes in the terminal's size
  watch(
    () => term.element,
    () => {
      fitAddon.fit();
    },
  );

  // Cleanup function
  onUnmounted(() => {
    term.dispose();
  });

  return {
    term,
    open,
    fit,
  };
}
