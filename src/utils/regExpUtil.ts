// 이메일 형식
export const emailRegExp = () => {
  return new RegExp('^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$');
};

// 비밀번호 일치
export const passwordVerifyRegExp = (pwd: string) => {
  return new RegExp('^' + pwd.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$');
};
