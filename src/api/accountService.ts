import Config from '@/config';
import { get, post, put } from './axiosMethod';
import { ApiResult } from '@/types/axios';

const defaultAPI = `${Config.backend}`;

/**
 * 공개 키를 가져오는 메서드
 * @returns {Promise<ApiResult<any>>} 공개 키를 반환하는 Promise
 */
const getRsa = async (): Promise<ApiResult<any>> => {
  return await get(`${defaultAPI}/user/rsa`);
};

/**
 * 로그인 메서드
 * @param {Object} params - 로그인 정보
 * @param {string} params.accountId - 사용자 아이디
 * @param {string} params.password - 암호화된 비밀번호
 * @returns {Promise<ApiResult<any>>} 로그인 결과를 반환하는 Promise
 */
const login = async (params: {
  accountId: string;
  password: string;
}): Promise<ApiResult<any>> => {
  return await post(`${defaultAPI}/user/login`, params);
};

/**
 * 비밀번호 변경 메서드
 * @param {string} accountId - 사용자 아이디
 * @param {string} password - 암호화된 비밀번호
 * @returns {Promise<ApiResult<any>>} 비밀번호 변경 결과를 반환하는 Promise
 */
const editPassword = async (
  accountId: string,
  password: string,
): Promise<ApiResult<any>> => {
  const requestParam = {
    accountId,
    password,
  };
  return await put(`${defaultAPI}/user/editPassword`, requestParam);
};

/**
 * 사용자 상태 변경 메서드
 * @param {Array<string>} userIds - 상태를 변경할 사용자 아이디 배열
 * @param {number} status - 새로운 상태 값
 * @returns {Promise<ApiResult<any>>} 상태 변경 결과를 반환하는 Promise
 */
const changeStatus = async (
  userIds: Array<string>,
  status: number,
): Promise<ApiResult<any>> => {
  const requestParam = {
    userIds,
    status,
  };
  return await put(`${defaultAPI}/user/changeStatus`, requestParam);
};

/**
 * 사용자 생성 메서드
 * @param {Record<string, any>} body - 사용자 생성에 필요한 정보
 * @returns {Promise<ApiResult<any>>} 사용자 생성 결과를 반환하는 Promise
 */
const createUser = async (
  body: Record<string, any>,
): Promise<ApiResult<any>> => {
  return await post(`${defaultAPI}/user/createUser`, body);
};

/**
 * 사용자 수정 메서드
 * @param {Record<string, any>} body - 수정할 사용자 정보
 * @returns {Promise<ApiResult<any>>} 사용자 수정 결과를 반환하는 Promise
 */
const editUser = async (body: Record<string, any>): Promise<ApiResult<any>> => {
  return await put(`${defaultAPI}/user/editUser`, body);
};

/**
 * 사용자 목록을 가져오는 메서드
 * @returns {Promise<ApiResult<any>>} 사용자 목록을 반환하는 Promise
 */
const getUserList = async (): Promise<ApiResult<any>> => {
  return await get(`${defaultAPI}/user/list`);
};

// 모듈로 내보내기
export {
  login,
  editPassword,
  changeStatus,
  createUser,
  editUser,
  getUserList,
  getRsa,
};
