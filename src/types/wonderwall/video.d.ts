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

export interface MovieInfoData {
  category: string;
  file: File | null;
  originName: string;
  fileSize: number;
  description: string;
  name: string;
  status: string;
  fileType: string;
  fileCover: File | File[] | undefined;
  fileVtt: File | null;
  fileDownload: boolean;
  fileAuth: boolean;
}

export interface FileInfo {
  file: File;
  name: string;
  size: number;
  status: string;
}
