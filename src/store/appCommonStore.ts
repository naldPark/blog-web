import { defineStore } from 'pinia';
import { clone } from 'ramda';
import { Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';

export interface DialogInfo {
  show?: boolean;
  title: string;
  description: string;
  buttonText?: string | null;
  cancelButtonText?: string | null;
  action?: (() => void) | null;
  cancelAction?: (() => void) | null;
  showCloseButton?: boolean;
}

interface ToastInfo {
  type: 'success' | 'error' | 'warning';
  title?: string;
  showButton?: boolean;
  inputMsg?: string;
  message: string;
  buttonMsg?: string;
  timeout?: number;
  buttonCallback?: () => void;
  inputTime?: number;
}

interface Toast {
  key: string;
  show: boolean;
  info: ToastInfo;
}

export interface AppStatus {
  timezone: string;
  showBlocker: boolean;
  toasts: Toast[];
  dialogInfo: DialogInfo;
  prevRouteName: string | null | undefined;
}

export const useAppCommonStore = defineStore('app-common', () => {
  const { t } = useI18n();
  const timezone = ref('Asia/Seoul');
  const showBlocker = ref(false);
  const toasts: Ref<Toast[]> = ref([]);
  const dialogInfo: Ref<DialogInfo> = ref({
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

  const setDialogInfo = (info: DialogInfo) => {
    dialogInfo.value = info;
  };

  const showDialog = (info: DialogInfo) => {
    setDialogInfo({
      show: true,
      title: info.title,
      description: info.description,
      buttonText: info.buttonText || t('confirm'),
      cancelButtonText: info.cancelButtonText || t('cancel'),
      action: info.action || null,
      cancelAction: info.cancelAction || null,
      showCloseButton: info.showCloseButton ?? false,
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

  const showToast = (info: ToastInfo) => {
    const timestamp = Date.now();
    toasts.value.push({
      key: timestamp.toString(),
      show: true,
      info: {
        ...info,
        inputTime: timestamp,
        timeout: info.timeout && info.timeout > 0 ? info.timeout : 2000,
      },
    });
  };

  const showTransErrorToast = (info: ToastInfo) => {
    const timestamp = Date.now();
    toasts.value.push({
      key: timestamp.toString(),
      show: true,
      info: {
        type: 'error',
        message: t(`error_code.${info.message}`),
        inputTime: timestamp,
        timeout: info.timeout && info.timeout > 0 ? info.timeout : 2000,
      },
    });
  };

  return {
    timezone,
    showBlocker,
    toasts,
    dialogInfo,
    prevRouteName,
    showDialog,
    hideDialog,
    showToast,
    showLoading,
    hideLoading,
    showTransErrorToast,
  };
});
