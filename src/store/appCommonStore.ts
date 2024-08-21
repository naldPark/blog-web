import { defineStore } from 'pinia';
import { clone } from 'ramda';
import { Ref, ref } from 'vue';

export interface DialogInfo {
  title: string;
  description: string;
  buttonText?: string | null;
  cancelButtonText?: string | null;
  action?: (() => void) | null;
  cancelAction?: (() => void) | null;
  invisibleClose?: boolean;
}

interface Dialog {
  show: boolean;
  title: string;
  description: string;
  buttonText: string | null;
  cancelButtonText: string | null;
  action: (() => void) | null;
  cancelAction: (() => void) | null;
  invisibleClose: boolean;
}

export interface ToastMessageInfo {
  type: string;
  hide?: boolean;
  inputMsg?: string;
  message: string;
  buttonMsg: string | null | undefined;
  timeout: number;
  buttonCallback: (() => void) | null | undefined;
  inputTime?: number;
}

interface ToastMessage {
  key: string;
  show: boolean;
  info: ToastMessageInfo;
}

export interface AppStatus {
  timezone: string;
  showUIBlocker: boolean;
  toastMessages: Array<ToastMessage>;
  dialogInfo: Dialog;
  prevRouteName: string | null | undefined;
}

export const useAppCommonStore = defineStore('app-common', () => {
  const timezone = ref('Asia/Seoul');
  const showUIBlocker = ref(false);
  const toastMessages: Ref<ToastMessage[]> = ref([]);
  const dialogInfo: Ref<Dialog> = ref({
    show: false,
    title: '',
    description: '',
    buttonText: null,
    cancelButtonText: null,
    action: null,
    cancelAction: null,
    invisibleClose: false,
  });
  const prevRouteName = ref('');

  interface LoadingInfo {
    val: boolean;
    cancel?: boolean;
  }

  const setLoading = (info: LoadingInfo) => {
    showUIBlocker.value = info.val;
  };

  const setDialogInfo = (info: Dialog) => {
    dialogInfo.value = info;
  };

  const showDialog = (info: DialogInfo) => {
    setDialogInfo({
      show: true,
      title: info.title || '알림',
      description: info.description || '내용',
      buttonText: info.buttonText || '확인',
      cancelButtonText: info.cancelButtonText || '취소',
      action: info.action || null,
      cancelAction: info.cancelAction || null,
      invisibleClose:
        info.invisibleClose === undefined ? false : info.invisibleClose,
    });
  };

  const hideDialog = () => {
    setDialogInfo({
      show: false,
      title: '',
      description: '',
      buttonText: null,
      cancelButtonText: null,
      action: null,
      cancelAction: null,
      invisibleClose: false,
    });
  };

  const showLoading = (info?: { cancel?: boolean }) => {
    setLoading({ val: true, cancel: info?.cancel });
  };

  const hideLoading = () => {
    setLoading({ val: false, cancel: false });
  };

  const addToastMessage = (info: ToastMessageInfo) => {
    console.log('info', info);
    const message: ToastMessage = {
      key: new Date().getTime().toString(), // Generating unique key based on timestamp
      show: true,
      info: { ...info, inputTime: new Date().getTime() },
    };

    if (message.info.timeout === null || message.info.timeout === undefined) {
      message.info.timeout = 2000;
    }

    if (message.info.timeout > 0) {
      if (toastMessages.value.length > 0) {
        const msgTimeout = message.info.timeout + message.info.inputTime!;
        let maxTimeout = -1;
        toastMessages.value.forEach((tm: ToastMessage) => {
          const timeout = tm.info.inputTime! + tm.info.timeout!;
          if (maxTimeout < timeout) {
            maxTimeout = timeout;
          }
        });
        message.info.timeout += 1000;
        if (msgTimeout - maxTimeout < 0) {
          message.info.timeout += Math.abs(msgTimeout - maxTimeout);
        }
      }

      // setTimeout(() => {
      //   closeToastMessage(message.key);
      // }, message.info.timeout);
    }
    console.log('message', message);

    toastMessages.value.push(message);
    console.log('toastMessages', toastMessages.value);
  };

  const closeToastMessage = (key: string) => {
    const idx = toastMessages.value.findIndex(
      (v: ToastMessage) => v.key === key,
    );
    if (idx > -1) {
      toastMessages.value[idx].info.hide = true;
      toastMessages.value = clone(toastMessages.value);
      setTimeout(() => {
        const index = toastMessages.value.findIndex(
          (v: ToastMessage) => v.key === key,
        );
        toastMessages.value.splice(index, 1);
      }, 500);
    }
  };

  return {
    timezone,
    showUIBlocker,
    toastMessages,
    dialogInfo,
    prevRouteName,
    showDialog,
    hideDialog,
    addToastMessage,
    showLoading,
    hideLoading,
  };
});
