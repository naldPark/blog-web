import Config from '@/config';
import { get, post, put } from './axiosMethod';
import { JSEncrypt } from 'jsencrypt';

const defaultAPI = `${Config.backend}`;

// 로그인 메서드
const getRsa = async (): Promise<any> => {
  return await get(`${defaultAPI}/user/rsa`);
};

// 로그인 메서드
const login = async (userId: string, password: string): Promise<any> => {
  // const pw = CryptoJS.SHA256(password).toString();
  // const rsa = new JSEncrypt({ default_key_size: '2048' });
  // rsa.setPublicKey(response.data.publicKeyStr);
  // const encryptedValue = btoa((rsa as JSEncrypt).encrypt(value) as string);
  const requestParam = {
    accountId: userId,
    password: password,
  };
  return await post(`${defaultAPI}/user/login`, requestParam);
};

// 비밀번호 변경 메서드
const editPassword = async (userId: string, password: string): Promise<any> => {
  const requestParam = {
    accountId: userId,
    password: password,
  };
  return await put(`${defaultAPI}/user/editPassword`, requestParam);
};

// 상태 변경 메서드
const changeStatus = async (
  userIds: Array<string>,
  status: number,
): Promise<any> => {
  const requestParam = {
    userIds,
    status,
  };
  return await put(`${defaultAPI}/user/changeStatus`, requestParam);
};

// 사용자 생성 메서드
const createUser = async (body: Record<string, any>): Promise<any> => {
  return await post(`${defaultAPI}/user/createUser`, body);
};

// 사용자 수정 메서드
const editUser = async (body: Record<string, any>): Promise<any> => {
  return await put(`${defaultAPI}/user/editUser`, body);
};

// // 메시지 전송 메서드
// const sendMessage = async (body: Record<string, any>): Promise<any> => {
//   return await post(`${defaultAPI}/user/message`, body);
// };

// 사용자 목록을 가져오는 메서드
const getUserList = async (): Promise<any> => {
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
