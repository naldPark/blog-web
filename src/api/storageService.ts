import Config from '@/config';
import { del, get, post } from './axiosMethod';
import { ApiResult } from '@/types/axios';

const storageService = {
  // 기본 API URL
  dafaultAPI: `${Config.backend}`,

  /**
   * 파일 다운로드 메서드
   * @param {number} fileSeq - 다운로드할 파일의 고유 번호
   * @returns {Promise<Blob>} 다운로드한 파일을 포함한 Blob 객체를 반환하는 Promise
   */
  download(fileSeq: number): Promise<Blob> {
    const config: any = {
      responseType: 'blob', // 파일 데이터 처리 방식 설정
    };
    return get(`${this.dafaultAPI}/storage/download/${fileSeq}`, config);
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
    return get(`${this.dafaultAPI}/storage/video/list`, config);
  },

  /**
   * 비디오 세부 정보를 가져오는 메서드
   * @param {number} fileSeq - 비디오 파일의 고유 번호
   * @returns {Promise<ApiResult<any>>} 비디오 세부 정보를 포함하는 API 결과를 반환하는 Promise
   */
  getVideoDetail(fileSeq: number): Promise<ApiResult<any>> {
    return get(`${this.dafaultAPI}/storage/video/detail/${fileSeq}`);
  },

  /**
   * VTT 파일을 가져오는 메서드
   * @param {number} fileSeq - VTT 파일의 고유 번호
   * @returns {Promise<Blob>} VTT 파일을 포함하는 Blob 객체를 반환하는 Promise
   */
  videoVtt(fileSeq: number): Promise<Blob> {
    return get(`${this.dafaultAPI}/storage/vtt/${fileSeq}.vtt`);
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
    return post(`${this.dafaultAPI}/storage/uploadLocal`, bodyForm, config);
  },

  deleteVideo(fileSeq: number[]): Promise<ApiResult<any>> {
    return del(`${this.dafaultAPI}/storage/${fileSeq}`);
  },
};

export default storageService;
