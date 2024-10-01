export const fileToBase64 = (file: any) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
};

export const downloadFile = async (blobData: Blob, fileName: string) => {
  const url = window.URL.createObjectURL(blobData);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
  /** 다운 완료후 제거 */
  window.URL.revokeObjectURL(url);
};
