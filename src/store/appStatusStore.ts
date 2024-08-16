import { defineStore } from 'pinia';
import { clone } from 'ramda';

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
  timeout: number | null | undefined;
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

export const useAppStatusStore = defineStore({
  id: 'app-status',
  state: (): AppStatus => ({
    timezone: 'Asia/Seoul',
    showUIBlocker: false,
    toastMessages: [],
    dialogInfo: {
      show: false,
      title: '',
      description: '',
      buttonText: null,
      cancelButtonText: null,
      action: null,
      cancelAction: null,
      invisibleClose: false,
    },
    prevRouteName: '',
  }),

  actions: {
    setLoading(info: any) {
      this.showUIBlocker = info.val;
    },

    setDialogInfo(info: Dialog) {
      this.dialogInfo = info;
    },

    showDialog(info: DialogInfo) {
      this.setDialogInfo({
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
    },

    hideDialog() {
      this.setDialogInfo({
        show: false,
        title: '',
        description: '',
        buttonText: null,
        cancelButtonText: null,
        action: null,
        cancelAction: null,
        invisibleClose: false,
      });
    },

    showLoading(info?: any) {
      this.setLoading({ val: true, cancel: info ? info.cancel : false });
    },

    hideLoading() {
      this.setLoading({ val: false, cancel: false });
    },

    addToastMessage(info: ToastMessageInfo) {
      const message = {
        key: '1',
        show: true,
        info,
      };
      message.info.inputTime = new Date().getTime();
      if (message.info.timeout === null || message.info.timeout === undefined) {
        message.info.timeout = 2000;
      }
      if (message.info.timeout > 0) {
        if (this.toastMessages.length > 0) {
          const msgTimeout = message.info.timeout + message.info.inputTime;
          let maxTimeout = -1;
          this.toastMessages.forEach((tm: any) => {
            const timeout = tm.info.inputTime + tm.info.timeout;
            if (maxTimeout < timeout) {
              maxTimeout = timeout;
            }
          });
          message.info.timeout += 1000;
          if (msgTimeout - maxTimeout < 0) {
            message.info.timeout += Math.abs(msgTimeout - maxTimeout);
          }
        }
        setTimeout(() => {
          this.closeToastMessage(message.key);
        }, message.info.timeout);
      }
      this.toastMessages.push(message);
    },

    closeToastMessage(key: string) {
      const idx = this.toastMessages.findIndex(
        (v: ToastMessage) => v.key === key,
      );
      if (idx > -1) {
        this.toastMessages[idx].info.hide = true;
        this.toastMessages = clone(this.toastMessages);
        setTimeout(() => {
          const index = this.toastMessages.findIndex(
            (v: ToastMessage) => v.key === key,
          );
          this.toastMessages.splice(index, 1);
        }, 500);
      }
    },
  },
});
