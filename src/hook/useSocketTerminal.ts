import { ref, onUnmounted, onMounted, watch } from 'vue';
import { FitAddon } from '@xterm/addon-fit';
import { Terminal as xterm, ITerminalOptions } from '@xterm/xterm';

type SocketCommand = {
  init: (term: xterm) => void;
  execute: (command: string) => void;
};

export const useSocketTerminal = (socketCommand: SocketCommand) => {
  const input = ref(0);
  const fitAddon = new FitAddon();
  const term = ref<xterm | null>(null); // Using ref for term to allow reactivity

  onMounted(() => {
    const options: ITerminalOptions = {
      cursorBlink: true,
      scrollSensitivity: 2,
      allowProposedApi: true,
    };

    term.value = new xterm(options);
    term.value.loadAddon(fitAddon);
    socketCommand.init(term.value);

    initWebTerminal();
  });

  const initWebTerminal = () => {
    if (!term.value) return;

    term.value.onKey(handleKey);
    term.value.onData(handleData);
    term.value.write("Hello, Welcome to Nald's Sandbox world\r\n$ ");
  };

  const open = (element: HTMLElement) => {
    if (!term.value) return;
    term.value.open(element);
    fit();
  };

  const handleKey = (e: { key: string; domEvent: KeyboardEvent }) => {
    const isPrintable =
      !e.domEvent.altKey && !e.domEvent.ctrlKey && !e.domEvent.metaKey;

    if (e.domEvent.key in keyActions) {
      keyActions[e.domEvent.key]();
    } else if (isPrintable) {
      input.value++;
    }
  };

  const handleData = (data: string) => {
    socketCommand.execute(data);
  };

  const fit = () => {
    if (term.value) {
      fitAddon.fit();
    }
  };

  const enter = () => {
    input.value = 0;
  };

  const backSpace = () => {
    if (term.value && term.value.buffer.active.cursorX >= 10) {
      term.value.write('\x1B[0J');
      input.value--;
    }
  };

  const moveRight = () => {
    if (term.value && term.value.buffer.active.cursorX - 10 <= input.value) {
      term.value.write('\x1B[C');
    }
  };

  const moveLeft = () => {
    if (term.value && term.value.buffer.active.cursorX >= 10) {
      term.value.write('\x1B[D');
    }
  };

  /** key Action에 따라 terminal에 분기 주입 */
  const keyActions: { [key: string]: () => void } = {
    Enter: enter,
    Backspace: backSpace,
    ArrowRight: moveRight,
    ArrowLeft: moveLeft,
  };

  /** 화면 크기 변경 감지 watch */
  watch(
    () => term.value?.element,
    () => {
      fit();
    },
  );

  /** 종료 후 terminal 주입값 제거 */
  onUnmounted(() => {
    if (term.value) {
      term.value.dispose();
    }
  });

  return {
    term,
    open,
    fit,
  };
};
