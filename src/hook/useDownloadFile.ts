import { ref } from 'vue';

/** 파일 다운로드 Hook */
export const useDownloadFile = () => {
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const downloadFile = async (blobData: Blob, fileName: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      const url = window.URL.createObjectURL(blobData);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      /** 다운 완료후 제거 */
      window.URL.revokeObjectURL(url);
    } catch (err) {
      error.value = 'failed';
    } finally {
      isLoading.value = false;
    }
  };

  return { downloadFile, isLoading, error };
};
