import Axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { useAccountStatusStore } from '@/store/accountStatusStore';
import { useAppStatusStore } from '@/store/appStatusStore';
import { isEmpty } from 'ramda';
import Config from '@/config';

const createHttpClient = (): AxiosInstance => {
  const axiosInstance: AxiosInstance = Axios.create({
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0',
    },
  });

  // 요청 인터셉터 핸들러
  const requestInterceptorHandler = async (
    request: AxiosRequestConfig,
  ): Promise<AxiosRequestConfig<any>> => {
    console.log('요청인터셉터');
    const accountStatusStore = useAccountStatusStore();
    const authToken = await accountStatusStore.getAuthToken();
    if (!request.headers) {
      request.headers = {};
    }
    if (!request.headers[Config.AUTH_TOKEN_HEADER_KEY]) {
      console.log('????', authToken);
      if (typeof authToken === 'string' && !isEmpty(authToken)) {
        request.headers[Config.AUTH_TOKEN_HEADER_KEY] = `${authToken}`;
      }

      request.headers['requestPath'] = location.pathname;
    }
    return request as AxiosRequestConfig<any>;
  };

  // 응답 인터셉터 핸들러
  const responseInterceptorHandler = async (
    response: AxiosResponse,
  ): Promise<AxiosResponse> => {
    if (response.data.spec && response.data.spec === 'AccessDeniedException') {
      const appStatusStore = useAppStatusStore();
      appStatusStore.showDialog({
        title: '로그아웃',
        description: '다시 로그인 해주세요',
        invisibleClose: true,
        action: () => {},
      });

      const accountStatusStore = useAccountStatusStore();
      accountStatusStore.setAuthToken(null);
      history.go(-1);
    }
    return response;
  };

  // 오류 응답 인터셉터 핸들러
  const errorResponseInterceptorHandler = async (error: any): Promise<any> => {
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

  // 요청 인터셉터 추가
  axiosInstance.interceptors.request.use(
    requestInterceptorHandler as unknown as (
      request: AxiosRequestConfig<any>,
    ) => Promise<InternalAxiosRequestConfig<any>>,
  );

  // 응답 인터셉터 추가
  axiosInstance.interceptors.response.use(
    responseInterceptorHandler,
    errorResponseInterceptorHandler,
  );

  return axiosInstance;
};

// 싱글톤 패턴을 사용하여 Axios 인스턴스를 반환합니다.
const httpClient = createHttpClient();

export default httpClient;
