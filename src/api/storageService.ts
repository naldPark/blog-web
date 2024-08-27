import Config from '@/config';
import { get, post } from './axiosMethod';
import { ApiResult } from '@/types/axios';
import { MovieInfoData } from '@/types/wonderwall/video';

const storageService = {
  dafaultAPI: `${Config.backend}`,

  download(fileId: string): Promise<Blob> {
    const config: any = {
      responseType: 'blob',
    };
    return get(`${this.dafaultAPI}/storage/download/${fileId}`, config);
  },

  getVideoList(params?: Record<string, any>): Promise<ApiResult<any>> {
    const config: any = {
      params: params,
    };
    return get(`${this.dafaultAPI}/storage/videoList`, config);
  },
  getVideoDetail(fileId: string): Promise<ApiResult<any>> {
    return get(`${this.dafaultAPI}/storage/getVideoDetail/${fileId}`);
  },
  videoVtt(vttPath: string): Promise<Blob> {
    return get(`${this.dafaultAPI}/storage/vtt/${vttPath}.vtt`);
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
