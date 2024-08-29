import Config from '@/config';
import { get, post } from './axiosMethod';
import { ApiResult } from '@/types/axios';

const defaultAPI = Config.backend;

/**
 * 메일을 보내는 메서드
 * @param {Record<string, any>} body - 메일 전송에 필요한 정보
 * @returns {Promise<ApiResult<any>>} 메일 전송 결과를 반환하는 Promise
 */
const sendMail = async (body: Record<string, any>): Promise<ApiResult<any>> => {
  return await post(`${defaultAPI}/common/sendMail`, body);
};

/**
 * 블로그 목록을 가져오는 메서드
 * @returns {Promise<ApiResult<Blog[]>>} 블로그 목록을 반환하는 Promise
 */
const getBlogList = async (): Promise<ApiResult<any>> => {
  return await get(`${defaultAPI}/common/blogList`);
};

/**
 * 배지 목록을 가져오는 메서드
 * @returns {Promise<ApiResult<Badge[]>>} 배지 목록을 반환하는 Promise
 */
const getBadgeList = async (): Promise<ApiResult<any>> => {
  return await get(`${defaultAPI}/common/badgeList`);
};

export { getBadgeList, getBlogList, sendMail };
