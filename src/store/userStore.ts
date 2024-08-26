import { defineStore } from 'pinia';
import { useCookies } from '@vueuse/integrations/useCookies';
import { isEmpty } from 'ramda';
import { ref } from 'vue';

// Constants for keys
const AUTH_TOKEN_COOKIE_KEY = 'access_token';
const ACCOUNT_INFO_KEY = 'ACCOUNT_INFO';
export interface AccountInfo {
  accountId: string;
  accountName: string;
  authority: number;
  email: string;
}

// Define your store
export const useUserStore = defineStore('user', () => {
  // State definition
  const cookies = useCookies();
  const isSignIn = ref(false);
  const authToken = ref<string | null>(null);
  const accountInfo = ref<AccountInfo>({
    accountId: '',
    accountName: '',
    authority: -1,
    email: '',
  });

  // Actions definition
  const setAuthToken = (token: string | null) => {
    if (typeof token === 'string' && !isEmpty(token)) {
      authToken.value = token;
      isSignIn.value = true;
      cookies.set(AUTH_TOKEN_COOKIE_KEY, token);
    } else {
      cookies.remove(AUTH_TOKEN_COOKIE_KEY);
      localStorage.clear();
      accountInfo.value = {
        accountId: '',
        accountName: '',
        authority: -1,
        email: '',
      };
      authToken.value = null;
      isSignIn.value = false;
    }
  };

  const loadAuthToken = () => {
    if (!authToken.value) {
      const storedToken = cookies.get(AUTH_TOKEN_COOKIE_KEY);
      if (storedToken) {
        authToken.value = storedToken;
        isSignIn.value = true;
        const storedAccountInfo = localStorage.getItem(ACCOUNT_INFO_KEY);
        if (storedAccountInfo) {
          accountInfo.value = JSON.parse(storedAccountInfo);
        }
      }
    }
  };

  const setAccountInfo = (info: AccountInfo, token: string) => {
    accountInfo.value = info;
    localStorage.setItem(ACCOUNT_INFO_KEY, JSON.stringify(info));
    setAuthToken(token);
  };

  const getAuthToken = () => {
    loadAuthToken();
    return authToken.value;
  };

  const resetAccountInfo = () => {
    accountInfo.value = {
      accountId: '',
      accountName: '',
      authority: -1,
      email: '',
    };
    setAuthToken(null);
    localStorage.removeItem(ACCOUNT_INFO_KEY);
    cookies.remove(AUTH_TOKEN_COOKIE_KEY);
    authToken.value = null;
    isSignIn.value = false;
  };

  return {
    isSignIn,
    authToken,
    accountInfo,
    loadAuthToken,
    setAccountInfo,
    getAuthToken,
    resetAccountInfo,
  };
});
