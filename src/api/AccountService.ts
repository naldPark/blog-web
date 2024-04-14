import HttpClient from '@/api/HttpClient';
import Config from '@/config';
import CryptoJS from "crypto-js";


const defaultAPI = `${Config.backend}`;

// 로그인 메서드
const login = async (userId: string, password: string): Promise<any> => {
  const pw = CryptoJS.SHA256(password).toString();
  const requestParam = {
    accountId: userId,
    password: pw
  };
  return await HttpClient.post(`${defaultAPI}/login`, requestParam);
};

// 비밀번호 변경 메서드
const editPassword = async (userId: string, password: string): Promise<any> => {
  const pw = CryptoJS.SHA256(password).toString();
  const requestParam = {
    accountId: userId,
    password: pw
  };
  return await HttpClient.put(`${defaultAPI}/editPassword`, requestParam);
};

// 상태 변경 메서드
const changeStatus = async (userIds: Array<string>, status: number): Promise<any> => {
  const requestParam = {
    userIds,
    status
  };
  return await HttpClient.put(`${defaultAPI}/changeStatus`, requestParam);
};

// 사용자 생성 메서드
const createUser = async (body: Record<string, any>): Promise<any> => {
  return await HttpClient.post(`${defaultAPI}/createUser`, body);
};

// 사용자 수정 메서드
const editUser = async (body: Record<string, any>): Promise<any> => {
  return await HttpClient.put(`${defaultAPI}/editUser`, body);
};

// 메시지 전송 메서드
const sendMessage = async (body: Record<string, any>): Promise<any> => {
  return await HttpClient.post(`${defaultAPI}/message`, body);
};

// 사용자 목록을 가져오는 메서드
const getUserList = async (): Promise<any> => {
  return await HttpClient.get(`${defaultAPI}/list`);
};

// 모듈로 내보내기
export {
  login,
  editPassword,
  changeStatus,
  createUser,
  editUser,
  sendMessage,
  getUserList
};
