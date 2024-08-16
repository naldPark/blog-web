export interface VideoDetailData {
  storageId: number;
  fileName: string;
  fileSrc: string;
  fileSize: number;
  fileDesc?: string;
  fileType: string;
  fileCover?: string;
  vttSrc?: string;
  createdDt?: string;
  downloadable?: string;
}
