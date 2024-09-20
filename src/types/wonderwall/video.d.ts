import { CommonListRequestData } from '../common';
export interface VideoDetailData {
  storageId: string;
  originName?: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  fileDesc: string;
  fileAuth: boolean;
  downloadable: boolean;
  fileCover?: string;
  vttSrc?: string;
  fileSrc: string;
  createdDt?: string;
}

export interface FileInfo {
  file: File;
  name: string;
  size: number;
}

export interface VideoListRequestData extends CommonListRequestData {
  type?: string;
  searchText?: string;
  withCover?: boolean;
}
