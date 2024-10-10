import { defineStore } from 'pinia';
import { useCookies } from '@vueuse/integrations/useCookies';
import { ref } from 'vue';
import { ACCOUNT_INFO_KEY, ACCESS_TOKEN } from '@/types/constants';
import { useRouter } from 'vue-router';
import { decodeToken } from '@/utils/commonUtil';

export interface AccountInfo {
  accountId: string;
  accountName: string;
  authority: number;
  email: string;
}

/** 유저 정보 스토어 **/
export const useUserStore = defineStore('user', () => {
  const cookies = useCookies();
  const router = useRouter();
  const authToken = ref<string | null>(cookies.get(ACCESS_TOKEN) || null);
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
  const isSignIn = ref<boolean>(!!authToken.value);

  const isSuper = ref<boolean>(accountInfo.value.authority == 0);
  const isBiz = ref<boolean>(accountInfo.value.authority == 3);
  /** 토큰 세팅 */
  const setAuthToken = (token: string | null) => {
    authToken.value = token;
    if (token) {
      cookies.set(ACCESS_TOKEN, token);
      const tokenInfo = JSON.parse(decodeToken(token));
      setAccountInfo({
        accountId: tokenInfo.user_id,
        accountName: tokenInfo.user_name,
        authority: tokenInfo.authority,
        email: tokenInfo.user_email,
      });
      isSuper.value = accountInfo.value.authority == 0;
    } else {
      cookies.remove(ACCESS_TOKEN);
      localStorage.removeItem(ACCOUNT_INFO_KEY);
      accountInfo.value = initAccountValue;
    }
  };

  /** 토큰 내 유저 정보 세팅 */
  const setAccountInfo = (info: AccountInfo) => {
    accountInfo.value = info;
    isSignIn.value = true;
    localStorage.setItem(ACCOUNT_INFO_KEY, JSON.stringify(info));
  };

  /** 유저 및 토큰 정보 초기화 */
  const resetAccountInfo = () => {
    isSignIn.value = false;
    accountInfo.value = initAccountValue;
    setAuthToken(null);
    localStorage.removeItem(ACCOUNT_INFO_KEY);
    cookies.remove(ACCESS_TOKEN);
    if (['/', '/main'].includes(location.pathname)) return;
    router.push('/');
  };
  if (!isSignIn.value) {
    resetAccountInfo();
  }

  return {
    isSignIn,
    authToken,
    isBiz,
    isSuper,
    accountInfo,
    setAuthToken,
    resetAccountInfo,
  };
});
