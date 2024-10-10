import Config from '@/config';
import { del, get, post, put } from './axiosMethod';
import { ApiResult } from '@/types/axios';
import { VideoRequestBody } from '@/types/admin';

const storageService = {
  // 기본 API URL
  defaultAPI: `${Config.backend}`,

  /**
   * 파일 다운로드 메서드
   * @param {string} fileSeq - 다운로드할 파일의 고유 번호
   * @returns {Promise<Blob>} 다운로드한 파일을 포함한 Blob 객체를 반환하는 Promise
   */
  download(fileSeq: string): Promise<Blob> {
    const config: any = {
      responseType: 'blob', // 파일 데이터 처리 방식 설정
    };
    return get(`${this.defaultAPI}/storage/download/${fileSeq}`, config);
  },

  /**
   * 비디오 목록을 가져오는 메서드
   * @param {Record<string, any>} [params] - 요청 파라미터 (선택 사항)
   * @returns {Promise<ApiResult<any>>} 비디오 목록을 포함하는 API 결과를 반환하는 Promise
   */
  getVideoList(params?: Record<string, any>): Promise<ApiResult<any>> {
    const config: any = {
      params: params, // 요청 파라미터 설정
    };
    return get(`${this.defaultAPI}/storage/video/list`, config);
  },

  /**
   * 비디오 세부 정보를 가져오는 메서드
   * @param {string} fileSeq - 비디오 파일의 고유 번호
   * @returns {Promise<ApiResult<any>>} 비디오 세부 정보를 포함하는 API 결과를 반환하는 Promise
   */
  getVideoDetail(fileSeq: string): Promise<ApiResult<any>> {
    return get(`${this.defaultAPI}/storage/video/detail/${fileSeq}`);
  },

  /**
   * VTT 파일을 가져오는 메서드
   * @param {string} fileSeq - VTT 파일의 고유 번호
   * @returns {Promise<Blob>} VTT 파일을 포함하는 Blob 객체를 반환하는 Promise
   */
  getFileVtt(fileSeq: string): Promise<Blob> {
    return get(`${this.defaultAPI}/storage/vtt/${fileSeq}.vtt`);
  },

  /**
   * 로컬 파일을 업로드하는 메서드
   * @param {FormData} bodyForm - 업로드할 영상 FormData (파일과 VTT 파일 포함)
   * @returns {Promise<ApiResult<any>>} 파일 업로드 결과를 포함하는 API 결과를 반환하는 Promise
   */
  localUploadFiles(bodyForm: FormData): Promise<ApiResult<any>> {
    const config = {
      headers: { 'Content-type': 'multipart/form-data' }, // 폼 데이터 전송을 위한 헤더 설정
    };
    return post(`${this.defaultAPI}/storage/uploadLocal`, bodyForm, config);
  },

  deleteVideo(seqList: string[]): Promise<ApiResult<any>> {
    return del(`${this.defaultAPI}/storage`, {
      data: seqList,
    });
  },
  /**
   * 비디오 수정 bodyForm
   * @param {FormData} bodyForm - 수정할 비디오 정보
   * @returns {Promise<ApiResult<any>>} 비디오 수정 결과를 반환하는 Promise
   */
  putEditVideo(bodyForm: FormData): Promise<ApiResult<any>> {
    const config = {
      headers: { 'Content-type': 'multipart/form-data' },
    };
    return put(`${this.defaultAPI}/storage`, bodyForm, config);
  },
};

export default storageService;
