export type UserManage = {
  accountId: string;
  accountName: string;
  authority: number;
  recentLoginDt: string;
  status: number;
  email: string;
  createdDt: string;
  loginFailCnt: number;
};

/** User 생성 / 수정 요청 데이터 */
export type UserRequestBody = {
  accountId: string;
  accountName: string;
  authority: number;
  email: string;
  password: string;
};
