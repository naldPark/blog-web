import Config from '@/config';
import { get, post } from './axiosMethod';
import { ApiResult } from '@/types/axios';

const storageService = {
  dafaultAPI: `${Config.backend}`,

  download(fileSeq: number): Promise<Blob> {
    const config: any = {
      responseType: 'blob',
    };
    return get(`${this.dafaultAPI}/storage/download/${fileSeq}`, config);
  },

  getVideoList(params?: Record<string, any>): Promise<ApiResult<any>> {
    const config: any = {
      params: params,
    };
    return get(`${this.dafaultAPI}/storage/videoList`, config);
  },
  getVideoDetail(fileSeq: number): Promise<ApiResult<any>> {
    return get(`${this.dafaultAPI}/storage/getVideoDetail/${fileSeq}`);
  },
  videoVtt(fileSeq: number): Promise<Blob> {
    return get(`${this.dafaultAPI}/storage/vtt/${fileSeq}.vtt`);
  },

  localUploadFiles(info: any, movieInfo: any): Promise<ApiResult<any>> {
    const config = {
      headers: { 'Content-type': 'multipart/form-data' },
    };
    const json = JSON.stringify(info);
    const blob = new Blob([json], { type: 'application/json' });

    const bodyForm = new FormData();
    bodyForm.append('info', blob);
    bodyForm.append('fileVtt', movieInfo.fileVtt);
    bodyForm.append('file', movieInfo.file);
    return post(`${this.dafaultAPI}/storage/uploadLocal`, bodyForm, config);
  },
};

export default storageService;
