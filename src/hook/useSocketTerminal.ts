import { ref, onUnmounted, watch } from 'vue';
import { Terminal as xterm, ITerminalOptions } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

type SocketCommand = {
  init: (term: xterm) => void;
  execute: (command: string) => void;
};

export function useSocketTerminal(socketCommand: SocketCommand) {
  // Reactivity for input tracking
  const input = ref(0);

  // Create xterm terminal instance
  const term = new xterm({
    cursorBlink: true,
    scrollSensitivity: 2,
    allowProposedApi: true,
  } as ITerminalOptions);

  // Create FitAddon instance
  const fitAddon = new FitAddon();

  // Initialize terminal with socket commands
  socketCommand.init(term);

  // Open terminal in a given element
  const open = (element: HTMLElement) => {
    term.open(element);
    term.loadAddon(fitAddon);
    fitAddon.fit();
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
      console.log('printable', input.value);
      input.value++;
    }
  };

  const handleData = (data: string) => {
    console.log('_onDataHandler', data);
    socketCommand.execute(data);
  };

  // Initialize event listeners for terminal
  term.onKey(handleKey);
  term.onData((e) => handleData(e));

  const enter = () => {
    input.value = 0;
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
    fit: fitAddon.fit,
  };
}
