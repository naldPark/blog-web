import Axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { useAccountStatusStore } from '@/store/accountStatusStore';
import { useAppStatusStore } from '@/store/useAppStatusStore';
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
    timeout: 300000, // 5 minutes timeout
  });

  // Request interceptor handler
  const requestInterceptorHandler = async (
    request: AxiosRequestConfig,
  ): Promise<AxiosRequestConfig<any>> => {
    const accountStatusStore = useAccountStatusStore();
    const authToken = await accountStatusStore.getAuthToken();
    if (!request.headers) {
      request.headers = {};
    }
    if (!request.headers[Config.AUTH_TOKEN_HEADER_KEY]) {
      if (typeof authToken === 'string' && !isEmpty(authToken)) {
        request.headers[Config.AUTH_TOKEN_HEADER_KEY] = `${authToken}`;
      }
      request.headers['requestPath'] = location.pathname;
    }
    return request as AxiosRequestConfig<any>;
  };

  // Response interceptor handler
  const responseInterceptorHandler = async (
    response: AxiosResponse,
  ): Promise<AxiosResponse> => {
    console.log('responsddde', response);
    // if (response.data.spec && response.data.spec === 'AccessDeniedException') {
    //   const appStatusStore = useAppStatusStore();
    //   appStatusStore.showDialog({
    //     title: '로그아웃',
    //     description: '다시 로그인 해주세요',
    //     invisibleClose: true,
    //     action: () => {},
    //   });

    //   const accountStatusStore = useAccountStatusStore();
    //   accountStatusStore.setAuthToken(null);
    //   console.log('2');
    //   history.go(-1);
    // }
    return response;
  };

  // Error response interceptor handler
  const errorResponseInterceptorHandler = async (error: any): Promise<any> => {
    const appStatusStore = useAppStatusStore();

    const errorData = error.response.data;

    if (errorData.status_code === 401) {
      appStatusStore.addToastMessage({
        type: 'error',
        message: errorData.error_i18n,
        buttonMsg: null,
        timeout: null,
        buttonCallback: null,
      });
      if (location.pathname !== '/' && location.pathname !== '/main') {
        location.href = `${location.origin}`;
      }
    }
    // appStatusStore.showDialog({
    //   title: '로그아웃',
    //   description: '다시 로그인 해주세요',
    //   invisibleClose: true,
    //   action: () => {},
    // });

    // const accountStatusStore = useAccountStatusStore();
    // accountStatusStore.setAuthToken(null);
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
      request: AxiosRequestConfig<any>,
    ) => Promise<InternalAxiosRequestConfig<any>>,
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
