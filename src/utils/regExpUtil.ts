// 이메일 형식
export const emailRegExp = () => {
  return new RegExp('^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$');
};

// 영문자, 숫자, 특수문자(!@#$%^&*?_)를 모두 포함 필수 8자~16자
export const passwordRegExp = () => {
  return new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$');
};

// 비밀번호 일치
export const passwordVerifyRegExp = (pwd: string) => {
  return new RegExp('^' + pwd.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$');
};

// 영문 대소문자 / 숫자 /  한글 포함 2 ~ 10 자리
export const nameRegExp = () => {
  return new RegExp('^(?!.*\\s\\s)[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\\s]{2,10}$');
};
