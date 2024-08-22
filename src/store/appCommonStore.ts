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
  showCloseButton?: boolean;
}

interface Dialog {
  show: boolean;
  title: string;
  description: string;
  buttonText: string | null;
  cancelButtonText: string | null;
  action: (() => void) | null;
  cancelAction: (() => void) | null;
  showCloseButton: boolean;
}

export interface ToastMessageInfo {
  type: 'success' | 'error' | 'warning';
  title?: string;
  hide?: boolean;
  inputMsg?: string;
  message: string;
  buttonMsg: string | null | undefined;
  timeout?: number;
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
  showBlocker: boolean;
  toastMessages: Array<ToastMessage>;
  dialogInfo: Dialog;
  prevRouteName: string | null | undefined;
}

export const useAppCommonStore = defineStore('app-common', () => {
  const timezone = ref('Asia/Seoul');
  const showBlocker = ref(false);
  const toastMessages: Ref<ToastMessage[]> = ref([]);
  const dialogInfo: Ref<Dialog> = ref({
    show: false,
    title: '',
    description: '',
    buttonText: null,
    cancelButtonText: null,
    action: null,
    cancelAction: null,
    showCloseButton: false,
  });
  const prevRouteName = ref('');

  interface LoadingInfo {
    val: boolean;
    cancel?: boolean;
  }

  const setLoading = (info: LoadingInfo) => {
    showBlocker.value = info.val;
  };

  const setDialogInfo = (info: Dialog) => {
    dialogInfo.value = info;
  };

  const showDialog = (info: DialogInfo) => {
    console.log('asd');
    setDialogInfo({
      show: true,
      title: info.title || '알림',
      description: info.description || '내용',
      buttonText: info.buttonText || '확인',
      cancelButtonText: info.cancelButtonText || '취소',
      action: info.action || null,
      cancelAction: info.cancelAction || null,
      showCloseButton:
        info.showCloseButton === undefined ? false : info.showCloseButton,
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
      showCloseButton: false,
    });
  };

  const showLoading = (info?: { cancel?: boolean }) => {
    setLoading({ val: true, cancel: info?.cancel });
  };

  const hideLoading = () => {
    setLoading({ val: false, cancel: false });
  };

  const addToastMessage = (info: ToastMessageInfo) => {
    const timestamp = Date.now();
    toastMessages.value.push({
      key: timestamp.toString(),
      show: true,
      info: {
        ...info,
        inputTime: timestamp,
        timeout: info.timeout && info.timeout > 0 ? info.timeout : 2000,
      },
    });
  };

  return {
    timezone,
    showBlocker,
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
