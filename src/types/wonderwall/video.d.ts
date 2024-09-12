import { CommonListRequestData } from '../common';

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

export interface MovieInfoRequestData {
  originName: string;
  fileName: string;
  fileSize: number;
  category: string;
  description: string;
  fileAuth: boolean;
  fileDownload: boolean;
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
