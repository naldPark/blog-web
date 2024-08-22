import Axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { useUserStore, useAppCommonStore } from '@/store';
import { isEmpty } from 'ramda';
import Config from '@/config';
import { ApiErrorResponse } from '@/types/axios';

const createHttpClient = (): AxiosInstance => {
  const axiosInstance: AxiosInstance = Axios.create({
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0',
    } as unknown as AxiosHeaders, // 여기서 unknown으로 변환 후 AxiosHeaders로 변환
    timeout: 300000, // 5 minutes timeout
  });

  // Request interceptor handler
  const requestInterceptorHandler = async (
    request: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    const userStore = useUserStore();
    const authToken = userStore.getAuthToken();
    if (!request.headers) {
      request.headers = {} as AxiosHeaders;
    }
    if (!request.headers[Config.AUTH_TOKEN_HEADER_KEY]) {
      if (typeof authToken === 'string' && !isEmpty(authToken)) {
        request.headers[Config.AUTH_TOKEN_HEADER_KEY] = `${authToken}`;
      }
      request.headers['requestPath'] = location.pathname;
    }
    return request;
  };

  // Response interceptor handler
  const responseInterceptorHandler = async (
    response: AxiosResponse,
  ): Promise<AxiosResponse> => {
    console.log('리스폰스');
    // if (response.data.spec && response.data.spec === 'AccessDeniedException') {
    //   const appStatusStore = useAppCommonStore();
    //   appStatusStore.showDialog({
    //     title: '로그아웃',
    //     description: '다시 로그인 해주세요',
    //     showCloseButton: true,
    //     action: () => {},
    //   });

    //   const userStore = useUserStore();
    //   userStore.setAuthToken(null);
    //   console.log('2');
    //   history.go(-1);
    // }
    return response;
  };

  // Error response interceptor handler
  const errorResponseInterceptorHandler = async (
    error: AxiosError,
  ): Promise<never> => {
    const appStatusStore = useAppCommonStore();

    if (error.response && error.response.data) {
      const errorData = error.response.data as ApiErrorResponse;

      if (errorData.status_code === 401) {
        appStatusStore.addToastMessage({
          type: 'error',
          message: errorData.error_i18n,
          buttonMsg: null,
          buttonCallback: null,
        });

        if (location.pathname !== '/' && location.pathname !== '/main') {
          location.href = `${location.origin}`;
        }
      }
    }
    // appStatusStore.showDialog({
    //   title: '로그아웃',
    //   description: '다시 로그인 해주세요',
    //   showCloseButton: true,
    //   action: () => {},
    // });

    // const userStore = useUserStore();
    // userStore.setAuthToken(null);
    // history.go(-1);

    // if (errorData.status_code === 401) {
    //   appStatusStore.addToastMessage({
    //     type: 'error',
    //     message: errorData.error_i18n,
    //     buttonMsg: null,
    //     timeout: null,
    //     buttonCallback: null,
    //   });
    //   if (location.pathname !== '/' && location.pathname !== '/main') {
    //     location.href = `${location.origin}`;
    //   }
    // }
    appStatusStore.hideLoading();

    throw error;
  };

  // Add request interceptor
  axiosInstance.interceptors.request.use(
    requestInterceptorHandler as unknown as (
      request: InternalAxiosRequestConfig,
    ) => Promise<InternalAxiosRequestConfig>,
  );

  // Add response interceptor
  axiosInstance.interceptors.response.use(
    responseInterceptorHandler,
    errorResponseInterceptorHandler,
  );

  return axiosInstance;
};

// Singleton pattern to return Axios instance
const httpClient = createHttpClient();

export default httpClient;
