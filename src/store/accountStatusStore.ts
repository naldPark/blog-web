import { defineStore } from 'pinia';
import { useCookies } from '@vueuse/integrations/useCookies'
import _ from 'lodash';

const AUTH_TOKEN_COOKIE_KEY = 'access_token';
const ACCOUNT_INFO_KEY = 'ACCOUNT_INFO';

// `useCookies`를 사용하여 쿠키 관련 기능을 제공합니다.
const cookies = useCookies();

export interface IAccountInfo {
    accountId: string | null;
    accountName: string | null;
    authority: number | null;
    email: string | null;
}

// Pinia 스토어를 정의합니다.
export const useAccountStatusStore = defineStore('account-status', {
    state: () => ({
        isSignIn: false,
        accountInfo: {
            accountId: null,
            accountName: null,
            authority: null,
            email: null,
        } as IAccountInfo,
        authToken: null as string | null,
    }),

    actions: {
        // 인증 토큰을 설정합니다.
        setAuthToken(token: string | null) {
            if (_.isString(token) && !_.isEmpty(token)) {
                this.authToken = token;
                this.isSignIn = true;
                // 쿠키에 토큰을 저장합니다.
                cookies.set(AUTH_TOKEN_COOKIE_KEY, token);
            } else {
                // 특정 쿠키를 제거합니다.
                cookies.remove(AUTH_TOKEN_COOKIE_KEY);

                // 로컬 스토리지를 비웁니다.
                localStorage.clear();

                // 계정 정보를 재설정합니다.
                this.accountInfo = {
                    accountId: null,
                    accountName: null,
                    authority: null,
                    email: null,
                };

                // 인증 토큰을 제거하고 로그아웃 상태로 만듭니다.
                this.authToken = null;
                this.isSignIn = false;
            }
        },


        // 인증 토큰을 로드합니다.
        loadAuthToken() {
            if (!this.authToken) {
                const storedToken = cookies.get(AUTH_TOKEN_COOKIE_KEY);
                if (storedToken) {
                    this.authToken = storedToken;
                    this.isSignIn = true;

                    // 로컬 스토리지에서 계정 정보를 로드합니다.
                    const storedAccountInfo = localStorage.getItem(ACCOUNT_INFO_KEY);
                    if (storedAccountInfo) {
                        this.accountInfo = JSON.parse(storedAccountInfo);
                    }
                }
            }
        },

        // 계정 정보를 설정합니다.
        setAccountInfo(info: IAccountInfo) {
            this.accountInfo = info;
            localStorage.setItem(ACCOUNT_INFO_KEY, JSON.stringify(info));
        },

        // 인증 토큰을 가져옵니다.
        getAuthToken() {
            this.loadAuthToken();
            return this.authToken;
        },
        resetAccountInfo() {
            // 계정 정보를 초기 상태로 재설정합니다.
            this.accountInfo = {
                accountId: null,
                accountName: null,
                authority: null,
                email: null,
            };
            localStorage.removeItem(ACCOUNT_INFO_KEY);
            cookies.remove(AUTH_TOKEN_COOKIE_KEY);
            this.authToken = null;
            this.isSignIn = false;
        },
    },
});
