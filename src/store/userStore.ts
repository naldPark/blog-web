import { defineStore } from 'pinia';
import { useCookies } from '@vueuse/integrations/useCookies';
import { ref } from 'vue';

/** 상수 정의 */
const AUTH_TOKEN_COOKIE_KEY = 'access_token';
const ACCOUNT_INFO_KEY = 'ACCOUNT_INFO';
export interface AccountInfo {
  accountId: string;
  accountName: string;
  authority: number;
  email: string;
}

/** 유저 정보 스토어 **/
export const useUserStore = defineStore('user', () => {
  const cookies = useCookies();
  const isSignIn = ref(false);
  const authToken = ref<string | null>(
    cookies.get(AUTH_TOKEN_COOKIE_KEY) || null,
  );
  const initAccountValue: AccountInfo = {
    accountId: '',
    accountName: '',
    authority: -1,
    email: '',
  };
  const accountInfo = ref<AccountInfo>(
    JSON.parse(localStorage.getItem(ACCOUNT_INFO_KEY) || '{}') ||
      initAccountValue,
  );

  /** 토큰 세팅 */
  const setAuthToken = (token: string | null) => {
    authToken.value = token;
    isSignIn.value = !!token;
    if (token) {
      cookies.set(AUTH_TOKEN_COOKIE_KEY, token);
    } else {
      cookies.remove(AUTH_TOKEN_COOKIE_KEY);
      localStorage.removeItem(ACCOUNT_INFO_KEY);
      accountInfo.value = initAccountValue;
    }
  };

  /** 토큰 내 유저 정보 세팅 */
  const setAccountInfo = (info: AccountInfo, token: string) => {
    accountInfo.value = info;
    localStorage.setItem(ACCOUNT_INFO_KEY, JSON.stringify(info));
    setAuthToken(token);
  };

  // /** 토큰 불러오기 */
  // /** 이것도 없애는게 맞고 그냥 authToken만 있으면 됨 */
  // const getAuthToken = (): string | null => {
  //   const storedToken = cookies.get(AUTH_TOKEN_COOKIE_KEY);
  //   if (storedToken) {
  //     authToken.value = storedToken;
  //     isSignIn.value = true;
  //     accountInfo.value = JSON.parse(
  //       localStorage.getItem(ACCOUNT_INFO_KEY) || '{}',
  //     );
  //   } else {
  //     authToken.value = null;
  //     isSignIn.value = false;
  //     accountInfo.value = initAccountValue;
  //   }
  //   return authToken.value;
  // };

  /** 유저 및 토큰 정보 초기화 */
  const resetAccountInfo = () => {
    accountInfo.value = initAccountValue;
    setAuthToken(null);
    localStorage.removeItem(ACCOUNT_INFO_KEY);
    cookies.remove(AUTH_TOKEN_COOKIE_KEY);
  };

  return {
    isSignIn,
    authToken,
    accountInfo,
    setAccountInfo,
    resetAccountInfo,
  };
});
