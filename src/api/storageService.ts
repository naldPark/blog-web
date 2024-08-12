import HttpClient from '@/api/HttpClient';
import Config from '@/config';
import { get, post } from './axiosMethod';

const storageService = {
  dafaultAPI: `${Config.backend}`,

  download(fileId: any) {
    const config: any = {
      responseType: 'blob',
    };
    return get(`${this.dafaultAPI}/storage/download/${fileId}`, config);
  },

  getVideoList(params?: any) {
    const config: any = {
      params: params,
    };
    return get(`${this.dafaultAPI}/storage/videoList`, config);
  },
  getVideoDetail(fileId: any) {
    return get(`${this.dafaultAPI}/storage/getVideoDetail/${fileId}`);
  },
  videoVtt(vttPath: any) {
    return get(`${this.dafaultAPI}/storage/vtt/${vttPath}.vtt`);
  },

  localUploadFiles(info: any, files: any) {
    const config = {
      headers: { 'Content-type': 'multipart/form-data' },
    };
    const json = JSON.stringify(info);
    const blob = new Blob([json], { type: 'application/json' });

    const bodyForm = new FormData();
    bodyForm.append('info', blob);
    bodyForm.append('fileVtt', files.fileVtt);
    bodyForm.append('file', files.file);
    return post(`${this.dafaultAPI}/storage/uploadLocal`, bodyForm, config);
  },
};

export default storageService;
