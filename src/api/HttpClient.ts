import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAccountStatusStore } from '@/store/accountStatusStore';
import { useAppStatusStore } from '@/store/appStatusStore';
import _ from 'lodash';
import Config from '@/config';

class HttpClient {
  ignoreNetworkErrorToastUrl = [];

  static instance: HttpClient;
  axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = Axios.create({
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });

    // 요청 인터셉터 추가
    this.axiosInstance.interceptors.request.use(
      (request: AxiosRequestConfig) => this.requestInterceptorHandler(request)
    );

    // 응답 인터셉터 추가
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => this.responseInterceptorHandler(response),
      this.errorResponseInterceptorHandler
    );
  }

  // 요청 인터셉터 핸들러
  requestInterceptorHandler = async (request: AxiosRequestConfig) => {
    const accountStatusStore = useAccountStatusStore();
    const authToken = await accountStatusStore.getAuthToken();

    if (!request.headers[Config.AUTH_TOKEN_HEADER_KEY]) {
      if (_.isString(authToken) && !_.isEmpty(authToken)) {
        request.headers[Config.AUTH_TOKEN_HEADER_KEY] = `${authToken}`;
      }
      request.headers['requestPath'] = location.pathname;
    }
    return request;
  };

  // 응답 인터셉터 핸들러
  responseInterceptorHandler = async (response: AxiosResponse) => {
    if (response.data.spec && response.data.spec === 'AccessDeniedException') {
      const appStatusStore = useAppStatusStore();
      appStatusStore.showDialog({
        title: '로그아웃',
        description: '다시 로그인 해주세요',
        invisibleClose: true,
        action: () => { },
      });

      const accountStatusStore = useAccountStatusStore();
      accountStatusStore.setAuthToken(null);
      history.go(-1);
    }
    return response;
  };

  // 오류 응답 인터셉터 핸들러
  errorResponseInterceptorHandler = async (error: any) => {
    const appStatusStore = useAppStatusStore();

    if (error.message === 'Network Error') {
      console.error('Network Error');
    }

    appStatusStore.addToastMessage({
      type: 'error',
      message: 'Network Error',
      buttonMsg: null,
      timeout: null,
      buttonCallback: null,
    });

    appStatusStore.hideLoading();

    if (location.pathname !== '/' && location.pathname !== '/main') {
      location.href = `${location.origin}`;
    }
    throw error;
  };

  // 싱글톤 패턴을 사용하여 HttpClient 인스턴스를 가져옵니다.
  static getInstance = () => {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance.axiosInstance;
  };
}

// HttpClient 인스턴스를 디폴트로 내보냅니다.
export default HttpClient.getInstance();
